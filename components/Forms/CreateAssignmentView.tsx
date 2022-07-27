import React from "react"
import { View } from "react-native"
import MessageEditor from "../../components/MessageBoard/AssignmentMessageBoard/MessageEditor"
import AssignmentUserIndicatorBar from "./AssignmentUserIndicatorBar"

type CreateAssignmentProps = {
  currentRoomId: string | null
  clearAndRefetch: () => void
  getCurrentRoomRecipients: () => string[]
  wordCount: number
}
const CreateAssignmentView = ({
  currentRoomId,
  clearAndRefetch,
  getCurrentRoomRecipients,
  wordCount,
}: CreateAssignmentProps) => {
  return (
    <View style={{ paddingBottom: 150 }}>
      <AssignmentUserIndicatorBar label="Assignment" />
      <MessageEditor
        wordCount={wordCount}
        newAssignment={true}
        post={clearAndRefetch}
        recipients={getCurrentRoomRecipients()}
        roomId={currentRoomId ?? ""}
      />
    </View>
  )
}
export default CreateAssignmentView
