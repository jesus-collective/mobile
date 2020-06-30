import { StyleProvider, Content, Body, Left, Card, CardItem, Container, Button } from 'native-base';
import { Text } from 'react-native';
import * as React from 'react';

import getTheme from '../../native-base-theme/components';
import { TouchableOpacity } from 'react-native'
import * as queries from '../../src/graphql/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { API, Auth } from 'aws-amplify';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import { constants } from '../../src/constants'
import JCComponent, { JCState } from '../JCComponent/JCComponent';
import { MapData } from '../MyGroups/MyGroups'
interface Props {
  navigation: any
  wrap: boolean
  onDataload(mapData: MapData[]): void
}
interface State extends JCState {
  openSingle: string
  openMultiple: string
  // type: String
  //cardWidth: any
  //createString: String
  titleString: string
  data: any
  currentUser: string
  //showCreateButton: Boolean
}

export default class MyPeople extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      openSingle: "ProfileScreen",
      openMultiple: "ProfilesScreen",
      //createString: "+ Create Event",
      titleString: "People you may connect with",
      //type: props.type,
      //cardWidth: 250,
      data: [],
      currentUser: null
      // showCreateButton: false
    }
    const user = Auth.currentAuthenticatedUser();
    user.then((user: any) => {
      this.setState({ currentUser: user.username }, () => this.setInitialData())
    })
  }
  convertProfileToMapData(data: any): MapData[] {
    return data.map((dataItem) => {
      if (dataItem.location && dataItem.location.latitude && dataItem.location.longitude)
        return {
          latitude: dataItem.location.latitude,
          longitude: dataItem.location.longitude,
          name: dataItem.given_name + " " + dataItem.family_name,
          user: dataItem,
          link: "",
          type: "profile"
        }
      else return null
    }).filter(o => o)
  }

  setInitialData(): void {
    const listUsers: any = API.graphql({
      query: queries.listUsers,
      variables: { filter: { profileState: { eq: "Complete" } } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });

    listUsers.then((json) => {
      // console.log(json)
      this.setState({ data: json.data.listUsers.items }, () => { this.props.onDataload(this.convertProfileToMapData(this.state.data)) })

    }).catch(
      (e: any) => {
        console.log(e)
        this.setState({ data: e.data.listUsers.items }, () => { this.props.onDataload(this.convertProfileToMapData(this.state.data)) })

      }
    )
  }

  openConversation(initialUser: any, name: any): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", { initialUserID: initialUser, initialUserName: name });
  }
  showProfiles(): void {
    console.log("Navigate to profilesScreen")
    this.props.navigation.push("ProfilesScreen");
  }
  showProfile(id: string): void {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false });
  }

  render(): React.ReactNode {
    if (!constants["SETTING_ISVISIBLE_profile"])
      return null
    else
      return (
        <StyleProvider style={getTheme()}>

          <Container style={this.styles.style.peopleContainer} >
            <Button style={this.styles.style.connectWithTopSectionButton} onPress={() => { this.showProfiles() }} transparent><Text style={this.styles.style.fontConnectWith}>People you may connect with</Text></Button>
            <Content style={this.styles.style.rightCardWidth}>
              {this.state.data.map((item: any) => {
                if (item.id !== this.state.currentUser) {
                  return (
                    <TouchableOpacity key={item.id} onPress={() => { this.showProfile(item.id) }}>
                      <Card style={this.styles.style.dashboardConversationCard}>
                        <CardItem>
                          <Left style={this.styles.style.dashboardConversationCardLeft}>
                            <ProfileImage user={item} size='medium' style='my-people'>
                            </ProfileImage>

                            <Body style={this.styles.style.dashboardConversationBody}>
                              <Text style={this.styles.style.fontConnectWithName}>{item.given_name} {item.family_name}</Text>
                              <Text style={this.styles.style.fontConnectConversation}>{item.currentRole}</Text>
                              <Button bordered style={this.styles.style.connectWithSliderButton} onPress={() => { this.openConversation(item.id, item.given_name + " " + item.family_name) }}><Text style={this.styles.style.fontStartConversation}>Start Conversation</Text></Button>
                            </Body>
                          </Left>
                        </CardItem>
                      </Card>
                    </TouchableOpacity>
                  )
                } else {
                  return null
                }
              })}
            </Content>

          </Container>
        </StyleProvider>

      )
  }
}