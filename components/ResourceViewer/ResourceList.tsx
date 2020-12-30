import Amplify from "aws-amplify"
import React from "react"
import { Text, View, ViewStyle } from "react-native"
import EditableText from "../../components/Forms/EditableText"
import { ResourcePageItemInput, ResourcePageItemStyle, ResourcePageItemType } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import ResourceCard from "./ResourceCard"
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
        <Text>Title 1:</Text>
        <EditableText
          onChange={(val: string) => {
            const tmp = page.state.settings
            tmp.title1 = val
            page.setState({ settings: tmp })
          }}
          placeholder="Title 1"
          multiline={false}
          textStyle={{ margin: 10 }}
          inputStyle={{ margin: 10 }}
          value={page.state.settings.title1 ?? ""}
          isEditable={true}
        ></EditableText>
        <Text>Title 2:</Text>

        <EditableText
          onChange={(val: string) => {
            const tmp = page.state.settings
            tmp.title2 = val
            page.setState({ settings: tmp })
          }}
          placeholder="Title 2"
          multiline={false}
          textStyle={{ margin: 10 }}
          inputStyle={{ margin: 10 }}
          value={page.state.settings.title2 ?? ""}
          isEditable={true}
        ></EditableText>
      </>
    )
  }

  render(): React.ReactNode {
    const border: ViewStyle = { borderWidth: 1, borderStyle: "dashed" }
    const z: ResourcePageItemInput = {
      id: "z",
      type: ResourcePageItemType.Card,
      title1: "Test",
      title2: "Test2",
      image: {
        filenameLarge:
          "resources/group-2cfc8acd-9c28-4d2c-8a98-413a1bad171b-pageId-15e2e2cc-475a-4ebd-bd48-eacef5f41233-card-1609303536164-large.png",
        filenameMedium:
          "resources/group-2cfc8acd-9c28-4d2c-8a98-413a1bad171b-pageId-15e2e2cc-475a-4ebd-bd48-eacef5f41233-card-1609303536164-medium.png",
        filenameSmall:
          "resources/group-2cfc8acd-9c28-4d2c-8a98-413a1bad171b-pageId-15e2e2cc-475a-4ebd-bd48-eacef5f41233-card-1609303536164-small.png",
        filenameUpload:
          "resources/upload/group-2cfc8acd-9c28-4d2c-8a98-413a1bad171b-pageId-15e2e2cc-475a-4ebd-bd48-eacef5f41233-card-1609303536164-upload.jpeg",
        userId: "us-east-1:c2ee2958-e5da-48f7-a1c2-cac810f8e873",
      },
      style: ResourcePageItemStyle.CardManual,
      description1: "Test3",
    }
    console.log({ COLUMns: this.props.pageItemIndex })
    return (
      <View
        style={[
          {
            flexDirection: "column",
            width: "100%",
            zIndex: 5000 + this.props.pageItemIndex.length,
          },
          this.props.resourceState.isEditable && border,
        ]}
      >
        <PageItemSettings
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex}
              save={this.props.save}
              delete={this.props.delete}
              pageItem={this.props.pageItem}>
          </PageItemSettings>
        <View style={{ paddingBottom: 9, paddingTop: 30 }}>
          <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 14,fontStyle: 'normal', fontWeight: 800, lineHeight: 21, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'left', color: '#404040' }}>{this.props.pageItem.title1}</Text>
          <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 14,fontStyle: 'normal', fontWeight: 800, lineHeight: 21, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'left', color: '#404040' }}>{this.props.pageItem.title2}</Text>
        </View>
        <View style={{ height: "100%", overflow: "scroll" }}>
          <View style={{ flexDirection: "row" }}>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
            <ResourceCard
              resourceActions={this.props.resourceActions}
              resourceState={this.props.resourceState}
              pageItemIndex={this.props.pageItemIndex?.concat(this.props.pageItemIndex)}
              pageItem={z}
              hideEditButton={true}
            ></ResourceCard>
          </View>
        </View>
      </View>
    )
  }
}
export default ResourceColumn
