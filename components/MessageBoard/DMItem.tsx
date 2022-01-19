import moment from "moment"
import React, { useEffect } from "react"
import { isMobileOnly } from "react-device-detect"
import { StyleSheet, Text, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { convertCommentFromJSONToHTML } from "./MessageItem"
import { DM } from "./MessageListDirect"

type Props = {
  item: DM
  index: number
  isMine?: boolean
  previousMsg: DM | null
  nextMsg: DM | null
}

const SPRING_CONFIG = {
  damping: 100,
  overshootClamping: true,
  restSpeedThreshold: 0.01,
  stiffness: 1000,
}

const DMItem = (props: Props) => {
  const { item, isMine, previousMsg, nextMsg } = props

  const marginValue = useSharedValue(-200)
  const animStyle = useAnimatedStyle(() => {
    if (isMine)
      return {
        marginRight: withSpring(marginValue.value, SPRING_CONFIG),
      }
    else
      return {
        marginLeft: withSpring(marginValue.value, SPRING_CONFIG),
      }
  })
  const isPreviousSameUser = previousMsg ? previousMsg.userId === item.userId : false
  const isNextSameUser = nextMsg ? nextMsg.userId === item.userId : false
  const sameNextTimeStamp = nextMsg
    ? moment(item.createdAt).diff(moment(nextMsg.createdAt), "minutes") === 0
    : false
  const hideDate = sameNextTimeStamp && isNextSameUser
  useEffect(() => {
    marginValue.value = 0
  }, [])
  return (
    <Animated.View style={[style.DMContainer, isMine ? style.DMMine : style.DMNotMine, animStyle]}>
      {!isMine ? (
        <View style={isMobileOnly ? { marginRight: 8 } : {}}>
          {!isPreviousSameUser ? (
            <View style={hideDate ? { position: "absolute" } : {}}>
              <ProfileImage size={isMobileOnly ? "small6" : "small7"} user={item?.userId} />
            </View>
          ) : (
            <View style={isMobileOnly ? { width: 40 } : { width: 56 }} />
          )}
        </View>
      ) : null}
      <View
        style={[
          style.DMContentContainer,
          isMine
            ? style.DMContentContainerIsMine
            : hideDate && !isPreviousSameUser
            ? isMobileOnly
              ? { marginLeft: 40 }
              : { marginLeft: 56 }
            : {},
        ]}
      >
        <View style={[style.DMItem, isMine ? style.DMItemMine : style.DMItemNotMine]}>
          <Text style={style.DMText}>
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

        {hideDate ? null : (
          <Text style={style.DMDateText}>{moment(parseInt(item?.when)).format("lll")}</Text>
        )}
      </View>
    </Animated.View>
  )
}
export default DMItem

const style = StyleSheet.create({
  DMContainer: {
    maxWidth: "65ch",
    marginBottom: 16,
  },
  DMMine: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
  },
  DMNotMine: {
    flexDirection: "row",
  },
  DMItem: {
    flexShrink: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  DMItemMine: {
    backgroundColor: "#FFECEB",
    alignSelf: "flex-end",
  },
  DMItemNotMine: {
    backgroundColor: "#EDEBEB",
    alignSelf: "flex-start",
  },
  DMText: {
    color: "#1A0706",
    fontFamily: "Graphik-Regular-App",
    flex: 1,
    fontSize: 15,
  },
  DMContentContainer: {
    flexDirection: "column",
    flex: 1,
  },
  DMContentContainerIsMine: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  DMDateText: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 14,
    lineHeight: 21,
    color: "#6A5E5D",
    marginTop: 16,
  },
})
