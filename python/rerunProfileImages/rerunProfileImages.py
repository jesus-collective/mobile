import json
import time
import argparse
import base64
from queue import Queue
from threading import Thread
from argh import dispatch_command

import boto3
from boto.s3.connection import S3Connection


def main():
    print('Main')
    global client
    parser = argparse.ArgumentParser(
        description='Regenerate all profile images')
    parser.add_argument('--bk', metavar='B', help='Bucket', required=True)
    parser.add_argument('--rn', metavar='R', help='AWS region', required=True)
    parser.add_argument('--fn', metavar='F',
                        help='Lambda Function Name', required=True)
    parser.add_argument('--ak', metavar='AK', help='aws access key')
    parser.add_argument('--sk', metavar='AS', help='aws secret key')
    args = parser.parse_args()
    if (args.ak is None or args.sk is None):
        credentials = boto3.Session(profile_name="amplify").get_credentials()
        args.sk = args.sk or credentials.secret_key
        args.ak = args.ak or credentials.access_key
    print('starting client')
    client = boto3.client('lambda', region_name=args.rn,
                          aws_access_key_id=args.ak, aws_secret_access_key=args.sk)
    invoke_lambdas(args.ak, args.sk, args.bk, args.fn)


def invoke_lambdas(ak, sk, bk, fn):

    try:
        # replace these with your access keys
        s3 = S3Connection(ak, sk)
        buckets = [s3.get_bucket(bk)]

        queue = Queue()
        num_threads = 50

        # create a worker pool
        for i in range(num_threads):
            worker = Thread(target=invoke, args=(queue, fn))
            worker.setDaemon(True)
            worker.start()

        for bucket in buckets:
            for key in bucket.list():
                queue.put((bucket.name, key.key))

        queue.join()

    except Exception as e:
        print(e)


def invoke(queue, fn):
    while True:
        bucket_key = queue.get()

        try:
            print('Invoking lambda with bucket %s key %s. Remaining to process: %d'
                  % (bucket_key[0], bucket_key[1], queue.qsize()))
            trigger_event = {
                'Records': [{
                    's3': {
                        'bucket': {
                            'name': bucket_key[0]
                        },
                        'object': {
                            'key': bucket_key[1]
                        }
                    }
                }]
            }

            # replace lambda_function_name with the actual name
            # InvocationType='RequestResponse' means it will wait until the lambda fn is complete
            response = client.invoke(
                FunctionName=fn,
                InvocationType='RequestResponse',
                LogType='None',
                ClientContext=base64.b64encode(
                    json.dumps({}).encode()).decode(),
                Payload=json.dumps(trigger_event).encode()
            )
            if response['StatusCode'] != 200:
                print(response)

        except Exception as e:
            print(e)
            print('Exception during invoke_lambda')

        queue.task_done()


if __name__ == "__main__":
    main()
