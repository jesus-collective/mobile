import { useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Container, Content, Picker, Text } from "native-base"
import React, { useState } from "react"
import { TextInput, View } from "react-native"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { ListCustomPricingsQuery, UserGroupType } from "../../src/API"
interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
interface State extends JCState {
  pricings: NonNullable<ListCustomPricingsQuery["listCustomPricings"]>["items"]
  showAddPricingsItem: boolean
  email: string
  showEditPricingsItem: string | null
  groupData: UserGroupType[]
  previewGroupData: UserGroupType[]
  groupList: string[]
  groupToAdd: string
  showGroupsId: string
}

class AdminScreenImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      showAddPricingsItem: false,
      showEditPricingsItem: null,
      groupList: [],
      groupData: [],
      previewGroupData: [],
      pricings: [],
    }
    this.setInitialData()
  }

  async setInitialData() {
    try {
      const listCustomPricings = await Data.listCustomPricings(null)
      console.log({ listCustomPricings: listCustomPricings })
      this.setState({
        pricings: listCustomPricings.data?.listCustomPricings?.items ?? [],
      })
    } catch (e) {
      console.log(e)
    }
  }
  static UserConsumer = UserContext.Consumer
  async savePricings(): Promise<void> {
    try {
      if (this.state.showEditPricingsItem != null) {
        const z = await Data.updateCustomPricing({
          id: this.state.showEditPricingsItem,
          emailAddress: this.state.email,
        })
        console.log(z)
        this.setState({
          groupData: [],
          email: "",
        })
        await this.setInitialData()
        this.closeAddPricingsItem()
      }
    } catch (e) {
      console.log(e)
    }
  }
  async addPricing(): Promise<void> {
    try {
      const z = await Data.createCustomPricing({
        emailAddress: this.state.email,
      })
      console.log(z)
      this.setState({ groupData: [], email: "" })
      await this.setInitialData()
      this.closeAddPricingsItem()
    } catch (e) {
      console.log(e)
    }
    //await this.addUserToGroup(user, group)
    //if (this.state.showGroupsId) this.showGroups(this.state.showGroupsId)
  }

  renderAddPricingsModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showAddPricingsItem || this.state.showEditPricingsItem != null}
        title="Pricings Item"
        onHide={() => {
          this.closeAddPricingsItem()
        }}
      >
        <>
          <TextInput
            onChange={(val: any) => {
              this.setState({ email: val.target.value })
            }}
            placeholder="Enter email"
            multiline={false}
            value={this.state.email}
            style={this.styles.style.adminCRMModalInviteEmail}
          ></TextInput>
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
                this.state.showEditPricingsItem != null
                  ? this.savePricings()
                  : this.addPricingsItem()
              }}
            >
              {this.state.showEditPricingsItem != null ? "Edit Startup" : "Add Startup"}
            </JCButton>
          </Container>
        </>
      </JCModal>
    )
  }

  addPricingsItem = () => {
    this.setState({ showAddPricingsItem: true })
  }
  closeAddPricingsItem = () => {
    this.setState({
      showAddPricingsItem: false,
      showEditPricingsItem: null,
      groupData: [],
      email: "",
    })
  }
  editPricingsItem = (item: any) => {
    this.setState({
      showEditPricingsItem: item.id,
      groupData: item.readGroups,
      email: item.emailAddress,
    })

    // await Data.updateMenu(id)
  }
  deletePricingsItem = async (id: string) => {
    await Data.deleteStartup(id)
    await this.setInitialData()
  }

  render(): React.ReactNode {
    return (
      <AdminScreenImpl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          console.log("AdminScreen")
          return (
            <Container testID="events">
              {userActions.isMemberOf("admin") ? (
                <Content>
                  <Container style={this.styles.style.fontRegular}>
                    <JCButton buttonType={ButtonTypes.AdminAdd} onPress={this.addPricingsItem}>
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
                      {this.state.pricings?.map((item) => {
                        if (!item) return null
                        return (
                          <>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => this.editPricingsItem(item)}
                              >
                                ...
                              </JCButton>

                              <JCButton
                                buttonType={ButtonTypes.AdminSmallOutline}
                                onPress={() => this.deletePricingsItem(item.id)}
                              >
                                -
                              </JCButton>
                              <Text>{item.emailAddress}</Text>
                            </div>
                          </>
                        )
                      })}
                      {this.renderAddPricingsModal()}
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
            </Container>
          )
        }}
      </AdminScreenImpl.UserConsumer>
    )
  }
}
let env = "unknown"
if (window.location === undefined) env = "mobile"
else if (window.location.hostname === "localhost") env = "dev"
else if (window.location.hostname.includes("beta")) env = "beta"
else if (window.location.hostname.includes("dev")) env = "dev"
else env = "beta"

export default function AdminScreen(props: Props): JSX.Element {
  const route = useRoute()
  //  const navigation = useNavigation()

  const [stripePromise] = useState(() =>
    loadStripe(
      env == "beta"
        ? "pk_live_51HlyrYLTzrDhiQ9282ydxEkzCmGQuJ6w6m2J7pvWL3DslQGdyZHhi6NFa7lLgErh9YjboGdEs09ce0y9c3H5SfVx00K1massZP"
        : "pk_test_51HlyrYLTzrDhiQ921sERNUY2GQBDgpHDOUYMiNZ0lTeTsse9u8oQoBfLg6UzWaxcNkYhek4tkNWILTlAiajet27k00FFv6z0RB"
    )
  )
  return (
    <Elements stripe={stripePromise}>
      <AdminScreenImpl {...props} route={route} />
    </Elements>
  )
}
