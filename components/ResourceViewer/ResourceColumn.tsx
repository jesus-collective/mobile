import React, { useContext, useState } from "react"
import { isBrowser, isMobile, isTablet } from "react-device-detect"
import { View, ViewStyle } from "react-native"
import DropDownPicker, { ItemType } from "react-native-dropdown-picker"
import { ResourcePageItemStyle } from "../../src/API"
import { ResourceAdminProp, ResourceSetupProp } from "../../src/types"
import PageItemSettings from "./PageItemSettings"
import ResourceContent from "./ResourceContent"
import { ResourceContext } from "./ResourceContext"

type Props = ResourceSetupProp

export function ResourceColumnAdmin(props: ResourceAdminProp): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <DropDownPicker
        style={{
          width: "100%",
          marginTop: 10,
          marginBottom: 30,
          // fontSize: 16,
          height: 30,
          flexGrow: 0,
          paddingTop: 3,
          paddingBottom: 3,
        }}
        open={open}
        setOpen={setOpen}
        value={props.settings.style ?? ""}
        setValue={(value: any) => {
          const tmp = props.settings
          tmp.style = value
          props.setSettings(tmp)
        }}
        items={[
          ...Object.keys(ResourcePageItemStyle)
            .filter((z) => z.startsWith("Column"))
            .map((org) => {
              return { label: org, value: org } as ItemType<"" | ResourcePageItemStyle>
            }),
        ]}
      />
    </>
  )
}
function ResourceColumn(props: Props) {
  const resourceContext = useContext(ResourceContext)

  const getLeftColumnSize = (): string => {
    switch (props.pageItem.style) {
      case ResourcePageItemStyle.Column3070:
        return "33%"
      case ResourcePageItemStyle.Column5050:
        return "50%"
      case ResourcePageItemStyle.Column7030:
        return "67%"
      default:
        return "calc(40% + 36px)"
    }
  }
  const getRightColumnSize = (): string => {
    switch (props.pageItem.style) {
      case ResourcePageItemStyle.Column3070:
        return "67%"
      case ResourcePageItemStyle.Column5050:
        return "40%"
      case ResourcePageItemStyle.Column7030:
        return "33%"
      default:
        return "calc(40% + 36px)"
    }
  }

  const border: ViewStyle = { borderWidth: 1, borderStyle: "dashed" }
  return (
    <View
      style={[
        {
          flexDirection: isBrowser ? "row" : isTablet ? "row" : "column",
          zIndex: 5000 + props.pageItemIndex.length,
        },
        resourceContext.resourceState?.isEditable && border,
      ]}
    >
      <View
        style={{
          width: isBrowser ? getLeftColumnSize() : isTablet ? getLeftColumnSize() : "100%",
          marginTop: isBrowser ? undefined : isTablet ? undefined : 100,
        }}
      >
        <ResourceContent
          pageItems={props.pageItem.pageItemsLeft}
          isBase={false}
          hideEditButton={props.hideEditButton}
          pageItemIndex={props.pageItemIndex.concat("pageItemsLeft")}
        ></ResourceContent>
        <PageItemSettings
          pageItemIndex={props.pageItemIndex}
          hideEditButton={props.hideEditButton}
          save={props.save}
          delete={props.delete}
          pageItem={props.pageItem}
        ></PageItemSettings>
      </View>

      <View
        style={[
          {
            width: isTablet ? "70%" : isMobile ? "100%" : getRightColumnSize(),
          },
          resourceContext.resourceState?.isEditable && border,
        ]}
      >
        <ResourceContent
          pageItems={props.pageItem.pageItemsRight}
          isBase={false}
          hideEditButton={props.hideEditButton}
          pageItemIndex={props.pageItemIndex.concat("pageItemsRight")}
        ></ResourceContent>
      </View>
    </View>
  )
}

export default ResourceColumn
