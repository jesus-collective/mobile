import React from "react"
import { Data } from "../../components/Data/Data"
import JCWidget, { WidgetType } from "../../components/Widgets/JCWidget"

export default function GroupWidgets() {
  const loadUpcoming = async () => {
    const listGroup = await Data.groupByTypeForMyGroups("resource", null)
    return listGroup.data?.groupByType?.items ?? []
  }
  const loadSponsored = async () => {
    const resources = await loadUpcoming()
    return Promise.resolve(resources.filter((a) => a?.isSponsored === "true"))
  }
  return (
    <>
      <JCWidget
        widgetType={WidgetType.Resource}
        emptyMessage="No recommended resources at the moment"
        loadData={loadSponsored}
        title="Recommended by Jesus Collective"
      />
    </>
  )
}
