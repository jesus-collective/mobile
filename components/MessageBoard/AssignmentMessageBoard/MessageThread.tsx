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
    width: "100%",
    paddingRight: 15,
  },
})

export type MessageComment = {
  id?: string | null | undefined // Always the message's id
  attachment: string | null | undefined
  attachmentName: string | null | undefined
  attachmentOwner: string | null | undefined
  name: string | null | undefined // given_name + family_name
  currentRole: string | null | undefined // currentRole
  comment: string | null | undefined
  authorId: string | null | undefined
  roomId?: string | null | undefined
  createdAt?: string | null | undefined
  replies?: Array<MessageComment>
  updatedAt?: string | null | undefined
  recipients?: Array<string | null>
  messageId?: string | null | undefined // Message's id, or parent message id if its a reply to a response
  messageRoomId?: string | null | undefined
}

interface Props {
  thread: MessageComment
  open?: boolean
  wordCount: number
}

export default function MessageThread(props: Props): JSX.Element {
  const commentRef = useRef<any>(null)
  const textRef = useRef<any>(null)
  const { thread, wordCount } = props
  const { replies, roomId, recipients } = thread
  const replyCount = replyCounter(replies)
  const [user, setUser] = useState<JCCognitoUser["username"]>("")
  const [open, setOpen] = useState(props.open ?? false)
  const [replyTo, setReplyTo] = useState({
    name: "",
    messageRoomId: "",
    messageId: "",
    id: "",
  })
  const focusTextInput = () => {
    if (textRef?.current)
      textRef?.current?.scrollIntoView({
        behavior: "smooth",
      })
  }
  const focusFirstComment = () => {
    if (commentRef?.current)
      commentRef?.current?.scrollIntoView({
        behavior: "smooth",
      })
  }

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
        scrollToFirst={focusFirstComment}
        scrollToBottom={focusTextInput}
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
                    scrollToBottom={focusTextInput}
                    active={replyTo?.id === response?.messageId}
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
                        scrollToBottom={focusTextInput}
                        active={replyTo?.id === replyToReponse?.id}
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
              <ProfileImage linkToProfile={true} size="small2" user={user} />
            </View>
            <View ref={textRef} style={{ flex: 1 }}>
              <MessageEditor
                wordCount={wordCount}
                clearReplyTo={() =>
                  setReplyTo({ id: "", name: "", messageRoomId: "", messageId: "" })
                }
                replyTo={replyTo}
                recipients={recipients ?? []}
                roomId={roomId}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  )
}
