import { AntDesign, Ionicons } from "@expo/vector-icons"
import { Card, CardItem, Container } from "native-base"
import React from "react"
import { Dimensions, Image, Text } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import EditableText from "../Forms/EditableText"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"

interface Props {
  currentResource: number
}

interface State extends JCState {
  showEditorModal: boolean
}

export default class EpisodeCard extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
  }

  renderEpisodeCardAdmin(
    state: ResourceState,
    actions: ResourceActions,
    series,
    episode,
    index: number
  ) {
    if (!state.currentResource) return null
    if (!state.currentSeries) return null
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
            actions.changeEpisode(index)
          }}
        >
          {" "}
          <Ionicons size={16} name="ios-open" style={this.styles.style.icon} />
        </JCButton>

        <JCButton
          buttonType={ButtonTypes.TransparentNoPadding}
          onPress={() => {
            actions.deleteEpisode(
              state.currentResource as number,
              state.currentSeries as number,
              index
            )
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
  renderEditor(state: ResourceState, actions: ResourceActions): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showEditorModal}
        title="Configure Episode"
        onHide={() => {
          this.setState({ showEditorModal: false })
        }}
      >
        <>
          <Text>test</Text>
        </>
      </JCModal>
    )
  }
  render(state: ResourceState, actions: ResourceActions, series, episode, index: number) {
    if (!state.currentResource) return null
    if (!state.currentSeries) return null
    const img = series.playlistImage
    const seriesTitle = series.title
    return (
      <Card
        key={episode.id}
        style={{
          padding: 0,
          marginLeft: 0,
          marginRight: 0,
          borderRadius: 4,
          width: "100%",
          borderColor: "#ffffff",
          height:
            (episode.lessonPlan || episode.activityPage) &&
            (episode.videoLowRes || episode.videoHiRes)
              ? index === 0
                ? Dimensions.get("window").width * (9 / 16) + 175 + 25
                : 175 + 25
              : index === 0
              ? Dimensions.get("window").width * (9 / 16) + 112 + 25
              : 112 + 25,
        }}
      >
        <CardItem style={{ width: "100%", paddingRight: 0, paddingLeft: 0 }}>
          <Container style={this.styles.style.resourceContentEpisodesCardInnerContainer}>
            {index === 0 ? (
              <Image
                accessible={true}
                accessibilityLabel={seriesTitle + " series graphic"}
                style={this.styles.style.resourceContentEpisodesIframe}
                source={{ uri: img }}
              />
            ) : null}
            <CardItem>
              <EditableText
                onChange={(val) => {
                  actions.updateEpisode(
                    state.currentResource as number,
                    state.currentSeries as number,
                    index,
                    "title",
                    val
                  )
                }}
                multiline={false}
                inputStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                textStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                value={episode.title}
                isEditable={state.isEditable}
              ></EditableText>
            </CardItem>
            {episode.videoLowRes || episode.videoHiRes ? (
              <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer}>
                <Text style={this.styles.style.resourceContentEpisodesEpisodeTitle}>Video</Text>
                <CardItem
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                >
                  {episode.videoLowRes ? (
                    <JCButton
                      buttonType={ButtonTypes.TransparentRegularOrange}
                      onPress={() => (window.location.href = episode.videoLowRes)}
                    >
                      <AntDesign
                        name="download"
                        size={24}
                        color="F0493E"
                        style={{ marginRight: 12 }}
                      />
                      Low
                    </JCButton>
                  ) : null}
                  {episode.videoHiRes ? (
                    <JCButton
                      buttonType={ButtonTypes.SolidResources}
                      onPress={() => (window.location.href = episode.videoHiRes)}
                    >
                      <AntDesign
                        name="download"
                        size={24}
                        color="white"
                        style={{ marginRight: 12 }}
                      />
                      High Quality
                    </JCButton>
                  ) : null}
                </CardItem>
              </CardItem>
            ) : null}

            {episode.lessonPlan || episode.activityPage ? (
              <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer2}>
                <CardItem
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                >
                  {episode.lessonPlan ? (
                    <JCButton
                      buttonType={ButtonTypes.TransparentRegularOrange}
                      onPress={() => (window.location.href = episode.lessonPlan)}
                    >
                      <AntDesign
                        name="download"
                        size={24}
                        color="F0493E"
                        style={{ marginRight: 12 }}
                      />
                      Lesson Plan
                    </JCButton>
                  ) : null}
                  {episode.activityPage ? (
                    <JCButton
                      buttonType={ButtonTypes.SolidResources}
                      onPress={() => (window.location.href = episode.activityPage)}
                    >
                      <AntDesign
                        name="download"
                        size={24}
                        color="white"
                        style={{ marginRight: 12 }}
                      />
                      Activity Page
                    </JCButton>
                  ) : null}
                </CardItem>
              </CardItem>
            ) : null}
          </Container>
        </CardItem>
        {this.renderEpisodeCardAdmin(state, actions, series, episode, index)}
      </Card>
    )
  }
}
