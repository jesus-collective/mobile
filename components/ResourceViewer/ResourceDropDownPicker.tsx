import { Ionicons } from "@expo/vector-icons"
import Amplify from "aws-amplify"
import { View } from "native-base"
import React from "react"
import DropDownPicker from "react-native-dropdown-picker"
import EditableText from "../../components/Forms/EditableText"
import { ResourcePageItemType } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import JCComponent from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"
Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {}

class ResourceDropDownPicker extends JCComponent<Props> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
  }

  static renderAdmin(page: PageItemSettings): React.ReactNode {
    return (
      <>
        <EditableText
          multiline={false}
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
          value={page.state.settings.title1 ?? ""}
          isEditable={true}
        ></EditableText>
      </>
    )
  }

  render(): React.ReactNode {
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
        {/* */}

        <DropDownPicker
          zIndex={5000 + this.props.pageItemIndex.length}
          items={[
            //TODO
            {
              label: "Menu",
              value: ResourcePageItemType.Menu,
              icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
              hidden: true,
            },
            {
              label: "Header",
              value: ResourcePageItemType.Header,
              icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
            },
            {
              label: "Rich Text",
              value: ResourcePageItemType.RichText,
              icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
            },
            {
              label: "List",
              value: ResourcePageItemType.List,
              icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
            },
            {
              label: "Grid",
              value: ResourcePageItemType.Grid,
              icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
            },
            {
              label: "Column",
              value: ResourcePageItemType.Column,
              icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
            },
            {
              label: "Card",
              value: ResourcePageItemType.Card,
              icon: () => <Ionicons name="md-menu" style={this.styles.style.icon} />,
            },
          ]}
          placeholder={this.props.pageItem.title1 ?? ""}
          containerStyle={{
            height: 40,
            width: 160,
            zIndex: 5000 + this.props.pageItemIndex.length,
          }}
          dropDownStyle={{
            backgroundColor: "#fafafa",
            width: 150,
            zIndex: 5000 + this.props.pageItemIndex.length,
          }}
          style={{
            backgroundColor: "#fafafa",
            zIndex: 5000 + this.props.pageItemIndex.length,
          }}
          itemStyle={{
            justifyContent: "flex-start",
            width: 100,
            zIndex: 5000 + this.props.pageItemIndex.length,
          }}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
            color: "#000",
            zIndex: 5000 + this.props.pageItemIndex.length,
          }}
          onChangeItem={(item) => {}}
        />
      </View>
    )
  }
}
export default ResourceDropDownPicker
