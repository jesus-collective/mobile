import { convertFromRaw, EditorState } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import moment from "moment"
import React, { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import JCButton, { ButtonTypes } from "../Forms/JCButton"

const style = StyleSheet.create({
  container: {
    zIndex: 1000000,
    flexDirection: "column",
    backgroundColor: "white",
    width: "80%",
  },
  contentContainer: {
    backgroundColor: "#F9FAFC",
    borderRadius: 4,
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 8,
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
    fontSize: 12,
    color: "#333",
    fontFamily: "Graphik-Semibold-App",
    lineHeight: 28,
    marginLeft: 2,
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
  personImage: {
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    justifyContent: "center",
    width: 60,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E4E1E1",
    height: 80,
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
  pictureUri: string
  createdAt?: string
}
interface CommentParams {
  comment: Person
  type: EntryType
}
interface Props {
  person: Person
  replies: Array<any>
}

type EntryType = "assignment" | "reply"

export default function MessageThread(props: Props): JSX.Element {
  const { replies, person } = props
  const [open, setOpen] = useState(false)
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  console.log("createdAt", person.createdAt)
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
          <JCButton onPress={() => setOpen((prev) => !prev)} buttonType={ButtonTypes.OutlineSmall}>
            Comment
          </JCButton>
        </View>
      </View>
    ) : null
  }
  const DateTag = ({ date }: { date: string }) => {
    const now = moment()
    const datePosted = moment(date)
    const daysSince = now.diff(datePosted, "days")
    return (
      <Text style={[style.subHeaderText, { marginTop: 18, marginLeft: 8 }]}>
        {daysSince > 7
          ? datePosted.format("YYYY-MM-DD HH:mm a")
          : datePosted.format("dddd HH:mm a")}
      </Text>
    )
  }

  const convertCommentFromJSONToHTML = (text: string | null) => {
    return stateToHTML(convertFromRaw(JSON.parse(text)))
  }
  const ReplyCount = () => {
    let countString = ""
    if (replies.length === 1) countString = "1 reply"
    if (replies.length > 1) countString = `${replies.length} replies`
    if (replies.length === 0) countString = "No replies"
    return (
      <TouchableOpacity onPress={() => setOpen((prev) => !prev)}>
        <Text style={[style.subHeaderText, { marginTop: 4, textDecorationLine: "underline" }]}>
          {countString}
        </Text>
      </TouchableOpacity>
    )
  }
  const Comment = (props: CommentParams) => {
    const { name, position, pictureUri, comment, createdAt } = props.comment
    const { type } = props
    return (
      <View style={{ flexDirection: "row", marginBottom: 30 }}>
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
          <Image width={300} height={450} style={style.personImage} source={{ uri: pictureUri }} />
        </View>
        <View style={style.contentContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={style.headerText}>{name}</Text>
              <Text style={style.subHeaderText}>{position}</Text>
              <View style={{ flexDirection: "row" }}>
                <AssignmentBadge type={type} />
                {createdAt ? <DateTag date={createdAt} /> : null}
              </View>
            </View>
            <CommentButton />
          </View>
          {type === "assignment" ? (
            <div
              onClick={() => null}
              dangerouslySetInnerHTML={{
                __html: open
                  ? convertCommentFromJSONToHTML(comment)
                  : convertCommentFromJSONToHTML(comment)?.split("</p>")?.[0],
              }}
            />
          ) : (
            <Text>{comment}</Text>
          )}
          <ReplyCount />
        </View>
      </View>
    )
  }
  return (
    <View style={style.container}>
      <Comment comment={person} type="assignment"></Comment>
      <View style={{ flexDirection: "column" }}>
        {open
          ? replies?.map((comment: Person, index) => {
              return <Comment key={index} type="reply" comment={comment} />
            })
          : null}
        {open ? (
          <View style={{ flexDirection: "row" }}>
            <View style={style.imageContainer}>
              <View style={{ width: 38 }} />
              <Image
                width={300}
                height={450}
                style={style.editorImage}
                source={{ uri: props.person.pictureUri }}
              />
            </View>
            <View style={{ flex: 1, paddingBottom: 16 }}>
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
                editorClassName={`customEditorSendmessage ${
                  toolbar ? "has-toolbar" : "no-toolbar"
                }`}
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
                  null
                }}
              >
                Save
              </JCButton>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  )
}
