import { Storage } from "aws-amplify"
import { useEffect, useState } from "react"
import { JCImageProps } from "./JCImage"

export default function useJCImage(props: JCImageProps) {
  const [url, setUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadImageFromStorage = async () => {
      let imgUrl: string | null | undefined
      switch (props.quality) {
        case "large":
          imgUrl = props.image?.filenameLarge
          break
        case "medium":
          imgUrl = props.image?.filenameMedium
          break
        case "small":
          imgUrl = props.image?.filenameSmall
          break
        default:
          imgUrl = props.image?.filenameMedium
          break
      }
      try {
        setIsLoading(true)
        if (imgUrl) {
          // Storage.get() not throwing error when file does not exist
          // Current implementation shows default image while loading
          // Errored requests that don't throw an error will maintain loading state,
          const pfImage = await Storage.get(imgUrl, {
            level: "protected",
            contentType: "image/png",
            identityId: props.image?.userId ?? "",
          })
          setIsLoading(false)
          setUrl(pfImage)
        } else {
          console.log("No Image URL Found.")
        }
      } catch (err) {
        console.log({ err })
        setUrl("")
      }
    }
    if (props.image) loadImageFromStorage()
  }, [props.quality, props.image])
  return { url: url, isLoading }
}
