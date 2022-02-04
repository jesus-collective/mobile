import React from "react"
import { Data } from "../../components/Data/Data"
import JCWidget, { WidgetType } from "../../components/Widgets/JCWidget"

export default function ResourceWidgets() {
  const loadUpcoming = async () => {
    const listGroup = await Data.groupByTypeForMyGroups("resource", null)
    return listGroup.data?.groupByType?.items ?? []
  }
  const loadSponsored = async () => {
    const resources = await loadUpcoming()
    return Promise.resolve(resources.filter((a) => a?.name === "One Story Curriculum"))
  }
  return (
    <>
      <JCWidget
        widgetType={WidgetType.Resource}
        emptyMessage="No featured resource found"
        loadData={loadSponsored}
        title="Featured resource"
      />
    </>
  )
}
