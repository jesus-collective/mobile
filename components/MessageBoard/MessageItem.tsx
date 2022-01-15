import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import moment, { Moment } from "moment"
import React from "react"
import { isMobileOnly } from "react-device-detect"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { Message, Reply } from "./MessageList"
import { DM } from "./MessageListDirect"
import MessageUtils from "./MessageUtils"

type Props = {
  item: Message | Reply | DM
  index: number
  isReply: boolean
  now: Moment
  isDM?: boolean
  isMine?: boolean
}

const style = StyleSheet.create({
  MessageContainer: {
    paddingRight: isMobileOnly ? 12 : 16,
    paddingLeft: isMobileOnly ? 12 : 16,
    paddingBottom: isMobileOnly ? 12 : 0,
    paddingTop: isMobileOnly ? 12 : 32,
  },
  ReplyContainer: {
    paddingLeft: isMobileOnly ? 12 : 0,
    paddingBottom: 0,
    marginLeft: isMobileOnly ? 0 : 64,
    borderBottomWidth: 0,
  },
  NameText: {
    color: "#1A0706",
    fontFamily: "Graphik-Semibold-App",
    fontSize: 16,
    lineHeight: 24,
  },
  RoleText: {
    color: "#483938",
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 24,
  },
  DateText: {
    color: "#6A5E5D",
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 24,
  },
  CommentText: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 15,
    lineHeight: 24,
    marginLeft: isMobileOnly ? -60 : 0,
    paddingTop: isMobileOnly ? 12 : 0,
    color: "#1A0706",
  },
  ReplyText: {
    marginLeft: isMobileOnly ? "unset" : 0,
    paddingTop: 0,
    fontSize: 14,
    lineHeight: 21,
  },
})
const MessageItem = (props: Props) => {
  const { item, index, isReply, now, isDM } = props
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const convertCommentFromJSONToHTML = (text: string | null) => {
    const errorMarkdown = "<div>" + "Message" + " Can't Be Displayed</div>"

    if (!text) return errorMarkdown

    try {
      return stateToHTML(convertFromRaw(JSON.parse(text)))
    } catch (e) {
      console.error(e)
      return errorMarkdown
    }
  }
  const showProfile = (id: string | undefined) => {
    if (id) navigation?.push("ProfileScreen", { id: id, create: false })
  }
  const currentTime = now
  const datePosted = moment(parseInt(item?.when))
  const daysSince = currentTime.diff(datePosted, "days")
  const hoursSince = currentTime.diff(datePosted, "hours")
  const minutesSince = currentTime.diff(datePosted, "minutes")
  const dateString = `${
    daysSince === 0
      ? hoursSince > 0
        ? hoursSince + " hours ago"
        : minutesSince + " minutes ago"
      : daysSince === 1
      ? "Yesterday"
      : daysSince > 1
      ? daysSince + " days ago"
      : null
  }`
  if (isDM) {
    return (
      <>
        <View
          style={
            props.isMine
              ? {
                  flexDirection: "row-reverse",
                  alignSelf: "flex-end",
                  maxWidth: "65ch",
                  marginBottom: 16,
                }
              : { flexDirection: "row", display: "flex", maxWidth: "65ch", marginBottom: 16 }
          }
        >
          {!props.isMine ? (
            <View style={isMobileOnly ? { marginRight: 8 } : {}}>
              <ProfileImage size={isMobileOnly ? "small6" : "small7"} user={item?.userId} />
            </View>
          ) : null}
          <View
            style={
              props.isMine
                ? {
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }
                : {
                    flexDirection: "column",
                    flex: 1,
                  }
            }
          >
            <View
              style={
                props.isMine
                  ? {
                      backgroundColor: "#FFECEB",
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      alignSelf: "flex-end",
                      flexShrink: 1,
                    }
                  : {
                      backgroundColor: "#EDEBEB",
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      alignSelf: "flex-start",
                      flexShrink: 1,
                    }
              }
            >
              <Text
                style={{
                  color: "#1A0706",
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 15,
                }}
              >
                <div
                  style={{ marginBlockEnd: 0 }}
                  dangerouslySetInnerHTML={{
                    __html: convertCommentFromJSONToHTML(item?.content ?? null)
                      ?.replaceAll("<p>", "")
                      .replaceAll("</p>", ""),
                    // need to filter empty elements here
                  }}
                ></div>
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Graphik-Regular-App",
                fontSize: 14,
                lineHeight: 21,
                color: "#6A5E5D",
                marginTop: 16,
              }}
            >
              {moment(parseInt(item?.when)).format("lll")}
            </Text>
          </View>
        </View>
      </>
    )
  }
  return (
    <View style={[style.MessageContainer, isReply ? style.ReplyContainer : {}]}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              key={item?.id}
              onPress={() => {
                showProfile(item?.author?.id)
              }}
            >
              {item && "owner" in item && (
                <View style={isMobileOnly ? { marginRight: 12 } : { marginRight: 16 }}>
                  <ProfileImage
                    size={isMobileOnly ? "small7" : "editorLarge"}
                    user={item?.owner ?? null}
                  />
                </View>
              )}
              {isReply && (
                <View style={isMobileOnly ? { marginRight: 12 } : { marginRight: 16 }}>
                  <ProfileImage
                    size={isMobileOnly ? "small6" : "small2"}
                    user={item?.author?.id ?? null}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flexDirection: "column", flex: 1 }}>
                <Text style={style.NameText}>
                  {item?.author?.given_name ?? ""} {item?.author?.family_name ?? ""}
                </Text>
                <Text style={style.RoleText}>{item?.author?.currentRole ?? ""}</Text>
              </View>
              {isMobileOnly || (!isReply && !isMobileOnly) ? (
                <Text style={style.DateText}>{dateString}</Text>
              ) : null}
            </View>
            <Text style={[style.CommentText, isReply ? style.ReplyText : {}]}>
              <div
                style={{ marginBlockEnd: 0 }}
                dangerouslySetInnerHTML={{
                  __html: convertCommentFromJSONToHTML(item?.content ?? null),
                  // need to filter empty elements here
                }}
              ></div>
            </Text>
            {!isMobileOnly && isReply ? (
              <Text
                style={{
                  color: "#6A5E5D",
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 14,
                  lineHeight: 24,
                }}
              >
                {dateString}
              </Text>
            ) : null}
            {item?.attachment ? <View>{MessageUtils.renderFileDownloadBadge(item)}</View> : null}
          </View>
        </View>
      </View>
      {!isReply ? (
        <View
          style={
            isMobileOnly
              ? {
                  borderBottomWidth: 1,
                  borderBottomColor: "#E4E1E1",
                  paddingTop: 9,
                }
              : {
                  marginLeft: -16,
                  marginRight: -32,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E4E1E1",
                  paddingTop: 17,
                }
          }
        />
      ) : null}
    </View>
  )
}
export default MessageItem
