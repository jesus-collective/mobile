import Amplify, { Storage } from "aws-amplify"
import { Card, CardItem, View } from "native-base"
import React from "react"
import { Animated, Image, Picker } from "react-native"
import EditableText from "../../components/Forms/EditableText"
import { ResourcePageItemStyle } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import { ResourceSetupProp } from "../../src/types"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"

Amplify.configure(awsconfig)

interface Props extends ResourceSetupProp {}
interface State extends JCState {
  imageUrl: any
  image: any
  fadeValue: any
}
class ResourceCard extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      imageUrl: null,
      image: null,
      fadeValue: new Animated.Value(0),
    }
  }
  fadeAnimation = (): void => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 3250,
      useNativeDriver: true,
    }).start()
  }
  async getImage(img: any): Promise<void> {
    if (img == null) return
    if (img != null) {
      const z = await Storage.get(img.filenameLarge, {
        level: "protected",
        contentType: "image/png",
        identityId: img.userId,
      })
      this.setState({ imageUrl: z, image: img })
    }
  }
  static renderAdmin(page: PageItemSettings): React.ReactNode {
    return (
      <ResourceCard.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
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
                selectedValue={page.state.settings.style}
                onValueChange={(value: any) => {
                  const tmp = page.state.settings
                  tmp.style = value
                  page.setState({ settings: tmp })
                }}
              >
                {Object.keys(ResourcePageItemStyle)
                  .filter((z) => z.startsWith("Card"))
                  .map((org) => {
                    return <Picker.Item key={org} label={org} value={org} />
                  })}
              </Picker>
              {page.state.settings.style == ResourcePageItemStyle.CardManual ? (
                <>
                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.title1 = val
                      page.setState({ settings: tmp })
                    }}
                    multiline={false}
                    textStyle={{ margin: 10 }}
                    inputStyle={{ margin: 10 }}
                    value={page.state.settings.title1 ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.title2 = val
                      page.setState({ settings: tmp })
                    }}
                    multiline={false}
                    textStyle={{ margin: 10 }}
                    inputStyle={{ margin: 10 }}
                    value={page.state.settings.title2 ?? ""}
                    isEditable={true}
                  ></EditableText>
                  <EditableText
                    onChange={(val: string) => {
                      const tmp = page.state.settings
                      tmp.description1 = val
                      page.setState({ settings: tmp })
                    }}
                    multiline={false}
                    textStyle={{ margin: 10 }}
                    inputStyle={{ margin: 10 }}
                    value={page.state.settings.description1 ?? ""}
                    isEditable={true}
                  ></EditableText>
                </>
              ) : (
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
                    selectedValue={page.state.settings.resourceID}
                    onValueChange={(value: any) => {
                      const tmp = page.state.settings
                      tmp.resourceID = value
                      page.setState({ settings: tmp })
                    }}
                  >
                    <Picker.Item key={"null"} label={"None"} value={null} />
                    {resourceState.resourceData?.resources.items.map((org, index: number) => {
                      return <Picker.Item key={index} label={org?.title ?? ""} value={index} />
                    })}
                  </Picker>
                  {page.state.settings.resourceID != null &&
                    page.state.settings.resourceID != undefined && (
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
                        selectedValue={page.state.settings.seriesID}
                        onValueChange={(value: any) => {
                          const tmp = page.state.settings
                          tmp.seriesID = value
                          page.setState({ settings: tmp })
                        }}
                      >
                        <Picker.Item key={"null"} label={"None"} value={null} />
                        {resourceState.resourceData?.resources.items[
                          page.state.settings.resourceID
                        ].series.items.map((org, index: number) => {
                          return <Picker.Item key={index} label={org?.title ?? ""} value={index} />
                        })}
                      </Picker>
                    )}
                  {page.state.settings.resourceID != null &&
                    page.state.settings.resourceID != undefined &&
                    page.state.settings.seriesID != null &&
                    page.state.settings.seriesID != undefined && (
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
                        selectedValue={page.state.settings.episodeID}
                        onValueChange={(value: any) => {
                          const tmp = page.state.settings
                          tmp.episodeID = value
                          page.setState({ settings: tmp })
                        }}
                      >
                        <Picker.Item key={"null"} label={"None"} value={null} />
                        {resourceActions
                          .getSeries(page.state.settings.resourceID, page.state.settings.seriesID)
                          .episodes.items.map((org, index: number) => {
                            return (
                              <Picker.Item key={index} label={org?.title ?? ""} value={index} />
                            )
                          })}
                      </Picker>
                    )}
                </>
              )}
            </>
          )
        }}
      </ResourceCard.Consumer>
    )
  }

  renderManualCard() {
    return (
      <Card>
        <CardItem>
          {this.state.imageUrl ? (
            <Animated.View
              onLayout={this.fadeAnimation}
              style={[this.styles.style.resourceHeaderImgView, { opacity: this.state.fadeValue }]}
            >
              <Image
                style={this.styles.style.resourceHeaderImg}
                source={this.state.imageUrl}
                onError={() => {
                  this.getImage(this.props.pageItem.image)
                }}
              ></Image>
            </Animated.View>
          ) : null}
        </CardItem>

        <CardItem>
          <EditableText
            multiline={false}
            textStyle={{ margin: 10 }}
            inputStyle={{ margin: 10 }}
            value={this.props.pageItem.title1 ?? ""}
            isEditable={false}
          ></EditableText>
        </CardItem>
        <CardItem>
          <EditableText
            multiline={false}
            textStyle={{ margin: 10 }}
            inputStyle={{ margin: 10 }}
            value={this.props.pageItem.title2 ?? ""}
            isEditable={false}
          ></EditableText>
        </CardItem>
        <CardItem>
          <EditableText
            multiline={false}
            textStyle={{ margin: 10 }}
            inputStyle={{ margin: 10 }}
            value={this.props.pageItem.description1 ?? ""}
            isEditable={false}
          ></EditableText>
        </CardItem>
        <CardItem>
          <PageItemSettings
            resourceActions={this.props.resourceActions}
            resourceState={this.props.resourceState}
            pageItemIndex={this.props.pageItemIndex}
            save={this.props.save}
            delete={this.props.delete}
            pageItem={this.props.pageItem}
          ></PageItemSettings>
          {/* */}
        </CardItem>
      </Card>
    )
  }
  renderAutoCard() {
    return (
      <ResourceCard.Consumer>
        {({ resourceState, resourceActions }) => {
          if (!resourceState) return null
          if (resourceState.currentResource == null) return null
          let item
          if (this.props.pageItem.episodeID != null && this.props.pageItem.episodeID != undefined)
            item = resourceActions.getEpisode(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID,
              this.props.pageItem.episodeID
            )

          if (this.props.pageItem.seriesID != null && this.props.pageItem.seriesID != undefined)
            item = resourceActions.getSeries(
              this.props.pageItem.resourceID,
              this.props.pageItem.seriesID
            )
          if (this.props.pageItem.resourceID != null && this.props.pageItem.resourceID != undefined)
            item = resourceActions.getResource(this.props.pageItem.resourceID)
          return (
            <Card>
              <CardItem>
                {this.state.imageUrl ? (
                  <Animated.View
                    onLayout={this.fadeAnimation}
                    style={[
                      this.styles.style.resourceHeaderImgView,
                      { opacity: this.state.fadeValue },
                    ]}
                  >
                    <Image
                      style={this.styles.style.resourceHeaderImg}
                      source={this.state.imageUrl}
                      onError={() => {
                        this.getImage(this.props.pageItem.image)
                      }}
                    ></Image>
                  </Animated.View>
                ) : null}
              </CardItem>

              <CardItem>
                <EditableText
                  multiline={true}
                  textStyle={{ margin: 10 }}
                  inputStyle={{ margin: 10 }}
                  value={this.props.pageItem.title1 ?? ""}
                  isEditable={false}
                ></EditableText>
              </CardItem>
              <CardItem>
                <EditableText
                  multiline={true}
                  textStyle={{ margin: 10 }}
                  inputStyle={{ margin: 10 }}
                  value={this.props.pageItem.title2 ?? ""}
                  isEditable={false}
                ></EditableText>
              </CardItem>
              <CardItem>
                <EditableText
                  multiline={true}
                  textStyle={{ margin: 10 }}
                  inputStyle={{ margin: 10 }}
                  value={this.props.pageItem.description1 ?? ""}
                  isEditable={false}
                ></EditableText>
              </CardItem>
              <CardItem>
                <PageItemSettings
                  resourceActions={this.props.resourceActions}
                  resourceState={this.props.resourceState}
                  pageItemIndex={this.props.pageItemIndex}
                  save={this.props.save}
                  delete={this.props.delete}
                  pageItem={this.props.pageItem}
                ></PageItemSettings>
                {/* */}
              </CardItem>
            </Card>
          )
        }}
      </ResourceCard.Consumer>
    )
  }
  render(): React.ReactNode {
    if (this.state.imageUrl == null || this.state.image != this.props.pageItem.image)
      this.getImage(this.props.pageItem)
    return (
      <View>
        {this.props.pageItem.style == ResourcePageItemStyle.CardManual
          ? this.renderManualCard()
          : this.renderAutoCard()}
      </View>
    )
  }
}
export default ResourceCard
