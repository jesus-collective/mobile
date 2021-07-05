import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api/lib/types"
import { AntDesign } from "@expo/vector-icons"
import { API, Auth } from "aws-amplify"
import { convertToRaw, EditorState } from "draft-js"
import React, { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import { Text, TouchableOpacity, View } from "react-native"
import { v4 as uuidv4 } from "uuid"
import JCButton, { ButtonTypes } from "../../../components/Forms/JCButton"
import {
  CreateDirectMessageInput,
  CreateDirectMessageMutation,
  CreateDirectMessageReplyInput,
  CreateDirectMessageReplyMutation,
} from "../../../src/API"
import * as mutations from "../../../src/graphql/mutations"
interface Props {
  roomId: string
  replyTo: {
    name: string
    messageId?: string
    messageRoomId?: string
    id?: string
  }
  clearReplyTo: () => void
  recipients: Array<string>
}
export default function MessageEditor(props: Props): JSX.Element {
  const { roomId, recipients, replyTo, clearReplyTo } = props
  const isReply = replyTo?.name && replyTo?.messageRoomId && replyTo?.messageId
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  // TODO ATTACHMENTS
  const saveMessage = async (): Promise<void> => {
    console.log("Posting a response.")
    console.log("messageRoomId", roomId)
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
          clearReplyTo()
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
  const saveReply = async () => {
    // this will only run after checking reply fields

    const replyToID = replyTo?.messageId ?? replyTo.id
    console.log("replyToID", replyToID)
    if (!!replyToID) {
      const msg = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      const user = await Auth.currentAuthenticatedUser()
      const input: CreateDirectMessageReplyInput = {
        id: uuidv4(),
        content: msg,
        when: Date.now().toString(),
        attachment: "",
        attachmentName: "",
        attachmentOwner: "",
        messageRoomID: replyTo?.messageRoomId,
        userId: user.username,
        messageId: replyToID ?? "",
        recipients: recipients ?? [],
        parentReplyId: "0000-0000-0000-0000", // void value
      }
      const createReply = (await API.graphql({
        query: mutations.createDirectMessageReply,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateDirectMessageReplyMutation>
      console.log({ "Success mutations.createReply": createReply })
      setEditorState(EditorState.createEmpty())
      clearReplyTo()
    }
  }

  return (
    <View style={{ paddingBottom: 30 }}>
      <Editor
        spellCheck
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
      <View style={{ flexDirection: "row-reverse" }}>
        <JCButton
          buttonType={ButtonTypes.SolidRightJustifiedMini}
          onPress={async () => {
            isReply ? await saveReply() : await saveMessage()
          }}
        >
          Post
        </JCButton>
        {isReply ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <Text
              style={{
                color: "#333333",
                fontFamily: "Graphik-Regular-App",
                fontSize: 16,
                fontWeight: "bold",
                marginRight: 12,
                marginBottom: 4,
              }}
            >
              Replying to {props?.replyTo?.name}
            </Text>
            <TouchableOpacity onPress={clearReplyTo}>
              <AntDesign name="closecircleo" size={20} color="#333333" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  )
}
