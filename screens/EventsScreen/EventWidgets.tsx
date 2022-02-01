import Auth from "@aws-amplify/auth"
import moment from "moment"
import React from "react"
import { Data } from "../../components/Data/Data"
import JCWidget, { WidgetType } from "../../components/Widgets/JCWidget"
import { GroupByTypeByTimeQueryVariables, ModelSortDirection } from "../../src/API"
import { JCCognitoUser } from "../../src/types"

export default function EventWidgets() {
  const loadUpcoming = async () => {
    const makeQueryVariables = (
      nextToken: GroupByTypeByTimeQueryVariables["nextToken"],
      past: boolean,
      limit: number
    ): GroupByTypeByTimeQueryVariables => {
      return {
        nextToken,
        type: "event",
        limit,
        time: {
          ge: moment().format(),
        },
        sortDirection: ModelSortDirection.ASC,
      }
    }

    const json = await Data.groupByTypeByTime(makeQueryVariables(null, false, 60))
    const loadUser = async () => {
      const jcUser: JCCognitoUser = await Auth.currentAuthenticatedUser()
      return jcUser.username
    }

    const user = await loadUser()
    const ownedEvents: Array<string> = []
    const returnedEvents = json.data?.groupByTypeByTime?.items ?? []
    console.log({ returnedEvents })
    for (const item of returnedEvents) {
      if (item?.ownerUser?.id === user) {
        ownedEvents.push(item.id)
      }
      //if (ownedEvents.length >= 2) break
    }
    return returnedEvents.filter((event) => ownedEvents.find((a) => a === event?.id))
  }

  return (
    <JCWidget
      widgetType={WidgetType.Event}
      emptyMessage="No upcoming events"
      loadData={loadUpcoming}
      title="Your Upcoming Events"
    />
  )
}
