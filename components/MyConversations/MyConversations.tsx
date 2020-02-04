import { Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Button, Text } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Image } from 'react-native'

interface Props {
  navigation: any
}
interface State { }
export default class MyConversations extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  openConversation() {
    console.log("Navigate to conversationScreen")
    this.props.navigation.navigate("ConversationScreen");
  }
  render() {

    const items =
      [
        {
          "id": "121",
          "name": "Dave Smith",
          "role": "Youth Pastor in Calgary Area",
          "image": "../../assets/profile-placeholder.png",
          "message": "Hi community! We’re looking for a good resource for our sunday school kids program. Could you share your thoughs and resources if possible? Thank you!"
        },
        {
          "id": "122",
          "name": "Jason Petrovic",
          "role": "Communications Manager",
          "image": "../../assets/profile-placeholder.png",
          "message": "Everyone who is interested in joining our youth summer workshop with pastor @Zachary Soreff starting next weekend, this is last call for your signups! "
        },
        {
          "id": "123",
          "name": "Zachary Soreff",
          "role": "Community Pastor in Calgary Area",
          "image": "../../assets/profile-placeholder.png",
          "message": "Our team just published latest addition to the summer kids camps curriculum. Let us know any feedback - http://jesuscollective.com/345663"
        },
      ]
    return (
      <StyleProvider style={getTheme(material)}>

        <Container style={{ width:"100%", flexDirection: 'column', alignItems: 'flex-start', minHeight: 500 }} >
          <Button transparent onPress={() => {this.openConversation()}}><Text style={styles.fontConnectWith}>Latest Conversations</Text></Button>
          <Content>
            {items.map((item) => {
              return (
                <Card key={item.id} style={{ minHeight: 50 }}>
                  <CardItem>
                    <Left>
                      <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      <Body>
                        <Text style={styles.fontConnectWithName}>{item.name}</Text>
                        <Text style={styles.fontConnectWithRole}>{item.role}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Button bordered style={styles.connectWithSliderButton} onPress={() => {this.openConversation()}}><Text>Open</Text></Button>
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Text style={styles.fontConnectWithRole}>{item.message}</Text>
                  </CardItem>
                </Card>)
            })}
          </Content>

        </Container>
      </StyleProvider>

    )
  }
}