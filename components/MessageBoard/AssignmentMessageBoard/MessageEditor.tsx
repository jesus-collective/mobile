import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api/lib/types"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { API, Auth, Storage } from "aws-amplify"
import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from "draft-js"
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
  UpdateDirectMessageInput,
  UpdateDirectMessageMutation,
} from "../../../src/API"
import * as customMutations from "../../../src/graphql-custom/mutations"
import * as mutations from "../../../src/graphql/mutations"
import FileUpload from "../FileUpload"
import { MessageComment } from "./MessageThread"
interface Props {
  roomId: string
  newAssignment?: boolean
  replyTo?: {
    name?: string
    messageId?: string
    messageRoomId?: string
    id?: string
  }
  clearReplyTo?: () => void
  post?: () => void
  recipients: Array<string | null>
  wordCount?: any
  assignment?: MessageComment | null
}

export default function MessageEditor(props: Props): JSX.Element {
  const { post, roomId, recipients, replyTo, clearReplyTo, wordCount, assignment, newAssignment } =
    props
  const editAssignment = assignment?.comment ? JSON.parse(assignment.comment) : null
  const contentState: RawDraftContentState | null = editAssignment
    ? { blocks: editAssignment?.blocks, entityMap: editAssignment?.entityMap }
    : null
  // Assignment.comment is saved as ContentState stringified
  const isReply = replyTo?.name && replyTo?.messageRoomId && replyTo?.messageId
  const [editorState, setEditorState] = useState<EditorState>(
    contentState
      ? EditorState.createWithContent(convertFromRaw(contentState))
      : EditorState.createEmpty()
  )
  const [attachmentOptions, setAttachmentOptions] = useState({
    attachment: assignment?.attachment ?? "",
    attachmentOwner: assignment?.attachmentOwner ?? "",
    attachmentName: assignment?.attachmentName ?? "",
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
  const updateMessage = async (): Promise<void> => {
    if (!editorState.getCurrentContent().hasText()) {
      return
    }
    const msg = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    if (msg) {
      try {
        const { attachment, attachmentName, attachmentOwner } = attachmentOptions
        const input: UpdateDirectMessageInput = {
          id: assignment?.id ?? "",
          attachmentName,
          attachmentOwner,
          attachment,
          content: msg,
        }
        try {
          const updateDirectMessage = (await API.graphql({
            query: customMutations.updateDirectMessage,
            variables: { input },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as Promise<GraphQLResult<UpdateDirectMessageMutation>>
          console.log({ "Success mutations.updateDirectMessage ": updateDirectMessage })
        } catch (err) {
          console.error({ "Error mutations.updateDirectMessage ": err })
          if (err.data.updateDirectMessage) {
            console.log("An errorr occurred", err)
            //setEditorState(EditorState.createEmpty())
          }
        } finally {
          setEditorState(EditorState.createEmpty())
          if (clearReplyTo) clearReplyTo()
          clearAttachments()
          if (post) post()
        }
      } catch (err) {
        console.log(err)
        setEditorState(EditorState.createEmpty())
        if (clearReplyTo) clearReplyTo()
        clearAttachments()
        if (post) post()
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
        } catch (err) {
          console.error({ "Error mutations.createDirectMessage ": err })
          if (err.data.createDirectMessage) {
            //setEditorState(EditorState.createEmpty())
          }
        } finally {
          setEditorState(EditorState.createEmpty())
          if (clearReplyTo) clearReplyTo()
          clearAttachments()
          if (post) post()
        }
      } catch (err) {
        console.log(err)
        setEditorState(EditorState.createEmpty())
        if (clearReplyTo) clearReplyTo()
        clearAttachments()
        if (post) post()
      }
    }
  }

  const saveReply = async () => {
    // this will only run after checking reply fields

    const replyToID = replyTo?.messageId ?? replyTo?.id
    console.log("replyToID", replyToID)
    if (!!replyToID) {
      try {
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
      } catch (err) {
        console.log(err)
      } finally {
        setEditorState(EditorState.createEmpty())
        if (clearReplyTo) clearReplyTo()
        clearAttachments()
      }
    }
  }

  const handleSubmit = async () => {
    if (newAssignment) return await saveMessage()
    if (isReply) return await saveReply()
    if (assignment) return await updateMessage()
    saveMessage()
  }
  return (
    <View style={{ paddingBottom: 30 }}>
      <Editor
        spellCheck
        wrapperStyle={
          assignment || newAssignment
            ? {
                height: 300,
                marginLeft: 0,
                backgroundColor: "#F9FAFC",
              }
            : { height: 150, marginLeft: 46 }
        }
        editorStyle={assignment ? { backgroundColor: "#F9FAFC" } : {}}
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
        <JCButton buttonType={ButtonTypes.SolidRightJustifiedMini} onPress={handleSubmit}>
          {assignment ? "Update" : "Post"}
        </JCButton>
        {wordCount ? (
          <Text style={{ textAlign: "right", marginRight: 8, alignSelf: "center" }}>
            {console.log(editorState)}
            Word count:{" "}
            {editorState.getCurrentContent().getPlainText().length === 0
              ? 0
              : editorState.getCurrentContent().getPlainText().split(" ").length}
            /{wordCount}
          </Text>
        ) : null}
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
