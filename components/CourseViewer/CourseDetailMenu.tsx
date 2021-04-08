import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Body, Button, Header, Right } from "native-base"
import React from "react"
import { Dimensions, Text } from "react-native"
import { constants } from "../../src/constants"
import { EmptyProps } from "../../src/types"
import EditableButton from "../Forms/EditableButton"
import HeaderStyles from "../Header/style"
import JCComponent from "../JCComponent/JCComponent"
import { CourseContext } from "./CourseContext"

interface Props {
  navigation?: any
  route?: any
}
class CourseDetailMenuImpl extends JCComponent<Props> {
  static Consumer = CourseContext.Consumer
  constructor(props: EmptyProps) {
    super(props)
  }
  openMessages = (): void => {
    this.props.navigation.push("ConversationScreen")
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
          return (
            <Header style={this.headerStyles.style.resourceContainer}>
              <Body
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  marginLeft: "4.5%",
                }}
              >
                {Object.values(state.courseWeeks).map((item, index: number) => {
                  if (item) {
                    return (
                      <EditableButton
                        testID={"menu-item-" + index}
                        onDelete={() => actions.deleteWeek(item.id)}
                        onChange={(value) => actions.updateWeek(item.id, "name", value)}
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
                    )
                  }

                  return null
                })}

                {state.isEditable ? (
                  <Button testID="course-menu-createWeek" transparent onPress={actions.createWeek}>
                    <Text style={this.headerStyles.style.centerMenuButtonsText}>+</Text>
                  </Button>
                ) : null}
              </Body>
              <Right>
                {constants["SETTING_ISVISIBLE_MESSAGES"] ? (
                  <Button transparent testID="header-messages" onPress={this.openMessages}>
                    <Ionicons name="mail-outline" style={this.headerStyles.style.icon} />
                  </Button>
                ) : null}
              </Right>
            </Header>
          )
        }}
      </CourseDetailMenuImpl.Consumer>
    )
  }
}
export default function CourseDetailMenu(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <CourseDetailMenuImpl {...props} navigation={navigation} route={route} />
}
