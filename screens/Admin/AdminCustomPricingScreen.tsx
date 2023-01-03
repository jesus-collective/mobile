import { Picker } from "@react-native-picker/picker"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React, { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { AdminStyles } from "../../components/AdminStyles"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import { ListCustomPricingsQuery, UserGroupType } from "../../src/API"
import { UserContext } from "../HomeScreen/UserContext"

function AdminScreenImpl() {
  const styles = StyleSheet.create(AdminStyles)
  const [groupToAdd, setGroupToAdd] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [showAddPricingsItem, setShowAddPricingsItem] = useState<boolean>(false)
  const [showEditPricingsItem, setShowEditPricingsItem] = useState<string | null>(null)
  const [groupData, setGroupData] = useState<UserGroupType[]>([])
  const [pricings, setPricings] = useState<
    NonNullable<ListCustomPricingsQuery["listCustomPricings"]>["items"]
  >([])

  useEffect(() => {
    setInitialData()
  }, [])

  const setInitialData = async () => {
    try {
      const listCustomPricings = await Data.listCustomPricings(null)
      console.log({ listCustomPricings: listCustomPricings })
      setPricings(listCustomPricings.data?.listCustomPricings?.items ?? [])
    } catch (e) {
      console.log(e)
    }
  }
  const UserConsumer = useContext(UserContext)
  const savePricings = async (): Promise<void> => {
    try {
      if (showEditPricingsItem != null) {
        const z = await Data.updateCustomPricing({
          id: showEditPricingsItem,
          emailAddress: email,
        })
        console.log(z)
        setGroupData([])
        setEmail("")

        await setInitialData()
        closeAddPricingsItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  const addPricing = async (): Promise<void> => {
    try {
      const z = await Data.createCustomPricing({
        emailAddress: email,
      })
      console.log(z)
      setGroupData([])
      setEmail("")
      await setInitialData()
      closeAddPricingsItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (showGroupsId) this.showGroups(showGroupsId)
  }

  const renderAddPricingsModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showAddPricingsItem || showEditPricingsItem != null}
        title="Pricings Item"
        onHide={() => {
          closeAddPricingsItem()
        }}
      >
        <>
          <TextInput
            onChange={(val: any) => {
              setEmail(val.target.value)
            }}
            placeholder="Enter email"
            multiline={false}
            value={email}
            style={styles.adminCRMModalInviteEmail}
          ></TextInput>
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
                showEditPricingsItem != null ? savePricings() : addPricingsItem()
              }}
            >
              {showEditPricingsItem != null ? "Edit Startup" : "Add Startup"}
            </JCButton>
          </View>
        </>
      </JCModal>
    )
  }

  const addPricingsItem = () => {
    setShowAddPricingsItem(true)
  }
  const closeAddPricingsItem = () => {
    setShowAddPricingsItem(false)
    setShowEditPricingsItem(null)
    setGroupData([])
    setEmail("")
  }
  const editPricingsItem = (item: any) => {
    setShowEditPricingsItem(item.id)
    setGroupData(item.readGroups)
    setEmail(item.emailAddress)

    // await Data.updateMenu(id)
  }
  const deletePricingsItem = async (id: string) => {
    await Data.deleteStartup(id)
    await setInitialData()
  }

  if (!UserConsumer.userState) return null
  console.log("AdminScreen")
  return (
    <View testID="events">
      {UserConsumer.userActions.isMemberOf("admin") ? (
        <ScrollView>
          <View style={styles.fontRegular}>
            <JCButton buttonType={ButtonTypes.AdminAdd} onPress={addPricingsItem}>
              Add Custom Payment Item
            </JCButton>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {pricings?.map((item) => {
                if (!item) return null
                return (
                  <>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <JCButton
                        buttonType={ButtonTypes.AdminSmallOutline}
                        onPress={() => editPricingsItem(item)}
                      >
                        ...
                      </JCButton>

                      <JCButton
                        buttonType={ButtonTypes.AdminSmallOutline}
                        onPress={() => deletePricingsItem(item.id)}
                      >
                        -
                      </JCButton>
                      <Text>{item.emailAddress}</Text>
                    </div>
                  </>
                )
              })}
              {renderAddPricingsModal()}
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
    </View>
  )
}
let env = "unknown"
if (window.location === undefined) env = "mobile"
else if (window.location.hostname === "localhost") env = "dev"
else if (window.location.hostname.includes("beta")) env = "beta"
else if (window.location.hostname.includes("dev")) env = "dev"
else env = "beta"

export default function AdminScreen(): JSX.Element {
  const [stripePromise] = useState(() =>
    loadStripe(
      env == "beta"
        ? "pk_live_51HlyrYLTzrDhiQ9282ydxEkzCmGQuJ6w6m2J7pvWL3DslQGdyZHhi6NFa7lLgErh9YjboGdEs09ce0y9c3H5SfVx00K1massZP"
        : "pk_test_51HlyrYLTzrDhiQ921sERNUY2GQBDgpHDOUYMiNZ0lTeTsse9u8oQoBfLg6UzWaxcNkYhek4tkNWILTlAiajet27k00FFv6z0RB"
    )
  )
  return (
    <Elements stripe={stripePromise}>
      <AdminScreenImpl />
    </Elements>
  )
}
