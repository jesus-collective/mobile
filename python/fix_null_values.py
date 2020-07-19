import boto3
import argparse


def main():
    global client
    parser = argparse.ArgumentParser(description='Set missing values')
    parser.add_argument('--table', required=True)
    parser.add_argument('--column', required=True)
    parser.add_argument('--default', required=True)
    parser.add_argument(
        '--type', help='type of default as in the boto3 spec (e.g. \'S\' for string)', required=True)
    parser.add_argument('--ak', help='aws access key', required=True)
    parser.add_argument('--sk', help='aws secret key', required=True)
    parser.add_argument('--rn', help='aws region', required=True)
    args = parser.parse_args()

    client = boto3.client('dynamodb', region_name=args.rn,
                          aws_access_key_id=args.ak, aws_secret_access_key=args.sk)

    do_stuff(args.table, args.column, args.default, args.type)


def do_stuff(table, col, default, default_type):
    response = client.scan(
        TableName=table,
        ExpressionAttributeNames={
            'ID': 'id'
        },
        ProjectionExpression='#ID',
    )

    items = response['Items']

    for item in items:
        update = client.update_item(
            TableName=table,
            Key=item,
            ExpressionAttributeNames={
                'ID': 'id'
            },
            ExpressionAttributeValues={
                ':default': {default_type: default},
                ':isNull': {'NULL': True}
            },
            UpdateExpression='SET {col} = :default',
            ConditionExpression='attribute_not_exists({col}) OR {col} = :isNull',
        )
        print(update)


if __name__ == "__main__":
    main()
