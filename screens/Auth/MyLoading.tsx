import { Loading } from "aws-amplify-react-native"
import React from "react"
import { View } from "react-native"

interface Props {
  authState: string
}

export default class MyLoading extends Loading<Props> {
  constructor(props: Props) {
    super(props)
  }

  render(): React.ReactNode {
    return this.props.authState === "loading" ? (
      <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}></View>
    ) : null
  }
}
