import { Header, Left, Body, Right, Button } from "native-base"

import React from "react"
import { Text, Dimensions } from "react-native"
import HeaderStyles from "../Header/style"

import { ResourceContext } from "./ResourceContext"
import EditableButton from "../Forms/EditableButton"
import JCComponent from "../JCComponent/JCComponent"
import { EmptyProps } from "../../src/types"

class ResourceMenu extends JCComponent<EmptyProps> {
  static Consumer = ResourceContext.Consumer
  constructor(props: EmptyProps) {
    super(props)
    //console.log(props.items)
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
  headerStyles: HeaderStyles = new HeaderStyles()
  render(): React.ReactNode {
    //const { navigate } = this.props.navigation;
    return (
      <ResourceMenu.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          return (
            <>
              {resourceState.resourceData.resources.items.map((item, index: number) => {
                if (item != null)
                  return (
                    <EditableButton
                      onDelete={() => resourceActions.deleteResource(index)}
                      onChange={(value) =>
                        resourceActions.updateResource(index, "menuTitle", value)
                      }
                      key={index}
                      placeholder="temp"
                      isEditable={resourceState.isEditable}
                      onPress={() => resourceActions.changeResource(index)}
                      inputStyle={this.headerStyles.style.centerMenuButtonsText}
                      textStyle={this.headerStyles.style.centerMenuButtonsText}
                      value={item.menuTitle}
                    ></EditableButton>
                  )
                else return null
              })}

              {resourceState.isEditable ? (
                <Button transparent onPress={resourceActions.createResource}>
                  <Text style={this.headerStyles.style.centerMenuButtonsText}>+</Text>
                </Button>
              ) : null}
            </>
          )
        }}
      </ResourceMenu.Consumer>
    )
  }
}
export default ResourceMenu
