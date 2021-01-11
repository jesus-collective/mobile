import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Auth, Storage } from "aws-amplify"
import { Card, CardItem, Picker } from "native-base"
import React from "react"
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native"
import { GetResourceData, GetResourceSeriesData } from "src/types"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import {
  ResourceDetailInput,
  ResourceDetailType,
  UpdateResourceEpisodeInput,
  UpdateResourceInput,
  UpdateResourceSeriesInput,
} from "../../src/API"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { ResourceActions, ResourceContext, ResourceState } from "./ResourceContext"

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
  saveSeries(resourceState: ResourceState, resourceActions: ResourceActions) {
    if (resourceState.currentResource == null) return
    if (resourceState.currentSeries == null) return
    resourceActions.updateSeries(
      resourceState.currentResource,
      resourceState.currentSeries,

      this.state.currentSeries
    )
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
  renderDetailsResource(
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode {
    return (
      <View>
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
                <View style={{ flexDirection: "row" }}>
                  <Text>Name: </Text>
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
                <View style={{ flexDirection: "row" }}>
                  <Text>Text: </Text>
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
                <View style={{ flexDirection: "row" }}>
                  <Text>Value: </Text>
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
                <View>
                  <JCButton
                    buttonType={ButtonTypes.Transparent}
                    onPress={() => {
                      null
                    }}
                  >
                    <Ionicons
                      size={32}
                      name="ios-image"
                      style={this.styles.style.resourceImageIcon}
                    />
                  </JCButton>
                  <input
                    style={{
                      fontSize: 200,
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      opacity: "0",
                    }}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (resourceState.resourceData == null) return null
                      if (resourceState.currentResource == null) return null
                      console.log("Uploading")
                      if (e.target.files) {
                        const file = e.target.files[0]
                        const lastDot = file.name.lastIndexOf(".")
                        const ext = file.name.substring(lastDot + 1)
                        const user = await Auth.currentCredentials()
                        const userId = user.identityId

                        const fn =
                          "resources/upload/group-" +
                          resourceState.resourceData.id +
                          "-resource-" +
                          this.state.currentResource.id +
                          "-details-" +
                          new Date().getTime() +
                          "-upload." +
                          ext
                        console.log({ filename: fn })

                        const fnSave = fn
                          .replace("/upload", "")
                          .replace("-upload.", "-[size].")
                          .replace("." + ext, ".png")

                        console.log("putting")
                        await Storage.put(fn, file, {
                          level: "protected",
                          contentType: file.type,
                          identityId: userId,
                        })
                          .then(() => {
                            console.log("getting")
                            return Storage.get(fn, {
                              level: "protected",
                              identityId: userId,
                            }).then((result2) => {
                              console.log({ fileInfo: result2 })
                              let tmp = this.state.currentResource
                              tmp.details![index]!.image = {
                                userId: userId,
                                filenameUpload: fn,
                                filenameLarge: fnSave.replace("[size]", "large"),
                                filenameMedium: fnSave.replace("[size]", "medium"),
                                filenameSmall: fnSave.replace("[size]", "small"),
                              }
                              console.log({ settings: tmp })
                              this.setState({ currentResource: tmp })
                              //this.updatePageItem(menuItemIndex, pageItemIndex, tempPageItems)
                            })

                            // console.log(result)
                          })
                          .catch((err: any) => console.log(err))
                      }
                    }}
                  />
                </View>
              </>
            )
          }
        )}
        <Text>Test</Text>
        <JCButton
          buttonType={ButtonTypes.AdminAdd}
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
  renderDetailsEpisode(
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode {
    return (
      <>
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
                    tmp.details[index].type = value
                    this.setState({ currentEpisode: tmp })
                  }}
                >
                  {Object.keys(ResourceDetailType).map((org) => {
                    return <Picker.Item key={org} label={org} value={org} />
                  })}
                </Picker>
                <View style={{ flexDirection: "row" }}>
                  <Text>Name: </Text>
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
                <View style={{ flexDirection: "row" }}>
                  <Text>Text: </Text>
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
                <View style={{ flexDirection: "row" }}>
                  <Text>Value: </Text>
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
                <View>
                  <JCButton
                    buttonType={ButtonTypes.Transparent}
                    onPress={() => {
                      null
                    }}
                  >
                    <Ionicons
                      size={32}
                      name="ios-image"
                      style={this.styles.style.resourceImageIcon}
                    />
                  </JCButton>
                  <input
                    style={{
                      fontSize: 200,
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      opacity: "0",
                    }}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (resourceState.resourceData == null) return null
                      if (resourceState.currentEpisode == null) return null
                      console.log("Uploading")
                      if (e.target.files) {
                        const file = e.target.files[0]
                        const lastDot = file.name.lastIndexOf(".")
                        const ext = file.name.substring(lastDot + 1)
                        const user = await Auth.currentCredentials()
                        const userId = user.identityId

                        const fn =
                          "resources/upload/group-" +
                          resourceState.resourceData.id +
                          "-resource-" +
                          this.state.currentEpisode.id +
                          "-details-" +
                          new Date().getTime() +
                          "-upload." +
                          ext
                        console.log({ filename: fn })

                        const fnSave = fn
                          .replace("/upload", "")
                          .replace("-upload.", "-[size].")
                          .replace("." + ext, ".png")

                        console.log("putting")
                        await Storage.put(fn, file, {
                          level: "protected",
                          contentType: file.type,
                          identityId: userId,
                        })
                          .then(() => {
                            console.log("getting")
                            return Storage.get(fn, {
                              level: "protected",
                              identityId: userId,
                            }).then((result2) => {
                              console.log({ fileInfo: result2 })
                              let tmp = this.state.currentEpisode
                              tmp.details![index]!.image = {
                                userId: userId,
                                filenameUpload: fn,
                                filenameLarge: fnSave.replace("[size]", "large"),
                                filenameMedium: fnSave.replace("[size]", "medium"),
                                filenameSmall: fnSave.replace("[size]", "small"),
                              }
                              console.log({ settings: tmp })
                              this.setState({ currentEpisode: tmp })
                              //this.updatePageItem(menuItemIndex, pageItemIndex, tempPageItems)
                            })

                            // console.log(result)
                          })
                          .catch((err: any) => console.log(err))
                      }
                    }}
                  />
                </View>
              </>
            )
          }
        )}
        <JCButton
          buttonType={ButtonTypes.AdminAdd}
          onPress={() => {
            const z = this.state.currentEpisode
            if (z.details == null) z.details = []
            z.details?.push({ type: ResourceDetailType.DefaultYoutube })
            this.setState({ currentEpisode: z })
          }}
        >
          +
        </JCButton>
      </>
    )
  }
  renderDetailsSeries(
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode {
    return (
      <>
        {this.state.currentSeries.details?.map(
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
                    const tmp = this.state.currentSeries
                    tmp.details[index].type = value
                    this.setState({ currentSeries: tmp })
                  }}
                >
                  {Object.keys(ResourceDetailType).map((org) => {
                    return <Picker.Item key={org} label={org} value={org} />
                  })}
                </Picker>
                <View style={{ flexDirection: "row" }}>
                  <Text>Name: </Text>
                  <TextInput
                    onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      const tmp = this.state.currentSeries
                      tmp.details![index]!.name = val.nativeEvent.text
                      this.setState({ currentSeries: tmp })
                    }}
                    placeholder="name"
                    multiline={false}
                    value={item?.name ?? ""}
                  ></TextInput>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Text: </Text>
                  <TextInput
                    onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      const tmp = this.state.currentSeries
                      tmp.details![index]!.text = val.nativeEvent.text
                      this.setState({ currentSeries: tmp })
                    }}
                    placeholder="text"
                    multiline={false}
                    value={item?.text ?? ""}
                  ></TextInput>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Value: </Text>
                  <TextInput
                    onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      const tmp = this.state.currentSeries
                      tmp.details![index]!.value = val.nativeEvent.text
                      this.setState({ currentSeries: tmp })
                    }}
                    placeholder="value"
                    multiline={false}
                    value={item?.value ?? ""}
                  ></TextInput>
                </View>
                <View>
                  <JCButton
                    buttonType={ButtonTypes.Transparent}
                    onPress={() => {
                      null
                    }}
                  >
                    <Ionicons
                      size={32}
                      name="ios-image"
                      style={this.styles.style.resourceImageIcon}
                    />
                  </JCButton>
                  <input
                    style={{
                      fontSize: 200,
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      opacity: "0",
                    }}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (resourceState.resourceData == null) return null
                      if (resourceState.currentSeries == null) return null
                      console.log("Uploading")
                      if (e.target.files) {
                        const file = e.target.files[0]
                        const lastDot = file.name.lastIndexOf(".")
                        const ext = file.name.substring(lastDot + 1)
                        const user = await Auth.currentCredentials()
                        const userId = user.identityId

                        const fn =
                          "resources/upload/group-" +
                          resourceState.resourceData.id +
                          "-resource-" +
                          this.state.currentSeries.id +
                          "-details-" +
                          new Date().getTime() +
                          "-upload." +
                          ext
                        console.log({ filename: fn })

                        const fnSave = fn
                          .replace("/upload", "")
                          .replace("-upload.", "-[size].")
                          .replace("." + ext, ".png")

                        console.log("putting")
                        await Storage.put(fn, file, {
                          level: "protected",
                          contentType: file.type,
                          identityId: userId,
                        })
                          .then(() => {
                            console.log("getting")
                            return Storage.get(fn, {
                              level: "protected",
                              identityId: userId,
                            }).then((result2) => {
                              console.log({ fileInfo: result2 })
                              let tmp = this.state.currentSeries
                              tmp.details![index]!.image = {
                                userId: userId,
                                filenameUpload: fn,
                                filenameLarge: fnSave.replace("[size]", "large"),
                                filenameMedium: fnSave.replace("[size]", "medium"),
                                filenameSmall: fnSave.replace("[size]", "small"),
                              }
                              console.log({ settings: tmp })
                              this.setState({ currentSeries: tmp })
                              //this.updatePageItem(menuItemIndex, pageItemIndex, tempPageItems)
                            })

                            // console.log(result)
                          })
                          .catch((err: any) => console.log(err))
                      }
                    }}
                  />
                </View>
              </>
            )
          }
        )}
        <JCButton
          buttonType={ButtonTypes.AdminAdd}
          onPress={() => {
            const z = this.state.currentSeries
            if (z.details == null) z.details = []
            z?.details?.push({ type: ResourceDetailType.DefaultYoutube })
            this.setState({ currentSeries: z })
          }}
        >
          +
        </JCButton>
      </>
    )
  }
  renderResourceEditModal(
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode {
    return (
      this.state.showResourceEditModal && (
        <JCModal
          visible={this.state.showResourceEditModal}
          title="Edit Resource"
          onHide={() => {
            this.setState({ showResourceEditModal: false })
          }}
        >
          <>
            <View style={{ flexDirection: "row" }}>
              <Text>Title: </Text>
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
            <View style={{ flexDirection: "row" }}>
              <Text>subtitle: </Text>
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

            <View>
              <JCButton
                buttonType={ButtonTypes.Transparent}
                onPress={() => {
                  null
                }}
              >
                <Ionicons size={32} name="ios-image" style={this.styles.style.resourceImageIcon} />
              </JCButton>
              <input
                style={{
                  fontSize: 200,
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  opacity: "0",
                }}
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (resourceState.resourceData == null) return null
                  if (resourceState.currentResource == null) return null
                  console.log("Uploading")
                  if (e.target.files) {
                    const file = e.target.files[0]
                    const lastDot = file.name.lastIndexOf(".")
                    const ext = file.name.substring(lastDot + 1)
                    const user = await Auth.currentCredentials()
                    const userId = user.identityId

                    const fn =
                      "resources/upload/group-" +
                      resourceState.resourceData.id +
                      "-resource-" +
                      this.state.currentResource.id +
                      "-" +
                      new Date().getTime() +
                      "-upload." +
                      ext
                    console.log({ filename: fn })

                    const fnSave = fn
                      .replace("/upload", "")
                      .replace("-upload.", "-[size].")
                      .replace("." + ext, ".png")

                    console.log("putting")
                    await Storage.put(fn, file, {
                      level: "protected",
                      contentType: file.type,
                      identityId: userId,
                    })
                      .then(() => {
                        console.log("getting")
                        return Storage.get(fn, {
                          level: "protected",
                          identityId: userId,
                        }).then((result2) => {
                          console.log({ fileInfo: result2 })
                          let tmp = this.state.currentResource
                          tmp.image = {
                            userId: userId,
                            filenameUpload: fn,
                            filenameLarge: fnSave.replace("[size]", "large"),
                            filenameMedium: fnSave.replace("[size]", "medium"),
                            filenameSmall: fnSave.replace("[size]", "small"),
                          }
                          console.log({ settings: tmp })
                          this.setState({ currentResource: tmp })
                          //this.updatePageItem(menuItemIndex, pageItemIndex, tempPageItems)
                        })

                        // console.log(result)
                      })
                      .catch((err: any) => console.log(err))
                  }
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>description: </Text>
              <TextInput
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
              buttonType={ButtonTypes.Solid}
              onPress={() => {
                this.saveResource(resourceState, resourceActions)
                this.setState({ showResourceEditModal: false })
              }}
            >
              Save
            </JCButton>
          </>
        </JCModal>
      )
    )
  }
  renderSeriesEditModal(
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode {
    return (
      this.state.showSeriesEditModal && (
        <JCModal
          visible={this.state.showSeriesEditModal}
          title="Edit Series"
          onHide={() => {
            this.setState({ showSeriesEditModal: false })
          }}
        >
          <>
            <View style={{ flexDirection: "row" }}>
              <Text>Title: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  const tmp = this.state.currentSeries
                  tmp.title = val.nativeEvent.text
                  this.setState({ currentSeries: tmp })
                }}
                placeholder="title"
                multiline={false}
                value={this.state.currentSeries.title ?? ""}
              ></TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>description: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  const tmp = this.state.currentSeries
                  tmp.description = val.nativeEvent.text
                  this.setState({ currentSeries: tmp })
                }}
                placeholder="description"
                multiline={false}
                value={this.state.currentSeries.description ?? ""}
              ></TextInput>
            </View>

            <View>
              <JCButton
                buttonType={ButtonTypes.Transparent}
                onPress={() => {
                  null
                }}
              >
                <Ionicons size={32} name="ios-image" style={this.styles.style.resourceImageIcon} />
              </JCButton>
              <input
                style={{
                  fontSize: 200,
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  opacity: "0",
                }}
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (resourceState.resourceData == null) return null
                  if (resourceState.currentResource == null) return null
                  console.log("Uploading")
                  if (e.target.files) {
                    const file = e.target.files[0]
                    const lastDot = file.name.lastIndexOf(".")
                    const ext = file.name.substring(lastDot + 1)
                    const user = await Auth.currentCredentials()
                    const userId = user.identityId

                    const fn =
                      "resources/upload/group-" +
                      resourceState.resourceData.id +
                      "-series-" +
                      this.state.currentSeries?.id +
                      "-" +
                      new Date().getTime() +
                      "-upload." +
                      ext
                    console.log({ filename: fn })

                    const fnSave = fn
                      .replace("/upload", "")
                      .replace("-upload.", "-[size].")
                      .replace("." + ext, ".png")

                    console.log("putting")
                    await Storage.put(fn, file, {
                      level: "protected",
                      contentType: file.type,
                      identityId: userId,
                    })
                      .then(() => {
                        console.log("getting")
                        return Storage.get(fn, {
                          level: "protected",
                          identityId: userId,
                        }).then((result2) => {
                          console.log({ fileInfo: result2 })
                          let tmp = this.state.currentSeries
                          tmp.imageFile = {
                            userId: userId,
                            filenameUpload: fn,
                            filenameLarge: fnSave.replace("[size]", "large"),
                            filenameMedium: fnSave.replace("[size]", "medium"),
                            filenameSmall: fnSave.replace("[size]", "small"),
                          }
                          console.log({ settings: tmp })
                          this.setState({ currentSeries: tmp })
                          //this.updatePageItem(menuItemIndex, pageItemIndex, tempPageItems)
                        })

                        // console.log(result)
                      })
                      .catch((err: any) => console.log(err))
                  }
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>status: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  const tmp = this.state.currentSeries
                  tmp.status = val.nativeEvent.text
                  this.setState({ currentSeries: tmp })
                }}
                placeholder="status"
                multiline={false}
                value={this.state.currentSeries.status ?? ""}
              ></TextInput>
            </View>
            {this.renderDetailsSeries(resourceState, resourceActions)}
            <JCButton
              buttonType={ButtonTypes.Solid}
              onPress={() => {
                this.saveSeries(resourceState, resourceActions)
                this.setState({ showSeriesEditModal: false })
              }}
            >
              Save
            </JCButton>
          </>
        </JCModal>
      )
    )
  }
  renderEpisodeEditModal(
    resourceState: ResourceState,
    resourceActions: ResourceActions
  ): React.ReactNode {
    return (
      this.state.showEpisodeEditModal && (
        <JCModal
          visible={this.state.showEpisodeEditModal}
          title="Edit Episode"
          onHide={() => {
            this.setState({ showEpisodeEditModal: false })
          }}
        >
          <>
            <View style={{ flexDirection: "row" }}>
              <Text>Title: </Text>
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

            <View style={{ flexDirection: "row" }}>
              <Text>episodeNumber: </Text>
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

            <View style={{ flexDirection: "row" }}>
              <Text>description: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  const tmp = this.state.currentEpisode
                  tmp.description = val.nativeEvent.text
                  this.setState({ currentEpisode: tmp })
                }}
                placeholder="description"
                multiline={false}
                value={this.state.currentEpisode.description ?? ""}
              ></TextInput>
            </View>
            <View>
              <JCButton
                buttonType={ButtonTypes.Transparent}
                onPress={() => {
                  null
                }}
              >
                <Ionicons size={32} name="ios-image" style={this.styles.style.resourceImageIcon} />
              </JCButton>
              <input
                style={{
                  fontSize: 200,
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  opacity: "0",
                }}
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (resourceState.resourceData == null) return null
                  if (resourceState.currentResource == null) return null
                  console.log("Uploading")
                  if (e.target.files) {
                    const file = e.target.files[0]
                    const lastDot = file.name.lastIndexOf(".")
                    const ext = file.name.substring(lastDot + 1)
                    const user = await Auth.currentCredentials()
                    const userId = user.identityId

                    const fn =
                      "resources/upload/group-" +
                      resourceState.resourceData.id +
                      "-episode-" +
                      this.state.currentEpisode.id +
                      "-" +
                      new Date().getTime() +
                      "-upload." +
                      ext
                    console.log({ filename: fn })

                    const fnSave = fn
                      .replace("/upload", "")
                      .replace("-upload.", "-[size].")
                      .replace("." + ext, ".png")

                    console.log("putting")
                    await Storage.put(fn, file, {
                      level: "protected",
                      contentType: file.type,
                      identityId: userId,
                    })
                      .then(() => {
                        console.log("getting")
                        return Storage.get(fn, {
                          level: "protected",
                          identityId: userId,
                        }).then((result2) => {
                          console.log({ fileInfo: result2 })
                          let tmp = this.state.currentEpisode
                          tmp.imageFile = {
                            userId: userId,
                            filenameUpload: fn,
                            filenameLarge: fnSave.replace("[size]", "large"),
                            filenameMedium: fnSave.replace("[size]", "medium"),
                            filenameSmall: fnSave.replace("[size]", "small"),
                          }
                          console.log({ settings: tmp })
                          this.setState({ currentEpisode: tmp })
                          //this.updatePageItem(menuItemIndex, pageItemIndex, tempPageItems)
                        })

                        // console.log(result)
                      })
                      .catch((err: any) => console.log(err))
                  }
                }}
              />
            </View>
            {this.renderDetailsEpisode(resourceState, resourceActions)}
            <JCButton
              buttonType={ButtonTypes.Solid}
              onPress={() => {
                this.saveEpisode(resourceState, resourceActions)
                this.setState({ showEpisodeEditModal: false })
              }}
            >
              Save
            </JCButton>
          </>
        </JCModal>
      )
    )
  }
  renderResources(resourceState: ResourceState, resourceActions: ResourceActions): React.ReactNode {
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
                    backgroundColor: resourceState.currentResource == index ? "#aaaaaa" : "#ffffff",
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
            !(resourceState.currentResource == null || resourceState.currentResource == undefined)
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
            !(resourceState.currentResource == null || resourceState.currentResource == undefined)
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
      </View>
    )
  }

  renderSeries(resourceState: ResourceState, resourceActions: ResourceActions): React.ReactNode {
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
                    backgroundColor: resourceState.currentSeries == index ? "#aaaaaa" : "#ffffff",
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
            !(resourceState.currentResource == null || resourceState.currentResource == undefined)
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
              if (resourceState.currentResource != null && resourceState.currentSeries != null)
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
      </View>
    )
  }
  renderEpisodes(resourceState: ResourceState, resourceActions: ResourceActions): React.ReactNode {
    const resource: GetResourceData | null = resourceActions.getResource(
      resourceState.currentResource
    )
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
                    backgroundColor: resourceState.currentEpisode == index ? "#aaaaaa" : "#ffffff",
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
              if (resourceState.currentResource != null && resourceState.currentSeries != null)
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
      </View>
    )
  }
  renderResourceButton(resourceState: ResourceState, resourceActions: ResourceActions) {
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
        {({ resourceState, resourceActions }) => {
          console.log({ resourceState: resourceState })
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          return (
            <>
              <View style={{ flexDirection: "row" }}>
                {this.renderResources(resourceState, resourceActions)}
                {this.renderSeries(resourceState, resourceActions)}
                {this.renderEpisodes(resourceState, resourceActions)}
                {this.renderResourceEditModal(resourceState, resourceActions)}
                {this.renderSeriesEditModal(resourceState, resourceActions)}
                {this.renderEpisodeEditModal(resourceState, resourceActions)}
              </View>
              {this.renderResourceButton(resourceState, resourceActions)}
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
