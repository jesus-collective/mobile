import React from "react"
import JCWidget, { WidgetType } from "../../components/Widgets/JCWidget"
import { useFetchEvents } from "./useFetchEvents"

export default function EventWidgets() {
  const { events, joinedGroups, updateEvents } = useFetchEvents({ loadAll: true })

  return (
    <JCWidget
      widgetType={WidgetType.Event}
      emptyMessage="No upcoming events"
      data={events.filter((event) => event.id === joinedGroups.find((eventId) => eventId))}
      title="Your Upcoming Events"
    />
  )
}
