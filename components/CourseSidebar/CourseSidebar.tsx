import { Container, Button } from 'native-base';

import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import HeaderStyles from '../CourseSidebar/style';

import React from 'react';
import { Image, Text, Dimensions } from 'react-native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import JCComponent from '../JCComponent/JCComponent';
import JCButton, { ButtonTypes } from '../Forms/JCButton';

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
    headerStyles = HeaderStyles.getInstance();

    updateStyles = (): void => {
        this.headerStyles.update()
        this.forceUpdate();
    };
    componentDidMount(): void {
        Dimensions.addEventListener('change', this.updateStyles)
    }
    componentWillUnmount(): void {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.updateStyles);
    }
    openDrawer = (): void => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    openHome = (): void => {
        this.props.navigation.push("HomeScreen");
    }
    openCourseHome = (): void => {
        this.props.navigation.push("CourseHomeScreen", { id: this.props.courseId, screen: "Home", create: false });
    }
    openCourseOverview = (): void => {
        this.props.navigation.push("CourseOverviewScreen", { id: this.props.courseId, screen: "Home", create: false });
    }
    openCourseDetails = (): void => {
        this.props.navigation.push("CourseHomeScreen", { id: this.props.courseId, screen: "Details", create: false });
    }
    openCourseCoaching = (): void => {
        this.props.navigation.push("CourseHomeScreen", { id: this.props.courseId, screen: "Coaching", create: false });
    }
    render(): React.ReactNode {
        //const { navigate } = this.props.navigation;
        return (
            <Container style={this.styles.style.courseSideBar}>
                <Button
                    transparent
                    data-testid="header-logo"
                    onPress={this.openHome}>
                    <Image style={this.headerStyles.style.logo}
                        source={require('../../assets/header/icon.png')}
                    /></Button>

                <JCButton buttonType={ButtonTypes.CourseSideBarFirst} onPress={this.openCourseHome}><Image style={{ marginRight: 12, width: "30px", height: "30px", top: 6 }} source={require('../../assets/svg/home.svg')} /><Text style={this.styles.style.courseSidebarFontRegular}>Home</Text></JCButton>
                <JCButton buttonType={ButtonTypes.CourseSideBar} onPress={this.openCourseDetails}><Image style={{ marginRight: 12, width: "30px", height: "30px", top: 6 }} source={require('../../assets/svg/education.svg')} /><Text style={this.styles.style.courseSidebarFontRegular}>Course</Text></JCButton>
                <JCButton buttonType={ButtonTypes.CourseSideBar} onPress={this.openCourseCoaching}><Image style={{ marginRight: 12, width: "30px", height: "30px", top: 6 }} source={require('../../assets/svg/calendar.svg')} /><Text style={this.styles.style.courseSidebarFontRegular}>Coaching</Text></JCButton>
                <Container style={{ backgroundColor: "#00000000", alignSelf: 'center', marginTop: 75 }}>
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
export default function CourseSidebar(props: Props): JSX.Element {
    const route = useRoute();
    const navigation = useNavigation()
    return <CourseSidebarImpl {...props} navigation={navigation} route={route} />;
}

