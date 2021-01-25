import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import Amplify, { Storage } from "aws-amplify"
import { Card, CardItem, View } from "native-base"
import React from "react"
import { isBrowser, isMobile, isTablet } from "react-device-detect"
import { Animated, Image, Picker, Text } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { TouchableOpacity } from "react-native-gesture-handler"
import EditableText from "../../components/Forms/EditableText"
import { ImageInput, ResourceDetailType, ResourcePageItemStyle } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import {
  GetResourceData,
  GetResourceEpisodeData,
  GetResourceSeriesData,
  ResourceSetupProp,
} from "../../src/types"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"
import ResourceImage from "./ResourceImage"
import ResourceSelector from "./ResourceSelector"
Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {
  navigation?: any
  route?: any
}
interface State extends JCState {
  imageUrl: any
  image: any
  fadeValue: any
  retry: number
}
export class ResourceCardImpl extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      imageUrl: null,
      image: null,
      fadeValue: new Animated.Value(0),
      retry: 5,
    }
  }
  componentDidMount() {
    this.setState({
      imageUrl: null,
      image: null,
      fadeValue: new Animated.Value(0),
      retry: 5,
    })
  }
  fadeAnimation = (): void => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 3250,
      useNativeDriver: true,
    }).start()
  }
  async getImage(img: any): Promise<void> {
    if (img == null) return
    if (img != null && this.state.retry > 0) {
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      this.setState({ imageUrl: z, image: img, retry: this.state.retry - 1 })
    }
  }
  static renderAdmin(page: PageItemSettings): React.ReactNode {
    return (
      <ResourceCardImpl.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
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
                selectedValue={page.state.settings.style ?? undefined}
                onValueChange={(value: ResourcePageItemStyle) => {
                  const tmp = page.state.settings
                  tmp.style = value
                  page.setState({ settings: tmp })
                }}
              >
                {Object.keys(ResourcePageItemStyle)
                  .filter((z) => z.startsWith("Card"))
                  .map((org) => {
                    return <Picker.Item key={org} label={org} value={org} />
                  })}
              </Picker>
              {page.state.settings.style == ResourcePageItemStyle.CardManual ||
              page.state.settings.style == null ? (
                <>
                  <Text style={{ textAlign: "left", width: "100%", fontWeight: "800" }}>
                    Title 1:
                  </Text>
                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.title1 = val
                      page.setState({ settings: tmp })
                    }}
                    placeholder="Title 1"
                    multiline={false}
                    textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
                    inputStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
                    value={page.state.settings.title1 ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <Text
                    style={{ textAlign: "left", width: "100%", fontWeight: "800", marginTop: 15 }}
                  >
                    Title 2:
                  </Text>

                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.title2 = val
                      page.setState({ settings: tmp })
                    }}
                    placeholder="Title 2"
                    multiline={false}
                    textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
                    inputStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
                    value={page.state.settings.title2 ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <Text
                    style={{ textAlign: "left", width: "100%", fontWeight: "800", marginTop: 15 }}
                  >
                    Description:
                  </Text>
                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.description1 = val
                      page.setState({ settings: tmp })
                    }}
                    placeholder="Description 1"
                    numberOfLines={4}
                    multiline={false}
                    textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
                    inputStyle={{ textAlign: "left", width: "100%", fontWeight: "400", height: 130 }}
                    value={page.state.settings.description1 ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <Text
                    style={{ textAlign: "left", width: "100%", fontWeight: "800", marginTop: 15 }}
                  >
                    Navigate To:
                  </Text>
                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.url = val
                      page.setState({ settings: tmp })
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
                    value={page.state.settings.url ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <ResourceImage
                    onUpdate={(image: ImageInput) => {
                      let tmp = page.state.settings
                      tmp.image = image
                      console.log({ settings: tmp })
                      page.setState({ settings: tmp })
                    }}
                    fileName={
                      "resources/upload/group-" +
                      resourceState.resourceData?.id +
                      "-pageId-" +
                      page.state.settings.id +
                      "-card-"
                    }
                    currentImage={page.state.settings.image}
                  ></ResourceImage>
                </>
              ) : (
                ResourceSelector.render(page, resourceState, resourceActions)
              )}
            </>
          )
        }}
      </ResourceCardImpl.Consumer>
    )
  }

  renderManualCard() {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            if (this.props.pageItem.url) {
              window.location.href = this.props.pageItem.url ?? ""
            } else {
              this.props.navigation.navigate("ResourceDisplayScreen", {
                id: this.props.resourceState.groupData?.id,
                resource: this.props.pageItem.resourceID,
                series: this.props.pageItem.seriesID,
                episode: this.props.pageItem.episodeID,
              })
            }
          }}
        >
          <Card style={this.styles.style.resourceGroupCard}>
            <CardItem style={{ paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 27 }}>
              {this.state.imageUrl ? (
                <Animated.View
                  onLayout={this.fadeAnimation}
                  style={[
                    this.styles.style.resourceHeaderImgView,
                    { opacity: this.state.fadeValue },
                  ]}
                >
                  <Image
                    style={{
                      width: 425,
                      height: 211,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    source={this.state.imageUrl}
                    onError={() => {
                      this.getImage(this.props.pageItem.image)
                    }}
                  ></Image>
                </Animated.View>
              ) : null}
            </CardItem>

            <CardItem
              style={{ paddingTop: 0, paddingLeft: 27, paddingRight: 27, paddingBottom: 3 }}
            >
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
                value={this.props.pageItem.title1 ?? ""}
                isEditable={false}
              ></EditableText>
            </CardItem>
            <CardItem
              style={{ paddingTop: 0, paddingLeft: 27, paddingRight: 27, paddingBottom: 10 }}
            >
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
                value={this.props.pageItem.title2 ?? ""}
                isEditable={false}
              ></EditableText>
            </CardItem>
            <CardItem
              style={{ paddingTop: 0, paddingLeft: 27, paddingRight: 27, paddingBottom: 30 }}
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
                value={this.props.pageItem.description1 ?? ""}
                isEditable={false}
                numberOfLines={6}
                ellipsizeMode="tail"
              ></EditableText>
            </CardItem>
          </Card>
        </TouchableOpacity>
        <PageItemSettings
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex}
          save={this.props.save}
          delete={this.props.delete}
          pageItem={this.props.pageItem}
          hideEditButton={this.props.hideEditButton}
        ></PageItemSettings>
      </>
    )
  }
  getYoutubeId(
    item: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData
  ): string | null {
    const youtube = item?.details?.filter((z) => z?.type == ResourceDetailType.DefaultYoutube)
    console.log(youtube)
    if (youtube?.length && youtube?.length > 0) return youtube[0]!.value
    else return null
  }
  getButtonItems(items: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData) {
    return items?.details
      ?.filter((e) => e?.type == ResourceDetailType.Button)
      .map((item) => {
        return {
          label: item?.text,
          value: item?.value,
          icon: () => <Ionicons name="md-menu" style={this.styles.style.resourceIcon} />,
        }
      })
  }

  renderLargeCard() {
    return (
      <ResourceCardImpl.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          let item: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData
          if (this.props.pageItem.episodeID != null && this.props.pageItem.episodeID != undefined)
            item = resourceActions.getEpisodeByID(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID,
              this.props.pageItem.episodeID
            )
          else if (
            this.props.pageItem.seriesID != null &&
            this.props.pageItem.seriesID != undefined
          )
            item = resourceActions.getSeriesByID(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID
            )
          else {
            item = resourceActions.getResourceByID(this.props.pageItem.resourceID)
          }

          const youtubeID = this.getYoutubeId(item)
          const buttonItems = this.getButtonItems(item)
          return (
            <TouchableOpacity
              onPress={() => {
                if (this.props.pageItem.url) {
                  window.location.href = this.props.pageItem.url ?? ""
                } else {
                  console.log("NAVIGATE")
                  if (this.props.pageItem.episodeID == null)
                    this.props.navigation.navigate("ResourceDisplayScreen", {
                      id: this.props.resourceState.groupData?.id,
                      resource: this.props.pageItem.resourceID,
                      series: this.props.pageItem.seriesID,
                      episode: this.props.pageItem.episodeID,
                    })
                }
              }}
            >
              <Card
                style={[
                  this.styles.style.resourceSeries,
                  { zIndex: 6000 + this.props.pageItemIndex.length },
                ]}
              >
                <CardItem
                  style={{
                    paddingLeft: isMobile ? 20 : 0,
                    paddingRight: isMobile ? 20 : 0,
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <>
                    {this.props.pageItem.order && (
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
                          marginRight: 15,
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
                        value={this.props.pageItem.order.toString().padStart(2, "0") ?? ""}
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
                            width: isBrowser ? 638 : isTablet ? 375 : 320,
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

                    {this.state.imageUrl && !youtubeID ? (
                      <Animated.View
                        onLayout={this.fadeAnimation}
                        style={[
                          this.styles.style.resourceHeaderImgView,
                          { opacity: this.state.fadeValue },
                        ]}
                      >
                        <Image
                          style={this.styles.style.resourceHeaderImg}
                          source={this.state.imageUrl}
                          onError={() => {
                            this.getImage(this.props.pageItem.image)
                          }}
                        ></Image>
                      </Animated.View>
                    ) : null}
                  </>
                </CardItem>

                <CardItem
                  style={{
                    zIndex: 6000 + this.props.pageItemIndex.length,
                    marginLeft: isMobile ? 10 : "4rem",
                  }}
                >
                  <EditableText
                    multiline={true}
                    textStyle={{
                      fontFamily: "Graphik-Regular-App",
                      fontSize: 27,
                      fontWeight: 600,
                      lineHeight: 36,
                      textAlign: "left",
                      color: "#404040",
                      marginRight: isBrowser ? 310 : isTablet ? 50 : 45,
                    }}
                    inputStyle={{ margin: 10 }}
                    value={this.props.pageItem.title1 ?? ""}
                    isEditable={false}
                  ></EditableText>
                  {buttonItems?.length && buttonItems.length > 0 ? (
                    <View style={{ zIndex: 6000 + this.props.pageItemIndex.length }}>
                      <DropDownPicker
                        zIndex={6000 + this.props.pageItemIndex.length}
                        items={buttonItems}
                        placeholder="Download"
                        containerStyle={{
                          height: 40,
                          width: 160,
                          zIndex: 5000 + this.props.pageItemIndex.length,
                          marginTop: 5, 
                          marginBottom: 5
                        }}
                        dropDownStyle={{
                          backgroundColor: "#FF4438",
                          width: 225,
                          zIndex: 5000 + this.props.pageItemIndex.length,
                        }}
                        style={{
                          backgroundColor: "#FF4438",
                          zIndex: 5000 + this.props.pageItemIndex.length,
                        }}
                        itemStyle={{
                          justifyContent: "flex-start",
                          width: 100,
                          zIndex: 5000 + this.props.pageItemIndex.length,
                        }}
                        labelStyle={{
                          fontSize: 14,
                          textAlign: "left",
                          color: "#FFFFFF",
                          fontWeight: 600,
                        alignSelf: 'center',
                          zIndex: 5000 + this.props.pageItemIndex.length,
                        }}
                        arrowColor="#FFFFFF"
                        onChangeItem={(item) => {
                          window.location = item.value ?? ""
                        }}
                      />
                    </View>
                  ) : null}
                </CardItem>
                <CardItem>
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
                    value={this.props.pageItem.title2 ?? ""}
                    isEditable={false}
                  ></EditableText>
                </CardItem>
                <CardItem style={{ zIndex: 0, marginLeft: isMobile ? 10 : "4rem" }}>
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
                    value={this.props.pageItem.description1 ?? ""}
                    isEditable={false}
                  ></EditableText>
                </CardItem>
                <CardItem>
                  <PageItemSettings
                    resourceActions={this.props.resourceActions}
                    resourceState={this.props.resourceState}
                    pageItemIndex={this.props.pageItemIndex}
                    save={this.props.save}
                    delete={this.props.delete}
                    pageItem={this.props.pageItem}
                    hideEditButton={this.props.hideEditButton}
                  ></PageItemSettings>
                </CardItem>
              </Card>
            </TouchableOpacity>
          )
        }}
      </ResourceCardImpl.Consumer>
    )
  }
  renderAutoCard() {
    return (
      <ResourceCardImpl.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          let item
          if (this.props.pageItem.episodeID != null && this.props.pageItem.episodeID != undefined)
            item = resourceActions.getEpisodeByID(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID,
              this.props.pageItem.episodeID
            )
          else if (
            this.props.pageItem.seriesID != null &&
            this.props.pageItem.seriesID != undefined
          )
            item = resourceActions.getSeriesByID(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID
            )
          else {
            item = resourceActions.getResourceByID(this.props.pageItem.resourceID)
          }
          const youtubeID = this.getYoutubeId(item)
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  if (this.props.pageItem.url) {
                    window.location.href = this.props.pageItem.url ?? ""
                  } else {
                    console.log("NAVIGATE")
                    this.props.navigation.navigate("ResourceDisplayScreen", {
                      id: this.props.resourceState.groupData?.id,
                      resource: this.props.pageItem.resourceID,
                      series: this.props.pageItem.seriesID,
                      episode: this.props.pageItem.episodeID,
                    })
                  }
                }}
              >
                <Card style={this.styles.style.resourceGroupCard}>
                  <CardItem>
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
                    {this.state.imageUrl && !youtubeID ? (
                      <Animated.View
                        onLayout={this.fadeAnimation}
                        style={[
                          this.styles.style.resourceHeaderImgView,
                          { opacity: this.state.fadeValue },
                        ]}
                      >
                        <Image
                          style={this.styles.style.resourceHeaderImg}
                          source={this.state.imageUrl}
                          onError={() => {
                            this.getImage(this.props.pageItem.image)
                          }}
                        ></Image>
                      </Animated.View>
                    ) : null}
                  </CardItem>

                  <CardItem>
                    <EditableText
                      multiline={true}
                      textStyle={{ margin: 10 }}
                      inputStyle={{ margin: 10 }}
                      value={this.props.pageItem.title1 ?? ""}
                      isEditable={false}
                    ></EditableText>
                  </CardItem>
                  <CardItem>
                    <EditableText
                      multiline={true}
                      textStyle={{ margin: 10 }}
                      inputStyle={{ margin: 10 }}
                      value={this.props.pageItem.title2 ?? ""}
                      isEditable={false}
                    ></EditableText>
                  </CardItem>
                  <CardItem>
                    <EditableText
                      multiline={true}
                      textStyle={{ margin: 10 }}
                      inputStyle={{ margin: 10 }}
                      value={this.props.pageItem.description1 ?? ""}
                      isEditable={false}
                    ></EditableText>
                  </CardItem>
                </Card>
              </TouchableOpacity>
              <PageItemSettings
                resourceActions={this.props.resourceActions}
                resourceState={this.props.resourceState}
                pageItemIndex={this.props.pageItemIndex}
                save={this.props.save}
                delete={this.props.delete}
                pageItem={this.props.pageItem}
                hideEditButton={this.props.hideEditButton}
              ></PageItemSettings>
            </>
          )
        }}
      </ResourceCardImpl.Consumer>
    )
  }
  renderRouter() {
    switch (this.props.pageItem.style) {
      case ResourcePageItemStyle.CardManual:
        return this.renderManualCard()
      case ResourcePageItemStyle.CardAuto:
        return this.renderAutoCard()
      case ResourcePageItemStyle.CardLarge:
        return this.renderLargeCard()
      default:
        return this.renderManualCard()
    }
  }
  render(): React.ReactNode {
    if (
      this.props.pageItem &&
      (this.state.imageUrl == null || this.state.image != this.props.pageItem.image)
    )
      this.getImage(this.props.pageItem.image)
    return (
      <View style={{ zIndex: 6000 + this.props.pageItemIndex.length }}>{this.renderRouter()}</View>
    )
  }
}

export default function ResourceCard(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <ResourceCardImpl {...props} navigation={navigation} route={route} />
}
