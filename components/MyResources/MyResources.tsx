import { StyleProvider, Body, Card, CardItem, Header, List, ListItem, Right, Button, Text, Container } from 'native-base';
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
export default class MyResources extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  openResource() {
    console.log("Navigate to ResourceScreen")
    this.props.navigation.navigate("ResourceScreen");
  }
  openResources() {
    console.log("Navigate to ResourcesScreen")
    this.props.navigation.navigate("ResourcesScreen");
  }
   items =
  [
    {
      "id": "peace-curriculum",
      "type": "resource",
      "name": "Peace Curriculum",
      "lastupdated": "July 3, 2019",
      "image": ""
    },
    {
      "id": "kids-and-youth",
      "type": "resource",
      "name": "Kids & Youth Curriculum",
      "lastupdated": "July 3, 2019",
      "image": ""
    },
    {
      "id": "homechurch-leaders-training",
      "type": "resource",
      "name": "Homechurch Leaders Training",
      "lastupdated": "July 3, 2019",
      "image": ""
    },
    {
      "id": "woodland-hills-teaching",
      "type": "resource",
      "name": "Woodland Hills Teaching",
      "lastupdated": "July 3, 2019",
      "image": ""
    },
    {
      "id": "themeetinghouse-teaching",
      "type": "resource",
      "name": "The Meeting House Teaching",
      "lastupdated": "July 3, 2019",
      "image": ""
    },
  ]
  render() {
   
    return (
      <StyleProvider style={getTheme(material)}>

        <Container style={{ minHeight:400, width:"100%",flexDirection: 'column', justifyContent:'flex-start' }}>
          <Container style={{ minHeight: 45, flexGrow:0, flexDirection: 'row', justifyContent: 'space-between'}} >
            <Button transparent onPress={() => { this.openResources() }}><Text style={styles.fontSliderHeader}>Resources</Text></Button>
            <Container style={{  flexDirection: 'row', justifyContent: 'flex-end',alignItems:"flex-start" }}>
              <Button transparent onPress={() => { this.openResources() }}><Text style={styles.fontSliderButtons}>Show All</Text></Button>
              <Button transparent onPress={() => { this.openResources() }}><Text style={styles.fontSliderButtons}>Show Recommended</Text></Button>
              <Button bordered style={styles.sliderButton}><Text style={styles.fontSliderButtons}>+ Create Resource</Text></Button>
            </Container>
          </Container>
          <Container style={{ overflow:"scroll",minHeight:330, flexWrap:this.props.wrap?"wrap":"nowrap", flexGrow:1, width:"100%",flexDirection: 'row', justifyContent:"flex-start", alignItems:"flex-start"}}>
          {this.items.map((item) => {
              return (
                <ListItem  style={{ alignSelf: "flex-start" }} >
                  <Card style={{  alignSelf: "flex-start", padding: "0px", width: 250  }}>
                    <CardItem bordered style={{
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingTop: 0,
                      paddingBottom: 0
                    }}>

                      <Image style={{ margin: 0, padding: 0, width: 250, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
                    </CardItem>
                    <CardItem ><Text style={styles.fontTitle}>{item.name}</Text></CardItem>
                    <CardItem ><Text style={styles.fontDetail}>Last Updated: {item.lastupdated}</Text></CardItem>
                    <CardItem ><Button><Text style={styles.font}>View</Text></Button><Right></Right></CardItem>
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