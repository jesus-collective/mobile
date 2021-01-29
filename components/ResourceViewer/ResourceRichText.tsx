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
            width: "100%",
          }}
          inputStyle={{
            margin: 10,
            fontSize: 18,
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: 27,
            letterSpacing: 0,
            textAlign: "left",
            color: "#404040",
            width: "100%",
          }}
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
        break
      case ResourcePageItemStyle.RichTextH2:
        textStyle = this.styles.style.resourceRichTextH2
        break
      case ResourcePageItemStyle.RichTextH3:
        textStyle = this.styles.style.resourceRichTextH3
        break
      case ResourcePageItemStyle.RichTextH4:
        textStyle = this.styles.style.resourceRichTextH4
        break
      case ResourcePageItemStyle.RichTextH5:
        textStyle = this.styles.style.resourceRichTextH5
        break
      case ResourcePageItemStyle.RichTextH6:
          textStyle = this.styles.style.resourceRichTextH6
        break
        case ResourcePageItemStyle.RichTextH1Small:
          textStyle = this.styles.style.resourceRichTextH1Small
          break
        case ResourcePageItemStyle.RichTextH2Small:
          textStyle = this.styles.style.resourceRichTextH2Small
          break
        case ResourcePageItemStyle.RichTextH3Small:
          textStyle = this.styles.style.resourceRichTextH3Small
          break
        case ResourcePageItemStyle.RichTextH4Small:
          textStyle = this.styles.style.resourceRichTextH4Small
          break
        case ResourcePageItemStyle.RichTextH5Small:
          textStyle = this.styles.style.resourceRichTextH5Small
          break
        case ResourcePageItemStyle.RichTextH6Small:
            textStyle = this.styles.style.resourceRichTextH6Small
          break
      case ResourcePageItemStyle.RichTextBody1:
        textStyle = this.styles.style.resourceRichTextBody1
        break
      case ResourcePageItemStyle.RichTextBody2:
        textStyle = this.styles.style.resourceRichTextBody2
        break
      case ResourcePageItemStyle.RichTextBody3:
        textStyle = this.styles.style.resourceRichTextBody3
        break
      case ResourcePageItemStyle.RichTextBody4:
        textStyle = this.styles.style.resourceRichTextBody4
        break
      default:
        textStyle = this.styles.style.resourceRichTextBody1
    }
    console.log(textStyle)
    return (
      <View style={this.styles.style.resourcesRichTextContainer}>
        <PageItemSettings
          resourceActions={this.props.resourceActions}
          resourceState={this.props.resourceState}
          pageItemIndex={this.props.pageItemIndex}
          save={this.props.save}
          delete={this.props.delete}
          pageItem={this.props.pageItem}
          hideEditButton={this.props.hideEditButton}
        ></PageItemSettings>

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
