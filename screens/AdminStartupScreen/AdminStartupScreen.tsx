import { Ionicons } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import { Container, Picker, Text } from "native-base"
import React from "react"
import { ScrollView, TextInput, View } from "react-native"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { ListStartupsQuery, UserGroupType } from "../../src/API"
interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
type StartupItem = NonNullable<NonNullable<ListStartupsQuery["listStartups"]>["items"]>[0]
interface State extends JCState {
  startup: NonNullable<ListStartupsQuery["listStartups"]>["items"]
  previewMenus: NonNullable<ListStartupsQuery["listStartups"]>["items"]
  showAddStartupItem: boolean
  showEditStartupItem: string | null
  startupProps: string
  startupOrder: number
  groupData: UserGroupType[]
  previewGroupData: UserGroupType[]
  groupList: string[]
  groupToAdd: string
  showGroupsId: string
  startupAction: string
}

export default class AdminScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      showAddStartupItem: false,
      showEditStartupItem: null,
      groupList: [],
      groupData: [],
      previewGroupData: [],
      startup: [],
      previewMenus: [],
    }
    this.setInitialData()
  }

  async setInitialData() {
    try {
      const listStartup = await Data.listStartup(null)
      console.log({ listStartup: listStartup })
      this.setState({
        startup:
          listStartup.data?.listStartups?.items.sort((x, y) => (x?.order ?? 0) - (y?.order ?? 0)) ??
          [],
      })
    } catch (e) {
      console.log(e)
    }
  }
  static UserConsumer = UserContext.Consumer
  async saveStartup(): Promise<void> {
    try {
      if (this.state.showEditStartupItem != null) {
        const z = await Data.updateStartup({
          id: this.state.showEditStartupItem,
          action: this.state.startupAction,
          readGroups: this.state.groupData,
          order: this.state.startupOrder,
          params: this.state.startupProps,
        })
        console.log(z)
        this.setState({
          startupAction: "",
          startupProps: "",
          startupOrder: -1,
          groupData: [],
        })
        await this.setInitialData()
        this.closeAddStartupItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  async addStartup(): Promise<void> {
    try {
      const z = await Data.createStartup({
        action: this.state.startupAction,
        readGroups: this.state.groupData,
        order: this.state.startup.length,
        params: this.state.startupProps,
      })
      console.log(z)
      this.setState({ startupAction: "", startupProps: "", groupData: [] })
      await this.setInitialData()
      this.closeAddStartupItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (this.state.showGroupsId) this.showGroups(this.state.showGroupsId)
  }

  renderAddStartupModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showAddStartupItem || this.state.showEditStartupItem != null}
        title="Startup Item"
        onHide={() => {
          this.closeAddStartupItem()
        }}
      >
        <>
          <Picker
            placeholder="Enter Action Value"
            selectedValue={this.state.startupAction}
            onValueChange={(e) => {
              this.setState({ startupAction: e })
            }}
          >
            {this.props.navigation.getState().routeNames.map((item) => {
              return <Picker.Item label={item} value={item} />
            })}
          </Picker>

          <TextInput
            onChange={(val: any) => {
              this.setState({ startupProps: val.target.value })
            }}
            placeholder="Enter Props"
            multiline={false}
            value={this.state.startupProps}
            style={this.styles.style.adminCRMModalInviteEmail}
          ></TextInput>
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
          <Container
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
                this.state.showEditStartupItem != null ? this.saveStartup() : this.addStartup()
              }}
            >
              {this.state.showEditStartupItem != null ? "Edit Startup" : "Add Startup"}
            </JCButton>
          </Container>
        </>
      </JCModal>
    )
  }

  addStartupItem = () => {
    this.setState({ showAddStartupItem: true })
  }
  closeAddStartupItem = () => {
    this.setState({
      showAddStartupItem: false,
      showEditStartupItem: null,
      startupAction: "",
      startupProps: "",
      groupData: [],
    })
  }
  editStartupItem = (item: any) => {
    this.setState({
      showEditStartupItem: item.id,
      startupAction: item.action,
      startupProps: item.params,
      startupOrder: item.order,
      groupData: item.readGroups,
    })

    // await Data.updateMenu(id)
  }
  deleteStartupItem = async (id: string) => {
    await Data.deleteStartup(id)
    await this.setInitialData()
  }
  reOrderStartupItem = async (item1: StartupItem, item2: StartupItem) => {
    if (item1 && item2) {
      await Data.updateStartup({ id: item1.id, order: item2.order })
      await Data.updateStartup({ id: item2.id, order: item1.order })
      await this.setInitialData()
    }
  }
  getPreviewStartup() {
    const pgd = this.state.previewGroupData
    const preview = JSON.parse(JSON.stringify(this.state.startup))
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
  renderPreview(): React.ReactNode {
    return (
      <View>
        <Text>Startup Preview:</Text>
        {this.getPreviewStartup()}
        <Picker
          style={{
            height: 45,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 10,
          }}
          selectedValue={this.state.groupToAdd}
          onValueChange={(val) => {
            this.setState({
              previewGroupData: this.state.previewGroupData.concat([val]),
            })
          }}
        >
          {Object.keys(UserGroupType).map((org) => {
            return <Picker.Item key={org} label={org} value={org} />
          })}
        </Picker>
        {this.state.previewGroupData
          ? this.state.previewGroupData.map((item: any, index: number) => {
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
                          previewGroupData: this.state.previewGroupData.filter((x) => x != item),
                        })
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
  render(): React.ReactNode {
    return (
      <AdminScreen.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          console.log("AdminScreen")
          return (
            <Container testID="events">
              {userActions.isMemberOf("admin") ? (
                <ScrollView>
                  {this.renderPreview()}

                  <Container style={this.styles.style.fontRegular}>
                    <JCButton buttonType={ButtonTypes.AdminAdd} onPress={this.addStartupItem}>
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
                      {this.state.startup?.map((item, index: number) => {
                        if (!item) return null
                        return (
                          <>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => this.editStartupItem(item)}
                              >
                                ...
                              </JCButton>
                              {(item.order ?? 0) > 0 ? (
                                <JCButton
                                  buttonType={ButtonTypes.AdminSmallOutline}
                                  onPress={() =>
                                    this.reOrderStartupItem(item, this.state.startup[index - 1])
                                  }
                                >
                                  <Ionicons
                                    name="arrow-up-outline"
                                    style={this.styles.style.icon}
                                  />
                                </JCButton>
                              ) : null}
                              {(item.order ?? 0) < this.state.startup.length - 1 ? (
                                <JCButton
                                  buttonType={ButtonTypes.AdminSmallOutline}
                                  onPress={() =>
                                    this.reOrderStartupItem(item, this.state.startup[index + 1])
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
                                onPress={() => this.deleteStartupItem(item.id)}
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
                  </Container>
                </ScrollView>
              ) : (
                <ScrollView>
                  <Container style={this.styles.style.eventsScreenMainContainer}>
                    <Container style={this.styles.style.eventsScreenLeftContainer}>
                      <Text>You must be an admin to see this screen</Text>
                    </Container>
                  </Container>
                </ScrollView>
              )}
              {this.renderAddStartupModal()}
            </Container>
          )
        }}
      </AdminScreen.UserConsumer>
    )
  }
}
