import moment from "moment"
import React, { useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { Text, TouchableOpacity, View } from "react-native"
import MessageInput from "./MessageInput"
import MessageItem from "./MessageItem"
import { Message } from "./MessageList"

const MessageThread = ({
  item,
  index,
  groupId,
}: {
  item: Message
  index: number
  groupId: string
}) => {
  const [showCount, setShowCount] = useState(2)
  const [now, setNow] = useState(moment())
  React.useEffect(() => {
    const setTime = () => {
      const currentTime = moment()
      if (showCount > 2) setNow(currentTime)
    }
    const id = setInterval(setTime, 60000)
    return () => {
      clearInterval(id)
    }
  }, [showCount])
  return (
    <View
      style={{
        marginBottom: isMobileOnly ? 24 : 32,
        borderWidth: 1,
        borderColor: "#E4E1E1",
        borderRadius: 8,
        backgroundColor: "#fff",
      }}
    >
      <MessageItem now={now} item={item} index={index} isReply={false} />
      {item?.replies?.items
        .filter((it, ind) => ind < showCount)
        .map((reply, index) => {
          return <MessageItem now={now} key={reply?.id} item={reply} index={index} isReply={true} />
        })}
      <TouchableOpacity onPress={() => setShowCount(Infinity)}>
        {item?.replies?.items?.length && showCount < item?.replies?.items?.length ? (
          <Text
            style={{
              marginLeft: isMobileOnly ? 56 : 128,
              marginTop: isMobileOnly ? 0 : 16,
              color: "#6A5E5D",
              fontFamily: "Graphik-Regular-App",
              fontSize: 14,
              lineHeight: 24,
            }}
          >
            View {item.replies.items.length - showCount} more comments...
          </Text>
        ) : null}
      </TouchableOpacity>
      <MessageInput
        replyMode={true}
        replyState={{
          replyToWho: [],
          replyToId: item?.id ?? "",
          replyToRoomId: groupId ?? "",
        }}
        clearReplyState={() => setShowCount(Infinity)}
        groupId={groupId}
      />
    </View>
  )
}

export default MessageThread
