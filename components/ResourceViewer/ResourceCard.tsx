import { Ionicons } from "@expo/vector-icons"
import Amplify, { Auth, Storage } from "aws-amplify"
import { Card, CardItem, View } from "native-base"
import React from "react"
import { Animated, Image, Picker, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import EditableText from "../../components/Forms/EditableText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import { ResourcePageItemStyle } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"

Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {}
interface State extends JCState {
  imageUrl: any
  image: any
  fadeValue: any
  retry: number
}
class ResourceCard extends JCComponent<Props, State> {
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
      <ResourceCard.Consumer>
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
              {page.state.settings.style == ResourcePageItemStyle.CardManual ? (
                <>
                  <Text>Title 1:</Text>
                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.title1 = val
                      page.setState({ settings: tmp })
                    }}
                    placeholder="Title 1"
                    multiline={false}
                    textStyle={{ margin: 10 }}
                    inputStyle={{ margin: 10 }}
                    value={page.state.settings.title1 ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <Text>Title 2:</Text>

                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.title2 = val
                      page.setState({ settings: tmp })
                    }}
                    placeholder="Title 2"
                    multiline={false}
                    textStyle={{ margin: 10 }}
                    inputStyle={{ margin: 10 }}
                    value={page.state.settings.title2 ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <Text>Description:</Text>
                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.description1 = val
                      page.setState({ settings: tmp })
                    }}
                    placeholder="Description 1"
                    numberOfLines={4}
                    multiline={false}
                    textStyle={{ margin: 10 }}
                    inputStyle={{ margin: 10 }}
                    value={page.state.settings.description1 ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <Text>Navigate To:</Text>
                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.url = val
                      page.setState({ settings: tmp })
                    }}
                    placeholder="target URL"
                    numberOfLines={4}
                    multiline={false}
                    textStyle={{ margin: 10 }}
                    inputStyle={{ margin: 10 }}
                    value={page.state.settings.url ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <View>
                    <JCButton
                      buttonType={ButtonTypes.Transparent}
                      onPress={() => {
                        null
                      }}
                    >
                      <Ionicons
                        size={32}
                        name="ios-image"
                        style={page.styles.style.resourceImageIcon}
                      />
                    </JCButton>
                    <input
                      style={{
                        fontSize: 200,
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        opacity: "0",
                      }}
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (resourceState.currentResource == null) return null
                        console.log("Uploading")
                        const file = e.target.files[0]
                        const lastDot = file.name.lastIndexOf(".")
                        const ext = file.name.substring(lastDot + 1)
                        const user = await Auth.currentCredentials()
                        const userId = user.identityId

                        const fn =
                          "resources/upload/group-" +
                          resourceState.resourceData.id +
                          "-pageId-" +
                          page.state.settings.id +
                          "-card-" +
                          new Date().getTime() +
                          "-upload." +
                          ext
                        console.log({ filename: fn })

                        const fnSave = fn
                          .replace("/upload", "")
                          .replace("-upload.", "-[size].")
                          .replace("." + ext, ".png")

                        console.log("putting")
                        await Storage.put(fn, file, {
                          level: "protected",
                          contentType: file.type,
                          identityId: userId,
                        })
                          .then(() => {
                            console.log("getting")
                            return Storage.get(fn, {
                              level: "protected",
                              identityId: userId,
                            }).then((result2) => {
                              console.log({ fileInfo: result2 })
                              let tmp = page.state.settings
                              tmp.image = {
                                userId: userId,
                                filenameUpload: fn,
                                filenameLarge: fnSave.replace("[size]", "large"),
                                filenameMedium: fnSave.replace("[size]", "medium"),
                                filenameSmall: fnSave.replace("[size]", "small"),
                              }
                              console.log({ settings: tmp })
                              page.setState({ settings: tmp })
                              //this.updatePageItem(menuItemIndex, pageItemIndex, tempPageItems)
                            })

                            // console.log(result)
                          })
                          .catch((err) => console.log(err))
                      }}
                    />
                  </View>
                </>
              ) : (
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
                    selectedValue={page.state.settings.resourceID ?? undefined}
                    onValueChange={(value: any) => {
                      const tmp = page.state.settings
                      tmp.resourceID = value
                      page.setState({ settings: tmp })
                    }}
                  >
                    <Picker.Item key={"null"} label={"None"} value={null} />
                    {resourceState.resourceData?.resources.items.map((org, index: number) => {
                      return <Picker.Item key={index} label={org?.title ?? ""} value={index} />
                    })}
                  </Picker>
                  {page.state.settings.resourceID != null &&
                    page.state.settings.resourceID != undefined && (
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
                        selectedValue={page.state.settings.seriesID}
                        onValueChange={(value: any) => {
                          const tmp = page.state.settings
                          tmp.seriesID = value
                          page.setState({ settings: tmp })
                        }}
                      >
                        <Picker.Item key={"null"} label={"None"} value={null} />
                        {resourceState.resourceData?.resources.items[
                          page.state.settings.resourceID
                        ].series.items.map((org, index: number) => {
                          return <Picker.Item key={index} label={org?.title ?? ""} value={index} />
                        })}
                      </Picker>
                    )}
                  {page.state.settings.resourceID != null &&
                    page.state.settings.resourceID != undefined &&
                    page.state.settings.seriesID != null &&
                    page.state.settings.seriesID != undefined && (
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
                        selectedValue={page.state.settings.episodeID}
                        onValueChange={(value: any) => {
                          const tmp = page.state.settings
                          tmp.episodeID = value
                          page.setState({ settings: tmp })
                        }}
                      >
                        <Picker.Item key={"null"} label={"None"} value={null} />
                        {resourceActions
                          .getSeries(page.state.settings.resourceID, page.state.settings.seriesID)
                          .episodes.items.map((org, index: number) => {
                            return (
                              <Picker.Item key={index} label={org?.title ?? ""} value={index} />
                            )
                          })}
                      </Picker>
                    )}
                </>
              )}
            </>
          )
        }}
      </ResourceCard.Consumer>
    )
  }

  renderManualCard() {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            window.location = this.props.pageItem.url ?? ""
          }}
        >
          <Card style={this.styles.style.resourceGroupCard}>
            <CardItem style={{ paddingLeft: 0, paddingTop: 0, paddingRight: 0, }}>
              {this.state.imageUrl ? (
                <Animated.View
                  onLayout={this.fadeAnimation}
                  style={[
                    this.styles.style.resourceHeaderImgView,
                    { opacity: this.state.fadeValue },
                  ]}
                >
                  <Image
                    style={{ width: 425, height: 211, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
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
                multiline={false}
                textStyle={{ margin: 10 }}
                inputStyle={{ margin: 10 }}
                value={this.props.pageItem.title1 ?? ""}
                isEditable={false}
              ></EditableText>
            </CardItem>
            <CardItem>
              <EditableText
                multiline={false}
                textStyle={{ margin: 10 }}
                inputStyle={{ margin: 10 }}
                value={this.props.pageItem.title2 ?? ""}
                isEditable={false}
              ></EditableText>
            </CardItem>
            <CardItem>
              <EditableText
                multiline={false}
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
  }
  renderAutoCard() {
    return (
      <ResourceCard.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          let item
          if (this.props.pageItem.episodeID != null && this.props.pageItem.episodeID != undefined)
            item = resourceActions.getEpisode(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID,
              this.props.pageItem.episodeID
            )

          if (this.props.pageItem.seriesID != null && this.props.pageItem.seriesID != undefined)
            item = resourceActions.getSeries(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID
            )
          if (this.props.pageItem.resourceID != null && this.props.pageItem.resourceID != undefined)
            item = resourceActions.getResource(this.props.pageItem.resourceID)
          return (
            <Card style={this.styles.style.resourceGroupCard}>
              <CardItem>
                {this.state.imageUrl ? (
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
          )
        }}
      </ResourceCard.Consumer>
    )
  }
  render(): React.ReactNode {
    if (
      this.props.pageItem &&
      (this.state.imageUrl == null || this.state.image != this.props.pageItem.image)
    )
      this.getImage(this.props.pageItem.image)
    return (
      <View>
        {this.props.pageItem.style == ResourcePageItemStyle.CardManual
          ? this.renderManualCard()
          : this.renderAutoCard()}
      </View>
    )
  }
}
export default ResourceCard
