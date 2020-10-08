/* Amplify Params - DO NOT EDIT
  ANALYTICS_JCMOBILE_ID
  ANALYTICS_JCMOBILE_REGION
  ENV
  REGION
Amplify Params - DO NOT EDIT */

'use strict';

var aws = require('aws-sdk');

// Provide the full path to your config.json file. 
async function sendAlertEmail(recipient, content) {
  console.log("Setting Up Email");
  const sender = "Jesus Collective <donot-reply@jesuscollective.com>";
  const subject = "Jesus Collective Message Alert";
  const charset = "UTF-8";
  console.log("Create SES");
  var ses = new aws.SES();
  var params = {
    Source: sender,
    Destination: {
      ToAddresses: [
        recipient
      ],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset
      },
      Body: {
        Text: {
          Data: message.text,
          Charset: charset
        },
        Html: {
          Data: message.html,
          Charset: charset
        }
      }
    }
  };
  console.log("Sending Email");
  const data = await ses.sendEmail(params).promise()
  return data

}
function getRecipient(user){
  return null
}
function generateMessage(content) {
  const body_text = "You have received a message on Jesus Collective\r\n"
    + "Please login to view it.";

  // The HTML body of the email.
  const body_html = `<html>
    <head></head>
    <body>
      <h1>Jesus Collective Message Alert</h1>
      <p>You have received a direct message on Jesus Collective
      <a href='https://dev.jesuscollective.com/app/conversation?initialUserID=null&initialUserName=null'>Login</a></p>
    </body>
  </html>`;
  return { html: body_html, text: body_text }
}
exports.handler = async event => {
  //eslint-disable-line
  event.Records.forEach(record => {
    if (record.eventName == "INSERT") {
      console.log(record.eventID);
      console.log(record.eventName);
      console.log('DynamoDB Record: %j',);

      const recipients = record.dynamodb.NewImage.recipients.L.map(item => item.S)
      const messageRoomID = record.dynamodb.NewImage.messageRoomID.S
      const when = record.dynamodb.NewImage.when.S
      const content = reconrd.dynamodb.NewImage.content.S

      recipients.forEach((recipientID) => {
        const rec=getRecipient(recipientID)
        const recipient = "george.bell@themeetinghouse.com";
        const message = generateMessage(content)
        const data = await sendAlertEmail(recipient, message)
        console.log(data)
      })
    }
  });
  return Promise.resolve('Successfully processed DynamoDB record');
};
