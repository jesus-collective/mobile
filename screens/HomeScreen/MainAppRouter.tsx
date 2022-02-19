import { GraphQLResult } from "@aws-amplify/api-graphql"
import { createStackNavigator } from "@react-navigation/stack"
import React, { Component, lazy } from "react"
import { ListGroupsQuery, ListOrganizationsQuery, ListUsersQuery } from "src/API"
import { EmptyProps } from "src/types"
import { Data, UserGroupType } from "../../components/Data/Data"
import Header from "../../components/Header/Header"
import JCComponent from "../../components/JCComponent/JCComponent"
import { MapContext, MapState } from "./MapContext"
import { MapConverter } from "./MapConverter"
import { PaidStatus, ProfileStatus, UserContext } from "./UserContext"
const Stack = createStackNavigator()

const HomeScreen = lazy(() => import("./HomeScreen"))
const ConversationScreen = lazy(() => import("../ConversationScreen/ConversationScreen"))
const OrganizationsScreen = lazy(() => import("../OrganizationsScreen/OrganizationsScreen"))
const OrganizationScreen = lazy(() => import("../OrganizationScreen/OrganizationProfile"))
const GenericGroupScreen = lazy(() => import("../GenericGroupScreen/GenericGroupScreen"))
const CoursesScreen = lazy(() => import("../CoursesScreen/CoursesScreen"))
const CourseOverviewScreen = lazy(() => import("../CourseOverviewScreen/CourseOverviewScreen"))
const CourseHomeScreen = lazy(() => import("../CourseHomeScreen/CourseHomeScreen"))
const GroupsScreen = lazy(() => import("../GroupsScreen/GroupsScreen"))
const EventsScreen = lazy(() => import("../EventsScreen/EventsScreen"))
const EventScreen = lazy(() => import("../EventScreen/EventScreen"))
const GroupScreen = lazy(() => import("../GroupScreen/GroupScreen"))
const ResourceScreen = lazy(() => import("../ResourceScreen/ResourceScreen"))
const ResourceConfigureScreen = lazy(() => import("../ResourceScreen/ResourceConfigureScreen"))
const ResourceDisplayScreen = lazy(() => import("../ResourceScreen/ResourceDisplayScreen"))
const ResourcesScreen = lazy(() => import("../ResourcesScreen/ResourcesScreen"))
const ProfileScreen = lazy(() => import("../ProfileScreen/ProfileScreen"))
const EditProfileScreen = lazy(() => import("../../components/MyProfile/MyProfile"))
const ProfilesScreen = lazy(() => import("../ProfilesScreen/ProfilesScreen"))
const SearchScreen = lazy(() => import("../SearchScreen/SearchScreen"))
const AdminScreen = lazy(() => import("../AdminScreen/AdminScreen"))
const AdminCRMScreen = lazy(() => import("../AdminCRMScreen/AdminCRMScreen"))
const CoursePaymentScreen = lazy(() => import("../CoursePaymentScreen/CoursePaymentScreen"))

const PurchaseConfirmationScreen = lazy(
  () => import("../PurchaseConfirmationScreen/PurchaseConfirmationScreen")
)
const AdminCreateProductScreen = lazy(
  () => import("../AdminCreateProductScreen/AdminCreateProductScreen")
)
const AdminCustomPricingScreen = lazy(
  () => import("../AdminCustomPricingScreen/AdminCustomPricingScreen")
)
const AdminMenuScreen = lazy(() => import("../AdminMenuScreen/AdminMenuScreen"))
const AdminStartupScreen = lazy(() => import("../AdminStartupScreen/AdminStartupScreen"))

class Nothing extends Component {
  render() {
    return null
  }
}

