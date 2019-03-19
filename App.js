import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from './src/aws-exports';
import HomeScreen from "./screens/HomeScreen/index.js";
Amplify.configure(awsConfig);



//export default App;

export default class AwesomeApp extends React.Component {
  render() {
    return <HomeScreen />;  
  }
}
