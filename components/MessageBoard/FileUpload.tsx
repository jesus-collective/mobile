import React from "react"
import { Pressable, Text } from "react-native"

interface Props {
  handleUploadCallback(e: React.ChangeEvent<HTMLInputElement>): Promise<void>
}

export default function FileUpload({ handleUploadCallback }: Props): JSX.Element {
  return (
    <Pressable
      style={{
        borderRadius: 2,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#f1f1f1",
        width: 100,
        height: 32,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginLeft: "auto",
      }}
    >
      <Text
        style={{
          fontFamily: "Graphik-Regular-App",
          fontWeight: "600",
          fontSize: 16,
          color: "#333333",
        }}
      >
        Upload
      </Text>
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
        onChange={(e) => handleUploadCallback(e)}
      />
    </Pressable>
  )
}
