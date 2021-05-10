import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { API, Auth, graphqlOperation } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { MapData } from "components/MyGroups/MyGroups"
import moment from "moment"
import { Button, Container, Content, Text } from "native-base"
import React from "react"
import { isMobile } from "react-device-detect"
import { Picker, TextInput, TouchableOpacity, View } from "react-native"
import { v4 as uuidv4 } from "uuid"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import Header from "../../components/Header/Header"
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import {
  CreateOrganizationInput,
  CreateOrganizationMemberInput,
  CreateUserInput,
  GetProductQuery,
  UserGroupType,
} from "../../src/API"
import * as customQueries from "../../src/graphql-custom/queries"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import { InviteType } from "../../src/types"

interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  showMap: boolean
  mapData: MapData[]
  showMy: boolean
  data: any
  invite: string
  showGroups: boolean
  showGroupsId: string | null
  groupData: []
  showUid: boolean
  showEmail: boolean
  showPhone: boolean
  showStatus: boolean
  groupToAdd: string | null
  groupList: any
  paymentsData: []
  showPayments: boolean
  showPaymentsId: string | null
  productList: []
  showInvite: boolean
  inviteType: InviteType | null
  inviteData: string | null
  inviteDataList: any
}

export default class AdminScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      mapData: [],
      showMap: false,
      showMy: this.props.route.params ? this.props.route.params.mine : false,
      data: [],
      showGroups: false,
      showGroupsId: null,
      showUid: false,
      showEmail: true,
      showPhone: true,
      showStatus: true,
      groupToAdd: null,
      showInvite: false,
      inviteType: InviteType.JC,
      inviteData: null,
      inviteDataList: [],
      groupList: Object.keys(UserGroupType).map((org: string) => {
        return org
      }),
    }
    this.setInitialData()
  }
  async getUsers(nextToken: string | null): Promise<void> {
    console.log("getUsers")
    const data = await this.listUsers(40, nextToken)
    console.log({ data: data })
    this.setState({ data: this.state.data.concat(data.Users) })
    if (data.nextToken) this.getUsers(data.nextToken)
  }
  async setInitialData(): Promise<void> {
    this.getUsers(null)

    const listProducts: any = await API.graphql({
      query: queries.listProducts,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
    console.log(listProducts)
    this.setState({ productList: listProducts.data.listProducts.items })
  }
  async listUsers(limit: number, nextToken: string | null): Promise<any> {
    const apiName = "AdminQueries"
    const path = "/listUsers"
    const myInit = {
      queryStringParameters: {
        limit: limit,
        token: nextToken,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    }
    const z = await API.get(apiName, path, myInit)
    console.log(z)
    const { NextToken, ...rest } = z
    nextToken = NextToken
    return { nextToken, ...rest }
  }

  async removeUserFromGroup(user: string, groupName: string): Promise<any> {
    console.log(user)
    console.log(groupName)
    const apiName = "AdminQueries"
    const path = "/removeUserFromGroup"
    const myInit = {
      body: {
        username: user,
        groupname: groupName,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    }
    const { ...rest } = await API.post(apiName, path, myInit)
    return rest
  }
  async addUserToGroup(user: string, groupName: string): Promise<any> {
    console.log(user)
    console.log(groupName)
    const apiName = "AdminQueries"
    const path = "/addUserToGroup"
    const myInit = {
      body: {
        username: user,
        groupname: groupName,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    }
    const { ...rest } = await API.post(apiName, path, myInit)
    return rest
  }
  async adminUpdateUserAttributes(user: string, email: string): Promise<any> {
    console.log(user)
    console.log(email)
    const apiName = "AdminQueries"
    const path = "/adminUpdateUserAttributes"
    const myInit = {
      body: {
        username: user,
        email: email,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    }
    const z = await API.post(apiName, path, myInit)
    console.log({ adminUpdateUserAttributes: z })
    return z
  }

  async listGroupsForUser(user: string, limit: number, nextToken: string | null): Promise<any> {
    const apiName = "AdminQueries"
    const path = "/listGroupsForUser"
    const myInit = {
      queryStringParameters: {
        username: user,
        limit: limit,
        token: nextToken,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    }
    const { NextToken, ...rest } = await API.get(apiName, path, myInit)
    nextToken = NextToken
    return rest
  }

  async adminCreateUser(email: string): Promise<any> {
    const apiName = "AdminQueries"
    const path = "/adminCreateUser"
    const myInit = {
      queryStringParameters: {
        email: email,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    }
    const { ...rest } = await API.get(apiName, path, myInit)
    // nextToken = NextToken;
    return rest
  }
  renderHeader(): React.ReactNode {
    return (
      <View style={this.styles.style.adminCRMTableContainer}>
        <View style={this.styles.style.AdminFirstNameTableHeader}>
          <Text style={this.styles.style.adminCRMTableHeading}>First Name</Text>
        </View>
        <View style={this.styles.style.AdminLastNameTableHeader}>
          <Text style={this.styles.style.adminCRMTableHeading}>Last Name</Text>
        </View>
        {this.state.showUid ? (
          <View style={this.styles.style.AdminUserIdTableHeader}>
            <Text style={this.styles.style.adminCRMTableHeading}>User id</Text>
          </View>
        ) : null}
        {this.state.showEmail ? (
          <View style={this.styles.style.adminCRMTableHeader}>
            <Text style={this.styles.style.adminCRMTableHeading}>Email</Text>
          </View>
        ) : null}
        {this.state.showPhone && !isMobile ? (
          <View style={this.styles.style.AdminPhoneTableHeader}>
            <Text style={this.styles.style.adminCRMTableHeading}>Phone</Text>
          </View>
        ) : null}
        {this.state.showStatus && !isMobile ? (
          <View style={this.styles.style.AdminStatusTableHeader}>
            <Text style={this.styles.style.adminCRMTableHeading}>Status</Text>
          </View>
        ) : null}
        {!isMobile ? (
          <View style={this.styles.style.AdminEnabledTableHeader}>
            <Text style={this.styles.style.adminCRMTableHeading}>Enabled</Text>
          </View>
        ) : null}
        <View style={this.styles.style.AdminGroupsTableHeader}>
          <Text style={this.styles.style.adminCRMTableHeading}>Groups</Text>
        </View>
        <View style={this.styles.style.AdminPaymentsTableHeader}>
          <Text style={this.styles.style.adminCRMTableHeading}>Payments</Text>
        </View>
      </View>
    )
  }

  async showPayments(id: string): Promise<void> {
    this.setState(
      {
        showPayments: true,
        showPaymentsId: id,
      },
      async () => {
        try {
          const payments: any = await API.graphql({
            query: queries.paymentByUser,
            variables: { userID: id },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })
          console.log(payments)
          this.setState({ paymentsData: payments.data.paymentByUser.items })
        } catch (e: any) {
          console.log(e)
          this.setState({ paymentsData: e.data.paymentByUser.items })
        }
      }
    )
  }
  closePayments(): void {
    this.setState({
      showPayments: false,
      showPaymentsId: null,
    })
  }
  async removePayment(user: string, group: string): Promise<void> {
    console.log(user)
    console.log(group)

    try {
      const saveResult = await API.graphql(
        graphqlOperation(mutations.deletePayment, { input: { id: group } })
      )
      console.log(saveResult)
    } catch (e) {
      console.error(e)
    }
    this.setState({
      paymentsData: [],
      showPaymentsId: null,
      showPayments: false,
    })
  }
  async addPayment(user: string, group: string): Promise<void> {
    console.log(user)
    console.log(group)

    try {
      const saveResult = (await API.graphql(
        graphqlOperation(mutations.createPayment, {
          input: {
            id: group + "-" + user,
            productID: group,
            userID: user,
            dateCompleted: Date.now(),
            paymentType: "Admin/CRM",
            paymentInfo: "By: ",
          },
        })
      )) as GraphQLResult<GetProductQuery>
      console.log(saveResult)
    } catch (e) {
      console.error(e)
    }
    this.setState({
      paymentsData: [],
      showPaymentsId: null,
      showPayments: false,
    })

    //await this.//addUserToGroup(user, group)
    //this.showPayments(this.state.showPaymentsId)
  }
  closeInvite(): void {
    this.setState({
      showInvite: false,
    })
  }
  showInvite(): void {
    this.setState({
      showInvite: true,
    })
  }
  closeGroups(): void {
    this.setState({
      showGroups: false,
      showGroupsId: null,
    })
  }
  async removeGroup(user: string, group: string): Promise<void> {
    await this.removeUserFromGroup(user, group)
    if (this.state.showGroupsId) this.showGroups(this.state.showGroupsId)
  }
  async addGroup(user: string, group: string): Promise<void> {
    await this.addUserToGroup(user, group)
    if (this.state.showGroupsId) this.showGroups(this.state.showGroupsId)
  }
  async showGroups(id: string): Promise<void> {
    this.setState(
      {
        showGroups: true,
        showGroupsId: id,
      },
      async () => {
        const groups = await this.listGroupsForUser(id, 20, null)
        console.log(groups)
        this.setState({ groupData: groups.Groups })
      }
    )
  }
  showProfile(id: string): void {
    this.props.navigation.push("ProfileScreen", { id: id, create: false })
  }
  renderRow(item: any, index: number): React.ReactNode {
    return (
      <View key={index} style={this.styles.style.AdminTableRowContainer}>
        <View style={this.styles.style.AdminFirstNameTableRow}>
          <Text style={this.styles.style.adminCRMTableParagraph}>
            <TouchableOpacity
              onPress={() => {
                this.showProfile(item.Username)
              }}
            >
              {item.Attributes.find((e) => e.Name == "given_name")?.Value}
            </TouchableOpacity>
          </Text>
        </View>
        <View style={this.styles.style.AdminLastNameTableRow}>
          <Text style={this.styles.style.adminCRMTableParagraph}>
            <TouchableOpacity
              onPress={() => {
                this.showProfile(item.Username)
              }}
            >
              {item.Attributes.find((e) => e.Name == "family_name")?.Value}
            </TouchableOpacity>
          </Text>
        </View>
        {this.state.showUid ? (
          <View style={this.styles.style.AdminUserIdTableRow}>
            <TouchableOpacity
              onPress={() => {
                this.showProfile(item.Username)
              }}
            >
              <Text style={this.styles.style.fontRegular}>{item.Username}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.state.showEmail ? (
          <View style={this.styles.style.adminCRMTableRow}>
            <Text style={this.styles.style.adminCRMTableParagraph}>
              {item.Attributes.find((e) => e.Name == "email")?.Value}
            </Text>
          </View>
        ) : null}
        {this.state.showPhone && !isMobile ? (
          <View style={this.styles.style.AdminPhoneTableRow}>
            <Text style={this.styles.style.adminCRMTableEmailStatus}>
              {item.Attributes.find((e) => e.Name == "phone_number")?.Value}
            </Text>
          </View>
        ) : null}
        {this.state.showStatus && !isMobile ? (
          <View style={this.styles.style.AdminStatusTableRow}>
            <Text style={this.styles.style.adminCRMTableEmailStatus}>{item.UserStatus}</Text>
          </View>
        ) : null}
        {!isMobile ? (
          <View style={this.styles.style.AdminEnabledTableRow}>
            <Text style={this.styles.style.fontRegular}>{item.Enabled.toString()}</Text>
          </View>
        ) : null}

        <View style={this.styles.style.AdminGroupBTTableRow}>
          {!isMobile ? (
            <JCButton
              buttonType={ButtonTypes.AdminSmallOutline}
              onPress={() => {
                this.showGroups(item.Username)
              }}
            >
              Groups
            </JCButton>
          ) : (
            <Button
              transparent
              onPress={() => {
                this.showGroups(item.Username)
              }}
            >
              <Ionicons name="ios-people" style={this.styles.style.icon} />
            </Button>
          )}
        </View>
        <View style={this.styles.style.AdminPaymentBTTableRow}>
          {!isMobile ? (
            <JCButton
              buttonType={ButtonTypes.AdminSmallOutline}
              onPress={() => {
                this.showPayments(item.Username)
              }}
            >
              Payments
            </JCButton>
          ) : (
            <Button
              transparent
              onPress={() => {
                this.showPayments(item.Username)
              }}
            >
              <MaterialIcons name="payment" style={this.styles.style.icon} />
            </Button>
          )}
        </View>
      </View>
    )
  }
  async createUser(user): Promise<void> {
    let userExists = false

    if (user != null) {
      const { attributes } = user
      const handleUser = async (getUser: any) => {
        if (getUser.data.getUser === null) {
          console.log("Trying to create")
          const inputData: CreateUserInput = {
            id: user["username"],
            given_name: attributes["given_name"],
            family_name: attributes["family_name"],
            email: attributes["email"],
            phone: attributes["phone_number"],
            profileState: "Incomplete",
            orgName: attributes["custom:orgName"],
            billingAddress: {},
            alertConfig: {
              emailDirectMessage: "true",
              emailGroupMessage: "true",
              emailEventMessage: "true",
              emailOrgMessage: "true",
              emailResourceMessage: "true",
              emailCourseMessage: "true",
              emailPromotions: "true",
            },
            joined: moment().format(),
          }

          try {
            const createUser: any = await API.graphql({
              query: mutations.createUser,
              variables: {
                input: inputData,
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })

            userExists = true
            console.log({ createUser: createUser })
          } catch (e) {
            console.log({ error: e })
          }
        } else {
          userExists = true
          console.log("User exists")
        }

        if (attributes["custom:isOrg"] === "true" && getUser) {
          if (getUser?.data.getUser.organizations.items.length === 0) {
            console.log("creating Organization")
            const id = `organization-${Date.now()}`
            const orgInput: CreateOrganizationInput = {
              id: id,
              orgName: attributes["custom:orgName"],
              adminEmail: attributes["email"],
              phone: attributes["phone_number"],
              profileState: "Incomplete",
              admins: [user["username"]],
              superAdmin: user["username"],
              parentOrganizationId: id,
              joined: moment().format(),
            }

            let orgId = ""

            try {
              const createOrg: any = await API.graphql({
                query: mutations.createOrganization,
                variables: {
                  input: orgInput,
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              })
              console.log({ createOrg: createOrg })
              orgId = createOrg.data.createOrganization.id
            } catch (e) {
              if (e?.data?.createOrganization) orgId = e.data.createOrganization.id
              console.error({ error: e })
            }

            const orgMember: CreateOrganizationMemberInput = {
              userRole: "superAdmin",
              userId: user["username"],
              organizationId: orgId,
            }

            try {
              const createOrgMember: any = await API.graphql({
                query: mutations.createOrganizationMember,
                variables: {
                  input: orgMember,
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              })
              console.log({ createOrgMember: createOrgMember })
            } catch (e) {
              console.log({ error: e })
            }
          } else if (
            getUser?.data?.getUser?.organizations?.items[0]?.organizationId &&
            getUser?.data.getUser.organizations.items.length === 1
          ) {
            console.log("Organization exists: setting organization id")
          } else {
            console.error("error finding or creating user's organization")
          }
        }
      }
      const z: any = API.graphql(graphqlOperation(queries.getUser, { id: user["username"] }))
      await z.then(handleUser).catch(handleUser)

      console.log({ userExists: userExists })
    }
  }
  async sendInvite(email: string, inviteType: InviteType): Promise<void> {
    console.log({ "inviting:": email })
    const z = await this.adminCreateUser(email.toLowerCase())
    await this.addUserToGroup(z.User.Username, "verifiedUsers")
    if (inviteType == InviteType.course) {
      await this.addUserToGroup(z.User.Username, "courseUser")
    }
    await this.createUser(z.User)
    await this.createStripeUser(z.User)
  }
  async createStripeUser(user): Promise<boolean> {
    try {
      console.log(user)
      const customer: any = await API.graphql({
        query: mutations.createCustomer,
        variables: {
          idempotency: uuidv4(),
          firstName: user.attributes.given_name,
          lastName: user.attributes.family_name,
          email: user.attributes.email,
          phone: user.attributes.phone_number,
          orgName: user?.attributes!["custom:orgName"],
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      console.log({ customer: customer })
      return true
      //customerId = customer.data.createCustomer.customer.id;
    } catch (e) {
      console.log(e)
      return false
    }
  }
  renderGroupsModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showGroups}
        title="Groups"
        onHide={() => {
          this.closeGroups()
        }}
      >
        <>
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
                      {item.GroupName}
                    </Text>
                    <JCButton
                      buttonType={ButtonTypes.AdminModalOrange}
                      onPress={() => {
                        if (window.confirm("Are you sure you wish to delete this group?"))
                          if (this.state.showGroupsId)
                            this.removeGroup(this.state.showGroupsId, item.GroupName)
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
                this.setState({ groupToAdd: val })
              }}
            >
              {" "}
              <Picker.Item value={null} label="pick a group to add" />
              {this.state.groupList.map((item, index: number) => {
                return <Picker.Item key={index} value={item} label={item} />
              })}
            </Picker>
            <JCButton
              buttonType={ButtonTypes.AdminAdd}
              onPress={() => {
                if (this.state.showGroupsId && this.state.groupToAdd)
                  this.addGroup(this.state.showGroupsId, this.state.groupToAdd)
              }}
            >
              Add Group
            </JCButton>
          </Container>
        </>
      </JCModal>
    )
  }
  renderPaymentsModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showPayments}
        title="Payments"
        onHide={() => {
          this.closePayments()
        }}
      >
        <>
          {this.state.paymentsData
            ? this.state.paymentsData.map((item: any, index: number) => {
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
                      {item.product?.name}
                    </Text>
                    <JCButton
                      buttonType={ButtonTypes.AdminModalOrange}
                      onPress={() => {
                        if (window.confirm("Are you sure you wish to delete this payment?"))
                          if (this.state.showPaymentsId)
                            this.removePayment(this.state.showPaymentsId, item.id)
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
                this.setState({ groupToAdd: val })
              }}
            >
              {" "}
              <Picker.Item value={null} label="pick a group to add" />
              {this.state.productList?.map((item: any, index) => {
                console.log(item)
                return <Picker.Item key={index} value={item.id} label={item.name} />
              })}
            </Picker>
            <JCButton
              buttonType={ButtonTypes.AdminAdd}
              onPress={() => {
                if (this.state.showPaymentsId && this.state.groupToAdd)
                  this.addPayment(this.state.showPaymentsId, this.state.groupToAdd)
              }}
            >
              Add Payment
            </JCButton>
          </Container>
        </>
      </JCModal>
    )
  }
  async updateInviteDataList(nextToken: any): Promise<void> {
    const listGroup: any = await API.graphql({
      query: customQueries.groupByTypeForMyGroups,
      variables: {
        limit: 20,
        type: this.state.inviteType,
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
    console.log(listGroup)
    this.setState({ inviteDataList: listGroup.data.groupByType.items })
  }
  renderInviteModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showInvite}
        title="Invite"
        onHide={() => {
          this.closeInvite()
        }}
      >
        <>
          <Text style={this.styles.style.adminCRMModalInvite}>Invite: </Text>
          <TextInput
            onChange={(val: any) => {
              this.setState({ invite: val.target.value })
            }}
            placeholder="Enter Email Address"
            multiline={false}
            value={this.state.invite}
            style={this.styles.style.adminCRMModalInviteEmail}
          ></TextInput>
          <Picker
            style={{
              height: 45,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 10,
            }}
            selectedValue={this.state.inviteType}
            onValueChange={(val) => {
              this.setState({ inviteType: val, inviteData: null, inviteDataList: [] }, () => {
                this.updateInviteDataList(null)
              })
            }}
          >
            <Picker.Item value={null} label="pick a group to add" />
            <Picker.Item value={InviteType.JC} label="Invite to Jesus Collective" />
            <Picker.Item value={InviteType.course} label="Invite to Course" />
            <Picker.Item value={InviteType.group} label="Invite to Group" />
            <Picker.Item value={InviteType.event} label="Invite to Event" />
            <Picker.Item value={InviteType.resource} label="Invite to Resource" />
          </Picker>

          {this.state.inviteType != null && this.state.inviteType != InviteType.JC ? (
            <Picker
              selectedValue={this.state.inviteData}
              onValueChange={(val) => {
                this.setState({ inviteData: val })
              }}
            >
              <Picker.Item value={null} label="pick a group to add" />
              {this.state.inviteDataList.map((item, index: number) => {
                return <Picker.Item key={index} value={item.value} label={item.name} />
              })}
            </Picker>
          ) : null}

          <JCButton
            buttonType={ButtonTypes.Outline}
            enabled={this.state.inviteType != null}
            onPress={() => {
              if (this.state.inviteType != null) {
                this.sendInvite(this.state.invite, this.state.inviteType)
                this.closeInvite()
                this.setInitialData()
              }
            }}
          >
            Send Invite
          </JCButton>
        </>
      </JCModal>
    )
  }
  static UserConsumer = UserContext.Consumer

  render(): React.ReactNode {
    return (
      <AdminScreen.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          console.log("AdminScreen")
          return (
            <Container testID="events">
              <Header title="Jesus Collective" navigation={this.props.navigation} />

              <HeaderAdmin title="Jesus Collective" navigation={this.props.navigation} />
              {userActions.isMemberOf("admin") ? (
                <Content>
                  <Container style={this.styles.style.fontRegular}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <View style={this.styles.style.adminSubNavMainContainer}>
                        <View style={this.styles.style.adminSubNavTogglesView}>
                          <JCSwitch
                            toggleSpacing={"space-between"}
                            containerWidth={150}
                            toggleMargin={5}
                            switchLabel="show user id"
                            initState={false}
                            onPress={() => this.setState({ showUid: !this.state.showUid })}
                          />
                          <JCSwitch
                            toggleSpacing={"space-between"}
                            containerWidth={150}
                            toggleMargin={5}
                            switchLabel="show email"
                            initState={true}
                            onPress={() =>
                              this.setState({
                                showEmail: !this.state.showEmail,
                              })
                            }
                          />
                        </View>
                        <View style={this.styles.style.adminSubNavTogglesView}>
                          <JCSwitch
                            toggleSpacing={"space-between"}
                            containerWidth={160}
                            toggleMargin={5}
                            switchLabel="show phone #"
                            initState={true}
                            onPress={() =>
                              this.setState({
                                showPhone: !this.state.showPhone,
                              })
                            }
                          />
                          <JCSwitch
                            toggleSpacing={"space-between"}
                            containerWidth={160}
                            toggleMargin={5}
                            switchLabel="show status"
                            initState={true}
                            onPress={() =>
                              this.setState({
                                showStatus: !this.state.showStatus,
                              })
                            }
                          />
                        </View>
                        <View style={this.styles.style.adminInviteButton}>
                          <JCButton
                            buttonType={ButtonTypes.AdminOutline}
                            onPress={() => {
                              this.showInvite()
                            }}
                          >
                            Invite
                          </JCButton>
                        </View>
                      </View>

                      <Content style={{ width: "100%" }}>
                        {this.renderHeader()}
                        {this.state.data
                          ? this.state.data.map((item: any, index: number) => {
                              // This will render a row for each data element.
                              return this.renderRow(item, index)
                            })
                          : null}
                      </Content>
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
              {this.renderGroupsModal()}
              {this.renderPaymentsModal()}
              {this.renderInviteModal()}
            </Container>
          )
        }}
      </AdminScreen.UserConsumer>
    )
  }
}
