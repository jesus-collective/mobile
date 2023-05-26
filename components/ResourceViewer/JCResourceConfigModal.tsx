import { AntDesign } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { useContext } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { UserGroupType } from "../../src/API"
import EditableText from "../Forms/EditableText"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"
import { ResourceStyle } from "./ResourceStyle"
interface Props {
  visible: boolean
  onClose(): void
  navigation?: NavigationProp<any, any>
  route?: any
}

function JCResourceConfigModalImpl(props: Props) {
  const Consumer = useContext(ResourceContext)
  const styles = StyleSheet.create(ResourceStyle)

  const renderButtons = (state: ResourceState, actions: ResourceActions): React.ReactNode => {
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

              if (
                props.route.params.create === "true" || props.route.params.create === true
                  ? true
                  : false
              )
                props.navigation?.navigate("ResourceScreen", {
                  create: false,
                  id: state.groupData?.id,
                })
              props.onClose()
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
              props.onClose()
            }}
          >
            Save Resource
          </JCButton>
        ) : null}
        {state.canDelete ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={() => {
              if (window.confirm("Are you sure you wish to delete this group?")) {
                actions.deleteGroup()
                props.onClose()
              }
            }}
          >
            Delete Resource
          </JCButton>
        ) : null}
        <Text>{state.validationError}</Text>
      </View>
    )
  }
  const renderPermissions = (
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode => {
    return (
      resourceState.isEditable && (
        <View style={{ marginBottom: 35 }}>
          <Text style={{ fontWeight: "bold" }}>Permissions</Text>
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
            selectedValue={undefined}
            onValueChange={(value: string) => {
              console.log({ value: value })
              let tmp = resourceState?.groupData?.readGroups
              if (!tmp) tmp = []
              tmp.push(value as UserGroupType)
              resourceActions.updateValueGroup("readGroups", tmp)
            }}
          >
            <Picker.Item key={null} label={"Add Group"} value={undefined} />
            {Object.keys(UserGroupType).map((org: string) => {
              return <Picker.Item key={org} label={org} value={org} />
            })}
          </Picker>
          {resourceState?.groupData?.readGroups?.map(
            (item: UserGroupType | null, index: number) => {
              return (
                <React.Fragment key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontWeight: "normal" }}>{item}</Text>
                    <TouchableOpacity
                      style={{ alignSelf: "center", marginLeft: 15 }}
                      onPress={() => {
                        let tmp = resourceState?.groupData?.readGroups
                        if (!tmp) tmp = []
                        tmp.splice(index, 1)
                        resourceActions.updateValueGroup("readGroups", tmp)
                      }}
                    >
                      <AntDesign name="close" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              )
            }
          )}
        </View>
      )
    )
  }
  const resourceState = Consumer.resourceState
  const resourceActions = Consumer.resourceActions
  if (!resourceState) return null
  if (resourceState.currentResource == null) return null
  return (
    <JCModal
      visible={props.visible}
      title="Configure JC Group"
      onHide={() => {
        props.onClose()
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            height: 30,
            marginBottom: 20,
            justifyContent: "space-between",
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
                resourceState.groupData?.isSponsored
                  ? resourceState.groupData.isSponsored === "true"
                  : false
              }
              onPress={(status) => {
                resourceActions.updateValueGroup("isSponsored", status ? "true" : "false")
              }}
            ></JCSwitch>
          ) : resourceState.groupData?.isSponsored == "true" ? (
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
          textStyle={styles.groupNameInput}
          inputStyle={styles.groupNameInput}
          value={resourceState.groupData?.name ?? ""}
          isEditable={resourceState.isEditable}
        ></EditableText>
        <EditableText
          onChange={(value: any) => {
            resourceActions.updateValueGroup("description", value) //actions.updateOverview("description", value)
          }}
          placeholder="Enter Resource Description"
          multiline={true}
          textStyle={styles.groupDescriptionInput}
          inputStyle={styles.groupDescriptionInput}
          value={resourceState.groupData?.description ?? ""}
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
            if (resourceState.groupData?.owner)
              resourceActions.showProfile(resourceState.groupData?.owner)
            else if (resourceState.currentUserProfile?.id)
              resourceActions.showProfile(resourceState.currentUserProfile?.id)
          }}
        >
          <ProfileImage
            user={
              resourceState.groupData?.owner
                ? resourceState.groupData.owner
                : resourceState.currentUserProfile?.id
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

        <View style={styles.groupAttendeesPictures}>
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
        {renderPermissions(resourceState, resourceActions)}
        {renderButtons(resourceState, resourceActions)}
      </View>
    </JCModal>
  )
}

export default function JCResourceConfigModal(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <JCResourceConfigModalImpl {...props} navigation={navigation} route={route} />
}
