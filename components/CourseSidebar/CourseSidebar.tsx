import {  Container,Header, Left, Body,  Right, Button } from 'native-base';
import { withNavigation, DrawerActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {  Image, Text } from 'react-native';
import styles from '../Header/style.js'

interface Props {
  navigation: any,
  courseId:any
//  title:string,
//  onMapChange?():any
}
interface State { }
class CourseSidebar extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
 
  openHome = () => {
    this.props.navigation.push("HomeScreen");
  }
  openCourseHome = () => {
    this.props.navigation.push("CourseHomeScreen", { id: this.props.courseId, create: false });
  }
  openCourseDetails = () => {
    this.props.navigation.push("CourseDetailScreen", { id: this.props.courseId, create: false });
  } 
  openCourseCoaching = () => {
    this.props.navigation.push("CourseCoachingScreen", { id: this.props.courseId, create: false });
  }
  render() {
    //const { navigate } = this.props.navigation;
    return (
        <Container style={{ flex: 15, backgroundColor: "#000000" }}>
        <Button
          transparent
          onPress={this.openHome}>
          <Image style={ {
  resizeMode: "stretch",
  width: 126,
  height: 33,
  marginRight: 70,
  marginTop:5,
  marginBottom:10,
}}
            source={require('../../components/Header/icon.png')}
          /></Button>
        <Button transparent  onPress={this.openCourseHome}><Text style={{color:"#ffffff"}}>Home</Text></Button>
        <Button transparent  onPress={this.openCourseDetails}><Text style={{color:"#ffffff"}}>Course</Text></Button>
        <Button transparent  onPress={this.openCourseCoaching}><Text style={{color:"#ffffff"}}>Coaching</Text></Button>
      </Container>
    )
  }
}
export default withNavigation(CourseSidebar)