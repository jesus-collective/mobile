import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './src/aws-exports';
import HomeScreen from "./screens/HomeScreen/index";
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import * as Font from 'expo-font'
import { View, Text } from 'react-native';

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
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }


  async componentDidMount() {

    var fontLoader = Font.loadAsync({
      'Graphik-Bold-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Bold-App.ttf'),
      'Graphik-Medium-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Medium-App.ttf'),
      'Graphik-Regular-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Regular-App.ttf'),
      'Graphik-Semibold-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Semibold-App.ttf'),
      'GraphikXXCondensed-Black-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik_xx_condensed/GraphikXXCondensed-Black-App.ttf'),
      'material': require('./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf')

    });

    fontLoader.then(
      (e) => { console.log("Fonts Loaded"); this.setState({ fontLoaded: true }) }
    ).catch(
      (e) => { console.log({"Error loading font":e}) }
    );
  }

  render() {

    return this.state.fontLoaded ?
      <ApolloProvider client={client} >
        <Rehydrated>
          <HomeScreen />
        </Rehydrated>
      </ApolloProvider>
      : <View><Text>Loading Fonts</Text></View>
  }
}
export default AwesomeApp;