import { useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { GetResourceSeriesData } from "src/types"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import { UpdateResourceEpisodeInput } from "../../src/API"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import ResourceConfigEpisodeModal from "./ResourceConfigEpisodeModal"
import { ResourceContext } from "./ResourceContext"

interface Props {
  navigation?: any
  route?: any
}

interface State extends JCState {
  showEpisodeEditModal: boolean
  currentEpisode: UpdateResourceEpisodeInput
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
          //  const resource: GetResourceData | null = resourceActions.getResource(
          //    resourceState.currentResource
          //  )
          const series: GetResourceSeriesData = resourceActions.getSeries(
            resourceState.currentResource,
            resourceState.currentSeries
          )

          return (
            <View style={{ flexGrow: 1, flexDirection: "column" }}>
              <Text>Episodes</Text>
              <View style={{ borderWidth: 1, height: "500px" }}>
                {series?.episodes?.items?.map((item, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        resourceActions.changeEpisode(index)
                      }}
                    >
                      <View
                        style={{
                          backgroundColor:
                            resourceState.currentEpisode == index ? "#aaaaaa" : "#ffffff",
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
                    resourceState.currentResource == undefined ||
                    resourceState.currentSeries == null ||
                    resourceState.currentSeries == undefined
                  )
                }
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  resourceActions.createEpisode()
                }}
              >
                Add Episode
              </JCButton>
              <JCButton
                enabled={
                  !(
                    resourceState.currentResource == null ||
                    resourceState.currentResource == undefined ||
                    resourceState.currentSeries == null ||
                    resourceState.currentSeries == undefined ||
                    resourceState.currentResource == null ||
                    resourceState.currentResource == undefined
                  )
                }
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  if (window.confirm("Are you sure you wish to delete this Episode?"))
                    if (
                      resourceState.currentResource != null &&
                      resourceState.currentSeries != null
                    )
                      resourceActions.deleteEpisode(
                        resourceState.currentResource,
                        resourceState.currentSeries,
                        resourceState.currentResource
                      )
                }}
              >
                Delete Episode
              </JCButton>
              <JCButton
                enabled={
                  !(
                    resourceState.currentResource == null ||
                    resourceState.currentResource == undefined ||
                    resourceState.currentSeries == null ||
                    resourceState.currentSeries == undefined ||
                    resourceState.currentResource == null ||
                    resourceState.currentResource == undefined
                  )
                }
                buttonType={ButtonTypes.Solid}
                onPress={() => {
                  if (
                    resourceState.currentEpisode != null &&
                    series?.episodes?.items &&
                    series.episodes.items[resourceState.currentEpisode]
                  )
                    this.setState({
                      showEpisodeEditModal: true,
                      currentEpisode: series.episodes.items[resourceState.currentEpisode],
                    })
                }}
              >
                Edit Episode
              </JCButton>
              <ResourceConfigEpisodeModal
                onHide={() => {
                  this.setState({ showEpisodeEditModal: false })
                }}
                currentEpisode={this.state.currentEpisode}
                visible={this.state.showEpisodeEditModal}
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
