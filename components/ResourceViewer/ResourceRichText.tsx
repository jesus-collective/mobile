import { Container, View } from "native-base"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Image, Text, Animated } from "react-native"
import EditableText from "../Forms/EditableText"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"
import { Storage } from "aws-amplify"
import Amplify from "aws-amplify"
import awsconfig from "../../src/aws-exports"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { EmptyProps, ResourceSetupProp } from "../../src/types"
import PageItemSettings from "./PageItemSettings"
import { ResourcePageItemInput } from "src/API"
import EditableRichText from "../../components/Forms/EditableRichText"

Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {}
interface State extends JCState {
  imageUrl: any
  image: any
  fadeValue: any
}
class ResourceRichText extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      imageUrl: null,
      image: null,
      fadeValue: new Animated.Value(0),
    }
  }
  fadeAnimation = (): void => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 3250,
      useNativeDriver: true,
    }).start()
  }
  async getImage(img: any): Promise<void> {
    if (img == null) return
    if (img != null) {
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      this.setState({ imageUrl: z, image: img })
    }
  }
  static renderAdmin(page: PageItemSettings): React.ReactNode {
    return (
      <>
        <EditableRichText
          onChange={(val) => {
            const tmp = page.state.settings
            tmp.title1 = val
            page.setState({ settings: tmp })
          }}
          textStyle={{ margin: 10 }}
          inputStyle={{ margin: 10 }}
          value={page.state.settings.title1}
          isEditable={true}
        ></EditableRichText>
      </>
    )
  }

  render(): React.ReactNode {
    return (
      <Container>
        <PageItemSettings
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex}
          save={this.props.save}
          delete={this.props.delete}
          pageItem={this.props.pageItem}
        ></PageItemSettings>
        {/* */}

        <EditableRichText
          textStyle={{ margin: 10 }}
          inputStyle={{ margin: 10 }}
          value={this.props.pageItem.title1}
          isEditable={false}
        ></EditableRichText>
      </Container>
    )
  }
}
export default ResourceRichText
