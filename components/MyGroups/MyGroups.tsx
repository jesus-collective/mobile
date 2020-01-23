import { StyleProvider, Card, CardItem, List, ListItem, Right, Button, Text, Container } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native'
import { DrawerActions, NavigationScreenProp } from 'react-navigation';


interface Props {
  navigation: NavigationScreenProp<any, any>
  wrap:Boolean
 }
interface State { }

export default class MyGroups extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  openGroup() {
    console.log("Navigate to groupScreen")
    this.props.navigation.navigate("GroupScreen");
  }
  openGroups() {
    console.log("Navigate to groupsScreen")
    this.props.navigation.navigate("GroupsScreen");
  }
   items = 
    [
      {
        "id": "group-west-regional-cluster",
        "type": "group",
        "name": "West Regional Cluster",
        "description": "Churches and leaders out west sharing challenges, opportunities, and shaping each other together.",
        "memberCount":15,
        "image": ""
      },
      {
        "id": "group-jesus-centered-theology",
        "type": "group",
        "name": "Jesus Centered Theology",
        "description": "Leaders passionate about shaping the meaning of ‘Jesus-centred’ together…",
        "memberCount":13,
        "image": ""
      },
      {
        "id": "group-jesus-centered-theology",
        "type": "group",
        "name": "Jesus Centered Theology",
        "description": "Leaders passionate about shaping the meaning of ‘Jesus-centred’ together…",
        "memberCount":13,
        "image": ""
      },
      {
        "id": "group-jesus-centered-theology",
        "type": "group",
        "name": "Jesus Centered Theology",
        "description": "Leaders passionate about shaping the meaning of ‘Jesus-centred’ together…",
        "memberCount":13,
        "image": ""
      },
      {
        "id": "group-jesus-centered-theology",
        "type": "group",
        "name": "Jesus Centered Theology",
        "description": "Leaders passionate about shaping the meaning of ‘Jesus-centred’ together…",
        "memberCount":13,
        "image": ""
      }
    ]
  render() {
    
    
  
    return (
      <StyleProvider style={getTheme(material)}>

        <Container style={{ minHeight:400, width:"100%",flexDirection: 'column', justifyContent:'flex-start'}}>
          <Container style={{minHeight: 45, flexGrow:0, flexDirection: 'row', justifyContent: 'space-between' }} >
            <Button transparent onPress={() => {this.openGroups()}}><Text style={styles.fontSliderHeader}>Groups</Text></Button>
            <Container style={{ flexDirection: 'row', justifyContent: 'flex-end',alignItems:"flex-start" }}>
              <Button transparent onPress={() => {this.openGroups()}}><Text style={styles.fontSliderButtons}>Show All</Text></Button>
              <Button transparent onPress={() => {this.openGroups()}}><Text style={styles.fontSliderButtons}>Show Recommended</Text></Button>
              <Button bordered style={styles.sliderButton}><Text style={styles.fontSliderButtons}>+ Create Group</Text></Button>
            </Container>
          </Container>
          <Container style={{ overflow:"scroll",minHeight:330, flexWrap:this.props.wrap?"wrap":"nowrap", flexGrow:1, width:"100%",flexDirection: 'row', justifyContent:"flex-start", alignItems:"flex-start" }}>
          {this.items.map((item) => {
              return (
                <ListItem style={{ alignSelf: "flex-start" }} button onPress={() => {this.openGroup()}}>
                  <Card style={{ alignSelf: "flex-start", padding: "0px", width: 250 }}>
                    <CardItem bordered style={{
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingTop: 0,
                      paddingBottom: 0
                    }} >

                      <Image style={{ margin: 0, padding: 0, width: 250, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
                    </CardItem>
                    <CardItem ><Text style={styles.fontTitle}>{item.name}</Text></CardItem>
                    <CardItem ><Text style={styles.fontDetail}>{item.description}</Text></CardItem>
                    <CardItem ><Button><Text style={styles.font}>Join</Text></Button><Right></Right></CardItem>
                  </Card>
                </ListItem>
               )
              })}

          </Container>
        </Container>
      </StyleProvider>
    )
  }
}