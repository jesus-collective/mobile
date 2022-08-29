import { Ionicons } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import Amplify, { Storage } from "aws-amplify"
import React, { useContext, useEffect, useState } from "react"
import { isBrowser, isMobile, isTablet } from "react-device-detect"
import { Animated, Image, Picker, Text, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { TouchableOpacity } from "react-native-gesture-handler"
import EditableText from "../../components/Forms/EditableText"
import MainStyles from "../../components/style"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { ImageInput, ResourceDetailType, ResourcePageItemStyle } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import {
  GetResourceData,
  GetResourceEpisodeData,
  GetResourceSeriesData,
  ResourceAdminProp,
  ResourceSetupProp,
} from "../../src/types"
import NotSubscribedModal, { NotSubscribedButton } from "./NotSubscribed"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"
import ResourceImage from "./ResourceImage"
import ResourceSelector from "./ResourceSelector"
Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {
  navigation?: NavigationProp<any, any>
  route?: any
}
export function ResourceCardAdmin(props: ResourceAdminProp): JSX.Element | null {
  const resourceContext = useContext(ResourceContext)

  if (!resourceContext.resourceState) return null
  if (resourceContext.resourceState.currentResource == null) return null
  return (
    <>
      <Picker
        mode="dropdown"
        style={{
          width: "100%",
          marginTop: 10,
          marginBottom: 30,
          fontSize: 16,
          height: 30,
          flexGrow: 0,
          paddingTop: 3,
          paddingBottom: 3,
        }}
        selectedValue={props.settings.style ?? undefined}
        onValueChange={(value: ResourcePageItemStyle) => {
          const tmp = props.settings
          tmp.style = value
          props.setSettings(tmp)
        }}
      >
        {Object.keys(ResourcePageItemStyle)
          .filter((z) => z.startsWith("Card"))
          .map((org) => {
            return <Picker.Item key={org} label={org} value={org} />
          })}
      </Picker>
      {props.settings.style === ResourcePageItemStyle.CardAuto ? (
        <>
          <Text style={{ textAlign: "left", width: "100%", fontWeight: "800" }}>Title 1:</Text>
          <EditableText
            onChange={(val: string) => {
              const tmp = props.settings
              tmp.title1 = val
              props.setSettings(tmp)
            }}
            placeholder="Title 1"
            multiline={false}
            textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
            inputStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
            value={props.settings.title1 ?? ""}
            isEditable={true}
          />
          <Text style={{ textAlign: "left", width: "100%", fontWeight: "800", marginTop: 15 }}>
            Title 2 (replaces the auto title):
          </Text>
          <EditableText
            onChange={(val: string) => {
              const tmp = props.settings
              tmp.title2 = val
              props.setSettings(tmp)
            }}
            placeholder="Title 2"
            multiline={false}
            textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
            inputStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
            value={props.settings.title2 ?? ""}
            isEditable={true}
          />
        </>
      ) : null}
      {props.settings.style == ResourcePageItemStyle.CardManual || props.settings.style == null ? (
        <>
          <Text style={{ textAlign: "left", width: "100%", fontWeight: "800" }}>Title 1:</Text>
          <EditableText
            onChange={(val: string) => {
              const tmp = props.settings
              tmp.title1 = val
              props.setSettings(tmp)
            }}
            placeholder="Title 1"
            multiline={false}
            textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
            inputStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
            value={props.settings.title1 ?? ""}
            isEditable={true}
          ></EditableText>
          <Text style={{ textAlign: "left", width: "100%", fontWeight: "800", marginTop: 15 }}>
            Title 2:
          </Text>

          <EditableText
            onChange={(val: string) => {
              const tmp = props.settings
              tmp.title2 = val
              props.setSettings(tmp)
            }}
            placeholder="Title 2"
            multiline={false}
            textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
            inputStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
            value={props.settings.title2 ?? ""}
            isEditable={true}
          ></EditableText>
          <Text style={{ textAlign: "left", width: "100%", fontWeight: "800", marginTop: 15 }}>
            Description:
          </Text>
          <EditableText
            onChange={(val: string) => {
              const tmp = props.settings
              tmp.description1 = val
              props.setSettings(tmp)
            }}
            placeholder="Description 1"
            numberOfLines={4}
            multiline={false}
            textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
            inputStyle={{
              textAlign: "left",
              width: "100%",
              fontWeight: "400",
              height: 130,
            }}
            value={props.settings.description1 ?? ""}
            isEditable={true}
          ></EditableText>
          <Text style={{ textAlign: "left", width: "100%", fontWeight: "800", marginTop: 15 }}>
            Navigate To:
          </Text>
          <EditableText
            onChange={(val: string) => {
              const tmp = props.settings
              tmp.url = val
              props.setSettings(tmp)
            }}
            placeholder="target URL"
            numberOfLines={4}
            multiline={false}
            textStyle={{
              textAlign: "left",
              width: "100%",
              fontWeight: "400",
              marginBottom: 15,
            }}
            inputStyle={{
              textAlign: "left",
              width: "100%",
              fontWeight: "400",
              marginBottom: 15,
            }}
            value={props.settings.url ?? ""}
            isEditable={true}
          ></EditableText>
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
              "-card-"
            }
            currentImage={props.settings.image}
          ></ResourceImage>
        </>
      ) : (
        <ResourceSelector {...props} />
      )}
    </>
  )
}

