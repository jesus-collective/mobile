import { Picker } from "@react-native-picker/picker"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import {
  ImageInput,
  ResourceDetailInput,
  ResourceDetailType,
  UpdateResourceEpisodeInput,
} from "../../src/API"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"
import ResourceImage from "./ResourceImage"
interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
  visible: boolean
  onHide(): void
  currentEpisode: UpdateResourceEpisodeInput
}

interface State extends JCState {
  currentEpisode: UpdateResourceEpisodeInput
}

class ResourceConfigResourceImpl extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer

  constructor(props: Props) {
    super(props)
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.currentEpisode != this.props.currentEpisode)
      this.setState({ currentEpisode: this.props.currentEpisode })
  }
  saveEpisode(resourceState: ResourceState, resourceActions: ResourceActions) {
    if (resourceState.currentResource == null) return
    if (resourceState.currentSeries == null) return
    if (resourceState.currentEpisode == null) return
    resourceActions.updateEpisode(
      resourceState.currentResource,
      resourceState.currentSeries,
      resourceState.currentEpisode,

      this.state.currentEpisode
    )
  }
  renderResourceName(item: ResourceDetailInput | null, index: number): React.ReactNode {
    return (
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={{ textAlign: "left", width: "50%", fontWeight: "800" }}>Name: </Text>
        <TextInput
          onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const tmp = this.state.currentEpisode
            tmp.details![index]!.name = val.nativeEvent.text
            this.setState({ currentEpisode: tmp })
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
        <Text style={{ textAlign: "left", width: "50%", fontWeight: "800" }}>Text: </Text>
        <TextInput
          onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const tmp = this.state.currentEpisode
            tmp.details![index]!.text = val.nativeEvent.text
            this.setState({ currentEpisode: tmp })
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
        <Text style={{ textAlign: "left", width: "50%", fontWeight: "800" }}>Value: </Text>
        <TextInput
          onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const tmp = this.state.currentEpisode
            tmp.details![index]!.value = val.nativeEvent.text
            this.setState({ currentEpisode: tmp })
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
          const tmp = this.state.currentEpisode
          tmp.imageFile = image
          console.log({ currentEpisode: tmp })
          this.setState({ currentEpisode: tmp })
        }}
        fileName={
          "resources/upload/group-" +
          resourceState.resourceData?.id +
          "-resource-" +
          this.state.currentEpisode.id +
          "-details-"
        }
        currentImage={this.state.currentEpisode.imageFile}
      ></ResourceImage>
    )
  }

  renderDetailsEpisode(resourceState: ResourceState): React.ReactNode {
    return (
      <View style={{ width: "100%" }}>
        {this.state.currentEpisode.details?.map(
          (item: ResourceDetailInput | null, index: number) => {
            return (
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
                  selectedValue={item?.type ?? undefined}
                  onValueChange={(value: any) => {
                    const tmp = this.state.currentEpisode
                    tmp.details![index]!.type = value
                    this.setState({ currentEpisode: tmp })
                  }}
                >
                  {Object.keys(ResourceDetailType).map((org) => {
                    return <Picker.Item key={org} label={org} value={org} />
                  })}
                </Picker>
                {item?.type == ResourceDetailType.DefaultYoutube ? (
                  this.renderResourceValue(item, index)
                ) : item?.type == ResourceDetailType.Button ? (
                  <>
                    {this.renderResourceName(item, index)}
                    {this.renderResourceText(item, index)}
                    {this.renderResourceValue(item, index)}
                  </>
                ) : (
                  <>
                    {this.renderResourceName(item, index)}
                    {this.renderResourceText(item, index)}
                    {this.renderResourceValue(item, index)}
                    {this.renderResourceImage(resourceState)}
                  </>
                )}
              </>
            )
          }
        )}
        <JCButton
          buttonType={ButtonTypes.ResourceModalSolid}
          onPress={() => {
            const z = this.state.currentEpisode
            if (z.details == null) z.details = []
            z.details?.push({ type: ResourceDetailType.DefaultYoutube })
            this.setState({ currentEpisode: z })
          }}
        >
          +
        </JCButton>
      </View>
    )
  }

  render(): React.ReactNode {
    return (
      <ResourceConfigResourceImpl.Consumer>
        {({ resourceState, resourceActions }) => {
          console.log({ resourceState: resourceState })
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          if (this.state.currentEpisode == undefined) return null
          return (
            this.props.visible && (
              <JCModal
                visible={this.props.visible}
                title="Edit Episode"
                onHide={() => {
                  this.props.onHide()
                }}
              >
                <>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text style={{ textAlign: "left", width: "100%", fontWeight: "800" }}>
                      Title:{" "}
                    </Text>
                    <TextInput
                      onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                        const tmp = this.state.currentEpisode
                        tmp.title = val.nativeEvent.text
                        this.setState({ currentEpisode: tmp })
                      }}
                      placeholder="title"
                      multiline={false}
                      value={this.state.currentEpisode.title ?? ""}
                    ></TextInput>
                  </View>

                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text style={{ textAlign: "left", width: "100%", fontWeight: "800" }}>
                      Episode Number:{" "}
                    </Text>
                    <TextInput
                      onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                        const tmp = this.state.currentEpisode
                        tmp.episodeNumber = parseInt(val.nativeEvent.text)
                        this.setState({ currentEpisode: tmp })
                      }}
                      placeholder="episodeNumber"
                      multiline={false}
                      value={this.state.currentEpisode.episodeNumber?.toString() ?? "0"}
                    ></TextInput>
                  </View>

                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text style={{ textAlign: "left", width: "50%", fontWeight: "800" }}>
                      Description:{" "}
                    </Text>
                    <TextInput
                      style={{ height: 130, flexWrap: "wrap" }}
                      onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                        const tmp = this.state.currentEpisode
                        tmp.description = val.nativeEvent.text
                        this.setState({ currentEpisode: tmp })
                      }}
                      placeholder="description"
                      multiline={true}
                      value={this.state.currentEpisode.description ?? ""}
                    ></TextInput>
                  </View>
                  <ResourceImage
                    onUpdate={(image: ImageInput) => {
                      const tmp = this.state.currentEpisode
                      tmp.imageFile = image
                      console.log({ currentEpisode: tmp })
                      this.setState({ currentEpisode: tmp })
                    }}
                    fileName={
                      "resources/upload/group-" +
                      resourceState.resourceData?.id +
                      "-episode-" +
                      this.state.currentEpisode.id +
                      "-"
                    }
                    currentImage={this.state.currentEpisode.imageFile}
                  ></ResourceImage>

                  {this.renderDetailsEpisode(resourceState)}
                  <JCButton
                    buttonType={ButtonTypes.ResourceModalSolid}
                    onPress={() => {
                      this.saveEpisode(resourceState, resourceActions)
                      this.props.onHide()
                    }}
                  >
                    Save
                  </JCButton>
                </>
              </JCModal>
            )
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
