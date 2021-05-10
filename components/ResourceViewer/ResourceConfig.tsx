import { useNavigation, useRoute } from "@react-navigation/native"
import { Card, CardItem } from "native-base"
import React from "react"
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native"
import {
  ImageInput,
  ResourceDetailInput,
  UpdateResourceEpisodeInput,
  UpdateResourceInput,
  UpdateResourceSeriesInput,
} from "../../src/API"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import ResourceConfigEpisodes from "./ResourceConfigEpisodes"
import ResourceConfigResources from "./ResourceConfigResources"
import ResourceConfigSeries from "./ResourceConfigSeries"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"
import ResourceImage from "./ResourceImage"

interface Props {
  navigation?: any
  route?: any
}

interface State extends JCState {
  showResourceEditModal: boolean
  showSeriesEditModal: boolean
  showEpisodeEditModal: boolean
  currentResource: UpdateResourceInput
  currentSeries: UpdateResourceSeriesInput
  currentEpisode: UpdateResourceEpisodeInput
}

class ResourceContentImpl extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer

  constructor(props: Props) {
    super(props)
  }
  saveResource(resourceState: ResourceState, resourceActions: ResourceActions) {
    if (resourceState.currentResource == null) return
    resourceActions.updateResource(
      resourceState.currentResource,

      this.state.currentResource
    )
  }

  renderResourceName(item: ResourceDetailInput | null, index: number): React.ReactNode {
    return (
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={{ textAlign: "left", width: "100%", fontWeight: "800" }}>Name: </Text>
        <TextInput
          onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const tmp = this.state.currentResource
            tmp.details![index]!.name = val.nativeEvent.text
            this.setState({ currentResource: tmp })
          }}
          placeholder="name"
          multiline={false}
          value={item?.name ?? ""}
        ></TextInput>
      </View>
    )
  }
  renderResourceText(item: ResourceDetailInput | null, index: number): React.ReactNode {
    return (
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={{ textAlign: "left", width: "100%", fontWeight: "800" }}>Text: </Text>
        <TextInput
          onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const tmp = this.state.currentResource
            tmp.details![index]!.text = val.nativeEvent.text
            this.setState({ currentResource: tmp })
          }}
          placeholder="text"
          multiline={false}
          value={item?.text ?? ""}
        ></TextInput>
      </View>
    )
  }
  renderResourceValue(item: ResourceDetailInput | null, index: number): React.ReactNode {
    return (
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={{ textAlign: "left", width: "100%", fontWeight: "800" }}>Value: </Text>
        <TextInput
          onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const tmp = this.state.currentResource
            tmp.details![index]!.value = val.nativeEvent.text
            this.setState({ currentResource: tmp })
          }}
          placeholder="value"
          multiline={false}
          value={item?.value ?? ""}
        ></TextInput>
      </View>
    )
  }
  renderResourceImage(resourceState: ResourceState): React.ReactNode {
    return (
      <ResourceImage
        onUpdate={(image: ImageInput) => {
          const tmp = this.state.currentResource
          tmp.image = image
          console.log({ currentResource: tmp })
          this.setState({ currentResource: tmp })
        }}
        fileName={
          "resources/upload/group-" +
          resourceState.resourceData?.id +
          "-resource-" +
          this.state.currentResource.id +
          "-details-"
        }
        currentImage={this.state.currentResource.image}
      ></ResourceImage>
    )
  }

  renderResourceButton(resourceState: ResourceState) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("ResourceScreen", {
            id: resourceState.loadId,
          })
        }}
      >
        <Card>
          <CardItem>
            <Text>Return to JC Resource Pages</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
  render(): React.ReactNode {
    console.log("RENDER CONFIG")
    return (
      <ResourceContentImpl.Consumer>
        {({ resourceState }) => {
          console.log({ resourceState: resourceState })
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          return (
            <>
              <View style={{ flexDirection: "row" }}>
                <ResourceConfigResources />
                <ResourceConfigSeries />
                <ResourceConfigEpisodes />
              </View>
              {this.renderResourceButton(resourceState)}
            </>
          )
        }}
      </ResourceContentImpl.Consumer>
    )
  }
}

export default function ResourceContent(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <ResourceContentImpl {...props} navigation={navigation} route={route} />
}
