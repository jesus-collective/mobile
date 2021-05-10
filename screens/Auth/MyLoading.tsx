import { Loading } from "aws-amplify-react-native"
import { View } from "native-base"
import React from "react"
import { Dimensions } from "react-native"
import MainStyles from "../../components/style"

interface Props {
  authState: string
}

export default class MyLoading extends Loading<Props> {
  constructor(props: Props) {
    super(props)
    this.props = props
  }
  styles = MainStyles.getInstance()
  componentDidMount(): void {
    Dimensions.addEventListener("change", () => {
      this.styles.updateStyles(this)
    })
  }
  componentWillUnmount(): void {
    Dimensions.removeEventListener("change", () => {
      this.styles.updateStyles(this)
    })
  }

  props: Props
  render(): React.ReactNode {
    return this.props.authState === "loading" ? (
      <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
        <View style={this.styles.style.authView}></View>
      </View>
    ) : null
  }
}
