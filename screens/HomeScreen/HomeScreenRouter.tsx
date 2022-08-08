import { GraphQLResult } from "@aws-amplify/api-graphql"
import { createStackNavigator } from "@react-navigation/stack"
import Amplify, { Analytics, Auth } from "aws-amplify"
import * as Linking from "expo-linking"
import moment from "moment"
import React from "react"
import { isMobile } from "react-device-detect"
import { Platform, Text } from "react-native"
import { AuthStateData, GetUserQueryResult, JCCognitoUser } from "src/types"
import { v4 as uuidv4 } from "uuid"
import { Data } from "../../components/Data/Data"
import JCComponent from "../../components/JCComponent/JCComponent"
import ProfileConfig from "../../components/MyProfile/profileConfigs.json"
import Sentry from "../../components/Sentry"
import Validate from "../../components/Validate/Validate"
import * as RootNavigation from "../../screens/HomeScreen//NavigationRoot"
import {
  CreateOrganizationInput,
  CreateOrganizationMemberInput,
  CreateUserInput,
  ListCustomProfilesQuery,
  UserGroupType,
} from "../../src/API"
import awsconfig from "../../src/aws-exports"
import MainAuthRouter from "./MainAuthRouter"
import MainBottomTabsRouter from "./MainBottomTabsRouter"
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
  customProfiles: NonNullable<
    NonNullable<GraphQLResult<ListCustomProfilesQuery>["data"]>["listCustomProfiles"]
  >["items"]
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
      customProfiles: [],
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
  getProfileConfig = async (): Promise<any> => {
    const profileList = this.state.customProfiles.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
    console.log({ profileList: profileList })
    const groups = (this.state.groups ?? []) as UserGroupType[]
    console.log({ groups: groups })
    const profile = profileList?.filter(
      (z) => groups.filter((a) => z?.readGroups?.includes(a)).length > 0
    )[0]
    const list = ProfileConfig.filter((x) => x.name == (profile?.type ?? "partner"))
    if (list.length > 0) return list[0]
    else return ProfileConfig.filter((x) => x.name == "partner")[0]
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
    await this.updateProfile()
  }
  async updateProfile(): Promise<void> {
    try {
      const profiles = await Data.listCustomProfiles({})
      this.setState({ customProfiles: profiles.data?.listCustomProfiles?.items ?? [] })
    } catch (e) {
      console.log({ error: e })
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
        if (getUser.data?.getUser == null) {
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
              const createOrg = await Data.createOrganization(orgInput)
              console.log({ createOrg: createOrg })
              orgId = createOrg.data?.createOrganization?.id
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
              const createOrgMember = await Data.createOrganizationMember(orgMember)
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
      const z = Data.getUser(this.user["username"])
      await z.then(handleUser).catch(handleUser)

      console.log({ userExists: userExists })
      this.setState({ userExists: userExists }, performChecks)
    }
  }

  async createStripeUser(billingAddress: any): Promise<boolean> {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      console.log(user)
      const customer = await Data.createStripeCustomer({
        idempotency: this.state.idempotency,
        firstName: user?.attributes?.given_name,
        lastName: user?.attributes?.family_name,
        email: user?.attributes?.email,
        phone: user?.attributes?.phone_number,
        billingAddress: billingAddress,
        orgName: user?.attributes!["custom:orgName"],
      })
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
          if (getUser.data?.getUser?.stripeCustomerID == null)
            if (await this.createStripeUser(getUser.data?.getUser?.billingAddress)) {
              if (getUser.data?.getUser?.stripeSubscriptionID == null) {
                console.log("No Stripe Subscription, No Stripe Customer")
                return PaidStatus.InProgress
              } else {
                return PaidStatus.MissingCustomer
              }
            } else if (getUser.data?.getUser?.stripeSubscriptionID == null) {
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
      const getUser = Data.getUser(this.user!["username"])
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
  async getStartup(): Promise<{ action: string; props: Record<string, unknown> | null }> {
    let result = { action: "HomeScreen", props: null }
    const listStartup = await Data.listStartup(null)
    const startup =
      listStartup.data?.listStartups?.items.sort((x, y) => (x?.order ?? 0) - (y?.order ?? 0)) ?? []
    const pgd = this.state.groups
    const preview = JSON.parse(JSON.stringify(startup))
    if (preview) {
      const preview2 = preview.filter(
        (x: any) =>
          (x.readGroups?.filter((z: any) => pgd?.includes(z ?? UserGroupType.verifiedUsers))
            .length ?? 0) >= 1
      )
      if (preview.length < 0) result = { action: "HomeScreen", props: null }
      else result = { action: preview2[0]?.action, props: preview2[0]?.params }
    }
    return result
  }
  async performNavigation(): Promise<void> {
    console.log("NAVIGATING")
    switch (this.state.hasPaidState) {
      case PaidStatus.Success:
        switch (this.state.hasCompletedPersonalProfile) {
          case ProfileStatus.Completed: {
            const initialUrl = await Linking.getInitialURL()

            console.log(initialUrl)
            if (Platform.OS == "web" && initialUrl?.includes("auth/payment3")) {
              const startup = await this.getStartup()
              RootNavigation.navigate(isMobile ? "mainApp" : "mainApp2", {
                screen: "mainDrawer",
                params: {
                  screen: startup.action,
                  params: startup.props,
                },
              })
            }
            RootNavigation.navigate(isMobile ? "mainApp" : "mainApp2", {})

            break
          }
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
      const handleUser = async (getUser: GetUserQueryResult) => {
        const response = Validate.Profile(getUser.data?.getUser, await this.getProfileConfig())
        console.log({ Validate: response })
        console.debug({ checkIfCompletedProfileResult: response.result })
        if (response.result) return ProfileStatus.Completed
        else if (!response.result) return ProfileStatus.Incomplete
        else return ProfileStatus.Unknown
      }
      const getUser = Data.getUser(this.user!["username"])
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
              getProfileConfig: this.getProfileConfig,
            },
          }}
        >
          <MainStack.Navigator
            initialRouteName="auth"
            screenOptions={{
              headerShown: false,
              presentation: "card",
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
            {isMobile ? (
              <MainStack.Screen
                name="mainApp"
                component={MainBottomTabsRouter}
                options={{
                  title: "Jesus Collective",
                }}
                initialParams={{
                  screen: this.state.initialAuthType,
                  params: this.state.initialParams,
                }}
              />
            ) : (
              <MainStack.Screen
                name="mainApp2"
                component={MainDrawerRouter}
                initialParams={{
                  screen: this.state.initialAuthType,
                  params: this.state.initialParams,
                }}
                options={{ title: "Jesus Collective" }}
              />
            )}
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
