import { FontAwesome5 } from "@expo/vector-icons"
import Badge from "@mui/material/Badge"
import { Storage } from "aws-amplify"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { DirectMessagesByRoomQuery, MessagesByRoomQuery } from "src/API-messages"
import { MessageComment } from "./AssignmentMessageBoard/MessageThread"

type DMs = NonNullable<DirectMessagesByRoomQuery["directMessagesByRoom"]>["items"]
type DM = NonNullable<DMs>[0]
type Messages = NonNullable<MessagesByRoomQuery["messagesByRoom"]>["items"]
type Message = NonNullable<Messages>[0]
type Reply = NonNullable<NonNullable<NonNullable<Message>["replies"]>["items"]>[0]
type DMReply = NonNullable<NonNullable<NonNullable<DM>["replies"]>["items"]>[0]

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

  static async getAttachment(
    owner: string | undefined,
    filePath?: string | undefined
  ): Promise<void> {
    if (!filePath) return

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
  static renderFileDownloadBadge(
    item: DM | DMReply | Message | Reply | MessageComment
  ): React.ReactNode {
    return (
      <TouchableOpacity
        onPress={() =>
          this.getAttachment(item?.attachmentOwner ?? undefined, item?.attachment ?? undefined)
        }
      >
        <Badge style={{ backgroundColor: "#EFF1F5", marginRight: 10, marginTop: 5, height: 30 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {this.renderFileIcon(item?.attachment)}
            <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>
              {this.processFileName(item?.attachment)}
            </Text>
          </View>
        </Badge>
      </TouchableOpacity>
    )
  }
}
