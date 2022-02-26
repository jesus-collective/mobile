import React from "react"
import { isMobileOnly } from "react-device-detect"
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import LastListItem from "../../components/LastListItem/LastListItem"
import { Group } from "../../src/API"
import CourseCard from "./CourseCard"
import { useCourses } from "./useCourses"

type Props = {
  filter: string
  reverse: boolean
}
export type JCEvent = Group

const CourseList = StyleSheet.create({
  Container: {
    minHeight: 300,
  },
  FooterContainer: {
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  Spinner: {
    position: "absolute",
    alignSelf: "center",
  },
  EmptyText: {
    fontSize: 15,
    paddingLeft: 12,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    paddingBottom: 2,
    color: "#6A5E5D",
  },
})

export default function CoursesList(props: Props) {
  const { currentUser, courses, isLoading, loadMore, nextToken = null } = useCourses()
  const { reverse, filter } = props
  return (
    <FlatList
      ItemSeparatorComponent={() => (isMobileOnly ? null : <View style={{ height: 32 }}></View>)}
      columnWrapperStyle={isMobileOnly ? null : ({ gap: 32 } as any)}
      style={CourseList.Container}
      contentContainerStyle={isMobileOnly ? { paddingHorizontal: 12, paddingTop: 16 } : {}}
      ListFooterComponentStyle={nextToken && !isLoading ? {} : { display: "none" }}
      ListFooterComponent={() => (
        <View
          style={[
            CourseList.FooterContainer,
            {
              marginLeft: isMobileOnly ? 0 : -32,
              marginBottom: 30,
              marginTop: 30,
            },
          ]}
        >
          <GenericButton
            style={{
              ButtonStyle: GenericButtonStyles.SecondaryButtonStyle,
              LabelStyle: GenericButtonStyles.SecondaryLabelStyle,
            }}
            label="Load More"
            action={loadMore}
          />
        </View>
      )}
      ListHeaderComponent={() =>
        isLoading ? (
          <ActivityIndicator
            style={{
              marginTop: isMobileOnly ? 32 : 0,
              marginLeft: isMobileOnly ? 0 : -32,
            }}
            size="large"
            color="#FF4438"
          />
        ) : null
      }
      ListEmptyComponent={() =>
        !isLoading && !courses.length ? (
          <Text style={CourseList.EmptyText}>No organizations found</Text>
        ) : null
      }
      data={
        reverse
          ? courses.sort((courseA, courseB) => {
              if (courseB?.name && courseA?.name)
                return courseB.name.toLowerCase().localeCompare(courseA.name.toLowerCase())
              return 0
            })
          : courses
      }
      numColumns={isMobileOnly ? 1 : 3}
      refreshing={isLoading}
      renderItem={({ item, index }) => {
        return !isMobileOnly ? (
          <LastListItem listLength={courses.length} index={index} isThreeColumn={true}>
            <CourseCard user={currentUser} item={item} />
          </LastListItem>
        ) : (
          <CourseCard user={currentUser} item={item} />
        )
      }}
    />
  )
}
