import { Container } from "native-base"
import React from "react"
import { Text } from "react-native"
import EditableText from "../Forms/EditableText"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"

interface Props {
  currentResource: number
}

interface State extends JCState {
  showEditorModal: boolean
}

export default class Episode extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
  }

  render(state: ResourceState, actions: ResourceActions): React.ReactNode {
    if (!state.currentResource) return null
    if (!state.currentSeries) return null
    if (!state.currentEpisode) return null
    const series =
      state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries]
    const episode =
      state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries]
        .episodes.items[state.currentEpisode]
    return (
      <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
        <Container style={this.styles.style.resourceContentEpisodeLeftContainer}>
          <EditableText
            key={this.generateKey(state) + "a"}
            onChange={(val) => {
              actions.updateEpisode(
                state.currentResource as number,
                state.currentSeries as number,
                state.currentEpisode as number,
                "title",
                val
              )
            }}
            multiline={false}
            inputStyle={this.styles.style.headerEpisodeTitle}
            textStyle={this.styles.style.headerEpisodeTitle}
            value={episode.title}
            isEditable={state.isEditable}
          ></EditableText>

          <iframe
            style={{ padding: 0, border: 0, width: 600, height: 336 }}
            src={
              "https://www.youtube.com/embed/" +
              episode.videoPreview.replace("https://youtu.be/", "")
            }
          />

          <EditableText
            key={this.generateKey(state) + "b"}
            onChange={(val) => {
              actions.updateEpisode(
                state.currentResource as number,
                state.currentSeries as number,
                state.currentEpisode as number,
                "description",
                val
              )
            }}
            multiline={true}
            inputStyle={this.styles.style.headerEpisodeDescription}
            textStyle={this.styles.style.headerEpisodeDescription}
            value={episode.description}
            isEditable={state.isEditable}
          ></EditableText>

          {/*}  <Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].category}</Text>*/}

          {series.allFiles ? (
            <a href={series.allFiles}>
              <Text>All series files</Text>
            </a>
          ) : null}
          {series.playlist ? (
            <a href={series.playlist}>
              <Text>Series Playlist</Text>
            </a>
          ) : null}
          {episode.videoPreview ? (
            <a href={episode.videoPreview}>
              <Text>View Preview</Text>
            </a>
          ) : null}
          {episode.videoLowRes ? (
            <a href={episode.videoLowRes}>
              <Text>Lo Res Video</Text>
            </a>
          ) : null}
          {episode.videoHiRes ? (
            <a href={episode.videoHiRes}>
              <Text>Hi Res Video</Text>
            </a>
          ) : null}
          {episode.lessonPlan ? (
            <a href={episode.lessonPlan}>
              <Text>Lesson Plan</Text>
            </a>
          ) : null}
          {episode.activityPage ? (
            <a href={episode.activityPage}>
              <Text>Activity Page</Text>
            </a>
          ) : null}
        </Container>

        <Container style={this.styles.style.resourceContentEpisodeRightContainer}></Container>
      </Container>
    )
  }
}
