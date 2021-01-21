import { createStackNavigator } from "@react-navigation/stack"
import Amplify, { Analytics, API, Auth, graphqlOperation } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { Linking } from "expo"
import moment from "moment"
import React from "react"
import { Text } from "react-native"
import { AuthStateData } from "src/types"
import { v4 as uuidv4 } from "uuid"
import JCComponent from "../../components/JCComponent/JCComponent"
import Validate from "../../components/Validate/Validate"
import {
  CreateOrganizationInput,
  CreateOrganizationMemberInput,
  CreateUserInput,
} from "../../src/API"
import awsconfig from "../../src/aws-exports"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import MainAuthRouter from "./MainAuthRouter"
import MainDrawerRouter from "./MainDrawerRouter"
import * as RootNavigation from "./NavigationRoot"
import { UserContext, UserState } from "./UserContext"

Amplify.configure(awsconfig)

const MainStack = createStackNavigator()

interface Props {
  authState?: string | undefined
  onStateChange(state: string, data: AuthStateData): Promise<void>
}

export default class HomeScreenRouter extends JCComponent<Props, UserState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      groups: [],
      hasCompletedPersonalProfile: "Unknown",
      hasPaidState: "Unknown",
      userExists: false,
      user: null,
      authState: props.authState,
      hasCompletedOrganizationProfile: "Unknown",
      orgId: "",
      isOrg: false,
      groupsLoaded: false,
      initialAuthType: null,
      idempotency: uuidv4(),
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
  isMemberOf = (group: string): boolean => {
    if (this.state.groups) return this.state.groups.includes(group)
    else return false
  }
  updateGroups = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const userSession = currentUser.getSignInUserSession()
      const refreshToken = userSession.getRefreshToken()
      await currentUser.refreshSession(refreshToken, (err: any, session: any) => {
        console.log("UPDATED GROUPS!")
        currentUser.setSignInUserSession(session)
      })
      const user = await Auth.currentAuthenticatedUser()
      this.setState({
        groups: user.getSignInUserSession().accessToken.payload["cognito:groups"],
        groupsLoaded: true,
      })
      console.log({
        "DONE ": user.getSignInUserSession().accessToken.payload["cognito:groups"],
      })
    } catch (e) {
      console.log(e)
    }
  }
  async performStartup(): Promise<void> {
    if (this.state.authState == "signedIn") {
      await this.ensureUserExists()
      await this.checkIfPaid()
      await this.checkIfCompletedProfile()
    } else if (this.state.authState == "signIn") {
      await this.props.onStateChange("signIn", null)
    }
  }
  private user: any

  async ensureUserExists(): Promise<void> {
    let userExists = false
    this.user = await Auth.currentAuthenticatedUser().catch(() => {
      console.log("No current authenticated user")
    })
    if (this.user != null) {
      const { attributes } = this.user
      const handleUser = async (getUser: any) => {
        if (getUser.data.getUser === null) {
          console.log("Trying to create")
          const inputData: CreateUserInput = {
            id: this.user["username"],
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
          this.setState({ isOrg: true })
          if (getUser?.data.getUser.organizations.items.length === 0) {
            console.log("creating Organization")
            const id = `organization-${Date.now()}`
            const orgInput: CreateOrganizationInput = {
              id: id,
              orgName: attributes["custom:orgName"],
              adminEmail: attributes["email"],
              phone: attributes["phone_number"],
              profileState: "Incomplete",
              admins: [this.user["username"]],
              superAdmin: this.user["username"],
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

            this.setState({ orgId })

            const orgMember: CreateOrganizationMemberInput = {
              userRole: "superAdmin",
              userId: this.user["username"],
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
            this.setState({
              orgId: getUser.data.getUser.organizations.items[0].organizationId,
            })
          } else {
            console.error("error finding or creating user's organization")
          }
        }
      }
      const z: any = API.graphql(graphqlOperation(queries.getUser, { id: this.user["username"] }))
      await z.then(handleUser).catch(handleUser)

      console.log({ userExists: userExists })
      this.setState({ userExists: userExists }, () => {
        this.checkIfCompletedProfile()
      })
    }
  }

  async createStripeUser(billingAddress: any) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
      const customer: any = await API.graphql({
        query: mutations.createCustomer,
        variables: {
          idempotency: this.state.idempotency,
          firstName: user.attributes.given_name,
          lastName: user.attributes.family_name,
          email: user.attributes.email,
          phone: user.attributes.phone_number,
          billingAddress: billingAddress,
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
  async checkIfPaid(): Promise<void> {
    console.log("checkIfPaid")
    if (this.state.userExists) {
      const handleGetUser = async (getUser: any) => {
        const user = await Auth.currentAuthenticatedUser()
        if (
          user.getSignInUserSession().accessToken.payload["cognito:groups"].includes("admin") ||
          user
            .getSignInUserSession()
            .accessToken.payload["cognito:groups"].includes("subscriptionValid") ||
          user
            .getSignInUserSession()
            .accessToken.payload["cognito:groups"].includes("legacyUserGroup1")
        )
          this.setState({ hasPaidState: "Success" }, () => {
            this.onPaidStateChange("Success")
          })
        else {
          if (getUser.data.getUser.stripeCustomerID == null)
            if (await this.createStripeUser(getUser.data.getUser.billingAddress)) {
              if (getUser.data.getUser.stripeSubscriptionID == null) {
                console.log("No Stripe Subscription, No Stripe Customer")
                this.setState({ hasPaidState: "InProgress" }, () => {
                  this.onPaidStateChange("InProgress")
                })
              } else {
                this.setState(
                  {
                    hasPaidState: "Problem1",
                  },
                  () => {
                    this.onPaidStateChange("Problem1")
                  }
                )
              }
            } else if (getUser.data.getUser.stripeSubscriptionID == null) {
              console.log("No Stripe Subscription")

              this.setState({ hasPaidState: "InProgress" }, () => {
                this.onPaidStateChange("InProgress")
              })
            } else {
              this.setState(
                {
                  hasPaidState: "Problem2",
                },
                () => {
                  this.onPaidStateChange("Problem2")
                }
              )
            }
          else {
            if (getUser.data.getUser.stripeSubscriptionID == null) {
              console.log("No Stripe Subscription")
              this.setState({ hasPaidState: "InProgress" }, () => {
                this.onPaidStateChange("InProgress")
              })
            } else {
              this.setState(
                {
                  hasPaidState: "Problem1",
                },
                () => {
                  this.onPaidStateChange("Problem1")
                }
              )
            }
          }
        }
      }
      const getUser: any = API.graphql(
        graphqlOperation(queries.getUser, { id: this.user["username"] })
      )
      await getUser.then(handleGetUser).catch(handleGetUser)
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
  onPaidStateChange(state: string): void {}
  async updatePaidState(): Promise<void> {
    console.debug("updatePaidState")
    await this.ensureUserExists()
    await this.checkIfPaid()
    await this.checkIfCompletedProfile()
  }
  //  onProfileComplete(): void {
  //    console.debug("onProfileComplete")
  //    this.checkIfCompletedProfile()
  //  }
  async checkIfCompletedProfile(): Promise<void> {
    console.debug("checkIfCompletedProfile")
    console.debug({
      user: this.state.userExists,
      hasPaidState: this.state.hasPaidState,
    })
    if (this.state.userExists && this.state.hasPaidState == "Success") {
      const handleUser = (getUser: any) => {
        const response = Validate.Profile(getUser.data.getUser)
        console.log({ Validate: response })
        console.debug({ checkIfCompletedProfileResult: response.result })
        if (response.result && this.state.hasCompletedPersonalProfile != "Completed")
          this.setState({ hasCompletedPersonalProfile: "Completed" }, () => {
            //TODO THIS IS WRONG ONLY DO THIS FROM

            console.log("Navigate to HomeScreen")
            RootNavigation.navigate("mainApp", {
              screen: "home",
            })
          })
        else if (!response.result && this.state.hasCompletedPersonalProfile != "Incomplete")
          this.setState({ hasCompletedPersonalProfile: "Incomplete" }, () => {
            RootNavigation.navigate("auth", {
              screen: "Payment3",
            })
          })
      }
      const getUser: any = API.graphql(
        graphqlOperation(queries.getUser, { id: this.user["username"] })
      )
      await getUser.then(handleUser).catch(handleUser)
    }
  }
  updateHasCompletedPersonalProfile = (): void => {
    this.checkIfCompletedProfile()
  }
  renderFallback(): React.ReactNode {
    return <Text>loading...</Text>
  }

  async getAuthInitialState() {
    const initialUrl: string = await Linking.getInitialURL()
    const initialParams = Linking.parse(initialUrl).queryParams

    //const initialParams =
    console.log({ "INITIAL URL": initialUrl })
    console.log({ initialParams: initialParams })
    if (initialUrl.toLowerCase().includes("/auth/signup"))
      this.setState({
        initialAuthType: "signup",
        initialParams: initialParams,
      })
    else {
      this.setState({ initialAuthType: "signin", initialParams: initialParams })
    }
  }
  updateHasCompletedOrganizationProfile = (): void => {}
  static UserProvider = UserContext.Provider
  render() {
    console.log({
      UserState: [
        "User has signed in",
        { "Home Screen Router AuthState": this.props.authState },
        { "Paid state": this.state.hasPaidState },
        { "Profile state": this.state.hasCompletedPersonalProfile },
      ],
    })

    trackUserId()
    if (this.state.initialAuthType)
      return (
        <HomeScreenRouter.UserProvider
          value={{
            userState: {
              ...this.state,
            },
            userActions: {
              onSetUser: this.onSetUser,
              updateHasCompletedPersonalProfile: this.updateHasCompletedPersonalProfile,
              updateHasCompletedOrganizationProfile: this.updateHasCompletedOrganizationProfile,
              updatePaidState: this.updatePaidState,
              onStateChange: async (state, data) => {
                await this.props.onStateChange(state, data)
              },
              updateGroups: this.updateGroups,
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
async function trackUserId() {
  try {
    const { attributes } = await Auth.currentAuthenticatedUser()
    const userAttributes = mapToArrayOfStrings(attributes)
    Analytics.updateEndpoint({
      address: attributes.email,
      channelType: "EMAIL",
      optOut: "NONE",
      userId: attributes.sub,
      userAttributes,
    })
  } catch (error) {
    console.log(error)
  }
}
