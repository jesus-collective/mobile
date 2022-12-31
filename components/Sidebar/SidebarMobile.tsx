import { useEffect, useState } from "react"
import { Platform, useWindowDimensions } from "react-native"
import SignUpSidebar from "../SignUpSidebar/SignUpSidebar"

export function SidebarMobile(props: { authState: string }) {
  const window = useWindowDimensions()
  const [size, setSize] = useState<number>(0)
  useEffect(() => {
    setSize(window.width)
    console.log(window.width)
  }, [window])
  return Platform.OS !== "web" || size <= 720 ? (
    props.authState != "signedIn" && props.authState != "loading" && props.authState != "" ? (
      <SignUpSidebar text={true} />
    ) : null
  ) : null
}
