import React from 'react';
import { Container, Content, Text,Button } from 'native-base';
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


export default class EventScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      showMap: false
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  item = {
    "type": "event",
    "name": "Church in modern age and society",
    "description": "Learning to lead and transform our communities. Viverra nibh cras pulvinar mattis nunc sed. Viverra aliquet eget sit amet. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat. Proin fermentum leo vel orci porta non pulvinar neque laoreet.",
    "time":"Friday, July 5, 2019 @ 3:00 PM to 5:00 PM",
    "location":"Calgary Community Center",
    "organizer": {
      "name": "The Meeting House",
      "image": "../../assets/profile-placeholder.png"
    },
    "memberCount": 60,
    "members": [
      {
        "name": "Dave Smith",
        "image": "../../assets/profile-placeholder.png"
      },
      {
        "name": "Dave Smith",
        "image": "../../assets/profile-placeholder.png"
      },
      {
        "name": "Dave Smith",
        "image": "../../assets/profile-placeholder.png"
      }
    ]
  }
  render() {
    console.log("EventScreen")
    return (

      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <MyMap visible={this.state.showMap}></MyMap>
        <Content>
          <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
            <Container style={{ flex: 30, flexDirection: "column", justifyContent: 'flex-start' }}>
              <Text>Event</Text>
              <Text>Sponsored</Text>
              <Text>{this.item.name}</Text>
              <Text>{this.item.description}</Text>
              <Text>{this.item.time}</Text>
              <Text>{this.item.location}</Text>

              <Text>Organizer</Text>
              <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
              <Text>Attending ({this.item.memberCount})</Text>
              {this.item.members.map((item)=>{
                return (<Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />)
              })}
               <Button bordered style={styles.sliderButton}><Text>Attend</Text></Button>
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
