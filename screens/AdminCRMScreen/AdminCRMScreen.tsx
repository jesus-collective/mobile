import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import { API, Auth } from "aws-amplify"
import moment from "moment"
import React from "react"
import { isMobile } from "react-device-detect"
import { Picker, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { v4 as uuidv4 } from "uuid"
import { Data } from "../../components/Data/Data"
import EditableText from "../../components/Forms/EditableText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import Header from "../../components/Header/Header"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import { MapData } from "../../components/MyGroups/MapData"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import {
  CreateOrganizationInput,
  CreateOrganizationMemberInput, CreateUserInput,
  GetUserQuery,
  GroupByTypeQuery,
  ListProductsQuery,
  PaymentByUserQuery,
  UserGroupType
} from "../../src/API"
import { GetUserQueryResult, InviteType } from "../../src/types"

interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
type StringPair = { Name: string; Value: string }
type Products = NonNullable<ListProductsQuery["listProducts"]>["items"]
type Payments = NonNullable<PaymentByUserQuery["paymentByUser"]>["items"]
interface State extends JCState {
  showMap: boolean
  mapData: MapData[]
  showMy: boolean
  data: any
  invite: string
  showEdit: boolean
  showEditId: string | null
  showEditUserExists: boolean
  showGroups: boolean
  showGroupsId: string | null
  groupData: []
  showUid: boolean
  showEmail: boolean
  showPhone: boolean
  showStatus: boolean
  search: string
  groupToAdd: string | undefined
  groupList: string[]
  paymentsData: Payments
  showPayments: boolean
  showPaymentsId: string | null
  productList: Products
  showInvite: boolean
  inviteType: InviteType | undefined
  inviteData: string | undefined
  showEditEmail: string
  inviteDataList: NonNullable<
    NonNullable<GraphQLResult<GroupByTypeQuery>["data"]>["groupByType"]
  >["items"]
}

