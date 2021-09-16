import { createStackNavigator } from "@react-navigation/stack"
import React, { Component, lazy } from "react"
import JCComponent from "../../components/JCComponent/JCComponent"
import { PaidStatus, ProfileStatus, UserContext } from "./UserContext"
const Stack = createStackNavigator()

const HomeScreen = lazy(() => import("./HomeScreen"))
const ConversationScreen = lazy(() => import("../ConversationScreen/ConversationScreen"))
const OrganizationsScreen = lazy(() => import("../OrganizationsScreen/OrganizationsScreen"))
const OrganizationScreen = lazy(() => import("../OrganizationScreen/OrganizationScreen"))
const GenericGroupScreen = lazy(() => import("../GenericGroupScreen/GenericGroupScreen"))
const CoursesScreen = lazy(() => import("../CoursesScreen/CoursesScreen"))
const CourseOverviewScreen = lazy(() => import("../CourseOverviewScreen/CourseOverviewScreen"))
const CourseHomeScreen = lazy(() => import("../CourseHomeScreen/CourseHomeScreen"))
const GroupsScreen = lazy(() => import("../GroupsScreen/GroupsScreen"))
const EventsScreen = lazy(() => import("../EventsScreen/EventsScreen"))
const ResourceScreen = lazy(() => import("../ResourceScreen/ResourceScreen"))
const ResourceConfigureScreen = lazy(() => import("../ResourceScreen/ResourceConfigureScreen"))
const ResourceDisplayScreen = lazy(() => import("../ResourceScreen/ResourceDisplayScreen"))
const ResourcesScreen = lazy(() => import("../ResourcesScreen/ResourcesScreen"))
const ProfileScreen = lazy(() => import("../ProfileScreen/ProfileScreen"))
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

class Nothing extends Component {
  render() {
    return null
  }
}
export default class MainAppRouter extends JCComponent {
  static UserConsumer = UserContext.Consumer
  render(): React.ReactNode {
    return (
      <MainAppRouter.UserConsumer>
        {({ userState }) => {
          if (!userState) return null
          return (
            <Stack.Navigator
              initialRouteName="HomeScreen"
              screenOptions={{
                headerMode: "none",
                animationEnabled: false,
                gestureEnabled: false,
                cardOverlayEnabled: false,
              }}
            >
              {userState.hasPaidState == PaidStatus.Success &&
              userState.hasCompletedPersonalProfile == ProfileStatus.Completed ? (
                <>
                  <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: "Jesus Collective" }}
                  />
                  <Stack.Screen
                    name="GenericGroupScreen"
                    component={GenericGroupScreen}
                    options={{ title: "Jesus Collective" }}
                  />
                  <Stack.Screen
                    name="GroupsScreen"
                    component={GroupsScreen}
                    options={{ title: "Jesus Collective" }}
                  />
                  <Stack.Screen
                    name="EventsScreen"
                    component={EventsScreen}
                    options={{ title: "Jesus Collective" }}
                  />
                  <Stack.Screen
                    name="ResourcesScreen"
                    component={ResourcesScreen}
                    options={{ title: "Jesus Collective" }}
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
                    options={{ title: "Jesus Collective" }}
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
                    options={{ title: "Jesus Collective" }}
                  />

                  <Stack.Screen
                    name="CourseHomeScreen"
                    component={CourseHomeScreen}
                    options={{ title: "Jesus Collective" }}
                  />

                  <Stack.Screen
                    name="ConversationScreen"
                    component={ConversationScreen}
                    options={{ title: "Jesus Collective" }}
                  />

                  <Stack.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    options={{ title: "Jesus Collective" }}
                  />

                  <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
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
                    name="EventsScreen"
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
                    name="CourseHomeScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />

                  <Stack.Screen
                    name="ConversationScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />

                  <Stack.Screen
                    name="SearchScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />

                  <Stack.Screen
                    name="ProfileScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />

                  <Stack.Screen
                    name="ProfilesScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />
                  <Stack.Screen
                    name="AdminScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />
                  <Stack.Screen
                    name="AdminCRMScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />

                  <Stack.Screen
                    name="CoursePaymentScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />
                  <Stack.Screen
                    name="PurchaseConfirmationScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />
                  <Stack.Screen
                    name="AdminCreateProductScreen"
                    component={Nothing}
                    options={{ title: "Jesus Collective" }}
                  />
                </>
              )}
            </Stack.Navigator>
          )
        }}
      </MainAppRouter.UserConsumer>
    )
  }
}
