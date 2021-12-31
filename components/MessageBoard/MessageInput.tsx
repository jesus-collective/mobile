import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { Auth, Storage } from "aws-amplify"
import { convertToRaw, EditorState, getDefaultKeyBinding } from "draft-js"
import React, { useEffect, useState } from "react"
import { Editor, SyntheticKeyboardEvent } from "react-draft-wysiwyg"
import { Text, TouchableOpacity, View } from "react-native"
import { CreateMessageInput, CreateReplyInput } from "src/API"
import { JCCognitoUser } from "src/types"
import { v4 as uuidv4 } from "uuid"
import { Data } from "../../components/Data/Data"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import FileUpload from "./FileUpload"
import { ReplyState } from "./MessageBoard"
type Props = {
  replyState: ReplyState
  clearReplyState: () => void
  groupId?: string
  replyMode?: boolean
}
const MessageInput = (props: Props) => {
  const { replyMode } = props
  const [state, setState] = useState({
    userId: "",
    editorState: EditorState.createEmpty(),
    attachment: "",
    attachmentOwner: "",
    attachmentName: "",
    showVideo: false,
  })
  const sendReply = async () => {
    const { editorState, attachment, attachmentName, attachmentOwner } = state
    const { replyToId, replyToRoomId } = replyState
    if (!editorState.getCurrentContent().hasText() || !replyToId || !replyToRoomId) {
      return
    }
    if (props.groupId) {
      try {
        const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
        const input: CreateReplyInput = {
          id: uuidv4(),
          content: message,
          when: Date.now().toString(),
          attachment: attachment,
          attachmentName: attachmentName,
          attachmentOwner: attachmentOwner,
          roomId: replyToRoomId,
          userId: user.username,
          messageId: replyToId,
          parentReplyId: "0000-0000-0000-0000", // void value
        }

        const createReply = await Data.createReply(input)
        console.log({ "Success Data.createReply": createReply })
        setState({
          ...state,
          editorState: EditorState.createEmpty(),
          attachmentName: "",
          attachment: "",
          attachmentOwner: "",
        })
        clearReplyState()
      } catch (e: any) {
        console.log("error", e)
        if (e.data?.createReply) {
          console.log({ "Success Data.createReply": e.data })
          setState({
            ...state,
            editorState: EditorState.createEmpty(),
            attachmentName: "",
            attachment: "",
            attachmentOwner: "",
          })
          clearReplyState()
        } else {
          console.error({ "Error Data.createReply": e })
        }
      }
    }
  }
  const saveMessage = async (): Promise<void> => {
    const { editorState, attachment, attachmentName, attachmentOwner } = state

    if (!editorState.getCurrentContent().hasText()) {
      return
    }

    const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    try {
      const user = await Auth.currentAuthenticatedUser()
      const input: CreateMessageInput = {
        id: uuidv4(),
        content: message,
        when: Date.now().toString(),
        attachment: attachment,
        attachmentName: attachmentName,
        attachmentOwner: attachmentOwner,
        roomId: props.groupId,
        userId: user.username,
        owner: user.username,
        //authorOrgId: "0"
      }
      try {
        const createMessage = await Data.createMessage(input)
        console.log({ "Success Data.createMessage": createMessage })
        setState({
          ...state,
          editorState: EditorState.createEmpty(),
          attachmentName: "",
          attachment: "",
          attachmentOwner: "",
        })
      } catch (err: any) {
        console.error({ "Error Data.createMessage": err })
        setState({
          ...state,
          editorState: EditorState.createEmpty(),
          attachmentName: "",
          attachment: "",
          attachmentOwner: "",
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  const { replyState, clearReplyState } = props
  // let replyToText = ""

  // if (replyState.replyToWho.length > 0) {
  //   replyToText = replyState.replyToWho[0]
  // }
  // if (replyState.replyToWho.length > 1) {
  //   replyToText = `${replyState.replyToWho[0]} and ${replyState.replyToWho[1]}`
  // }
  // if (replyState.replyToWho.length > 2) {
  //   replyToText = `${replyState.replyToWho[0]} and others`
  // }

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
          identityId: userId, // ?
        })
        if (upload) setState({ ...state, attachment: fn, attachmentOwner: userId })
      } catch (e) {
        console.error(e)
      }
    }
  }
  const updateEditorInput = (value: EditorState) => {
    setState({
      ...state,
      editorState: value,
    })
  }

  const processFileName = (filePath?: string | null): string => {
    if (!filePath) return ""

    const urlStripped = filePath.split("messages/uploads/")[1]
    const lastDash = urlStripped.lastIndexOf("-")
    const fileName = urlStripped.substring(lastDash + 1)
    return fileName
  }
  const renderFileIcon = (filePath?: string | null) => {
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

  const renderFileUploadBadge = ({ attachment }: { attachment: string }) => {
    return (
      <View
        style={{
          width: 100,
          backgroundColor: "#EFF1F5",
          marginRight: 10,
          marginTop: 5,
          padding: 8,
          borderRadius: 8,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          {renderFileIcon(attachment)}
          <Text numberOfLines={1} style={{ fontSize: 16, marginHorizontal: 5 }}>
            {processFileName(attachment)}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setState((prev) => ({
                ...prev,
                attachment: "",
                attachmentName: "",
                attachmentOwner: "",
              }))
            }
          >
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  useEffect(() => {
    const loadUser = async () => {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      setState((prev) => ({ ...prev, userId: user.username }))
    }
    if (!state.userId) loadUser()
  }, [state.userId])
  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      {/* {replyToText && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 120,
            marginRight: "auto",
            alignItems: "center",
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
            Replying to {replyToText}
          </Text>
          <TouchableOpacity onPress={clearReplyState}>
            <AntDesign name="closecircleo" size={20} color="#333333" />
          </TouchableOpacity>
        </View>
      )} */}
      {state.attachment ? renderFileUploadBadge({ attachment: state.attachment }) : null}
      {replyMode ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingRight: 16,
            paddingBottom: 32,
            paddingTop: 32,
            backgroundColor: "#fff",
            borderRadius: 8,
            marginLeft: 64,
          }}
        >
          <ProfileImage linkToProfile size="small2" user={state.userId} />
          <View
            style={{
              backgroundColor: "#FAFAFA",
              borderWidth: 1,
              borderColor: "#E4E1E1",
              flex: 1,
              borderRadius: 8,
              marginLeft: 16,
            }}
          >
            <Editor
              placeholder={"Add your comment..."}
              editorState={state.editorState}
              onEditorStateChange={updateEditorInput}
              wrapperStyle={{
                display: "flex",
                flexDirection: "column-reverse",
                flex: 1,
              }}
              keyBindingFn={(e: SyntheticKeyboardEvent): string | null => {
                if (e.key === "Enter") {
                  const confirmation = confirm("Are you sure you want to submit?")
                  if (confirmation) replyState.replyToId ? sendReply() : saveMessage() // should open collpased comments
                  return null
                }
                return getDefaultKeyBinding(e)
              }}
              editorStyle={{
                all: "unset",
                overflow: "auto",
                paddingRight: 14,
                fontFamily: "Graphik-Regular-App",
                flex: 1,
                paddingLeft: 14,
                paddingTop: 14,
                marginTop: "-1em",
                marginBottom: 0,
                borderWidth: 1,
              }}
              toolbarHidden={true}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#E4E1E1",
            flexDirection: "row",
            paddingRight: 16,
            paddingTop: 32,
            paddingBottom: 32,
            paddingLeft: 16,
            minHeight: 252,
            backgroundColor: "#fff",
            marginBottom: 32,
            borderRadius: 8,
          }}
        >
          <ProfileImage linkToProfile size="editorLarge" user={state.userId} />
          <View
            style={{
              backgroundColor: "#FAFAFA",
              borderWidth: 1,
              borderColor: "#E4E1E1",
              flex: 1,
              borderRadius: 8,
              marginLeft: 16,
            }}
          >
            <Editor
              placeholder={"Add your post"}
              editorState={state.editorState}
              onEditorStateChange={updateEditorInput}
              wrapperStyle={{
                display: "flex",
                flexDirection: "column-reverse",
                flex: 1,
              }}
              editorStyle={{
                all: "unset",
                overflow: "auto",
                paddingRight: 14,
                fontFamily: "Graphik-Regular-App",
                flex: 1,
                paddingLeft: 14,
                paddingTop: 14,
                marginTop: "-1em",
                marginBottom: 0,
                borderWidth: 1,
              }}
              toolbarHidden={!toolbar}
              toolbarStyle={{
                display: "flex",
                flexDirection: "row-reverse",
                borderWidth: 0,
                paddingBottom: 18,
                backgroundColor: "#FAFAFA",
              }}
              toolbarCustomButtons={[
                <FileUpload key="fileupload" handleUploadCallback={(e) => handleUpload(e)} />,
                <View style={{ marginLeft: 8 }}>
                  <GenericButton
                    label="Add Comment"
                    style={{
                      ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                      LabelStyle: GenericButtonStyles.QuarternaryLabelStyle,
                      custom: {
                        alignSelf: "flex-end",
                        height: 32,
                        justifyContent: "center",
                        paddingHorizontal: 16,
                        paddingVertical: 18,
                        alignItems: "center",
                      },
                      customLabel: { textTransform: "uppercase", fontSize: 12, letterSpacing: 1 },
                    }}
                    action={async () => {
                      replyState.replyToId ? await sendReply() : await saveMessage()
                    }}
                  />
                </View>,
              ]}
              toolbar={{
                inline: {
                  options: ["bold", "italic", "underline"],
                },
                options: ["inline", "list", "emoji"],

                list: {
                  options: ["unordered", "ordered"],
                },
                emoji: {
                  popupClassName: "customEmojiModal",
                },
              }}
            />
          </View>
        </View>
      )}
    </View>
  )
}
export default MessageInput
