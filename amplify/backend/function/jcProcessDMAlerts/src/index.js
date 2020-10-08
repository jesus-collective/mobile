/* Amplify Params - DO NOT EDIT
  ANALYTICS_JCMOBILE_ID
  ANALYTICS_JCMOBILE_REGION
  ENV
  REGION
Amplify Params - DO NOT EDIT */

'use strict';

var aws = require('aws-sdk');
var convertFromRaw = require('draft-js').convertFromRaw;
var stateToHTML = require('draft-js-export-html').stateToHTML
const configSendAlerts = true
// Provide the full path to your config.json file. 
async function sendEmail(recipient, message) {
  console.log("Setting Up Email");
  const sender = "Jesus Collective <donot-reply@jesuscollective.com>";
  const subject = "Jesus Collective Message Alert";
  const charset = "UTF-8";
  console.log("Create SES");
  var ses = new aws.SES();
  var params = {
    Source: sender,
    Destination: {
      ToAddresses: [recipient],
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
  if (configSendAlerts) {
    console.log("Sending Email");
    const data = await ses.sendEmail(params).promise()
    return data
  } else {
    console.log("Emails disabled")
    return null
  }

}
function getRecipient(user) {
  return null
}
function convertCommentFromJSONToHTML(text) {
  try {
    return stateToHTML(convertFromRaw(JSON.parse(text)))
  } catch (e) {
    console.log({ "Converting HTML Error": e })
    return null
  }
}
function convertCommentFromJSONToTEXT(text) {
  try {
    return stateToHTML(convertFromRaw(JSON.parse(text)))
  } catch (e) {
    console.log({ "Converting TEXT Error": e })
    return null
  }
}
function generateMessage(html, text) {
  const body_text = "You have received a message on Jesus Collective\r\n" +
    text
    + "Please login to view it.";

  // The HTML body of the email.
  const body_html = `<html>
    <head></head>
    <body>
      <h1>Jesus Collective Message Alert</h1>
      <p>You have received a direct message on Jesus Collective</p>`+
    html
    + `<a href='https://dev.jesuscollective.com/app/conversation?initialUserID=null&initialUserName=null'>Login</a></p>
    </body>
  </html>`;
  console.log(body_text)
  //  console.log(body_html)
  return { html: body_html, text: body_text }
}

const start = async () => {
  await asyncForEach([1, 2, 3], async (num) => {
    await waitFor(50);
    console.log(num);
  });
  console.log('Done');
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function Execute(event) {
  await asyncForEach(event.Records, async (record) => {
    if (record.eventName == "INSERT") {
      console.log("Insert Detected")
      const recipients = record.dynamodb.NewImage.recipients.L.map(item => item.S)
      const messageRoomID = record.dynamodb.NewImage.messageRoomID.S
      const when = record.dynamodb.NewImage.when.S
      const content = record.dynamodb.NewImage.content.S
      const from = record.dynamodb.NewImage.userId.S
      console.log("Starting Send Loop")
      await asyncForEach(recipients.filter(item => item != from), async (recipientID) => {
        if (!messageRoomID.startsWith("course-")) {
          console.log({ "Sending DM Alert to": recipientID })
          const rec = getRecipient(recipientID)
          const recipient = "george.bell@themeetinghouse.com";
          const html = convertCommentFromJSONToHTML(content)
          const text = convertCommentFromJSONToTEXT(content)
          if (html && text) {
            const message = generateMessage(html, text)
            const data = await sendEmail(recipient, message)
            console.log(data)
          }
        }
      })
    }
    //eslint-disable-line
  });
}
exports.handler = async (event) => {
  await Execute(event)
  return Promise.resolve('Successfully processed DynamoDB record');
};
