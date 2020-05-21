import { Container, Header, Left, Body, Right, Button } from 'native-base';

import { DrawerActions } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from './style'
import AnimatedProgressWheel from 'react-native-progress-wheel';

interface Props {
    navigation: any,
    courseId: any
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
    openCourseOverview = () => {
        this.props.navigation.push("CourseOverviewScreen", { id: this.props.courseId, create: false });
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
                <Button style={{ marginBottom: 40 }}
                    transparent
                    onPress={this.openHome}>
                    <Image style={styles.logo}
                        source={require('../../assets/header/icon.png')}
                    /></Button>
                <Button transparent onPress={this.openCourseHome}><Image style={{ marginLeft: 20, width: "22px", height: "22px" }} source={require('../../assets/svg/home.svg')} /><Text style={styles.courseSidebarFontRegular}>Home</Text></Button>
                <Button transparent onPress={this.openCourseOverview}><Image style={{ marginLeft: 20, width: "22px", height: "22px" }} source={require('../../assets/svg/home.svg')} /><Text style={styles.courseSidebarFontRegular}>Overview</Text></Button>
                <Button transparent onPress={this.openCourseDetails}><Image style={{ marginLeft: 20, width: "22px", height: "22px" }} source={require('../../assets/svg/education.svg')} /><Text style={styles.courseSidebarFontRegular}>Course</Text></Button>
                <Button transparent onPress={this.openCourseCoaching}><Image style={{ marginLeft: 20, width: "22px", height: "22px" }} source={require('../../assets/svg/calendar.svg')} /><Text style={styles.courseSidebarFontRegular}>Coaching</Text></Button>
                <Container style={{ backgroundColor: "#00000000" }}>
                    <AnimatedProgressWheel
                        size={120}
                        width={10}
                        color={'#71C209'}
                        progress={45}
                        backgroundColor={'#333333'}
                        animateFromValue={0}
                        duration={1000}
                    />
                    <Container style={{ backgroundColor: "#00000000", position: "absolute", top: 15, left: 15 }}>
                        <AnimatedProgressWheel
                            size={90}
                            width={10}
                            color={'#F0493E'}
                            progress={45}
                            backgroundColor={'#333333'}
                            animateFromValue={0}
                            duration={1000}
                        />
                    </Container>
                </Container>
            </Container>
        )
    }
}
export default CourseSidebar