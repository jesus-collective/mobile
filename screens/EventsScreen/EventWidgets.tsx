import React from "react"
import JCWidget, { WidgetType } from "../../components/Widgets/JCWidget"
import { useFetchEvents } from "./useFetchEvents"

export default function EventWidgets() {
  const { events, joinedGroups, updateEvents } = useFetchEvents({ loadAll: true })
  console.log("Widget ====", { events }, { joinedGroups })
  return (
    <JCWidget
      widgetType={WidgetType.Event}
      emptyMessage="No upcoming events"
      data={events.filter((event) =>
        Boolean(joinedGroups.find((eventId) => eventId === event?.id))
      )}
      title="Your Upcoming Events"
    />
  )
}
