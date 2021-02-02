exports.handler = (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  const emailList = [
    "george.bell@jesuscollective.com",
    "test1@jesuscollective.com",
    "test2@jesuscollective.com",
    "test3@jesuscollective.com",
    "admin1@jesuscollective.com",
    "partner1@jesuscollective.com",
    "friend1@jesuscollective.com",
    "noSubscription1@jesuscollective.com",
    "ky1@jesuscollective.com",
    "ky2@jesuscollective.com",
    "ky3@jesuscollective.com",
    "ky4@jesuscollective.com",
    "invited1@jesuscollective.com",
    "courseUser1@jesuscollective.com",
    "courseUser2@jesuscollective.com",
    "courseUser3@jesuscollective.com",
    "courseUser4@jesuscollective.com",
    "courseCoach1@jesuscollective.com",
    "courseCoach2@jesuscollective.com",
    "courseCoach3@jesuscollective.com",
    "courseCoach4@jesuscollective.com",
    "legacyUserGroup1@jesuscollective.com",
  ]
  if (emailList.includes(event.request.userAttributes.email)) {
    event.response.autoConfirmUser = "true"
    event.response.autoVerifyPhone = "true"
    event.response.autoVerifyEmail = "true"
  }
  callback(null, event)
}
