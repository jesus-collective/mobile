import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import React, { useContext, useState } from "react"
import { ResourceSetupProp } from "src/types"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import MainStyles from "../../components/style"
import { ResourcePageItemType } from "../../src/API"
import { ResourceCardAdmin } from "./ResourceCard"
import { ResourceColumnAdmin } from "./ResourceColumn"
import { ResourceContext } from "./ResourceContext"
import { ResourceDropDownPickerAdmin } from "./ResourceDropDownPicker"
import { ResourceGridAdmin } from "./ResourceGrid"
import { ResourceHeaderAdmin } from "./ResourceHeader"
import { ResourceListAdmin } from "./ResourceList"
import { ResourceMenuAdmin } from "./ResourceMenu"
import { ResourceRichTextAdmin } from "./ResourceRichText"

export default function PageItemSettings(props: ResourceSetupProp) {
  const resourceContext = useContext(ResourceContext)
  const [settings, setSettings] = useState(props.pageItem)
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
  const styles = MainStyles.getInstance()

  const componentDidUpdate = (prevProps: ResourceSetupProp): void => {
    if (prevProps.pageItem != props.pageItem) setSettings(props.pageItem)
  }
  const saveResource = (): void => {
    if (props.save && resourceContext.resourceState)
      props.save(resourceContext.resourceState?.currentMenuItem, props.pageItemIndex, settings)
  }
  const deleteResource = (): void => {
    if (props.delete && resourceContext.resourceState)
      props.delete(resourceContext.resourceState?.currentMenuItem, props.pageItemIndex)
  }
  const renderAdminRouter = (): React.ReactNode => {
    switch (settings.type) {
      case ResourcePageItemType.Header:
        return <ResourceHeaderAdmin settings={settings} setSettings={setSettings} />
      case ResourcePageItemType.Menu:
        return <ResourceMenuAdmin settings={settings} setSettings={setSettings} />
      case ResourcePageItemType.RichText:
        return <ResourceRichTextAdmin settings={settings} setSettings={setSettings} />
      case ResourcePageItemType.Column:
        return <ResourceColumnAdmin settings={settings} setSettings={setSettings} />
      case ResourcePageItemType.Card:
        return <ResourceCardAdmin settings={settings} setSettings={setSettings} />
      case ResourcePageItemType.List:
        return <ResourceListAdmin settings={settings} setSettings={setSettings} />
      case ResourcePageItemType.Grid:
        return <ResourceGridAdmin settings={settings} setSettings={setSettings} />
      case ResourcePageItemType.DropDownPicker:
        return <ResourceDropDownPickerAdmin settings={settings} setSettings={setSettings} />
    }
  }

  return (
    <>
      {!props.hideEditButton && resourceContext.resourceState?.isEditable && (
        <JCButton
          buttonType={ButtonTypes.AdminModal}
          onPress={() => {
            setShowSettingsModal(true)
          }}
        >
          <Ionicons name="ios-settings" style={styles.style.icon} size={32} />
        </JCButton>
      )}
      {showSettingsModal ? (
        <JCModal
          visible={showSettingsModal}
          title="Configure Page Item"
          onHide={() => {
            setShowSettingsModal(false)
          }}
        >
          <>
            <Picker
              mode="dropdown"
              style={{
                width: "100%",
                marginTop: 10,
                marginBottom: 15,
                fontSize: 16,
                height: 30,
                flexGrow: 0,
                paddingTop: 3,
                paddingBottom: 3,
              }}
              selectedValue={settings.type ?? undefined}
              onValueChange={(value: any) => {
                const tmp = settings
                tmp.type = value
                if (tmp.type == ResourcePageItemType.RichText) {
                  tmp.title1 = null
                }
                setSettings(tmp)
              }}
            >
              {Object.keys(ResourcePageItemType).map((org) => {
                return <Picker.Item key={org} label={org} value={org} />
              })}
            </Picker>
            {renderAdminRouter()}
            <JCButton
              buttonType={ButtonTypes.ResourceModalSolid}
              onPress={() => {
                saveResource()
                setShowSettingsModal(false)
              }}
            >
              Save
            </JCButton>
            <JCButton
              buttonType={ButtonTypes.ResourceModalSolid}
              onPress={() => {
                deleteResource()
                setShowSettingsModal(false)
              }}
            >
              Delete
            </JCButton>
          </>
        </JCModal>
      ) : null}
    </>
  )
}
