import { Ionicons } from "@expo/vector-icons"
import { Card, CardItem } from "native-base"
import React from "react"
import { Image, TouchableOpacity } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import EditableText from "../Forms/EditableText"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"

interface Props {
  currentResource: number
}

interface State extends JCState {
  showEditorModal: boolean
}

export default class SeriesCard extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
  }
  renderSeriesCardAdmin(state: ResourceState, actions: ResourceActions, series, index: number) {
    if (!state.currentResource) return null
    return state.isEditable ? (
      <CardItem>
        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}>
          {" "}
          <Ionicons size={16} name="ios-arrow-back" style={this.styles.style.icon} />
        </JCButton>
        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}>
          {" "}
          <Ionicons size={16} name="ios-attach" style={this.styles.style.icon} />
        </JCButton>
        <JCButton
          buttonType={ButtonTypes.TransparentNoPadding}
          onPress={() => {
            actions.changeSeries(index)
          }}
        >
          {" "}
          <Ionicons size={16} name="ios-open" style={this.styles.style.icon} />
        </JCButton>
        <JCButton
          buttonType={ButtonTypes.TransparentNoPadding}
          onPress={() => {
            actions.deleteSeries(state.currentResource as number, index)
          }}
        >
          <Ionicons size={16} name="ios-trash" style={this.styles.style.icon} />
        </JCButton>
        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}>
          {" "}
          <Ionicons size={16} name="ios-arrow-forward" style={this.styles.style.icon} />
        </JCButton>
      </CardItem>
    ) : null
  }
  render(state: ResourceState, actions: ResourceActions, series, index: number): React.ReactNode {
    if (!state.currentResource) return null
    const thumbnailIndex = this.findFirstEpisode(series.episodes.items)

    return (
      <Card style={this.styles.style.resourceContentCurrentSeriesCard}>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={series.title}
          accessibilityHint={"Navigate to series " + series.title}
          onPress={() => {
            !state.isEditable ? actions.changeSeries(index) : null
          }}
        >
          <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
            {series.type === "ky-preschool" ? (
              <Image
                accessible={true}
                accessibilityLabel={series.title + " thumbnail"}
                style={{
                  padding: 0,
                  width: "100%",
                  height: "100%",
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                }}
                resizeMode="contain"
                source={{ uri: series.playlistImage }}
              />
            ) : (
              <Image
                accessible={true}
                accessibilityLabel={series.title + " thumbnail"}
                style={{
                  padding: 0,
                  width: "100%",
                  height: "100%",
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                }}
                resizeMode="contain"
                source={{
                  uri:
                    "https://img.youtube.com/vi/" +
                    series.episodes.items[thumbnailIndex]?.videoPreview.replace(
                      "https://youtu.be/",
                      ""
                    ) +
                    "/maxresdefault.jpg",
                }}
              />
            )}
          </CardItem>

          <CardItem
            style={{
              width: "100%",
              padding: 0,
              margin: 0,
              paddingBottom: 0,
              backgroundColor: "#F9FAFC",
            }}
          >
            <EditableText
              onChange={(val) => {
                actions.updateSeries(state.currentResource as number, index, "title", val)
              }}
              multiline={false}
              inputStyle={this.styles.style.seriesTitle}
              textStyle={this.styles.style.seriesTitle}
              value={series.title}
              isEditable={state.isEditable}
            ></EditableText>
          </CardItem>
          <CardItem
            style={{
              width: "100%",
              padding: 0,
              margin: 0,
              backgroundColor: "#F9FAFC",
            }}
          >
            <EditableText
              onChange={(val) => {
                actions.updateSeries(state.currentResource as number, index, "description", val)
              }}
              multiline={true}
              inputStyle={this.styles.style.seriesDescription}
              textStyle={this.styles.style.seriesDescription}
              value={this.stripHTMLTags(series.description)}
              isEditable={state.isEditable}
              ellipsizeMode="tail"
              numberOfLines={3}
            ></EditableText>
          </CardItem>
        </TouchableOpacity>
        {this.renderSeriesCardAdmin(state, actions, series, index)}
      </Card>
    )
  }
}
