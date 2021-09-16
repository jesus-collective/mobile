import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { createStackNavigator } from "@react-navigation/stack"
import Amplify, { Analytics, API, Auth, graphqlOperation } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import * as Linking from "expo-linking"
import moment from "moment"
import React from "react"
import { Platform, Text } from "react-native"
import {
  AuthStateData,
  GetUserQueryResult,
  GetUserQueryResultPromise,
  JCCognitoUser,
} from "src/types"
import { v4 as uuidv4 } from "uuid"
import JCComponent from "../../components/JCComponent/JCComponent"
import Sentry from "../../components/Sentry"
import Validate from "../../components/Validate/Validate"
import * as RootNavigation from "../../screens/HomeScreen//NavigationRoot"
import {
  CreateCustomerMutation,
  CreateOrganizationInput,
  CreateOrganizationMemberInput,
  CreateOrganizationMemberMutation,
  CreateOrganizationMutation,
  CreateUserInput,
  CreateUserMutation,
} from "../../src/API"
import awsconfig from "../../src/aws-exports"
import { constants } from "../../src/constants"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import MainAuthRouter from "./MainAuthRouter"
import MainDrawerRouter from "./MainDrawerRouter"
import { PaidStatus, ProfileStatus, UserContext, UserState } from "./UserContext"

Amplify.configure(awsconfig)

const MainStack = createStackNavigator()
//const PERSISTENCE_KEY = "NAVIGATION_STATE"
interface Props {
  authState?: string | undefined
  onStateChange(state: string, data: AuthStateData): Promise<void>
}

interface State extends UserState {
  initialUrl: string
}

