import React from 'react';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/Header/Header'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import { MapData } from 'components/MyGroups/MyGroups';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { View, TextInput, Modal, Picker } from 'react-native';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';
import JCModal from '../../components/Forms/JCModal';
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
  tiersData: [],
  showAddTierModal: boolean,
  newTier: any
}


export default class AdminScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      tiersData: [],
      showAddTierModal: false,
      groupList: ["admin", "verifiedUsers", "partners", "friends", "courseUser", "courseAdmin", "courseCoach"]
    }
    this.setInitialData()
  }
  async getTiers(nextToken: string | null) {
    try {
      const listTiers: any = await API.graphql({
        query: queries.listTiers,
        variables: { nextToken: nextToken },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(listTiers)
      this.setState({ tiersData: listTiers.data.listTiers.items })
      if (listTiers.data.nextToken)
        this.getTiers(listTiers.data.nextToken)
    }
    catch (e: any) {
      console.log(e)
      this.setState({ tiersData: e.data.tiersData.items })
      if (e.data.nextToken)
        this.getTiers(e.data.nextToken)
    }

  }
  async setInitialData(): Promise<void> {
    this.getTiers(null)
  }

  renderHeader(): React.ReactNode {
    return (
      <View style={this.styles.style.adminCRMTableContainer}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Tier Name</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>For Orgs</Text>
        </View>
        <View style={{ flex: 3, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>For Individual</Text>
        </View>
        <View style={this.styles.style.adminCRMTableHeader}>
          <Text style={this.styles.style.adminCRMTableHeading}>Products Included</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Groups Included</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Marketing</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Wait for Approval</Text>
        </View>
      </View>
    )
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
        <View style={{ flex: 3, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.fontRegular}>{item.Username}</Text>
        </View>
        <View style={this.styles.style.adminCRMTableRow}>
          <Text style={this.styles.style.adminCRMTableParagraph}>{item.Attributes.find(e => e.Name == "email")?.Value}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.adminCRMTableEmailStatus}>{item.Attributes.find(e => e.Name == "phone_number")?.Value}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.adminCRMTableEmailStatus}>{item.UserStatus}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.fontRegular}>{item.Enabled.toString()}</Text>
        </View>
      </View>
    )
  }

  showAddTierModal() {
    this.setState({ showAddTierModal: true })
  }
  closeAddTierModal() {
    this.setState({ showAddTierModal: false })
  }
  async createTier(tier: any) {
    try {
      const listTiers: any = await API.graphql({
        query: mutations.createTier,
        variables: { input: tier },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
    }
    catch (e: any) {
      console.log(e)
    }
  }
  renderAddTierModal(): React.ReactNode {
    return (
      <JCModal visible={this.state.showAddTierModal}
        title="Add Tier"
        onHide={() => { this.setState({ showAddTierModal: false }) }}>
        <>
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
              this.createTier(this.state.newTier);
              this.closeAddTierModal();
              this.setInitialData()
            }}>Send Invite</JCButton></>
      </JCModal>
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
                <View style={this.styles.style.adminSubNavMainContainer} >

                  <View style={this.styles.style.adminInviteButton}>
                    <JCButton buttonType={ButtonTypes.AdminOutline} onPress={() => { this.showAddTierModal() }}>Add Tier</JCButton>
                  </View>
                </View>

                <Content style={{ width: '100%' }}>
                  {this.renderHeader()}
                  {
                    this.state.tiersData ?
                      this.state.tiersData.map((item: any, index: number) => { // This will render a row for each data element.
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
        {this.renderAddTierModal()}
      </Container>


    );
  }
}
