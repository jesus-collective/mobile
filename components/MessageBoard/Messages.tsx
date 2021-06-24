import { GraphQLResult } from "@aws-amplify/api"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { DirectMessagesByRoomQuery } from "src/API-messages"
import { directMessagesByRoom } from "../../src/graphql-custom/messages"
import MessageThread, { Person } from "./MessageThread"

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#efefef",
  },
})
interface Props {
  room: any
}
export default function Messages(props: Props): JSX.Element {
  const { room } = props
  const [personData, setPersonData] = useState<Person>({
    name: "",
    position: "",
    comment: "",
    pictureUri: "",
    createdAt: "",
  })
  const [loading, setLoading] = useState(true)
  const loadMessages = async () => {
    const directMessages = (await API.graphql({
      query: directMessagesByRoom,
      variables: { messageRoomID: room.id, sortDirection: "ASC", limit: 1 },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as Promise<GraphQLResult<DirectMessagesByRoomQuery>>
    const item = (await directMessages).data?.directMessagesByRoom?.items?.[0]
    if (
      item?.author?.given_name &&
      item?.author?.family_name &&
      item?.author?.currentRole &&
      item?.content &&
      item?.createdAt
    ) {
      const p: Person = {
        name: item?.author?.given_name + " " + item?.author?.family_name,
        position: item?.author?.currentRole ?? "",
        comment: item?.content,
        pictureUri:
          "https://www.themeetinghouse.com/cached/640/static/photos/staff/Lucas_Belem_app.jpg",
        createdAt: item?.createdAt,
      }
      setPersonData(p)
    }
    setLoading(false)
  }
  useEffect(() => {
    loadMessages()
  }, [])
  return !loading ? (
    <MessageThread
      replies={[
        {
          name: "Lucas Belem",
          position: "Project Manager",
          comment: "This is a short comment",
          pictureUri:
            "https://www.themeetinghouse.com/cached/640/static/photos/staff/Lucas_Belem_app.jpg",
        },
        {
          name: "Bruxy Cavey",
          position: "Teaching Pastor",
          comment: "Awesome post. Thank you for your hard work.",
          pictureUri:
            "https://www.themeetinghouse.com/cached/640/static/photos/staff/Bruxy_Cavey_app.jpg",
        },
      ]}
      person={personData}
    />
  ) : (
    <></>
  )
}
