exports.handler = (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  console.log(event)
  console.log(event.request)
  event.response = {
    "claimsOverrideDetails": {
        "groupOverrideDetails": {
            "groupsToOverride": event.request.groupConfiguration.groupsToOverride.concat(["test1"]),
        }
    }
};

// Return to Amazon Cognito
callback(null, event);
};
