import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { Dimensions, EmitterSubscription, Image, Pressable, Text, View } from "react-native"
import HeaderStyles from "../CourseSidebar/style"
import { CourseContext } from "../CourseViewer/CourseContext"
import JCButton, { ButtonTypes } from "../Forms/JCButton"
//import AnimatedProgressWheel from 'react-native-progress-wheel';
import JCComponent from "../JCComponent/JCComponent"

interface Props {
  navigation?: StackNavigationProp<any, any>
  courseId: any
  route?: any
  //  title:string,
  //  onMapChange?():any
}
class CourseSidebarImpl extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }
  static Consumer = CourseContext.Consumer
  headerStyles = HeaderStyles.getInstance()
  dimensionsSubscription: EmitterSubscription | undefined
  updateStyles = (): void => {
    this.headerStyles.update()
    this.forceUpdate()
  }
  componentDidMount(): void {
    this.dimensionsSubscription = Dimensions.addEventListener("change", this.updateStyles)
  }
  componentWillUnmount(): void {
    // Important to stop updating state after unmount
    this.dimensionsSubscription?.remove()
    //    Dimensions.removeEventListener("change", this.updateStyles)
  }
  openDrawer = (): void => {
    this.props.navigation?.dispatch(DrawerActions.openDrawer())
  }

  openHome = (): void => {
    this.props.navigation?.push("HomeScreen")
  }
  openCourseHome = (): void => {
    this.props.navigation?.push("CourseHomeScreen", {
      id: this.props.courseId,
      screen: "Home",
      create: false,
    })
  }
  openCourseOverview = (): void => {
    this.props.navigation?.push("CourseOverviewScreen", {
      id: this.props.courseId,
      screen: "Home",
      create: false,
    })
  }
  openCourseDetails = (): void => {
    this.props.navigation?.push("CourseHomeScreen", {
      id: this.props.courseId,
      screen: "Details",
      create: false,
    })
  }
  openCourseCoaching = (): void => {
    this.props.navigation?.push("CourseHomeScreen", {
      id: this.props.courseId,
      screen: "Coaching",
      create: false,
    })
  }
  render(): React.ReactNode {
    return (
      <CourseSidebarImpl.Consumer>
        {({ state, actions }) => {
          if (!state) return null

          return (
            <View style={this.styles.style.courseSideBar}>
              <Pressable testID="header-logo" onPress={this.openHome}>
                <Image
                  style={this.headerStyles.style.logo}
                  source={require("../../assets/header/icon.png")}
                />
              </Pressable>

              <JCButton
                testID={"course-menu-home"}
                buttonType={ButtonTypes.CourseSideBarFirst}
                onPress={this.openCourseHome}
              >
                <Image
                  style={
                    state.currentScreen == "Home"
                      ? this.styles.style.courseSidebarNavIconActive
                      : this.styles.style.courseSidebarNavIconInactive
                  }
                  source={require("../../assets/svg/home.svg")}
                />
                <Text
                  style={
                    state.currentScreen == "Home"
                      ? this.styles.style.courseSidebarNavTextActive
                      : this.styles.style.courseSidebarNavTextInactive
                  }
                >
                  Home
                </Text>
              </JCButton>
              <JCButton
                testID={"course-menu-details"}
                buttonType={ButtonTypes.CourseSideBar}
                onPress={this.openCourseDetails}
              >
                <Image
                  style={
                    state.currentScreen == "Details"
                      ? this.styles.style.courseSidebarNavIconActive
                      : this.styles.style.courseSidebarNavIconInactive
                  }
                  source={require("../../assets/svg/education.svg")}
                />
                <Text
                  style={
                    state.currentScreen == "Details"
                      ? this.styles.style.courseSidebarNavTextActive
                      : this.styles.style.courseSidebarNavTextInactive
                  }
                >
                  Course
                </Text>
              </JCButton>
              {/*  <JCButton buttonType={ButtonTypes.CourseSideBar} onPress={this.openCourseCoaching}><Image style={{ marginRight: 12, width: "30px", height: "30px", top: 6 }} source={require('../../assets/svg/calendar.svg')} /><Text style={this.styles.style.courseSidebarFontRegular}>Coaching</Text></JCButton>*/}
              {/* <View style={this.styles.style.animatedCircleContainerSideBar}>
                                <AnimatedProgressWheel
                                    size={120}
                                    width={10}
                                    color={'#71C209'}
                                    progress={45}
                                    backgroundColor={'#333333'}
                                    animateFromValue={0}
                                    duration={1000}
                                />
                                <View style={{ backgroundColor: "#00000000", position: "absolute", top: 15, left: 15 }}>
                                    <AnimatedProgressWheel
                                        size={90}
                                        width={10}
                                        color={'#F0493E'}
                                        progress={45}
                                        backgroundColor={'#333333'}
                                        animateFromValue={0}
                                        duration={1000}
                                    />
                                </View>
                    </View>*/}
              {state.isEditable ? (
                <JCButton
                  testID={"course-edit"}
                  buttonType={ButtonTypes.EditButton}
                  onPress={() => {
                    actions.setEditMode(!state.editMode)
                  }}
                >
                  <Text style={{ color: "#ffffff" }}>
                    {state.editMode ? "View Course" : "Edit Course"}
                  </Text>
                </JCButton>
              ) : null}
            </View>
          )
        }}
      </CourseSidebarImpl.Consumer>
    )
  }
}
export default function CourseSidebar(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return <CourseSidebarImpl {...props} navigation={navigation} route={route} />
}
