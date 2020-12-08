import * as React from "react";
import MainStyles from "../../components/style";
import { Dimensions } from "react-native";
import { Auth } from "aws-amplify";

export interface JCState {
  // groups: any;
  // groupsLoaded: boolean;
}
export default class JCComponent<
  Props = any,
  State extends JCState = any
> extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.getInitialState();
  }
  componentDidMount(): void {
    Dimensions.addEventListener("change", () => {
      this.styles.updateStyles(this);
    });
  }
  protected getInitialState(): State {
    return ({} as JCState) as State;
  }
  styles = MainStyles.getInstance();
  componentWillUnmount(): void {
    Dimensions.removeEventListener("change", () => {
      this.styles.updateStyles(this);
    });
  }
}
