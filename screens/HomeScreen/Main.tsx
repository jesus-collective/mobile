import AsyncStorage from "@react-native-async-storage/async-storage"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import * as Linking from "expo-linking"
import React from "react"
import { Platform } from "react-native"
import { AuthStateData } from "src/types"
import HomeScreenRouter from "./HomeScreenRouter"
import { navigationRef } from "./NavigationRoot"

const prefix = Linking.makeUrl("/")
console.log({ prefix: prefix })
const linking = {
  prefixes: [
    prefix,
    "https://localhost/",
    "exps://beta.jesuscollective.com/",
    "exps://localhost:19006/",
    "https://localhost:19006/",
    "http://localhost:19006/",
    "https://beta.jesuscollective.com/",
  ],
  config: {
    screens: {
      mainApp: {
        // points to mobile
        path: "app",
        screens: {
          //missing tab navigator screen configs (?)
          mainDrawer: {
            path: "",
            screens: {
              HomeScreen: "home",
              GenericGroupScreen: "genericgroup/:groupType/:create",
              GroupsScreen: "groups",
              GroupScreen: "groups/:id",
              EventsScreen: "events",
              EventScreen: "events/:id",
              ResourceScreen: "resource",
              ResourceConfigureScreen: "resourceconfig/:id",
              ResourceDisplayScreen: "resourcedisplay/:id",
              ResourcesScreen: "resources",
              OrganizationScreen: "organization",
              OrganizationsScreen: "organizations",
              CourseOverviewScreen: "courseoverview",
              CoursesScreen: "courses",
              CourseHomeScreen: "course",
              CourseDetailScreen: "coursedetail",
              CourseCoachingScreen: "coursecoaching",
              ConversationScreen: "conversation",
              SearchScreen: "search",
              ProfileScreen: "profile",
              ProfilesScreen: "profiles",
              AdminScreen: "admin",
              AdminCRMScreen: "admin-crm",
              AdminMenuScreen: "admin-menu",
              AdminCreateProductScreen: "admin-products",
              CoursePaymentScreen: "coursepayment",
              PurchaseConfirmationScreen: "success",
            },
          },
        },
      },
      mainApp2: {
        path: "web",
        screens: {
          mainDrawer: {
            path: "",
            screens: {
              HomeScreen: "home",
              GenericGroupScreen: "genericgroup/:groupType/:create",
              GroupsScreen: "groups",
              GroupScreen: "groups/:id",
              EventsScreen: "events",
              EventScreen: "events/:id",
              ResourceScreen: "resource",
              ResourceConfigureScreen: "resourceconfig/:id",
              ResourceDisplayScreen: "resourcedisplay/:id",
              ResourcesScreen: "resources",
              OrganizationScreen: "organization",
              OrganizationsScreen: "organizations",
              CourseOverviewScreen: "courseoverview",
              CoursesScreen: "courses",
              CourseHomeScreen: "course",
              CourseDetailScreen: "coursedetail",
              CourseCoachingScreen: "coursecoaching",
              ConversationScreen: "conversation",
              SearchScreen: "search",
              ProfileScreen: "profile",
              ProfilesScreen: "profiles",
              AdminScreen: "admin",
              AdminCRMScreen: "admin-crm",
              AdminCreateProductScreen: "admin-products",
              AdminMenuScreen: "admin-menu",
              CoursePaymentScreen: "coursepayment",
              PurchaseConfirmationScreen: "success",
            },
          },
        },
      },
      auth: {
        path: "auth",
        screens: {
          MySignIn: "signin/:email/:fromVerified",
          MySignUp: "signup/:joinedAs",
          MyConfirmSignUp: "confirmsignup/:email",
          MyForgotPassword: "forgotpassword",
          MyRequireNewPassword: "requirenewpassword",
          MyLoading: "loading",
          MyConfirmSignIn: "confirmsignin",
          MyVerifyContact: "verifycontact",
          Payment1: "payment1",
          Payment2: "payment2",
          Payment3: "payment3",
        },
      },
    },
  },
}
interface Props {
  authState?: any
  onStateChange(state: string, data: AuthStateData): Promise<void>
}
export default function Main(props: Props): JSX.Element {
  // console.log(props)
  console.log("Main")
  const PERSISTENCE_KEY = "NAVIGATION_STATE"
  const [isReady, setIsReady] = React.useState(false)
  const [initialState, setInitialState] = React.useState()

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL()
        console.log({ initialUrl: initialUrl })
        if (Platform.OS !== "web" && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY)
          const state = savedStateString ? JSON.parse(savedStateString) : undefined

          if (state !== undefined) {
            setInitialState(state)
          }
        }
      } finally {
        setIsReady(true)
      }
    }

    if (!isReady) {
      restoreState()
    }
  }, [isReady])

  if (!isReady) {
    return <></>
  }
  console.log({ initialState: initialState })
  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      linking={linking}
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#FFFDFC" },
      }}
      onStateChange={(state) => {
        console.log({ "Persistence State": state })
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }}
    >
      <HomeScreenRouter
        onStateChange={async (state, data) => {
          await props.onStateChange(state, data)
        }}
        authState={props.authState}
      ></HomeScreenRouter>
    </NavigationContainer>
  )
}
