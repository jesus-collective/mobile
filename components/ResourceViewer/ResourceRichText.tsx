import React from "react"
import { View } from "react-native"

import { Picker } from "@react-native-picker/picker"
import EditableRichText from "../../components/Forms/EditableRichText"
import MainStyles from "../../components/style"
import { ResourcePageItemStyle } from "../../src/API"
import { ResourceAdminProp, ResourceSetupProp } from "../../src/types"
import PageItemSettings from "./PageItemSettings"

type Props = ResourceSetupProp
export function ResourceRichTextAdmin(props: ResourceAdminProp): JSX.Element {
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
        selectedValue={props.settings.style ?? undefined}
        onValueChange={(value: any) => {
          const tmp = props.settings
          tmp.style = value
          props.setSettings(tmp)
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
          const tmp = props.settings
          tmp.title1 = val
          props.setSettings(tmp)
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
        value={props.settings.title1 ?? ""}
        isEditable={true}
      ></EditableRichText>
    </>
  )
}
function ResourceRichText(props: Props) {
  const styles = MainStyles.getInstance()

  let textStyle
  switch (props.pageItem.style) {
    case ResourcePageItemStyle.RichTextH1:
      textStyle = styles.style.resourceRichTextH1
      break
    case ResourcePageItemStyle.RichTextH2:
      textStyle = styles.style.resourceRichTextH2
      break
    case ResourcePageItemStyle.RichTextH3:
      textStyle = styles.style.resourceRichTextH3
      break
    case ResourcePageItemStyle.RichTextH4:
      textStyle = styles.style.resourceRichTextH4
      break
    case ResourcePageItemStyle.RichTextH5:
      textStyle = styles.style.resourceRichTextH5
      break
    case ResourcePageItemStyle.RichTextH6:
      textStyle = styles.style.resourceRichTextH6
      break
    case ResourcePageItemStyle.RichTextH1Small:
      textStyle = styles.style.resourceRichTextH1Small
      break
    case ResourcePageItemStyle.RichTextH2Small:
      textStyle = styles.style.resourceRichTextH2Small
      break
    case ResourcePageItemStyle.RichTextH3Small:
      textStyle = styles.style.resourceRichTextH3Small
      break
    case ResourcePageItemStyle.RichTextH4Small:
      textStyle = styles.style.resourceRichTextH4Small
      break
    case ResourcePageItemStyle.RichTextH5Small:
      textStyle = styles.style.resourceRichTextH5Small
      break
    case ResourcePageItemStyle.RichTextH6Small:
      textStyle = styles.style.resourceRichTextH6Small
      break
    case ResourcePageItemStyle.RichTextBody1:
      textStyle = styles.style.resourceRichTextBody1
      break
    case ResourcePageItemStyle.RichTextBody2:
      textStyle = styles.style.resourceRichTextBody2
      break
    case ResourcePageItemStyle.RichTextBody3:
      textStyle = styles.style.resourceRichTextBody3
      break
    case ResourcePageItemStyle.RichTextBody4:
      textStyle = styles.style.resourceRichTextBody4
      break
    default:
      textStyle = styles.style.resourceRichTextBody1
  }
  console.log({ textStyle: textStyle })
  return (
    <View style={styles.style.resourcesRichTextContainer}>
      <PageItemSettings
        pageItemIndex={props.pageItemIndex}
        save={props.save}
        delete={props.delete}
        pageItem={props.pageItem}
        hideEditButton={props.hideEditButton}
      ></PageItemSettings>

      <EditableRichText
        textStyle={textStyle}
        inputStyle={textStyle}
        value={props.pageItem.title1 ?? ""}
        isEditable={false}
      ></EditableRichText>
    </View>
  )
}

export default ResourceRichText
