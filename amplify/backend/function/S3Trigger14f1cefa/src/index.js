const resizeHandler = require("./resizeHandler.js");

exports.handler = async function (event, context) {
  //eslint-disable-line
  console.log('141cefa - Received S3 event:', JSON.stringify(event, null, 2));
  // Get the object from the event and show its content type
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
  try {
    const imagePath = await resizeHandler.process(bucket, key);
  } catch (error) {
    console.log(error);

  }
  context.done(null, 'Successfully processed S3 event'); // SUCCESS with message
};
