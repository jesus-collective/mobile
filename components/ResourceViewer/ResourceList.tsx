import { Picker } from "@react-native-picker/picker"
import React, { useContext } from "react"
import { Text, View, ViewStyle } from "react-native"
import EditableText from "../../components/Forms/EditableText"
import MainStyles from "../../components/style"
import { ResourcePageItemInput, ResourcePageItemStyle, ResourcePageItemType } from "../../src/API"
import {
  GetResourceData,
  GetResourceSeriesData,
  ListResourceEpisodesData,
  ListResourcesData,
  ListResourceSeriessData,
  ResourceAdminProp,
  ResourceSetupProp,
} from "../../src/types"
import PageItemSettings from "./PageItemSettings"
import ResourceCard from "./ResourceCard"
import { ResourceContext } from "./ResourceContext"
import ResourceSelector from "./ResourceSelector"

type Props = ResourceSetupProp

export function ResourceListAdmin(props: ResourceAdminProp): JSX.Element | null {
  const resourceContext = useContext(ResourceContext)

  if (!resourceContext.resourceState) return null
  if (resourceContext.resourceState.currentResource == null) return null
  return (
    <>
      <Text style={{ textAlign: "left", width: "100%", fontWeight: "800", marginTop: 15 }}>
        Title 1:
      </Text>
      <EditableText
        onChange={(val: string) => {
          const tmp = props.settings
          tmp.title1 = val
          props.setSettings(tmp)
        }}
        placeholder="Title 1"
        multiline={false}
        textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
        inputStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
        value={props.settings.title1 ?? ""}
        isEditable={true}
      ></EditableText>
      <Text style={{ textAlign: "left", width: "100%", fontWeight: "800", marginTop: 15 }}>
        Title 2:
      </Text>

      <EditableText
        onChange={(val: string) => {
          const tmp = props.settings
          tmp.title2 = val
          props.setSettings(tmp)
        }}
        placeholder="Title 2"
        multiline={false}
        textStyle={{ textAlign: "left", width: "100%", fontWeight: "400" }}
        inputStyle={{
          textAlign: "left",
          width: "100%",
          fontWeight: "400",
          marginBottom: 15,
        }}
        value={props.settings.title2 ?? ""}
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
        selectedValue={props.settings.style ?? undefined}
        onValueChange={(value: any) => {
          console.log({ value: value })
          const tmp = props.settings
          tmp.style = value
          props.setSettings(tmp)
        }}
      >
        {Object.keys(ResourcePageItemStyle)
          .filter((z) => z.startsWith("List"))
          .map((org) => {
            return <Picker.Item key={org} label={org} value={org} />
          })}
      </Picker>
      {console.log({ style: props.settings.style })}
      {props.settings.style == ResourcePageItemStyle.ListAuto ? (
        <ResourceSelector {...props} />
      ) : null}
    </>
  )
}
function ResourceList(props: Props) {
  const resourceContext = useContext(ResourceContext)
  const styles = MainStyles.getInstance()

  const renderManualCards = (): React.ReactNode => {
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
          pageItemIndex={props.pageItemIndex?.concat(props.pageItemIndex)}
          pageItem={z}
          hideEditButton={true}
        ></ResourceCard>
      </>
    )
  }
  const renderEpisodes = (
    resourceID: string | null | undefined,
    seriesID: string | null | undefined
  ): React.ReactNode => {
    if (props.pageItem.episodeID == null || props.pageItem.episodeID == undefined) {
      const resource: GetResourceData = resourceContext.resourceActions.getResourceByID(resourceID)
      const series: GetResourceSeriesData = resourceContext.resourceActions.getSeriesByID(
        resourceID,
        seriesID
      )
      const items: ListResourceEpisodesData | null | undefined = series?.episodes?.items
      return items
        ?.sort((a, b) => (a?.episodeNumber ?? 0) - (b?.episodeNumber ?? 0))
        .map((item, index: number) => {
          if (item) {
            const z: ResourcePageItemInput = {
              id: item.id,
              type: ResourcePageItemType.Card,
              title1: item.title,
              //            title2: item.subtitle,
              style: ResourcePageItemStyle.CardManual,
              description1: item.description,
              //           image: item.image,
              resourceID: resource?.id,
              seriesID: series?.id,
              episodeID: item.id,
            }
            return (
              <ResourceCard
                key={index}
                pageItemIndex={props.pageItemIndex?.concat(props.pageItemIndex)}
                pageItem={z}
                hideEditButton={true}
              ></ResourceCard>
            )
          } else return null
        })
    } else return null
  }
  const renderSeries = (resourceID: string | null | undefined): React.ReactNode => {
    if (props.pageItem.seriesID == null || props.pageItem.seriesID == undefined) {
      const resource: GetResourceData = resourceContext.resourceActions.getResourceByID(resourceID)
      const items: ListResourceSeriessData = resource?.series?.items
      return items?.map((item, index: number) => {
        if (item) {
          console.log({ IMAGE: item })
          const z: ResourcePageItemInput = {
            id: item.id,
            type: ResourcePageItemType.Card,
            title1: item.title,
            //  title2: item.subtitle,
            style: ResourcePageItemStyle.CardManual,
            description1: item.description,
            image: item.imageFile,
            resourceID: resource?.id,
            seriesID: item.id,
          }
          return (
            <ResourceCard
              key={index}
              pageItemIndex={props.pageItemIndex?.concat(props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
          )
        } else return null
      })
    } else return null
  }
  const renderResources = (items: ListResourcesData): React.ReactNode => {
    if (props.pageItem.resourceID == null || props.pageItem.resourceID == undefined) {
      return items?.map((item: ListResourcesData[0], index: number) => {
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
              key={index}
              pageItemIndex={props.pageItemIndex?.concat(props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
          )
        } else return null
      })
    } else return null
  }
  const renderAutoCards = (): React.ReactNode => {
    if (!resourceContext.resourceState) return null
    if (resourceContext.resourceState.currentResource == null) return null
    return (
      <>
        {resourceContext.resourceState.resourceData?.resources.items
          ? renderResources(resourceContext.resourceState.resourceData?.resources.items)
          : null}

        {renderSeries(props.pageItem.resourceID)}
        {renderEpisodes(props.pageItem.resourceID, props.pageItem.seriesID)}
      </>
    )
  }

  const border: ViewStyle = { borderWidth: 1, borderStyle: "dashed" }

  //  console.log({ COLUMns: this.props.pageItemIndex })
  return (
    <View
      style={[
        {
          flexDirection: "column",
          width: "100%",
          zIndex: 5000 + props.pageItemIndex.length,
        },
        resourceContext.resourceState?.isEditable && border,
      ]}
    >
      <PageItemSettings
        pageItemIndex={props.pageItemIndex}
        save={props.save}
        delete={props.delete}
        pageItem={props.pageItem}
        hideEditButton={props.hideEditButton}
      ></PageItemSettings>
      <View style={{ paddingBottom: 9, paddingTop: 50 }}>
        <Text style={styles.style.resourcesListText}>{props.pageItem.title1}</Text>
        <Text style={styles.style.resourcesListText2}>{props.pageItem.title2}</Text>
      </View>
      <View style={{ overflow: "scroll" }}>
        <View style={{ flexDirection: "row" }}>
          {props.pageItem.style == ResourcePageItemStyle.ListManual
            ? renderManualCards()
            : renderAutoCards()}
        </View>
      </View>
    </View>
  )
}
export default ResourceList
