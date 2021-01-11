import { Body, Button, Header, Right } from "native-base"
import React from "react"
import { Dimensions, Text } from "react-native"
import { EmptyProps } from "../../src/types"
import EditableButton from "../Forms/EditableButton"
import HeaderStyles from "../Header/style"
import JCComponent from "../JCComponent/JCComponent"
import { CourseContext } from "./CourseContext"

class CourseDetailMenu extends JCComponent<EmptyProps> {
  static Consumer = CourseContext.Consumer
  constructor(props: EmptyProps) {
    super(props)
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
    //const { navigate } = this.props.navigation;
    return (
      <CourseDetailMenu.Consumer>
        {({ state, actions }) => {
          if (!state) return null
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
                {state.courseData?.courseWeeks.items.map((item, index: number) => {
                  if (item) {
                    return (
                      <EditableButton
                        onDelete={() => actions.deleteWeek(index)}
                        onChange={(value) => actions.updateWeek(index, "name", value)}
                        key={index}
                        placeholder="temp"
                        isEditable={state.isEditable}
                        onPress={() => actions.setActiveWeek(index)}
                        inputStyle={this.headerStyles.style.centerMenuButtonsText}
                        textStyle={
                          state.activeWeek == index
                            ? this.headerStyles.style.centerMenuButtonsTextSelected
                            : this.headerStyles.style.centerMenuButtonsText
                        }
                        value={item.name}
                      ></EditableButton>
                    )
                  }

                  return null
                })}

                {state.isEditable ? (
                  <Button transparent onPress={actions.createWeek}>
                    <Text style={this.headerStyles.style.centerMenuButtonsText}>+</Text>
                  </Button>
                ) : null}
              </Body>
              <Right></Right>
            </Header>
          )
        }}
      </CourseDetailMenu.Consumer>
    )
  }
}
export default CourseDetailMenu
