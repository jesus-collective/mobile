import MomentUtils from "@date-io/moment"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import React, { Suspense } from "react"
import { Text, View } from "react-native"
import { AuthStateData } from "src/types"
import JCComponent from "../../components/JCComponent/JCComponent"
import Main from "./Main"

interface Props {
  authState?: any
  onStateChange(state: string, data: AuthStateData): void
}

export default class App extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  renderFallback(): {} {
    return <Text>loading...</Text>
  }
  render(): React.ReactNode {
    //    console.log({ AppAuthState: this.props.authState });

    return (
      <Suspense fallback={this.renderFallback()}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
          }}
        >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Main
              onStateChange={async (e: string, e2: AuthStateData) => {
                console.log(e)
                await this.props.onStateChange(e, e2)
              }}
              authState={this.props.authState}
            />
          </MuiPickersUtilsProvider>
        </View>
      </Suspense>
    )
  }
}
