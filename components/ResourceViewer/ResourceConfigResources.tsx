import { useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import { UpdateResourceInput } from "../../src/API"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import ResourceConfigResourceModal from "./ResourceConfigResourceModal"
import { ResourceContext } from "./ResourceContext"

interface Props {
  navigation?: any
  route?: any
}

interface State extends JCState {
  showResourceEditModal: boolean
  currentResource: UpdateResourceInput
}

class ResourceConfigResourceImpl extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer

  constructor(props: Props) {
    super(props)
  }

  render(): React.ReactNode {
    return (
      <ResourceConfigResourceImpl.Consumer>
        {({ resourceState, resourceActions }) => {
          console.log({ resourceState: resourceState })
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          return (
            <View style={{ flexGrow: 1, flexDirection: "column" }}>
              <Text>Resources</Text>
              <View style={{ borderWidth: 1, height: "500px" }}>
                {resourceState.resourceData?.resources?.items?.map((item, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        resourceActions.changeResource(index)
                      }}
                    >
                      <View
                        style={{
                          backgroundColor:
                            resourceState.currentResource == index ? "#aaaaaa" : "#ffffff",
                        }}
                      >
                        <Text>{item?.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  resourceActions.createResource()
                }}
              >
                Add Resource
              </JCButton>
              <JCButton
                enabled={
                  !(
                    resourceState.currentResource == null ||
                    resourceState.currentResource == undefined
                  )
                }
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  if (
                    window.confirm("Are you sure you wish to delete this Resource?") &&
                    resourceState.currentResource != null
                  )
                    resourceActions.deleteResource(resourceState.currentResource)
                }}
              >
                Delete Resource
              </JCButton>
              <JCButton
                enabled={
                  !(
                    resourceState.currentResource == null ||
                    resourceState.currentResource == undefined
                  )
                }
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  if (
                    resourceState.currentResource != null &&
                    resourceState.resourceData?.resources?.items &&
                    resourceState.resourceData?.resources?.items[resourceState.currentResource]
                  )
                    this.setState({
                      showResourceEditModal: true,
                      currentResource:
                        resourceState.resourceData?.resources?.items[resourceState.currentResource],
                    })
                }}
              >
                Edit Resource
              </JCButton>
              <ResourceConfigResourceModal
                onHide={() => {
                  this.setState({ showResourceEditModal: false })
                }}
                currentResource={this.state.currentResource}
                visible={this.state.showResourceEditModal}
              />
            </View>
          )
        }}
      </ResourceConfigResourceImpl.Consumer>
    )
  }
}

export default function ResourceConfigResource(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <ResourceConfigResourceImpl {...props} navigation={navigation} route={route} />
}
