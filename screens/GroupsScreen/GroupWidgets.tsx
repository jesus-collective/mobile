import Auth from "@aws-amplify/auth"
import React from "react"
import { Group } from "screens/EventsScreen/GroupUtils"
import { Data } from "../../components/Data/Data"
import JCWidget, { WidgetType } from "../../components/Widgets/JCWidget"
import { ModelSortDirection } from "../../src/API"
import { JCCognitoUser } from "../../src/types"

export default function GroupWidgets() {
  const loadUpcoming = async () => {
    let tempGroups: Group[] = []
    let counter = 0
    const loadNext = async (next: string | undefined | null = null) => {
      console.log(++counter)
      const listGroup = await Data.groupByTypeForMyGroups("group", ModelSortDirection.DESC, next)
      const items = listGroup.data?.groupByType?.items as Group[]
      const nextToken = listGroup.data?.groupByType?.nextToken ?? null
      tempGroups = [...tempGroups, ...items]
      if (nextToken) await loadNext(nextToken)
      return tempGroups
    }
    const groups = await loadNext()

    const loadUser = async () => {
      const jcUser: JCCognitoUser = await Auth.currentAuthenticatedUser()
      return jcUser.username
    }
    const joinedGroups: string[] = []
    const user = await loadUser()
    for (const group of groups) {
      const json = await Data.groupMemberByUser(user, group?.id)
      if ((json.data?.groupMemberByUser?.items?.length ?? 0) > 0) {
        if (group?.id) joinedGroups.push(group.id)
      }
    }
    return groups.filter((group) => joinedGroups.find((a) => a === group?.id))
  }

  return (
    <JCWidget
      widgetType={WidgetType.Group}
      emptyMessage="No joined groups"
      loadData={loadUpcoming}
      title="Groups you are in"
    />
  )
}
