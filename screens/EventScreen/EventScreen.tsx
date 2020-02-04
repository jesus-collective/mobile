﻿import React from 'react';
import { StyleProvider, Container, Content, Text, Button } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyConversations from '../../components/MyConversations/MyConversations';
import MyGroups from '../../components/MyGroups/MyGroups';
import MyPeople from '../../components/MyPeople/MyPeople';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import { NavigationScreenProp } from 'react-navigation';
import { Image } from 'react-native'
import { API } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {
  showMap: boolean
  loadId: string
  data: any
  create: boolean
  save: boolean
  leave: boolean
}


export default class EventScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.navigation.state.params.id,
      create: props.navigation.state.params.create,
      data: this.getInitialData(props),
      save: false,
      leave: false
    }

  }
  getInitialData(props) {
    var z: CreateGroupInput = {
      //owner:String!
      type: "event",
      name: "",
      description: "",
      memberCount: 1,
      image: "",
      time:"",
      location:""
    }
    const data = require('../../assets/json/groups.json');
    if (props.navigation.state.params.create)
      return z
    else
      return data.filter(item => item.id == props.navigation.state.params.id)[0]
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }

  render() {
    console.log("EventScreen")
    return (
      <StyleProvider style={getTheme(material)}>
        <Container >
          <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
          <MyMap visible={this.state.showMap}></MyMap>
          <Content>
            <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
              <Container style={{ flex: 30, flexDirection: "column", justifyContent: 'flex-start' }}>
                <Text>Event</Text>
                <Text>Sponsored</Text>
                <Text>{this.state.data.name}</Text>
                <Text>{this.state.data.description}</Text>
                <Text>{this.state.data.time}</Text>
                <Text>{this.state.data.location}</Text>

                <Text>Organizer</Text>
                <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                <Text>Attending ({this.state.data.memberCount})</Text>
                {
                  this.state.data.members == null ? <Text>No Members Yet</Text> :
                    this.state.data.members.map((item: any) => {
                      return (<Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />)
                    })}
                {this.state.leave ?
                  <Button bordered style={styles.sliderButton}><Text>Don't Attend</Text></Button> :
                  null
                }
                {this.state.create ?
                  <Button bordered style={styles.sliderButton}><Text>Create Group</Text></Button>
                  : null
                }
                {this.state.save ?
                  <Button bordered style={styles.sliderButton}><Text>Save Group</Text></Button>
                  : null
                }
              </Container>
              <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <MessageBoard groupId={this.state.data.id}></MessageBoard>
              </Container>
            </Container>
          </Content>
        </Container>
      </StyleProvider>

    );
  }
}
