import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { BrowserView, MobileOnlyView } from "react-device-detect"
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableHighlight,
  View,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import SearchActiveIcon from "../../assets/Facelift/svg/Search-Active.svg"
import SearchInactiveIcon from "../../assets/Facelift/svg/Search.svg"
import useComponentVisible from "../../components/useComponentVisible"
import { useDebounce } from "../../screens/AdminCRMScreen/AdminCRMScreen"
import { User } from "../../src/API"
import { Data } from "../Data/Data"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../ProfileImage/ProfileImageNew"

type SearchBarProps = {
  passDataToParent?: (data: User[]) => void
  passIsListEmpty?: (isEmpty: boolean) => void
  closeSearchBar?: () => void
}
export default function SearchBar({
  passDataToParent,
  passIsListEmpty,
  closeSearchBar,
}: SearchBarProps) {
  const [data, setData] = useState<User[]>([])
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [isLoading, setIsLoading] = useState(false)
  const [showListEmpty, setShowListEmpty] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchterm = useDebounce(searchTerm, 1000)
  const doSearch = async (newSearchTerm: string) => {
    const names = newSearchTerm.split(" ")
    const or = names
      .map((name) => {
        return [
          { given_name: { wildcard: name.toLowerCase() + "*" } },
          { family_name: { wildcard: name.toLowerCase() + "*" } },
        ]
      })
      .flat()

    const userResult = await Data.searchUsers({
      and: [
        { isArchived: { ne: "true" } },
        {
          or: or,
        },
        { profileState: { eq: "Complete" } },
        { mainUserGroup: { eq: "Partner" } },
      ],
    })
    const users = userResult.data?.searchUsers?.items as User[]
    if (!users.length) setShowListEmpty(true)
    else setShowListEmpty(false)
    setData(users)
    setIsLoading(false)
  }
  React.useEffect(() => {
    if (debouncedSearchterm) {
      doSearch(debouncedSearchterm)
    }
  }, [debouncedSearchterm])

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true)
  const onSearchTermChange = (value: string) => {
    if (value) {
      setIsLoading(true)
      setIsComponentVisible(true)
    } else {
      setIsLoading(false)
      setData([])
      setShowListEmpty(false)
    }
    setSearchTerm(value)
  }

  useEffect(() => {
    if (passDataToParent) passDataToParent(data)
  }, [data, passDataToParent])

  useEffect(() => {
    if (passIsListEmpty) passIsListEmpty(showListEmpty)
  }, [showListEmpty, passIsListEmpty])
  useEffect(() => {
    if (!isComponentVisible && closeSearchBar) closeSearchBar()
  }, [isComponentVisible])
  return (
    <>
      <BrowserView>
        <View ref={ref}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginHorizontal: 20,
              backgroundColor: "#F6F5F5",
              borderRadius: 4,
            }}
          >
            <Image
              style={{
                height: 24,
                width: 24,
                position: "absolute",
                left: 10,
                top: 8,
              }}
              source={isComponentVisible ? SearchActiveIcon : SearchInactiveIcon}
            ></Image>
            <TextInput
              ref={ref}
              onFocus={() => setIsComponentVisible(true)}
              style={{
                paddingVertical: 10,
                zIndex: 1000,
                flex: 1,
                paddingRight: 8,
                paddingLeft: 48,
                outlineStyle: "none",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#E4E1E1",
                fontSize: 15,
                color: isComponentVisible ? "#1A0706" : "#6A5E5D",
                borderRadius: 4,
              }}
              placeholder="Search..."
              placeholderTextColor={"#6A5E5D"}
              value={searchTerm}
              onChangeText={(txt) => onSearchTermChange(txt)}
            ></TextInput>

            <Pressable
              disabled={isLoading}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                zIndex: 1001,
              }}
              onPress={() => {
                ref.current?.focus()
                setSearchTerm("")
                setShowListEmpty(false)
                setData([])
              }}
            >
              <View
                onStartShouldSetResponder={(event) => true}
                onTouchEnd={(e) => {
                  e.stopPropagation()
                }}
              >
                {!isLoading && searchTerm ? (
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                    }}
                    source={require("../../assets/Facelift/svg/X-Black.svg")}
                  ></Image>
                ) : isLoading ? (
                  <ActivityIndicator color="#1A0706" />
                ) : null}
              </View>
            </Pressable>
          </View>
          {isComponentVisible ? (
            <FlatList
              ListEmptyComponent={
                showListEmpty && !isLoading
                  ? () => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderColor: "#e4e1e1",
                          backgroundColor: "#ffffff",
                          flexDirection: "column",
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8,
                          paddingVertical: 24,
                          paddingHorizontal: 8,
                        }}
                      >
                        <Image
                          style={{
                            width: 60,
                            height: 60,
                          }}
                          source={require("../../assets/undraw_people_search_re_5rre.svg")}
                        ></Image>
                        <Text style={{ marginTop: 4 }}>Uh oh.. No people found.</Text>
                      </View>
                    )
                  : null
              }
              style={{
                flex: 1,
                top: 42.5,
                width: "100%",
                display: "flex",
                maxHeight: 400,
                position: "absolute",
              }}
              data={data}
              renderItem={({ item, index }) => {
                const isLast = index === data.length - 1
                const isFirst = index === 0
                return (
                  <TouchableHighlight
                    key={item?.id}
                    underlayColor="transparent"
                    onPress={(e) => {
                      e.stopPropagation()
                      setData([])
                      setSearchTerm("")
                      navigation.push("ProfileScreen", { id: item?.id })
                    }}
                    style={{
                      zIndex: 10000,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#e4e1e1",
                        backgroundColor: "#ffffff",
                        flexDirection: "row",
                        flex: 1,

                        borderTopLeftRadius: isFirst ? 8 : 0,
                        borderTopRightRadius: isFirst ? 8 : 0,
                        borderBottomLeftRadius: isLast ? 8 : 0,
                        borderBottomRightRadius: isLast ? 8 : 0,
                        paddingVertical: 12,
                        paddingHorizontal: 8,
                      }}
                    >
                      <ProfileImageNew
                        user={item?.id}
                        style={ProfileImageStyle.UserXSmall3}
                        type="user"
                        quality={ProfileImageQuality.medium}
                      />

                      <View
                        style={{
                          flexDirection: "column",
                          flex: 1,
                          marginLeft: 16,
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <Text
                          style={{
                            lineHeight: 18,
                            color: "#483938",
                            fontFamily: "Graphik-Regular-App",
                            fontSize: 12,
                          }}
                        >
                          {item.given_name} {item.family_name}
                        </Text>

                        <Text
                          style={{
                            marginTop: 2,
                            lineHeight: 18,
                            color: "#6a5e5d",
                            fontSize: 12,
                            fontFamily: "Graphik-Regular-App",
                          }}
                        >
                          {item.location?.geocodeFull}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                )
              }}
            ></FlatList>
          ) : null}
        </View>
      </BrowserView>
      <MobileOnlyView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 20,
            backgroundColor: "#F6F5F5",
            borderRadius: 4,
          }}
        >
          <Image
            style={{
              height: 18,
              width: 18,
              position: "absolute",
              left: 10,
              top: 8,
            }}
            source={isComponentVisible ? SearchActiveIcon : SearchInactiveIcon}
          ></Image>
          <TextInput
            onFocus={() => setIsComponentVisible(true)}
            style={{
              zIndex: 1000,
              paddingRight: 8,
              flex: 1,
              height: 34,
              paddingLeft: 40,
              outlineStyle: "none",
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#E4E1E1",
              fontSize: 15,
              color: isComponentVisible ? "#1A0706" : "#6A5E5D",
              borderRadius: 4,
            }}
            placeholder="Search..."
            placeholderTextColor={"#6A5E5D"}
            value={searchTerm}
            onChangeText={(txt) => onSearchTermChange(txt)}
          ></TextInput>

          <Pressable
            disabled={isLoading}
            style={{
              position: "absolute",
              right: 1,
              top: 1,
              padding: 6,
              zIndex: 1001,
            }}
            onPress={() => {
              ref.current?.focus()
              setSearchTerm("")
              setShowListEmpty(false)
              setData([])
            }}
          >
            <View
              onStartShouldSetResponder={(event) => true}
              onTouchEnd={(e) => {
                e.stopPropagation()
              }}
            >
              {!isLoading && searchTerm ? (
                <Image
                  style={{
                    height: 18,
                    width: 18,
                  }}
                  source={require("../../assets/Facelift/svg/X-Black.svg")}
                ></Image>
              ) : isLoading ? (
                <ActivityIndicator color="#1A0706" />
              ) : null}
            </View>
          </Pressable>
        </View>
      </MobileOnlyView>
    </>
  )
}
