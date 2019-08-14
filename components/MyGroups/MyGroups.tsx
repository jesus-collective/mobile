import { StyleProvider,  Card, CardItem, List, ListItem, Right, Button, Text, Container } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { FontAwesome5 } from '@expo/vector-icons';
interface Props{}
interface State{}

export default class MyGroups extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props);
  }
  render() {
    const items = [{ "test": "abc" }, { "test": "abc2" }, { "test": "abc2" }, { "test": "abc2" }, { "test": "abc2" }, { "test": "abc2" }]
    return (
      <StyleProvider style={getTheme(material)}>

        <Container style={{ flexDirection: 'column' }}>
          <Container style={{ minHeight: 40, flexDirection: 'row', justifyContent: 'space-between'}} >
            <Button transparent><Text style={styles.fontSliderHeader}>My Groups</Text></Button>
            <Container style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button transparent><Text style={styles.fontSliderButtons}>Show All</Text></Button>
              <Button transparent><Text style={styles.fontSliderButtons}>Show Recommended</Text></Button>
              <Button bordered style={styles.sliderButton}><Text>+ Create Group</Text></Button>
            </Container>
          </Container>
          <Container style={{ minHeight: 320 }}>
            <List dataArray={items} horizontal={true} 
              renderRow={() =>
                <ListItem >
                  <Card style={{ width: 300}}>
                    <CardItem ><Text style={styles.fontDetail}>Friday July 20, 2019</Text></CardItem>
                    <CardItem ><Text style={styles.fontTitle}>Church in the modern age</Text></CardItem>
                    <CardItem ><Text style={styles.font}>Join the community of young leaders who want to server</Text></CardItem>
                    <CardItem ><FontAwesome5 name="user-circle"  color="#cccccc"></FontAwesome5><Text style={styles.fontDetail}>Calgary Community Center</Text></CardItem>
                    <CardItem ><Button><Text style={styles.font}>Attend</Text></Button><Right><Text>[Photos]</Text></Right></CardItem>
                  </Card>
                </ListItem>
              }>
            </List>

          </Container>
        </Container>
      </StyleProvider>
    )
  }
}