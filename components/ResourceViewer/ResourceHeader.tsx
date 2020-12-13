import { Ionicons } from "@expo/vector-icons"
import Amplify, { Storage } from "aws-amplify"
import { Container } from "native-base"
import React from "react"
import { Animated, Image, Text, View } from "react-native"
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
    if (img != null) {
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      this.setState({ imageUrl: z, image: img })
    }
  }
  static renderAdmin(page: PageItemSettings): React.ReactNode {
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
            <Ionicons size={32} name="ios-image" style={page.styles.style.resourceImageIcon} />
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
            onChange={(e) => {
              if (resourceState.currentResource == null) return null
              resourceActions.updateResourceImage(resourceState.currentResource, e)
            }}
          />
        </View>
      </>
    )
  }

  render(): React.ReactNode {
    return (
      <ResourceHeader.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          if (this.state.imageUrl == null || this.state.image != this.props.pageItem.image)
            this.getImage(this.props.pageItem)
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
                <JCButton
                  buttonType={ButtonTypes.Transparent}
                  onPress={() => {
                    resourceActions.clearEpisode()
                  }}
                >
                  <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} />
                  <Text>Back</Text>
                </JCButton>
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
