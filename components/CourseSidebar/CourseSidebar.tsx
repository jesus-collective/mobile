import { Container, Button } from 'native-base';

import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';

import React from 'react';
import { Image, Text } from 'react-native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import JCComponent from '../JCComponent/JCComponent';

interface Props {
    navigation?: any,
    courseId: any
    route?: any
    //  title:string,
    //  onMapChange?():any
}
class CourseSidebarImpl extends JCComponent<Props> {

    constructor(props: Props) {
        super(props);
    }

    openDrawer = (): void => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    openHome = (): void => {
        this.props.navigation.push("HomeScreen");
    }
    openCourseHome = (): void => {
        this.props.navigation.push("CourseHomeScreen", { id: this.props.courseId, create: false });
    }
    openCourseOverview = (): void => {
        this.props.navigation.push("CourseOverviewScreen", { id: this.props.courseId, create: false });
    }
    openCourseDetails = (): void => {
        this.props.navigation.push("CourseDetailScreen", { id: this.props.courseId, create: false });
    }
    openCourseCoaching = (): void => {
        this.props.navigation.push("CourseCoachingScreen", { id: this.props.courseId, create: false });
    }
    render(): React.ReactNode {
        //const { navigate } = this.props.navigation;
        return (
            <Container style={{ flex: 15, backgroundColor: "#000000" }}>
                <Button style={{ marginBottom: 40 }}
                    transparent
                    onPress={this.openHome}>
                    <Image style={this.styles.style.logo}
                        source={require('../../assets/header/icon.png')}
                    /></Button>
                <Button transparent onPress={this.openCourseHome}><Image style={{ marginLeft: 20, width: "22px", height: "22px" }} source={require('../../assets/svg/home.svg')} /><Text style={this.styles.style.courseSidebarFontRegular}>Home</Text></Button>
                <Button transparent onPress={this.openCourseOverview}><Image style={{ marginLeft: 20, width: "22px", height: "22px" }} source={require('../../assets/svg/home.svg')} /><Text style={this.styles.style.courseSidebarFontRegular}>Overview</Text></Button>
                <Button transparent onPress={this.openCourseDetails}><Image style={{ marginLeft: 20, width: "22px", height: "22px" }} source={require('../../assets/svg/education.svg')} /><Text style={this.styles.style.courseSidebarFontRegular}>Course</Text></Button>
                <Button transparent onPress={this.openCourseCoaching}><Image style={{ marginLeft: 20, width: "22px", height: "22px" }} source={require('../../assets/svg/calendar.svg')} /><Text style={this.styles.style.courseSidebarFontRegular}>Coaching</Text></Button>
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
export default function CourseSidebar(props: Props) {
    const route = useRoute();
    const navigation = useNavigation()
    return <CourseSidebarImpl {...props} navigation={navigation} route={route} />;
}

