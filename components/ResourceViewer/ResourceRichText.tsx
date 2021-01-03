import Amplify from "aws-amplify"
import { Picker, View } from "native-base"
import React from "react"
import EditableRichText from "../../components/Forms/EditableRichText"
import { ResourcePageItemStyle } from "../../src/API"
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
        <Picker
          mode="dropdown"
          style={{
            width: "100%",
            marginTop: 10,
            marginBottom: 30,
            fontSize: 16,
            height: 30,
            flexGrow: 0,
            paddingTop: 3,
            paddingBottom: 3,
          }}
          selectedValue={page.state.settings.style}
          onValueChange={(value: any) => {
            const tmp = page.state.settings
            tmp.style = value
            page.setState({ settings: tmp })
          }}
        >
          {Object.keys(ResourcePageItemStyle)
            .filter((z) => z.startsWith("RichText"))
            .map((org) => {
              return <Picker.Item key={org} label={org} value={org} />
            })}
        </Picker>
        <EditableRichText
          onChange={(val: string) => {
            const tmp = page.state.settings
            tmp.title1 = val
            page.setState({ settings: tmp })
          }}
          textStyle={{
            margin: 10,
            fontSize: 18,
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: 27,
            letterSpacing: 0,
            textAlign: "left",
            color: "#404040",
          }}
          inputStyle={{ margin: 10 }}
          value={page.state.settings.title1}
          isEditable={true}
        ></EditableRichText>
      </>
    )
  }

  render(): React.ReactNode {
    let textStyle
    switch (this.props.pageItem.style) {
      case ResourcePageItemStyle.RichTextH1:
        textStyle = this.styles.style.resourceRichTextH1
      case ResourcePageItemStyle.RichTextH2:
        textStyle = this.styles.style.resourceRichTextH2
      case ResourcePageItemStyle.RichTextH3:
        textStyle = this.styles.style.resourceRichTextH3
      case ResourcePageItemStyle.RichTextH4:
        textStyle = this.styles.style.resourceRichTextH4
      case ResourcePageItemStyle.RichTextBody1:
        textStyle = this.styles.style.resourceRichTextBody1
      case ResourcePageItemStyle.RichTextBody2:
        textStyle = this.styles.style.resourceRichTextBody2
      case ResourcePageItemStyle.RichTextBody3:
        textStyle = this.styles.style.resourceRichTextBody3
      default:
        textStyle = this.styles.style.resourceRichTextBody1
    }
    return (
      <View style={this.styles.style.resourcesRichTextContainer}>
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
          textStyle={textStyle}
          inputStyle={textStyle}
          value={this.props.pageItem.title1}
          isEditable={false}
        ></EditableRichText>
      </View>
    )
  }
}
export default ResourceRichText
