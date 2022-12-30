import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { ScrollView, Text, View } from "react-native"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import ProfileConfig from "../../components/MyProfile/profileConfigs.json"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { ListCustomProfilesQuery, UserGroupType } from "../../src/API"

interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
type ProfileItem = NonNullable<
  NonNullable<ListCustomProfilesQuery["listCustomProfiles"]>["items"]
>[0]
interface State extends JCState {
  profiles: NonNullable<ListCustomProfilesQuery["listCustomProfiles"]>["items"]
  showAddProfileItem: boolean
  showEditProfileItem: string | null

  profileOrder: number
  groupData: UserGroupType[]
  groupList: string[]
  groupToAdd: string
  showGroupsId: string
  profileAction: string
}

export default class AdminScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      showAddProfileItem: false,
      showEditProfileItem: null,
      groupList: [],
      groupData: [],
      profiles: [],
    }
    this.setInitialData()
  }

  async setInitialData() {
    try {
      const listProfiles = await Data.listCustomProfiles({})
      console.log({ listProfiles: listProfiles })
      this.setState({
        profiles:
          listProfiles.data?.listCustomProfiles?.items.sort(
            (x, y) => (x?.order ?? 0) - (y?.order ?? 0)
          ) ?? [],
      })
    } catch (e) {
      console.log(e)
    }
  }
  static UserConsumer = UserContext.Consumer
  async saveProfile(): Promise<void> {
    try {
      if (this.state.showEditProfileItem != null) {
        const z = await Data.updateCustomProfile({
          id: this.state.showEditProfileItem,
          type: this.state.profileAction,
          readGroups: this.state.groupData,
          order: this.state.profileOrder,
        })
        console.log(z)
        this.setState({
          profileAction: "",
          profileOrder: -1,
          groupData: [],
        })
        await this.setInitialData()
        this.closeAddProfileItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  async addProfile(): Promise<void> {
    try {
      const z = await Data.createCustomProfile({
        type: this.state.profileAction,
        readGroups: this.state.groupData,
        order: this.state.profiles.length,
      })
      console.log(z)
      this.setState({ profileAction: "", groupData: [] })
      await this.setInitialData()
      this.closeAddProfileItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (this.state.showGroupsId) this.showGroups(this.state.showGroupsId)
  }

  renderAddProfileModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showAddProfileItem || this.state.showEditProfileItem != null}
        title="Profile Item"
        onHide={() => {
          this.closeAddProfileItem()
        }}
      >
        <>
          <Picker
            //placeholder="Enter Action Value"
            selectedValue={this.state.profileAction}
            onValueChange={(e) => {
              this.setState({ profileAction: e })
            }}
          >
            {ProfileConfig.map((item: any) => {
              return <Picker.Item label={item.name} value={item.name} />
            })}
          </Picker>

          <Text style={this.styles.style.adminCRMModal}>Visible to:</Text>
          {this.state.groupData
            ? this.state.groupData.map((item: any, index: number) => {
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
                    <Text style={this.styles.style.adminCRMModal} key={index}>
                      {item}
                    </Text>
                    <JCButton
                      buttonType={ButtonTypes.AdminModalOrange}
                      onPress={() => {
                        if (window.confirm("Are you sure you wish to delete this group?"))
                          this.setState({
                            groupData: this.state.groupData.filter((x) => x != item),
                          })
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
              selectedValue={this.state.groupToAdd}
              onValueChange={(val) => {
                this.setState({ groupData: this.state.groupData.concat([val]) })
              }}
            >
              {Object.keys(UserGroupType).map((org) => {
                return <Picker.Item key={org} label={org} value={org} />
              })}
            </Picker>
            <JCButton
              buttonType={ButtonTypes.AdminAdd}
              onPress={() => {
                this.state.showEditProfileItem != null ? this.saveProfile() : this.addProfile()
              }}
            >
              {this.state.showEditProfileItem != null ? "Edit Profile" : "Add Profile"}
            </JCButton>
          </View>
        </>
      </JCModal>
    )
  }

  addProfileItem = () => {
    this.setState({ showAddProfileItem: true })
  }
  closeAddProfileItem = () => {
    this.setState({
      showAddProfileItem: false,
      showEditProfileItem: null,
      profileAction: "",
      groupData: [],
    })
  }
  editProfileItem = (item: any) => {
    this.setState({
      showEditProfileItem: item.id,
      profileAction: item.type,
      profileOrder: item.order,
      groupData: item.readGroups,
    })

    // await Data.updateMenu(id)
  }
  deleteProfileItem = async (id: string) => {
    await Data.deleteCustomProfile(id)
    await this.setInitialData()
  }
  reOrderProfileItem = async (item1: ProfileItem, item2: ProfileItem) => {
    if (item1 && item2) {
      await Data.updateCustomProfile({ id: item1.id, order: item2.order })
      await Data.updateCustomProfile({ id: item2.id, order: item1.order })
      await this.setInitialData()
    }
  }

  render(): React.ReactNode {
    return (
      <AdminScreen.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          console.log("AdminScreen")
          return (
            <View testID="events">
              {userActions.isMemberOf("admin") ? (
                <ScrollView>
                  <View style={this.styles.style.fontRegular}>
                    <JCButton buttonType={ButtonTypes.AdminAdd} onPress={this.addProfileItem}>
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
                      {this.state.profiles?.map((item, index: number) => {
                        if (!item) return null
                        return (
                          <>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => this.editProfileItem(item)}
                              >
                                ...
                              </JCButton>
                              {(item.order ?? 0) > 0 ? (
                                <JCButton
                                  buttonType={ButtonTypes.AdminSmallOutline}
                                  onPress={() =>
                                    this.reOrderProfileItem(item, this.state.profiles[index - 1])
                                  }
                                >
                                  <Ionicons
                                    name="arrow-up-outline"
                                    style={this.styles.style.icon}
                                  />
                                </JCButton>
                              ) : null}
                              {(item.order ?? 0) < this.state.profiles.length - 1 ? (
                                <JCButton
                                  buttonType={ButtonTypes.AdminSmallOutline}
                                  onPress={() =>
                                    this.reOrderProfileItem(item, this.state.profiles[index + 1])
                                  }
                                >
                                  <Ionicons
                                    name="arrow-down-outline"
                                    style={this.styles.style.icon}
                                  />
                                </JCButton>
                              ) : null}
                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => this.deleteProfileItem(item.id)}
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
                  <View style={this.styles.style.eventsScreenMainContainer}>
                    <View style={this.styles.style.eventsScreenLeftContainer}>
                      <Text>You must be an admin to see this screen</Text>
                    </View>
                  </View>
                </ScrollView>
              )}
              {this.renderAddProfileModal()}
            </View>
          )
        }}
      </AdminScreen.UserConsumer>
    )
  }
}
