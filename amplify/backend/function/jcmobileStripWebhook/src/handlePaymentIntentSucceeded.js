const amplifyPassword = "";
const stripeSecret = "";
const Amplify = require("aws-amplify");
global.fetch = require("node-fetch");

async function addUserToGroup(user, groupname) {
  try {
    Amplify.default.configure({
      aws_appsync_graphqlEndpoint:
        process.env.API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT,
      aws_appsync_region: process.env.region,
      aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
      aws_cloud_logic_custom: [
        {
          name: "AdminQueries",
          endpoint:
            "https://cvopa45zi3.execute-api.us-east-1.amazonaws.com/beta",
          region: "us-east-1",
        },
      ],
      API: {
        endpoints: [
          {
            name: "AdminQueries",
            endpoint:
              "https://cvopa45zi3.execute-api.us-east-1.amazonaws.com/beta",
            region: "us-east-1",
          },
        ],
      },
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

    console.log(user);
    console.log(groupname);
    const apiName = "AdminQueries";
    const path = "/addUserToGroup";
    const myInit = {
      body: {
        username: user,
        groupname: groupname,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Amplify.Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    const { ...rest } = await Amplify.API.post(apiName, path, myInit);
    return rest;
  } catch (e) {
    console.log({ "ERROR:": e });
    return false;
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
const runIt = async (paymentIntent) => {
  console.log(paymentIntent);
  const stripe = require("stripe")(stripeSecret, {
    maxNetworkRetries: 5,
  });
  var customerId = paymentIntent.customer;
  customerId = "cus_IU6NZZETZUjCd2";
  var customer = await stripe.customers.retrieve(customerId, {
    expand: ["subscriptions"],
  });
  console.log(customer);
  var userID = customer.metadata.userID;
  var groups = customer.subscriptions.data.map((item) => {
    console.log(item);
    if (item.status == "active")
      return item.items.data.map((priceItems) => {
        console.log(priceItems);
        if (priceItems.price.metadata.groups)
          return priceItems.price.metadata.groups.split(",");
      });
  });
  let unique = [...new Set(groups.flat(Infinity))].filter(
    (item) => item !== undefined
  );
  console.log(unique);
  await asyncForEach(unique, async (group) => {
    try {
      const z = await addUserToGroup(userID, group);
      console.log(z);
    } catch (e) {
      console.log({ Error: e });
    }
  });
};

exports.runIt = runIt;
