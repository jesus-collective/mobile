import { Ionicons } from "@expo/vector-icons"
import { Body, Button, Header, Left, Picker, Right } from "native-base"
import React from "react"
import { Dimensions, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { ResourceMenuItemType, ResourcePageItemStyle } from "../../src/API"
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
            <View style={{ zIndex: 5000 + this.props.pageItemIndex.length }}>
              <PageItemSettings
                resourceActions={this.props.resourceActions}
                resourceState={this.props.resourceState}
                pageItemIndex={this.props.pageItemIndex}
                save={this.props.save}
                delete={this.props.delete}
                pageItem={this.props.pageItem}
                hideEditButton={this.props.hideEditButton}
              ></PageItemSettings>
              {resourceState.resourceData?.menuItems?.items?.map((item, index: number) => {
                if (item != null)
                  return item.type == ResourceMenuItemType.break ? (
                    <View key={index}>
                      <View
                        style={{ flexDirection: "row", borderBottomWidth: 1, width: 100 }}
                      ></View>
                      {resourceState.isEditable && (
                        <Button
                          transparent
                          onPress={async () => {
                            await resourceActions.deleteMenuItem(index)
                          }}
                        >
                          <Ionicons name="ios-close" style={this.headerStyles.style.icon} />
                        </Button>
                      )}
                    </View>
                  ) : (
                    <View key={index} style={{ flexDirection: "row", height: 32 }}>
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
                        inputStyle={this.headerStyles.style.resourcesMenuButtonsText}
                        textStyle={this.headerStyles.style.resourcesMenuButtonsText}
                        value={item.menuTitle ?? ""}
                      ></EditableButton>
                      {resourceState.isEditable ? (
                        <>
                          {item.depth == "1" || item.depth == null ? (
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
                          )}
                          {index >= 1 && (
                            <Button
                              transparent
                              onPress={async () => {
                                await resourceActions.moveMenuItemUp(index)
                              }}
                            >
                              <Ionicons
                                name="ios-arrow-round-up"
                                style={this.headerStyles.style.icon}
                              />
                            </Button>
                          )}
                        </>
                      ) : null}
                    </View>
                  )
                else return null
              })}

              {resourceState.isEditable ? (
                <DropDownPicker
                  items={[
                    {
                      label: "Menu Item",
                      value: "menuitem",
                      icon: () => <Ionicons name="md-menu" style={this.headerStyles.style.icon} />,
                      hidden: true,
                    },
                    {
                      label: "Break",
                      value: "break",
                      icon: () => <Ionicons name="md-menu" style={this.headerStyles.style.icon} />,
                    },
                    {
                      label: "Schedule",
                      value: "schedule",
                      icon: () => <Ionicons name="md-menu" style={this.headerStyles.style.icon} />,
                    },
                  ]}
                  placeholder="+"
                  containerStyle={{ height: 40, width: 60 }}
                  dropDownStyle={{ backgroundColor: "#fafafa", width: 150 }}
                  style={{ backgroundColor: "#fafafa" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                    width: 100,
                  }}
                  labelStyle={{
                    fontSize: 14,
                    textAlign: "left",
                    color: "#000",
                  }}
                  onChangeItem={(item) => {
                    if (item.value == "menuitem")
                      resourceActions.createMenuItem(ResourceMenuItemType.menuItem)
                    else if (item.value == "break")
                      resourceActions.createMenuItem(ResourceMenuItemType.break)
                  }}
                />
              ) : null}
            </View>
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