export default class HomeScreenRouter extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      groups: null,
      hasCompletedPersonalProfile: ProfileStatus.Unknown,
      hasPaidState: PaidStatus.Unknown,
      userExists: false,
      user: null,
      authState: props.authState,
      hasCompletedOrganizationProfile: "Unknown",
      orgId: "",
      isOrg: false,
      groupsLoaded: false,
      initialAuthType: null,
      idempotency: uuidv4(),
      initialUrl: "",
    }
  }
  onSetUser = (user: any): void => {
    this.setState({ user: user })
  }
  async componentDidMount(): Promise<void> {
    try {
      await this.updateGroups()
    } catch (e) {
      console.log(e)
    }
    await this.getAuthInitialState()
    await this.performStartup()
  }
  isReady = (): boolean => {
    if (this.state.groups) return true
    else {
      this.updateGroups()
      return false
    }
  }
  isMemberOf = (group: string): boolean => {
    if (this.state.groups) return this.state.groups.includes(group)
    else return false
  }
  updateGroups = async (): Promise<void> => {
    try {
      const currentUser = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      const userSession = currentUser.getSignInUserSession()
      const refreshToken = userSession?.getRefreshToken()
      if (refreshToken)
        currentUser.refreshSession(refreshToken, (err: any, session: any) => {
          console.log("UPDATED GROUPS!")
          currentUser.setSignInUserSession(session)
        })
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      this.setState({
        groups: user.getSignInUserSession()?.getAccessToken().payload["cognito:groups"],
        groupsLoaded: true,
      })
      console.log({
        "DONE ": user.getSignInUserSession()?.getAccessToken().payload["cognito:groups"],
      })
    } catch (e) {
      console.log(e)
    }
  }
  async performStartup(): Promise<void> {
    this.trackUserId()
    if (this.state.authState == "signedIn") {
      await this.recheckUserState()
    } else if (this.state.authState == "signIn") {
      await this.props.onStateChange("signIn", null)
    }
  }
  private user: JCCognitoUser | undefined | null

  async ensureUserExists(performChecks: () => Promise<void>): Promise<void> {
    let userExists = false
    this.user = await Auth.currentAuthenticatedUser().catch(() => {
      console.log("No current authenticated user")
    })
    if (this.user != null) {
      const { attributes } = this.user
      const handleUser = async (getUser: GetUserQueryResult) => {
        console.log(getUser)
        if (getUser.data == null || getUser.data == undefined) {
          Sentry.captureEvent(getUser)
          console.log({ Errors: getUser.errors })
        }
        if (getUser.data.getUser == null) {
          console.log("Trying to create")
          const inputData: CreateUserInput = {
            id: this.user?.username,
            given_name: attributes?.given_name ?? "",
            family_name: attributes?.family_name ?? "",
            email: attributes?.email,
            phone: attributes?.phone_number,
            profileState: "Incomplete",
            orgName: attributes?.["custom:orgName"],
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
            const createUser = (await API.graphql({
              query: mutations.createUser,
              variables: {
                input: inputData,
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })) as GraphQLResult<CreateUserMutation>

            userExists = true
            console.log({ createUser: createUser })
          } catch (e) {
            console.log({ error: e })
          }
        } else {
          userExists = true
          console.log("User exists")
        }

        if (attributes!["custom:isOrg"] === "true" && getUser) {
          this.setState({ isOrg: true })
          if (getUser?.data?.getUser?.organizations?.items?.length === 0) {
            console.log("creating Organization")
            const id = `organization-${Date.now()}`
            const orgInput: CreateOrganizationInput = {
              id: id,
              orgName: attributes!["custom:orgName"] ?? "",
              adminEmail: attributes!["email"],
              phone: attributes!["phone_number"],
              profileState: "Incomplete",
              admins: [this.user!["username"]],
              superAdmin: this.user!["username"],
              parentOrganizationId: id,
              joined: moment().format(),
            }

            let orgId = ""

            try {
              const createOrg = (await API.graphql({
                query: mutations.createOrganization,
                variables: {
                  input: orgInput,
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              })) as GraphQLResult<CreateOrganizationMutation>
              console.log({ createOrg: createOrg })
              orgId = createOrg.data.createOrganization.id
            } catch (e: any) {
              if (e?.data?.createOrganization) orgId = e.data.createOrganization.id
              console.error({ error: e })
            }

            this.setState({ orgId })

            const orgMember: CreateOrganizationMemberInput = {
              userRole: "superAdmin",
              userId: this.user!["username"],
              organizationId: orgId,
            }

            try {
              const createOrgMember = (await API.graphql({
                query: mutations.createOrganizationMember,
                variables: {
                  input: orgMember,
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              })) as GraphQLResult<CreateOrganizationMemberMutation>
              console.log({ createOrgMember: createOrgMember })
            } catch (e: any) {
              console.log({ error: e })
            }
          } else if (
            getUser?.data?.getUser?.organizations?.items[0]?.organizationId &&
            getUser?.data.getUser.organizations.items.length === 1
          ) {
            console.log("Organization exists: setting organization id")
            this.setState({
              orgId: getUser.data.getUser.organizations.items[0].organizationId,
            })
          } else {
            console.error("error finding or creating user's organization")
          }
        }
      }
      const z: GetUserQueryResultPromise = API.graphql(
        graphqlOperation(queries.getUser, { id: this.user["username"] })
      ) as GetUserQueryResultPromise
      await z.then(handleUser).catch(handleUser)

      console.log({ userExists: userExists })
      this.setState({ userExists: userExists }, performChecks)
    }
  }

  async createStripeUser(billingAddress: any): Promise<boolean> {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      console.log(user)
      const customer = (await API.graphql({
        query: mutations.createCustomer,
        variables: {
          idempotency: this.state.idempotency,
          firstName: user?.attributes?.given_name,
          lastName: user?.attributes?.family_name,
          email: user?.attributes?.email,
          phone: user?.attributes?.phone_number,
          billingAddress: billingAddress,
          orgName: user?.attributes!["custom:orgName"],
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateCustomerMutation>
      console.log({ customer: customer })
      return true
      //customerId = customer.data.createCustomer.customer.id;
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async checkIfPaid(): Promise<PaidStatus> {
    console.log("checkIfPaid")
    if (this.state.userExists) {
      const handleGetUser = async (getUser: GetUserQueryResult) => {
        const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
        if (
          user
            .getSignInUserSession()
            ?.getAccessToken()
            .payload["cognito:groups"].includes("admin") ||
          user
            .getSignInUserSession()
            ?.getAccessToken()
            .payload["cognito:groups"].includes("subscriptionValid") ||
          user
            .getSignInUserSession()
            ?.getAccessToken()
            .payload["cognito:groups"].includes("legacyUserGroup1")
        )
          return PaidStatus.Success
        else {
          if (getUser.data.getUser.stripeCustomerID == null)
            if (await this.createStripeUser(getUser.data.getUser.billingAddress)) {
              if (getUser.data.getUser.stripeSubscriptionID == null) {
                console.log("No Stripe Subscription, No Stripe Customer")
                return PaidStatus.InProgress
              } else {
                return PaidStatus.MissingCustomer
              }
            } else if (getUser.data.getUser.stripeSubscriptionID == null) {
              console.log("No Stripe Subscription")
              return PaidStatus.InProgress
            } else {
              return PaidStatus.Problem2
            }
          else {
            if (getUser.data.getUser.stripeSubscriptionID == null) {
              console.log("No Stripe Subscription")
              return PaidStatus.InProgress
            } else {
              return PaidStatus.PermissionNotGranted
            }
          }
        }
      }
      const getUser: GetUserQueryResultPromise = API.graphql(
        graphqlOperation(queries.getUser, { id: this.user!["username"] })
      ) as GetUserQueryResultPromise
      return await getUser.then(handleGetUser).catch(handleGetUser)
    } else {
      return PaidStatus.Unknown
    }
    //  console.log(attributes['username'])
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    // Any time props.email changes, update state.
    if (nextProps.authState !== this.props.authState) {
      this.setState(
        {
          authState: nextProps.authState,
        },
        () => {
          this.performStartup()
        }
      )
    }
  }

  recheckUserState = async (): Promise<void> => {
    console.debug("recheckUserState")
    await this.ensureUserExists(async (): Promise<void> => {
      const paidStatus = await this.checkIfPaid()
      const profileStatus = await this.checkIfCompletedProfile()
      this.setState(
        { hasPaidState: paidStatus, hasCompletedPersonalProfile: profileStatus },
        async () => {
          await this.performNavigation()
        }
      )
    })
  }
  async performNavigation(): Promise<void> {
    console.log("NAVIGATING")
    switch (this.state.hasPaidState) {
      case PaidStatus.Success:
        switch (this.state.hasCompletedPersonalProfile) {
          case ProfileStatus.Completed:
            const initialUrl = await Linking.getInitialURL()
            console.log(initialUrl)
            if (Platform.OS == "web" && initialUrl?.includes("auth/payment3")) {
              if (
                this.isMemberOf("friends") ||
                this.isMemberOf("partners") ||
                this.isMemberOf("admin") ||
                this.isMemberOf("legacyUserGroup1") ||
                this.isMemberOf("subscriptionPartners") ||
                this.isMemberOf("courseAdmin") ||
                this.isMemberOf("courseUser") ||
                this.isMemberOf("courseCoach")
              ) {
                RootNavigation.navigate("mainApp", {})
                break
              } else if (
                !this.state.initialUrl.includes("app/resource") &&
                (this.isMemberOf("subscriptionkyearlyyears") ||
                  this.isMemberOf("subscriptionkykids") ||
                  this.isMemberOf("subscriptionkyyouth"))
              ) {
                RootNavigation.navigate("mainApp", {
                  screen: "mainDrawer",
                  params: {
                    screen: "ResourceScreen",
                    params: { create: false, id: constants["SETTING_KY_GROUP_ID"] },
                  },
                })
                break
              }
            }
            RootNavigation.navigate("mainApp", {})
            break
          case ProfileStatus.Incomplete:
            RootNavigation.navigate("auth", {
              screen: "Payment3",
            })
            break
        }
        break
      case PaidStatus.InProgress:
        RootNavigation.navigate("auth", {
          screen: "Payment1",
        })
        break
    }
    console.log("DONE PERFORM NAVIGATION")
  }
  async checkIfCompletedProfile(): Promise<ProfileStatus> {
    console.debug("checkIfCompletedProfile")
    console.debug({
      user: this.state.userExists,
      hasPaidState: this.state.hasPaidState,
    })
    if (this.state.userExists) {
      const handleUser = (getUser: GetUserQueryResult) => {
        const response = Validate.Profile(getUser.data.getUser)
        console.log({ Validate: response })
        console.debug({ checkIfCompletedProfileResult: response.result })
        if (response.result) return ProfileStatus.Completed
        else if (!response.result) return ProfileStatus.Incomplete
        else return ProfileStatus.Unknown
      }
      const getUser: GetUserQueryResultPromise = API.graphql(
        graphqlOperation(queries.getUser, { id: this.user!["username"] })
      ) as GetUserQueryResultPromise
      return await getUser.then(handleUser).catch(handleUser)
    }
    return ProfileStatus.Unknown
  }
  updateHasCompletedPersonalProfile = (): void => {
    this.checkIfCompletedProfile()
  }
  renderFallback(): React.ReactNode {
    return <Text>loading...</Text>
  }
  trackUserId = async (): Promise<void> => {
    console.log("Setting up Analytics")
    try {
      const { attributes } = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      const userAttributes = mapToArrayOfStrings(attributes)
      console.log({
        Email: attributes?.email,
        Sub: attributes?.sub,
        userAttributes: userAttributes,
      })
      Analytics.updateEndpoint({
        address: attributes?.email,
        channelType: "EMAIL",
        optOut: "NONE",
        userId: attributes?.sub,
        userAttributes,
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getAuthInitialState(): Promise<void> {
    const initialUrl = await Linking.getInitialURL()
    const initialParams = Linking.parse(initialUrl ?? "").queryParams

    this.setState({ initialUrl: initialUrl ?? "" })
    console.log({ "INITIAL URL": initialUrl })
    console.log({ initialParams: initialParams })
    if (initialUrl?.toLowerCase().includes("/auth/signup"))
      this.setState({
        initialAuthType: "signup",
        initialParams,
      })
    else {
      this.setState({ initialAuthType: "signin", initialParams })
    }
  }

  static UserProvider = UserContext.Provider
  render(): React.ReactNode {
    console.log({
      UserState: [
        "User has signed in",
        { "Home Screen Router AuthState": this.props.authState },
        { "Paid state": this.state.hasPaidState },
        { "Profile state": this.state.hasCompletedPersonalProfile },
      ],
    })

    if (this.state.initialAuthType)
      return (
        <HomeScreenRouter.UserProvider
          value={{
            userState: {
              ...this.state,
            },
            userActions: {
              onSetUser: this.onSetUser,
              updateHasCompletedPersonalProfile: this.recheckUserState,
              updateHasCompletedOrganizationProfile: this.recheckUserState,
              recheckUserState: this.recheckUserState,
              onStateChange: async (state, data) => {
                await this.props.onStateChange(state, data)
              },
              updateGroups: this.updateGroups,
              isReady: this.isReady,
              isMemberOf: this.isMemberOf,
            },
          }}
        >
          <MainStack.Navigator
            initialRouteName="auth"
            headerMode="none"
            mode="card"
            screenOptions={{
              animationEnabled: false,
              gestureEnabled: false,
              cardOverlayEnabled: false,
            }}
          >
            <MainStack.Screen
              name="auth"
              component={MainAuthRouter}
              initialParams={{
                screen: this.state.initialAuthType,
                params: this.state.initialParams,
              }}
              options={{ title: "Jesus Collective" }}
            />
            <MainStack.Screen
              name="mainApp"
              component={MainDrawerRouter}
              initialParams={{
                screen: this.state.initialAuthType,
                params: this.state.initialParams,
              }}
              options={{ title: "Jesus Collective" }}
            />
          </MainStack.Navigator>
        </HomeScreenRouter.UserProvider>
      )
    else return null
  }
}
const mapObj = (f: any) => (obj: any) =>
  Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: f(obj[key]) }), {})
const toArrayOfStrings = (value: any) => [`${value}`]
const mapToArrayOfStrings = mapObj(toArrayOfStrings)
