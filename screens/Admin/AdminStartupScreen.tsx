import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { AdminStyles } from "../../components/AdminStyles"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import { ListStartupsQuery, UserGroupType } from "../../src/API"
import { UserContext } from "../HomeScreen/UserContext"
interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
type StartupItem = NonNullable<NonNullable<ListStartupsQuery["listStartups"]>["items"]>[0]

export default function AdminScreen(props: Props) {
  const [startupProps, setStartupProps] = useState<string>()
  const [groupToAdd, setGroupToAdd] = useState<string>()
  const [startupOrder, setStartupOrder] = useState<number>()
  const [startupAction, setStartupAction] = useState<string>()
  const [showAddStartupItem, setShowAddStartupItem] = useState<boolean>(false)
  const [showEditStartupItem, setShowEditStartupItem] = useState<string | null>(null)
  const [groupData, setGroupData] = useState<UserGroupType[]>([])
  const [previewGroupData, setPreviewGroupData] = useState<UserGroupType[]>([])
  const [startup, setStartup] = useState<NonNullable<ListStartupsQuery["listStartups"]>["items"]>(
    []
  )
  const styles = StyleSheet.create(AdminStyles)
  useEffect(() => {
    setInitialData()
  }, [])

  const setInitialData = async () => {
    try {
      const listStartup = await Data.listStartup(null)
      console.log({ listStartup: listStartup })
      setStartup(
        listStartup.data?.listStartups?.items.sort((x, y) => (x?.order ?? 0) - (y?.order ?? 0)) ??
          []
      )
    } catch (e) {
      console.log(e)
    }
  }
  const UserConsumer = useContext(UserContext)
  const saveStartup = async (): Promise<void> => {
    try {
      if (showEditStartupItem != null) {
        const z = await Data.updateStartup({
          id: showEditStartupItem,
          action: startupAction,
          readGroups: groupData,
          order: startupOrder,
          params: startupProps,
        })
        console.log(z)
        setStartupAction("")
        setStartupProps("")
        setStartupOrder(-1)
        setGroupData([])

        await setInitialData()
        closeAddStartupItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  const addStartup = async (): Promise<void> => {
    try {
      const z = await Data.createStartup({
        action: startupAction,
        readGroups: groupData,
        order: startup.length,
        params: startupProps,
      })
      console.log(z)
      setStartupAction("")
      setStartupProps("")
      setGroupData([])
      await setInitialData()
      closeAddStartupItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (showGroupsId) this.showGroups(showGroupsId)
  }

  const renderAddStartupModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showAddStartupItem || showEditStartupItem != null}
        title="Startup Item"
        onHide={() => {
          closeAddStartupItem()
        }}
      >
        <>
          <Picker
            // placeholder="Enter Action Value"
            selectedValue={startupAction}
            onValueChange={(e) => {
              setStartupAction(e)
            }}
          >
            {props.navigation.getState().routeNames.map((item) => {
              return <Picker.Item label={item} value={item} />
            })}
          </Picker>

          <TextInput
            onChange={(val: any) => {
              setStartupProps(val.target.value)
            }}
            placeholder="Enter Props"
            multiline={false}
            value={startupProps}
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
                showEditStartupItem != null ? saveStartup() : addStartup()
              }}
            >
              {showEditStartupItem != null ? "Edit Startup" : "Add Startup"}
            </JCButton>
          </View>
        </>
      </JCModal>
    )
  }

  const addStartupItem = () => {
    setShowAddStartupItem(true)
  }
  const closeAddStartupItem = () => {
    setShowAddStartupItem(false)
    setShowEditStartupItem(null)
    setStartupAction("")
    setStartupProps("")
    setGroupData([])
  }
  const editStartupItem = (item: any) => {
    setShowEditStartupItem(item.id)
    setStartupAction(item.action)
    setStartupProps(item.params)
    setStartupOrder(item.order)
    setGroupData(item.readGroups)

    // await Data.updateMenu(id)
  }
  const deleteStartupItem = async (id: string) => {
    await Data.deleteStartup(id)
    await setInitialData()
  }
  const reOrderStartupItem = async (item1: StartupItem, item2: StartupItem) => {
    if (item1 && item2) {
      await Data.updateStartup({ id: item1.id, order: item2.order })
      await Data.updateStartup({ id: item2.id, order: item1.order })
      await setInitialData()
    }
  }
  const getPreviewStartup = () => {
    const pgd = previewGroupData
    const preview = JSON.parse(JSON.stringify(startup))
    if (preview) {
      const preview2 = preview.filter(
        (x: any) =>
          (x.readGroups?.filter((z: any) => pgd.includes(z ?? UserGroupType.verifiedUsers))
            .length ?? 0) >= 1
      )
      if (preview.length < 0) return null
      return <div>{preview2[0]?.action}</div>
    }
    return null
  }
  const renderPreview = (): React.ReactNode => {
    return (
      <View>
        <Text>Startup Preview:</Text>
        {getPreviewStartup()}
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
      </View>
    )
  }

  if (!UserConsumer.userState) return null
  console.log("AdminScreen")
  return (
    <View testID="events">
      {UserConsumer.userActions.isMemberOf("admin") ? (
        <ScrollView>
          {renderPreview()}

          <View style={styles.fontRegular}>
            <JCButton buttonType={ButtonTypes.AdminAdd} onPress={addStartupItem}>
              Add Startup Item
            </JCButton>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {startup?.map((item, index: number) => {
                if (!item) return null
                return (
                  <>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <JCButton
                        buttonType={ButtonTypes.AdminSmallOutline}
                        onPress={() => editStartupItem(item)}
                      >
                        ...
                      </JCButton>
                      {(item.order ?? 0) > 0 ? (
                        <JCButton
                          buttonType={ButtonTypes.AdminSmallOutline}
                          onPress={() => reOrderStartupItem(item, startup[index - 1])}
                        >
                          <Ionicons name="arrow-up-outline" style={styles.icon} />
                        </JCButton>
                      ) : null}
                      {(item.order ?? 0) < startup.length - 1 ? (
                        <JCButton
                          buttonType={ButtonTypes.AdminSmallOutline}
                          onPress={() => reOrderStartupItem(item, startup[index + 1])}
                        >
                          <Ionicons name="arrow-down-outline" style={styles.icon} />
                        </JCButton>
                      ) : null}
                      <JCButton
                        buttonType={ButtonTypes.AdminSmallOutline}
                        onPress={() => deleteStartupItem(item.id)}
                      >
                        -
                      </JCButton>
                      <Text>{item.action}</Text>
                      <Text>{item.readGroups?.toString()}</Text>
                    </div>
                  </>
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
      {renderAddStartupModal()}
    </View>
  )
}
