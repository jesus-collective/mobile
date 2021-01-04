import Amplify from "aws-amplify"
import { Picker } from "native-base"
import React from "react"
import { Text, View, ViewStyle } from "react-native"
import EditableText from "../../components/Forms/EditableText"
import { ResourcePageItemInput, ResourcePageItemStyle, ResourcePageItemType } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import ResourceCard from "./ResourceCard"
import { ResourceActions, ResourceContext } from "./ResourceContext"
import ResourceSelector from "./ResourceSelector"

Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {}
interface State extends JCState {}
class ResourceList extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
    }
  }
  static renderAdmin(page: PageItemSettings): React.ReactNode {
    return (
      <ResourceList.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          return (
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
                selectedValue={page.state.settings.style}
                onValueChange={(value: any) => {
                  console.log(value)
                  const tmp = page.state.settings
                  tmp.style = value
                  page.setState({ settings: tmp })
                }}
              >
                {Object.keys(ResourcePageItemStyle)
                  .filter((z) => z.startsWith("List"))
                  .map((org) => {
                    return <Picker.Item key={org} label={org} value={org} />
                  })}
              </Picker>
              {console.log(page.state.settings.style)}
              {page.state.settings.style == ResourcePageItemStyle.ListAuto
                ? ResourceSelector.render(page, resourceState, resourceActions)
                : null}
            </>
          )
        }}
      </ResourceList.Consumer>
    )
  }
  renderManualCards() {
    const z: ResourcePageItemInput = {
      id: "z",
      type: ResourcePageItemType.Card,
      title1: "Test",
      title2: "Test2",
      image: {
        filenameLarge:
          "resources/group-2cfc8acd-9c28-4d2c-8a98-413a1bad171b-pageId-15e2e2cc-475a-4ebd-bd48-eacef5f41233-card-1609303536164-large.png",
        filenameMedium:
          "resources/group-2cfc8acd-9c28-4d2c-8a98-413a1bad171b-pageId-15e2e2cc-475a-4ebd-bd48-eacef5f41233-card-1609303536164-medium.png",
        filenameSmall:
          "resources/group-2cfc8acd-9c28-4d2c-8a98-413a1bad171b-pageId-15e2e2cc-475a-4ebd-bd48-eacef5f41233-card-1609303536164-small.png",
        filenameUpload:
          "resources/upload/group-2cfc8acd-9c28-4d2c-8a98-413a1bad171b-pageId-15e2e2cc-475a-4ebd-bd48-eacef5f41233-card-1609303536164-upload.jpeg",
        userId: "us-east-1:c2ee2958-e5da-48f7-a1c2-cac810f8e873",
      },
      style: ResourcePageItemStyle.CardManual,
      description1: "Test3",
    }
    return (
      <>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
        <ResourceCard
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
      </>
    )
  }
  renderEpisodes(
    resourceActions: ResourceActions,
    resourceID: string | null | undefined,
    seriesID: string | null | undefined
  ) {
    if (this.props.pageItem.episodeID == null || this.props.pageItem.episodeID == undefined) {
      const resource = resourceActions.getResourceByID(resourceID)
      const series = resourceActions.getSeriesByID(resourceID, seriesID)
      const items = series?.episodes?.items
      return items?.map((item, index: number) => {
        if (item) {
          const z: ResourcePageItemInput = {
            id: item.id,
            type: ResourcePageItemType.Card,
            title1: item.title,
            title2: item.subtitle,
            style: ResourcePageItemStyle.CardManual,
            description1: item.description,
            image: item.image,
            resourceID: resource.id,
            seriesID: series.id,
            episodeID: item.id,
          }
          return (
            <ResourceCard
              key={index}
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
          )
        } else return null
      })
    } else return null
  }
  renderSeries(resourceActions: ResourceActions, resourceID: string | null | undefined) {
    if (this.props.pageItem.seriesID == null || this.props.pageItem.seriesID == undefined) {
      const resource = resourceActions.getResourceByID(resourceID)
      const items = resource?.series?.items
      return items?.map((item) => {
        if (item) {
          const z: ResourcePageItemInput = {
            id: item.id,
            type: ResourcePageItemType.Card,
            title1: item.title,
            title2: item.subtitle,
            style: ResourcePageItemStyle.CardManual,
            description1: item.description,
            image: item.image,
            resourceID: resource.id,
            seriesID: item.id,
          }
          return (
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
          )
        } else return null
      })
    } else return null
  }
  renderResources(items) {
    if (this.props.pageItem.resourceID == null || this.props.pageItem.resourceID == undefined) {
      return items.map((item) => {
        if (item) {
          const z: ResourcePageItemInput = {
            id: item.id,
            type: ResourcePageItemType.Card,
            title1: item.title,
            title2: item.subtitle,
            style: ResourcePageItemStyle.CardManual,
            description1: item.description,
            image: item.image,
            resourceID: item.id,
          }
          return (
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
          )
        } else return null
      })
    } else return null
  }
  renderAutoCards() {
    return (
      <ResourceList.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          return (
            <>
              {this.renderResources(resourceState.resourceData?.resources.items)}

              {this.renderSeries(resourceActions, this.props.pageItem.resourceID)}
              {this.renderEpisodes(
                resourceActions,
                this.props.pageItem.resourceID,
                this.props.pageItem.seriesID
              )}
            </>
          )
        }}
      </ResourceList.Consumer>
    )
  }
  render(): React.ReactNode {
    const border: ViewStyle = { borderWidth: 1, borderStyle: "dashed" }

    console.log({ COLUMns: this.props.pageItemIndex })
    return (
      <View
        style={[
          {
            flexDirection: "column",
            width: "100%",
            zIndex: 5000 + this.props.pageItemIndex.length,
          },
          this.props.resourceState.isEditable && border,
        ]}
      >
        <PageItemSettings
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex}
          save={this.props.save}
          delete={this.props.delete}
          pageItem={this.props.pageItem}
        ></PageItemSettings>
        <View style={{ paddingBottom: 9, paddingTop: 50 }}>
          <Text style={this.styles.style.resourcesListText}>{this.props.pageItem.title1}</Text>
          <Text style={this.styles.style.resourcesListText2}>{this.props.pageItem.title2}</Text>
        </View>
        <View style={{ overflow: "scroll" }}>
          <View style={{ flexDirection: "row" }}>
            {this.props.pageItem.style == ResourcePageItemStyle.ListManual
              ? this.renderManualCards()
              : this.renderAutoCards()}
          </View>
        </View>
      </View>
    )
  }
}
export default ResourceList
