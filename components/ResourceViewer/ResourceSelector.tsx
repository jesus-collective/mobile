import { Picker } from "native-base"
import React from "react"
import PageItemSettings from "./PageItemSettings"
import { ResourceActions, ResourceState } from "./ResourceContext"

export default class ResourceSelector {
  static render(
    page: PageItemSettings,
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ) {
    console.log("RENDERING")
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
          selectedValue={page.state.settings.resourceID ?? undefined}
          onValueChange={(value: any) => {
            const tmp = page.state.settings
            tmp.resourceID = value == "None" ? null : value
            page.setState({ settings: tmp })
          }}
        >
          <Picker.Item key={"null"} label={"None"} value={null} />
          {resourceState.resourceData?.resources.items.map((org, index: number) => {
            return <Picker.Item key={index} label={org?.title ?? ""} value={org?.id} />
          })}
        </Picker>
        {console.log(page.state.settings.resourceID)}
        {page.state.settings.resourceID != null && page.state.settings.resourceID != undefined && (
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
            selectedValue={page.state.settings.seriesID}
            onValueChange={(value: any) => {
              const tmp = page.state.settings
              tmp.seriesID = value == "None" ? null : value
              page.setState({ settings: tmp })
            }}
          >
            <Picker.Item key={"null"} label={"None"} value={null} />
            {resourceActions
              .getResourceByID(page.state.settings.resourceID)
              .series.items.map((org, index: number) => {
                return <Picker.Item key={index} label={org?.title ?? ""} value={org.id} />
              })}
          </Picker>
        )}
        {page.state.settings.resourceID != null &&
          page.state.settings.resourceID != undefined &&
          page.state.settings.seriesID != null &&
          page.state.settings.seriesID != undefined && (
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
              selectedValue={page.state.settings.episodeID}
              onValueChange={(value: any) => {
                const tmp = page.state.settings
                tmp.episodeID = value == "None" ? null : value
                page.setState({ settings: tmp })
              }}
            >
              <Picker.Item key={"null"} label={"None"} value={null} />
              {resourceActions
                .getSeriesByID(page.state.settings.resourceID, page.state.settings.seriesID)
                .episodes.items.map((org, index: number) => {
                  return <Picker.Item key={index} label={org?.title ?? ""} value={org.id} />
                })}
            </Picker>
          )}
      </>
    )
  }
}
