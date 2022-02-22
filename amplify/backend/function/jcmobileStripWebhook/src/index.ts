import awsServerlessExpress from "aws-serverless-express"
import app from "./app"

const server = awsServerlessExpress.createServer(app)

export const handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log({ EVENT: event.body })
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise
}
