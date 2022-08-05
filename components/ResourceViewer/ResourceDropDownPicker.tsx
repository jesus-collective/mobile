import { Ionicons } from "@expo/vector-icons"
import React, { useContext, useState } from "react"
import { View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import EditableText from "../../components/Forms/EditableText"
import MainStyles from "../../components/style"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { ResourceDetailType } from "../../src/API"
import {
  GetResourceData,
  GetResourceEpisodeData,
  GetResourceSeriesData,
  ResourceAdminProp,
  ResourceSetupProp,
} from "../../src/types"
import NotSubscribedModal, { NotSubscribedButton } from "./NotSubscribed"
import PageItemSettings from "./PageItemSettings"
import { ResourceContext } from "./ResourceContext"

export function ResourceDropDownPickerAdmin(props: ResourceAdminProp): JSX.Element {
  return (
    <>
      <EditableText
        multiline={false}
        onChange={(val: string) => {
          const tmp = props.settings
          tmp.title1 = val
          props.setSettings(tmp)
        }}
        textStyle={{
          margin: 10,
          fontSize: 18,
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: 27,
          letterSpacing: 0,
          textAlign: "left",
          color: "#404040",
        }}
        inputStyle={{ margin: 10 }}
        value={props.settings.title1 ?? ""}
        isEditable={true}
      ></EditableText>
    </>
  )
}
function ResourceDropDownPicker(props: ResourceSetupProp) {
  const resourceContext = useContext(ResourceContext)
  const userContext = useContext(UserContext)
  const [notSubscribedModal, setNotSubscribedModal] = useState<boolean>(false)
  const styles = MainStyles.getInstance()
  const [open, setOpen] = useState<boolean>(false)
  const icon = (): React.ReactNode => {
    return <Ionicons name="md-menu" style={styles.style.resourceIcon} />
  }
  const getButtonItems = (
    items: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData
  ): any => {
    return items && items.details
      ? items.details
          .filter((e) => e?.type == ResourceDetailType.Button)
          .map((item) => {
            return {
              label: item?.text ?? "",
              value: item?.value ?? "",
              icon: icon,
            }
          })
      : []
  }
  if (!userContext.userActions) return null

  if (!resourceContext.resourceState) return null
  if (resourceContext.resourceState.currentResource == null) return null

  let item: GetResourceSeriesData | GetResourceEpisodeData | GetResourceData
  let readGroups: NonNullable<GetResourceData>["readGroups"] | undefined = []
  let isSubscribed = false
  const resourceById = resourceContext.resourceActions.getResourceByID(props.pageItem.resourceID)
  readGroups = resourceById?.readGroups
  if (props.pageItem.episodeID != null && props.pageItem.episodeID != undefined)
    item = resourceContext.resourceActions.getEpisodeByID(
      props.pageItem.resourceID,
      props.pageItem.seriesID,
      props.pageItem.episodeID
    )
  else if (props.pageItem.seriesID != null && props.pageItem.seriesID != undefined)
    item = resourceContext.resourceActions.getSeriesByID(
      props.pageItem.resourceID,
      props.pageItem.seriesID
    )
  else {
    item = resourceContext.resourceActions.getResourceByID(props.pageItem.resourceID)
  }
  console.log({ ITEM: item })
  const buttonItems = getButtonItems(item)

  isSubscribed = !!readGroups?.some((group) => {
    return userContext.userActions.isMemberOf(group as string)
  })

  return (
    <>
      <NotSubscribedModal
        visible={notSubscribedModal}
        onHide={() => setNotSubscribedModal(false)}
      />
      {
        <View
          style={[
            styles.style.resourcesRichTextContainer,
            { zIndex: 6000 + props.pageItemIndex.length },
          ]}
        >
          <PageItemSettings
            pageItemIndex={props.pageItemIndex}
            save={props.save}
            delete={props.delete}
            pageItem={props.pageItem}
            hideEditButton={props.hideEditButton}
          ></PageItemSettings>
          {buttonItems?.length && buttonItems.length > 0 ? (
            <>
              {isSubscribed ? (
                <DropDownPicker
                  open={open}
                  setOpen={setOpen}
                  zIndex={6000 + props.pageItemIndex.length}
                  items={buttonItems}
                  placeholder={props.pageItem.title1 ?? ""}
                  containerStyle={{
                    height: 40,
                    width: 200,
                    zIndex: 5000 + props.pageItemIndex.length,
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: "#FF4438",
                    width: 200,
                    zIndex: 5000 + props.pageItemIndex.length,
                  }}
                  style={{
                    padding: 3,
                    flexDirection: "row",
                    backgroundColor: "#FF4438",
                    zIndex: 5000 + props.pageItemIndex.length,
                  }}
                  listItemContainerStyle={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: 100,
                    zIndex: 5000 + props.pageItemIndex.length,
                  }}
                  labelStyle={{
                    fontSize: 14,
                    textAlign: "left",
                    color: "#FFFFFF",
                    fontWeight: "600",
                    alignSelf: "center",
                    zIndex: 5000 + props.pageItemIndex.length,
                  }}
                  // arrowColor="#FFFFFF"
                  onChangeValue={(item: typeof buttonItems[0]) => {
                    window.location.href = item.value
                  }}
                />
              ) : (
                <NotSubscribedButton onPress={() => setNotSubscribedModal(true)} />
              )}
            </>
          ) : null}
        </View>
      }
    </>
  )
}
export default ResourceDropDownPicker
