import React from "react"
import { Linking, Platform, Text, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"

interface ModalProps {
  onHide(): void
  visible: boolean
}

export default function NotSubscribedModal({ onHide, visible }: ModalProps): JSX.Element {
  return (
    <JCModal onHide={onHide} visible={visible} title="Time for an upgrade?" noScroll>
      <View style={{ maxWidth: 600, paddingBottom: 10 }}>
        <Text
          style={{
            margin: 0,
            fontFamily: "Graphik-Regular-App",
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 24,
            textAlign: "left",
            color: "#333333",
          }}
        >
          You haven&apos;t subscribed to this age group yet. If you&apos;d like to, please reach out
          to us at{" "}
          {Platform.OS === "web" ? (
            <a
              href="mailto:support@onestorycurriculum.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#333333" }}
            >
              support@onestorycurriculum.com
            </a>
          ) : (
            <Text
              style={{ textDecorationLine: "underline" }}
              accessibilityRole="link"
              onPress={() => Linking.openURL("mailto:support@onestorycurriculum.com")}
            >
              support@onestorycurriculum.com
            </Text>
          )}
          . In the meantime, feel free to look around and preview the videos.
        </Text>
      </View>
    </JCModal>
  )
}

interface ButtonProps {
  onPress(): void
}

export function NotSubscribedButton({ onPress }: ButtonProps): JSX.Element {
  return (
    <JCButton onPress={onPress} buttonType={ButtonTypes.UpgradeToDownload}>
      Upgrade to download
    </JCButton>
  )
}
