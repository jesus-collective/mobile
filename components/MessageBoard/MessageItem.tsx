import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import moment from "moment"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { Message, Reply } from "./MessageList"
import MessageUtils from "./MessageUtils"

const MessageItem = ({
  item,
  index,
  isReply,
}: {
  item: Message | Reply
  index: number
  isReply: boolean
}) => {
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
  const now = moment()
  const datePosted = moment(parseInt(item?.when))
  const daysSince = now.diff(datePosted.format("L"), "days")
  const dateString = `${
    daysSince === 0
      ? "Today"
      : daysSince === 1
      ? "Yesterday"
      : daysSince > 1
      ? daysSince + " days ago"
      : null
  }`
  return (
    <View
      key={index}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 32,
        paddingBottom: !isReply ? 32 : 0,
        marginLeft: isReply ? 64 : 0,
        borderBottomWidth: !isReply ? 1 : 0,
        borderBottomColor: "#E4E1E1",
      }}
    >
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
                <View style={{ marginRight: 16 }}>
                  <ProfileImage size="editorLarge" user={item?.owner ?? null} />
                </View>
              )}
              {isReply && (
                <View style={{ marginLeft: -16 }}>
                  <ProfileImage size="small2" user={item?.author?.id ?? null} />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flexDirection: "column", flex: 1 }}>
                <Text
                  style={{
                    color: "#1A0706",
                    fontFamily: "Graphik-Semibold-App",
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                >
                  {item?.author?.given_name ?? ""} {item?.author?.family_name ?? ""}
                </Text>
                <Text
                  style={{
                    color: "#483938",
                    fontFamily: "Graphik-Regular-App",
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                >
                  {item?.author?.currentRole ?? ""}
                </Text>
              </View>
              {item?.when && (
                <Text
                  style={{
                    color: "#6A5E5D",
                    fontFamily: "Graphik-Regular-App",
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                >
                  {dateString}
                </Text>
              )}
            </View>

            <div
              style={{
                fontFamily: "Graphik-Regular-App",
                fontWeight: "normal",
                fontSize: 15,
                lineHeight: "24px",
                color: "#1A0706",
                marginBlockEnd: 0,
              }}
              dangerouslySetInnerHTML={{
                __html: convertCommentFromJSONToHTML(item?.content ?? null),
              }}
            />

            {item?.attachment ? <View>{MessageUtils.renderFileDownloadBadge(item)}</View> : null}
          </View>
        </View>
      </View>
    </View>
  )
}
export default MessageItem
