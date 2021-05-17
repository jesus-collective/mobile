import * as React from "react"
import { Dimensions } from "react-native"
import MainStyles from "../../components/style"
type WithoutKeys<T> = Omit<T, keyof T>
export type JCState = WithoutKeys<Record<string, never>>
export default class JCComponent<Props = any, State extends JCState = any> extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = this.getInitialState()
  }
  componentDidMount(): void {
    Dimensions.addEventListener("change", () => {
      this.styles.updateStyles(this)
    })
  }
  protected getInitialState(): State {
    return ({} as JCState) as State
  }
  styles = MainStyles.getInstance()
  componentWillUnmount(): void {
    Dimensions.removeEventListener("change", () => {
      this.styles.updateStyles(this)
    })
  }
}
