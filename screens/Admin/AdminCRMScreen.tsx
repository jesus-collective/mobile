import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { StackNavigationProp } from "@react-navigation/stack"
import { API, Auth } from "aws-amplify"
import moment from "moment"
import React, { useContext, useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { v4 as uuidv4 } from "uuid"
import { AdminStyles } from "../../components/AdminStyles"
import { Data } from "../../components/Data/Data"
import EditableText from "../../components/Forms/EditableText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import Header from "../../components/Header/Header"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../../components/ProfileImage/ProfileImageNew"
import {
  CreateOrganizationInput,
  CreateOrganizationMemberInput,
  CreateStripeCustomerAdminMutationVariables,
  CreateUserInput,
  GetUserQuery,
  GroupByTypeQuery,
  ListProductsQuery,
  ModelSortDirection,
  PaymentByUserQuery,
  UserGroupType,
} from "../../src/API"
import { GetUserQueryResult, InviteType } from "../../src/types"
import { UserContext } from "../HomeScreen/UserContext"

interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
type StringPair = { Name: string; Value: string }
type Products = NonNullable<ListProductsQuery["listProducts"]>["items"]
type Payments = NonNullable<PaymentByUserQuery["paymentByUser"]>["items"]

export function useDebounce(value: string, delay: number) {
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

const toggleUserEnabled = async (username: string, currentEnabledStatus: boolean) => {
  try {
    let path = ""
    if (currentEnabledStatus) path = "/disableUser"
    else path = "/enableUser"
    const apiName = "AdminQueries"

    const myInit = {
      body: {
        username: username,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    }
    console.log(path, myInit)
    const z = await API.post(apiName, path, myInit)
    console.log({ z })
    return true
  } catch (error) {
    console.error({ "failed to disable user": error })
    alert(`An error occurred ${error}`)
    return false
  }
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
  const debouncedSearchTerm = useDebounce(search, 1000)

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
    if (debouncedSearchTerm) {
      doSearch(debouncedSearchTerm)
    } else {
      setIsLoading(false)
    }
  }, [debouncedSearchTerm])
  const placeHolder = `Search by ${attribute.label}`
  return (
    <View style={{ flexDirection: "row", height: 30 }}>
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
export default function AdminScreen(props: Props) {
  const [showPaymentsId, setShowPaymentsId] = useState<string | null>(null)
  const [invite, setInvite] = useState<string>()
  const [groupData, setGroupData] = useState<[]>()
  const [paymentsData, setPaymentsData] = useState<Payments>()
  const [showPayments, setShowPayments] = useState<boolean>()
  const [productList, setProductList] = useState<Products>()
  const [data, setData] = useState<any>([])
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showEditId, setShowEditId] = useState<string | null>(null)
  const [showEditUserExists, setShowEditUserExists] = useState<boolean>(false)
  const [showGroups, setShowGroups] = useState<boolean>(false)
  const [showGroupsId, setShowGroupsId] = useState<string | null>(null)
  const [showUid, setShowUid] = useState<boolean>(false)
  const [showEmail, setShowEmail] = useState<boolean>(true)
  const [showPhone, setShowPhone] = useState<boolean>(true)
  const [showEditEmail, setShowEditEmail] = useState<string>("")
  const [showStatus, setShowStatus] = useState<boolean>(true)
  const [groupToAdd, setGroupToAdd] = useState<string | undefined>(undefined)
  const [showInvite, setShowInvite] = useState<boolean>(false)
  const [inviteType, setInviteType] = useState<InviteType | undefined>(InviteType.JC)
  const [inviteData, setInviteData] = useState<string | undefined>(undefined)
  const [inviteDataList, setInviteDataList] = useState<
    NonNullable<NonNullable<GraphQLResult<GroupByTypeQuery>["data"]>["groupByType"]>["items"]
  >([])
  const [groupList, setGroupList] = useState<string[]>(
    Object.keys(UserGroupType).map((org: string) => {
      return org
    })
  )
  useEffect(() => {
    setInitialData()
  })

  const styles = StyleSheet.create(AdminStyles)
  const setInitialData = async (): Promise<void> => {
    const listProducts = await Data.listProducts(null)
    console.log(listProducts)
    if (listProducts.data?.listProducts) setProductList(listProducts.data.listProducts.items)
  }

  const removeUserFromGroup = async (user: string, groupName: string): Promise<any> => {
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
  const addUserToGroup = async (user: string, groupName: string): Promise<any> => {
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
  const adminGetUser = async (user: string) => {
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
  const adminUpdateUserAttributes = async (user: string, email: string): Promise<any> => {
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

  const listGroupsForUser = async (
    user: string,
    limit: number,
    nextToken: string | null
  ): Promise<any> => {
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

  const adminCreateUser = async (email: string): Promise<any> => {
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
  const renderHeader = (): React.ReactNode => {
    return (
      <View style={styles.adminCRMTableContainer}>
        <View style={[styles.AdminFirstNameTableHeader, styles.adminCRMTableHeading]}>
          <Text style={AdminStyles.textTableHeader}>Name</Text>
        </View>

        <View style={[styles.AdminUserIdTableHeader, styles.adminCRMTableHeading]}>
          <Text style={AdminStyles.textTableHeader}>User id</Text>
        </View>

        <View style={[styles.AdminPhoneTableHeader, styles.adminCRMTableHeading]}>
          <Text style={AdminStyles.textTableHeader}>Phone</Text>
        </View>

        <View style={[styles.AdminStatusTableHeader, styles.adminCRMTableHeading]}>
          <Text style={AdminStyles.textTableHeader}>Status</Text>
        </View>

        <View style={[styles.AdminEnabledTableHeader, styles.adminCRMTableHeading]}>
          <Text style={AdminStyles.textTableHeader}>Enabled</Text>
        </View>

        <View style={[styles.AdminGroupsTableHeader, styles.adminCRMTableHeading]}>
          <Text style={AdminStyles.textTableHeader}>Edit</Text>
        </View>
        <View style={[styles.AdminGroupsTableHeader, styles.adminCRMTableHeading]}>
          <Text style={AdminStyles.textTableHeader}>Groups</Text>
        </View>
        <View style={[styles.AdminPaymentsTableHeader, styles.adminCRMTableHeading]}>
          <Text style={AdminStyles.textTableHeader}>Payments</Text>
        </View>
      </View>
    )
  }

  const showPaymentsModal = async (id: string): Promise<void> => {
    setShowPayments(true)
    setShowPaymentsId(id)

    try {
      const payments = await Data.paymentByUser(id)
      console.log(payments)

      setPaymentsData(payments.data?.paymentByUser?.items)
    } catch (e: any) {
      console.log(e)
      setPaymentsData(e.data.paymentByUser.items)
    }
  }
  const closePayments = (): void => {
    setShowPayments(false)
    setShowPaymentsId(null)
  }
  const removePayment = async (user: string, group: string): Promise<void> => {
    console.log(user)
    console.log(group)

    try {
      const saveResult = await Data.deletePayment(group)
      console.log(saveResult)
    } catch (e) {
      console.error(e)
    }
    setPaymentsData([])
    setShowPaymentsId(null)
    setShowPayments(false)
  }
  const addPayment = async (user: string, group: string): Promise<void> => {
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
    setPaymentsData([])
    setShowPaymentsId(null)
    setShowPayments(false)

    //await this.//addUserToGroup(user, group)
    //this.showPayments(showPaymentsId)
  }
  const closeInvite = (): void => {
    setShowInvite(false)
  }
  const showInviteModal = (): void => {
    setShowInvite(true)
  }

  const saveEdit = async (id: string, email: string): Promise<void> => {
    try {
      const a1 = await adminUpdateUserAttributes(id, email)
      console.log({ adminUpdateUserAttributes: a1 })
      const a2 = await Data.updateUser({ id: id, email: email })
      console.log({ updateUser: a2 })
      const user = await adminGetUser(id)
      console.log({ adminGetUser: user })
      const a3 = await createStripeUser({
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
    setData([])
    closeEdit()
  }
  const closeEdit = (): void => {
    setShowEdit(false)
    setShowEditId(null)
    setShowEditEmail("")
    setShowEditUserExists(false)
  }
  const closeGroups = (): void => {
    setShowGroups(false)
    setShowGroupsId(null)
  }
  const removeGroup = async (user: string, group: string): Promise<void> => {
    await removeUserFromGroup(user, group)
    if (showGroupsId) showGroup(showGroupsId)
  }
  const addGroup = async (user: string, group: string): Promise<void> => {
    await addUserToGroup(user, group)
    if (showGroupsId) showGroup(showGroupsId)
  }
  const showEditModal = async (id: string, email: string): Promise<void> => {
    console.log({ id: id })
    let z
    try {
      z = await Data.getUser(id)
      console.log(z)
    } catch (e) {
      z = e as GraphQLResult<GetUserQuery>
      console.log(e)
    }
    setShowEdit(true)
    setShowEditId(id)
    setShowEditEmail(email)
    setShowEditUserExists(z?.data?.getUser != null)
  }
  const showGroup = async (id: string): Promise<void> => {
    setShowGroups(true)
    setShowGroupsId(id)
    const groups = await listGroupsForUser(id, 20, null)
    console.log(groups)
    setGroupData(groups.Groups)
  }
  const showProfile = (id: string): void => {
    props.navigation.push("ProfileScreen", { id: id, create: false })
  }
  const handleToggleEnabled = async (item: any, index: number): Promise<boolean> => {
    console.log({ item })
    try {
      const successCognito = await toggleUserEnabled(item.Username, item.Enabled)
      if (!successCognito) return false
      let successAppsync = false
      try {
        const updateUser = await Data.updateUserNoData({
          id: item.Username,
          isArchived: Boolean(item.Enabled).toString(),
        })
        console.log({ updateUser })
        successAppsync = true
        const tempData = [...data]
        tempData[index].Enabled = !tempData[index].Enabled
        setData(tempData)
      } catch (error: any) {
        // undo cognito
        await toggleUserEnabled(item.Username, !item.Enabled)

        console.error({ "failed to toggle user enabled": error })
        alert("There was a problem toggling user enabled status")
        return false
      }
      return successAppsync
    } catch (error) {
      console.error({ "failed to toggle user enabled": error })
      alert("There was a problem toggling user enabled status")
      return false
    }
  }
  const renderRow = (item: any, index: number): React.ReactNode => {
    return (
      <View key={index} style={styles.AdminTableRowContainer}>
        <View style={[styles.AdminFirstNameTableRow, styles.adminCRMTableParagraph]}>
          <TouchableOpacity
            onPress={() => {
              showProfile(item.Username)
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <ProfileImageNew
                linkToProfile
                user={item.Username}
                quality={ProfileImageQuality.medium}
                type="user"
                style={ProfileImageStyle.UserXSmall2}
              />
              <View style={{ flexDirection: "column" }}>
                <Text>
                  {item.Attributes.find((e: any) => e.Name == "given_name")?.Value}{" "}
                  {item.Attributes.find((e: any) => e.Name == "family_name")?.Value}
                </Text>
                <Text>{item.Attributes.find((e: any) => e.Name == "email")?.Value}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.AdminUserIdTableRow, styles.adminCRMTableParagraph]}>
          <TouchableOpacity
            onPress={() => {
              showProfile(item.Username)
            }}
          >
            <Text selectable>{item.Username}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.AdminPhoneTableRow, styles.adminCRMTableParagraph]}>
          <Text>{item.Attributes.find((e: any) => e.Name == "phone_number")?.Value}</Text>
        </View>
        <View style={[styles.AdminStatusTableRow, styles.adminCRMTableParagraph]}>
          <Text>{item.UserStatus}</Text>
        </View>
        <View style={[styles.AdminEnabledTableRow, styles.adminCRMTableParagraph]}>
          <JCSwitch
            containerWidth={1}
            switchLabel=""
            disabled={item.UserStatus !== "CONFIRMED"}
            initState={item.Enabled}
            asyncOnPress={async () => await handleToggleEnabled(item, index)}
            onPress={() => null}
          />
        </View>
        <View style={styles.AdminGroupBTTableRow}>
          {!isMobile ? (
            <JCButton
              buttonType={ButtonTypes.AdminSmallOutline}
              onPress={() => {
                showEditModal(
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
                showEditModal(
                  item.Username,
                  item.Attributes.find((e: any) => e.Name == "email")?.Value
                )
              }}
            >
              <Ionicons name="create-outline" style={styles.icon} />
            </Pressable>
          )}
        </View>
        <View style={styles.AdminGroupBTTableRow}>
          {!isMobile ? (
            <JCButton
              buttonType={ButtonTypes.AdminSmallOutline}
              onPress={() => {
                showGroup(item.Username)
              }}
            >
              Groups
            </JCButton>
          ) : (
            <Pressable
              onPress={() => {
                showGroup(item.Username)
              }}
            >
              <Ionicons name="ios-people" style={styles.icon} />
            </Pressable>
          )}
        </View>
        <View style={styles.AdminPaymentBTTableRow}>
          {!isMobile ? (
            <JCButton
              buttonType={ButtonTypes.AdminSmallOutline}
              onPress={() => {
                showPaymentsModal(item.Username)
              }}
            >
              Payments
            </JCButton>
          ) : (
            <Pressable
              onPress={() => {
                showPaymentsModal(item.Username)
              }}
            >
              <MaterialIcons name="payment" style={styles.icon} />
            </Pressable>
          )}
        </View>
      </View>
    )
  }
  const createUser = async (user: any): Promise<void> => {
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
  const sendInvite = async (email: string, inviteType: InviteType): Promise<void> => {
    console.log({ "inviting:": email })
    const z = await adminCreateUser(email.toLowerCase())
    await addUserToGroup(z.User.Username, "verifiedUsers")
    if (inviteType == InviteType.course) {
      await addUserToGroup(z.User.Username, "courseUser")
    }
    await createUser(z.User)
    await createStripeUser({
      idempotency: uuidv4(),
      userId: z.User.Username,
      firstName: z.User.attributes.given_name,
      lastName: z.User.attributes.family_name,
      email: z.User.attributes.email,
      phone: z.User.attributes.phone_number,
      orgName: z.User?.attributes["custom:orgName"],
    })
  }
  const createStripeUser = async (
    userData: CreateStripeCustomerAdminMutationVariables
  ): Promise<boolean> => {
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
  const renderEditModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showEdit}
        title="Edit"
        onHide={() => {
          closeEdit()
        }}
      >
        <EditableText
          isEditable={true}
          value={showEditEmail}
          placeholder="Email"
          onChange={(value) => {
            setShowEditEmail(value)
          }}
          textStyle={{}}
          multiline={false}
        />
        {showEditUserExists ? <>User Profile exists</> : <>User Profile Does not exist</>}
        <JCButton
          buttonType={ButtonTypes.AdminAdd}
          onPress={async () => {
            if (showEditId && showEditEmail) await saveEdit(showEditId, showEditEmail)
          }}
        >
          Save Change
        </JCButton>
      </JCModal>
    )
  }
  const renderGroupsModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showGroups}
        title="Groups"
        onHide={() => {
          closeGroups()
        }}
      >
        <>
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
                      {item.GroupName}
                    </Text>
                    <JCButton
                      buttonType={ButtonTypes.AdminModalOrange}
                      onPress={() => {
                        if (window.confirm("Are you sure you wish to delete this group?"))
                          if (showGroupsId) removeGroup(showGroupsId, item.GroupName)
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
                setGroupToAdd(val)
              }}
            >
              {" "}
              <Picker.Item value={undefined} label="pick a group to add" />
              {groupList.map((item, index: number) => {
                return <Picker.Item key={index} value={item} label={item} />
              })}
            </Picker>
            <JCButton
              buttonType={ButtonTypes.AdminAdd}
              onPress={() => {
                if (showGroupsId && groupToAdd) addGroup(showGroupsId, groupToAdd)
              }}
            >
              Add Group
            </JCButton>
          </View>
        </>
      </JCModal>
    )
  }
  const renderPaymentsModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showPayments ?? false}
        title="Payments"
        onHide={() => {
          closePayments()
        }}
      >
        <>
          {paymentsData
            ? paymentsData.map((item: any, index: number) => {
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
                      {item.product?.name}
                    </Text>
                    <JCButton
                      buttonType={ButtonTypes.AdminModalOrange}
                      onPress={() => {
                        if (window.confirm("Are you sure you wish to delete this payment?"))
                          if (showPaymentsId) removePayment(showPaymentsId, item.id)
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
                setGroupToAdd(val)
              }}
            >
              {" "}
              <Picker.Item value={undefined} label="pick a group to add" />
              {productList?.map((item: any, index: number) => {
                console.log(item)
                return <Picker.Item key={index} value={item.id} label={item.name} />
              })}
            </Picker>
            <JCButton
              buttonType={ButtonTypes.AdminAdd}
              onPress={() => {
                if (showPaymentsId && groupToAdd) addPayment(showPaymentsId, groupToAdd)
              }}
            >
              Add Payment
            </JCButton>
          </View>
        </>
      </JCModal>
    )
  }
  const updateInviteDataList = async (nextToken: any): Promise<void> => {
    const listGroup = await Data.groupByTypeForMyGroups(
      inviteType,
      ModelSortDirection.ASC,
      nextToken
    )
    console.log(listGroup)
    setInviteDataList(listGroup?.data?.groupByType?.items)
  }
  const renderInviteModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showInvite}
        title="Invite"
        onHide={() => {
          closeInvite()
        }}
      >
        <>
          <Text style={styles.adminCRMModalInvite}>Invite: </Text>
          <TextInput
            onChange={(val: any) => {
              setInvite(val.target.value)
            }}
            placeholder="Enter Email Address"
            multiline={false}
            value={invite}
            style={styles.adminCRMModalInviteEmail}
          ></TextInput>
          <Picker
            style={{
              height: 45,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 10,
            }}
            selectedValue={inviteType?.toString()}
            onValueChange={(val) => {
              this.setState({ inviteType: val, inviteData: undefined, inviteDataList: [] }, () => {
                updateInviteDataList(null)
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

          {inviteType != null && inviteType != InviteType.JC ? (
            <Picker
              selectedValue={inviteData}
              onValueChange={(val) => {
                setInviteData(val)
              }}
            >
              <Picker.Item value={undefined} label="pick a group to add" />
              {inviteDataList?.map((item, index: number) => {
                return <Picker.Item key={index} value={item?.id} label={item?.name ?? ""} />
              })}
            </Picker>
          ) : null}

          <JCButton
            buttonType={ButtonTypes.Outline}
            enabled={inviteType != null}
            onPress={() => {
              if (invite && inviteType != null) {
                sendInvite(invite, inviteType)
                closeInvite()
                setInitialData()
              }
            }}
          >
            Send Invite
          </JCButton>
        </>
      </JCModal>
    )
  }
  const UserConsumer = useContext(UserContext)
  useEffect(() => {
    props.navigation.setOptions({
      header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
        return <Header showAdmin={true} navigation={props.navigation} title={"Admin Page"} />
      },
    })
  }, [])

  if (!UserConsumer.userState) return null
  console.log("AdminScreen")
  return (
    <View testID="events" style={{ margin: 96 }}>
      {UserConsumer.userActions.isMemberOf("admin") ? (
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <Text style={[AdminStyles.textHeader, { flexGrow: 2 }]}>People</Text>
            <SearchUser setFilteredData={(newData) => setData(newData)} />
            <JCButton
              buttonType={ButtonTypes.AdminSmallOutline}
              onPress={() => {
                showInviteModal()
              }}
            >
              Invite
            </JCButton>
          </View>
          <View style={styles.fontRegular}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <View style={{ width: "100%" }}>
                {renderHeader()}

                {data
                  ? data?.map((item: any, index: number) => {
                      // This will render a row for each data element.
                      return renderRow(item, index)
                    })
                  : null}
              </View>
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
      {renderGroupsModal()}
      {renderPaymentsModal()}
      {renderInviteModal()}
      {renderEditModal()}
    </View>
  )
}
