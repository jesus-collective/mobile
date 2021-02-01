import Amplify, { Storage } from "aws-amplify"
import React from "react"
import InputColor from "react-input-color"
import { Animated, Image, View } from "react-native"
import { ImageInput } from "src/API"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import EditableText from "../Forms/EditableText"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"
import ResourceImage from "./ResourceImage"
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

  componentDidMount() {
    this.setState({ imageUrl: null, image: null, fadeValue: new Animated.Value(0), retries: 0 })
  }
  fadeAnimation = (): void => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 5600,
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
              <InputColor
                initialValue={page.state.settings.color ?? "#aa0000"}
                onChange={(c) => {
                  const tmp = page.state.settings
                  tmp.color = c.hex
                  page.setState({ settings: tmp })
                }}
                placement="right"
              />
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
                  "-header-"
                }
                currentImage={page.state.settings.image}
              ></ResourceImage>
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
            <View style={this.styles.style.resourceHeaderContainer}>
              <View style={this.styles.style.resourceHeaderImgContainer}>
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
                    textStyle={[
                      this.styles.style.fontResourceHeaderBold,
                      { color: this.props.pageItem.color ?? "#000000" },
                    ]}
                    value={this.props.pageItem.title1 ?? ""}
                    isEditable={false}
                  ></EditableText>
                  <EditableText
                    multiline={false}
                    placeholder="Subtitle"
                    inputStyle={this.styles.style.fontResourceHeaderDescription}
                    textStyle={[
                      this.styles.style.fontResourceHeaderDescription,
                      { color: this.props.pageItem.color ?? "#000000" },
                    ]}
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
              </View>
              <View style={this.styles.style.resourceHeaderImgContainer2}></View>
            </View>
          )
        }}
      </ResourceHeader.Consumer>
    )
  }
}
export default ResourceHeader
