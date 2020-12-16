import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Card, CardItem } from "native-base"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { PageItemIndex } from "src/types"
import { v4 as uuidv4 } from "uuid"
import { ResourcePageItemInput, ResourcePageItemType } from "../../src/API"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import JCResourceConfigModal from "./JCResourceConfigModal"
import ResourceCard from "./ResourceCard"
import ResourceColumn from "./ResourceColumn"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"
import ResourceHeader from "./ResourceHeader"
import ResourceMenu from "./ResourceMenu"
import ResourceRichText from "./ResourceRichText"

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
  showPageConfigModal: boolean
  showResourceConfigModal: boolean
}

class ResourceContentImpl extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer

  constructor(props: Props) {
    super(props)
    console.log(props.route.params.create)
    this.state = {
      ...super.getInitialState(),
      showPageConfigModal: false,
      showResourceConfigModal: false,
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

  generateKey(state: ResourceState): string {
    return state.currentResource + "-" + state.currentSeries + "-" + state.currentEpisode
  }
  showEditorModal(index: number): void {
    this.setState({
      showEditorModal: true,
    })
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
      <DropDownPicker
        items={[
          {
            label: "Menu",
            value: ResourcePageItemType.Menu,
            icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
            hidden: true,
          },
          {
            label: "Header",
            value: ResourcePageItemType.Header,
            icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
          },
          {
            label: "Rich Text",
            value: ResourcePageItemType.RichText,
            icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
          },
          {
            label: "List",
            value: ResourcePageItemType.List,
            icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
          },
          {
            label: "Grid",
            value: ResourcePageItemType.Grid,
            icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
          },
          {
            label: "Column",
            value: ResourcePageItemType.Column,
            icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
          },
          {
            label: "Card",
            value: ResourcePageItemType.Card,
            icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
          },
        ]}
        placeholder="Add Page Item"
        containerStyle={{ height: 40, width: 160 }}
        dropDownStyle={{ backgroundColor: "#fafafa", width: 150 }}
        style={{ backgroundColor: "#fafafa" }}
        itemStyle={{
          justifyContent: "flex-start",
          width: 100,
        }}
        labelStyle={{
          fontSize: 14,
          textAlign: "left",
          color: "#000",
        }}
        onChangeItem={(item) => {
          const pageItem: ResourcePageItemInput = {
            id: uuidv4(),
            type: item.value,
          }
          resourceActions.createPageItem(resourceState.currentResource, pageItemIndex, pageItem)
          item.value = null
        }}
      />
    )
  }
  renderPageConfigButton(resourceState: ResourceState, resourceActions: ResourceActions) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ showPageConfigModal: true })
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
          this.props.navigation.navigate("ResourceConfigureScreen", {
            id: resourceState.loadId,
          })
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
    menuItemIndex: number,
    pageItemIndex: PageItemIndex,
    value: ResourcePageItemInput
  ) {
    resourceActions.updatePageItem(menuItemIndex, pageItemIndex, value)
  }
  delete(
    resourceActions: ResourceActions,
    resourceState: ResourceState,
    menuItemIndex: number,
    pageItemIndex: PageItemIndex
  ) {
    resourceActions.deletePageItem(menuItemIndex, pageItemIndex)
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
      case ResourcePageItemType.Card:
        return (
          <ResourceCard
            resourceActions={resourceActions}
            resourceState={resourceState}
            pageItemIndex={this.props.pageItemIndex?.concat(pageItemIndex)}
            save={this.save}
            delete={this.delete}
            pageItem={item}
          ></ResourceCard>
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
