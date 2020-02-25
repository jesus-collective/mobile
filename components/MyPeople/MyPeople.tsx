import { StyleProvider, Content, Body, Right, Left, Card, CardItem, Container, Button, Text } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native'
import * as queries from '../../src/graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';
import { API, graphqlOperation, Auth } from 'aws-amplify';

interface Props {
  navigation: any
  wrap: Boolean
}
interface State {
  openSingle: string
  openMultiple: string
  // type: String
  //cardWidth: any
  //createString: String
  titleString: String
  data: any
  //showCreateButton: Boolean
}
export default class MyPeople extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openSingle: "ProfileScreen",
      openMultiple: "ProfilesScreen",
      //createString: "+ Create Event",
      titleString: "People you may connect with",
      //type: props.type,
      //cardWidth: 250,
      data: [],
      // showCreateButton: false
    }
    this.setInitialData(props)
  }
  setInitialData(props) {
    var listUsers: any = API.graphql({
      query: queries.listUsers,
      variables: { filter: null },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });

    listUsers.then((json) => {
      console.log(json)
      this.setState({ data: json.data.listUsers.items })
    }).catch(
      (e: any) => {
        console.log(e)
        this.setState({ data: e.data.listUsers.items })
      }
    )
  }
  openConversation() {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen");
  }
  showProfiles(){
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ProfilesScreen");
  }
  render() {
    return (
      <StyleProvider style={getTheme(material)}>

        <Container style={{ width: "100%", flexDirection: 'column', alignItems: 'flex-start', minHeight: 300 }} >
          <Button onPress={()=>{this.showProfiles()}} transparent><Text style={styles.fontConnectWith}>People you may connect with</Text></Button>
          <Content style={{ width: "100%" }}>
            {this.state.data.map((item: any) => {
              return (
                <Card key={item.id} style={{ width: "100%", minHeight: 50 }}>
                  <CardItem>
                    <Left>
                      <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      <Body>
                        <Text style={styles.fontConnectWithName}>{item.given_name} {item.family_name}</Text>
                        <Text style={styles.fontConnectWithRole}>{item.currentRole}</Text>
                        <Button bordered style={styles.connectWithSliderButton} onPress={() => { this.openConversation() }}><Text>Start Conversation</Text></Button>
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