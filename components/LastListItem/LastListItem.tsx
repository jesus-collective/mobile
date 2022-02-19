import React from "react"
import { View } from "react-native"

type Props = {
  isThreeColumn?: boolean
  children: JSX.Element
  index: number
  listLength: number
}
const LastListItem = (props: Props) => {
  const { children, isThreeColumn, index, listLength } = props
  const isLastAndOdd = isThreeColumn
    ? listLength - 1 === index && index % 3 === 0
    : listLength - 1 === index && index % 2 === 0
  // marginRight is the amount to subract from width if there is a gap in the list
  return (
    <View
      style={[
        isThreeColumn
          ? { width: "calc(33% - 20px)" }
          : isLastAndOdd
          ? { width: "calc(50% - 16px)" }
          : { flex: 1 },
      ]}
    >
      {children}
    </View>
  )
}

export default LastListItem
