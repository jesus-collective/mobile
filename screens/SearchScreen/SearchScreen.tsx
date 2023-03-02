import React, { useEffect, useState } from "react"
import { FlatList, Image, Text, View } from "react-native"
import SearchBar from "../../components/Forms/SearchBar/SearchBar"
import Header from "../../components/Header/Header"
import ProfileCard from "../../screens/ProfilesScreen/ProfileCard"
import { ResourceEpisode, User } from "../../src/API"
export default function SearchScreen2(props: any) {
  const [data, setData] = useState<(User | ResourceEpisode)[]>([])
  const [showListEmpty, setShowListEmpty] = useState(false)
  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <Header
          title="Search"
          search={
            <View style={{ paddingBottom: 16 }}>
              <SearchBar
                passIsListEmpty={(isEmpty) => setShowListEmpty(isEmpty)}
                passDataToParent={(dataFromChild) => setData(dataFromChild)}
              />
            </View>
          }
        />
      ),
    })
  }, [])
  return (
    <FlatList
      data={data}
      contentContainerStyle={
        data?.length ? { flex: 1 } : { flex: 1, justifyContent: "center", alignItems: "center" }
      }
      style={{ flex: 1 }}
      renderItem={({ item, index }) => {
        return <ProfileCard item={item} />
      }}
      ListEmptyComponent={
        data?.length
          ? null
          : () => (
              <View style={{ flex: 1, justifyContent: "center", marginTop: -40 }}>
                <Image
                  style={{
                    width: 60,
                    alignSelf: "center",
                    height: 60,
                  }}
                  source={require("../../assets/undraw_people_search_re_5rre.svg")}
                ></Image>
                {showListEmpty ? (
                  <Text style={{ marginTop: 4 }}>Uh oh.. No people found.</Text>
                ) : null}
              </View>
            )
      }
    />
  )
}
