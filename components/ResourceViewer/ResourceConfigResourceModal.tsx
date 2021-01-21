import { useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import {
  NativeSyntheticEvent,
  Picker,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import {
  ImageInput,
  ResourceDetailInput,
  ResourceDetailType,
  UpdateResourceInput,
} from "../../src/API"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"
import ResourceImage from "./ResourceImage"
interface Props {
  navigation?: any
  route?: any
  visible: boolean
  onHide(): void
  currentResource: UpdateResourceInput
}

interface State extends JCState {
  currentResource: UpdateResourceInput
}

class ResourceConfigResourceImpl extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer

  constructor(props: Props) {
    super(props)
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.currentResource != this.props.currentResource)
      this.setState({ currentResource: this.props.currentResource })
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
      <View style={{ flexDirection: "row", width: "100%", marginBottom: 10 }}>
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
  renderResourceImage(
    resourceState: ResourceState,
    item: ResourceDetailInput | null,
    index: number
  ): React.ReactNode {
    return (
      <ResourceImage
        onUpdate={(image: ImageInput) => {
          let tmp = this.state.currentResource
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

  renderDetailsResource(
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode {
    return (
      <View style={{ width: "100%" }}>
        {this.state.currentResource.details?.map(
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
                    const tmp = this.state.currentResource
                    tmp.details![index]!.type = value
                    this.setState({ currentResource: tmp })
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
                    {this.renderResourceImage(resourceState, item, index)}
                  </>
                )}
              </>
            )
          }
        )}

        <JCButton
          buttonType={ButtonTypes.ResourceModalSolid}
          onPress={() => {
            const z = this.state.currentResource
            if (z.details == null) z.details = []
            z.details?.push({ type: ResourceDetailType.DefaultYoutube })
            this.setState({ currentResource: z })
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
          if (this.state.currentResource == undefined) return null
          return (
            this.props.visible && (
              <JCModal
                visible={this.props.visible}
                title="Edit Resource"
                onHide={() => {
                  this.props.onHide()
                }}
              >
                <>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text style={{ textAlign: "left", width: "50%", fontWeight: "800" }}>
                      Title:{" "}
                    </Text>
                    <TextInput
                      onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                        const tmp = this.state.currentResource
                        tmp.title = val.nativeEvent.text
                        this.setState({ currentResource: tmp })
                      }}
                      placeholder="title"
                      multiline={false}
                      value={this.state.currentResource.title ?? ""}
                    ></TextInput>
                  </View>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text style={{ textAlign: "left", width: "50%", fontWeight: "800" }}>
                      subtitle:{" "}
                    </Text>
                    <TextInput
                      onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                        const tmp = this.state.currentResource
                        tmp.subtitle = val.nativeEvent.text
                        this.setState({ currentResource: tmp })
                      }}
                      placeholder="subtitle"
                      multiline={false}
                      value={this.state.currentResource.subtitle ?? ""}
                    ></TextInput>
                  </View>
                  <ResourceImage
                    onUpdate={(image: ImageInput) => {
                      let tmp = this.state.currentResource
                      tmp.image = image
                      console.log({ currentResource: tmp })
                      this.setState({ currentResource: tmp })
                    }}
                    fileName={
                      "resources/upload/group-" +
                      resourceState.resourceData?.id +
                      "-resource-" +
                      this.state.currentResource.id +
                      "-"
                    }
                    currentImage={this.state.currentResource.image}
                  ></ResourceImage>

                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text style={{ textAlign: "left", width: "50%", fontWeight: "800" }}>
                      description:
                    </Text>
                    <TextInput
                      style={{ height: 130 }}
                      onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                        const tmp = this.state.currentResource
                        tmp.description = val.nativeEvent.text
                        this.setState({ currentResource: tmp })
                      }}
                      placeholder="description"
                      multiline={true}
                      value={this.state.currentResource.description ?? ""}
                    ></TextInput>
                  </View>
                  {this.renderDetailsResource(resourceState, resourceActions)}
                  <JCButton
                    buttonType={ButtonTypes.ResourceModalSolid}
                    onPress={() => {
                      this.saveResource(resourceState, resourceActions)
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
