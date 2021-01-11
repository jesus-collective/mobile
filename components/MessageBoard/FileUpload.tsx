import { Button } from "native-base"
import React from "react"

interface Props {
  handleUploadCallback(e: React.ChangeEvent<HTMLInputElement>): Promise<void>
}

export default function FileUpload({ handleUploadCallback }: Props) {
  return (
    <Button
      textStyle={{
        fontFamily: "Graphik-Regular-App",
        fontWeight: "600",
        fontSize: 16,
        color: "#333333",
      }}
      style={{
        borderRadius: 4,
        backgroundColor: "#c4c4c450",
        width: 100,
        height: 32,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginLeft: "auto",
        marginRight: 40,
      }}
    >
      Upload File
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
    </Button>
  )
}
