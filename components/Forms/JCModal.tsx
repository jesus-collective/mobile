import { Ionicons } from "@expo/vector-icons"
import ReactDOM from "react-dom"
import { Modal, StyleSheet, Text, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent from "../JCComponent/JCComponent"

export enum JCModalType {
  Default = "Default",
  FullScreen = "FullScreen",
}

interface Props {
  visible: boolean
  onHide(): void
  title: string
  noScroll?: boolean
  unsetOverflow?: boolean
  children: any
  type?: JCModalType
}

export default class JCModal extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
    this.el = document.createElement("div")
  }
  el: any
  modalRoot = document.getElementById("modal")
  componentDidMount(): void {
    this.modalRoot?.appendChild(this.el)
  }
  componentWillUnmount(): void {
    this.modalRoot?.removeChild(this.el)
  }
  render(): React.ReactNode {
    return ReactDOM.createPortal(this.renderModal(), this.el)
  }
  renderModal(): React.ReactNode {
    return this.props.visible ? (
      <Modal
        accessibilityViewIsModal
        animationType={this.props.type == JCModalType.Default ? "slide" : "fade"}
        transparent={true}
        presentationStyle={this.props.type == JCModalType.Default ? "pageSheet" : "fullScreen"}
        style={styles.jcModal}
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
            style={[
              this.props.type == JCModalType.Default
                ? styles.jcModalDefault
                : styles.jcModalFullScreen,
              {
                overflow: this.props.unsetOverflow
                  ? undefined
                  : this.props.noScroll
                  ? "hidden"
                  : "scroll",
              },
            ]}
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
                accessibilityLabel="Close Modal"
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
  static defaultProps = {
    type: JCModalType.Default,
  }
}
const styles = StyleSheet.create({
  jcModal: {
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderWidth: 0,
  },
  jcModalDefault: {
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
    maxHeight: "80vh",
  },
  jcModalFullScreen: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 0,
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
    maxHeight: "100vh",
    width: "100%",
  },
})
