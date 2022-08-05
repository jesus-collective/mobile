import { Ionicons } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { useContext, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { PageItemIndex } from "src/types"
import { v4 as uuidv4 } from "uuid"
import MainStyles from "../../components/style"
import { ResourcePageItemInput, ResourcePageItemType } from "../../src/API"
import JCResourceConfigModal from "./JCResourceConfigModal"
import PageConfigModal from "./PageConfigModal"
import ResourceCard from "./ResourceCard"
import ResourceColumn from "./ResourceColumn"
import { ResourceContext } from "./ResourceContext"
import ResourceDropDownPicker from "./ResourceDropDownPicker"
import ResourceGrid from "./ResourceGrid"
import ResourceHeader from "./ResourceHeader"
import ResourceList from "./ResourceList"
import ResourceMenu from "./ResourceMenu"
import ResourceRichText from "./ResourceRichText"

interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
  pageItems?: (ResourcePageItemInput | null)[] | null | undefined
  pageItemIndex: PageItemIndex
  isBase?: boolean
  hideEditButton?: boolean
}

function ResourceContentImpl(props: Props) {
  const resourceContext = useContext(ResourceContext)
  const [showPageConfigModal, setShowPageConfigModal] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  const [showJCResourceConfigModal, setShowJCResourceConfigModal] = useState<boolean>(
    props.route.params.create === "true" || props.route.params.create === true ? true : false
  )
  const styles = MainStyles.getInstance()

  const icon = () => {
    return <Ionicons name="md-menu" style={styles.style.resourceIcon} />
  }

  const renderAddPageItemButton = (pageItemIndex: PageItemIndex) => {
    return (
      <DropDownPicker
        value={value}
        setValue={setValue}
        open={open}
        setOpen={setOpen}
        zIndex={5000 + pageItemIndex.length}
        items={[
          {
            label: "Menu",
            value: ResourcePageItemType.Menu,
            icon: icon,
          },
          {
            label: "Header",
            value: ResourcePageItemType.Header,
            icon: icon,
          },
          {
            label: "Rich Text",
            value: ResourcePageItemType.RichText,
            icon: icon,
          },
          {
            label: "List",
            value: ResourcePageItemType.List,
            icon: icon,
          },
          {
            label: "Grid",
            value: ResourcePageItemType.Grid,
            icon: icon,
          },
          {
            label: "Column",
            value: ResourcePageItemType.Column,
            icon: icon,
          },
          {
            label: "Card",
            value: ResourcePageItemType.Card,
            icon: icon,
          },
        ]}
        placeholder="Add Page Item"
        containerStyle={{
          height: 40,
          width: 160,
          zIndex: 5000 + pageItemIndex.length,
          marginTop: 5,
          marginBottom: 100,
        }}
        dropDownContainerStyle={{
          backgroundColor: "#FF4438",
          width: 150,
          zIndex: 5000 + pageItemIndex.length,
        }}
        style={{
          padding: 3,
          backgroundColor: "#FF4438",
          zIndex: 5000 + pageItemIndex.length,
          flexDirection: "row",
        }}
        listItemContainerStyle={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: 100,
          zIndex: 5000 + pageItemIndex.length,
        }}
        labelStyle={{
          fontSize: 14,
          textAlign: "left",
          color: "#FFFFFF",
          zIndex: 5000 + pageItemIndex.length,
          fontWeight: "600",
          alignSelf: "center",
        }}
        // arrowColor="#FFFFFF"
        onChangeValue={(item) => {
          console.log({ item: item })
          if (item != "") {
            const pageItem: ResourcePageItemInput = {
              id: uuidv4(),
              type: item as ResourcePageItemType,
            }
            resourceContext.resourceActions.createPageItem(
              resourceContext.resourceState?.currentMenuItem ?? 0,
              pageItemIndex,
              pageItem
            )
            setValue("")
          }
          // item.value = null
        }}
      />
    )
  }
  const renderPageConfigButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setShowPageConfigModal(true)
        }}
      >
        <View style={{ backgroundColor: "#FF4438" }}>
          <Text style={{ color: "#FFFFFF", alignSelf: "center" }}>Configure Page</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const renderJCResourceConfigButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setShowJCResourceConfigModal(true)
        }}
      >
        <View style={{ backgroundColor: "#FF4438" }}>
          <Text style={{ color: "#FFFFFF", alignSelf: "center" }}>Configure JC Group</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const renderResourceConfigButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation?.navigate("ResourceConfigureScreen", {
            id: resourceContext.resourceState?.loadId,
          })
        }}
      >
        <View style={{ backgroundColor: "#FF4438" }}>
          <Text style={{ color: "#FFFFFF", alignSelf: "center" }}>Configure Resources</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const saveResource = (
    menuItemIndex: number,
    pageItemIndex: PageItemIndex,
    value: ResourcePageItemInput
  ) => {
    resourceContext.resourceActions.updatePageItem(menuItemIndex, pageItemIndex, value)
  }
  const deleteResource = (menuItemIndex: number, pageItemIndex: PageItemIndex) => {
    resourceContext.resourceActions.deletePageItem(menuItemIndex, pageItemIndex)
  }
  const renderRouter = (pageItemIndex: number, item: ResourcePageItemInput): React.ReactNode => {
    switch (item.type) {
      case ResourcePageItemType.Column:
        return (
          <ResourceColumn
            key={pageItemIndex}
            pageItemIndex={props.pageItemIndex?.concat(pageItemIndex)}
            save={saveResource}
            delete={deleteResource}
            hideEditButton={props.hideEditButton}
            pageItem={item}
          ></ResourceColumn>
        )
      case ResourcePageItemType.Header:
        return (
          <ResourceHeader
            key={pageItemIndex}
            pageItemIndex={props.pageItemIndex?.concat(pageItemIndex)}
            save={saveResource}
            delete={deleteResource}
            hideEditButton={props.hideEditButton}
            pageItem={item}
          ></ResourceHeader>
        )
      case ResourcePageItemType.Menu:
        return (
          <ResourceMenu
            key={pageItemIndex}
            pageItemIndex={props.pageItemIndex?.concat(pageItemIndex)}
            save={saveResource}
            delete={deleteResource}
            hideEditButton={props.hideEditButton}
            pageItem={item}
          ></ResourceMenu>
        )
      case ResourcePageItemType.RichText:
        return (
          <ResourceRichText
            key={pageItemIndex}
            pageItemIndex={props.pageItemIndex?.concat(pageItemIndex)}
            save={saveResource}
            delete={deleteResource}
            hideEditButton={props.hideEditButton}
            pageItem={item}
          ></ResourceRichText>
        )
      case ResourcePageItemType.Card:
        return (
          <ResourceCard
            key={pageItemIndex}
            pageItemIndex={props.pageItemIndex?.concat(pageItemIndex)}
            save={saveResource}
            delete={deleteResource}
            hideEditButton={props.hideEditButton}
            pageItem={item}
          ></ResourceCard>
        )
      case ResourcePageItemType.DropDownPicker:
        return (
          <ResourceDropDownPicker
            key={pageItemIndex}
            pageItemIndex={props.pageItemIndex?.concat(pageItemIndex)}
            save={saveResource}
            delete={deleteResource}
            hideEditButton={props.hideEditButton}
            pageItem={item}
          ></ResourceDropDownPicker>
        )
      case ResourcePageItemType.List:
        return (
          <ResourceList
            key={pageItemIndex}
            pageItemIndex={props.pageItemIndex?.concat(pageItemIndex)}
            save={saveResource}
            delete={deleteResource}
            hideEditButton={props.hideEditButton}
            pageItem={item}
          ></ResourceList>
        )
      case ResourcePageItemType.Grid:
        return (
          <ResourceGrid
            key={pageItemIndex}
            pageItemIndex={props.pageItemIndex?.concat(pageItemIndex)}
            save={saveResource}
            delete={deleteResource}
            hideEditButton={props.hideEditButton}
            pageItem={item}
          ></ResourceGrid>
        )
    }
  }
  const renderColumnConfig = (): React.ReactNode => {
    console.log({ ColumnConfig: props.pageItemIndex })
    return resourceContext.resourceState?.isEditable ? (
      <View style={{ flexDirection: "row", zIndex: 5000 + props.pageItemIndex.length }}>
        {renderAddPageItemButton(props.pageItemIndex)}
      </View>
    ) : null
  }
  const renderPageConfig = (): React.ReactNode => {
    return resourceContext.resourceState?.isEditable ? (
      <View style={{ flexDirection: "row", zIndex: 5000 + props.pageItemIndex.length }}>
        {renderAddPageItemButton([])}
        {renderPageConfigButton()}
        {renderResourceConfigButton()}
        {renderJCResourceConfigButton()}
        <JCResourceConfigModal
          visible={showJCResourceConfigModal}
          onClose={() => {
            setShowJCResourceConfigModal(false)
          }}
        ></JCResourceConfigModal>
        <PageConfigModal
          visible={showPageConfigModal}
          onClose={() => {
            setShowPageConfigModal(false)
          }}
        ></PageConfigModal>
      </View>
    ) : null
  }
  const renderItems = (pageItems: (ResourcePageItemInput | null)[] | null | undefined) => {
    return pageItems?.map((item: ResourcePageItemInput | null, index: number) => {
      if (item) return renderRouter(index, item)
    })
  }

  if (!resourceContext.resourceState) return null
  if (resourceContext.resourceState?.currentResource == null) return null
  let pageItems: null | undefined | (ResourcePageItemInput | null)[] =
    resourceContext.resourceActions.getMenuItem(
      resourceContext.resourceState?.currentMenuItem
    )?.pageItems
  if (!props.isBase) pageItems = props.pageItems
  console.log({ pageItems: pageItems })
  return (
    <>
      {renderItems(pageItems)}

      {props.isBase ? renderPageConfig() : renderColumnConfig()}
    </>
  )
}

export default function ResourceContent(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <ResourceContentImpl {...props} navigation={navigation} route={route} />
}
