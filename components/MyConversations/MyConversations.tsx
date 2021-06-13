import { NavigationProp } from "@react-navigation/native"
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Left,
  Right,
  StyleProvider,
} from "native-base"
import * as React from "react"
import { Image, Text } from "react-native"
import getTheme from "../../native-base-theme/components"
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
        <StyleProvider style={getTheme()}>
          <Container
            style={{
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-start",
              minHeight: 725,
              marginTop: 50,
            }}
          >
            <Button
              transparent
              onPress={() => {
                this.openConversation()
              }}
            >
              <Text style={this.styles.style.fontConnectWith}>Latest Conversations</Text>
            </Button>
            <Content>
              {items.map((item) => {
                return (
                  <Card key={item.id} style={this.styles.style.conversationCard}>
                    <CardItem style={{ paddingTop: 28 }}>
                      <Left>
                        <Image
                          style={{ margin: 0, padding: 0, width: 40, height: 45 }}
                          source={require("../../assets/profile-placeholder.png")}
                        />
                        <Body>
                          <Text style={this.styles.style.fontConnectWithName}>{item.name}</Text>
                          <Text style={this.styles.style.fontConnectWithRole}>{item.role}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <Button
                          bordered
                          style={this.styles.style.connectWithSliderButton}
                          onPress={() => {
                            this.openConversation()
                          }}
                        >
                          <Text style={this.styles.style.fontStartConversation}>Open</Text>
                        </Button>
                      </Right>
                    </CardItem>
                    <CardItem>
                      <Text style={this.styles.style.fontConnectWithRole}>{item.message}</Text>
                    </CardItem>
                  </Card>
                )
              })}
            </Content>
          </Container>
        </StyleProvider>
      )
  }
}
