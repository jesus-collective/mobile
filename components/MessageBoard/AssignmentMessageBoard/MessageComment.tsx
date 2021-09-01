import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import moment from "moment"
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import JCButton, { ButtonTypes } from "../../../components/Forms/JCButton"
import ProfileImage from "../../../components/ProfileImage/ProfileImage"
import MessageUtils from "../MessageUtils"
import MessageCommentStyles from "./MessageCommentStyles"
import { MessageComment } from "./MessageThread"

type EntryType = "assignment" | "reply" | "replyToReply" // assignment is thread parent, reply is a response, and replyToReply is a reply to a response or reply

interface CommentParams {
  active?: boolean
  comment: MessageComment
  openState: boolean
  setOpen: () => void
  setReplyTo: (a: any) => void
  type: EntryType
  replyCount?: string
  scrollToBottom: () => void
  scrollToFirst?: () => void
}

export default function Comment(props: CommentParams): JSX.Element {
  const style = MessageCommentStyles
  const isReply = props?.type === "reply" || props?.type === "replyToReply"
  const { name, attachment, currentRole, authorId, comment, createdAt, updatedAt } =
    props.comment as MessageComment
  const { type, openState, setOpen, setReplyTo, active, replyCount, scrollToBottom } = props
  const AssignmentBadge = (props: { type: EntryType }) => {
    const { type } = props
    return type === "assignment" ? (
      <View style={style.assignmentBadge}>
        <Text style={style.assignmentBadgeText}>Assignment Posted</Text>
      </View>
    ) : null
  }
  const handleReplyPress = () => {
    return isReply
      ? setReplyTo((prev) => {
          if (prev.id === props.comment.id) {
            return {
              name: "",
              messageId: "",
              messageRoomId: "",
              id: "",
            }
          } else {
            scrollToBottom()
            const a = {
              name: props?.comment?.name,
              messageId: props?.comment?.messageId ?? "",
              messageRoomId: props?.comment?.messageRoomId ?? "",
              id: props?.comment?.id,
            }
            return a
          }
        })
      : setOpen() // scrollToBottom after opening
  }
  const CommentButton = (props: { comment: MessageComment; type: EntryType }) => {
    const buttonText =
      props?.type === "reply" || props?.type === "replyToReply" ? "Reply" : "Responses"
    return isReply || !openState ? (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ alignSelf: "flex-end", marginTop: 8 }}>
          <JCButton onPress={handleReplyPress} buttonType={ButtonTypes.OutlineSmall}>
            {buttonText}
          </JCButton>
        </View>
      </View>
    ) : null
  }
  const DateTag = ({ createdDate, updatedDate }: { updatedDate: string; createdDate: string }) => {
    const now = moment()
    const datePosted = moment(createdDate)
    const daysSince = now.diff(datePosted, "days")
    const edited = createdDate < updatedDate ? moment(updatedDate) : null
    return (
      <Text style={[style.subHeaderText, { marginTop: 2 }]}>
        {daysSince > 7 ? datePosted.format("YYYY-MM-DD h:mm a") : datePosted.format("dddd h:mm a")}

        <Text style={{ fontSize: 11 }}>
          {edited ? "  Last edited on " + edited.format("YYYY-MM-DD h:mm a") : null}
        </Text>
      </Text>
    )
  }

  const convertCommentFromJSONToHTML = (text: string | undefined | null) => {
    if (text) return stateToHTML(convertFromRaw(JSON.parse(text ?? "")))
    return text
  }
  return (
    <TouchableOpacity
      onPress={handleReplyPress}
      style={[
        { flexDirection: "row", marginBottom: 30 },
        type === "replyToReply" ? { marginLeft: 80 } : {},
      ]}
    >
      <View style={style.imageContainer}>
        {type === "assignment" ? (
          <TouchableOpacity onPress={() => setOpen()}>
            <Image
              style={[style.arrowImage, openState ? style.arrowDown : {}]}
              source={require("../../../assets/svg/ArrowRightBlack.svg")}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 38 }} />
        )}
        <ProfileImage linkToProfile={true} size="small2" user={authorId ?? null} />
      </View>
      <View
        style={[
          style.contentContainer,
          active
            ? {
                backgroundColor: "rgba(113, 194, 9, 0.15)",
                borderWidth: 1,
                borderRadius: 4,
                borderColor: "rgba(113, 194, 9, 0.8)",
              }
            : {},
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={style.headerText}>{name}</Text>
            <Text style={style.subHeaderText}>{currentRole}</Text>
            {createdAt ? <DateTag updatedDate={updatedAt ?? ""} createdDate={createdAt} /> : null}
            <AssignmentBadge type={type} />
          </View>
          <CommentButton comment={props?.comment} type={type} />
        </View>
        <Text style={[style.contentText, openState ? { marginTop: 20 } : {}]}>
          <div
            onClick={() => null}
            dangerouslySetInnerHTML={{
              __html: openState
                ? convertCommentFromJSONToHTML(comment ?? "")
                    ?.replaceAll("<p>", "")
                    .replaceAll("</p>", "")
                : convertCommentFromJSONToHTML(comment)?.split("</p>")?.[0].slice(0, 250) + "...",
            }}
          />
        </Text>
        {type === "assignment" && !openState ? (
          <TouchableOpacity style={{ width: "11ch" }} onPress={setOpen}>
            <Text style={[style.subHeaderText, { marginTop: 4, textDecorationLine: "underline" }]}>
              {replyCount}
            </Text>
          </TouchableOpacity>
        ) : null}
        {openState && attachment ? MessageUtils.renderFileDownloadBadge(props?.comment) : null}
      </View>
    </TouchableOpacity>
  )
}
