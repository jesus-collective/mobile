import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useState } from "react"
import { Image, View } from "react-native"
import FloatingButton from "../../components/FloatingButton/FloatingButton"
import FloatingButtonStyles from "../../components/FloatingButton/FloatingButtonStyles"
import HelpModal from "../HelpModal/HelpModal"

export default function NeedHelpButton(): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {showModal ? (
        <HelpModal setShow={() => setShowModal(!showModal)}></HelpModal>
      ) : (
        <FloatingButton
          setShow={() => setShowModal(!showModal)}
          smallIcon={<MaterialCommunityIcons name="help-circle" size={24} color="white" />}
          customStyle={FloatingButtonStyles.HelpFloatingButton}
          customLabelStyle={FloatingButtonStyles.HelpFloatingButtonTextStyle}
          largeIcon={
            <View
              style={{
                marginLeft: -24,
                height: 41,
                width: 41,
                borderRadius: 50,
                backgroundColor: "#F0493E",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Image
                style={{
                  flex: 1,
                }}
                source={require("../../assets/svg/JC-Logo.svg")}
              ></Image>
            </View>
          }
          label={"Need Help?"}
        />
      )}
    </>
  )
}
