import React from 'react';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/Header/Header'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import { MapData } from 'components/MyGroups/MyGroups';
import { Auth, API } from 'aws-amplify';
import { View, TextInput, Modal } from 'react-native';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';
import JCSwitch from '../../components/JCSwitch/JCSwitch';

interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  showMap: boolean
  mapData: MapData[]
  showMy: boolean
  data: []
  invite: string
  showGroups: boolean
  showGroupsId: string
  groupData: [],
  showUid: boolean,
  showEmail: boolean,
  showPhone: boolean,
  showStatus: boolean,
}


export default class AdminScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      mapData: [],
      showMap: false,
      showMy: this.props.route.params ? this.props.route.params.mine : false,
      data: [],
      showGroups: false,
      showGroupsId: null,
      showUid: false,
      showEmail: true,
      showPhone: true,
      showStatus: true,
    }
    this.setInitialData()
  }
  async setInitialData(): Promise<void> {
    const data = await this.listUsers(20, null)
    console.log(data)
    this.setState({ data: data.Users })
  }
  async listUsers(limit: number, nextToken: string): Promise<any> {
    const apiName = 'AdminQueries';
    const path = '/listUsers';
    const myInit = {
      queryStringParameters: {
        "limit": limit,
        "token": nextToken
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    nextToken = NextToken;
    return rest;
  }

  async listGroupsForUser(user: string, limit: number, nextToken: string): Promise<any> {
    const apiName = 'AdminQueries';
    const path = '/listGroupsForUser';
    const myInit = {
      queryStringParameters: {
        "username": user,
        "limit": limit,
        "token": nextToken
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    nextToken = NextToken;
    return rest;
  }

  async adminCreateUser(email: string): Promise<any> {
    const apiName = 'AdminQueries';
    const path = '/adminCreateUser';
    const myInit = {
      queryStringParameters: {
        "email": email
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    const { ...rest } = await API.get(apiName, path, myInit);
    // nextToken = NextToken;
    return rest;
  }
  renderHeader(): React.ReactNode {
    return (
      <View style={{ backgroundColor: "#aaaaaa", flex: 1, maxHeight: 25, alignSelf: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>First Name</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>Last Name</Text>
        </View>
        {this.state.showUid ? <View style={{ flex: 3, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>User id</Text>
        </View> : null}
        {this.state.showEmail ? <View style={{ flex: 3, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>Email</Text>
        </View> : null}
        {this.state.showPhone ? <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>Phone</Text>
        </View> : null}
        {this.state.showStatus ? <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>Status</Text>
        </View> : null}
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>Enabled</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>Groups</Text>
        </View>
      </View>
    )
  }
  closeGroups(): void {
    this.setState({
      showGroups: false,
      showGroupsId: null
    })
  }
  async showGroups(id: string): Promise<void> {
    this.setState({
      showGroups: true,
      showGroupsId: id
    }, async () => {
      const groups = await this.listGroupsForUser(id, 20, null)
      this.setState({ groupData: groups.Groups })
    })
  }
  renderRow(item: any, index: number): React.ReactNode {
    console.log(item)
    return (
      <View style={{ flex: 1, maxHeight: 40, alignSelf: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>{item.Attributes.find(e => e.Name == "given_name")?.Value}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>{item.Attributes.find(e => e.Name == "family_name")?.Value}</Text>
        </View>
        {this.state.showUid ? <View style={{ flex: 3, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>{item.Username}</Text>
        </View> : null}
        {this.state.showEmail ? <View style={{ flex: 3, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>{item.Attributes.find(e => e.Name == "email")?.Value}</Text>
        </View> : null}
        {this.state.showPhone ? <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>{item.Attributes.find(e => e.Name == "phone_number")?.Value}</Text>
        </View> : null}
        {this.state.showStatus ? <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>{item.UserStatus}</Text>
        </View> : null}
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.fontRegular}>{item.Enabled.toString()}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <JCButton buttonType={ButtonTypes.Outline}
            onPress={() => { this.showGroups(item.Username) }}>Groups</JCButton>
        </View>
      </View>
    )
  }
  async sendInvite(email: string): Promise<void> {

    console.log({ "inviting:": email })
    let z = await this.adminCreateUser(email)
    console.log(z)
  }
  render(): React.ReactNode {
    console.log("AdminScreen")
    return (

      <Container data-testid="events">
        <Header title="Jesus Collective" navigation={this.props.navigation} />

        <HeaderAdmin title="Jesus Collective" navigation={this.props.navigation} />
        {this.isMemberOf("admin") ?
          <Content>

            <Container style={{ maxHeight: 100 }}>
              <View>
                <Text>Invite: </Text>
                <TextInput
                  onChange={(val: any) => { this.setState({ invite: val.target.value }) }}
                  placeholder="Enter Email Address"
                  multiline={false}
                  value={this.state.invite}></TextInput>
                <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.sendInvite(this.state.invite) }}>Send Invite</JCButton>
              </View>
            </Container>

            <Container style={this.styles.style.fontRegular}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginBottom: 12 }} >
                  <JCSwitch switchLabel='show user id' initState={false} onPress={() => this.setState({ showUid: !this.state.showUid })} />
                  <JCSwitch switchLabel='show email' initState={true} onPress={() => this.setState({ showEmail: !this.state.showEmail })} />
                  <JCSwitch switchLabel='show phone #' initState={true} onPress={() => this.setState({ showPhone: !this.state.showPhone })} />
                  <JCSwitch switchLabel='show status' initState={true} onPress={() => this.setState({ showStatus: !this.state.showStatus })} />
                </View>
                {this.renderHeader()}
                {
                  this.state.data ?
                    this.state.data.map((item: any, index: number) => { // This will render a row for each data element.
                      return this.renderRow(item, index);
                    })
                    : null
                }
              </View>
            </Container>

          </Content>
          : <Content>
            <Container style={this.styles.style.eventsScreenMainContainer}>
              <Container style={this.styles.style.eventsScreenLeftContainer}>
                <Text>You must be an admin to see this screen</Text>
              </Container>
            </Container>
          </Content>
        }
        {
          this.state.showGroups ?
            <Modal visible={this.state.showGroups}>
              <Container>
                <Text style={this.styles.style.fontRegular}>Groups</Text>{
                  this.state.groupData ?
                    this.state.groupData.map((item: any, index: number) => {
                      return (
                        <Text style={this.styles.style.fontRegular} key={index}>{item.GroupName}</Text>
                      )
                    })
                    : null
                }
                <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.closeGroups() }}>X</JCButton>
                <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.addGroup() }}>Add Group</JCButton>
              </Container>
            </Modal> : null
        }
      </Container>


    );
  }
}
