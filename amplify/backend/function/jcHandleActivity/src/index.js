const Amplify = require("@aws-amplify/core")
const { Auth } = require("@aws-amplify/auth")
const { API } = require("@aws-amplify/api")
const mutations = require("./mutations")
const queries = require("./queries")
const { v4: uuidv4 } = require("uuid")
const aws = require("aws-sdk")
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

const createActivity = async (activityEntry) => {
  try {
    console.log("Submitting the following activity: ")
    console.log(activityEntry)
    const json = await API.graphql({
      query: mutations.createActivity,
      variables: {
        input: {
          ...activityEntry,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
    console.log("Activity created successfully:")
    console.log(json)
  } catch (err) {
    console.log("An error occurred trying to create an activity.")
    console.log(err)
  }
}
const authenticate = async () => {
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

    await Amplify.Auth.signIn(secret.userName, secret.password)
    const currentSession = await Amplify.Auth.currentSession()
    Amplify.default.configure({
      Authorization: currentSession.getIdToken().getJwtToken(),
    })
    console.log("Logged in")
  } catch (e) {
    console.log({ "Login Error": e })
  }
}
exports.handler = async (event) => {
  try {
    // await authenticate()
    // missing secretmanager configuration in cloudformation template
    await Auth.signIn(process.env.user, process.env.pass)
    console.log("Done login")
    const dynamoEvent = event.Records[0]
    console.log(dynamoEvent.dynamodb)
    console.log(dynamoEvent.eventName)
    const date = new Date()
    let activityEntry = {
      id: uuidv4(),
      time: date.toTimeString().slice(0, 8),
      date: date.toISOString().slice(0, 10),
    }
    // TODO: Use proper sign in, user must exist in jc dev environment and have proper permissions
    // TODO: REMOVE is currently throwing an error somewhere
    switch (dynamoEvent.dynamodb.NewImage.__typename.S) {
      case "CourseLesson":
        console.log("Logging query variables:")
        console.log(
          `dynamoEvent.dynamodb.NewImage.courseWeekID.S: ${dynamoEvent.dynamodb.NewImage.courseWeekID.S}`
        )
        console.log(
          `dynamoEvent.dynamodb.NewImage.owner.S: ${dynamoEvent.dynamodb.NewImage.owner.S}`
        )
        activityEntry.activityGroupType = "courses"
        const course = await API.graphql({
          query: queries.getCourseWeek,
          variables: {
            id: dynamoEvent.dynamodb.NewImage.courseWeekID.S,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })
        const user = await API.graphql({
          query: queries.getUser,
          variables: {
            id: dynamoEvent.dynamodb.NewImage.owner.S,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })
        activityEntry.activityActionType = "courses_lesson_create"
        switch (dynamoEvent.eventName) {
          case "INSERT":
            console.log("A course lesson has been created")
            activityEntry.ownerName = `${user.data.getUser.given_name} ${user.data.getUser.family_name}`
            activityEntry.ownerID = dynamoEvent.dynamodb.NewImage.owner.S
            activityEntry.activityGroupId = course.data.getCourseWeek.courseInfoID
            await createActivity(activityEntry)
            break
          case "MODIFY":
            console.log("A course lesson has been modified")
            activityEntry.ownerName = `${user.data.getUser.given_name} ${user.data.getUser.family_name}`
            activityEntry.ownerID = dynamoEvent.dynamodb.NewImage.owner.S
            activityEntry.activityGroupId = course.data.getCourseWeek.courseInfoID
            console.log(dynamoEvent.dynamodb.NewImage)
            switch (dynamoEvent.dynamodb.NewImage.lessonType.S) {
              case "assignment":
                activityEntry.activityActionType = "courses_assignment_create"
                await createActivity(activityEntry)
                break
              case "zoom":
                activityEntry.activityActionType = "courses_zoom_create"
                await createActivity(activityEntry)
                break
              case "respond":
                activityEntry.activityActionType = "courses_respond_create"
                await createActivity(activityEntry)
                break
              case "youtube":
                activityEntry.activityActionType = "courses_youtube_create"
                await createActivity(activityEntry)
                break
            }
            break
          case "REMOVE":
            console.log("A course lesson has been removed")
            break
        }
        break
      case "DirectMessage":
        console.log("Direct message detected")
        switch (dynamoEvent.eventName) {
          case "INSERT":
            // Query messageRoom with messageRoomID
            const directMessageRoom = await API.graphql({
              query: queries.getDirectMessageRoom,
              variables: {
                id: dynamoEvent.dynamodb.NewImage.messageRoomID.S,
              },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            })
            console.log(directMessageRoom)
            switch (
              directMessageRoom.data.getDirectMessageRoom.roomType // Is it type assignment?
            ) {
              case "assignment":
                console.log(dynamoEvent.dynamodb.NewImage.messageRoomID.S)
                let lessonId = "course-61580a07-cfc8-4d31-ad28-3098b74d0ec9-c07f6c6f-fa00-44ed-afbc-f4f4b08bcda1"
                  .split("-")
                  ?.splice(1, 5)
                  ?.join("-") // Pulling lessonId from messageRoomID
                console.log(lessonId)
                const course = await API.graphql({
                  query: queries.getCourseInfoIdFromLesson,
                  variables: {
                    id: lessonId,
                  },
                  authMode: "AMAZON_COGNITO_USER_POOLS",
                })
                console.log(course)
                const user = await API.graphql({
                  query: queries.getUser,
                  variables: {
                    id: dynamoEvent.dynamodb.NewImage.userId.S,
                  },
                  authMode: "AMAZON_COGNITO_USER_POOLS",
                })
                console.log(user)
                activityEntry.ownerName = `${user.data.getUser.given_name} ${user.data.getUser.family_name}`
                activityEntry.ownerID = dynamoEvent.dynamodb.NewImage.userId.S
                activityEntry.activityGroupId =
                  course?.data?.getCourseLesson?.courseWeek?.courseInfoID
                if (directMessageRoom?.data?.getDirectMessageRoom?.directMessage?.length > 0)
                  activityEntry.activityActionType = "courses_assignment_respond"
                else activityEntry.activityActionType = "courses_assignment_submit"
                activityEntry.activityGroupType = "courses"
                console.log(activityEntry)
                await createActivity(activityEntry)
                break
              default:
                // ignore every other DirectMessage
                console.log("Not an assignment")
                break
            }
            break
          case "MODIFY":
            break
          case "REMOVE":
            break
        }
        break
    }
    return Promise.resolve("Successfully processed DynamoDB record")
  } catch (err) {
    console.log(err)
    return Promise.resolve("An error occurred")
  }
}
