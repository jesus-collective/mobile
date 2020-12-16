import { Ionicons } from "@expo/vector-icons"
import Amplify, { Auth, Storage } from "aws-amplify"
import { Container } from "native-base"
import React from "react"
import { Animated, Image, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import EditableText from "../Forms/EditableText"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"

Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {}
interface State extends JCState {
  imageUrl: any
  image: any
  fadeValue: any
  retries: number
}
class ResourceHeader extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      imageUrl: null,
      image: null,
      fadeValue: new Animated.Value(0),
      retries: 0,
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
    if (this.state.retries > 3) return
    if (img == null) return
    if (img != null) {
      console.log(img)
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      this.setState({ imageUrl: z, image: img, retries: this.state.retries + 1 })
    }
  }
  static renderAdmin(page: PageItemSettings): React.ReactNode {
    return (
      <ResourceHeader.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          return (
            <>
              <EditableText
                onChange={(val) => {
                  const tmp = page.state.settings
                  tmp.title1 = val
                  page.setState({ settings: tmp })
                }}
                placeholder="Title"
                multiline={false}
                inputStyle={page.styles.style.resourceContentEpisodesEpisodeTitle}
                textStyle={page.styles.style.fontCourseHeaderBold}
                value={page.state.settings.title1 ?? ""}
                isEditable={true}
              ></EditableText>
              <EditableText
                onChange={(val) => {
                  const tmp = page.state.settings
                  tmp.title2 = val
                  page.setState({ settings: tmp })
                }}
                placeholder="Sub Title"
                multiline={false}
                inputStyle={page.styles.style.resourceContentEpisodesEpisodeTitle}
                textStyle={page.styles.style.fontCourseHeaderBold}
                value={page.state.settings.title2 ?? ""}
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
                      "-header-" +
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
          )
        }}
      </ResourceHeader.Consumer>
    )
  }

  render(): React.ReactNode {
    return (
      <ResourceHeader.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          if (this.state.imageUrl == null || this.state.image != this.props.pageItem.image)
            this.getImage(this.props.pageItem.image)
          return (
            <Container style={this.styles.style.resourceHeaderImgContainer}>
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
              <View style={this.styles.style.resourcefileFieldWrapper}>
                <EditableText
                  multiline={false}
                  placeholder="Title"
                  inputStyle={this.styles.style.fontResourceHeaderBold}
                  textStyle={this.styles.style.fontCourseHeaderBold}
                  value={this.props.pageItem.title1 ?? ""}
                  isEditable={false}
                ></EditableText>
                <EditableText
                  multiline={false}
                  placeholder="Subtitle"
                  inputStyle={this.styles.style.fontResourceHeaderBold}
                  textStyle={this.styles.style.fontResourceHeaderDescription}
                  value={this.props.pageItem.title2 ?? ""}
                  isEditable={false}
                ></EditableText>
              </View>
              <View style={this.styles.style.resourcefileInputWrapper}>
                <PageItemSettings
                  resourceActions={this.props.resourceActions}
                  resourceState={this.props.resourceState}
                  pageItemIndex={this.props.pageItemIndex}
                  save={this.props.save}
                  delete={this.props.delete}
                  pageItem={this.props.pageItem}
                ></PageItemSettings>
                {/* */}
              </View>
            </Container>
          )
        }}
      </ResourceHeader.Consumer>
    )
  }
}
export default ResourceHeader
