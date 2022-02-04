import Auth from "@aws-amplify/auth"
import React from "react"
import { Data } from "../../components/Data/Data"
import JCWidget, { WidgetType } from "../../components/Widgets/JCWidget"
import { JCCognitoUser } from "../../src/types"

export default function GroupWidgets() {
  const loadUpcoming = async () => {
    const listGroup = await Data.groupByTypeForMyGroups("group", null)
    const loadUser = async () => {
      const jcUser: JCCognitoUser = await Auth.currentAuthenticatedUser()
      return jcUser.username
    }
    const data = listGroup.data?.groupByType?.items ?? []
    const joinedGroups: Array<any> = []
    const user = await loadUser()
    for (const group of data) {
      const json = await Data.groupMemberByUser(user, group?.id)
      if ((json.data?.groupMemberByUser?.items?.length ?? 0) > 0) {
        joinedGroups.push(group?.id)
      }
    }
    return data.filter((group) => joinedGroups.find((a) => a === group?.id))
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
