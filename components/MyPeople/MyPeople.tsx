import { StyleProvider, Content, Body, Right, Left, Card, CardItem, Container, Button } from 'native-base';
import { Text } from 'react-native';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Image, TouchableOpacity } from 'react-native'
import * as queries from '../../src/graphql/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import { constants } from '../../src/constants'

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
      data: []

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
      // console.log(json)
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
  showProfiles() {
    console.log("Navigate to profilesScreen")
    this.props.navigation.push("ProfilesScreen");
  }
  showProfile(id) {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false });
  }

  render() {
    if (!constants["SETTING_ISVISIBLE_profile"])
      return null
    else
      return (
        <StyleProvider style={getTheme(material)}>

          <Container style={{ width: "100%", flexDirection: 'column', alignItems: 'flex-start', minHeight: 675, marginTop: 30, borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)" }} >
            <Button style={styles.connectWithTopSectionButton} onPress={() => { this.showProfiles() }} transparent><Text style={styles.fontConnectWith}>People you may connect with</Text></Button>
            <Content style={{ width: "100%" }}>
              {this.state.data.map((item: any) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => { this.showProfile(item.id) }}>
                    <Card style={{ width: "92.5%", minHeight: 50, paddingTop: 28, paddingBottom: 28, border: "solid", borderColor: "#FFFFFF" }}>
                      <CardItem >
                        <Left>
                          <ProfileImage user={item} size='small'>
                          </ProfileImage>

                          <Body>
                            <Text style={styles.fontConnectWithName}>{item.given_name} {item.family_name}</Text>
                            <Text style={styles.fontConnectWithRole}>{item.currentRole}</Text>
                            <Button bordered style={styles.connectWithSliderButton} onPress={() => { this.openConversation() }}><Text style={styles.fontStartConversation}>Start Conversation</Text></Button>
                          </Body>
                        </Left>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                )
              })}
            </Content>

          </Container>
        </StyleProvider>

      )
  }
}