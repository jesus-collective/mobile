import React from 'react';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/Header/Header'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import { MapData } from 'components/MyGroups/MyGroups';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { View, TextInput, Modal, Picker } from 'react-native';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';
import JCSwitch from '../../components/JCSwitch/JCSwitch';
import * as queries from '../../src/graphql/queries';
import * as customQueries from '../../src/graphql-custom/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import * as mutations from '../../src/graphql/mutations';
import { GetProductQuery } from 'src/API';

interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  showMap: boolean
  mapData: MapData[]
  showMy: boolean
  data: any
  invite: string
  showGroups: boolean
  showGroupsId: string
  groupData: [],
  showUid: boolean,
  showEmail: boolean,
  showPhone: boolean,
  showStatus: boolean,
  groupToAdd: string,
  groupList: any
  paymentsData: [],
  showPayments: boolean,
  showPaymentsId: string,
  productList: [],
  showInvite: boolean,
  inviteType: string,
  inviteData: string,
  inviteDataList: any
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
      groupToAdd: null,
      showInvite: false,
      inviteType: null,
      inviteData: null,
      inviteDataList: [],
      groupList: ["admin", "verifiedUsers", "partners", "friends", "courseUser", "courseAdmin", "courseCoach"]
    }
    this.setInitialData()
  }
  async getUsers(nextToken: string) {
    console.log("getUsers")
    const data = await this.listUsers(40, nextToken)
    console.log({ data: data })
    this.setState({ data: this.state.data.concat(data.Users) })
    if (data.nextToken)
      this.getUsers(data.nextToken)
  }
  async setInitialData(): Promise<void> {
    this.getUsers(null)

    const listProducts: any = await API.graphql({
      query: queries.listProducts,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    console.log(listProducts)
    this.setState({ productList: listProducts.data.listProducts.items })
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
    const z = await API.get(apiName, path, myInit);
    console.log(z)
    const { NextToken, ...rest } = z
    nextToken = NextToken;
    return { nextToken, ...rest };
  }

  async removeUserFromGroup(user: string, groupname: string) {
    console.log(user)
    console.log(groupname)
    const apiName = 'AdminQueries';
    const path = '/removeUserFromGroup';
    const myInit = {
      body: {
        "username": user,
        "groupname": groupname
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    const { ...rest } = await API.post(apiName, path, myInit);
    return rest;
  }
  async addUserToGroup(user: string, groupname: string) {
    console.log(user)
    console.log(groupname)
    const apiName = 'AdminQueries';
    const path = '/addUserToGroup';
    const myInit = {
      body: {
        "username": user,
        "groupname": groupname
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    const { ...rest } = await API.post(apiName, path, myInit);
    return rest;
  }
  async adminUpdateUserAttributes(user: string, email: string) {
    console.log(user)
    console.log(email)
    const apiName = 'AdminQueries';
    const path = '/adminUpdateUserAttributes';
    const myInit = {
      body: {
        "username": user,
        "email": email
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    const z = await API.post(apiName, path, myInit);
    console.log({ adminUpdateUserAttributes: z })
    return z;
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
      <View style={this.styles.style.adminCRMTableContainer}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>First Name</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Last Name</Text>
        </View>
        {this.state.showUid ? <View style={{ flex: 3, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>User id</Text>
        </View> : null}
        {this.state.showEmail ? <View style={{ flex: 3, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Email</Text>
        </View> : null}
        {this.state.showPhone ? <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Phone</Text>
        </View> : null}
        {this.state.showStatus ? <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Status</Text>
        </View> : null}
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Enabled</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Groups</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Payments</Text>
        </View>
      </View>
    )
  }

  async showPayments(id: string): Promise<void> {
    this.setState({
      showPayments: true,
      showPaymentsId: id
    }, async () => {
      try {
        const payments: any = await API.graphql({
          query: queries.paymentByUser,
          variables: { userID: id },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(payments)
        this.setState({ paymentsData: payments.data.paymentByUser.items })
      }
      catch (e: any) {
        console.log(e)
        this.setState({ paymentsData: e.data.paymentByUser.items })
      }
    })
  }
  closePayments(): void {
    this.setState({
      showPayments: false,
      showPaymentsId: null
    })
  }
  async removePayment(user: string, group: string): Promise<void> {
    console.log(user)
    console.log(group)

    try {
      const saveResult = await API.graphql(graphqlOperation(mutations.deletePayment, { input: { id: group } }));
      console.log(saveResult)
    }
    catch (e) {
      console.error(e)
    }
    this.setState({ paymentsData: [], showPaymentsId: null, showPayments: null })

  }
  async addPayment(user: string, group: string): Promise<void> {
    console.log(user)
    console.log(group)


    try {
      const saveResult = await API.graphql(graphqlOperation(mutations.createPayment, { input: { id: group + "-" + user, productID: group, userID: user, dateCompleted: Date.now(), paymentType: "Admin/CRM", paymentInfo: "By: " } })) as GraphQLResult<GetProductQuery>;
      console.log(saveResult)
    }
    catch (e) {
      console.error(e)
    }
    this.setState({ paymentsData: [], showPaymentsId: null, showPayments: null })

    //await this.//addUserToGroup(user, group)
    //this.showPayments(this.state.showPaymentsId)
  }
  closeInvite(): void {
    this.setState({
      showInvite: false
    })
  }
  showInvite(): void {
    this.setState({
      showInvite: true
    })
  }
  closeGroups(): void {
    this.setState({
      showGroups: false,
      showGroupsId: null
    })
  }
  async removeGroup(user, group): Promise<void> {
    await this.removeUserFromGroup(user, group)
    this.showGroups(this.state.showGroupsId)

  }
  async addGroup(user, group): Promise<void> {
    await this.addUserToGroup(user, group)
    this.showGroups(this.state.showGroupsId)
  }
  async showGroups(id: string): Promise<void> {
    this.setState({
      showGroups: true,
      showGroupsId: id
    }, async () => {
      const groups = await this.listGroupsForUser(id, 20, null)
      console.log(groups)
      this.setState({ groupData: groups.Groups })
    })
  }

  renderRow(item: any, index: number): React.ReactNode {

    return (
      <View key={index} style={{ flex: 1, maxHeight: 40, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10, marginBottom: 10, alignContent: 'center' }}>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.adminCRMTableParagraph}>{item.Attributes.find(e => e.Name == "given_name")?.Value}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.adminCRMTableParagraph}>{item.Attributes.find(e => e.Name == "family_name")?.Value}</Text>
        </View>
        {this.state.showUid ? <View style={{ flex: 3, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.fontRegular}>{item.Username}</Text>
        </View> : null}
        {this.state.showEmail ? <View style={{ flex: 3, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.adminCRMTableParagraph}>{item.Attributes.find(e => e.Name == "email")?.Value}</Text>
        </View> : null}
        {this.state.showPhone ? <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.fontRegular}>{item.Attributes.find(e => e.Name == "phone_number")?.Value}</Text>
        </View> : null}
        {this.state.showStatus ? <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.fontRegular}>{item.UserStatus}</Text>
        </View> : null}
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.fontRegular}>{item.Enabled.toString()}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <JCButton buttonType={ButtonTypes.AdminSmallOutline}
            onPress={() => { this.showGroups(item.Username) }}>Groups</JCButton>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <JCButton buttonType={ButtonTypes.AdminSmallOutline}
            onPress={() => { this.showPayments(item.Username) }}>Payments</JCButton>
        </View>
      </View>
    )
  }
  async sendInvite(email: string, inviteType: string): Promise<void> {

    console.log({ "inviting:": email })
    let z = await this.adminCreateUser(email.toLowerCase())
    await this.addUserToGroup(z.User.Username, "verifiedUsers")
    if (inviteType == "course") {
      await this.addUserToGroup(z.User.Username, "courseUser")
    }

  }
  renderGroupsModal(): React.ReactNode {
    return (this.state.showGroups ?
      <Modal animationType="slide" visible={this.state.showGroups}
        transparent={true} presentationStyle="pageSheet" style={{ width: '100%', height: '100%', borderWidth: 0 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ margin: 20, backgroundColor: "white",borderRadius: 10, paddingTop: 10, paddingBottom: 25, paddingLeft: 20, paddingRight: 20, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text style={this.styles.style.adminCRMModalHeading}>Groups</Text>
              <JCButton buttonType={ButtonTypes.AdminModal} onPress={() => { this.closeGroups() }}>X</JCButton>
          </View>
          <View style={{ borderBottomColor: '#333333', opacity: 0.2, borderBottomWidth: 1, width: '100%', marginBottom: 15 }}>
          </View>
          {
            this.state.groupData ?
              this.state.groupData.map((item: any, index: number) => {
                return (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} key={index} >
                  <Text style={this.styles.style.adminCRMModal} key={index}>{item.GroupName}</Text>
                  <JCButton buttonType={ButtonTypes.AdminModalOrange}
                    onPress={() => { if (window.confirm('Are you sure you wish to delete this group?')) this.removeGroup(this.state.showGroupsId, item.GroupName) }}>X</JCButton>
                </View>)
              })
              : null
          }
          <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Picker style={{ height: 45, paddingLeft: 10, paddingRight: 10, marginTop: 10 }}
              selectedValue={this.state.groupToAdd}
              onValueChange={val => { this.setState({ groupToAdd: val }) }}
            >       <Picker.Item value={null} label="pick a group to add" />
              {this.state.groupList.map((item, index: number) => {
                return <Picker.Item key={index} value={item} label={item} />
              })}
            </Picker>
            <JCButton buttonType={ButtonTypes.AdminAdd} onPress={() => {
              this.addGroup(this.state.showGroupsId, this.state.groupToAdd)
            }}>Add Group</JCButton>
          </Container>
          </View>
        </View>
      </Modal > : null
    )
  }
  renderPaymentsModal(): React.ReactNode {
    return (this.state.showPayments ?
      <Modal visible={this.state.showPayments}>
        <View style={{ width: '100vw', height: 100, flexDirection: 'row', paddingTop: 20, paddingBottom: 20, justifyContent: 'center' }}>
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: 70, marginLeft: 20, marginRight: 20, flex: 0.1 }}>
            <Text style={this.styles.style.adminCRMModal}>Payments</Text>
            <JCButton buttonType={ButtonTypes.AdminSmallOutline} onPress={() => { this.closePayments() }}>X</JCButton>
          </View>
          {
            this.state.paymentsData ?
              this.state.paymentsData.map((item: any, index: number) => {
                return (<View style={{ height: 50, flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20, flex: 0.2 }} key={index} >
                  <Text style={this.styles.style.adminCRMModal} key={index}>{item.product.name}</Text>
                  <JCButton buttonType={ButtonTypes.AdminSmallOutline}
                    onPress={() => { if (window.confirm('Are you sure you wish to delete this payment?')) this.removePayment(this.state.showPaymentsId, item.id) }}>X</JCButton>
                </View>)
              })
              : null
          }
          <Container style={{ height: 50, flexDirection: 'row', alignItems: 'center', marginLeft: 40, marginRight: 20, flex: 0.25, justifyContent: 'center' }}>
            <Picker style={{ height: 45, width: 250, paddingLeft: 10, paddingRight: 10 }}
              selectedValue={this.state.groupToAdd}
              onValueChange={val => { this.setState({ groupToAdd: val }) }}
            >       <Picker.Item value={null} label="pick a group to add" />
              {
                this.state.productList.map((item: any, index) => {
                  console.log(item)
                  return <Picker.Item key={index} value={item.id} label={item.name} />
                })
              }
            </Picker>
            <JCButton buttonType={ButtonTypes.AdminSmallOutline} onPress={() => {
              this.addPayment(this.state.showPaymentsId, this.state.groupToAdd)

            }}>Add Payment</JCButton>
          </Container>
        </View>
      </Modal> : null
    )
  }
  async updateInviteDataList(nextToken: any) {
    const listGroup: any = await API.graphql({
      query: customQueries.groupByTypeForMyGroups,
      variables: { limit: 20, type: this.state.inviteType, nextToken: nextToken },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    console.log(listGroup)
    this.setState({ inviteDataList: listGroup.data.groupByType.items })
  }
  renderInviteModal(): React.ReactNode {
    return (this.state.showInvite ?
      <Modal visible={this.state.showInvite}>
        <View>
          <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.closeInvite() }}>X</JCButton>
          <Text>Invite: </Text>
          <TextInput
            onChange={(val: any) => { this.setState({ invite: val.target.value }) }}
            placeholder="Enter Email Address"
            multiline={false}
            value={this.state.invite}></TextInput>
          <Picker
            selectedValue={this.state.inviteType}
            onValueChange={val => { this.setState({ inviteType: val, inviteData: null, inviteDataList: [] }, () => { this.updateInviteDataList(null) }) }}
          >
            <Picker.Item value={null} label="pick a group to add" />
            <Picker.Item value="JC" label="Invite to Jesus Collective" />
            <Picker.Item value="course" label="Invite to Course" />
            <Picker.Item value="group" label="Invite to Group" />
            <Picker.Item value="event" label="Invite to Event" />
            <Picker.Item value="resource" label="Invite to Resource" />

          </Picker>

          {this.state.inviteType != null && this.state.inviteType != "JC" ?
            <Picker
              selectedValue={this.state.inviteData}
              onValueChange={val => { this.setState({ inviteData: val }) }}
            >

              <Picker.Item value={null} label="pick a group to add" />
              {this.state.inviteDataList.map((item, index: number) => {
                return (<Picker.Item key={index} value={item.value} label={item.name} />)
              })
              }
            </Picker>


            : null
          }


          < JCButton buttonType={ButtonTypes.Outline}
            onPress={() => {
              this.sendInvite(this.state.invite, this.state.inviteType);
              this.closeInvite();
              this.setInitialData()
            }}>Send Invite</JCButton>
        </View>
      </Modal > : null
    )
  }
  render(): React.ReactNode {
    console.log("AdminScreen")
    return (

      <Container data-testid="events">
        <Header title="Jesus Collective" navigation={this.props.navigation} />

        <HeaderAdmin title="Jesus Collective" navigation={this.props.navigation} />
        {this.isMemberOf("admin") ?
          <Content>



            <Container style={this.styles.style.fontRegular}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 25, marginBottom: 25 }} >
                  <JCSwitch switchLabel='show user id' initState={false} onPress={() => this.setState({ showUid: !this.state.showUid })} />
                  <JCSwitch switchLabel='show email' initState={true} onPress={() => this.setState({ showEmail: !this.state.showEmail })} />
                  <JCSwitch switchLabel='show phone #' initState={true} onPress={() => this.setState({ showPhone: !this.state.showPhone })} />
                  <JCSwitch switchLabel='show status' initState={true} onPress={() => this.setState({ showStatus: !this.state.showStatus })} />
                  <JCButton buttonType={ButtonTypes.AdminOutline} onPress={() => { this.showInvite() }}>Invite</JCButton>

                </View>

                <Content style={{ width: '100%' }}>
                  {this.renderHeader()}
                  {
                    this.state.data ?
                      this.state.data.map((item: any, index: number) => { // This will render a row for each data element.
                        return this.renderRow(item, index);
                      })
                      : null
                  }
                </Content>
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
        {this.renderGroupsModal()}
        {this.renderPaymentsModal()}
        {this.renderInviteModal()}
      </Container>


    );
  }
}
