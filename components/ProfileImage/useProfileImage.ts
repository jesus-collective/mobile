import { Storage } from "aws-amplify"
import { useEffect, useState } from "react"
import { Data } from "../../components/Data/Data"
import { ProfileImageProps } from "./ProfileImageNew"

export default function useProfileImage(props: ProfileImageProps) {
  const [url, setUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadUser = async () => {
      try {
        let userId = ""
        if (typeof props.user === "string") userId = props.user
        else userId = props.user.id
        const getUser = await Data.getUserForProfile(userId)
        return getUser?.data?.getUser?.profileImage
      } catch (err) {
        console.error({ "Failed to load user": err })
      }
    }
    const loadOrg = async () => {
      try {
        const getOrg = await Data.getOrgForImage(props.user)
        return getOrg?.data?.getOrganization?.profileImage
      } catch (err) {
        console.error({ "failed to load org": err })
      }
    }
    const loadImageFromStorage = async () => {
      const userData = props.type === "org" ? await loadOrg() : await loadUser()
      if (userData && userData?.userId) {
        let imgUrl: string | null | undefined
        switch (props.quality) {
          case "large":
            imgUrl = userData?.filenameLarge
            break
          case "medium":
            imgUrl = userData?.filenameMedium
            break
          case "small":
            imgUrl = userData?.filenameSmall
            break
          default:
            imgUrl = userData?.filenameMedium
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
              identityId: userData.userId,
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
    }
    if (props.user) loadImageFromStorage()
  }, [props.quality, props.user])
  return { url: url, isLoading }
}
