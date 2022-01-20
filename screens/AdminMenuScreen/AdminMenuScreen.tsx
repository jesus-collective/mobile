import { Ionicons } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import { Container, Content, Picker, Text } from "native-base"
import React from "react"
import { TextInput, View } from "react-native"
import { ListMenusQuery } from "src/API-customqueries"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { UserGroupType } from "../../src/API"
interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}

interface State extends JCState {
  menus: NonNullable<ListMenusQuery["listMenus"]>["items"]
  showAddMenuItem: boolean
  showAddSubMenuItem: string | null
  showEditMenuItem: string | null
  showEditSubMenuItem: string | null
  menuName: string
  menuProps: string
  subMenuName: string
  groupData: UserGroupType[]
  groupList: string[]
  groupToAdd: string
  showGroupsId: string
  menuAction: string
  subMenuAction: string
  subMenuProps: string
}

export default class AdminScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      showAddMenuItem: false,
      showAddSubMenuItem: null,
      showEditMenuItem: null,
      showEditSubMenuItem: null,
      groupList: [],
      groupData: [],
      menus: [],
    }
    this.setInitialData()
  }

  async setInitialData() {
    try {
      const listMenus = await Data.listMenu(null)
      console.log({ listMenus: listMenus })
      this.setState({
        menus:
          listMenus.data?.listMenus?.items.sort((x, y) => (x.order ?? 0) - (y.order ?? 0)) ?? [],
      })
    } catch (e) {
      console.log(e)
    }
  }
  static UserConsumer = UserContext.Consumer
  async saveMenu(): Promise<void> {
    try {
      if (this.state.showEditMenuItem != null) {
        const z = await Data.updateMenu({
          id: this.state.showEditMenuItem,
          name: this.state.menuName,
          action: this.state.menuAction,
          readGroups: this.state.groupData,
          order: this.state.menus.length,
          params: this.state.menuProps,
        })
        console.log(z)
        this.setState({
          menuName: "",
          menuAction: "",
          menuProps: "",
          groupData: [],
        })
        await this.setInitialData()
        this.closeAddMenuItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  async addMenu(): Promise<void> {
    try {
      const z = await Data.createMenu({
        name: this.state.menuName,
        action: this.state.menuAction,
        readGroups: this.state.groupData,
        order: this.state.menus.length,
        params: this.state.menuProps,
      })
      console.log(z)
      this.setState({ menuName: "", menuAction: "", menuProps: "", groupData: [] })
      await this.setInitialData()
      this.closeAddMenuItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (this.state.showGroupsId) this.showGroups(this.state.showGroupsId)
  }
  async saveSubMenu(): Promise<void> {
    try {
      if (this.state.showEditSubMenuItem != null) {
        const z = await Data.updateSubMenu({
          id: this.state.showEditSubMenuItem,
          name: this.state.subMenuName,
          action: this.state.subMenuAction,
          params: this.state.subMenuProps,
          readGroups: this.state.groupData,
        })
        console.log(z)
        this.setState({ subMenuName: "", subMenuAction: "", subMenuProps: "", groupData: [] })
        await this.setInitialData()
        this.closeAddSubMenuItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  async addSubMenu(): Promise<void> {
    try {
      const z = await Data.createSubMenu({
        name: this.state.subMenuName,
        action: this.state.subMenuAction,
        params: this.state.subMenuProps,
        readGroups: this.state.groupData,
        menuID: this.state.showAddSubMenuItem,
        order: this.state.menus.filter((f) => f.id == this.state.showAddSubMenuItem)[0].subItems
          ?.items.length,
      })
      console.log(z)
      this.setState({ subMenuName: "", subMenuAction: "", subMenuProps: "", groupData: [] })
      await this.setInitialData()
      this.closeAddSubMenuItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (this.state.showGroupsId) this.showGroups(this.state.showGroupsId)
  }
  renderAddMenuModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showAddMenuItem || this.state.showEditMenuItem != null}
        title="Menu Item"
        onHide={() => {
          this.closeAddMenuItem()
        }}
      >
        <>
          <TextInput
            onChange={(val: any) => {
              this.setState({ menuName: val.target.value })
            }}
            placeholder="Enter Menu Name"
            multiline={false}
            value={this.state.menuName}
            style={this.styles.style.adminCRMModalInviteEmail}
          ></TextInput>
          <Picker
            placeholder="Enter Action Value"
            selectedValue={this.state.menuAction}
            onValueChange={(e) => {
              this.setState({ menuAction: e })
            }}
          >
            {this.props.navigation.getState().routeNames.map((item) => {
              return <Picker.Item label={item} value={item} />
            })}
          </Picker>

          <TextInput
            onChange={(val: any) => {
              this.setState({ menuProps: val.target.value })
            }}
            placeholder="Enter Props"
            multiline={false}
            value={this.state.menuProps}
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
                this.state.showEditMenuItem != null ? this.saveMenu() : this.addMenu()
              }}
            >
              {this.state.showEditMenuItem != null ? "Edit Menu" : "Add Menu"}
            </JCButton>
          </Container>
        </>
      </JCModal>
    )
  }
  renderAddSubMenuModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showAddSubMenuItem != null || this.state.showEditSubMenuItem != null}
        title="Sub Menu Item"
        onHide={() => {
          this.closeAddSubMenuItem()
        }}
      >
        <>
          <TextInput
            onChange={(val: any) => {
              this.setState({ subMenuName: val.target.value })
            }}
            placeholder="Enter Sub Menu Name"
            multiline={false}
            value={this.state.subMenuName}
            style={this.styles.style.adminCRMModalInviteEmail}
          ></TextInput>
          <Picker
            placeholder="Enter Action Value"
            selectedValue={this.state.subMenuAction}
            onValueChange={(e) => {
              this.setState({ subMenuAction: e })
            }}
          >
            {this.props.navigation.getState().routeNames.map((item) => {
              return <Picker.Item label={item} value={item} />
            })}
          </Picker>

          <TextInput
            onChange={(val: any) => {
              this.setState({ subMenuProps: val.target.value })
            }}
            placeholder="Enter Props"
            multiline={false}
            value={this.state.subMenuProps}
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
                this.state.showEditSubMenuItem != null ? this.saveSubMenu() : this.addSubMenu()
              }}
            >
              {this.state.showEditSubMenuItem != null ? "Edit Sub Menu" : "Add Sub Menu"}
            </JCButton>
          </Container>
        </>
      </JCModal>
    )
  }
  addMenuItem = () => {
    this.setState({ showAddMenuItem: true })
  }
  closeAddMenuItem = () => {
    this.setState({
      showAddMenuItem: false,
      showEditMenuItem: null,
      menuName: "",
      menuAction: "",
      menuProps: "",
      groupData: [],
    })
  }
  addSubMenuItem = (id: string) => {
    this.setState({ showAddSubMenuItem: id })
  }
  closeAddSubMenuItem = () => {
    this.setState({
      showAddSubMenuItem: null,
      showEditSubMenuItem: null,
      subMenuName: "",
      subMenuAction: "",
      subMenuProps: "",
      groupData: [],
    })
  }
  editMenuItem = (item: any) => {
    this.setState({
      showEditMenuItem: item.id,
      menuName: item.name,
      menuAction: item.action,
      menuProps: item.params,
      groupData: item.readGroups,
    })

    // await Data.updateMenu(id)
  }
  editSubMenuItem = (item: any) => {
    this.setState({
      showEditSubMenuItem: item.id,
      subMenuName: item.name,
      subMenuAction: item.action,
      subMenuProps: item.params,
      groupData: item.readGroups,
    })
    //await Data.updateSubMenu(id)
  }
  deleteMenuItem = async (id: string) => {
    await Data.deleteMenu(id)
    await this.setInitialData()
  }
  deleteSubMenuItem = async (id: string) => {
    await Data.deleteSubMenu(id)
    await this.setInitialData()
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
                <Content>
                  <Container style={this.styles.style.fontRegular}>
                    <JCButton buttonType={ButtonTypes.AdminAdd} onPress={this.addMenuItem}>
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
                      {this.state.menus?.map((item) => {
                        return (
                          <>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                              <Text>{item.name}</Text>
                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => this.addSubMenuItem(item.id)}
                              >
                                +
                              </JCButton>
                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => this.editMenuItem(item)}
                              >
                                ...
                              </JCButton>
                              {(item.order ?? 0) > 0 ? (
                                <JCButton
                                  buttonType={ButtonTypes.AdminSmallOutline}
                                  onPress={() => this.editMenuItem(item.id)}
                                >
                                  <Ionicons
                                    name="arrow-up-outline"
                                    style={this.styles.style.icon}
                                  />
                                </JCButton>
                              ) : null}
                              {(item.order ?? 0) < this.state.menus.length - 1 ? (
                                <JCButton
                                  buttonType={ButtonTypes.AdminSmallOutline}
                                  onPress={() => this.editMenuItem(item.id)}
                                >
                                  <Ionicons
                                    name="arrow-down-outline"
                                    style={this.styles.style.icon}
                                  />
                                </JCButton>
                              ) : null}
                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => this.deleteMenuItem(item.id)}
                              >
                                -
                              </JCButton>
                              <Text>{item.action}</Text>
                              <Text>{item.readGroups?.toString()}</Text>
                            </div>
                            <div>
                              {item.subItems?.items.map((item2) => {
                                return (
                                  <div style={{ display: "flex", flexDirection: "row" }}>
                                    <Text>&nbsp;&nbsp;&nbsp;</Text>
                                    <Text>{item2.name}</Text>
                                    <JCButton
                                      buttonType={ButtonTypes.AdminSmallOutline}
                                      onPress={() => this.editSubMenuItem(item2)}
                                    >
                                      ...
                                    </JCButton>
                                    {(item2.order ?? 0) > 0 ? (
                                      <JCButton
                                        buttonType={ButtonTypes.AdminSmallOutline}
                                        onPress={() => this.editMenuItem(item.id)}
                                      >
                                        <Ionicons
                                          name="arrow-up-outline"
                                          style={this.styles.style.icon}
                                        />
                                      </JCButton>
                                    ) : null}
                                    {(item2.order ?? 0) <
                                    (item.subItems?.items?.length ?? 0) - 1 ? (
                                      <JCButton
                                        buttonType={ButtonTypes.AdminSmallOutline}
                                        onPress={() => this.editMenuItem(item.id)}
                                      >
                                        <Ionicons
                                          name="arrow-down-outline"
                                          style={this.styles.style.icon}
                                        />
                                      </JCButton>
                                    ) : null}
                                    <JCButton
                                      buttonType={ButtonTypes.AdminSmallOutline}
                                      onPress={() => this.deleteSubMenuItem(item2.id)}
                                    >
                                      -
                                    </JCButton>
                                    <Text>{item2.action}</Text>
                                    <Text>{item2.readGroups?.toString()}</Text>
                                  </div>
                                )
                              })}
                            </div>
                          </>
                        )
                      })}
                    </View>
                  </Container>
                </Content>
              ) : (
                <Content>
                  <Container style={this.styles.style.eventsScreenMainContainer}>
                    <Container style={this.styles.style.eventsScreenLeftContainer}>
                      <Text>You must be an admin to see this screen</Text>
                    </Container>
                  </Container>
                </Content>
              )}
              {this.renderAddMenuModal()}
              {this.renderAddSubMenuModal()}
            </Container>
          )
        }}
      </AdminScreen.UserConsumer>
    )
  }
}
