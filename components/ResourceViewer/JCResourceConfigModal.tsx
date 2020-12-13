import React from "react"
import { Container, Card, CardItem, ListItem, List } from "native-base"
import ProfileImage from "../../components/ProfileImage/ProfileImage"

import { Text, Image, Dimensions, View } from "react-native"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"
import { TouchableOpacity } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import EditableText from "../Forms/EditableText"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import JCModal from "../../components/Forms/JCModal"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
interface Props {
  visible: boolean
  onClose(): void
}

export default class JCResourceConfigModal extends JCComponent<Props> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
  }

  renderButtons(state: ResourceState, actions: ResourceActions): React.ReactNode {
    console.log("BUTTONS")
    return (
      <View style={{ flexDirection: "column" }}>
        {state.canJoin ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={() => {
              actions.joinGroup()
            }}
          >
            Join Resource
          </JCButton>
        ) : null}
        {state.canLeave ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={() => {
              actions.leaveGroup()
            }}
          >
            Leave Resource
          </JCButton>
        ) : null}
        {state.createNew ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={() => {
              actions.createGroup()
            }}
          >
            Create Resource
          </JCButton>
        ) : null}
        {state.canSave ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={() => {
              actions.saveGroup()
            }}
          >
            Save Resource
          </JCButton>
        ) : null}
        {state.canDelete ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={() => {
              if (window.confirm("Are you sure you wish to delete this group?"))
                actions.deleteGroup()
            }}
          >
            Delete Resource
          </JCButton>
        ) : null}
        <Text>{state.validationError}</Text>
      </View>
    )
  }

  render() {
    return (
      <JCResourceConfigModal.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          return (
            <JCModal
              visible={this.props.visible}
              title="Configure Page Item"
              onHide={() => {
                this.props.onClose()
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 30,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 16,
                      fontFamily: "Graphik-Regular-App",
                      color: "#333333",
                      textTransform: "uppercase",
                    }}
                  >
                    Resource
                  </Text>
                  {resourceState.isEditable ? (
                    <JCSwitch
                      switchLabel="Sponsored"
                      initState={
                        resourceState.groupData.isSponsored
                          ? resourceState.groupData.isSponsored === "true"
                          : false
                      }
                      onPress={(status) => {
                        resourceActions.updateValueGroup("isSponsored", status ? "true" : "false")
                      }}
                    ></JCSwitch>
                  ) : resourceState.groupData.isSponsored == "true" ? (
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 16,
                        fontFamily: "Graphik-Regular-App",
                        color: "#979797",
                        textTransform: "uppercase",
                      }}
                    >
                      Sponsored
                    </Text>
                  ) : null}
                </View>

                <EditableText
                  onChange={(value: any) => {
                    resourceActions.updateValueGroup("name", value) // actions.updateOverview("title", value)
                  }}
                  placeholder="Enter Resource Name"
                  multiline={false}
                  textStyle={this.styles.style.groupNameInput}
                  inputStyle={this.styles.style.groupNameInput}
                  value={resourceState.groupData.name}
                  isEditable={resourceState.isEditable}
                ></EditableText>
                <EditableText
                  onChange={(value: any) => {
                    resourceActions.updateValueGroup("description", value) //actions.updateOverview("description", value)
                  }}
                  placeholder="Enter Resource Description"
                  multiline={true}
                  textStyle={this.styles.style.groupDescriptionInput}
                  inputStyle={this.styles.style.groupDescriptionInput}
                  value={resourceState.groupData.description}
                  isEditable={resourceState.isEditable}
                ></EditableText>

                <Text
                  style={{
                    fontFamily: "Graphik-Regular-App",
                    fontSize: 16,
                    lineHeight: 23,
                    color: "#333333",
                    paddingBottom: 12,
                  }}
                >
                  Organizer
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    resourceActions.showProfile(
                      resourceState.groupData.ownerUser
                        ? resourceState.groupData.ownerUser.id
                        : resourceState.currentUserProfile.id
                    )
                  }}
                >
                  <ProfileImage
                    user={
                      resourceState.groupData.ownerUser
                        ? resourceState.groupData.ownerUser
                        : resourceState.currentUserProfile
                    }
                    size="small"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Graphik-Bold-App",
                    fontSize: 20,
                    lineHeight: 25,
                    letterSpacing: -0.3,
                    color: "#333333",
                    paddingTop: 48,
                    paddingBottom: 12,
                  }}
                >
                  Members ({resourceState.memberIDs.length})
                </Text>

                <View style={this.styles.style.groupAttendeesPictures}>
                  {resourceState.memberIDs.length == 0 ? (
                    <Text
                      style={{
                        fontFamily: "Graphik-Bold-App",
                        fontSize: 16,
                        lineHeight: 24,
                        letterSpacing: -0.3,
                        color: "#333333",
                        marginBottom: 30,
                      }}
                    >
                      No Members Yet
                    </Text>
                  ) : (
                    resourceState.memberIDs.map((id: any, index: any) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            resourceActions.showProfile(id)
                          }}
                        >
                          <ProfileImage key={index} user={id} size="small" />
                        </TouchableOpacity>
                      )
                    })
                  )}
                </View>

                {this.renderButtons(resourceState, resourceActions)}
              </View>
            </JCModal>
          )
        }}
      </JCResourceConfigModal.Consumer>
    )
  }
}
