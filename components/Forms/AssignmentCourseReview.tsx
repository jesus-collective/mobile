import React from "react"
import { Text, View } from "react-native"
import { GetDirectMessageRoomQuery } from "src/API"
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
  console.log("My Room", myRoom)
  const isAdminOrIsCoach =
    !!userActions?.isMemberOf("courseAdmin") || !!userActions?.isMemberOf("courseCoach")
  const assignmentsMinusMine = data.filter(
    (item) => item?.directMessage?.items?.length && !item?.id.includes(state.currentUser)
  )
  const NoAssignments = () => {
    return (
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
    )
  }
  const showMine = state.assignmentOption === "My Assignment" && data.length
  const showOthers = state.assignmentOption === "Assignments to Review" && data.length
  const showNoAssignments = !assignmentsMinusMine.length
  return (
    <View style={{ width: "100%", paddingBottom: 250 }}>
      <AssignmentsToggle
        adminCoach={isAdminOrIsCoach}
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
        <NoAssignments />
      ) : showOthers ? (
        assignmentsMinusMine.map((item, index: number) => {
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
