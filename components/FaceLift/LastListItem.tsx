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
          ? { flex: 0.333333 }
          : isLastAndOdd
          ? { flex: 0.5, marginRight: 32 }
          : { flex: 1 },
      ]}
    >
      {children}
    </View>
  )
}

export default LastListItem
