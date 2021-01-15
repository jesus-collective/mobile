import { Ionicons } from "@expo/vector-icons"
import { Text } from "native-base"
import React from "react"
import ReactDOM from "react-dom"
import { Modal, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent from "../JCComponent/JCComponent"
interface Props {
  visible: boolean
  onHide(): void
  title: string
}

export default class JCModal extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
    this.el = document.createElement("div")
  }
  el: any
  modalRoot = document.getElementById("modal")
  componentDidMount() {
    this.modalRoot?.appendChild(this.el)
  }
  componentWillUnmount() {
    this.modalRoot?.removeChild(this.el)
  }
  render() {
    return ReactDOM.createPortal(this.renderModal(), this.el)
  }
  renderModal() {
    return this.props.visible ? (
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="pageSheet"
        style={this.styles.style.jcModal}
        visible={this.props.visible}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 10,
              paddingTop: 10,
              paddingBottom: 25,
              paddingLeft: 20,
              paddingRight: 20,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              maxHeight: '80vh',
              overflow: 'scroll'
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={this.styles.style.adminCRMModalHeading}>{this.props.title}</Text>
              <JCButton
                buttonType={ButtonTypes.ResourceModal}
                onPress={() => {
                  this.props.onHide()
                }}
              >
                <Ionicons size={32} name="ios-close" style={this.styles.style.icon} />
              </JCButton>
            </View>
            <View
              style={{
                borderBottomColor: "#333333",
                opacity: 0.2,
                borderBottomWidth: 1,
                width: "100%",
                marginBottom: 15,
              }}
            ></View>
            {this.props.children}
          </View>
        </View>
      </Modal>
    ) : null
  }
}
