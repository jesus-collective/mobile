import Amplify, { Storage } from "aws-amplify"
import React, { useContext, useState } from "react"
import InputColor from "react-input-color"
import { Animated, Image, View } from "react-native"
import { ImageInput } from "src/API"
import MainStyles from "../../components/style"
import awsconfig from "../../src/aws-exports"
import { ResourceAdminProp, ResourceSetupProp } from "../../src/types"
import EditableText from "../Forms/EditableText"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"
import ResourceImage from "./ResourceImage"
Amplify.configure(awsconfig)

type Props = ResourceSetupProp
export function ResourceHeaderAdmin(props: ResourceAdminProp): JSX.Element | null {
  const resourceContext = useContext(ResourceContext)
  const styles = MainStyles.getInstance()

  if (!resourceContext.resourceState) return null
  if (resourceContext.resourceState.currentResource == null) return null
  return (
    <>
      <EditableText
        onChange={(val) => {
          const tmp = props.settings
          tmp.title1 = val
          props.setSettings(tmp)
        }}
        placeholder="Title"
        multiline={false}
        inputStyle={styles.style.resourceContentEpisodesEpisodeTitle}
        textStyle={styles.style.fontCourseHeaderBold}
        value={props.settings.title1 ?? ""}
        isEditable={true}
      ></EditableText>
      <EditableText
        onChange={(val) => {
          const tmp = props.settings
          tmp.title2 = val
          props.setSettings(tmp)
        }}
        placeholder="Sub Title"
        multiline={false}
        inputStyle={styles.style.resourceContentEpisodesEpisodeTitle}
        textStyle={styles.style.fontCourseHeaderBold}
        value={props.settings.title2 ?? ""}
        isEditable={true}
      ></EditableText>
      {/*}  <EditableText
        onChange={(val) => {
          const tmp = props.settings
          tmp.color = val
          props.setSettings(tmp)
        }}
        placeholder="Color"
        multiline={false}
        inputStyle={styles.style.resourceContentEpisodesEpisodeTitle}
        textStyle={styles.style.fontCourseHeaderBold}
        value={props.settings.color ?? "#aa0000"}
        isEditable={true}
      ></EditableText>*/}

      <InputColor
        initialValue={props.settings.color ?? "#aa0000"}
        onChange={(c) => {
          const tmp = props.settings
          tmp.color = c.hex
          props.setSettings(tmp)
        }}
        placement="right"
      />
      <ResourceImage
        onUpdate={(image: ImageInput) => {
          const tmp = props.settings
          tmp.image = image
          console.log({ settings: tmp })
          props.setSettings(tmp)
        }}
        fileName={
          "resources/upload/group-" +
          resourceContext.resourceState.resourceData?.id +
          "-pageId-" +
          props.settings.id +
          "-header-"
        }
        currentImage={props.settings.image}
      ></ResourceImage>
    </>
  )
}
function ResourceHeader(props: Props) {
  const resourceContext = useContext(ResourceContext)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [fadeValue, setFadeValue] = useState<Animated.Value>(new Animated.Value(0))
  const [retries, setRetries] = useState<number>(0)

  const styles = MainStyles.getInstance()

  const componentDidMount = (): void => {
    setImageUrl(null)
    setImage(null)
    setFadeValue(new Animated.Value(0))
    setRetries(0)
  }
  const fadeAnimation = (): void => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 2200,
      useNativeDriver: true,
    }).start()
  }
  const getImage = async (img: any): Promise<void> => {
    if (retries > 3) return
    if (img == null) return
    if (img != null) {
      console.log({ image: img })
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      setImageUrl(z)
      setImage(img)
      setRetries(retries + 1)
    }
  }

  if (!resourceContext.resourceState) return null
  if (resourceContext.resourceState.currentResource == null) return null
  if (imageUrl == null || image != props.pageItem.image) getImage(props.pageItem.image)
  return (
    <View
      style={[
        styles.style.resourceHeaderContainer,
        !imageUrl ? { height: 300, marginBottom: 0 } : {},
      ]}
    >
      <View style={styles.style.resourceHeaderImgContainer}>
        {imageUrl ? (
          <Animated.View style={[styles.style.resourceHeaderImgView, { opacity: fadeValue }]}>
            <Image
              style={styles.style.resourceHeaderImg}
              source={imageUrl}
              onLoad={fadeAnimation}
              onError={() => {
                getImage(props.pageItem.image)
              }}
            ></Image>
          </Animated.View>
        ) : null}
        <View style={[styles.style.resourcefileFieldWrapper, !imageUrl ? { marginTop: 40 } : {}]}>
          <EditableText
            multiline={false}
            placeholder="Title"
            inputStyle={styles.style.fontResourceHeaderBold}
            textStyle={[
              styles.style.fontResourceHeaderBold,
              { color: props.pageItem.color ?? "#000000" },
            ]}
            value={props.pageItem.title1 ?? ""}
            isEditable={false}
          ></EditableText>
          <EditableText
            multiline={false}
            placeholder="Subtitle"
            inputStyle={styles.style.fontResourceHeaderDescription}
            textStyle={[
              styles.style.fontResourceHeaderDescription,
              { color: props.pageItem.color ?? "#000000" },
            ]}
            value={props.pageItem.title2 ?? ""}
            isEditable={false}
          ></EditableText>
        </View>
        <View style={styles.style.resourcefileInputWrapper}>
          <PageItemSettings
            pageItemIndex={props.pageItemIndex}
            save={props.save}
            delete={props.delete}
            pageItem={props.pageItem}
          ></PageItemSettings>
          {/* */}
        </View>
      </View>
      <View style={styles.style.resourceHeaderImgContainer2}></View>
    </View>
  )
}
export default ResourceHeader
