/* Amplify Params - DO NOT EDIT
	API_JCMOBILEAPI_APIID
	API_JCMOBILEAPI_APINAME
	API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_JCMOBILE_GRAPHQLAPIIDOUTPUT
	AUTH_JCMOBILE_USERPOOLID
	ENV
	FUNCTION_JCMOBILECREATECOGNITOORGUSER_NAME
	REGION
Amplify Params - DO NOT EDIT */
exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!"),
  }
  return response
}
