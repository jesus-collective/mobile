import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api/lib/types"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { API, Auth, Storage } from "aws-amplify"
import { convertToRaw, EditorState } from "draft-js"
import { Badge } from "native-base"
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
import FileUpload from "../FileUpload"
interface Props {
  roomId: string
  replyTo: {
    name: string
    messageId?: string
    messageRoomId?: string
    id?: string
  }
  clearReplyTo: () => void
  recipients: Array<string | null>
}

export default function MessageEditor(props: Props): JSX.Element {
  const { roomId, recipients, replyTo, clearReplyTo } = props
  const isReply = replyTo?.name && replyTo?.messageRoomId && replyTo?.messageId
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [attachmentOptions, setAttachmentOptions] = useState({
    attachment: "",
    attachmentOwner: "",
    attachmentName: "",
  })
  // TODO ATTACHMENTS
  const clearAttachments = () => {
    setAttachmentOptions({ attachment: "", attachmentOwner: "", attachmentName: "" })
  }

  const renderFileIcon = (filePath?: string | null): React.ReactNode => {
    if (!filePath) return null
    const lastDot = filePath?.lastIndexOf(".")
    const ext = filePath?.substring(lastDot + 1).toLowerCase()
    switch (ext) {
      case "pdf":
        return <FontAwesome5 name="file-pdf" size={22} color="black" />
      case "doc":
      case "docx":
        return <FontAwesome5 name="file-word" size={22} color="black" />
      case "ppt":
      case "pptx":
        return <FontAwesome5 name="file-powerpoint" size={22} color="black" />
      case "xls":
      case "xlsx":
        return <FontAwesome5 name="file-excel" size={22} color="black" />
      default:
        return null
    }
  }
  const renderFileUploadBadge = (): React.ReactNode => {
    const { attachment } = attachmentOptions
    return (
      <View>
        <Badge style={{ backgroundColor: "#EFF1F5", marginRight: 10, marginTop: 5, height: 30 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {renderFileIcon(attachment)}
            <Text style={{ fontSize: 16, marginHorizontal: 5 }}>{processFileName(attachment)}</Text>
            <TouchableOpacity onPress={() => clearAttachments()}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </Badge>
      </View>
    )
  }

  const processFileName = (filePath?: string | null): string => {
    if (!filePath) return ""
    const urlStripped = filePath.split("messages/uploads/")[1]
    const lastDash = urlStripped.lastIndexOf("-")
    const fileName = urlStripped.substring(lastDash + 1)
    return fileName
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files && e.target.files?.length > 0 ? e.target.files[0] : null
    if (file) {
      try {
        const user = await Auth.currentCredentials()
        const userId = user.identityId
        const fn = "messages/uploads/" + "jc-upload-" + new Date().getTime() + "-" + file.name
        const upload = await Storage.put(fn, file, {
          level: "protected",
          contentType: file.type,
          identityId: userId,
        })
        if (upload) {
          setAttachmentOptions({ ...attachmentOptions, attachment: fn, attachmentOwner: userId })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

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
        const { attachment, attachmentName, attachmentOwner } = attachmentOptions
        const input: CreateDirectMessageInput = {
          id: uuidv4(),
          userId: user.username,
          content: msg,
          attachment: attachment,
          attachmentName: attachmentName,
          attachmentOwner: attachmentOwner,
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
            //setEditorState(EditorState.createEmpty())
          }
        } finally {
          clearAttachments()
        }
      } catch (err) {
        console.log(err)
        clearAttachments()
      }
    }
  }

  const saveReply = async () => {
    // this will only run after checking reply fields

    const replyToID = replyTo?.messageId ?? replyTo.id
    console.log("replyToID", replyToID)
    if (!!replyToID) {
      const { attachment, attachmentName, attachmentOwner } = attachmentOptions
      const msg = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      const user = await Auth.currentAuthenticatedUser()
      const input: CreateDirectMessageReplyInput = {
        id: uuidv4(),
        content: msg,
        when: Date.now().toString(),
        attachment: attachment,
        attachmentName: attachmentName,
        attachmentOwner: attachmentOwner,
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
      clearAttachments()
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
        toolbarCustomButtons={[
          <FileUpload key="fileupload" handleUploadCallback={(e) => handleUpload(e)} />,
        ]}
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
        {attachmentOptions?.attachment ? renderFileUploadBadge() : null}
      </View>
    </View>
  )
}
