import { Button } from "native-base"
import React from "react"

interface Props {
  handleUploadCallback(e: React.ChangeEvent<HTMLInputElement>): Promise<void>
}

export default function FileUpload({ handleUploadCallback }: Props) {
  return (
    <Button>
      upload file
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
