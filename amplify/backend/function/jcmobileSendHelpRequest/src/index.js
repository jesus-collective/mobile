const aws = require("aws-sdk")
const ses = new aws.SES()

exports.handler = (event, context, callback) => {
  const message = event.arguments.body
  console.log(message)
  const params = {
    Destination: {
      ToAddresses: ["connect@jesuscollective.com"],
    },
    ReplyToAddresses: [event.arguments.email],
    Message: {
      Body: {
        Text: {
          Data: message,
        },
      },
      Subject: {
        Data: "Support Request",
      },
    },
    Source: "donot-reply@jesuscollective.com",
  }

  ses.sendEmail(params, function (err, data) {
    callback(null, { err: err, data: data })
    if (err) {
      console.log(err)
      context.fail(err)
    } else {
      console.log(data)
      context.succeed(event)
    }
  })
}
