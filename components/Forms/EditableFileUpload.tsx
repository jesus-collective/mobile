import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { Auth, Storage } from "aws-amplify"
import { Badge } from "native-base"
import React from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import JCComponent from "../JCComponent/JCComponent"
import JCButton, { ButtonTypes } from "./JCButton"

interface Props {
  attachment: string
  attachmentName: string
  owner: string
  isEditable: boolean
  textStyle: any
  inputStyle?: any
  placeholder?: string
  onChange?(obj: any): void
}
export default class EditableFileUpload extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  renderFileDownloadBadge(): React.ReactNode {
    return this.props.attachment ? (
      <TouchableOpacity onPress={() => this.getAttachment(this.props.attachment, this.props.owner)}>
        <Badge style={{ backgroundColor: "#EFF1F5", marginRight: 10, marginTop: 5, height: 30 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {this.renderFileIcon(this.props.attachment)}
            <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>
              {this.props.attachmentName
                ? this.props.attachmentName
                : this.processFileName(this.props.attachment)}
            </Text>
          </View>
        </Badge>
      </TouchableOpacity>
    ) : null
  }

  renderFileUploadBadge(): React.ReactNode {
    return this.props.attachment ? (
      <View>
        <Badge style={{ backgroundColor: "#EFF1F5", marginRight: 10, marginTop: 5, height: 30 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {this.renderFileIcon(this.props.attachment)}
            <TextInput
              placeholder="custom filename (optional)"
              style={{ fontSize: 14, paddingHorizontal: 10, width: 200 }}
              value={this.props.attachmentName}
              onChange={(e) => {
                if (this.props.onChange) this.props.onChange({ attachmentName: e.nativeEvent.text })
              }}
            ></TextInput>
            <TouchableOpacity
              onPress={() => {
                if (this.props.onChange)
                  this.props.onChange({ attachmentName: null, attachment: null })
              }}
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </Badge>
        <View style={{ fontSize: 12, marginLeft: 10, marginTop: 7 }}>
          {this.processFileName(this.props.attachment)}
        </View>
      </View>
    ) : null
  }

  renderFileIcon(filePath: string): React.ReactNode {
    console.log({ File: filePath })
    const lastDot = filePath.lastIndexOf(".")
    const ext = filePath.substring(lastDot + 1)

    if (ext === "pdf" || ext === "PDF") {
      return <FontAwesome5 name="file-pdf" size={22} color="black" />
    }

    if (ext === "doc" || ext === "docx") {
      return <FontAwesome5 name="file-word" size={22} color="black" />
    }

    if (ext === "ppt" || ext === "pptx") {
      return <FontAwesome5 name="file-powerpoint" size={22} color="black" />
    }

    if (ext === "xls" || ext === "xlsx") {
      return <FontAwesome5 name="file-excel" size={22} color="black" />
    }

    return null
  }

  processFileName(filePath: string): string {
    const urlStripped = filePath.split("course/uploads/")[1]
    const lastDash = urlStripped.lastIndexOf("-")
    const fileName = urlStripped.substring(lastDash + 1)
    return fileName
  }

  async getAttachment(filePath: string, owner: string): Promise<void> {
    console.log({ filePath, owner })
    try {
      const res = await Storage.get(filePath, {
        level: "protected",
        identityId: owner,
      })

      window.open(res as string, "_blank", "")
    } catch (e) {
      console.error(e)
    }
  }

  async handleUpload(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    if (e.target.files) {
      const file = e.target.files[0]
      try {
        const user = await Auth.currentCredentials()
        const userId = user.identityId
        const fn = "course/uploads/" + "jc-upload-" + new Date().getTime() + "-" + file.name
        const upload = await Storage.put(fn, file, {
          level: "protected",
          contentType: file.type,
          identityId: userId,
        })
        if (upload && this.props.onChange)
          this.props.onChange({ attachment: fn, attachmentName: null, owner: userId })
      } catch (e) {
        console.error(e)
      }
    }
  }
  render(): React.ReactNode {
    return this.props.isEditable ? (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {this.props.attachment ? this.renderFileUploadBadge() : null}
        <View style={{ marginRight: 0 }}>
          <JCButton
            buttonType={ButtonTypes.SolidRightJustified}
            onPress={() => {
              null
            }}
          >
            <AntDesign name="clouduploado" size={18} color="white" style={{ marginRight: 5 }} />
            Attach a file
          </JCButton>
          <input
            multiple={false}
            style={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "0px",
              right: "0px",
              opacity: "0",
            }}
            type="file"
            accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
            onChange={(e) => this.handleUpload(e)}
          />
        </View>
      </View>
    ) : (
      this.renderFileDownloadBadge()
    )
  }
}
