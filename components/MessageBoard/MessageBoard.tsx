import { Input, Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Button, Text } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Image } from 'react-native'

interface Props { }
interface State { }
export default class MessageBoard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {

    const items =
      [
        {
          "id": "121",
          "name": "Dave Smith",
          "role": "Youth Pastor in Calgary Area",
          "image": "../../assets/profile-placeholder.png",
          "message": "Hi community! We’re looking for a good resource for our sunday school kids program. Could you share your thoughs and resources if possible? Thank you!",
          "date": "2019-01-01 20:30:45"
        },
        {
          "id": "122",
          "name": "Jason Petrovic",
          "role": "Communications Manager",
          "image": "../../assets/profile-placeholder.png",
          "message": "Everyone who is interested in joining our youth summer workshop with pastor @Zachary Soreff starting next weekend, this is last call for your signups! ",
          "date": "2019-01-01 20:30:45"
        },
        {
          "id": "123",
          "name": "Zachary Soreff",
          "role": "Community Pastor in Calgary Area",
          "image": "../../assets/profile-placeholder.png",
          "message": "Our team just published latest addition to the summer kids camps curriculum. Let us know any feedback - http://jesuscollective.com/345663",
          "date": "2019-01-01 20:30:45"
        },
      ]
    return (
      <StyleProvider style={getTheme(material)}>

        <Container style={{ width: "100%", flexDirection: 'column', alignItems: 'flex-start', minHeight: 500 }} >

          <Content>
            <Card style={{ minHeight: 50 }}>
              <Input multiline={true} style={{
                width: "100%", height: 100, borderWidth:1
              }} placeholder="type here" />
              <Button bordered style={styles.sliderButton}><Text>Post</Text></Button>
            </Card>
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
                      <Text>{item.date}</Text>
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