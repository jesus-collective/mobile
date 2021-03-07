import { FontAwesome5 } from "@expo/vector-icons"
import { Auth, Storage } from "aws-amplify"
import { Badge } from "native-base"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { DirectMessagesByRoomQuery } from "src/API"
import { MessagesByRoomQuery } from "src/API-messages"

type DMs = NonNullable<DirectMessagesByRoomQuery["directMessagesByRoom"]>["items"]
type DM = NonNullable<DMs>[0]
type Messages = NonNullable<MessagesByRoomQuery["messagesByRoom"]>["items"]
type Message = NonNullable<Messages>[0]
type Reply = NonNullable<NonNullable<NonNullable<Message>["replies"]>["items"]>[0]

export default class Utils {
  static renderFileIcon(filePath?: string | null): React.ReactNode {
    if (!filePath) return null

    const lastDot = filePath?.lastIndexOf(".")
    const ext = filePath?.substring(lastDot + 1).toLowerCase()

    switch (ext) {
      case "pdf":
        return <FontAwesome5 name="file-pdf" size={22} color="black" />
      case "doc":
      case "docx":
        return <FontAwesome5 name="file-word" size={22} color="black" />
      case "ppt":
      case "pptx":
        return <FontAwesome5 name="file-powerpoint" size={22} color="black" />
      case "xls":
      case "xlsx":
        return <FontAwesome5 name="file-excel" size={22} color="black" />
      default:
        return null
    }
  }
  static processFileName(filePath?: string | null): string {
    if (!filePath) return ""

    const urlStripped = filePath.split("messages/uploads/")[1]
    const lastDash = urlStripped.lastIndexOf("-")
    const fileName = urlStripped.substring(lastDash + 1)
    return fileName
  }

  static async getAttachment(filePath?: string | null): Promise<void> {
    if (!filePath) return

    try {
      const user = await Auth.currentCredentials()
      const userId = user.identityId

      const res = await Storage.get(filePath, {
        level: "protected",
        identityId: userId,
      })

      window.open(res as string, "_blank", "noopener noreferrer")
    } catch (e) {
      console.error(e)
    }
  }
  static renderFileDownloadBadge(item: DM | Message | Reply): React.ReactNode {
    return (
      <TouchableOpacity onPress={() => this.getAttachment(item?.attachment)}>
        <Badge style={{ backgroundColor: "#EFF1F5", marginRight: 10, marginTop: 5, height: 30 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {this.renderFileIcon(item?.attachment)}
            <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>
              {this.processFileName(item?.attachment)}
            </Text>
          </View>
        </Badge>
      </TouchableOpacity>
    )
  }
}
