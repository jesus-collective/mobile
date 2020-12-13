import Amplify, { Storage } from "aws-amplify"
import { View } from "native-base"
import React from "react"
import { Animated } from "react-native"
import EditableRichText from "../../components/Forms/EditableRichText"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"

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
          onChange={(val: string) => {
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
      <View>
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
      </View>
    )
  }
}
export default ResourceRichText
