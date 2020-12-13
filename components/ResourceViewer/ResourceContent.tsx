import React from "react"
import { Container, Card, CardItem, ListItem, List } from "native-base"

import { Text, Image, Dimensions, View } from "react-native"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import EditableText from "../Forms/EditableText"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import ResourceMenu from "./ResourceMenu"
import { ResourcePageItemInput, ResourcePageItemType } from "../../src/API"
import ResourceHeader from "./ResourceHeader"
import ResourceRichText from "./ResourceRichText"
import JCResourceConfigModal from "./JCResourceConfigModal"
import { useNavigation, useRoute } from "@react-navigation/native"
import ResourceColumn from "./ResourceColumn"
import { PageItemIndex } from "src/types"
interface Props {
  navigation?: any
  route?: any
  pageItems?: (ResourcePageItemInput | null)[] | null | undefined
  pageItemIndex: PageItemIndex
  isBase?: boolean
}

interface State extends JCState {
  showEditorModal: boolean
  showJCResourceConfigModal: boolean
}

class ResourceContentImpl extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer

  constructor(props: Props) {
    super(props)
    console.log(props.route.params.create)
    this.state = {
      ...super.getInitialState(),
      showJCResourceConfigModal:
        props.route.params.create === "true" || props.route.params.create === true ? true : false,
      showEditorModal: false,
    }
  }

  renderAddSeriesCard(state: ResourceState, actions: ResourceActions) {
    return state.isEditable ? (
      <TouchableOpacity onPress={actions.createSeries}>
        <Card style={this.styles.style.resourceContentCurrentSeriesCard}>
          <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
            <Ionicons size={76} name="ios-add" style={this.styles.style.icon} />
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
            <Text style={this.styles.style.episodeTitle}>Add Series</Text>
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
            <Text style={this.styles.style.episodeDescription}></Text>
          </CardItem>
          <CardItem>
            <Text style={this.styles.style.episodeTitle}></Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    ) : null
  }

  renderSeries(state: ResourceState, actions: ResourceActions): React.ReactNode {
    if (!state.currentResource) return null
    let temp = []

    return (
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          backgroundColor: "#F9FAFC",
        }}
      >
        <Container style={this.styles.style.resourceContentRightContainer}>
          <ResourceMenu></ResourceMenu>
        </Container>
      </Container>
    )
  }
  generateKey(state: ResourceState): string {
    return state.currentResource + "-" + state.currentSeries + "-" + state.currentEpisode
  }
  showEditorModal(index: number): void {
    this.setState({
      showEditorModal: true,
    })
  }
  renderEpisodes(state: ResourceState, actions: ResourceActions): React.ReactNode {
    if (!state.currentResource) return null
    if (!state.currentSeries) return null

    const series =
      state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries]
    if (series.type === "ky-preschool") {
      const img = series.playlistImage
      const seriesTitle = series.title
      return (
        <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
          <Container style={this.styles.style.resourceContentEpisodeRightContainer}>
            <ResourceMenu />
          </Container>
          <Container style={this.styles.style.resourceContentEpisodeLeftContainer}>
            {state.isEditable ? (
              <EditableText
                key={this.generateKey(state) + "1"}
                onChange={(val) => {
                  actions.updateSeries(
                    state.currentResource as number,
                    state.currentSeries as number,
                    "title",
                    val
                  )
                }}
                multiline={false}
                inputStyle={this.styles.style.headerSeriesTitle}
                textStyle={this.styles.style.headerSeriesTitle}
                value={series.title}
                isEditable={state.isEditable}
              ></EditableText>
            ) : null}

            <EditableText
              key={this.generateKey(state) + "2"}
              onChange={(val) => {
                actions.updateSeries(
                  state.currentResource as number,
                  state.currentSeries as number,
                  "description",
                  val
                )
              }}
              multiline={true}
              inputStyle={this.styles.style.resourceContentEpisodesDescription}
              textStyle={this.styles.style.resourceContentEpisodesDescription}
              value={this.stripHTMLTags(series.description)}
              isEditable={state.isEditable}
            ></EditableText>

            <Container
              style={{
                marginTop: 50,
                marginBottom: 40,
                flexGrow: 0,
                borderBottomColor: "rgba(0, 0, 0, 0.2)",
                borderBottomWidth: 1,
                width: 200,
                alignSelf: "center",
              }}
            ></Container>

            <Text style={this.styles.style.whoIsThisForText}>Who is this for?</Text>
            <EditableText
              key={this.generateKey(state) + "3"}
              onChange={() => null}
              multiline={true}
              inputStyle={this.styles.style.resourceContentEpisodesText}
              textStyle={this.styles.style.resourceContentEpisodesText}
              value={series.whoIsThisFor}
              isEditable={state.isEditable}
            ></EditableText>

            {/*<Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].category}</Text>*/}

            <Container style={this.styles.style.resourceContentEpisodesContainer}>
              <Card style={this.styles.style.resourceContentEpisodeCard}>
                {state.isEditable ? (
                  <CardItem>
                    <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}>
                      {" "}
                      <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} />
                    </JCButton>
                    <JCButton
                      buttonType={ButtonTypes.TransparentNoPadding}
                      onPress={() => {
                        this.showEditorModal(index)
                      }}
                    >
                      {" "}
                      <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} />
                    </JCButton>
                    <JCButton
                      buttonType={ButtonTypes.TransparentNoPadding}
                      onPress={() => {
                        actions.changeEpisode(index)
                      }}
                    >
                      {" "}
                      <Ionicons size={24} name="ios-open" style={this.styles.style.icon} />
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
                      <Ionicons size={24} name="ios-trash" style={this.styles.style.icon} />
                    </JCButton>
                    <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}>
                      {" "}
                      <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} />
                    </JCButton>
                  </CardItem>
                ) : null}
                <CardItem style={{ width: "100%" }}>
                  <Container style={this.styles.style.resourceContentEpisodesCardInnerContainer}>
                    <Image
                      accessible={true}
                      accessibilityLabel={seriesTitle + " series graphic"}
                      style={this.styles.style.resourceContentEpisodesIframe}
                      source={{ uri: img }}
                    />
                    <Container style={{ marginLeft: 40 }}>
                      {series.episodes.items
                        .sort((a, b) => (state.isEditable ? 0 : a.episodeNumber - b.episodeNumber))
                        .map((episode, index: number) => {
                          return (
                            <Container key={episode.id}>
                              <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
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
                                <CardItem
                                  style={this.styles.style.resourceContentEpisodesButtonsContainer}
                                >
                                  <Text style={this.styles.style.resourceContentEpisodesVideoText}>
                                    Video
                                  </Text>
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
                                <CardItem
                                  style={this.styles.style.resourceContentEpisodesButtonsContainer2}
                                >
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
                                        onPress={() =>
                                          (window.location.href = episode.activityPage)
                                        }
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
                          )
                        })}
                    </Container>
                  </Container>
                </CardItem>
              </Card>
              {state.isEditable ? (
                <TouchableOpacity onPress={actions.createEpisode}>
                  <Card style={this.styles.style.resourceContentEpisodeCard}>
                    <CardItem style={this.styles.style.resourceContentEpisodesIframeContainer}>
                      <Text>Add Episode</Text>
                    </CardItem>
                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                      <Text style={this.styles.style.episodeTitle}></Text>
                    </CardItem>
                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                      <Text style={this.styles.style.episodeDescription}></Text>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              ) : null}
              <Text style={this.styles.style.resourceContentEpisodesDownloadInfo}>
                Download all documentation that you’ll need for this package. Lessons overview and
                templates for whole curriculum is available as well.
              </Text>
              {series.allFiles ? (
                <JCButton
                  buttonType={ButtonTypes.Solid}
                  onPress={() => (window.location.href = series.allFiles)}
                >
                  <AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />
                  Download Documents
                </JCButton>
              ) : null}
            </Container>
          </Container>
        </Container>
      )
    } else {
      return (
        <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
          <Container style={this.styles.style.resourceContentEpisodeRightContainer}>
            <ResourceMenu />
          </Container>
          <Container style={this.styles.style.resourceContentEpisodeLeftContainer}>
            {state.isEditable ? (
              <EditableText
                key={this.generateKey(state) + "1"}
                onChange={(val) => {
                  actions.updateSeries(
                    state.currentResource as number,
                    state.currentSeries as number,
                    "title",
                    val
                  )
                }}
                multiline={false}
                inputStyle={this.styles.style.headerSeriesTitle}
                textStyle={this.styles.style.headerSeriesTitle}
                value={series.title}
                isEditable={state.isEditable}
              ></EditableText>
            ) : null}

            <EditableText
              key={this.generateKey(state) + "2"}
              onChange={(val) => {
                actions.updateSeries(
                  state.currentResource as number,
                  state.currentSeries as number,
                  "description",
                  val
                )
              }}
              multiline={true}
              inputStyle={this.styles.style.resourceContentEpisodesDescription}
              textStyle={this.styles.style.resourceContentEpisodesDescription}
              value={this.stripHTMLTags(series.description)}
              isEditable={state.isEditable}
            ></EditableText>

            <Container
              style={{
                marginTop: 50,
                marginBottom: 40,
                flexGrow: 0,
                borderBottomColor: "rgba(0, 0, 0, 0.2)",
                borderBottomWidth: 1,
                width: 200,
                alignSelf: "center",
              }}
            ></Container>

            <Text style={this.styles.style.whoIsThisForText}>Who is this for?</Text>
            <EditableText
              key={this.generateKey(state) + "3"}
              onChange={() => null}
              multiline={true}
              inputStyle={this.styles.style.resourceContentEpisodesText}
              textStyle={this.styles.style.resourceContentEpisodesText}
              value={series.whoIsThisFor}
              isEditable={state.isEditable}
            ></EditableText>

            {/*<Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].category}</Text>*/}

            <Container style={this.styles.style.resourceContentEpisodesContainer}>
              {series.episodes.items
                .sort((a, b) => (state.isEditable ? 0 : a.episodeNumber - b.episodeNumber))
                .map((episode, index: number) => {
                  return this.renderEpisodeCard(state, actions, series, episode, index)
                })}
              {state.isEditable ? (
                <TouchableOpacity onPress={actions.createEpisode}>
                  <Card style={this.styles.style.resourceContentEpisodeCard}>
                    <CardItem style={this.styles.style.resourceContentEpisodesIframeContainer}>
                      <Text>Add Episode</Text>
                    </CardItem>
                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                      <Text style={this.styles.style.episodeTitle}></Text>
                    </CardItem>
                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                      <Text style={this.styles.style.episodeDescription}></Text>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              ) : null}
              <Text style={this.styles.style.resourceContentEpisodesDownloadInfo}>
                Download all documentation that you’ll need for this package. Lessons overview and
                templates for whole curriculum is available as well.
              </Text>
              {series.allFiles ? (
                <JCButton
                  buttonType={ButtonTypes.Solid}
                  onPress={() => (window.location.href = series.allFiles)}
                >
                  <AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />
                  Download Documents
                </JCButton>
              ) : null}
            </Container>
          </Container>
          {this.renderEditor(state, actions)}
        </Container>
      )
    }
  }

  stripHTMLTags(data: string): string {
    return data
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/&gt;/g, "")
  }

  findFirstEpisode(series: any[]): number {
    let firstEpisodeIndex = 0
    series.forEach((episode, index) => {
      if (episode.episodeNumber === 1) firstEpisodeIndex = index
    })
    return firstEpisodeIndex
  }
  renderAddPageItemButton(
    resourceState: ResourceState,
    resourceActions: ResourceActions,
    pageItemIndex: PageItemIndex
  ) {
    return (
      <TouchableOpacity
        onPress={() => {
          const pageItem: ResourcePageItemInput = {
            type: ResourcePageItemType.Header,
          }
          resourceActions.createPageItem(resourceState.currentResource, pageItemIndex, pageItem)
        }}
      >
        <Card>
          <CardItem>
            <Text>Add Page Item</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
  renderPageConfigButton(resourceState: ResourceState, resourceActions: ResourceActions) {
    return (
      <TouchableOpacity
        onPress={() => {
          const pageItem: ResourcePageItemInput = {
            type: ResourcePageItemType.Header,
          }
          resourceActions.createPageItem(resourceState.currentResource, pageItem)
        }}
      >
        <Card>
          <CardItem>
            <Text>Configure Page</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
  renderJCResourceConfigButton(resourceState: ResourceState, resourceActions: ResourceActions) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ showJCResourceConfigModal: true })
        }}
      >
        <Card>
          <CardItem>
            <Text>Configure JC Group</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
  renderResourceConfigButton(resourceState: ResourceState, resourceActions: ResourceActions) {
    return (
      <TouchableOpacity
        onPress={() => {
          const pageItem: ResourcePageItemInput = {
            type: ResourcePageItemType.Header,
          }
          resourceActions.createPageItem(resourceState.currentResource, pageItem)
        }}
      >
        <Card>
          <CardItem>
            <Text>Configure Resources</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
  save(
    resourceActions: ResourceActions,
    resourceState: ResourceState,
    index: number,
    value: ResourcePageItemInput
  ) {
    resourceActions.updatePageItem(resourceState.currentResource, index, value)
  }
  delete(resourceActions: ResourceActions, resourceState: ResourceState, index: number) {
    resourceActions.deletePageItem(resourceState.currentResource, index)
  }
  renderRouter(
    resourceActions: ResourceActions,
    resourceState: ResourceState,
    pageItemIndex: number,
    item: ResourcePageItemInput
  ): React.ReactNode {
    switch (item.type) {
      case ResourcePageItemType.Column:
        return (
          <ResourceColumn
            resourceActions={resourceActions}
            resourceState={resourceState}
            pageItemIndex={this.props.pageItemIndex?.concat(pageItemIndex)}
            save={this.save}
            delete={this.delete}
            pageItem={item}
          ></ResourceColumn>
        )
      case ResourcePageItemType.Header:
        return (
          <ResourceHeader
            resourceActions={resourceActions}
            resourceState={resourceState}
            pageItemIndex={this.props.pageItemIndex?.concat(pageItemIndex)}
            save={this.save}
            delete={this.delete}
            pageItem={item}
          ></ResourceHeader>
        )
      case ResourcePageItemType.Menu:
        return (
          <ResourceMenu
            resourceActions={resourceActions}
            resourceState={resourceState}
            pageItemIndex={this.props.pageItemIndex?.concat(pageItemIndex)}
            save={this.save}
            delete={this.delete}
            pageItem={item}
          ></ResourceMenu>
        )
      case ResourcePageItemType.RichText:
        return (
          <ResourceRichText
            resourceActions={resourceActions}
            resourceState={resourceState}
            pageItemIndex={this.props.pageItemIndex?.concat(pageItemIndex)}
            save={this.save}
            delete={this.delete}
            pageItem={item}
          ></ResourceRichText>
        )
    }
  }
  renderColumnConfig(
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode {
    console.log({ ColumnConfig: this.props.pageItemIndex })
    return resourceState?.isEditable ? (
      <View style={{ flexDirection: "row" }}>
        {this.renderAddPageItemButton(resourceState, resourceActions, this.props.pageItemIndex)}
      </View>
    ) : null
  }
  renderPageConfig(
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode {
    return resourceState?.isEditable ? (
      <View style={{ flexDirection: "row" }}>
        {this.renderAddPageItemButton(resourceState, resourceActions, [])}
        {this.renderPageConfigButton(resourceState, resourceActions)}
        {this.renderResourceConfigButton(resourceState, resourceActions)}
        {this.renderJCResourceConfigButton(resourceState, resourceActions)}
        <JCResourceConfigModal
          visible={this.state.showJCResourceConfigModal}
          onClose={() => {
            this.setState({ showJCResourceConfigModal: false })
          }}
        ></JCResourceConfigModal>
      </View>
    ) : null
  }
  renderItems(
    resourceActions: ResourceActions,
    resourceState: ResourceState,
    pageItems: ResourcePageItemInput[]
  ) {
    return pageItems?.map((item: ResourcePageItemInput, index: number) => {
      return this.renderRouter(resourceActions, resourceState, index, item)
    })
  }

  render(): React.ReactNode {
    return (
      <ResourceContentImpl.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          let pageItems: ResourcePageItemInput[] =
            resourceState?.resourceData?.menuItems?.items[resourceState.currentResource]?.pageItems
          if (!this.props.isBase) pageItems = this.props.pageItems
          console.log({ pageItems: pageItems })
          return (
            <>
              {this.renderItems(resourceActions, resourceState, pageItems)}

              {this.props.isBase
                ? this.renderPageConfig(resourceState, resourceActions)
                : this.renderColumnConfig(resourceState, resourceActions)}
            </>
          )
        }}
      </ResourceContentImpl.Consumer>
    )
  }
}

export default function ResourceContent(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <ResourceContentImpl {...props} navigation={navigation} route={route} />
}
