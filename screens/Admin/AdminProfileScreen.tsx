import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import React, { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { AdminStyles } from "../../components/AdminStyles"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import ProfileConfig from "../../components/MyProfile/profileConfigs.json"
import { ListCustomProfilesQuery, UserGroupType } from "../../src/API"
import { UserContext } from "../HomeScreen/UserContext"

type ProfileItem = NonNullable<
  NonNullable<ListCustomProfilesQuery["listCustomProfiles"]>["items"]
>[0]

export default function AdminScreen() {
  const styles = StyleSheet.create(AdminStyles)
  const [showAddProfileItem, setShowAddProfileItem] = useState<boolean>(false)
  const [showEditProfileItem, setShowEditProfileItem] = useState<string | null>(null)
  const [groupData, setGroupData] = useState<UserGroupType[]>([])
  const [profiles, setProfiles] = useState<
    NonNullable<ListCustomProfilesQuery["listCustomProfiles"]>["items"]
  >([])

  const [profileOrder, setProfileOrder] = useState<number>()
  const [groupToAdd, setGroupToAdd] = useState<string>()
  const [profileAction, setProfileAction] = useState<string>()

  useEffect(() => {
    setInitialData()
  }, [])

  const setInitialData = async () => {
    try {
      const listProfiles = await Data.listCustomProfiles({})
      console.log({ listProfiles: listProfiles })
      setProfiles(
        listProfiles.data?.listCustomProfiles?.items.sort(
          (x, y) => (x?.order ?? 0) - (y?.order ?? 0)
        ) ?? []
      )
    } catch (e) {
      console.log(e)
    }
  }
  const UserConsumer = useContext(UserContext)
  const saveProfile = async (): Promise<void> => {
    try {
      if (showEditProfileItem != null) {
        const z = await Data.updateCustomProfile({
          id: showEditProfileItem,
          type: profileAction,
          readGroups: groupData,
          order: profileOrder,
        })
        console.log(z)
        setProfileAction("")
        setProfileOrder(-1)
        setGroupData([])

        await setInitialData()
        closeAddProfileItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  const addProfile = async (): Promise<void> => {
    try {
      const z = await Data.createCustomProfile({
        type: profileAction,
        readGroups: groupData,
        order: profiles.length,
      })
      console.log(z)
      setProfileAction("")
      setGroupData([])
      await setInitialData()
      closeAddProfileItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (showGroupsId) this.showGroups(showGroupsId)
  }

  const renderAddProfileModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showAddProfileItem || showEditProfileItem != null}
        title="Profile Item"
        onHide={() => {
          closeAddProfileItem()
        }}
      >
        <>
          <Picker
            //placeholder="Enter Action Value"
            selectedValue={profileAction}
            onValueChange={(e) => {
              setProfileAction(e)
            }}
          >
            {ProfileConfig.map((item: any) => {
              return <Picker.Item label={item.name} value={item.name} />
            })}
          </Picker>

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
                showEditProfileItem != null ? saveProfile() : addProfile()
              }}
            >
              {showEditProfileItem != null ? "Edit Profile" : "Add Profile"}
            </JCButton>
          </View>
        </>
      </JCModal>
    )
  }

  const addProfileItem = () => {
    setShowAddProfileItem(true)
  }
  const closeAddProfileItem = () => {
    setShowAddProfileItem(false)
    setShowEditProfileItem(null)
    setProfileAction("")
    setGroupData([])
  }
  const editProfileItem = (item: any) => {
    setShowEditProfileItem(item.id)
    setProfileAction(item.type)
    setProfileOrder(item.order)
    setGroupData(item.readGroups)
  }
  const deleteProfileItem = async (id: string) => {
    await Data.deleteCustomProfile(id)
    await setInitialData()
  }
  const reOrderProfileItem = async (item1: ProfileItem, item2: ProfileItem) => {
    if (item1 && item2) {
      await Data.updateCustomProfile({ id: item1.id, order: item2.order })
      await Data.updateCustomProfile({ id: item2.id, order: item1.order })
      await setInitialData()
    }
  }

  if (!UserConsumer.userState) return null
  console.log("AdminScreen")
  return (
    <View testID="events">
      {UserConsumer.userActions.isMemberOf("admin") ? (
        <ScrollView>
          <View style={styles.fontRegular}>
            <JCButton buttonType={ButtonTypes.AdminAdd} onPress={addProfileItem}>
              Add Profile Item
            </JCButton>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {profiles?.map((item, index: number) => {
                if (!item) return null
                return (
                  <>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <JCButton
                        buttonType={ButtonTypes.AdminSmallOutline}
                        onPress={() => editProfileItem(item)}
                      >
                        ...
                      </JCButton>
                      {(item.order ?? 0) > 0 ? (
                        <JCButton
                          buttonType={ButtonTypes.AdminSmallOutline}
                          onPress={() => reOrderProfileItem(item, profiles[index - 1])}
                        >
                          <Ionicons name="arrow-up-outline" style={styles.icon} />
                        </JCButton>
                      ) : null}
                      {(item.order ?? 0) < profiles.length - 1 ? (
                        <JCButton
                          buttonType={ButtonTypes.AdminSmallOutline}
                          onPress={() => reOrderProfileItem(item, profiles[index + 1])}
                        >
                          <Ionicons name="arrow-down-outline" style={styles.icon} />
                        </JCButton>
                      ) : null}
                      <JCButton
                        buttonType={ButtonTypes.AdminSmallOutline}
                        onPress={() => deleteProfileItem(item.id)}
                      >
                        -
                      </JCButton>
                      <Text>{item.type}</Text>
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
      {renderAddProfileModal()}
    </View>
  )
}
