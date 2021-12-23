import React from "react"
import { View } from "react-native"

type Props = {
  isLastAndOdd: boolean
  children: JSX.Element
}
const LastListItem = (props: Props) => {
  const { isLastAndOdd, children } = props
  // marginRight is the amount to subract from width if there is a gap in the list
  return (
    <View style={[isLastAndOdd ? { flex: 0.5, marginRight: 32 } : { flex: 1 }]}>{children}</View>
  )
}

export default LastListItem
