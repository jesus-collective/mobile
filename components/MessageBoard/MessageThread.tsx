import { Auth } from "aws-amplify"
import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import moment from "moment"
import React, { useEffect, useRef, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { JCCognitoUser } from "src/types"
import JCButton, { ButtonTypes } from "../Forms/JCButton"
import ProfileImage from "../ProfileImage/ProfileImage"
import MessageEditor from "./MessageEditor"

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

export type Person = {
  name: string
  position: string
  comment: string
  authorId: string
  roomId?: string
  createdAt?: string
  replies?: Array<any>
  updatedAt?: string
  recipients: Array<string>
}
interface CommentParams {
  comment: Person
  type: EntryType
}
interface Props {
  person: Person
  open?: boolean
}

type EntryType = "assignment" | "reply" | "replyToReply"

export default function MessageThread(props: Props): JSX.Element {
  const commentRef = useRef<any>(null)
  const { person } = props
  const { replies, roomId, recipients } = person
  const [user, setUser] = useState<JCCognitoUser["username"]>("")
  const [open, setOpen] = useState(props.open)

  const AssignmentBadge = (props: { type: EntryType }) => {
    const { type } = props
    return type === "assignment" ? (
      <View style={style.assignmentBadge}>
        <Text style={style.assignmentBadgeText}>Assignment Posted</Text>
      </View>
    ) : null
  }

  const CommentButton = () => {
    return !open ? (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ alignSelf: "flex-end", marginTop: 8 }}>
          <JCButton
            onPress={() => {
              setOpen((prev) => !prev)
            }}
            buttonType={ButtonTypes.OutlineSmall}
          >
            Comment
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
  const ReplyCount = () => {
    let countString = ""
    if (replies) {
      if (replies?.length === 1) countString = "1 reply"
      if (replies?.length > 1) countString = `${replies.length} replies`
    }
    if (replies?.length === 0) countString = "No replies"
    return (
      <TouchableOpacity onPress={() => setOpen((prev) => !prev)}>
        <Text style={[style.subHeaderText, { marginTop: 4, textDecorationLine: "underline" }]}>
          {countString}
        </Text>
      </TouchableOpacity>
    )
  }
  const Comment = (props: CommentParams) => {
    const { name, position, authorId, comment, createdAt, updatedAt } = props.comment as Person
    const { type } = props
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
            <TouchableOpacity onPress={() => setOpen((prev) => !prev)}>
              <Image
                style={[style.arrowImage, open ? style.arrowDown : {}]}
                source={require("../../assets/svg/ArrowRightBlack.svg")}
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
            <CommentButton />
          </View>
          <Text style={[style.contentText, open ? { marginTop: 20 } : {}]}>
            <div
              onClick={() => null}
              dangerouslySetInnerHTML={{
                __html: open
                  ? convertCommentFromJSONToHTML(comment ?? "")
                      ?.replaceAll("<p>", "")
                      .replaceAll("</p>", "") ?? ""
                  : convertCommentFromJSONToHTML(comment)?.split("</p>")?.[0] ?? "",
              }}
            />
          </Text>
          {type === "assignment" && !open ? <ReplyCount /> : null}
        </View>
      </View>
    )
  }

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
      <Comment comment={person} type="assignment"></Comment>
      <View style={{ flexDirection: "column" }}>
        {open
          ? replies?.map((comment: Person, index) => {
              return (
                <View key={index}>
                  <Comment key={index} type="reply" comment={comment} />
                  {comment?.replies?.map((a) => {
                    return <Comment type="replyToReply" comment={a} key={a?.id}></Comment>
                  })}
                </View>
              )
            })
          : null}
        {open ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              {user ? <ProfileImage size="small2" user={user} /> : null}
            </View>
            <View style={{ flex: 1 }}>
              {roomId ? <MessageEditor recipients={recipients} roomId={roomId} /> : null}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  )
}
