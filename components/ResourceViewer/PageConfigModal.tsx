import { AntDesign } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Picker, Text, TouchableOpacity, View } from "react-native"
import JCModal from "../../components/Forms/JCModal"
import { UpdateResourceMenuItemInput, UserGroupType } from "../../src/API"
import JCComponent from "../JCComponent/JCComponent"
import { ResourceContext } from "./ResourceContext"

interface Props {
  visible: boolean
  onClose(): void
  navigation?: NavigationProp<any, any>
  route?: any
}
interface State {
  currentMenuConfig: UpdateResourceMenuItemInput
}
class JCResourceConfigModalImpl extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <JCResourceConfigModalImpl.Consumer>
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
                    const tmp: UpdateResourceMenuItemInput = resourceActions.getMenuItem(
                      resourceState.currentMenuItem
                    )

                    if (!tmp.readGroups) tmp.readGroups = []
                    tmp.readGroups.push(value as UserGroupType)
                    resourceActions.updateMenuItem(
                      resourceState.currentMenuItem,
                      "readGroups",
                      tmp.readGroups
                    )
                  }}
                >
                  <Picker.Item key={null} label={"Add Group"} value={undefined} />
                  {Object.keys(UserGroupType).map((org: string) => {
                    return <Picker.Item key={org} label={org} value={org} />
                  })}
                </Picker>
                {resourceActions
                  .getMenuItem(resourceState.currentMenuItem)
                  .readGroups?.map((item: UserGroupType, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <Text style={{ fontWeight: "bold" }}>{item}</Text>
                          <TouchableOpacity
                            style={{ alignSelf: "center", marginLeft: 15 }}
                            onPress={() => {
                              const tmp = resourceActions.getMenuItem(resourceState.currentMenuItem)
                              if (!tmp.readGroups) tmp.readGroups = []
                              tmp.readGroups.splice(index, 1)
                              resourceActions.updateMenuItem(
                                resourceState.currentMenuItem,
                                "readGroups",
                                tmp.readGroups
                              )
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
        }}
      </JCResourceConfigModalImpl.Consumer>
    )
  }
}

export default function JCResourceConfigModal(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <JCResourceConfigModalImpl {...props} navigation={navigation} route={route} />
}
