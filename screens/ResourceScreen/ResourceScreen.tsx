import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Container, StyleProvider } from "native-base"
import React from "react"
import { Image, View } from "react-native"
import FloatingButton from "../../components/FloatingButton/FloatingButton"
import FloatingButtonStyles from "../../components/FloatingButton/FloatingButtonStyles"
import Header from "../../components/Header/Header"
import HelpModal from "../../components/HelpModal/HelpModal"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyMap from "../../components/MyMap/MyMap"
import ResourceViewer from "../../components/ResourceViewer/ResourceViewer"
import getTheme from "../../native-base-theme/components"
import material from "../../native-base-theme/variables/material"

interface Props {
  navigation?: any
  route?: any
}
interface State extends JCState {
  showMap: boolean
  helpModal: boolean
}

class ResourceScreenImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      showMap: false,
      helpModal: false,
    }
  }
  renderHelpModal(): JSX.Element | null {
    return (
      <HelpModal setShow={() => this.setState({ helpModal: !this.state.helpModal })}></HelpModal>
    )
  }
  renderHelpFab(): JSX.Element | null {
    return (
      <FloatingButton
        setShow={() => this.setState({ helpModal: !this.state.helpModal })}
        smallIcon={<MaterialCommunityIcons name="help-circle" size={24} color="white" />}
        customStyle={FloatingButtonStyles.HelpFloatingButtonStyle}
        customLabelStyle={FloatingButtonStyles.HelpFloatingButtonTextStyle}
        largeIcon={
          this.state.helpModal ? (
            <MaterialCommunityIcons name="close-thick" size={24} color="white" />
          ) : (
            <View
              style={{
                marginLeft: -24,
                height: 41,
                width: 41,
                borderRadius: 50,
                backgroundColor: "#F0493E",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Image
                style={{
                  flex: 1,
                }}
                source={require("../../assets/svg/JC-Logo.svg")}
              ></Image>
            </View>
          )
        }
        label={this.state.helpModal ? "" : "Need Help?"}
      />
    )
  }
  render(): React.ReactNode {
    //console.log(this.state)
    console.log("ResourceScreen")

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header title="Jesus Collective" navigation={this.props.navigation} />
          <MyMap type={"no-filters"} mapData={[]} visible={this.state.showMap}></MyMap>
          <ResourceViewer
            navigation={this.props.navigation}
            groupId={this.props.route.params.id}
          ></ResourceViewer>
          {this.state.helpModal ? null : this.renderHelpFab()}
          {this.state.helpModal ? this.renderHelpModal() : null}
        </Container>
      </StyleProvider>
    )
  }
}

export default function ResourceScreen(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <ResourceScreenImpl {...props} navigation={navigation} route={route} />
}
