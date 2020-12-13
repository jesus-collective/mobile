import { useNavigation, useRoute } from "@react-navigation/native"
import { Container, View } from "native-base"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import EditableText from "../../components/Forms/EditableText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import JCComponent from "../JCComponent/JCComponent"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"
import ResourceMenu from "./ResourceMenu"

interface Props {
  navigation?: any
  route?: any
}

class ResourceOverviewImpl extends JCComponent<Props> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
  }
  getValueFromKey(myObject: unknown, string: string) {
    const key = Object.keys(myObject).filter((k) => k.includes(string))
    return key.length ? myObject[key[0]] : ""
  }

  renderButtons(state: ResourceState, actions: ResourceActions): React.ReactNode {
    return (
      <Container style={{ minHeight: 30 }}>
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
      </Container>
    )
  }
  render(): React.ReactNode {
    console.log("ResourceScreen")
    return (
      <ResourceOverviewImpl.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.groupData != null)
            return (
              <Container style={this.styles.style.resourcesOverviewScreenMainContainer}>
                <Container style={this.styles.style.detailScreenLeftCard}>
                  <ResourceMenu></ResourceMenu>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                      width: 100,
                      marginTop: 20,
                      marginBottom: 40,
                    }}
                  />
                  <Container
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      flexGrow: 0,
                      marginBottom: 20,
                      height: "auto",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 16,
                        fontFamily: "Graphik-Regular-App",
                        color: "#333333",
                        textTransform: "uppercase",
                        flex: 0,
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
                          flex: 0,
                        }}
                      >
                        Sponsored
                      </Text>
                    ) : null}
                  </Container>

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
                </Container>
                <Container
                  style={{
                    flex: 70,
                    flexDirection: "column",
                    alignContent: "flex-start",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    backgroundColor: "#F9FAFC",
                    height: "100%",
                  }}
                >
                  {resourceState.resourceData.resources.items[
                    resourceState.currentResource as number
                  ] ? (
                    <Container style={this.styles.style.resourcesOverviewRightCard}></Container>
                  ) : null}
                </Container>
              </Container>
            )
          else return null
        }}
      </ResourceOverviewImpl.Consumer>
    )
  }
}
export default function ResourceOverview(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <ResourceOverviewImpl {...props} navigation={navigation} route={route} />
}
