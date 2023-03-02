import React, { useEffect, useRef, useState } from "react"
import { BrowserView, MobileOnlyView } from "react-device-detect"
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import SearchActiveIcon from "../../../assets/Facelift/svg/Search-Active.svg"
import SearchInactiveIcon from "../../../assets/Facelift/svg/Search.svg"
import { useDebounce } from "../../../screens/Admin/AdminCRMScreen"
import { ResourceEpisode, User } from "../../../src/API"
import { Data } from "../../Data/Data"
import useComponentVisible from "../../useComponentVisible"
import SearchBarListEmpty from "./SearchBarListEmpty"
import SearchBarSearchItem from "./SearchBarSearchItemUser"
import SearchBarSearchItemResourceEpisode from "./SearchBarSearchItemUserResourceEpisode"

type SearchBarProps = {
  passDataToParent?: (data: (User | ResourceEpisode)[]) => void
  passIsListEmpty?: (isEmpty: boolean) => void
  closeSearchBar?: () => void
}
export default function SearchBar({
  passDataToParent,
  passIsListEmpty,
  closeSearchBar,
}: SearchBarProps) {
  const { width } = useWindowDimensions()
  const [data, setData] = useState<(User | ResourceEpisode)[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showListEmpty, setShowListEmpty] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchterm = useDebounce(searchTerm, 1000)
  const doSearch = async (newSearchTerm: string) => {
    const names = newSearchTerm.split(" ")
    const firstName = names[0]
    const lastName = names.slice(1, names.length).join(" ")
    const conditions = []
    if (firstName && lastName)
      conditions.push({
        and: [{ given_name: { match: firstName } }, { family_name: { match: lastName } }],
      })
    else {
      conditions.push({ given_name: { match: firstName } })
    }
    if (newSearchTerm.includes("@")) {
      conditions.push({ email: { eq: newSearchTerm } })
    }
    const resourceResult = await Data.searchResources({
      title: { match: newSearchTerm },
    })
    console.log(resourceResult)
    const userResult = await Data.searchUsers({
      and: [
        { isArchived: { ne: "true" } },
        {
          or: conditions,
        },
        { profileState: { eq: "Complete" } },
        { mainUserGroup: { eq: "Partner" } },
      ],
    })
    const users = userResult.data?.searchUsers?.items as User[]
    const resources = resourceResult.data?.searchResourceEpisodes?.items as ResourceEpisode[]
    if (!users.length && !resources.length) setShowListEmpty(true)
    else setShowListEmpty(false)
    setData([...users, ...resources])
    setIsLoading(false)
  }
  useEffect(() => {
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

  useEffect(
    function shouldSendDataToParent() {
      if (passDataToParent) passDataToParent(data)
    },
    [data, passDataToParent]
  )

  useEffect(
    function shouldSendIsListEmpty() {
      // this is needed to display the list empty message for mobile view since it lives outside this component in mobile view
      if (passIsListEmpty) passIsListEmpty(showListEmpty)
    },
    [showListEmpty, passIsListEmpty]
  )

  useEffect(
    function shouldCloseSearchBar() {
      // if closeSearchBar is passed as a prop, then we should close the search bar when the user clicks outside of it
      if (!isComponentVisible && closeSearchBar) closeSearchBar()
    },
    [isComponentVisible]
  )

  const textRef = useRef<TextInput>(null)
  useEffect(() => {
    if (textRef.current) textRef.current.focus()
  }, [])

  const clearData = () => {
    if (closeSearchBar) closeSearchBar()

    setData([])
    setSearchTerm("")
    setShowListEmpty(false)
    if (textRef.current) textRef.current.focus()
  }

  const TextInputStyle = React.useMemo(
    () =>
      isComponentVisible
        ? [SearchBarStyle.TextInput, SearchBarStyle.TextInputActive]
        : SearchBarStyle.TextInput,
    [isComponentVisible]
  )
  return (
    <>
      <BrowserView>
        <View ref={ref}>
          <View style={SearchBarStyle.SearchBarContainer}>
            <Image
              style={SearchBarStyle.SearchIcon}
              source={isComponentVisible ? SearchActiveIcon : SearchInactiveIcon}
            ></Image>
            <TextInput
              accessibilityHint="Search for a partner by name"
              onLayout={() => {
                if (textRef.current) textRef.current.focus()
              }}
              onFocus={() => setIsComponentVisible(true)}
              style={TextInputStyle}
              ref={textRef}
              placeholder="Search..."
              placeholderTextColor={"#6A5E5D"}
              value={searchTerm}
              onChangeText={(txt) => onSearchTermChange(txt)}
            ></TextInput>

            <Pressable disabled={isLoading} style={SearchBarStyle.CloseButton} onPress={clearData}>
              <View
                onStartShouldSetResponder={(event) => true}
                onTouchEnd={(event) => {
                  event.stopPropagation()
                }}
              >
                {!isLoading && searchTerm ? (
                  <Image
                    style={{ height: 24, width: 24 }}
                    source={require("../../../assets/Facelift/svg/X-Black.svg")}
                  ></Image>
                ) : isLoading ? (
                  <ActivityIndicator color="#1A0706" />
                ) : null}
              </View>
            </Pressable>
          </View>
          {isComponentVisible ? (
            <FlatList
              ListEmptyComponent={showListEmpty && !isLoading ? <SearchBarListEmpty /> : null}
              style={[
                SearchBarStyle.ListStyle,
                width < 1000 ? { width: "100%", marginLeft: 0 } : {},
                !data.length ? { borderColor: "transparent" } : {},
              ]}
              data={data}
              renderItem={({ item, index }) => {
                const isLast = index === data.length - 1
                const isFirst = index === 0
                return item.__typename == "User" ? (
                  <SearchBarSearchItem
                    isFirst={isFirst}
                    isLast={isLast}
                    item={item}
                    clearData={clearData}
                  />
                ) : (
                  <SearchBarSearchItemResourceEpisode
                    isFirst={isFirst}
                    isLast={isLast}
                    item={item}
                    clearData={clearData}
                  />
                )
              }}
            ></FlatList>
          ) : null}
        </View>
      </BrowserView>
      <MobileOnlyView>
        <View style={SearchBarStyle.SearchBarContainer}>
          <Image
            style={SearchBarStyle.SearchIconMobile}
            source={isComponentVisible ? SearchActiveIcon : SearchInactiveIcon}
          ></Image>
          <TextInput
            accessibilityHint="Search for a partner by name"
            onFocus={() => setIsComponentVisible(true)}
            style={[TextInputStyle, { height: 34 }]}
            ref={textRef}
            placeholder="Search..."
            placeholderTextColor={"#6A5E5D"}
            value={searchTerm}
            onChangeText={(txt) => onSearchTermChange(txt)}
          ></TextInput>

          <Pressable
            disabled={isLoading}
            style={SearchBarStyle.CloseButtonMobile}
            onPress={() => {
              setSearchTerm("")
              setShowListEmpty(false)
              setData([])
              if (textRef.current) textRef.current.focus()
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
                  style={{ height: 18, width: 18 }}
                  source={require("../../../assets/Facelift/svg/X-Black.svg")}
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

const SearchBarStyle = StyleSheet.create({
  SearchBarContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F6F5F5",
    borderRadius: 4,
  },
  TextInput: {
    zIndex: 1000,
    paddingRight: 32,
    flex: 1,
    height: 40,
    paddingLeft: 40,
    outlineStyle: "none",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E4E1E1",
    fontSize: 15,
    color: "#6A5E5D",
    borderRadius: 4,
  },
  TextInputActive: {
    color: "#1A0706",
  },
  CloseButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1001,
  },
  CloseButtonMobile: {
    position: "absolute",
    right: 1,
    top: 1,
    padding: 6,
    zIndex: 1001,
  },
  SearchIcon: {
    height: 24,
    width: 24,
    position: "absolute",
    left: 10,
    top: 8,
  },
  SearchIconMobile: {
    height: 18,
    width: 18,
    position: "absolute",
    left: 10,
    top: 8,
  },
  ListStyle: {
    flex: 1,
    top: 42.5,
    width: "calc(100% + 30px)",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E4E1E1",
    marginLeft: -15,
    marginTop: -4,
    display: "flex",
    maxHeight: 348,
    position: "absolute",
  },
})
