import { useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { GetResourceData } from "src/types"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import { UpdateResourceSeriesInput } from "../../src/API"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import ResourceConfigSeriesModal from "./ResourceConfigSeriesModal"
import { ResourceContext } from "./ResourceContext"

interface Props {
  navigation?: any
  route?: any
}

interface State extends JCState {
  showSeriesEditModal: boolean
  currentSeries: UpdateResourceSeriesInput
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
          const resource: GetResourceData | null = resourceActions.getResource(
            resourceState.currentResource
          )
          return (
            <View style={{ flexGrow: 1, flexDirection: "column" }}>
              <Text>Series</Text>
              <View style={{ borderWidth: 1, height: "500px" }}>
                {resource?.series?.items?.map((item, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        resourceActions.changeSeries(index)
                      }}
                    >
                      <View
                        style={{
                          backgroundColor:
                            resourceState.currentSeries == index ? "#aaaaaa" : "#ffffff",
                        }}
                      >
                        <Text>{item?.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <JCButton
                enabled={
                  !(
                    resourceState.currentResource == null ||
                    resourceState.currentResource == undefined
                  )
                }
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  resourceActions.createSeries()
                }}
              >
                Add Series
              </JCButton>
              <JCButton
                enabled={
                  !(
                    resourceState.currentResource == null ||
                    resourceState.currentResource == undefined ||
                    resourceState.currentSeries == null ||
                    resourceState.currentSeries == undefined
                  )
                }
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  if (window.confirm("Are you sure you wish to delete this Series?"))
                    if (
                      resourceState.currentResource != null &&
                      resourceState.currentSeries != null
                    )
                      resourceActions.deleteSeries(
                        resourceState.currentResource,
                        resourceState.currentSeries
                      )
                }}
              >
                Delete Series
              </JCButton>
              <JCButton
                enabled={
                  !(
                    resourceState.currentResource == null ||
                    resourceState.currentResource == undefined ||
                    resourceState.currentSeries == null ||
                    resourceState.currentSeries == undefined
                  )
                }
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  if (resourceState.currentSeries != null && resource?.series?.items)
                    this.setState({
                      showSeriesEditModal: true,
                      currentSeries: resource?.series?.items[resourceState.currentSeries],
                    })
                }}
              >
                Edit Series
              </JCButton>
              <ResourceConfigSeriesModal
                onHide={() => {
                  this.setState({ showSeriesEditModal: false })
                }}
                currentSeries={this.state.currentSeries}
                visible={this.state.showSeriesEditModal}
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
