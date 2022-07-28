import { AntDesign } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Dimensions, Picker, Pressable, Text, View } from "react-native"

import JCButton, { ButtonTypes } from "../Forms/JCButton"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { CourseContext } from "./CourseContext"

const MessageBoard = React.lazy(() => import("../MessageBoard/MessageBoard"))

interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
}

interface State extends JCState {
  triadSelection: number
  showChat: boolean
}
class CourseChatImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      triadSelection: 0,
      showChat: false,
    }
  }
  static Consumer = CourseContext.Consumer

  render(): React.ReactNode {
    console.log("CourseDetail")

    const { width } = Dimensions.get("window")
    const chatWidth = Math.min(width, 563)

    return (
      <CourseChatImpl.Consumer>
        {({ state, actions }) => {
          if (!state?.data) return null
          return state.currentScreen == "Details" ? (
            <View style={{ width: chatWidth }}>
              <View style={this.styles.style.courseDetailButtonTrio}>
                <JCButton
                  buttonType={
                    state.activeMessageBoard === "cohort"
                      ? ButtonTypes.TransparentActivityCourse
                      : ButtonTypes.courseActivityTransparentRegularBlack
                  }
                  onPress={() => {
                    actions.setActiveMessageBoard("cohort")
                  }}
                >
                  Learning Collective
                </JCButton>
                <JCButton
                  buttonType={
                    state.activeMessageBoard === "triad"
                      ? ButtonTypes.TransparentActivityCourse
                      : ButtonTypes.courseActivityTransparentRegularBlack
                  }
                  onPress={() => {
                    actions.setActiveMessageBoard("triad")
                  }}
                >
                  Cohort
                </JCButton>
                <Pressable
                  style={{ zIndex: 1000000, marginLeft: "auto", backgroundColor: "#ffffff00" }}
                  onPress={() => actions.setShowChat()}
                >
                  <AntDesign name="close" size={24} color="black" />
                </Pressable>
              </View>
              <View style={{ marginTop: 38, marginHorizontal: 24 }}>
                {state.activeMessageBoard == "cohort" ? (
                  <MessageBoard
                    style="mini"
                    replies
                    groupId={state.data.id}
                    inputAt="bottom"
                  ></MessageBoard>
                ) : null}
                {state.activeMessageBoard == "triad" ? (
                  actions.myCourseGroups().completeTriad.length == 0 ? (
                    <Text>You have not been added to a cohort</Text>
                  ) : actions.myCourseGroups().completeTriad.length == 1 ? (

                    <MessageBoard
                      style="mini"
                      inputAt="bottom"
                      replies
                      groupId={state.data.id + "-" + actions.myCourseGroups().completeTriad[0].id}
                    ></MessageBoard>
                  ) : (
                    <>
                      <Picker
                        onStartShouldSetResponder={() => true}
                        onMoveShouldSetResponderCapture={() => true}
                        onStartShouldSetResponderCapture={() => true}
                        onMoveShouldSetResponder={() => true}
                        mode="dropdown"
                        style={{
                          width: "50%",
                          marginBottom: 0,
                          marginTop: 0,
                          fontSize: 16,
                          height: 30,
                          flexGrow: 0,
                          marginRight: 0,
                          borderColor: "#dddddd",
                        }}
                        selectedValue={this.state.triadSelection.toString()}
                        onValueChange={(value: string) => {
                          this.setState({ triadSelection: parseInt(value) })
                        }}
                      >
                        {actions.myCourseGroups().completeTriad?.map((item: any, index: number) => {
                          if (item) {
                            const name = item.triad
                              .map((item: any) => {
                                return item.given_name
                              })
                              .join(", ")
                            return <Picker.Item key={index} label={name} value={index.toString()} />
                          }
                        })}
                      </Picker>
                      <MessageBoard
                        style="mini"
                        inputAt="bottom"
                        replies
                        groupId={
                          state.data.id +
                          "-" +
                          actions.myCourseGroups().completeTriad[this.state.triadSelection]?.id
                        }
                      ></MessageBoard>
                    </>
                  )
                ) : null}

                {/*state.activeMessageBoard == "instructor" ? <MessageBoard style="mini" groupId={state.data.id}></MessageBoard> : null*/}
              </View>
            </View>
          ) : null
        }}
      </CourseChatImpl.Consumer>
    )
  }
}

export default function CourseChat(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <CourseChatImpl {...props} navigation={navigation} route={route} />
}
