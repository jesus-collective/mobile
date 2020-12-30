import Amplify from "aws-amplify"
import { View } from "native-base"
import React from "react"
import { Picker, ViewStyle } from "react-native"
import { ResourcePageItemStyle } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import ResourceContent from "./ResourceContent"
import { ResourceContext } from "./ResourceContext"

Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {}
interface State extends JCState {}
class ResourceColumn extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
    }
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
            .filter((z) => z.startsWith("Column"))
            .map((org) => {
              return <Picker.Item key={org} label={org} value={org} />
            })}
        </Picker>
      </>
    )
  }
  getLeftColumnSize(): number {
    switch (this.props.pageItem.style) {
      case ResourcePageItemStyle.Column3070:
        return 33
      case ResourcePageItemStyle.Column5050:
        return 50
      case ResourcePageItemStyle.Column7030:
        return 77
      default:
        return 50
    }
  }

  render(): React.ReactNode {
    const border: ViewStyle = { borderWidth: 1, borderStyle: "dashed" }
    console.log({ COLUMns: this.props.pageItemIndex })
    return (
      <View
        style={[
          { flexDirection: "row", zIndex: 5000 + this.props.pageItemIndex.length },
          this.props.resourceState.isEditable && border,
        ]}
      >
        <View style={{ flexGrow: this.getLeftColumnSize(), marginRight: 106 }}>
          <ResourceContent
            pageItems={this.props.pageItem.pageItemsLeft}
            isBase={false}
            pageItemIndex={this.props.pageItemIndex.concat("pageItemsLeft")}
          ></ResourceContent>
          <PageItemSettings
            resourceActions={this.props.resourceActions}
            resourceState={this.props.resourceState}
            pageItemIndex={this.props.pageItemIndex}
            save={this.props.save}
            delete={this.props.delete}
            pageItem={this.props.pageItem}
          ></PageItemSettings>
        </View>
        <View
          style={[
            {
              borderWidth: 1,
              flexGrow: 100 - this.getLeftColumnSize()
            },
            this.props.resourceState.isEditable && border,
          ]}
        >
          <ResourceContent
            pageItems={this.props.pageItem.pageItemsRight}
            isBase={false}
            pageItemIndex={this.props.pageItemIndex.concat("pageItemsRight")}
          ></ResourceContent>
        </View>
      </View>
    )
  }
}
export default ResourceColumn
