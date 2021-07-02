import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api/lib/types"
import { API, Auth } from "aws-amplify"
import { convertToRaw, EditorState } from "draft-js"
import React, { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import { Text, View } from "react-native"
import { v4 as uuidv4 } from "uuid"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import {
  CreateDirectMessageInput,
  CreateDirectMessageMutation,
  CreateDirectMessageReplyInput,
  CreateDirectMessageReplyMutation,
} from "../../src/API"
import * as mutations from "../../src/graphql/mutations"
interface Props {
  roomId: string
  replyTo: {
    name: string
    messageId?: string
    messageRoomId?: string
  }
  recipients: Array<string>
}
export default function MessageEditor(props: Props): JSX.Element {
  const { roomId, recipients, replyTo } = props
  const isReply = replyTo?.name && replyTo?.messageRoomId && replyTo?.messageId
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  // TODO ATTACHMENTS
  const saveMessage = async (): Promise<void> => {
    if (!editorState.getCurrentContent().hasText()) {
      return
    }
    const msg = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    if (msg) {
      try {
        const user = await Auth.currentAuthenticatedUser()
        const input: CreateDirectMessageInput = {
          id: uuidv4(),
          userId: user.username,
          content: msg,
          attachment: "",
          attachmentName: "",
          attachmentOwner: "",
          when: Date.now().toString(),
          messageRoomID: roomId,
          recipients: recipients,
        }
        try {
          const createDirectMessage = (await API.graphql({
            query: mutations.createDirectMessage,
            variables: { input },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as Promise<GraphQLResult<CreateDirectMessageMutation>>
          console.log({ "Success mutations.createDirectMessage ": createDirectMessage })
          setEditorState(EditorState.createEmpty())
        } catch (err) {
          console.error({ "Error mutations.createDirectMessage ": err })
          if (err.data.createDirectMessage) {
            setEditorState(EditorState.createEmpty())
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  // missing some logic for setting the replyToId (?) see MessageBoard.tsx @ line 690
  const saveReply = async () => {
    // this will only run after checking reply fields
    console.log("replying")
    console.log("messageId", replyTo?.messageRoomId)
    console.log("messageRoomID", replyTo?.messageId)
    const msg = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    const user = await Auth.currentAuthenticatedUser()
    const input: CreateDirectMessageReplyInput = {
      id: uuidv4(),
      content: msg,
      when: Date.now().toString(),
      attachment: "",
      attachmentName: "",
      attachmentOwner: "",
      messageRoomID: replyTo?.messageId,
      userId: user.username,
      messageId: replyTo?.messageRoomId ?? "",
      recipients: recipients ?? [],
      parentReplyId: "0000-0000-0000-0000", // void value
    }
    const createReply = (await API.graphql({
      query: mutations.createDirectMessageReply,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<CreateDirectMessageReplyMutation>
    console.log({ "Success mutations.createReply": createReply })
  }

  return (
    <View>
      {isReply ? <Text style={{ color: "black" }}>Replying to {props?.replyTo?.name}</Text> : null}
      <Editor
        wrapperStyle={{
          maxHeight: 150,
          marginTop: 0,
          flex: 1,
        }}
        placeholder={"Write a response...."}
        editorState={editorState}
        toolbarClassName="customToolbar"
        wrapperClassName={"customWrapperSendmessageCourse"}
        editorClassName={`customEditorSendmessage ${toolbar ? "has-toolbar" : "no-toolbar"}`}
        onEditorStateChange={(value) => {
          setEditorState(value)
        }}
        toolbarHidden={!toolbar}
        toolbar={{
          options: ["inline", "list", "emoji"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
          emoji: {
            popupClassName: "customEmojiModal",
          },
        }}
      />
      <JCButton
        buttonType={ButtonTypes.SolidRightJustifiedMini}
        onPress={async () => {
          isReply ? await saveReply() : await saveMessage()
        }}
      >
        Post
      </JCButton>
    </View>
  )
}
