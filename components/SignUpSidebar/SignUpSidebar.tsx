import { View, StyleProvider, Card, CardItem, List, ListItem, Right, Button, Container } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Image, Text } from 'react-native';

interface Props {
  position?: String,
  text?: String


}
interface State { }
export default class MyResources extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (


      <View style={styles.signUpSidebarView} >
        {
          this.props.text != null ? (<Text style={styles.signUpSidebarText}>{this.props.text}</Text>) : (
              <View style={styles.signUpSidebarProgressTextView} >
                <Text style={styles.signUpSidebarProgressText1}>Account Creation</Text>
                <Text style={styles.signUpSidebarProgressText2}>Authentication</Text>
                <Text style={styles.signUpSidebarProgressText3}>Payment</Text>
                <Text style={styles.signUpSidebarProgressText4}>Individual Profile</Text>
                <Text style={styles.signUpSidebarProgressText5}>Get In</Text>
                <Image source={require('../../assets/SignUp/progress-3.png')} style={styles.signUpSidebarProgress} />
              </View>
            )}
        <Image source={require('../../assets/JC-Logo-RGB-KO2.png')} style={styles.signUpSidebarLogo} />
        <Image source={require('../../assets/leftPanel.png')} style={styles.signUpSidebarPanel} />

      </View>

    )
  }
}