import { Ionicons } from "@expo/vector-icons"
import { NavigationProp } from "@react-navigation/native"
import { Amplify, I18n } from "aws-amplify"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { AuthStateData } from "src/types"
import { AppMain } from "./AppMain"
import Sentry from "./components/Sentry"
import awsConfig from "./src/aws-exports.js"
import { version } from "./src/version"

SplashScreen.preventAutoHideAsync()
let env = "unknown"
if (window === undefined) env = "mobile"
else if (window.location === undefined) env = "mobile"
else if (window.location.hostname === "localhost") env = "localhost"
else if (window.location.hostname.includes("beta")) env = "beta"
else if (window.location.hostname.includes("dev")) env = "dev"
else if (window.location.hostname.includes("d13j9gfr4f50wr")) env = "jcfacelift"
else env = "beta"

Sentry.init({
  dsn: "https://8c8703a620444c97ba6e8bb4a60c17d0@o390245.ingest.sentry.io/5231908",
  environment: env,
  release: version.git,
})

Amplify.configure(awsConfig)

const authScreenLabels = {
  en: {
    "Sign in to your account": "Sign in to Jesus Collective",
    "Sign Up": "Create an Account",
    "Sign Up Account": "Create an Account",
    "Sign in with Facebook": "Use Facebook Account",
    "Sign in with Google": "Use Google Account",
    "Forgot Password": "Forgot password?",
  },
}

I18n.setLanguage("en")
I18n.putVocabularies(authScreenLabels)

interface Props {
  navigation: NavigationProp<any, any>
  onStateChange(state: string, data: AuthStateData): any
}

export default function AwesomeApp(props: Props) {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // keep splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()
        // Pre-load fonts, make any api calls here

        try {
          await Font.loadAsync({
            "Graphik-Bold-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Bold-App.ttf"),
            "Graphik-Medium-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Medium-App.ttf"),
            "Graphik-Regular-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Regular-App.ttf"),
            "Graphik-Semibold-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Semibold-App.ttf"),
            "GraphikXXCondensed-Black-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik_xx_condensed/GraphikXXCondensed-Black-App.ttf"),

            ...Ionicons.font,
          })
        } catch (e) {
          console.error(e)
        }

        Asset.fromModule(require("./assets/header/icon.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/JC-Logo-RGB-KO2.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/leftPanel.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/profile-placeholder.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/SignUp/progress-1.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/SignUp/progress-2.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/SignUp/progress-3.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/SignUp/progress-4.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/SignUp/progress-1-oneStory.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/SignUp/progress-2-oneStory.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/SignUp/progress-3-oneStory.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires
        Asset.fromModule(require("./assets/SignUp/progress-4-oneStory.png")).downloadAsync() // eslint-disable-line @typescript-eslint/no-var-requires

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell app to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  onLayoutRootView()

  if (!appIsReady) {
    return null
  }
  return <AppMain {...props} />
}
