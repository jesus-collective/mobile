import { StyleProvider, Content, Body, Right, Left, Card, CardItem, Container, Button } from 'native-base';
import { Text } from 'react-native';
import * as React from 'react';
import styles from '../style'
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
  onDataload(data: any): any
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
  convertProfileToMapData(data) {
    return data.map((dataItem) => {
      if (dataItem.location && dataItem.location.latitude && dataItem.location.longitude)
        return {
          latitude: dataItem.location.latitude,
          longitude: dataItem.location.longitude,
          name: dataItem.given_name + " " + dataItem.family_name,
          link: "",
          type: "profile"
        }
      else return null
    }).filter(o => o)
  }

  convertToMapData(data) {
    return this.convertProfileToMapData(data)
  }
  setInitialData(props) {
    var listUsers: any = API.graphql({
      query: queries.listUsers,
      variables: { filter: { profileState: { eq: "Complete" } } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });

    listUsers.then((json) => {
      // console.log(json)
      this.setState({ data: json.data.listUsers.items }, () => { this.props.onDataload(this.convertToMapData(this.state.data)) })

    }).catch(
      (e: any) => {
        console.log(e)
        this.setState({ data: e.data.listUsers.items }, () => { this.props.onDataload(this.convertToMapData(this.state.data)) })

      }
    )
  }

  openConversation(initialUser, name) {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", { initialUserID: initialUser, initialUserName: name });
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
            <Content style={styles.rightCardWidth}>
              {this.state.data.map((item: any) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => { this.showProfile(item.id) }}>
                    <Card style={styles.dashboardConversationCard}>
                      <CardItem>
                        <Left>
                          <ProfileImage user={item} size='small'>
                          </ProfileImage>

                          <Body>
                            <Text style={styles.fontConnectWithName}>{item.given_name} {item.family_name}</Text>
                            <Text style={styles.fontConnectWithRole}>{item.currentRole}</Text>
                            <Button bordered style={styles.connectWithSliderButton} onPress={() => { this.openConversation(item.id, item.given_name + " " + item.family_name) }}><Text style={styles.fontStartConversation}>Start Conversation</Text></Button>
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