export default class MainAppRouter extends JCComponent<EmptyProps, MapState> {
  constructor(props: EmptyProps) {
    super(props)
    this.state = { MapItems: [] }
  }
  async componentDidMount() {
    await this.reload()
  }
  async loadAllEvents(nextToken: string | null) {
    const process = async (z: GraphQLResult<ListGroupsQuery>) => {
      console.log({ z: z })
      this.setState(
        {
          MapItems: [
            ...this.state.MapItems,
            ...MapConverter.convertEventToMapData(z.data?.listGroups?.items),
          ],
        },
        async () => {
          if (z.data?.listGroups?.nextToken != null)
            await this.loadAllEvents(z.data?.listGroups?.nextToken)
        }
      )
    }
    await Data.listEvents(nextToken).then(process).catch(process)
  }
  async loadAllOrgs(nextToken: string | null) {
    const process = async (z: GraphQLResult<ListOrganizationsQuery>) => {
      console.log({ z: z })
      this.setState(
        {
          MapItems: [
            ...this.state.MapItems,
            ...MapConverter.convertOrgToMapData(z.data?.listOrganizations?.items),
          ],
        },
        async () => {
          if (z.data?.listOrganizations?.nextToken != null)
            await this.loadAllOrgs(z.data?.listOrganizations?.nextToken)
        }
      )
    }
    await Data.listOrgs(nextToken).then(process).catch(process)
  }
  async loadAllUsers(nextToken: string | null) {
    const process = async (z: GraphQLResult<ListUsersQuery>) => {
      console.log({ z: z })
      this.setState(
        {
          MapItems: [
            ...this.state.MapItems,
            ...MapConverter.convertProfileToMapData(z.data?.listUsers?.items),
          ],
        },
        async () => {
          if (z.data?.listUsers?.nextToken != null)
            await this.loadAllUsers(z.data?.listUsers?.nextToken)
        }
      )
    }
    await Data.listUsers(UserGroupType.All, nextToken).then(process).catch(process)
  }
  reload = async (): Promise<void> => {
    this.setState({ MapItems: [] }, async () => {
      console.log("LOAD ALL S")

      await this.loadAllUsers(null)
      await this.loadAllOrgs(null)
      await this.loadAllEvents(null)
    })
  }
  static UserConsumer = UserContext.Consumer
  static MapProvider = MapContext.Provider
  render(): React.ReactNode {
    return (
      <MainAppRouter.MapProvider
        value={{
          mapState: {
            ...this.state,
          },
          mapActions: {
            reload: this.reload,
          },
        }}
      >
        <MainAppRouter.UserConsumer>
          {({ userState }) => {
            if (!userState) return null
            return (
              <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={({ navigation }) => ({
                  animationEnabled: false,
                  gestureEnabled: false,
                  cardOverlayEnabled: false,
                  headerMode: "screen",
                  cardStyle: { flex: 1, backgroundColor: "#fffdfc" },
                  presentation: "card",
                  header: (props) => {
                    return (
                      <Header
                        title={(props.options.headerTitle as string) ?? "" ?? props.route.name}
                        navigation={navigation}
                      />
                    )
                  },
                })}
              >
                {userState.hasPaidState == PaidStatus.Success &&
                userState.hasCompletedPersonalProfile == ProfileStatus.Completed ? (
                  <>
                    <Stack.Screen
                      name="HomeScreen"
                      component={HomeScreen}
                      options={{ headerTitle: "Home", title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="GenericGroupScreen"
                      component={GenericGroupScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="EditProfileScreen"
                      component={EditProfileScreen}
                      options={{ headerTitle: "Groups", title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="GroupsScreen"
                      component={GroupsScreen}
                      options={{ headerTitle: "Groups", title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="GroupScreen"
                      component={GroupScreen}
                      options={{ headerTitle: "Group", title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="EventsScreen"
                      component={EventsScreen}
                      options={{ headerTitle: "Events", title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="EventScreen"
                      component={EventScreen}
                      options={{ headerTitle: "Event", title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="ResourcesScreen"
                      component={ResourcesScreen}
                      options={{ headerTitle: "Resources", title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="ResourceScreen"
                      component={ResourceScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="ResourceConfigureScreen"
                      component={ResourceConfigureScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="ResourceDisplayScreen"
                      component={ResourceDisplayScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="OrganizationsScreen"
                      component={OrganizationsScreen}
                      options={{ headerTitle: "Organizations", title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="OrganizationScreen"
                      component={OrganizationScreen}
                      options={{ title: "Jesus Collective" }}
                    />

                    <Stack.Screen
                      name="CourseOverviewScreen"
                      component={CourseOverviewScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="CoursesScreen"
                      component={CoursesScreen}
                      options={{ headerTitle: "Courses", title: "Jesus Collective" }}
                    />

                    <Stack.Screen
                      name="CourseHomeScreen"
                      component={CourseHomeScreen}
                      options={{ title: "Jesus Collective" }}
                    />

                    <Stack.Screen
                      name="ConversationScreen"
                      component={ConversationScreen}
                      options={{ headerTitle: "Messages", title: "Jesus Collective" }}
                    />

                    <Stack.Screen
                      name="SearchScreen"
                      component={SearchScreen}
                      options={{ headerTitle: "Search", title: "Jesus Collective" }}
                    />

                    <Stack.Screen
                      name="ProfileScreen"
                      component={ProfileScreen}
                      options={{ title: "Jesus Collective" }}
                    />

                    <Stack.Screen
                      name="ProfilesScreen"
                      component={ProfilesScreen}
                      options={{ headerTitle: "People", title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminScreen"
                      component={AdminScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminCRMScreen"
                      component={AdminCRMScreen}
                      options={{ title: "Jesus Collective" }}
                    />

                    <Stack.Screen
                      name="CoursePaymentScreen"
                      component={CoursePaymentScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="PurchaseConfirmationScreen"
                      component={PurchaseConfirmationScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminCreateProductScreen"
                      component={AdminCreateProductScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminMenuScreen"
                      component={AdminMenuScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminCustomPricingScreen"
                      component={AdminCustomPricingScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminStartupScreen"
                      component={AdminStartupScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen
                      name="HomeScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="GenericGroupScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="GroupsScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="GroupScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="EventsScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="EventScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="ResourcesScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="ResourceScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="ResourceDisplayScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="ResourceConfigureScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="OrganizationsScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="OrganizationScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="CourseOverviewScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="CoursesScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="ProfilesScreen"
                      component={ProfilesScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminScreen"
                      component={AdminScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminCRMScreen"
                      component={AdminCRMScreen}
                      options={{ title: "Jesus Collective" }}
                    />

                    <Stack.Screen
                      name="CoursePaymentScreen"
                      component={CoursePaymentScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="PurchaseConfirmationScreen"
                      component={PurchaseConfirmationScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminCreateProductScreen"
                      component={AdminCreateProductScreen}
                      options={{ title: "Jesus Collective" }}
                    />

                    <Stack.Screen
                      name="AdminMenuScreen"
                      component={AdminMenuScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminStartupScreen"
                      component={AdminStartupScreen}
                      options={{ title: "Jesus Collective" }}
                    />
                    <Stack.Screen
                      name="AdminCustomPricingScreen"
                      component={Nothing}
                      options={{ title: "Jesus Collective" }}
                    />
                  </>
                )}
              </Stack.Navigator>
            )
          }}
        </MainAppRouter.UserConsumer>
      </MainAppRouter.MapProvider>
    )
  }
}
