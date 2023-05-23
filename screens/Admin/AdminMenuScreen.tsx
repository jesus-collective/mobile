import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { ListMenusQuery } from "src/API-customqueries"
import { AdminStyles } from "../../components/AdminStyles"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import Header from "../../components/Header/Header"
import JCImage, { JCImageQuality, JCImageStyle } from "../../components/ProfileImage/JCImage"
import ResourceImage from "../../components/ResourceViewer/ResourceImage"
import { ImageInput, ListSubMenusQuery, UserGroupType } from "../../src/API"
import { UserContext } from "../HomeScreen/UserContext"
interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
type MenuItem = NonNullable<NonNullable<ListMenusQuery["listMenus"]>["items"]>[0]
type SubMenuItem = NonNullable<NonNullable<ListSubMenusQuery["listSubMenus"]>["items"]>[0]

export default function AdminScreen(props: Props) {
  const styles = StyleSheet.create(AdminStyles)
  const [showAddMenuItem, setShowAddMenuItem] = useState<boolean>(false)
  const [showAddSubMenuItem, setShowAddSubMenuItem] = useState<string | null>(null)
  const [showEditMenuItem, setShowEditMenuItem] = useState<string | null>(null)
  const [showEditSubMenuItem, setShowEditSubMenuItem] = useState<string | null>(null)
  const [groupData, setGroupData] = useState<UserGroupType[]>([])
  const [previewGroupData, setPreviewGroupData] = useState<UserGroupType[]>([])
  const [menus, setMenus] = useState<NonNullable<ListMenusQuery["listMenus"]>["items"]>([])

  const [menuName, setMenuName] = useState<string>()
  const [menuProps, setMenuProps] = useState<string>()
  const [subMenuName, setSubMenuName] = useState<string>()
  const [subMenuImage, setSubMenuImage] = useState<ImageInput>()
  const [menuAction, setMenuAction] = useState<string>()
  const [subMenuAction, setSubMenuAction] = useState<string>()
  const [subMenuProps, setSubMenuProps] = useState<string>()
  const [groupToAdd, setGroupToAdd] = useState<string>()
  useEffect(() => {
    setInitialData()
  }, [])

  const setInitialData = async () => {
    try {
      const listMenus = await Data.listMenu(null)
      console.log({ listMenus: listMenus })
      setMenus(
        listMenus.data?.listMenus?.items.sort((x, y) => (x?.order ?? 0) - (y?.order ?? 0)) ?? []
      )
    } catch (e) {
      console.log(e)
    }
  }
  const UserConsumer = useContext(UserContext)
  const saveMenu = async (): Promise<void> => {
    try {
      if (showEditMenuItem != null) {
        const z = await Data.updateMenu({
          id: showEditMenuItem,
          name: menuName,
          action: menuAction,
          readGroups: groupData,
          order: menus.length,
          params: menuProps,
        })
        console.log(z)
        setMenuName("")
        setMenuAction("")
        setMenuProps("")
        setGroupData([])

        await setInitialData()
        closeAddMenuItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  const addMenu = async (): Promise<void> => {
    try {
      const z = await Data.createMenu({
        name: menuName,
        action: menuAction,
        readGroups: groupData,
        order: menus.length,
        params: menuProps,
      })
      console.log(z)
      setMenuName("")
      setMenuAction("")
      setMenuProps("")
      setGroupData([])
      await setInitialData()
      closeAddMenuItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (showGroupsId) this.showGroups(showGroupsId)
  }
  const saveSubMenu = async (): Promise<void> => {
    try {
      if (showEditSubMenuItem != null) {
        const z = await Data.updateSubMenu({
          id: showEditSubMenuItem,
          name: subMenuName,
          icon: subMenuImage,
          action: subMenuAction,
          params: subMenuProps,
          readGroups: groupData,
        })
        console.log(z)
        setSubMenuName("")
        setSubMenuAction("")
        setSubMenuProps("")
        setGroupData([])
        setSubMenuImage({})
        await setInitialData()
        closeAddSubMenuItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  const addSubMenu = async (): Promise<void> => {
    try {
      const z = await Data.createSubMenu({
        name: subMenuName,
        action: subMenuAction,
        params: subMenuProps,
        readGroups: groupData,
        menuID: showAddSubMenuItem,
        icon: subMenuImage,
        order: menus.filter((f) => f.id == showAddSubMenuItem)[0].subItems?.items.length,
      })
      console.log(z)
      setSubMenuName("")
      setSubMenuAction("")
      setSubMenuProps("")
      setGroupData([])
      setSubMenuImage({})
      await setInitialData()
      closeAddSubMenuItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (showGroupsId) this.showGroups(showGroupsId)
  }
  const renderAddMenuModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showAddMenuItem || showEditMenuItem != null}
        title="Menu Item"
        onHide={() => {
          closeAddMenuItem()
        }}
      >
        <>
          <TextInput
            onChange={(val: any) => {
              setMenuName(val.target.value)
            }}
            placeholder="Enter Menu Name"
            multiline={false}
            value={menuName}
            style={styles.adminCRMModalInviteEmail}
          ></TextInput>
          <Picker
            //placeholder="Enter Action Value"
            selectedValue={menuAction}
            onValueChange={(e) => {
              setMenuAction(e)
            }}
          >
            {props.navigation.getState().routeNames.map((item) => {
              return <Picker.Item label={item} value={item} />
            })}
          </Picker>

          <TextInput
            onChange={(val: any) => {
              setMenuProps(val.target.value)
            }}
            placeholder="Enter Props"
            multiline={false}
            value={menuProps}
            style={styles.adminCRMModalInviteEmail}
          ></TextInput>
          <Text style={styles.adminCRMModal}>Visible to:</Text>
          {groupData
            ? groupData.map((item: any, index: number) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                    key={index}
                  >
                    <Text style={styles.adminCRMModal} key={index}>
                      {item}
                    </Text>
                    <JCButton
                      buttonType={ButtonTypes.AdminModalOrange}
                      onPress={() => {
                        if (window.confirm("Are you sure you wish to delete this group?"))
                          setGroupData(groupData.filter((x) => x != item))
                      }}
                    >
                      X
                    </JCButton>
                  </View>
                )
              })
            : null}
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Picker
              style={{
                height: 45,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 10,
              }}
              selectedValue={groupToAdd}
              onValueChange={(val) => {
                setGroupData(groupData.concat([val]))
              }}
            >
              {Object.keys(UserGroupType).map((org) => {
                return <Picker.Item key={org} label={org} value={org} />
              })}
            </Picker>
            <JCButton
              buttonType={ButtonTypes.AdminAdd}
              onPress={() => {
                showEditMenuItem != null ? saveMenu() : addMenu()
              }}
            >
              {showEditMenuItem != null ? "Edit Menu" : "Add Menu"}
            </JCButton>
          </View>
        </>
      </JCModal>
    )
  }
  const renderAddSubMenuModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showAddSubMenuItem != null || showEditSubMenuItem != null}
        title="Sub Menu Item"
        onHide={() => {
          closeAddSubMenuItem()
        }}
      >
        <>
          <TextInput
            onChange={(val: any) => {
              setSubMenuName(val.target.value)
            }}
            placeholder="Enter Sub Menu Name"
            multiline={false}
            value={subMenuName}
            style={styles.adminCRMModalInviteEmail}
          ></TextInput>
          <Picker
            //placeholder="Enter Action Value"
            selectedValue={subMenuAction}
            onValueChange={(e) => {
              setSubMenuAction(e)
            }}
          >
            {props.navigation.getState().routeNames.map((item) => {
              return <Picker.Item label={item} value={item} />
            })}
          </Picker>

          <TextInput
            onChange={(val: any) => {
              setSubMenuProps(val.target.value)
            }}
            placeholder="Enter Props"
            multiline={false}
            value={subMenuProps}
            style={styles.adminCRMModalInviteEmail}
          ></TextInput>
          <ResourceImage
            onUpdate={(image: ImageInput) => {
              setSubMenuImage(image)
            }}
            style={ButtonTypes.AdminOutline}
            fileName={"menus/upload/icon-test-"}
            currentImage={subMenuImage}
          ></ResourceImage>
          <Text style={styles.adminCRMModal}>Visible to:</Text>
          {groupData
            ? groupData.map((item: any, index: number) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                    key={index}
                  >
                    <Text style={styles.adminCRMModal} key={index}>
                      {item}
                    </Text>
                    <JCButton
                      buttonType={ButtonTypes.AdminModalOrange}
                      onPress={() => {
                        if (window.confirm("Are you sure you wish to delete this group?"))
                          setGroupData(groupData.filter((x) => x != item))
                      }}
                    >
                      X
                    </JCButton>
                  </View>
                )
              })
            : null}
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Picker
              style={{
                height: 45,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 10,
              }}
              selectedValue={groupToAdd}
              onValueChange={(val) => {
                setGroupData(groupData.concat([val]))
              }}
            >
              {Object.keys(UserGroupType).map((org) => {
                return <Picker.Item key={org} label={org} value={org} />
              })}
            </Picker>
            <JCButton
              buttonType={ButtonTypes.AdminAdd}
              onPress={() => {
                showEditSubMenuItem != null ? saveSubMenu() : addSubMenu()
              }}
            >
              {showEditSubMenuItem != null ? "Edit Sub Menu" : "Add Sub Menu"}
            </JCButton>
          </View>
        </>
      </JCModal>
    )
  }
  const addMenuItem = () => {
    setShowAddMenuItem(true)
  }
  const closeAddMenuItem = () => {
    setShowAddMenuItem(false)
    setShowEditMenuItem(null)
    setMenuName("")
    setMenuAction("")
    setMenuProps("")
    setGroupData([])
  }
  const addSubMenuItem = (id: string) => {
    setShowAddSubMenuItem(id)
  }
  const closeAddSubMenuItem = () => {
    setShowAddSubMenuItem(null)
    setShowEditSubMenuItem(null)
    setSubMenuName("")
    setSubMenuImage({})
    setSubMenuAction("")
    setSubMenuProps("")
    setGroupData([])
  }
  const editMenuItem = (item: any) => {
    setShowEditMenuItem(item.id)
    setMenuName(item.name)
    setMenuAction(item.action)
    setMenuProps(item.params)
    setGroupData(item.readGroups)

    // await Data.updateMenu(id)
  }
  const editSubMenuItem = (item: any) => {
    setShowEditSubMenuItem(item.id)
    setSubMenuName(item.name)
    setSubMenuImage(item.icon)
    setSubMenuAction(item.action)
    setSubMenuProps(item.params)
    setGroupData(item.readGroups)

    //await Data.updateSubMenu(id)
  }
  const deleteMenuItem = async (id: string) => {
    await Data.deleteMenu(id)
    await setInitialData()
  }
  const deleteSubMenuItem = async (id: string) => {
    await Data.deleteSubMenu(id)
    await setInitialData()
  }
  const reOrderSubMenuItem = async (item1: SubMenuItem, item2: SubMenuItem | undefined) => {
    if (item1 && item2) {
      await Data.updateSubMenu({ id: item1.id, order: item2.order })
      await Data.updateSubMenu({ id: item2.id, order: item1.order })
      await setInitialData()
    }
  }
  const reOrderMenuItem = async (item1: MenuItem, item2: MenuItem) => {
    if (item1 && item2) {
      await Data.updateMenu({ id: item1.id, order: item2.order })
      await Data.updateMenu({ id: item2.id, order: item1.order })
      await setInitialData()
    }
  }
  const getPreviewMenu = () => {
    const pgd = previewGroupData
    const preview = JSON.parse(JSON.stringify(menus))
    if (preview) {
      const preview2 = preview.filter(
        (x: any) =>
          (x.readGroups?.filter((z: any) => pgd.includes(z ?? UserGroupType.verifiedUsers))
            .length ?? 0) >= 1
      )
      const previewPt2 = preview2.map((y: any) => {
        if (y.subItems && y.subItems.items) {
          y.subItems.items = y.subItems.items.filter(
            (x: any) =>
              (x.readGroups?.filter((z: any) => pgd.includes(z ?? UserGroupType.verifiedUsers))
                .length ?? 0) >= 1
          )
        }
        return y
      })
      return previewPt2
    }
    return null
  }
  const renderPreview = (): React.ReactNode => {
    return (
      <View style={{ marginBottom: 40 }}>
        <Text style={AdminStyles.textHeader}>Menu Preview</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Select User Permissions to preview:</Text>
          <Picker
            style={{
              height: 45,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 10,
            }}
            selectedValue={groupToAdd}
            onValueChange={(val) => {
              setPreviewGroupData(previewGroupData.concat([val]))
            }}
          >
            {Object.keys(UserGroupType).map((org) => {
              return <Picker.Item key={org} label={org} value={org} />
            })}
          </Picker>
        </View>

        {previewGroupData
          ? previewGroupData.map((item: any, index: number) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  key={index}
                >
                  <Text style={styles.adminCRMModal} key={index}>
                    {item}
                  </Text>
                  <JCButton
                    buttonType={ButtonTypes.AdminModalOrange}
                    onPress={() => {
                      if (window.confirm("Are you sure you wish to delete this group?"))
                        setPreviewGroupData(previewGroupData.filter((x) => x != item))
                    }}
                  >
                    X
                  </JCButton>
                </View>
              )
            })
          : null}

        <Header
          title="Jesus Collective"
          overrideMenu={getPreviewMenu()}
          navigation={props.navigation}
        />
      </View>
    )
  }

  if (!UserConsumer.userState) return null
  console.log("AdminScreen")
  return (
    <View testID="events" style={{ margin: 96 }}>
      {UserConsumer.userActions.isMemberOf("admin") ? (
        <ScrollView>
          {renderPreview()}
          <Text style={AdminStyles.textHeader}>Menu Configuration</Text>
          <View style={styles.fontRegular}>
            <JCButton buttonType={ButtonTypes.AdminSmallOutline} onPress={addMenuItem}>
              Add Root Menu
            </JCButton>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {menus?.map((item, index: number) => {
                if (item == null) return null
                return (
                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ display: "flex", flexGrow: 1, flexDirection: "row" }}>
                        <View style={{ width: 25 }}>
                          <JCImage
                            style={JCImageStyle.IconSmall}
                            quality={JCImageQuality.small}
                            type={"icon"}
                            image={item.icon}
                          />
                        </View>
                        <Text>{item.name}</Text>
                        <JCButton
                          buttonType={ButtonTypes.AdminSmallOutline}
                          onPress={() => addSubMenuItem(item.id)}
                        >
                          +
                        </JCButton>
                        <JCButton
                          buttonType={ButtonTypes.AdminSmallOutline}
                          onPress={() => editMenuItem(item)}
                        >
                          ...
                        </JCButton>
                        {(item.order ?? 0) > 0 ? (
                          <JCButton
                            buttonType={ButtonTypes.AdminSmallOutline}
                            onPress={() => reOrderMenuItem(item, menus[index - 1])}
                          >
                            <Ionicons name="arrow-up-outline" style={styles.smallIcon} size={12} />
                          </JCButton>
                        ) : null}
                        {(item.order ?? 0) < menus.length - 1 ? (
                          <JCButton
                            buttonType={ButtonTypes.AdminSmallOutline}
                            onPress={() => reOrderMenuItem(item, menus[index + 1])}
                          >
                            <Ionicons
                              name="arrow-down-outline"
                              style={styles.smallIcon}
                              size={12}
                            />
                          </JCButton>
                        ) : null}
                        <JCButton
                          buttonType={ButtonTypes.AdminSmallOutline}
                          onPress={() => deleteMenuItem(item.id)}
                        >
                          -
                        </JCButton>
                      </div>
                      <div style={{ display: "flex", flexGrow: 3, flexDirection: "row" }}>
                        <Text>{item.action}</Text>
                      </div>
                      <div>
                        <Text>{item.readGroups?.toString()}</Text>
                      </div>
                    </div>
                    <div>
                      {item.subItems?.items.map((item2, index2: number) => {
                        if (item2 == null) return null
                        return (
                          <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexGrow: 1, flexDirection: "row" }}>
                              <Text>&nbsp;&nbsp;&nbsp;</Text>
                              <View style={{ width: 25 }}>
                                <JCImage
                                  style={JCImageStyle.IconSmall}
                                  quality={JCImageQuality.small}
                                  type={"icon"}
                                  image={item2.icon}
                                />
                              </View>
                              <Text>{item2.name}</Text>
                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => editSubMenuItem(item2)}
                              >
                                ...
                              </JCButton>
                              {(item2.order ?? 0) > 0 ? (
                                <JCButton
                                  buttonType={ButtonTypes.AdminSmallOutline}
                                  onPress={() =>
                                    reOrderSubMenuItem(item2, item.subItems?.items[index2 - 1])
                                  }
                                >
                                  <Ionicons
                                    name="arrow-up-outline"
                                    style={styles.smallIcon}
                                    size={12}
                                  />
                                </JCButton>
                              ) : null}
                              {(item2.order ?? 0) < (item.subItems?.items?.length ?? 0) - 1 ? (
                                <JCButton
                                  buttonType={ButtonTypes.AdminSmallOutline}
                                  onPress={() =>
                                    reOrderSubMenuItem(item2, item.subItems?.items[index2 + 1])
                                  }
                                >
                                  <Ionicons
                                    name="arrow-down-outline"
                                    style={styles.smallIcon}
                                    size={12}
                                  />
                                </JCButton>
                              ) : null}
                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => deleteSubMenuItem(item2.id)}
                              >
                                -
                              </JCButton>
                            </div>
                            <div style={{ display: "flex", flexGrow: 3, flexDirection: "row" }}>
                              <Text>{item2.action}</Text>
                            </div>
                            <div>
                              <Text>{item2.readGroups?.toString()}</Text>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.adminScreenMainContainer}>
            <View style={styles.adminScreenLeftContainer}>
              <Text>You must be an admin to see this screen</Text>
            </View>
          </View>
        </ScrollView>
      )}
      {renderAddMenuModal()}
      {renderAddSubMenuModal()}
    </View>
  )
}
