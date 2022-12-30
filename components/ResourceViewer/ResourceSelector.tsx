import { Picker } from "@react-native-picker/picker"
import React, { useContext } from "react"
import { ResourceAdminProp } from "src/types"
import { ResourceContext } from "./ResourceContext"

export default function ResourceSelector(props: ResourceAdminProp) {
  const resourceContext = useContext(ResourceContext)

  return (
    <>
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
        selectedValue={props.settings.resourceID ?? undefined}
        onValueChange={(value: any) => {
          const tmp = props.settings
          tmp.resourceID = value == "None" ? null : value
          props.setSettings(tmp)
        }}
      >
        <Picker.Item key={"null"} label={"None"} value={undefined} />
        {resourceContext.resourceState?.resourceData?.resources.items.map((org, index: number) => {
          return <Picker.Item key={index} label={org?.title ?? ""} value={org?.id} />
        })}
      </Picker>
      {console.log({ resourceID: props.settings.resourceID })}
      {props.settings.resourceID != null && props.settings.resourceID != undefined && (
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
          selectedValue={props.settings.seriesID ?? undefined}
          onValueChange={(value: any) => {
            const tmp = props.settings
            tmp.seriesID = value == "None" ? null : value
            props.setSettings(tmp)
          }}
        >
          <Picker.Item key={"null"} label={"None"} value={undefined} />
          {resourceContext.resourceActions &&
            resourceContext.resourceActions
              .getResourceByID(props.settings.resourceID)!
              .series?.items?.map((org, index: number) => {
                return <Picker.Item key={index} label={org?.title ?? ""} value={org?.id} />
              })}
        </Picker>
      )}
      {props.settings.resourceID != null &&
        props.settings.resourceID != undefined &&
        props.settings.seriesID != null &&
        props.settings.seriesID != undefined && (
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
            selectedValue={props.settings.episodeID ?? undefined}
            onValueChange={(value: any) => {
              const tmp = props.settings
              tmp.episodeID = value == "None" ? null : value
              props.setSettings(tmp)
            }}
          >
            <Picker.Item key={"null"} label={"None"} value={undefined} />
            {resourceContext.resourceActions
              .getSeriesByID(props.settings.resourceID, props.settings.seriesID)!
              .episodes?.items?.map((org, index: number) => {
                return <Picker.Item key={index} label={org?.title ?? ""} value={org?.id} />
              })}
          </Picker>
        )}
    </>
  )
}
