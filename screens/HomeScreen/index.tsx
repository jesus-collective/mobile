import React, { Suspense } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { View, Platform } from "react-native";
import { Text } from "react-native";
import JCComponent from "../../components/JCComponent/JCComponent";
import Main from "./Main";
interface Props {
  authState?: any;
  onStateChange(state: string, data: string): void;
}

export default class App extends JCComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  renderFallback(): {} {
    return <Text>loading...</Text>;
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
              onStateChange={(e: any, e2: any) => {
                console.log(e);
                this.props.onStateChange(e, e2);
              }}
              authState={this.props.authState}
            />
          </MuiPickersUtilsProvider>
        </View>
      </Suspense>
    );
  }
}
