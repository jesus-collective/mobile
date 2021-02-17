import { Ionicons } from "@expo/vector-icons"
import Amplify from "aws-amplify"
import { View } from "native-base"
import React from "react"
import DropDownPicker from "react-native-dropdown-picker"
import EditableText from "../../components/Forms/EditableText"
import { ResourceDetailType } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import {
  GetResourceData,
  GetResourceEpisodeData,
  GetResourceSeriesData,
  ResourceSetupProp,
} from "../../src/types"
import JCComponent from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"
Amplify.configure(awsconfig)

type Props = ResourceSetupProp

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

  icon = () => {
    return <Ionicons name="md-menu" style={this.styles.style.resourceIcon} />
  }
  getButtonItems(items: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData) {
    return items && items.details
      ? items.details
          .filter((e) => e?.type == ResourceDetailType.Button)
          .map((item) => {
            return {
              label: item?.text ?? "",
              value: item?.value ?? "",
              icon: this.icon,
            }
          })
      : []
  }
  render(): React.ReactNode {
    return (
      <ResourceDropDownPicker.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          let item: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData
          if (this.props.pageItem.episodeID != null && this.props.pageItem.episodeID != undefined)
            item = resourceActions.getEpisodeByID(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID,
              this.props.pageItem.episodeID
            )
          else if (
            this.props.pageItem.seriesID != null &&
            this.props.pageItem.seriesID != undefined
          )
            item = resourceActions.getSeriesByID(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID
            )
          else {
            item = resourceActions.getResourceByID(this.props.pageItem.resourceID)
          }
          console.log({ ITEM: item })
          const buttonItems = this.getButtonItems(item)
          return (
            <View
              style={[
                this.styles.style.resourcesRichTextContainer,
                { zIndex: 6000 + this.props.pageItemIndex.length },
              ]}
            >
              <PageItemSettings
                resourceActions={this.props.resourceActions}
                resourceState={this.props.resourceState}
                pageItemIndex={this.props.pageItemIndex}
                save={this.props.save}
                delete={this.props.delete}
                pageItem={this.props.pageItem}
                hideEditButton={this.props.hideEditButton}
              ></PageItemSettings>
              {buttonItems?.length && buttonItems.length > 0 ? (
                <DropDownPicker
                  zIndex={6000 + this.props.pageItemIndex.length}
                  items={buttonItems}
                  placeholder={this.props.pageItem.title1 ?? ""}
                  containerStyle={{
                    height: 40,
                    width: 200,
                    zIndex: 5000 + this.props.pageItemIndex.length,
                  }}
                  dropDownStyle={{
                    backgroundColor: "#FF4438",
                    width: 200,
                    zIndex: 5000 + this.props.pageItemIndex.length,
                  }}
                  style={{
                    backgroundColor: "#FF4438",
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
                    color: "#FFFFFF",
                    fontWeight: "600",
                    alignSelf: "center",
                    zIndex: 5000 + this.props.pageItemIndex.length,
                  }}
                  arrowColor="#FFFFFF"
                  onChangeItem={(item) => {
                    window.location = item.value ?? ""
                  }}
                />
              ) : null}
            </View>
          )
        }}
      </ResourceDropDownPicker.Consumer>
    )
  }
}
export default ResourceDropDownPicker
