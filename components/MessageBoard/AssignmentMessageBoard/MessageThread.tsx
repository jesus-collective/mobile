import { Auth } from "aws-amplify"
import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { JCCognitoUser } from "src/types"
import ProfileImage from "../../ProfileImage/ProfileImage"
import MessageComment from "./MessageComment"
import MessageEditor from "./MessageEditor"
import { replyCounter } from "./MessageThreadUtils"
const style = StyleSheet.create({
  container: {
    zIndex: 1000000,
    flexDirection: "column",
    backgroundColor: "white",
    width: "85%",
  },
})

export type MessageComment = {
  name: string
  position: string
  comment: string
  parentId?: string
  authorId: string
  roomId?: string
  createdAt?: string
  replies?: Array<any> // <MessageComment>? missing type id
  updatedAt?: string
  recipients: Array<string>
  messageId?: string
  messageRoomId?: string
}

interface Props {
  thread: MessageComment
  open?: boolean
}

export type EntryType = "assignment" | "reply" | "replyToReply"

export default function MessageThread(props: Props): JSX.Element {
  const commentRef = useRef<any>(null)
  const { thread } = props
  const { replies, roomId, recipients } = thread
  const replyCount = replyCounter(replies)
  const [user, setUser] = useState<JCCognitoUser["username"]>("")
  const [open, setOpen] = useState(props.open ?? false)
  const [replyTo, setReplyTo] = useState({
    name: "",
    messageRoomId: "",
    parentId: "",
    messageId: "",
  })

  useEffect(() => {
    if (open)
      commentRef?.current?.scrollIntoView({
        behavior: "smooth",
      })
  }, [open])

  useEffect(() => {
    const getUser = async () => {
      const user: JCCognitoUser = await Auth.currentAuthenticatedUser()
      setUser(user.username)
    }
    getUser()
  }, [])
  return (
    <View ref={commentRef} style={style.container}>
      <MessageComment
        replyCount={replyCount}
        setOpen={() => setOpen((prev) => !prev)}
        setReplyTo={setReplyTo}
        openState={open}
        comment={thread}
        type="assignment"
      ></MessageComment>
      <View style={{ flexDirection: "column" }}>
        {open
          ? replies?.map((response: MessageComment, index) => {
              return (
                <View key={index}>
                  <MessageComment
                    active={replyTo?.messageId === response?.messageId}
                    setOpen={() => setOpen((prev) => !prev)}
                    setReplyTo={setReplyTo}
                    openState={open}
                    key={index}
                    type="reply"
                    comment={response}
                  />
                  {response?.replies?.map((replyToReponse) => {
                    return (
                      <MessageComment
                        active={replyTo?.messageId === replyToReponse?.messageId}
                        setOpen={() => setOpen((prev) => !prev)}
                        setReplyTo={setReplyTo}
                        openState={open}
                        type="replyToReply"
                        comment={replyToReponse}
                        key={replyToReponse?.id}
                      ></MessageComment>
                    )
                  })}
                </View>
              )
            })
          : null}
        {open && user && roomId ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              <ProfileImage size="small2" user={user} />
            </View>
            <View style={{ flex: 1 }}>
              <MessageEditor
                clearReplyTo={() =>
                  setReplyTo({ parentId: "", name: "", messageRoomId: "", messageId: "" })
                }
                replyTo={replyTo}
                recipients={recipients}
                roomId={roomId}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  )
}
