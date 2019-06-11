import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './src/aws-exports';
import HomeScreen from "./screens/HomeScreen/index.js";
import AWSAppSyncClient , { AUTH_TYPE }from 'aws-appsync';
import { withAuthenticator, Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
Amplify.configure(awsConfig);

const client = new AWSAppSyncClient({
  url: awsConfig.aws_appsync_graphqlEndpoint,
  region: awsConfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  complexObjectsCredentials: () => Auth.currentCredentials()
});

class AwesomeApp extends React.Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <Rehydrated>
          <HomeScreen />
        </Rehydrated>
      </ApolloProvider>)
  }
}
export default AwesomeApp;