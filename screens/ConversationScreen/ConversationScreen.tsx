import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import moment from "moment"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { JCCognitoUser } from "src/types"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import Header from "../../components/Header/Header"
import MessageBoard from "../../components/MessageBoard/MessageBoard"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../../components/ProfileImage/ProfileImageNew"
import { useAndHandleDms } from "./useAndHandleDms"
const style = StyleSheet.create({
  Container: {
    marginTop: 60,
    marginBottom: 60,
    marginLeft: "9vw",
    marginRight: "9vw",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E4E1E1",
    backgroundColor: "#fff",
  },
  MobileContainer: {
    flexDirection: "column",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 0,
    backgroundColor: "#FFFDFC",
    borderRadius: 0,
    borderColor: "unset",
  },
  columnOne: {
    flex: 0.35,
    flexDirection: "column",
    borderRightWidth: 1,
    borderRightColor: "#E4E1E1",
  },
  columnTwo: {
    flexDirection: "column",
    flex: 0.65,
  },
  ConversationItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E1E1",
    padding: isMobileOnly ? 12 : 16,
    marginHorizontal: isMobileOnly ? 12 : 0,
    paddingRight: isMobileOnly ? 0 : 14,
    paddingLeft: isMobileOnly ? 0 : 16,
    borderRightWidth: 2,
    borderRightColor: "transparent",
    flexDirection: "row",
  },
  ConversationTextContainer: {
    flexDirection: "column",
    flex: 1,
    paddingLeft: isMobileOnly ? 12 : 16,
  },
  Header: {
    flexDirection: isMobileOnly ? "row-reverse" : "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E1E1",
  },
  HeaderText: {
    fontFamily: "Graphik-Semibold-App",
    color: "#1A0706",
    flex: isMobileOnly ? 1 : -1,
    lineHeight: 36,
    fontSize: 24,
  },
  NameText: {
    flex: 1,
    fontFamily: "Graphik-Medium-App",
    fontSize: 15,
    lineHeight: 24,
    color: "#1A0706",
  },
  DateText: {
    justifyContent: "flex-end",
    fontFamily: "Graphik-Regular-App",
    fontSize: 15,
    lineHeight: 24,
    color: "#A39C9B",
  },
  MessageText: {
    paddingTop: 2,
    fontFamily: "Graphik-Regular-App",
    color: "#483938",
    fontSize: 15,
    lineHeight: 24,
  },
})
type ConversationState = {
  currentRoom: string
  currentUser: JCCognitoUser["username"]
}

const ConversationScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [state, setState] = useState<ConversationState>({
    currentRoom: "",
    currentUser: "",
  })
  const setRoom = (roomId: string) => {
    setState({ ...state, currentRoom: roomId })
  }
  const hideButton = true
  useEffect(() => {
    const loadUser = async () => {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      setState({ ...state, currentUser: user.username })
    }
    loadUser()
  }, [])
  const { dmUsers, isLoading } = useAndHandleDms(setRoom)

  const getOtherUsers = (data: any): { ids: string[]; names: string[] } => {
    const ids: string[] = []
    const names: string[] = []
    data?.room?.messageUsers?.items?.forEach((user: any) => {
      if (user.userID !== state.currentUser) {
        if (user?.userID && user?.userName) {
          ids.push(user?.userID)
          names.push(user?.userName)
        }
      }
    })

    return { ids, names }
  }
  const getText = (text: string | null | undefined) => {
    const errorMarkdown = "<div>" + "</div>"

    if (!text) return errorMarkdown

    try {
      return stateToHTML(convertFromRaw(JSON.parse(text)))
    } catch (e) {
      console.error(e)
      return errorMarkdown
    }
  }

  const getCurrentRoomRecipients = (): string[] => {
    const ids: string[] = []
    //console.log(dmUsers.filter((x) => x?.roomID == state.currentRoom)[0])
    if (state.currentRoom == null) return []
    dmUsers
      ?.filter((x) => x?.roomID == state.currentRoom)?.[0]
      ?.room?.messageUsers?.items?.forEach((user) => {
        if (user) ids.push(user.userID)
      })
    return ids
  }

  const getUserId = (id: string) => {
    // conversation user id
    const room = getCurrentRoomItem(id)
    const otherUsers = getOtherUsers(room)
    return otherUsers.ids.length === 1 ? otherUsers.ids[0] : null
  }
  const getCurrentRoomItem = (id: string) => {
    return dmUsers.find((a) => a?.roomID === id)
  }
  const getCurrentRoomTitle = () => {
    return getConversationTitle(dmUsers.find((a) => state.currentRoom === a?.roomID))
  }
  const getConversationTitle = (item: any) => {
    if (!item) return ""
    const otherUsers = getOtherUsers(item)
    let conversationTitle = ""
    otherUsers.names.forEach((name, index: number) => {
      if (otherUsers.names.length === index + 1) {
        conversationTitle += name
      } else {
        conversationTitle += name + ", "
      }
    })
    return conversationTitle
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => {
        return (
          <Header
            backAction={() => {
              if (state.currentRoom) setRoom("")
              else navigation.goBack()
            }}
            title={state.currentRoom ? "Message" : "Messages"}
            //controls={state.currentRoom ? null : controls}
            navigation={props.navigation}
          />
        )
      },
    })
  }, [state.currentRoom])
  return (
    <View style={[style.Container, isMobileOnly ? style.MobileContainer : {}]}>
      {!isMobileOnly || state.currentRoom === "" ? (
        <View style={[style.columnOne, isMobileOnly ? { flex: 1 } : {}]}>
          {!isMobileOnly ? (
            <View>
              <View style={[style.Header, { paddingTop: 28, paddingBottom: 28 }]}>
                <Text style={style.HeaderText}>
                  {isLoading ? "Loading Messages..." : "Messages"}
                </Text>
              </View>
            </View>
          ) : null}
          <ScrollView
            contentContainerStyle={
              isLoading ? { justifyContent: "center", alignItems: "center", flex: 1 } : {}
            }
          >
            {isLoading ? (
              <View style={{ marginTop: -69 }}>
                <ActivityIndicator size="large" color="#FF4438" />
              </View>
            ) : (
              dmUsers.map((item) => {
                const otherUsers = getOtherUsers(item)
                const conversationTitle = getConversationTitle(item)
                const lastMessage = item?.room?.directMessage?.items?.sort((a, b) =>
                  b.createdAt.localeCompare(a.createdAt)
                )?.[0]
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      if (item?.room?.id !== state.currentRoom)
                        setState({ ...state, currentRoom: item?.room?.id ?? "" })
                    }}
                    style={[
                      style.ConversationItem,
                      state.currentRoom === item?.room?.id
                        ? {
                            backgroundColor: "#F6F5F5",
                            borderRightColor: "#FF4438",
                          }
                        : {},
                    ]}
                    key={item?.room?.id}
                  >
                    <ProfileImageNew
                      user={otherUsers.ids.length === 1 ? otherUsers.ids[0] : null}
                      type="user"
                      linkToProfile
                      style={ProfileImageStyle.UserMedium}
                      quality={ProfileImageQuality.medium}
                    />
                    <View style={style.ConversationTextContainer}>
                      <View style={{ flexDirection: "row" }}>
                        <Text numberOfLines={2} style={style.NameText}>
                          {conversationTitle}
                        </Text>
                        <Text style={style.DateText}>
                          {moment(lastMessage?.createdAt ?? item?.createdAt).format("MMMM D")}
                        </Text>
                      </View>

                      <Text style={style.MessageText} numberOfLines={2}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: getText(lastMessage?.content)
                              .replaceAll("<p>", "")
                              .replaceAll("</p>", ""),
                          }}
                        />
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            )}
          </ScrollView>
        </View>
      ) : null}
      {!isMobileOnly || state.currentRoom ? (
        <View style={[style.columnTwo, isMobileOnly ? { flex: 1 } : {}]}>
          {state.currentRoom ? (
            <>
              <View style={style.Header}>
                <ProfileImageNew
                  containerStyle={isMobileOnly ? {} : { marginRight: 8 }}
                  user={getUserId(state.currentRoom)}
                  type="user"
                  linkToProfile
                  style={ProfileImageStyle.UserSmall}
                  quality={ProfileImageQuality.medium}
                />
                <Text numberOfLines={1} style={style.HeaderText}>
                  {getCurrentRoomTitle()}
                </Text>
              </View>

              <MessageBoard
                recipients={getCurrentRoomRecipients()}
                style="regular"
                roomId={state.currentRoom}
              />
            </>
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#FF4438" />
              ) : (
                <>
                  <Text style={[style.HeaderText, { textAlign: "center", marginBottom: 32 }]}>
                    You don’t have a conversation selected.
                  </Text>
                  <Text style={{ marginBottom: 32 }}>Please select a conversation.</Text>
                  {!hideButton ? (
                    <GenericButton
                      action={() => Promise.resolve()}
                      style={{
                        LabelStyle: GenericButtonStyles.PrimaryLabelStyle,
                        ButtonStyle: GenericButtonStyles.PrimaryButtonStyle,
                      }}
                      label="START A CONVERSATION"
                    ></GenericButton>
                  ) : null}
                </>
              )}
            </View>
          )}
        </View>
      ) : null}
    </View>
  )
}
export default ConversationScreen
