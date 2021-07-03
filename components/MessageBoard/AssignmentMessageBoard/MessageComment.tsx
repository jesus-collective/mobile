import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import moment from "moment"
import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import JCButton, { ButtonTypes } from "../../../components/Forms/JCButton"
import ProfileImage from "../../../components/ProfileImage/ProfileImage"
import { EntryType, MessageComment } from "./MessageThread"

const style = StyleSheet.create({
  container: {
    zIndex: 1000000,
    flexDirection: "column",
    backgroundColor: "white",
    width: "85%",
  },
  contentContainer: {
    backgroundColor: "#F9FAFC",
    shadowColor: "#000",
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: 4,
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 8,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Graphik-Bold-App",
    lineHeight: 21,
    letterSpacing: -0.3,
  },
  subHeaderText: {
    fontSize: 12,
    color: "#333",
    fontFamily: "Graphik-Regular-App",
    opacity: 0.6,
    lineHeight: 16,
    letterSpacing: -0.3,
  },
  contentText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Graphik-Regular-App",
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  imageContainer: {
    flexDirection: "row",
    marginVertical: 8,
    marginRight: 8,
  },
  arrowImage: {
    flexDirection: "column",
    width: 22,
    height: 22,
    backgroundColor: "white",
    marginTop: 28,
    marginHorizontal: 8,
  },
  arrowDown: {
    transform: [{ rotate: "-90deg" }],
  },
  assignmentBadge: {
    marginTop: 17,
    marginBottom: 10,
    backgroundColor: "#71C209",
    borderRadius: 16,
    padding: 4,
    width: "20ch",
  },
  assignmentBadgeText: {
    color: "white",
    textTransform: "uppercase",
    fontFamily: "Graphik-Semibold-App",
    fontSize: 11,
    textAlign: "center",
  },
  editorImage: {
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    alignSelf: "center",
    width: 60,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E4E1E1",
    height: 80,
  },
})

interface CommentParams {
  comment: MessageComment
  openState: boolean
  setOpen: () => void
  setReplyTo: (a: any) => void
  type: EntryType
}

export default function Comment(props: CommentParams): JSX.Element {
  const {
    name,
    position,
    authorId,
    comment,
    createdAt,
    updatedAt,
  } = props.comment as MessageComment
  const { type, openState, setOpen, setReplyTo } = props

  const AssignmentBadge = (props: { type: EntryType }) => {
    const { type } = props
    return type === "assignment" ? (
      <View style={style.assignmentBadge}>
        <Text style={style.assignmentBadgeText}>Assignment Posted</Text>
      </View>
    ) : null
  }

  const CommentButton = (props: { comment: MessageComment; type: EntryType }) => {
    const isReply = props?.type === "reply" || props?.type === "replyToReply"
    const { comment } = props
    return isReply || !openState ? (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ alignSelf: "flex-end", marginTop: 8 }}>
          <JCButton
            onPress={() => {
              isReply
                ? setReplyTo((prev) => {
                    if (prev.messageRoomId === comment.messageRoomId) {
                      return {
                        name: "",
                        messageId: "",
                        messageRoomId: "",
                      }
                    } else {
                      return {
                        name: props?.comment?.name,
                        messageId: props?.comment?.messageId ?? "",
                        messageRoomId: props?.comment?.messageRoomId ?? "",
                      }
                    }
                  })
                : setOpen()
            }}
            buttonType={ButtonTypes.OutlineSmall}
          >
            {isReply ? "Reply" : "Comment"}
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
        {daysSince > 7
          ? datePosted.format("YYYY-MM-DD HH:mm a")
          : datePosted.format("dddd HH:mm a")}

        <Text style={{ fontSize: 11 }}>
          {edited ? "  Last edited on " + edited.format("YYYY-MM-DD HH:mm a") : null}
        </Text>
      </Text>
    )
  }

  const convertCommentFromJSONToHTML = (text: string | null) => {
    if (text) return stateToHTML(convertFromRaw(JSON.parse(text ?? "")))
    return text
  }
  const ReplyCount = (replies) => {
    let countString = ""
    if (replies) {
      if (replies?.length === 1) countString = "1 comment"
      if (replies?.length > 1) {
        let replyCounter: number = replies?.length
        replies?.forEach((reply) => {
          replyCounter += reply?.replies?.length ?? 0
        })
        countString = `${replyCounter} comments`
      }
    }
    if (replies?.length === 0) countString = "No comments"
    return (
      <TouchableOpacity onPress={() => setOpen()}>
        <Text style={[style.subHeaderText, { marginTop: 4, textDecorationLine: "underline" }]}>
          {countString}
        </Text>
      </TouchableOpacity>
    )
  }
  return (
    <View
      style={[
        { flexDirection: "row", marginBottom: 30 },
        type === "replyToReply" ? { marginLeft: 80 } : {},
        {
          /* This cannot be hard coded. needs to be the same size as the first column */
        },
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
        <ProfileImage size="small2" user={authorId ?? null} />
      </View>
      <View style={style.contentContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={style.headerText}>{name}</Text>
            <Text style={style.subHeaderText}>{position}</Text>
            {createdAt ? <DateTag updatedDate={updatedAt ?? ""} createdDate={createdAt} /> : null}

            <AssignmentBadge type={type} />
          </View>
          <View style={{ marginLeft: 16, marginTop: 8 }}>
            <JCButton
              onPress={() => console.log(props?.comment)}
              buttonType={ButtonTypes.OutlineSmall}
            >
              Debug
            </JCButton>
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
                    .replaceAll("</p>", "") ?? ""
                : convertCommentFromJSONToHTML(comment)?.split("</p>")?.[0] ?? "",
            }}
          />
        </Text>
        {type === "assignment" && !openState ? <ReplyCount /> : null}
      </View>
    </View>
  )
}
