import { Ionicons } from "@expo/vector-icons"
import { Body, Button, Header, Left, Picker, Right } from "native-base"
import React from "react"
import { Dimensions, Text, View } from "react-native"
import { ResourcePageItemStyle } from "../../src/API"
import { ResourceSetupProp } from "../../src/types"
import EditableButton from "../Forms/EditableButton"
import HeaderStyles from "../Header/style"
import JCComponent from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"

interface Props extends ResourceSetupProp {}

class ResourceMenu extends JCComponent<Props> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
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

  static renderAdmin(page: PageItemSettings): React.ReactNode {
    return (
      <>
        <Picker
          mode="dropdown"
          style={{
            width: "100%",
            marginTop: 10,
            marginBottom: 30,
            fontSize: 16,
            height: 30,
            flexGrow: 0,
            paddingTop: 3,
            paddingBottom: 3,
          }}
          selectedValue={page.state.settings.style}
          onValueChange={(value: any) => {
            const tmp = page.state.settings
            tmp.style = value
            page.setState({ settings: tmp })
          }}
        >
          {Object.keys(ResourcePageItemStyle)
            .filter((z) => z.startsWith("Menu"))
            .map((org) => {
              return <Picker.Item key={org} label={org} value={org} />
            })}
        </Picker>
      </>
    )
  }
  headerStyles: HeaderStyles = new HeaderStyles()

  renderTopMenu() {
    return (
      <Header style={this.headerStyles.style.resourceContainer}>
        <Left></Left>
        <Body style={this.styles.style.resourcesSubMenu}>{this.renderItems()}</Body>
        <Right></Right>
      </Header>
    )
  }
  renderLeftMenu() {
    return this.renderItems()
  }
  renderItems() {
    return (
      <ResourceMenu.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          return (
            <>
              <PageItemSettings
                resourceActions={this.props.resourceActions}
                resourceState={this.props.resourceState}
                pageItemIndex={this.props.pageItemIndex}
                save={this.props.save}
                delete={this.props.delete}
                pageItem={this.props.pageItem}
              ></PageItemSettings>
              {resourceState.resourceData?.menuItems?.items?.map((item, index: number) => {
                if (item != null)
                  return (
                    <View style={{ flexDirection: "row" }}>
                      {item.depth == "2" && <View style={{ width: 10 }} />}
                      <EditableButton
                        onDelete={() => resourceActions.deleteMenuItem(index)}
                        onChange={(value) =>
                          resourceActions.updateMenuItem(index, "menuTitle", value)
                        }
                        key={index}
                        placeholder="temp"
                        isEditable={resourceState.isEditable}
                        onPress={() => resourceActions.changeMenuItem(index)}
                        inputStyle={this.headerStyles.style.centerMenuButtonsText}
                        textStyle={this.headerStyles.style.centerMenuButtonsText}
                        value={item.menuTitle ?? ""}
                      ></EditableButton>
                      {resourceState.isEditable ? (
                        item.depth == "1" ? (
                          <Button
                            transparent
                            onPress={async () => {
                              await resourceActions.updateMenuItem(index, "depth", "2")
                            }}
                          >
                            <Ionicons
                              name="ios-arrow-round-forward"
                              style={this.headerStyles.style.icon}
                            />
                          </Button>
                        ) : (
                          <Button
                            transparent
                            onPress={async () => {
                              await resourceActions.updateMenuItem(index, "depth", "1")
                            }}
                          >
                            <Ionicons
                              name="ios-arrow-round-back"
                              style={this.headerStyles.style.icon}
                            />
                          </Button>
                        )
                      ) : null}
                    </View>
                  )
                else return null
              })}

              {resourceState.isEditable ? (
                <Button transparent onPress={resourceActions.createMenuItem}>
                  <Text style={this.headerStyles.style.centerMenuButtonsText}>+</Text>
                </Button>
              ) : null}
            </>
          )
        }}
      </ResourceMenu.Consumer>
    )
  }
  render(): React.ReactNode {
    //const { navigate } = this.props.navigation;

    switch (this.props.pageItem?.style) {
      case "MenuTop":
        return this.renderTopMenu()
      case "MenuLeft":
        return this.renderLeftMenu()
      default:
        return this.renderLeftMenu()
    }
  }
}
export default ResourceMenu
