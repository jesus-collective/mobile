import { Ionicons } from "@expo/vector-icons"
import React, { useContext, useState } from "react"
import { Dimensions, Picker, Pressable, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import MainStyles from "../../components/style"
import {
  ResourceMenuItemType,
  ResourcePageItemStyle,
  UpdateResourceMenuItemInput,
} from "../../src/API"
import { ResourceAdminProp, ResourceSetupProp } from "../../src/types"
import EditableButton from "../Forms/EditableButton"
import HeaderStyles from "../Header/style"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"
import ResourceMenuBreakItem from "./ResourceMenu/ResourceMenuBreakItem"
export function ResourceMenuAdmin(props: ResourceAdminProp): JSX.Element {
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
        selectedValue={props.settings.style ?? undefined}
        onValueChange={(value: any) => {
          const tmp = props.settings
          tmp.style = value
          props.setSettings(tmp)
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
export default function ResourceMenu(props: ResourceSetupProp): JSX.Element {
  const styles = MainStyles.getInstance()
  const [open, setOpen] = useState<boolean>(false)
  const resourceContext = useContext(ResourceContext)

  const updateStyles = (): void => {
    headerStyles.update()
    // forceUpdate()
  }
  React.useEffect(() => {
    const dimensionsSubscription = Dimensions.addEventListener("change", updateStyles)
    return () => {
      dimensionsSubscription.remove()
    }
  }, [])
  const headerStyles: HeaderStyles = new HeaderStyles()

  const renderTopMenu = (): JSX.Element => {
    return (
      <View style={headerStyles.style.resourceContainer}>
        <View></View>
        <View style={styles.style.resourcesSubMenu}>{renderItems()}</View>
        <View></View>
      </View>
    )
  }
  const renderLeftMenu = (): JSX.Element => {
    return <View style={{ marginLeft: "7.78vw" }}>{renderItems()}</View>
  }
  const parentIsSelected = (index: number): boolean => {
    if (resourceContext.resourceState) {
      console.log({ index: index })
      for (let z: number = index; z--; z >= resourceContext.resourceState.currentMenuItem) {
        const menuItem: UpdateResourceMenuItemInput =
          resourceContext.resourceState.resourceData?.menuItems.items[z]
        console.log({ depth: menuItem.depth })
        if ((menuItem?.depth ?? "1") == "1")
          return z == resourceContext.resourceState.currentMenuItem
        if (z < 0) return false
      }
      return false
    }
    return false
  }

  const siblingIsSelected = (index: number): boolean => {
    if (resourceContext.resourceState) {
      if (index < resourceContext.resourceState.currentMenuItem)
        for (let z: number = index; z++; z <= resourceContext.resourceState.currentMenuItem) {
          const menuItem: UpdateResourceMenuItemInput =
            resourceContext.resourceState.resourceData?.menuItems.items[z]
          if ((menuItem?.depth ?? "1") == "1") return false
          if (z > resourceContext.resourceState.resourceData?.menuItems?.items.length)
            return z == resourceContext.resourceState.currentMenuItem
        }
      else
        for (let z: number = index; z--; z >= resourceContext.resourceState.currentMenuItem) {
          const menuItem: UpdateResourceMenuItemInput =
            resourceContext.resourceState.resourceData?.menuItems.items[z]
          if ((menuItem?.depth ?? "1") == "1")
            return z == resourceContext.resourceState.currentMenuItem
          if (z < 0) return false
        }
      return true
    }
    return false
  }
  const isMenuItemExpanded = (index: number): boolean => {
    if (resourceContext.resourceState) {
      const menuItem: UpdateResourceMenuItemInput =
        resourceContext.resourceState.resourceData?.menuItems.items[index]
      if (menuItem?.depth == "1" || menuItem?.depth == null) return true
      if (parentIsSelected(index)) return true
      else if (index == resourceContext.resourceState.currentMenuItem) return true
      else if (siblingIsSelected(index)) return true
      else return false
    } else return false
  }
  const MenuIcon1 = (): JSX.Element => (
    <Ionicons name="md-menu" style={headerStyles.style.resourceIcon} />
  )
  const BreakIcon1 = (): JSX.Element => (
    <Ionicons name="md-menu" style={headerStyles.style.resourceIcon} />
  )
  const ScheduleIcon1 = (): JSX.Element => (
    <Ionicons name="md-menu" style={headerStyles.style.resourceIcon} />
  )
  const FindParentIndex = (itemIndex: number, currentActiveIndex: number, items: any): number => {
    for (let i = currentActiveIndex - 1; i > 1; i--) {
      if (!items[i]?.depth || items[i]?.depth === "1") {
        return i
      }
    }
    return itemIndex
  }
  const DetermineActiveMenuItem = (
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
        const activeUntilThisIndex = FindParentIndex(itemIndex, currentActiveIndex, items)
        if (activeUntilThisIndex >= itemIndex && itemIndex > 0) {
          return true
        }
      }
    }
    return false
  }
  const renderItems = (): JSX.Element | null => {
    if (!resourceContext.resourceState) return null
    return (
      <View
        style={{
          zIndex: 5000 + props.pageItemIndex.length,
          borderRadius: 8,
          backgroundColor: "#F6F5F5",
          marginRight: 60,
        }}
      >
        <PageItemSettings
          pageItemIndex={props.pageItemIndex}
          save={props.save}
          delete={props.delete}
          pageItem={props.pageItem}
          hideEditButton={props.hideEditButton}
        ></PageItemSettings>
        {resourceContext.resourceState.resourceData?.menuItems?.items?.map(
          (item, index: number) => {
            console.log({ item })
            if (item != null)
              return item.type == ResourceMenuItemType.break ? (
                <ResourceMenuBreakItem
                  isEditable={resourceContext.resourceState?.isEditable}
                  deleteItem={() => resourceContext.resourceActions.deleteMenuItem(index)}
                  style={[styles.style.resourceMenuLineBreak, { marginLeft: 0 }]}
                />
              ) : isMenuItemExpanded(index) ? (
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
                    DetermineActiveMenuItem(
                      index,
                      resourceContext.resourceState?.currentMenuItem ?? 0,
                      resourceContext.resourceState?.resourceData?.menuItems?.items
                    ) && {
                      backgroundColor: "#E4E1E1",
                    },
                  ]}
                >
                  {item.depth == "2" && <View style={{ width: 16 }} />}
                  <EditableButton
                    onDelete={() => resourceContext.resourceActions.deleteMenuItem(index)}
                    onChange={(value) =>
                      resourceContext.resourceActions.updateMenuItem(index, "menuTitle", value)
                    }
                    key={index}
                    placeholder="temp"
                    isEditable={resourceContext.resourceState?.isEditable ?? false}
                    onPress={() => resourceContext.resourceActions.changeMenuItem(index)}
                    inputStyle={headerStyles.style.resourcesMenuButtonsText}
                    textStyle={[
                      headerStyles.style.resourcesMenuButtonsText,
                      resourceContext.resourceState?.currentMenuItem == index && {
                        fontWeight: "bold",
                      },
                      { marginLeft: 0 },
                    ]}
                    value={item.menuTitle ?? ""}
                  ></EditableButton>
                  {resourceContext.resourceState?.isEditable ? (
                    <>
                      {item.depth == "1" || item.depth == null ? (
                        <Pressable
                          onPress={async () => {
                            await resourceContext.resourceActions.updateMenuItem(
                              index,
                              "depth",
                              "2"
                            )
                          }}
                        >
                          <Ionicons name="arrow-forward-outline" style={headerStyles.style.icon} />
                        </Pressable>
                      ) : (
                        <Pressable
                          onPress={async () => {
                            await resourceContext.resourceActions.updateMenuItem(
                              index,
                              "depth",
                              "1"
                            )
                          }}
                        >
                          <Ionicons name="arrow-back-outline" style={headerStyles.style.icon} />
                        </Pressable>
                      )}
                      {index >= 1 && (
                        <Pressable
                          onPress={async () => {
                            await resourceContext.resourceActions.moveMenuItemUp(index)
                          }}
                        >
                          <Ionicons name="arrow-up-outline" style={headerStyles.style.icon} />
                        </Pressable>
                      )}
                    </>
                  ) : null}
                </View>
              ) : null
            else return null
          }
        )}

        {resourceContext.resourceState?.isEditable ? (
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            setValue={() => null}
            value={"menuitem"}
            items={[
              {
                label: "Menu Item",
                value: "menuitem",
                icon: MenuIcon1,
              },
              {
                label: "Break",
                value: "break",
                icon: BreakIcon1,
              },
              {
                label: "Schedule",
                value: "schedule",
                icon: ScheduleIcon1,
              },
            ]}
            placeholder="Add Menu Item"
            containerStyle={{
              height: 40,
              width: 160,
              marginTop: 5,
              marginBottom: 5,
            }}
            dropDownContainerStyle={{ backgroundColor: "#FF4438", width: 150 }}
            style={{ padding: 3, backgroundColor: "#FF4438", flexDirection: "row" }}
            listItemContainerStyle={{
              flexDirection: "row",
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
            // arrowColor="#FFFFFF"
            onSelectItem={(item) => {
              if (item.value == "menuitem")
                resourceContext.resourceActions.createMenuItem(ResourceMenuItemType.menuItem)
              else if (item.value == "break")
                resourceContext.resourceActions.createMenuItem(ResourceMenuItemType.break)
              else console.log("unknown selection")
            }}
          />
        ) : null}
      </View>
    )
  }

  //const { navigate } = this.props.navigation;

  switch (props.pageItem?.style) {
    case "MenuTop":
      return renderTopMenu()
    case "MenuLeft":
      return renderLeftMenu()
    default:
      return renderLeftMenu()
  }
}
