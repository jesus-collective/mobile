import { StyleProvider, Content, Body, Right, Left, Card, CardItem, Container, Button, Text } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import { Image } from 'react-native'
import { NavigationScreenProp } from 'react-navigation';
interface Props {
  navigation: NavigationScreenProp<any, any>
  wrap:Boolean
}

interface State { }
export default class MyPeople extends React.Component<Props, State> {
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
          "image": "../../assets/profile-placeholder.png"
        },
        {
          "id": "122",
          "name": "Jason Petrovic",
          "role": "Communications Manager",
          "image": "../../assets/profile-placeholder.png"
        },
        {
          "id": "123",
          "name": "Zachary Soreff",
          "role": "Community Pastor in Calgary Area",
          "image": "../../assets/profile-placeholder.png"
        },
      ]
    return (
      <StyleProvider style={getTheme(material)}>

        <Container style={{ width:"100%",flexDirection: 'column', alignItems: 'flex-start', minHeight: 300 }} >
          <Button transparent><Text style={styles.fontConnectWith}>People you may connect with</Text></Button>
          <Content style={{width:"100%"}}>
            {items.map((item) => {
              return (
                <Card key={item.id} style={{ width:"100%",minHeight: 50 }}>
                  <CardItem>
                    <Left>
                      <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      <Body>
                        <Text style={styles.fontConnectWithName}>{item.name}</Text>
                        <Text style={styles.fontConnectWithRole}>{item.role}</Text>
                        <Button bordered style={styles.connectWithSliderButton} onPress={() => {this.openConversation()}}><Text>Start Conversation</Text></Button>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>)
            })}
          </Content>

        </Container>
      </StyleProvider>

    )
  }
}