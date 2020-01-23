import React from 'react';
import { Container, Content, Text, Button } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyConversations from '../../components/MyConversations/MyConversations';
import MyEvents from '../../components/MyEvents/MyEvents';
import MyGroups from '../../components/MyGroups/MyGroups';
import MyResources from '../../components/MyResources/MyResources';
import MyPeople from '../../components/MyPeople/MyPeople';
import MyOrganizations from '../../components/MyOrganizations/MyOrganizations';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import { NavigationScreenProp } from 'react-navigation';
import { Image } from 'react-native'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {
  showMap: boolean
}


export default class ConversationScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      showMap: false
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  item =
    [
      [
        {
          "id":"1",
          "name": "Dave Smith",
          "image": "../../assets/profile-placeholder.png"
        }
      ],
      [
        {
          "id":"2",
          "name": "Ed Marky",
          "image": "../../assets/profile-placeholder.png"
        },
        {
          "id":"3",
          "name": "John Dev",
          "image": "../../assets/profile-placeholder.png"
        }
      ]
    ]

  render() {
    console.log("EventScreen")
    return (

      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <MyMap visible={this.state.showMap}></MyMap>
        <Content>
          <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
            <Container style={{ flex: 30, flexDirection: "column", justifyContent: 'flex-start' }}>
              <Text>Direct Messages</Text>

              {this.item.map((items) => {
                return (
                  items.map((item) => {
                    return (<Text key={item.id}><Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      {item.name}</Text>)

                  })
                )
              })}

            </Container>
            <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <MessageBoard></MessageBoard>
            </Container>
          </Container>
        </Content>
      </Container>


    );
  }
}
