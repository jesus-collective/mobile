/* Amplify Params - DO NOT EDIT
  ANALYTICS_JCMOBILE_ID
  ANALYTICS_JCMOBILE_REGION
  API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
  API_JCMOBILE_GRAPHQLAPIIDOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
  ANALYTICS_JCMOBILE_ID
  ANALYTICS_JCMOBILE_REGION
  ENV
  REGION
Amplify Params - DO NOT EDIT */

'use strict';

const aws = require('aws-sdk');
const convertFromRaw = require('draft-js').convertFromRaw;
const stateToHTML = require('draft-js-export-html').stateToHTML
const Amplify = require('aws-amplify');
global.fetch = require("node-fetch");
const queries = require('./queries')
const htmlToText = require('html-to-text');


async function getRecipient(id) {
  try {
    // console.log(process.env)
    var region = process.env.REGION
    var API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT = process.env.API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
    Amplify.default.configure({
      aws_appsync_graphqlEndpoint: API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT,
      aws_appsync_region: region,
      aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
      Auth: {
        mandatorySignIn: false,
        region: region,
        userPoolId: process.env.userPoolId,
        identityPoolRegion: region,
        userPoolWebClientId: process.env.userPoolWebClientId,
        identityPoolId: process.env.identityPoolId
      }
    })
    console.log("Done config")
    await Amplify.Auth.signIn("george.bell@themeetinghouse.com", "Tacobell#1")
    console.log("Done login")
    currentSession = await Amplify.Auth.currentSession()

    Amplify.default.configure({
      Authorization: currentSession.getIdToken().getJwtToken(),
    })
    console.log("Done Auth")
    json = await Amplify.API.graphql({
      query: queries.getUser,
      variables: { limit: 20, filter: { profileState: { eq: "Complete" } }, nextToken: null },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    });
    console.log("Done List Users")
    await Promise.all(json.data.listUsers.items.map(async (item) => {
      console.log(item)
    }))
  }
  catch (e) {
    console.log({ "ERROR:": e })
  }
}

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
    return htmlToText.fromString(stateToHTML(convertFromRaw(JSON.parse(text))), {
      wordwrap: 130
    })
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
          const rec = await getRecipient(recipientID)
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
