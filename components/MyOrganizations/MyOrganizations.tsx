import { StyleProvider, Card, CardItem, List, ListItem, Right, Button, Text, Container } from 'native-base';
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
export default class MyOrganization extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  openOrganization() {
    console.log("Navigate to groupScreen")
    this.props.navigation.navigate("OrganizationScreen");
  }
   items =
  [
    {
      "id": "org-tmh-oakville",
      "type": "organization",
      "name": "The Meeting House Oakville",
      "kind": "Publisher",
      "image": ""
    },
    {
      "id": "org-tmh-newmarket",
      "type": "organization",
      "name": "The Meeting House Newmarket",
      "kind": "Community Church",
      "image": ""
    },
    {
      "id": "org-tmh-newmarket",
      "type": "organization",
      "name": "The Meeting House Newmarket",
      "kind": "Community Church",
      "image": ""
    },
    {
      "id": "org-tmh-newmarket",
      "type": "organization",
      "name": "The Meeting House Newmarket",
      "kind": "Community Church",
      "image": ""
    },
    {
      "id": "org-tmh-newmarket",
      "type": "organization",
      "name": "The Meeting House Newmarket",
      "kind": "Community Church",
      "image": ""
    },  {
      "id": "org-tmh-newmarket",
      "type": "organization",
      "name": "The Meeting House Newmarket",
      "kind": "Community Church",
      "image": ""
    }
  ]
  render() {
   
      return (
      <StyleProvider style={getTheme(material)}>

        <Container style={{  minHeight:400, width:"100%",flexDirection: 'column', justifyContent:'flex-start'}}>
          <Container style={{ minHeight: 45, flexGrow:0, flexDirection: 'row', justifyContent: 'space-between' }} >
            <Button transparent><Text style={styles.fontSliderHeader}>Organization</Text></Button>
            <Container style={{ flexDirection: 'row', justifyContent: 'flex-end',alignItems:"flex-start" }}>
              <Button transparent><Text style={styles.fontSliderButtons}>Show All</Text></Button>
              <Button transparent><Text style={styles.fontSliderButtons}>Show Recommended</Text></Button>
              <Button bordered style={styles.sliderButton}><Text style={styles.fontSliderButtons}>+ Create Organization</Text></Button>
            </Container>
          </Container>
          <Container style={{ overflow:"scroll",minHeight:330, flexWrap:this.props.wrap?"wrap":"nowrap", flexGrow:1, width:"100%",flexDirection: 'row', justifyContent:"flex-start", alignItems:"flex-start" }}>
          {this.items.map((item) => {
              return (
                <ListItem style={{ alignSelf: "flex-start" }} >
                  <Card style={{  alignSelf: "flex-start", padding: "0px", width: 200 }}>
                    <CardItem bordered style={{
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingTop: 0,
                      paddingBottom: 0
                    }}>

                      <Image style={{ margin: 0, padding: 0, width: 200, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
                    </CardItem>
                    <CardItem ><Text style={styles.fontTitle}>{item.name}</Text></CardItem>
                    <CardItem ><Text style={styles.fontDetail}>{item.kind}</Text></CardItem>
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