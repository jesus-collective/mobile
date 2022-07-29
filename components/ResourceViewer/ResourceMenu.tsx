import { Ionicons } from "@expo/vector-icons"
import { Body, Header, Left, Right } from "native-base"
import React from "react"
import { Dimensions, Picker, Pressable, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import {
  ResourceMenuItemType,
  ResourcePageItemStyle,
  UpdateResourceMenuItemInput,
} from "../../src/API"
import { ResourceSetupProp } from "../../src/types"
import EditableButton from "../Forms/EditableButton"
import HeaderStyles from "../Header/style"
import JCComponent from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext, ResourceState } from "./ResourceContext"
//interface Props extends ResourceSetupProp {}

class ResourceMenu extends JCComponent<ResourceSetupProp> {
  static Consumer = ResourceContext.Consumer
  constructor(props: ResourceSetupProp) {
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
          selectedValue={page.state.settings.style ?? undefined}
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

  renderTopMenu(): React.ReactNode {
    return (
      <Header style={this.headerStyles.style.resourceContainer}>
        <Left></Left>
        <Body style={this.styles.style.resourcesSubMenu}>{this.renderItems()}</Body>
        <Right></Right>
      </Header>
    )
  }
  renderLeftMenu(): React.ReactNode {
    return <View style={{ marginLeft: "7.78vw" }}>{this.renderItems()}</View>
  }
  parentIsSelected(resourceState: ResourceState, index: number): boolean {
    console.log({ index: index })
    for (let z: number = index; z--; z >= resourceState.currentMenuItem) {
      const menuItem: UpdateResourceMenuItemInput = resourceState.resourceData?.menuItems.items[z]
      console.log({ depth: menuItem.depth })
      if ((menuItem?.depth ?? "1") == "1") return z == resourceState.currentMenuItem
      if (z < 0) return false
    }
    return false
  }

  siblingIsSelected(resourceState: ResourceState, index: number): boolean {
    if (index < resourceState.currentMenuItem)
      for (let z: number = index; z++; z <= resourceState.currentMenuItem) {
        const menuItem: UpdateResourceMenuItemInput = resourceState.resourceData?.menuItems.items[z]
        if ((menuItem?.depth ?? "1") == "1") return false
        if (z > resourceState.resourceData?.menuItems?.items.length)
          return z == resourceState.currentMenuItem
      }
    else
      for (let z: number = index; z--; z >= resourceState.currentMenuItem) {
        const menuItem: UpdateResourceMenuItemInput = resourceState.resourceData?.menuItems.items[z]
        if ((menuItem?.depth ?? "1") == "1") return z == resourceState.currentMenuItem
        if (z < 0) return false
      }
    return true
  }
  isMenuItemExpanded(resourceState: ResourceState, index: number): boolean {
    const menuItem: UpdateResourceMenuItemInput = resourceState.resourceData?.menuItems.items[index]
    if (menuItem?.depth == "1" || menuItem?.depth == null) return true
    if (this.parentIsSelected(resourceState, index)) return true
    else if (index == resourceState.currentMenuItem) return true
    else if (this.siblingIsSelected(resourceState, index)) return true
    else return false
  }
  MenuIcon1 = (): JSX.Element => (
    <Ionicons name="md-menu" style={this.headerStyles.style.resourceIcon} />
  )
  BreakIcon1 = (): JSX.Element => (
    <Ionicons name="md-menu" style={this.headerStyles.style.resourceIcon} />
  )
  ScheduleIcon1 = (): JSX.Element => (
    <Ionicons name="md-menu" style={this.headerStyles.style.resourceIcon} />
  )
  FindParentIndex = (itemIndex: number, currentActiveIndex: number, items: any): number => {
    for (let i = currentActiveIndex - 1; i > 1; i--) {
      if (!items[i]?.depth || items[i]?.depth === "1") {
        return i
      }
    }
    return itemIndex
  }
  DetermineActiveMenuItem = (
    itemIndex: number,
    currentActiveIndex: number,
    items: any
  ): boolean => {
    console.log("active index is ", currentActiveIndex)
    const activeIndexItem = items[currentActiveIndex]
    if (itemIndex === currentActiveIndex) {
      return true
    } else {
      if (activeIndexItem?.depth !== null) {
        if (currentActiveIndex < itemIndex) return false
        const activeUntilThisIndex = this.FindParentIndex(itemIndex, currentActiveIndex, items)
        if (activeUntilThisIndex >= itemIndex && itemIndex > 0) {
          return true
        }
      }
    }
    return false
  }
  renderItems(): React.ReactNode {
    return (
      <ResourceMenu.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          return (
            <View
              style={{
                zIndex: 5000 + this.props.pageItemIndex.length,
                borderRadius: 8,
                backgroundColor: "#F6F5F5",
                marginRight: 60,
              }}
            >
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
                console.log({ item })
                if (item != null)
                  return item.type == ResourceMenuItemType.break ? (
                    <View key={index} style={{ flexDirection: "row" }}>
                      <View
                        style={[this.styles.style.resourceMenuLineBreak, { marginLeft: 0 }]}
                      ></View>
                      {resourceState.isEditable && (
                        <Pressable
                          onPress={async () => {
                            await resourceActions.deleteMenuItem(index)
                          }}
                        >
                          <Ionicons name="ios-close" style={this.headerStyles.style.icon} />
                        </Pressable>
                      )}
                    </View>
                  ) : this.isMenuItemExpanded(resourceState, index) ? (
                    <View
                      key={index}
                      style={[
                        {
                          flexDirection: "row",
                          paddingHorizontal: 16,
                          paddingVertical: 4,
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        },
                        this.DetermineActiveMenuItem(
                          index,
                          resourceState.currentMenuItem,
                          resourceState.resourceData?.menuItems?.items
                        ) && {
                          backgroundColor: "#E4E1E1",
                        },
                      ]}
                    >
                      {item.depth == "2" && <View style={{ width: 16 }} />}
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
                        textStyle={[
                          this.headerStyles.style.resourcesMenuButtonsText,
                          resourceState.currentMenuItem == index && {
                            fontWeight: "bold",
                          },
                          { marginLeft: 0 },
                        ]}
                        value={item.menuTitle ?? ""}
                      ></EditableButton>
                      {resourceState.isEditable ? (
                        <>
                          {item.depth == "1" || item.depth == null ? (
                            <Pressable
                              onPress={async () => {
                                await resourceActions.updateMenuItem(index, "depth", "2")
                              }}
                            >
                              <Ionicons
                                name="arrow-forward-outline"
                                style={this.headerStyles.style.icon}
                              />
                            </Pressable>
                          ) : (
                            <Pressable
                              onPress={async () => {
                                await resourceActions.updateMenuItem(index, "depth", "1")
                              }}
                            >
                              <Ionicons
                                name="arrow-back-outline"
                                style={this.headerStyles.style.icon}
                              />
                            </Pressable>
                          )}
                          {index >= 1 && (
                            <Pressable
                              onPress={async () => {
                                await resourceActions.moveMenuItemUp(index)
                              }}
                            >
                              <Ionicons
                                name="arrow-up-outline"
                                style={this.headerStyles.style.icon}
                              />
                            </Pressable>
                          )}
                        </>
                      ) : null}
                    </View>
                  ) : null
                else return null
              })}

              {resourceState.isEditable ? (
                <DropDownPicker
                  items={[
                    {
                      label: "Menu Item",
                      value: "menuitem",
                      icon: this.MenuIcon1,
                    },
                    {
                      label: "Break",
                      value: "break",
                      icon: this.BreakIcon1,
                    },
                    {
                      label: "Schedule",
                      value: "schedule",
                      icon: this.ScheduleIcon1,
                    },
                  ]}
                  placeholder="+"
                  containerStyle={{ height: 40, width: 160, marginTop: 5, marginBottom: 5 }}
                  dropDownStyle={{ backgroundColor: "#FF4438", width: 150 }}
                  style={{ backgroundColor: "#FF4438" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                    width: 100,
                  }}
                  labelStyle={{
                    fontSize: 14,
                    textAlign: "left",
                    color: "#FFFFFF",
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  arrowColor="#FFFFFF"
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
