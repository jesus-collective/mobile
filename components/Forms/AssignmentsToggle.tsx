import React from "react"
import { Text, TouchableHighlight, View } from "react-native"
import ActivityBoxStyles from "../Activity/ActivityBoxStyles"
const AssignmentsToggle = ({
  optionState,
  changeOption,
  adminCoach,
}: {
  optionState: string
  changeOption: (newOption: string) => void
  adminCoach: boolean
}): JSX.Element => {
  const options = adminCoach
    ? ["Assignments to Review"]
    : ["Assignments to Review", "My Assignment"]
  return (
    <View style={[ActivityBoxStyles.ActivityButtonContainer, { borderBottomWidth: 0 }]}>
      {options.map((option: string) => {
        return (
          <TouchableHighlight
            underlayColor="rgba(255,255,255,0.2)"
            key={option}
            disabled={optionState === option}
            onPress={() => changeOption(option)}
            style={{
              padding: 16,
              borderBottomWidth: optionState === option ? 2 : 0,
              borderBottomColor: optionState === option ? "#F0493E" : "none",
            }}
          >
            <Text
              style={[
                ActivityBoxStyles.ActivityButtonText,
                { fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Semibold-App" },
                optionState === option ? { color: "#F0493E" } : {},
              ]}
            >
              {option}
            </Text>
          </TouchableHighlight>
        )
      })}
    </View>
  )
}

export default AssignmentsToggle