function RenderLargeCard(props: Props): JSX.Element | null {
  const styles = MainStyles.getInstance()

  const resourceContext = useContext(ResourceContext)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [fadeValue, setFadeValue] = useState<Animated.Value>(new Animated.Value(0))
  const [retries, setRetries] = useState<number>(5)
  const userContext = useContext(UserContext)
  const [dropdownValue, setDropdownValue] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [notSubscribedModal, setNotSubscribedModal] = useState<boolean>(false)

  const fadeAnimation = (): void => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 3250,
      useNativeDriver: true,
    }).start()
  }
  const getYoutubeId = (
    item: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData
  ): string | null => {
    const youtube = item?.details?.filter((z) => z?.type == ResourceDetailType.DefaultYoutube)
    console.log({ youtube: youtube })
    if (youtube && youtube?.length && youtube?.length > 0) return youtube[0]!.value
    else return null
  }
  const getImage = async (img: any): Promise<void> => {
    console.log("GetImage")
    console.log(img)
    if (img == null) return
    if (img != null && retries > 0) {
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      console.log(z)
      setImageUrl(z)
      setImage(img)
      setRetries(retries - 1)
    }
  }
  const icon = (): React.ReactNode => {
    return <Ionicons name="md-menu" style={styles.style.resourceIcon} />
  }
  const getButtonItems = (
    items: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData
  ): any => {
    return items && items.details
      ? items.details
          .filter((e) => e?.type == ResourceDetailType.Button)
          .map((item) => {
            return {
              label: item?.text ?? "",
              value: item?.value ?? "",
              icon: icon,
            }
          })
      : []
  }

  if (props.pageItem && (imageUrl == null || image != props.pageItem.image))
    getImage(props.pageItem.image)

  if (!userContext.userActions) return null

  if (!resourceContext.resourceState) return null
  if (resourceContext.resourceState.currentResource == null) return null
  let item: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData
  let readGroups: NonNullable<GetResourceData>["readGroups"] | undefined = []
  let isSubscribed = false
  const resourceById = resourceContext.resourceActions.getResourceByID(props.pageItem.resourceID)
  readGroups = resourceById?.readGroups
  if (props.pageItem.episodeID != null && props.pageItem.episodeID != undefined)
    item = resourceContext.resourceActions.getEpisodeByID(
      props.pageItem.resourceID,
      props.pageItem.seriesID,
      props.pageItem.episodeID
    )
  else if (props.pageItem.seriesID != null && props.pageItem.seriesID != undefined)
    item = resourceContext.resourceActions.getSeriesByID(
      props.pageItem.resourceID,
      props.pageItem.seriesID
    )
  else {
    item = resourceById
  }

  const youtubeID = getYoutubeId(item)
  const buttonItems = getButtonItems(item)

  isSubscribed = !!readGroups?.some((group) => {
    return userContext.userActions.isMemberOf(group as string)
  })

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.pageItem.url) {
          window.location.href = props.pageItem.url ?? ""
        } else {
          console.log("NAVIGATE")
          if (props.pageItem.episodeID == null)
            props.navigation?.navigate("ResourceDisplayScreen", {
              id: resourceContext.resourceState?.groupData?.id,
              resource: props.pageItem.resourceID,
              series: props.pageItem.seriesID,
              episode: props.pageItem.episodeID,
            })
        }
      }}
    >
      <Text>Large</Text>
      <View
        style={[
          styles.style.resourceSeries,
          { zIndex: 6000 + props.pageItemIndex.length },
          {
            marginVertical: 90,
          },
        ]}
      >
        <View
          style={{
            paddingLeft: isMobile ? 20 : 0,
            paddingRight: isMobile ? 20 : 0,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <>
            {props.pageItem.order && (
              <EditableText
                multiline={true}
                textStyle={{
                  fontFamily: "Graphik-Bold-App",
                  fontSize: 54,
                  fontWeight: 600,
                  lineHeight: 54,
                  letterSpacing: -1,
                  textAlign: "left",
                  color: "#AAAAAA",
                  alignSelf: "flex-start",
                  marginRight: 32,
                }}
                inputStyle={{
                  fontFamily: "Graphik-Bold-App",
                  fontSize: 54,
                  fontWeight: 600,
                  lineHeight: 54,
                  letterSpacing: -1,
                  textAlign: "left",
                  color: "#AAAAAA",
                }}
                value={props.pageItem.order.toString().padStart(2, "0") ?? ""}
                isEditable={false}
              ></EditableText>
            )}
            {youtubeID && (
              <div>
                <iframe
                  title="Teaching Pre-roll"
                  className="LiveVideoPlayerIframe"
                  allowFullScreen
                  style={{
                    width: isBrowser ? 606 : isTablet ? 375 : 320,
                    height: isBrowser ? 382 : isTablet ? 210 : 179,
                    marginLeft: isMobile ? 120 : "null",
                  }}
                  src={
                    "https://www.youtube.com/embed/" +
                    youtubeID +
                    "?color=white&autoplay=0&cc_load_policy=1&showTitle=0&controls=1&modestbranding=1&rel=0"
                  }
                  frameBorder="0"
                  allow="speakers; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                <br />
              </div>
            )}

            {imageUrl && !youtubeID ? (
              <Animated.View
                onLayout={fadeAnimation}
                style={[styles.style.resourceHeaderImgView, { opacity: fadeValue }]}
              >
                <Image
                  style={styles.style.resourceHeaderImg}
                  source={imageUrl}
                  onError={() => {
                    getImage(props.pageItem.image)
                  }}
                ></Image>
              </Animated.View>
            ) : null}
          </>
        </View>

        <View
          style={{
            zIndex: 6000 + props.pageItemIndex.length,
            marginLeft: isMobile ? 10 : 82,
            paddingRight: isMobile ? 0 : 54,
            width: 670,
          }}
        >
          <View style={{ flex: 1 }}>
            <EditableText
              multiline={true}
              textStyle={{
                fontFamily: "Graphik-Regular-App",
                fontSize: 27,
                fontWeight: 600,
                lineHeight: 36,
                textAlign: "left",
                color: "#404040",
                // marginRight: isBrowser ? 310 : isTablet ? 50 : 45,
              }}
              inputStyle={{ margin: 10 }}
              value={props.pageItem.title1 ?? ""}
              isEditable={false}
            ></EditableText>
          </View>
          {buttonItems.length > 0 ? (
            <View style={{ zIndex: 6000 + props.pageItemIndex.length }}>
              {isSubscribed ? (
                <DropDownPicker
                  value={dropdownValue}
                  setValue={setDropdownValue}
                  open={open}
                  setOpen={setOpen}
                  zIndex={6000 + props.pageItemIndex.length}
                  items={buttonItems}
                  placeholder="Download"
                  containerStyle={{
                    height: 40,
                    width: 200,
                    zIndex: 5000 + props.pageItemIndex.length,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: "#FF4438",
                    width: 200,
                    zIndex: 5000 + props.pageItemIndex.length,
                  }}
                  style={{
                    margin: 3,
                    flexDirection: "row",
                    backgroundColor: "#FF4438",
                    zIndex: 5000 + props.pageItemIndex.length,
                  }}
                  listItemContainerStyle={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: 100,
                    zIndex: 5000 + props.pageItemIndex.length,
                  }}
                  labelStyle={{
                    fontSize: 14,
                    textAlign: "left",
                    color: "#FFFFFF",
                    fontWeight: "600",
                    alignSelf: "center",
                    zIndex: 5000 + props.pageItemIndex.length,
                  }}
                  // arrowColor="#FFFFFF"
                  onChangeValue={(item: typeof buttonItems[0]) => {
                    console.log(item)
                    if (item) window.location.href = item.value
                  }}
                />
              ) : (
                <NotSubscribedButton onPress={() => setNotSubscribedModal(true)} />
              )}
            </View>
          ) : null}
        </View>
        <View>
          <EditableText
            multiline={true}
            textStyle={{
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 24,
              textAlign: "left",
              color: "#404040",
            }}
            inputStyle={{
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 24,
              textAlign: "left",
              color: "#404040",
            }}
            value={props.pageItem.title2 ?? ""}
            isEditable={false}
          ></EditableText>
        </View>
        <View style={{ zIndex: 0, marginLeft: isMobile ? 10 : "4rem" }}>
          <EditableText
            multiline={true}
            textStyle={{
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 24,
              textAlign: "left",
              color: "#404040",
              zIndex: 0,
            }}
            inputStyle={{
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 24,
              textAlign: "left",
              color: "#404040",
            }}
            value={props.pageItem.description1 ?? ""}
            isEditable={false}
          ></EditableText>
        </View>
        <View>
          <PageItemSettings
            pageItemIndex={props.pageItemIndex}
            save={props.save}
            delete={props.delete}
            pageItem={props.pageItem}
            hideEditButton={props.hideEditButton}
          ></PageItemSettings>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function RenderManualCard(props: Props): JSX.Element | null {
  const styles = MainStyles.getInstance()

  const resourceContext = useContext(ResourceContext)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [fadeValue, setFadeValue] = useState<Animated.Value>(new Animated.Value(0))
  const [retries, setRetries] = useState<number>(5)
  const fadeAnimation = (): void => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 3250,
      useNativeDriver: true,
    }).start()
  }
  const getImage = async (img: any): Promise<void> => {
    console.log("GetImage Manual")
    console.log(img)
    if (img == null) return
    console.log("2")
    if (img != null && retries > 0) {
      console.log("3")
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      console.log("4")

      console.log(z)
      setImageUrl(z)
      setImage(img)
      setRetries(retries - 1)
    }
  }
  useEffect(() => {
    const updateImage = async () => {
      if (props.pageItem && (imageUrl == null || image != props.pageItem.image))
        await getImage(props.pageItem.image)
    }
    updateImage()
  })

  return (
    <>
      <Text>Manual</Text>
      <TouchableOpacity
        onPress={() => {
          if (props.pageItem.url) {
            window.location.href = props.pageItem.url ?? ""
          } else {
            props.navigation?.navigate("ResourceDisplayScreen", {
              id: resourceContext.resourceState?.groupData?.id,
              resource: props.pageItem.resourceID,
              series: props.pageItem.seriesID,
              episode: props.pageItem.episodeID,
            })
          }
        }}
      >
        <View
          style={[
            styles.style.resourceGroupCard,
            {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#E4E1E1",
              width: "94%",
              borderRadius: 8,
              marginBottom: 30,
            },
          ]}
        >
          <View
            style={{
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 27,
              borderRadius: 8,
            }}
          >
            {imageUrl ? (
              <Animated.View
                onLayout={fadeAnimation}
                style={[
                  styles.style.resourceHeaderImgView,
                  { opacity: fadeValue, borderRadius: 8 },
                ]}
              >
                <Image
                  style={{
                    flex: 1,
                    height: 211,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderColor: "#E4E1E1",
                  }}
                  source={imageUrl}
                  onError={() => {
                    getImage(props.pageItem.image)
                  }}
                ></Image>
              </Animated.View>
            ) : null}
          </View>

          <View style={{ paddingTop: 0, paddingLeft: 27, paddingRight: 27 }}>
            <EditableText
              multiline={false}
              textStyle={{
                margin: 0,
                fontFamily: "Graphik-Semibold-App",
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 18,
                letterSpacing: 0.5,
                textAlign: "left",
                color: "#FF4438",
                textTransform: "uppercase",
              }}
              inputStyle={{
                margin: 0,
                fontFamily: "Graphik-Semibold-App",
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 18,
                letterSpacing: 0.5,
                textAlign: "left",
                color: "#FF4438",
                textTransform: "uppercase",
              }}
              value={props.pageItem.title1 ?? ""}
              isEditable={false}
            ></EditableText>
          </View>
          <View style={{ paddingTop: 0, paddingLeft: 27, paddingRight: 27 }}>
            <EditableText
              multiline={false}
              textStyle={{
                margin: 0,
                fontFamily: "Graphik-Semibold-App",
                fontSize: 24,
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: 36,
                textAlign: "left",
                color: "#483938",
              }}
              inputStyle={{
                margin: 0,
                fontFamily: "Graphik-Semibold-App",
                fontSize: 24,
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: 36,
                textAlign: "left",
                color: "#483938",
              }}
              value={props.pageItem.title2 ?? ""}
              isEditable={false}
            ></EditableText>
          </View>
          <View
            style={{
              paddingTop: 0,
              paddingLeft: 27,
              paddingBottom: 30,
              paddingRight: 27,
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <EditableText
              multiline={false}
              textStyle={{
                margin: 0,
                fontFamily: "Graphik-Regular-App",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: 24,
                textAlign: "left",
                color: "#6A5E5D",
              }}
              inputStyle={{
                margin: 0,
                fontFamily: "Graphik-Regular-App",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: 24,

                textAlign: "left",
                color: "#6A5E5D",
              }}
              value={props.pageItem.description1 ?? ""}
              isEditable={false}
              numberOfLines={5}
              ellipsizeMode="tail"
            ></EditableText>
          </View>
        </View>
      </TouchableOpacity>
      <PageItemSettings
        pageItemIndex={props.pageItemIndex}
        save={props.save}
        delete={props.delete}
        pageItem={props.pageItem}
        hideEditButton={props.hideEditButton}
      ></PageItemSettings>
    </>
  )
}
function RenderAutoCard(props: Props): JSX.Element | null {
  const styles = MainStyles.getInstance()

  const resourceContext = useContext(ResourceContext)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [fadeValue, setFadeValue] = useState<Animated.Value>(new Animated.Value(0))
  const [retries, setRetries] = useState<number>(5)
  const fadeAnimation = (): void => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 3250,
      useNativeDriver: true,
    }).start()
  }
  const getYoutubeId = (
    item: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData
  ): string | null => {
    const youtube = item?.details?.filter((z) => z?.type == ResourceDetailType.DefaultYoutube)
    console.log({ youtube: youtube })
    if (youtube && youtube?.length && youtube?.length > 0) return youtube[0]!.value
    else return null
  }
  const icon = (): React.ReactNode => {
    return <Ionicons name="md-menu" style={styles.style.resourceIcon} />
  }
  const getImage = async (img: any): Promise<void> => {
    console.log("GetImage")
    console.log(img)
    if (img == null) return
    if (img != null && retries > 0) {
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      console.log(z)
      setImageUrl(z)
      setImage(img)
      setRetries(retries - 1)
    }
  }

  if (!resourceContext.resourceState) return null
  if (resourceContext.resourceState.currentResource == null) return null
  let item: GetResourceEpisodeData | GetResourceSeriesData | GetResourceData
  if (props.pageItem.episodeID != null && props.pageItem.episodeID != undefined)
    item = resourceContext.resourceActions.getEpisodeByID(
      props.pageItem.resourceID,
      props.pageItem.seriesID,
      props.pageItem.episodeID
    )
  else if (props.pageItem.seriesID != null && props.pageItem.seriesID != undefined)
    item = resourceContext.resourceActions.getSeriesByID(
      props.pageItem.resourceID,
      props.pageItem.seriesID
    )
  else {
    item = resourceContext.resourceActions.getResourceByID(props.pageItem.resourceID)
  }

  if (item as GetResourceSeriesData | GetResourceEpisodeData) {
    if (
      props.pageItem &&
      (imageUrl == null ||
        image != (item as GetResourceSeriesData | GetResourceEpisodeData)?.imageFile)
    )
      getImage((item as GetResourceSeriesData | GetResourceEpisodeData)?.imageFile)
  } else {
    if (props.pageItem && (imageUrl == null || image != (item as GetResourceData)?.image))
      getImage((item as GetResourceData)?.image)
  }

  const youtubeID = getYoutubeId(item)
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (props.pageItem.url) {
            window.location.href = props.pageItem.url ?? ""
          } else {
            console.log("NAVIGATE")
            props.navigation?.navigate("ResourceDisplayScreen", {
              id: resourceContext.resourceState?.groupData?.id,
              resource: props.pageItem.resourceID,
              series: props.pageItem.seriesID,
              episode: props.pageItem.episodeID,
            })
          }
        }}
      >
        <View
          style={[
            styles.style.resourceGroupCard,
            {
              borderWidth: 1,
              borderColor: "#E4E1E1",
              borderRadius: 8,
              marginBottom: 30,
            },
          ]}
        >
          <View>
            {youtubeID && (
              <div>
                <iframe
                  title="Teaching Pre-roll"
                  className="LiveVideoPlayerIframe"
                  allowFullScreen
                  src={
                    "https://www.youtube.com/embed/" +
                    youtubeID +
                    "?color=white&autoplay=0&cc_load_policy=1&showTitle=0&controls=1&modestbranding=1&rel=0"
                  }
                  frameBorder="0"
                  allow="speakers; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                <br />
              </div>
            )}
            {imageUrl && !youtubeID ? (
              <Animated.View
                onLayout={fadeAnimation}
                style={[styles.style.resourceHeaderImgView, { opacity: fadeValue }]}
              >
                <Image
                  style={{
                    width: 424,
                    height: 211,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                  source={imageUrl}
                  onError={() => {
                    if (item as GetResourceSeriesData | GetResourceEpisodeData)
                      getImage((item as GetResourceSeriesData | GetResourceEpisodeData)?.imageFile)
                    else getImage((item as GetResourceData)?.image)
                  }}
                ></Image>
              </Animated.View>
            ) : null}
          </View>
          <View style={{ paddingTop: 0, paddingLeft: 27, paddingRight: 27 }}>
            <EditableText
              multiline={false}
              textStyle={{
                margin: 0,
                fontFamily: "Graphik-Bold-App",
                fontSize: 12,
                fontStyle: "bold",
                fontWeight: 800,
                lineHeight: 18,
                letterSpacing: 0.5,
                textAlign: "left",
                color: "#F0493E",
                textTransform: "uppercase",
              }}
              inputStyle={{
                margin: 0,
                fontFamily: "Graphik-Bold-App",
                fontSize: 12,
                fontStyle: "bold",
                fontWeight: 800,
                lineHeight: 18,
                letterSpacing: 0.5,
                textAlign: "left",
                color: "#F0493E",
                textTransform: "uppercase",
              }}
              value={props.pageItem.title1 ?? ""}
              isEditable={false}
            ></EditableText>
          </View>
          <View style={{ paddingTop: 0, paddingLeft: 27, paddingRight: 27 }}>
            <EditableText
              multiline={false}
              textStyle={{
                margin: 0,
                fontFamily: "Graphik-Bold-App",
                fontSize: 24,
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: 36,
                letterSpacing: 0.5,
                textAlign: "left",
                color: "#404040",
              }}
              inputStyle={{
                margin: 0,
                fontFamily: "Graphik-Bold-App",
                fontSize: 24,
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: 36,
                letterSpacing: 0.5,
                textAlign: "left",
                color: "#404040",
              }}
              value={props.pageItem.title2 || (item?.title ?? "")}
              isEditable={false}
            ></EditableText>
          </View>
          <View style={{ paddingTop: 0, paddingLeft: 27, paddingRight: 27 }}>
            <EditableText
              multiline={false}
              textStyle={{
                margin: 0,
                fontFamily: "Graphik-Regular-App",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: 24,
                letterSpacing: 0.5,
                textAlign: "left",
                color: "#333333",
              }}
              inputStyle={{
                margin: 0,
                fontFamily: "Graphik-Regular-App",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: 24,
                letterSpacing: 0.5,
                textAlign: "left",
                color: "#333333",
              }}
              value={item?.description ?? ""}
              isEditable={false}
              numberOfLines={6}
              ellipsizeMode="tail"
            ></EditableText>
          </View>
        </View>
      </TouchableOpacity>
      <PageItemSettings
        pageItemIndex={props.pageItemIndex}
        save={props.save}
        delete={props.delete}
        pageItem={props.pageItem}
        hideEditButton={props.hideEditButton}
      ></PageItemSettings>
    </>
  )
}
export function ResourceCardImpl(props: Props) {
  const [notSubscribedModal, setNotSubscribedModal] = useState<boolean>(false)

  const renderRouter = (): React.ReactNode => {
    switch (props.pageItem.style) {
      case ResourcePageItemStyle.CardManual:
        return <RenderManualCard {...props} />
      case ResourcePageItemStyle.CardAuto:
        return <RenderAutoCard {...props} />
      case ResourcePageItemStyle.CardLarge:
        return <RenderLargeCard {...props} />
      default:
        return <RenderManualCard {...props} />
    }
  }

  return (
    <>
      <NotSubscribedModal
        visible={notSubscribedModal}
        onHide={() => setNotSubscribedModal(false)}
      />
      <View style={{ zIndex: 6000 + props.pageItemIndex.length }}>{renderRouter()}</View>
    </>
  )
}

export default function ResourceCard(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <ResourceCardImpl {...props} navigation={navigation} route={route} />
}
