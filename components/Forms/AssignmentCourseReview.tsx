import React from "react"
import { Text, View } from "react-native"
import { GetDirectMessageRoomQuery } from "src/API"
import { CourseContext } from "../../components/CourseViewer/CourseContext"
import Messages from "../../components/MessageBoard/AssignmentMessageBoard/Messages"
import { MessageComment } from "../../components/MessageBoard/AssignmentMessageBoard/MessageThread"
import { UserActions } from "../../screens/HomeScreen/UserContext"
import AssignmentLoadingSpinner from "./AssignmentLoadingSpinner"
import AssignmentsToggle from "./AssignmentsToggle"
import { AssignmentState } from "./EditableCourseAssignment2"

const AssignmentCourseReview = ({
  data,
  myRoom,
  userActions,
  state,
  setState,
  getCurrentRoomRecipients,
  wordCount,
}: {
  data: Array<GetDirectMessageRoomQuery["getDirectMessageRoom"]>
  myRoom: GetDirectMessageRoomQuery["getDirectMessageRoom"]
  userActions?: UserActions
  state: AssignmentState
  setState: React.Dispatch<React.SetStateAction<AssignmentState>>
  getCurrentRoomRecipients: () => string[]
  wordCount: number
}): JSX.Element => {
  const { state: courseState, actions } = React.useContext(CourseContext)

  const isInstructor = Boolean(
    courseState?.courseData?.instructors?.items?.find((item) => item?.userID === state.currentUser)
  )

  const isBackOfficeStaff = Boolean(
    courseState?.courseData?.backOfficeStaff?.items?.find(
      (item) => item?.userID === state.currentUser
    )
  )

  const isAdmin = Boolean(
    userActions?.isMemberOf("courseAdmin") || userActions?.isMemberOf("admin")
  )

  const isCoach = Boolean(userActions?.isMemberOf("courseCoach"))

  const isSeparatedTriads = Boolean(courseState?.courseData?.separatedTriads)

  const shouldSeeEverything = isInstructor || isBackOfficeStaff || isAdmin

  const shouldSeparateTriads = isSeparatedTriads && !shouldSeeEverything

  const cohortUserIDS =
    actions.myCourseGroups()?.completeTriad?.[0]?.triad?.map(({ id }: { id: string }) => id) ?? []

  const assignmentsMinusMine = data.filter(
    (item) => item?.directMessage?.items?.length && !item?.id.includes(state.currentUser)
  )
  const cohortMembersAssignments = assignmentsMinusMine.filter((item) => {
    return cohortUserIDS.includes(item?.directMessage?.items?.[0]?.userId)
  })

  const filteredAssignments = shouldSeparateTriads ? cohortMembersAssignments : assignmentsMinusMine
  console.log({ [`${shouldSeparateTriads}`]: filteredAssignments })
  const showMine = state.assignmentOption === "My Assignment" && data.length
  const showOthers = state.assignmentOption === "Assignments to Review" && data.length
  const showNoAssignments = !filteredAssignments.length
  return (
    <View style={{ width: "100%", paddingBottom: 250 }}>
      <AssignmentsToggle
        adminCoach={isAdmin || isCoach}
        optionState={state.assignmentOption}
        changeOption={(newSelection) => setState({ ...state, assignmentOption: newSelection })}
      />
      {showMine ? (
        <Messages
          showEdit={(assignment: MessageComment) => setState({ ...state, showEdit: assignment })}
          wordCount={wordCount}
          recipients={getCurrentRoomRecipients()}
          open
          room={myRoom}
        />
      ) : showNoAssignments ? (
        <Text
          style={{
            paddingLeft: 16,
            fontSize: 18,
            lineHeight: 25,
            fontFamily: "Graphik-Semibold-App",
          }}
        >
          No assignments to review
        </Text>
      ) : showOthers ? (
        filteredAssignments.map((item, index: number) => {
          return (
            <Messages
              wordCount={wordCount}
              recipients={getCurrentRoomRecipients()}
              room={item}
              key={index}
            />
          )
        })
      ) : (
        <AssignmentLoadingSpinner />
      )}
    </View>
  )
}

export default AssignmentCourseReview
