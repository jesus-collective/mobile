exports.handler = (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  if (event.request.userAttributes.email == "george.bell@jesuscollective.com") {
    event.response.autoConfirmUser = "true"
    event.response.autoVerifyPhone = "true"
    event.response.autoVerifyEmail = "true"
  }
  callback(null, event);
};
