import { Asset } from "expo-asset"
import { Image, ImageStyle, StyleProp } from "react-native"
export const CustomImage = (props: { style: StyleProp<ImageStyle>; source: string }) => {
  console.log(Asset.fromModule(props.source).uri)
  return <Image style={props.style} source={{ uri: Asset.fromModule(props.source).uri }} />
}
