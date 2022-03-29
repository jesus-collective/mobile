import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useRef } from "react"
import {
  Animated,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import DefaultImage from "../../assets/profile-placeholder.png"
import useProfileImage from "./useProfileImage"

export enum ProfileImageQuality {
  small = "small",
  medium = "medium",
  large = "large",
}
export enum ProfileImageStyle {
  UserXSmall = "UserXSmall",
  UserXSmall2 = "UserXSmall2",
  UserXXSmall = "UserXXSmall",
  UserSmall = "UserSmall",
  UserMedium = "UserMedium",
  UserLarge = "UserLarge",
  UserLarge2 = "UserLarge2",
  UserLarge3 = "UserLarge3",
  UserXLarge = "UserXLarge",
  OrgXSmall = "OrgXSmall",
  OrgSmall = "OrgSmall",
  OrgMedium = "OrgMedium",
  OrgLarge = "OrgLarge",
  OrgXLarge = "OrgXLarge",
}
type ProfileImageType = "org" | "user"
export type ProfileImageProps = {
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle
  style: ProfileImageStyle
  quality: ProfileImageQuality
  type: ProfileImageType
  user: any
  linkToProfile?: boolean
  showNameInToolTip?: boolean
}
const navigateToProfile = (props: ProfileImageProps, navigation: StackNavigationProp<any, any>) => {
  if (!navigation) return
  if (props.user && typeof props.user === "string") {
    if (props.type === "org")
      navigation?.push("OrganizationScreen", { id: props.user, create: false })
    else navigation?.push("ProfileScreen", { id: props.user, create: false })
  } else navigation?.push("ProfileScreen", { id: props.user.id, create: false })
}

export const ProfileImageStyles = StyleSheet.create({
  Bordered: {
    borderColor: "#E4E1E1",
    borderWidth: 0,
    // for some reason, borderWidth:1 breaks the image spacing on Chrome browser randomly
    // not sure what's going on here
    borderRadius: 120,
  },
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 120,
  },
  UserXXSmall: {
    height: 30,
    width: 24,
  },
  UserXSmall2: {
    height: 32,
    width: 26,
  },
  UserXSmall: {
    height: 40,
    width: 32,
  },
  UserSmall: {
    height: 60,
    width: 48,
  },
  UserMedium: {
    height: 78,
    width: 62,
  },
  UserLarge: {
    height: 96,
    width: 76.8,
  },
  UserLarge2: {
    height: 80,
    width: 64,
  },
  UserLarge3: {
    height: 120,
    width: 96,
  },
  UserXLarge: {
    height: 256,
    width: 205,
  },

  OrgXSmall: {
    width: 60,
    height: 60,
  },
  OrgSmall: {
    width: 60,
    height: 60,
  },
  OrgMedium: {
    width: 60,
    height: 60,
  },
  OrgLarge: {
    width: 96,
    height: 96,
  },
  OrgXLarge: {
    width: 176,
    height: 176,
  },
})
export default function ProfileImageNew(props: ProfileImageProps) {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const { url, isLoading = true } = useProfileImage(props)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const fadeAnim2 = useRef(new Animated.Value(1)).current
  const fade = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
    Animated.timing(fadeAnim2, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }
  useEffect(() => {
    if (url && !isLoading) fade()
  }, [url, isLoading])
  return (
    <TouchableOpacity
      onPress={() => navigateToProfile(props, navigation)}
      disabled={!props.linkToProfile}
      style={[
        ProfileImageStyles[props.style],
        ProfileImageStyles.ImageContainer,
        props.containerStyle,
      ]}
    >
      <Animated.View style={{ opacity: fadeAnim2, position: "absolute" }}>
        <Image
          resizeMode={"cover"}
          style={[ProfileImageStyles[props.style], props.imageStyle, ProfileImageStyles.Bordered]}
          source={DefaultImage}
        />
      </Animated.View>
      {!isLoading && url ? (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image
            resizeMode={props.type === "org" ? "contain" : "cover"}
            style={[ProfileImageStyles[props.style], props.imageStyle, ProfileImageStyles.Bordered]}
            source={url as ImageSourcePropType}
          />
        </Animated.View>
      ) : null}
    </TouchableOpacity>
  )
}
