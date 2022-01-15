import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api/lib/types"
import { API } from "aws-amplify"
import { useEffect, useState } from "react"
import { DirectMessagesByRoomQuery } from "../../src/API-messages"
import { directMessagesByRoom } from "../../src/graphql-custom/messages"

export const useDirectMessages = (roomId: string) => {
  const [state, setState] = useState<any>({
    directMessages: [],
    isLoading: true,
    nextToken: null,
  })

  const loadMore = async () => {
    //
  }
  const appendDM = (msg) => {
    setState((prev) => ({
      ...prev,
      directMessages: [...prev.directMessages, msg],
    }))
  }
  useEffect(() => {
    const getDirectMessages = async () => {
      setState((prev) => ({ ...prev, isLoading: true }))
      try {
        const directMessagesQuery = (await API.graphql({
          query: directMessagesByRoom,
          variables: {
            messageRoomID: roomId,
            sortDirection: "DESC",
            limit: 20,
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<DirectMessagesByRoomQuery>
        setState({
          directMessages: [
            ...(directMessagesQuery?.data?.directMessagesByRoom?.items?.reverse() ?? []),
          ],
          isLoading: false,
        })
      } catch (e: any) {
        console.error({ e })
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    }
    getDirectMessages()
  }, [roomId])
  return { directMessages: state.directMessages, isLoading: state.isLoading, loadMore, appendDM }
}
