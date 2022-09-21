/* 
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
  ANALYTICS_JCMOBILE_ID
  ANALYTICS_JCMOBILE_REGION
  ENV
  REGION
Amplify Params - DO NOT EDIT */

"use strict"
const aws = require("aws-sdk")
const convertFromRaw = require("draft-js").convertFromRaw
const stateToHTML = require("draft-js-export-html").stateToHTML
const Amplify = require("aws-amplify")
global.fetch = require("node-fetch")
const queries = require("./queries")
const htmlToText = require("html-to-text")
const configSendAlerts = true
Amplify.default.configure({
  aws_appsync_graphqlEndpoint: process.env.API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT,
  aws_appsync_region: process.env.region,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  Auth: {
    mandatorySignIn: false,
    region: process.env.region,
    userPoolId: process.env.userPoolId,
    identityPoolRegion: process.env.region,
    userPoolWebClientId: process.env.userPoolWebClientId,
    identityPoolId: process.env.identityPoolId,
  },
})
async function getUser(id) {
  try {
    console.log("Starting getUser")
    const json = await Amplify.API.graphql({
      query: queries.getUser,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
    console.log("Done Get Users")
    if (json && json.data && json.data.getUser) {
      const email = json.data.getUser.email
      const name = json.data.getUser.given_name + " " + json.data.getUser.family_name
      const alertConfig = json.data.getUser.alertConfig
      return { email: email, name: name, alertConfig: alertConfig }
    }
    console.log({ "Error getting user": json })
    return null
  } catch (json) {
    if (json && json.data && json.data.getUser) {
      const email = json.data.getUser.email
      const name = json.data.getUser.given_name + " " + json.data.getUser.family_name
      const alertConfig = json.data.getUser.alertConfig
      return { email: email, name: name, alertConfig: alertConfig }
    }
    console.log({ "Error getting user": json })
    return null
  }
}

async function getCourseLesson(id) {
  try {
    console.log("Starting getCourseLesson", id)
    const getCourseLesson = await Amplify.API.graphql({
      query: queries.getCourseLesson,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
    console.log(getCourseLesson)
    return getCourseLesson?.data?.getCourseLesson
  } catch (error) {
    console.log(error)
    return error
  }
}

async function getCourseWeek(id) {
  try {
    console.log("Starting getCourseWeek", id)
    const getCourseWeek = await Amplify.API.graphql({
      query: queries.getCourseWeek,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
    console.log(getCourseWeek)
    return getCourseWeek?.data?.getCourseWeek
  } catch (error) {
    console.log(error)
    return error
  }
}

async function getCourseInfo(id) {
  try {
    console.log("Starting getCourseInfo", id)
    const getCourseInfo = await Amplify.API.graphql({
      query: queries.getCourseInfo,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
    console.log(getCourseInfo)
    return getCourseInfo?.data?.getCourseInfo
  } catch (error) {
    console.log(error)
    return error
  }
}

async function sendEmail(recipient, message, name, type) {
  console.log("Setting Up Email")
  const sender = "Jesus Collective <donot-reply@jesuscollective.com>"
  var subject
  if (type == "Course") subject = "Jesus Collective Course Activity from " + name
  else subject = "Jesus Collective DM from " + name
  const charset = "UTF-8"
  console.log("Create SES")
  var ses = new aws.SES()
  var params = {
    Source: sender,
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset,
      },
      Body: {
        Text: {
          Data: message.text,
          Charset: charset,
        },
        Html: {
          Data: message.html,
          Charset: charset,
        },
      },
    },
  }
  if (configSendAlerts) {
    console.log("Sending Email")
    const data = await ses.sendEmail(params).promise()
    return data
  } else {
    console.log("Emails disabled")
    return null
  }
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
      wordwrap: 130,
    })
  } catch (e) {
    console.log({ "Converting TEXT Error": e })
    return null
  }
}
function generateMessage(html, text, name, type) {
  var body_text

  if (type == "course")
    body_text =
      "There is new course activity from " + name + "\r\n" + text + "\r\nPlease login to view it."
  else
    body_text =
      "You have received a direct message from " +
      name +
      "\r\n" +
      text +
      "\r\nPlease login to view it."
  var env
  if (process.env.ENV == "beta") env = "dev"
  else if (process.env.ENV == "dev") env = "beta"
  else env = process.env.ENV

  // The HTML body of the email.
  var body_html
  if (type == "course") {
    body_html =
      `<html>
<head></head>
<body>
  <h1>Jesus Collective Course Alert</h1>
  <p>There is new course activity from ` +
      name +
      `</p>` +
      html +
      `<a href='https://` +
      env +
      `.jesuscollective.com/app/conversation?initialUserID=null&initialUserName=null'>View on Jesus Collective</a></p>
</body>
</html>`
  } else {
    body_html =
      `<html>
    <head></head>
    <body>
      <h1>Jesus Collective Direct Message Alert</h1>
      <p>You have received a direct message from ` +
      name +
      `</p>` +
      html +
      `<a href='https://` +
      env +
      `.jesuscollective.com/app/conversation?initialUserID=null&initialUserName=null'>View on Jesus Collective</a></p>
    </body>
  </html>`
  }
  //  console.log(body_html)
  return { html: body_html, text: body_text }
}

const start = async () => {
  await asyncForEach([1, 2, 3], async (num) => {
    await waitFor(50)
    console.log(num)
  })
  console.log("Done")
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
async function emailRouter(html, text, fromInfo, messageRoomID, recipientInfo) {
  if (
    messageRoomID.startsWith("course") &&
    (recipientInfo.alertConfig == null || recipientInfo.alertConfig.emailCourseMessage == "true")
  ) {
    const message = generateMessage(html, text, fromInfo.name, "course")
    const data = await sendEmail(recipientInfo.email, message, fromInfo.name, "Course")
    console.log(data)
  } else if (
    !messageRoomID.startsWith("course") &&
    (recipientInfo.alertConfig == null || recipientInfo.alertConfig.emailDirectMessage == "true")
  ) {
    const message = generateMessage(html, text, fromInfo.name, "dm")
    const data = await sendEmail(recipientInfo.email, message, fromInfo.name, "DM")
    console.log(data)
  }
}

async function Execute(event) {
  await asyncForEach(event.Records, async (record) => {
    console.log(record)
    if (record.eventName == "INSERT") {
      console.log("Insert Detected")
      console.log("Loading Secret")
      var AWS = require("aws-sdk"),
        region = "us-east-1",
        secretName = "jcmobile/" + process.env.ENV + "/lamdaSecrets",
        secret,
        decodedBinarySecret

      // Create a Secrets Manager client
      var client = new AWS.SecretsManager({
        region: region,
      })
      try {
        const data = await client.getSecretValue({ SecretId: secretName }).promise()

        if ("SecretString" in data) {
          secret = JSON.parse(data.SecretString)
        } else {
          let buff = new Buffer(data.SecretBinary, "base64")
          decodedBinarySecret = buff.toString("ascii")
        }
        console.log("Loading Secret Done")

        const cognitoUser = await Amplify.Auth.signIn(secret.userName, secret.password)
        console.log(cognitoUser)
        const currentSession = await Amplify.Auth.currentSession()
        Amplify.default.configure({
          Authorization: currentSession.getIdToken().getJwtToken(),
        })
        console.log("Logged in")
        const messageRoomID = record.dynamodb.NewImage.messageRoomID.S
        const when = record.dynamodb.NewImage.when.S
        const content = record.dynamodb.NewImage.content.S
        const from = record.dynamodb.NewImage.userId.S
        const recipients = record.dynamodb.NewImage.recipients.L.map((item) => item.S)
        let recipientsToBeNotified = recipients
        console.log({ recipients })
        const lessonID = messageRoomID.split("-").slice(1, 6).join("-") // is assignment id
        const courseLesson = await getCourseLesson(lessonID)
        const courseWeek = await getCourseWeek(courseLesson.courseWeekID)
        const courseInfo = await getCourseInfo(courseWeek.courseInfoID)
        console.log({ courseInfo })
        if (courseInfo?.separatedTriads) {
          console.log("Filtering recipients.")
          const backOfficeStaff =
            courseInfo?.backOfficeStaff?.items?.map((item) => item?.userID) ?? []
          console.log({ backOfficeStaff })
          const instructors = courseInfo?.instructors?.items?.map((item) => item?.userID) ?? []
          console.log({ instructors })
          const triads = courseInfo?.triads?.items ?? []
          const userTriad = triads?.find(
            (triad) =>
              triad?.coaches?.items?.find((item) => item?.userID === from) ||
              triad?.users?.items?.find((item) => item?.userID === from)
          )
          console.log({ userTriad })
          const coaches = userTriad?.coaches?.items?.map((item) => item?.userID) ?? []
          const users = userTriad?.users?.items?.map((item) => item?.userID) ?? []
          console.log({ coaches })
          console.log({ users })
          recipientsToBeNotified = recipients.filter(
            (item) =>
              coaches.includes(item) ||
              users.includes(item) ||
              instructors.includes(item) ||
              backOfficeStaff.includes(item)
          )
        } else {
          console.log("Skipped filtering recipients.")
        }
        recipientsToBeNotified = recipientsToBeNotified.filter((item) => item != from)
        console.log({ recipientsToBeNotified })
        console.log("Starting Send Loop")
        const fromInfo = await getUser(from)
        await asyncForEach(recipientsToBeNotified, async (recipientID) => {
          console.log({ "Lookup user": recipientID })
          const recipientInfo = await getUser(recipientID)
          if (recipientInfo) {
            console.log({ "Sending a DM to": recipientInfo })
            const html = convertCommentFromJSONToHTML(content)
            const text = convertCommentFromJSONToTEXT(content)
            if (html && text) {
              await emailRouter(html, text, fromInfo, messageRoomID, recipientInfo)
            }
          }
        })
      } catch (e) {
        console.log({ "Login Error": e })
      }
    }
    //eslint-disable-line
  })
}
exports.handler = async (event) => {
  await Execute(event)
  return Promise.resolve("Successfully processed DynamoDB record")
}
