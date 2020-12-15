import { Ionicons } from "@expo/vector-icons"
import { Picker } from "native-base"
import React from "react"
import { PageItemIndex } from "src/types"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import JCComponent from "../../components/JCComponent/JCComponent"
import { ResourcePageItemInput, ResourcePageItemType } from "../../src/API"
import ResourceCard from "./ResourceCard"
import ResourceColumn from "./ResourceColumn"
import { ResourceActions, ResourceState } from "./ResourceContext"
import ResourceHeader from "./ResourceHeader"
import ResourceMenu from "./ResourceMenu"
import ResourceRichText from "./ResourceRichText"

interface Props {
  resourceActions: ResourceActions
  resourceState: ResourceState
  pageItemIndex: PageItemIndex
  pageItem: ResourcePageItemInput
  save(
    resourceActions: ResourceActions,
    resourceState: ResourceState,
    index: number,
    value: ResourcePageItemInput
  ): void
  delete(resourceActions: ResourceActions, resourceState: ResourceState, index: number): void
}
interface State {
  showSettingsModal: boolean
  settings: ResourcePageItemInput
}
export default class PageItemSettings extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showSettingsModal: false,
      settings: this.props.pageItem,
    }
  }
  save() {
    this.props.save(
      this.props.resourceActions,
      this.props.resourceState,
      this.props.pageItemIndex,
      this.state.settings
    )
  }
  delete() {
    this.props.delete(
      this.props.resourceActions,
      this.props.resourceState,
      this.props.pageItemIndex
    )
  }
  renderAdminRouter() {
    switch (this.state.settings.type) {
      case ResourcePageItemType.Header:
        return ResourceHeader.renderAdmin(this)
      case ResourcePageItemType.Menu:
        return ResourceMenu.renderAdmin(this)
      case ResourcePageItemType.RichText:
        return ResourceRichText.renderAdmin(this)
      case ResourcePageItemType.Column:
        return ResourceColumn.renderAdmin(this)
      case ResourcePageItemType.Card:
        return ResourceCard.renderAdmin(this)
    }
  }
  render() {
    return (
      <>
        <JCButton
          buttonType={ButtonTypes.AdminModal}
          onPress={() => {
            this.setState({ showSettingsModal: true })
          }}
        >
          <Ionicons name="ios-settings" style={this.styles.style.icon} size={32} />
        </JCButton>
        {this.state.showSettingsModal ? (
          <JCModal
            visible={this.state.showSettingsModal}
            title="Configure Page Item"
            onHide={() => {
              this.setState({ showSettingsModal: false })
            }}
          >
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
                selectedValue={this.state.settings.type}
                onValueChange={(value: any) => {
                  const tmp = this.state.settings
                  tmp.type = value
                  this.setState({ settings: tmp })
                }}
              >
                {Object.keys(ResourcePageItemType).map((org) => {
                  return <Picker.Item key={org} label={org} value={org} />
                })}
              </Picker>
              {this.renderAdminRouter()}
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  this.save()
                  this.setState({ showSettingsModal: false })
                }}
              >
                Save
              </JCButton>
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  this.delete()
                  this.setState({ showSettingsModal: false })
                }}
              >
                Delete
              </JCButton>
            </>
          </JCModal>
        ) : null}
      </>
    )
  }
}
