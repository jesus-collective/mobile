import { Container } from "native-base"
import React from "react"
import { Text } from "react-native"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { ResourceContext } from "./ResourceContext"

interface Props {
  currentResource: number
}

interface State extends JCState {
  showEditorModal: boolean
}

export default class EpisodeCard extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <Container style={this.styles.style.resourceContentLeftContainer}>
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            flexGrow: 0,
            marginBottom: 40,
            marginTop: 30,
            paddingLeft: 10,
            paddingRight: 20,
            height: 30,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              lineHeight: 25,
              fontFamily: "Graphik-Bold-App",
              color: "#333333",
            }}
          >
            Current Series
          </Text>
        </Container>
        <Container style={{ overflow: "scroll" }}>
          <Container style={this.styles.style.resourceContentCurrentSeriesContainer}>
            {/*state.resourceData.resources.items[state.currentResource].series.items.length > 0
        ? state.resourceData.resources.items[state.currentResource].series.items.map(
            (series, index: number) => {
              return this.renderSeriesCard(state, actions, series, index)
            }
          )
          : null*/}
          </Container>
        </Container>
      </Container>
    )
  }
}
