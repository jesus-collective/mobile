exports.handler = (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  const emailList = [
    "george.bell@jesuscollective.com",
    "test1@jesuscollective.com",
    "test2@jesuscollective.com",
    "test3@jesuscollective.com",
  ]
  if (emailList.includes(event.request.userAttributes.email)) {
    event.response.autoConfirmUser = "true"
    event.response.autoVerifyPhone = "true"
    event.response.autoVerifyEmail = "true"
  }
  callback(null, event)
}
