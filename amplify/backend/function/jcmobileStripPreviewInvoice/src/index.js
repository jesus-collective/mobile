/* Amplify Params - DO NOT EDIT
	API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_JCMOBILE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
"use strict";

const Amplify = require("aws-amplify");
global.fetch = require("node-fetch");
const queries = require("./queries");
const amplifyPassword = "";
const stripeSecret = "";

async function getUser(id) {
  try {
    Amplify.default.configure({
      aws_appsync_graphqlEndpoint:
        process.env.API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT,
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
    });
    await Amplify.Auth.signIn(
      "george.bell@themeetinghouse.com",
      amplifyPassword
    );
    console.log("Done login");
    const currentSession = await Amplify.Auth.currentSession();
    Amplify.default.configure({
      Authorization: currentSession.getIdToken().getJwtToken(),
    });
    try {
      console.log("Done Auth");

      var json = await Amplify.API.graphql({
        query: queries.getUser,
        variables: { id: id },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log("Done Get Users");
      const email = json.data.getUser.email;
      const stripeCustomerID = json.data.getUser.stripeCustomerID;
      const name =
        json.data.getUser.given_name + " " + json.data.getUser.family_name;
      return { stripeCustomerID: stripeCustomerID, email: email, name: name };
    } catch (json) {
      if (json && json.data && json.data.getUser) {
        const email = json.data.getUser.email;
        const stripeCustomerID = json.data.getUser.stripeCustomerID;
        const name =
          json.data.getUser.given_name + " " + json.data.getUser.family_name;
        return { stripeCustomerID: stripeCustomerID, email: email, name: name };
      }
      console.log({ "Error getting user": json });
      return null;
    }
  } catch (e) {
    console.log({ "ERROR:": e });
    return null;
  }
}
exports.handler = async (event) => {
  console.log(event);
  var stripeCustomerID = event.arguments.stripeCustomerID;
  const idempotency = event.arguments.idempotency;
  const prices = event.arguments.priceInfo.prices;
  console.log({ prices: prices });
  const userID = event.identity.username;
  if (stripeCustomerID == null) {
    const userInfo = await getUser(userID);
    console.log(userInfo.stripeCustomerID);
    stripeCustomerID = userInfo.stripeCustomerID;
  }
  // TODO userID
  const stripe = require("stripe")(stripeSecret, {
    maxNetworkRetries: 5,
  });

  // TODO determine if we have a user created in table (User/stripeCustomerID)
  var invoice;
  if (stripeCustomerID != null) {
    invoice = await stripe.invoices.retrieveUpcoming({
      customer: stripeCustomerID,
      subscription_items: prices,
      expand: ["lines"],
    });
  } else
    return {
      statusCode: 400,
      invoice: invoice,
    };
  const response = {
    statusCode: 200,
    invoice: invoice,
  };
  return response;
};
