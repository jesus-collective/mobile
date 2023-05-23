import React, { useEffect, useRef } from "react"
import {
  Animated,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native"
import { ImageInput } from "src/API"
import DefaultImage from "../../assets/20x20.png"
import useJCImage from "./useJCImage"

export enum JCImageQuality {
  small = "small",
  medium = "medium",
  large = "large",
}
export enum JCImageStyle {
  IconSmall = "IconSmall",
}
type JCImageType = "icon" | "resource"
export type JCImageProps = {
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle
  style: JCImageStyle
  quality: JCImageQuality
  type: JCImageType
  image: ImageInput | null | undefined
  linkToProfile?: boolean
  showNameInToolTip?: boolean
}

export const ProfileImageStyles = StyleSheet.create({
  Bordered: {
    borderColor: "#E4E1E1",
    borderWidth: 0,
    // for some reason, borderWidth:1 breaks the image spacing on Chrome browser randomly
    // not sure what's going on here
  },
  ImageContainer: {
    backgroundColor: "#fff",
  },
  IconSmall: {
    height: 20,
    width: 20,
  },
})
export default function JCImage(props: JCImageProps) {
  const { url, isLoading = true } = useJCImage(props)
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
    <View>
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
            resizeMode={props.type === "icon" ? "contain" : "cover"}
            style={[ProfileImageStyles[props.style], props.imageStyle, ProfileImageStyles.Bordered]}
            source={url as ImageSourcePropType}
          />
        </Animated.View>
      ) : null}
    </View>
  )
}
