import { NavigationProp } from "@react-navigation/native"
import * as React from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { constants } from "../../src/constants"
import JCComponent from "../JCComponent/JCComponent"

interface Props {
  navigation: NavigationProp<any, any>
}

export default class MyConversations extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }
  openConversation(): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation.navigate("ConversationScreen")
  }

  render(): React.ReactNode {
    const items: { id: string; role: string; name: string; message: string }[] = []
    if (!constants["SETTING_ISVISIBLE_conversation"]) return null
    else
      return (
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
            minHeight: 725,
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.openConversation()
            }}
          >
            <Text style={this.styles.style.fontConnectWith}>Latest Conversations</Text>
          </TouchableOpacity>
          <ScrollView>
            {items.map((item) => {
              return (
                <View key={item.id} style={this.styles.style.conversationCard}>
                  <View style={{ paddingTop: 28 }}>
                    <View>
                      <Image
                        style={{ margin: 0, padding: 0, width: 40, height: 45 }}
                        source={require("../../assets/profile-placeholder.png")}
                      />
                      <Body>
                        <Text style={this.styles.style.fontConnectWithName}>{item.name}</Text>
                        <Text style={this.styles.style.fontConnectWithRole}>{item.role}</Text>
                      </Body>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={this.styles.style.connectWithSliderButton}
                        onPress={() => {
                          this.openConversation()
                        }}
                      >
                        <Text style={this.styles.style.fontStartConversation}>Open</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text style={this.styles.style.fontConnectWithRole}>{item.message}</Text>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      )
  }
}
