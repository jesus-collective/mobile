import { AntDesign } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { useContext } from "react"
import { Picker, Text, TouchableOpacity, View } from "react-native"
import JCModal from "../../components/Forms/JCModal"
import { UpdateResourceMenuItemInput, UserGroupType } from "../../src/API"
import { ResourceContext } from "./ResourceContext"

interface Props {
  visible: boolean
  onClose(): void
  navigation?: NavigationProp<any, any>
  route?: any
}
function JCResourceConfigModalImpl(props: Props) {
  const resourceContext = useContext(ResourceContext)

  if (!resourceContext.resourceState) return null
  if (resourceContext.resourceState.currentResource == null) return null
  return (
    <JCModal
      visible={props.visible}
      title="Configure Page Item"
      onHide={() => {
        props.onClose()
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold" }}>Config</Text>
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
            if (resourceContext.resourceState) {
              const tmp: UpdateResourceMenuItemInput = resourceContext.resourceActions.getMenuItem(
                resourceContext.resourceState.currentMenuItem
              )

              if (!tmp.readGroups) tmp.readGroups = []
              tmp.readGroups.push(value as UserGroupType)
              resourceContext.resourceActions.updateMenuItem(
                resourceContext.resourceState.currentMenuItem,
                "readGroups",
                tmp.readGroups
              )
            }
          }}
        >
          <Picker.Item key={null} label={"Add Group"} value={undefined} />
          {Object.keys(UserGroupType).map((org: string) => {
            return <Picker.Item key={org} label={org} value={org} />
          })}
        </Picker>
        {resourceContext.resourceActions
          .getMenuItem(resourceContext.resourceState.currentMenuItem)
          ?.readGroups?.map((item: UserGroupType, index: number) => {
            return (
              <React.Fragment key={index}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontWeight: "bold" }}>{item}</Text>
                  <TouchableOpacity
                    style={{ alignSelf: "center", marginLeft: 15 }}
                    onPress={() => {
                      if (resourceContext.resourceState) {
                        const tmp = resourceContext.resourceActions.getMenuItem(
                          resourceContext.resourceState.currentMenuItem
                        )
                        if (!tmp.readGroups) tmp.readGroups = []
                        tmp.readGroups.splice(index, 1)
                        resourceContext.resourceActions.updateMenuItem(
                          resourceContext.resourceState.currentMenuItem,
                          "readGroups",
                          tmp.readGroups
                        )
                      }
                    }}
                  >
                    <AntDesign name="close" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )
          })}
      </View>
    </JCModal>
  )
}

export default function JCResourceConfigModal(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <JCResourceConfigModalImpl {...props} navigation={navigation} route={route} />
}
