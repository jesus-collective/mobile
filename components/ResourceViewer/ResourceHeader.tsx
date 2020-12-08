import { Container, View } from "native-base"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Image, Text, Animated } from "react-native"
import EditableText from "../Forms/EditableText"
import { ResourceContext } from "./ResourceContext"
import { Storage } from "aws-amplify"
import Amplify from "aws-amplify"
import awsconfig from "../../src/aws-exports"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { EmptyProps } from "../../src/types"

Amplify.configure(awsconfig)

interface State extends JCState {
  imageUrl: any
  image: any
  fadeValue: any
}
class ResourceHeader extends JCComponent<EmptyProps, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: EmptyProps) {
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
    if (img != null) {
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      this.setState({ imageUrl: z, image: img })
    }
  }

  render(): React.ReactNode {
    return (
      <ResourceHeader.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (
            this.state.imageUrl == null ||
            this.state.image !=
              resourceState.resourceData.resources.items[resourceState.currentResource].image
          )
            this.getImage(
              resourceState.resourceData.resources.items[resourceState.currentResource].image
            )
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
                      this.getImage(
                        resourceState.resourceData.resources.items[resourceState.currentResource]
                          .image
                      )
                    }}
                  ></Image>
                </Animated.View>
              ) : null}
              {resourceState.currentSeries == null && resourceState.isEditable ? (
                <View style={this.styles.style.resourcefileInputWrapper}>
                  <JCButton
                    buttonType={ButtonTypes.Transparent}
                    onPress={() => {
                      null
                    }}
                  >
                    <Ionicons
                      size={32}
                      name="ios-image"
                      style={this.styles.style.resourceImageIcon}
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
                    onChange={(e) =>
                      resourceActions.updateResourceImage(resourceState.currentResource, e)
                    }
                  />
                </View>
              ) : null}
              {resourceState.currentEpisode != null ? (
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
                    onChange={(val) => {
                      resourceActions.updateEpisode(
                        resourceState.currentResource,
                        resourceState.currentSeries,
                        resourceState.currentEpisode,
                        "title",
                        val
                      )
                    }}
                    multiline={false}
                    inputStyle={this.styles.style.fontResourceHeaderBold}
                    textStyle={this.styles.style.fontCourseHeaderBold}
                    value={
                      resourceState.resourceData.resources.items[resourceState.currentResource]
                        .series.items[resourceState.currentSeries].episodes.items[
                        resourceState.currentEpisode
                      ].title
                    }
                    isEditable={resourceState.isEditable}
                  ></EditableText>
                </View>
              ) : resourceState.currentSeries != null ? (
                resourceState.resourceData.resources.items[resourceState.currentResource] ? (
                  <View style={this.styles.style.resourcefileFieldWrapper}>
                    <JCButton
                      buttonType={ButtonTypes.Transparent}
                      onPress={() => {
                        resourceActions.clearSeries()
                      }}
                    >
                      <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} />
                      <Text>Back</Text>
                    </JCButton>
                    <EditableText
                      onChange={(val) => {
                        resourceActions.updateSeries(
                          resourceState.currentResource,
                          resourceState.currentSeries,
                          "title",
                          val
                        )
                      }}
                      multiline={false}
                      inputStyle={this.styles.style.fontResourceHeaderBold}
                      textStyle={this.styles.style.fontCourseHeaderBold}
                      value={
                        resourceState.resourceData.resources.items[resourceState.currentResource]
                          .series.items[resourceState.currentSeries].title
                      }
                      isEditable={resourceState.isEditable}
                    ></EditableText>
                  </View>
                ) : null
              ) : resourceState.resourceData.resources.items[resourceState.currentResource] ? (
                <View style={this.styles.style.resourcefileFieldWrapper}>
                  <EditableText
                    onChange={(val) => {
                      resourceActions.updateResource(resourceState.currentResource, "title", val)
                    }}
                    multiline={true}
                    inputStyle={this.styles.style.fontResourceHeaderBold}
                    textStyle={this.styles.style.fontResourceHeaderBold}
                    value={
                      resourceState.resourceData.resources.items[resourceState.currentResource]
                        .title
                    }
                    isEditable={resourceState.isEditable}
                  ></EditableText>
                  <View style={this.styles.style.resourceHeaderAgeGroupBox}>
                    <EditableText
                      onChange={(val) => {
                        resourceActions.updateResource(
                          resourceState.currentResource,
                          "subtitle",
                          val
                        )
                      }}
                      multiline={false}
                      inputStyle={this.styles.style.resourceHeaderAgeGroupBoxText}
                      textStyle={this.styles.style.resourceHeaderAgeGroupBoxText}
                      value={
                        resourceState.resourceData.resources.items[resourceState.currentResource]
                          .subtitle
                      }
                      isEditable={resourceState.isEditable}
                    ></EditableText>
                  </View>

                  {resourceState.resourceData.resources.items[resourceState.currentResource]
                    .title != "Overview" ? (
                    <EditableText
                      onChange={(val) => {
                        resourceActions.updateResource(
                          resourceState.currentResource,
                          "description",
                          val
                        )
                      }}
                      multiline={true}
                      inputStyle={this.styles.style.fontResourceHeaderDescription}
                      textStyle={this.styles.style.fontResourceHeaderDescription}
                      value={
                        resourceState.resourceData.resources.items[resourceState.currentResource]
                          .description
                      }
                      isEditable={resourceState.isEditable}
                    ></EditableText>
                  ) : (
                    <EditableText
                      onChange={(val) => {
                        resourceActions.updateResource(
                          resourceState.currentResource,
                          "description",
                          val
                        )
                      }}
                      multiline={true}
                      inputStyle={this.styles.style.fontResourceHeaderDescription}
                      textStyle={this.styles.style.fontCourseHeaderDescriptionOverview}
                      value={
                        resourceState.resourceData.resources.items[resourceState.currentResource]
                          .description
                      }
                      isEditable={resourceState.isEditable}
                    ></EditableText>
                  )}
                </View>
              ) : null}
            </Container>
          )
        }}
      </ResourceHeader.Consumer>
    )
  }
}
export default ResourceHeader
