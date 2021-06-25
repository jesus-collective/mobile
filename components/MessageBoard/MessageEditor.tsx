import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api/lib/types"
import { API, Auth } from "aws-amplify"
import { convertToRaw, EditorState } from "draft-js"
import React, { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import { View } from "react-native"
import { v4 as uuidv4 } from "uuid"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import { CreateDirectMessageInput, CreateDirectMessageMutation } from "../../src/API"
import * as mutations from "../../src/graphql/mutations"
interface Props {
  roomId: string
  recipients: Array<string>
}
export default function MessageEditor(props: Props): JSX.Element {
  const { roomId, recipients } = props
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const saveMessage = async (): Promise<void> => {
    if (!editorState.getCurrentContent().hasText()) {
      return
    }
    const msg = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    console.log("msg", msg)
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

  return (
    <View>
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
          await saveMessage()
        }}
      >
        Post
      </JCButton>
    </View>
  )
}
