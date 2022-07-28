import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { isDesktop } from "react-device-detect"
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { constants } from "../../src/constants"
import EditableButton from "../Forms/EditableButton"
import HeaderStyles from "../Header/style"
import JCComponent from "../JCComponent/JCComponent"
import { CourseActions, CourseContext, CourseState } from "./CourseContext"

interface Props {
  navigation?: StackNavigationProp<any, any>
  route?: any
  listRef: any
}
class CourseDetailMenuImpl extends JCComponent<Props> {
  static Consumer = CourseContext.Consumer
  constructor(props: Props) {
    super(props)
    this.state = {
      listEnd: false,
      containerWidth: Dimensions.get("window").width * 0.85 - 116,
      listLength: 0,
    }
  }
  openMessages = (): void => {
    this.props.navigation?.push("ConversationScreen")
  }

  updateStyles = (): void => {
    this.headerStyles.update()
    this.forceUpdate()
  }
  componentDidMount(): void {
    Dimensions.addEventListener("change", this.updateStyles)
  }
  componentWillUnmount(): void {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.updateStyles)
  }
  headerStyles = new HeaderStyles()
  render(): React.ReactNode {
    return (
      <CourseDetailMenuImpl.Consumer>
        {({ state, actions }) => {
          if (!state) {
            return null
          }
          const menuListRef = React.createRef<ScrollView>()
          const changeArrowState = () => {
            this.setState({ listEnd: false })
          }
          const AddWeekButton = (
            state: CourseState | undefined,
            actions: CourseActions,
            resetArrow: () => void
          ) => {
            return state?.isEditable ? (
              <Pressable
                testID="course-menu-createWeek"
                onPress={async () => {
                  actions.createWeek()
                  resetArrow()
                }}
              >
                <Text
                  style={[this.headerStyles.style.centerMenuButtonsText, { marginHorizontal: 12 }]}
                >
                  +
                </Text>
              </Pressable>
            ) : null
          }
          const Weeks = Object.values(state.courseWeeks).filter((item) => item)
          return (
            <Header style={this.headerStyles.style.resourceContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: 30,
                }}
              >
                {!Weeks.length ? AddWeekButton(state, actions, changeArrowState) : null}
                <ScrollView
                  onLayout={(e) => {
                    // this probably only works for web
                    this.setState({ listLength: e?.nativeEvent?.target?.scrollWidth })
                  }}
                  onContentSizeChange={(w) => {
                    console.log("onContentSizeChange called")
                    w !== this.state.listLength ? this.setState({ listLength: w }) : null
                  }}
                  ref={menuListRef}
                  showsVerticalScrollIndicator={false}
                  horizontal
                >
                  {Weeks.map((item, index) => (
                    <EditableButton
                      testID={"menu-item-" + index}
                      onDelete={() => {
                        actions.deleteWeek(item.id)
                      }}
                      onChange={(value) => {
                        actions.updateWeek(item.id, "name", value)
                      }}
                      key={index}
                      placeholder="temp"
                      isEditable={state.isEditable}
                      onPress={() => actions.setActiveWeek(item.id)}
                      inputStyle={this.headerStyles.style.centerMenuButtonsText}
                      textStyle={
                        state.activeWeek == item.id
                          ? this.headerStyles.style.centerMenuButtonsTextSelected
                          : this.headerStyles.style.centerMenuButtonsText
                      }
                      value={item.name ?? ""}
                    />
                  ))}
                </ScrollView>
                {Weeks.length ? AddWeekButton(state, actions, changeArrowState) : null}
                {this.state.listLength > this.state.containerWidth && isDesktop ? (
                  <Pressable
                    onPress={() => {
                      this.state.listEnd
                        ? menuListRef.current?.scrollTo({ animated: true, x: 0 })
                        : menuListRef.current?.scrollToEnd()

                      this.setState({ listEnd: !this.state.listEnd })
                    }}
                  >
                    <Ionicons
                      name={this.state.listEnd ? "arrow-back" : "arrow-forward"}
                      style={this.headerStyles.style.icon}
                    />
                  </Pressable>
                ) : null}
                {constants["SETTING_ISVISIBLE_MESSAGES"] ? (
                  <View style={{ marginHorizontal: 12 }}>
                    <TouchableOpacity testID="header-messages" onPress={this.openMessages}>
                      <Image
                        style={{ width: 24, height: 24 }}
                        source={require("../../assets/Facelift/svg/Airplane-LightGrey.svg")}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </Header>
          )
        }}
      </CourseDetailMenuImpl.Consumer>
    )
  }
}
export default function CourseDetailMenu(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return <CourseDetailMenuImpl {...props} navigation={navigation} route={route} />
}