function useDebounce(value: string, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value)
  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )
  return debouncedValue
}
type SearchUserProps = {
  setFilteredData: (data: any) => void
}
function SearchUser({ setFilteredData }: SearchUserProps): JSX.Element {
  const [search, setSearch] = React.useState("")
  const attributes = [
    { label: "ID", value: "username" },
    { label: "E-mail", value: "email" },
    { label: "Phone Number", value: "phone_number" },
    { label: "First Name", value: "given_name" },
    { label: "Last Name", value: "family_name" },
    { label: "Enabled/Disabled", value: "status" },
  ]
  const [attribute, setAttribute] = React.useState(attributes[1])
  const [isLoading, setIsLoading] = React.useState(false)
  const debouncedSearchterm = useDebounce(search, 1000)

  const doSearch = async (searchTerm: string) => {
    // search cognito users
    // search dynamo users
    try {
      setIsLoading(true)
      const listUsers = async (limit: number, nextToken: string | null): Promise<any> => {
        const apiName = "AdminQueries"
        const path = "/listUsers"
        const myInit = {
          queryStringParameters: {
            limit: limit,
            token: nextToken,
            //eslint-disable-next-line
            filter: `${attribute.value} ^= \"${searchTerm}\"`,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
          },
        }
        const z = await API.get(apiName, path, myInit)
        console.log({ z })
        const { NextToken, ...rest } = z
        nextToken = NextToken
        return { nextToken, ...rest }
      }
      const users = await listUsers(60, null) // 60 is max api accepts
      setFilteredData(users.Users)
    } catch (error) {
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }
  React.useEffect(() => {
    if (debouncedSearchterm) {
      doSearch(debouncedSearchterm)
    } else {
      setIsLoading(false)
    }
  }, [debouncedSearchterm])
  const placeHolder = `Search by ${attribute.label}`
  return (
    <View style={{ flexDirection: "row" }}>
      <Picker
        selectedValue={attribute.value}
        onValueChange={(val, index) => {
          setAttribute(attributes[index])
        }}
      >
        {" "}
        {attributes.map((item, index: number) => {
          return <Picker.Item key={index} value={item.value} label={item.label} />
        })}
      </Picker>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ alignSelf: "center", padding: 8 }}>
          {!isLoading ? (
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/Facelift/svg/Search.svg")}
            ></Image>
          ) : (
            <ActivityIndicator size="small" />
          )}
        </View>

        <TextInput
          style={{
            paddingVertical: 6,
            marginLeft: -36,
            paddingLeft: 36,
            flex: 1,
            borderColor: "black",
            borderRadius: 4,
            borderWidth: 1,
          }}
          placeholder={placeHolder}
          onChangeText={(text) => {
            setIsLoading(true)
            setSearch(text)
          }}
          value={search}
        />
      </View>
    </View>
  )
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
      showEdit: false,
      showEditId: null,
      showEditUserExists: false,
      showGroups: false,
      showGroupsId: null,
      showUid: false,
      showEmail: true,
      search: "",
      showPhone: true,
      showEditEmail: "",
      showStatus: true,
      groupToAdd: undefined,
      showInvite: false,
      inviteType: InviteType.JC,
      inviteData: undefined,
      inviteDataList: [],
      groupList: Object.keys(UserGroupType).map((org: string) => {
        return org
      }),
    }
    this.setInitialData()
  }
  async setInitialData(): Promise<void> {
    const listProducts = await Data.listProducts(null)
    console.log(listProducts)
    if (listProducts.data?.listProducts)
      this.setState({ productList: listProducts.data.listProducts.items })
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
  async adminGetUser(user: string) {
    const apiName = "AdminQueries"
    const path = "/getUser"
    const myInit = {
      queryStringParameters: {
        username: user,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    }
    const z = await API.get(apiName, path, myInit)
    console.log({ adminGetUser: z })
    return z
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
        <View
          style={[
            this.styles.style.AdminFirstNameTableHeader,
            this.styles.style.adminCRMTableHeading,
          ]}
        >
          <Text>Name</Text>
        </View>
        <View
          style={[
            this.styles.style.AdminFirstNameTableHeader,
            this.styles.style.adminCRMTableHeading,
          ]}
        >
          <Text>Picture</Text>
        </View>
        {this.state.showUid ? (
          <View
            style={[
              this.styles.style.AdminUserIdTableHeader,
              this.styles.style.adminCRMTableHeading,
            ]}
          >
            <Text>User id</Text>
          </View>
        ) : null}
        {this.state.showEmail ? (
          <View
            style={[this.styles.style.adminCRMTableHeader, this.styles.style.adminCRMTableHeading]}
          >
            <Text>Email</Text>
          </View>
        ) : null}
        {this.state.showPhone && !isMobile ? (
          <View
            style={[
              this.styles.style.AdminPhoneTableHeader,
              this.styles.style.adminCRMTableHeading,
            ]}
          >
            <Text>Phone</Text>
          </View>
        ) : null}
        {this.state.showStatus && !isMobile ? (
          <View
            style={[
              this.styles.style.AdminStatusTableHeader,
              this.styles.style.adminCRMTableHeading,
            ]}
          >
            <Text>Status</Text>
          </View>
        ) : null}
        {!isMobile ? (
          <View
            style={[
              this.styles.style.AdminEnabledTableHeader,
              this.styles.style.adminCRMTableHeading,
            ]}
          >
            <Text>Enabled</Text>
          </View>
        ) : null}
        <View
          style={[this.styles.style.AdminGroupsTableHeader, this.styles.style.adminCRMTableHeading]}
        >
          <Text>Edit</Text>
        </View>
        <View
          style={[this.styles.style.AdminGroupsTableHeader, this.styles.style.adminCRMTableHeading]}
        >
          <Text>Groups</Text>
        </View>
        <View
          style={[
            this.styles.style.AdminPaymentsTableHeader,
            this.styles.style.adminCRMTableHeading,
          ]}
        >
          <Text>Payments</Text>
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
          const payments = await Data.paymentByUser(id)
          console.log(payments)

          this.setState({ paymentsData: payments.data?.paymentByUser?.items })
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
      const saveResult = await Data.deletePayment(group)
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
      const saveResult = await Data.createPayment({
        id: group + "-" + user,
        productID: group,
        userID: user,
        dateCompleted: Date.now().toString(),
        paymentType: "Admin/CRM",
        paymentInfo: "By: ",
      })
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

  async saveEdit(id: string, email: string): Promise<void> {
    try {
      const a1 = await this.adminUpdateUserAttributes(id, email)
      console.log({ adminUpdateUserAttributes: a1 })
      const a2 = await Data.updateUser({ id: id, email: email })
      console.log({ updateUser: a2 })
      const user = await this.adminGetUser(id)
      console.log({ adminGetUser: user })
      const a3 = await this.createStripeUser({
        idempotency: uuidv4(),
        userId: user.Username,
        firstName: user.UserAttributes.find((z: StringPair) => z.Name == "given_name").Value,
        lastName: user.UserAttributes.find((z: StringPair) => z.Name == "family_name").Value,
        email: user.UserAttributes.find((z: StringPair) => z.Name == "email").Value,
        phone: user.UserAttributes.find((z: StringPair) => z.Name == "phone_number").Value,
        orgName: user?.UserAttributes.find((z: StringPair) => z.Name == "custom:orgName").Value,
      })
      console.log({ createStripeUser: a3 })
    } catch (e) {
      console.log({ "Error Updating": e })
    }
    this.setState({ data: [] }, async () => {
      //this.getUsers(null)
    })
    this.closeEdit()
  }
  closeEdit(): void {
    this.setState({
      showEdit: false,
      showEditId: null,
      showEditEmail: "",
      showEditUserExists: false,
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
  async showEdit(id: string, email: string): Promise<void> {
    console.log({ id: id })
    let z
    try {
      z = await Data.getUser(id)
      console.log(z)
    } catch (e) {
      z = e as GraphQLResult<GetUserQuery>
      console.log(e)
    }
    this.setState({
      showEdit: true,
      showEditId: id,
      showEditEmail: email,
      showEditUserExists: z?.data?.getUser != null,
    })
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
        <View
          style={[
            this.styles.style.AdminFirstNameTableRow,
            this.styles.style.adminCRMTableParagraph,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              this.showProfile(item.Username)
            }}
          >
            <Text>
              {item.Attributes.find((e: any) => e.Name == "given_name")?.Value}{" "}
              {item.Attributes.find((e: any) => e.Name == "family_name")?.Value}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            this.styles.style.AdminFirstNameTableRow,
            this.styles.style.adminCRMTableParagraph,
          ]}
        >
          <ProfileImageNew
            linkToProfile
            user={item.Username}
            quality={ProfileImageQuality.medium}
            type="user"
            style={ProfileImageStyle.UserXSmall2}
          />
        </View>
        {this.state.showUid ? (
          <View
            style={[
              this.styles.style.AdminUserIdTableRow,
              this.styles.style.adminCRMTableParagraph,
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.showProfile(item.Username)
              }}
            >
              <Text selectable>{item.Username}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.state.showEmail ? (
          <View
            style={[this.styles.style.adminCRMTableRow, this.styles.style.adminCRMTableParagraph]}
          >
            <Text>{item.Attributes.find((e: any) => e.Name == "email")?.Value}</Text>
          </View>
        ) : null}
        {this.state.showPhone && !isMobile ? (
          <View
            style={[this.styles.style.AdminPhoneTableRow, this.styles.style.adminCRMTableParagraph]}
          >
            <Text>{item.Attributes.find((e: any) => e.Name == "phone_number")?.Value}</Text>
          </View>
        ) : null}
        {this.state.showStatus && !isMobile ? (
          <View
            style={[
              this.styles.style.AdminStatusTableRow,
              this.styles.style.adminCRMTableParagraph,
            ]}
          >
            <Text>{item.UserStatus}</Text>
          </View>
        ) : null}
        {!isMobile ? (
          <View
            style={[
              this.styles.style.AdminEnabledTableRow,
              this.styles.style.adminCRMTableParagraph,
            ]}
          >
            <Text>{item.Enabled.toString()}</Text>
          </View>
        ) : null}
        <View style={this.styles.style.AdminGroupBTTableRow}>
          {!isMobile ? (
            <JCButton
              buttonType={ButtonTypes.AdminSmallOutline}
              onPress={() => {
                this.showEdit(
                  item.Username,
                  item.Attributes.find((e: any) => e.Name == "email")?.Value
                )
              }}
            >
              Edit
            </JCButton>
          ) : (
            <Pressable
              onPress={() => {
                this.showEdit(
                  item.Username,
                  item.Attributes.find((e: any) => e.Name == "email")?.Value
                )
              }}
            >
              <Ionicons name="create-outline" style={this.styles.style.icon} />
            </Pressable>
          )}
        </View>
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
            <Pressable
              onPress={() => {
                this.showGroups(item.Username)
              }}
            >
              <Ionicons name="ios-people" style={this.styles.style.icon} />
            </Pressable>
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
            <Pressable
              onPress={() => {
                this.showPayments(item.Username)
              }}
            >
              <MaterialIcons name="payment" style={this.styles.style.icon} />
            </Pressable>
          )}
        </View>
      </View>
    )
  }
  async createUser(user: any): Promise<void> {
    let userExists = false

    if (user != null) {
      const { attributes } = user
      const handleUser = async (getUser: GetUserQueryResult) => {
        if (getUser?.data?.getUser === null) {
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
            const createUser = await Data.createUser(inputData)

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
          if (getUser?.data?.getUser?.organizations?.items?.length === 0) {
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
              const createOrg = await Data.createOrganization(orgInput)
              console.log({ createOrg: createOrg })
              orgId = createOrg?.data?.createOrganization?.id ?? ""
            } catch (e: any) {
              if (e?.data?.createOrganization) orgId = e.data.createOrganization.id
              console.error({ error: e })
            }

            const orgMember: CreateOrganizationMemberInput = {
              userRole: "superAdmin",
              userId: user["username"],
              organizationId: orgId,
            }

            try {
              const createOrgMember = await Data.createOrganizationMember(orgMember)
              console.log({ createOrgMember: createOrgMember })
            } catch (e) {
              console.log({ error: e })
            }
          } else if (
            getUser?.data?.getUser?.organizations?.items![0]?.organizationId &&
            getUser?.data.getUser.organizations.items.length === 1
          ) {
            console.log("Organization exists: setting organization id")
          } else {
            console.error("error finding or creating user's organization")
          }
        }
      }
      const z = Data.getUser(user["username"])
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
    await this.createStripeUser({
      idempotency: uuidv4(),
      userId: z.User.Username,
      firstName: z.User.attributes.given_name,
      lastName: z.User.attributes.family_name,
      email: z.User.attributes.email,
      phone: z.User.attributes.phone_number,
      orgName: z.User?.attributes["custom:orgName"],
    })
  }
  async createStripeUser(userData: CreateStripeCustomerAdminMutationVariables): Promise<boolean> {
    try {
      const customer = await Data.createStripeCustomerAdmin(userData)
      console.log({ customer: customer })
      return true
      //customerId = customer.data.createCustomer.customer.id;
    } catch (e) {
      console.log(e)
      return false
    }
  }
  renderEditModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showEdit}
        title="Edit"
        onHide={() => {
          this.closeEdit()
        }}
      >
        <EditableText
          isEditable={true}
          value={this.state.showEditEmail}
          placeholder="Email"
          onChange={(value) => {
            this.setState({ showEditEmail: value })
          }}
          textStyle={{}}
          multiline={false}
        />
        {this.state.showEditUserExists ? (
          <>User Profile exists</>
        ) : (
          <>User Profile Does not exist</>
        )}
        <JCButton
          buttonType={ButtonTypes.AdminAdd}
          onPress={async () => {
            if (this.state.showEditId && this.state.showEditEmail)
              await this.saveEdit(this.state.showEditId, this.state.showEditEmail)
          }}
        >
          Save Change
        </JCButton>
      </JCModal>
    )
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
                this.setState({ groupToAdd: val })
              }}
            >
              {" "}
              <Picker.Item value={undefined} label="pick a group to add" />
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
          </View>
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
                this.setState({ groupToAdd: val })
              }}
            >
              {" "}
              <Picker.Item value={undefined} label="pick a group to add" />
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
          </View>
        </>
      </JCModal>
    )
  }
  async updateInviteDataList(nextToken: any): Promise<void> {
    const listGroup = await Data.groupByTypeForMyGroups(this.state.inviteType, nextToken)
    console.log(listGroup)
    this.setState({ inviteDataList: listGroup?.data?.groupByType?.items })
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
            selectedValue={this.state.inviteType?.toString()}
            onValueChange={(val) => {
              this.setState({ inviteType: val, inviteData: undefined, inviteDataList: [] }, () => {
                this.updateInviteDataList(null)
              })
            }}
          >
            <Picker.Item value={undefined} label="pick a group to add" />
            <Picker.Item value={InviteType.JC.toString()} label="Invite to Jesus Collective" />
            <Picker.Item value={InviteType.course.toString()} label="Invite to Course" />
            <Picker.Item value={InviteType.group.toString()} label="Invite to Group" />
            <Picker.Item value={InviteType.event.toString()} label="Invite to Event" />
            <Picker.Item value={InviteType.resource.toString()} label="Invite to Resource" />
          </Picker>

          {this.state.inviteType != null && this.state.inviteType != InviteType.JC ? (
            <Picker
              selectedValue={this.state.inviteData}
              onValueChange={(val) => {
                this.setState({ inviteData: val })
              }}
            >
              <Picker.Item value={undefined} label="pick a group to add" />
              {this.state.inviteDataList?.map((item, index: number) => {
                return <Picker.Item key={index} value={item?.id} label={item?.name ?? ""} />
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
  componentDidMount() {
    this.props.navigation.setOptions({
      header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
        return <Header showAdmin={true} navigation={props.navigation} title={"Admin Page"} />
      },
    })
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
                      <View style={{ width: "100%" }}>
                        <SearchUser
                          setFilteredData={(newData) => this.setState({ data: newData })}
                        />
                        {this.renderHeader()}

                        {this.state.data
                          ? this.state.data?.map((item: any, index: number) => {
                              // This will render a row for each data element.
                              return this.renderRow(item, index)
                            })
                          : null}
                      </View>
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
              {this.renderGroupsModal()}
              {this.renderPaymentsModal()}
              {this.renderInviteModal()}
              {this.renderEditModal()}
            </View>
          )
        }}
      </AdminScreen.UserConsumer>
    )
  }
}
