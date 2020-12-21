import Amplify from "aws-amplify"
import { View } from "native-base"
import React from "react"
import EditableRichText from "../../components/Forms/EditableRichText"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import JCComponent from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"

Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {}

class ResourceRichText extends JCComponent<Props> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
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
          textStyle={{ margin: 10, fontSize: 18, fontStyle: 'normal', fontWeight: 400, lineHeight: 27, letterSpacing: 0, textAlign: 'left', color: '#404040',
             }}
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
          textStyle={{ margin: 10, fontSize: 18, lineHeight: 27, fontWeight: 400, color: '#404040' }}
          inputStyle={{ margin: 10, fontSize: 18, lineHeight: 27, fontWeight: 400, color: '#404040' }}
          value={this.props.pageItem.title1}
          isEditable={false}
        ></EditableRichText>
      </View>
    )
  }
}
export default ResourceRichText
