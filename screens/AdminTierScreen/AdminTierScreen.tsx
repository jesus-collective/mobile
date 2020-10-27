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
import EditableRichText from '../../components/Forms/EditableRichText';
import { CreateTierInput } from '../../src/API'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  tiersData: [],
  showAddTierModal: boolean,
  newTier: CreateTierInput,
  groupList: []
}


export default class AdminScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      tiersData: [],
      showAddTierModal: false,
      newTier: {
        name: "",
        isOrgTier: "false",
        isIndividualTier: "false",
        marketingDescription: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
        productsIncluded: [],
        groupsIncluded: [],
        enabled: "true",
        // applicationProcess:ApplicationProcess
        waitForApproval: "false"
      },
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
          <Text style={this.styles.style.adminCRMTableHeading}>Marketing</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Products Included</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Groups Included</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Wait for Approval</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Enabled</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Edit</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={this.styles.style.adminCRMTableHeading}>Delete</Text>
        </View>
      </View>
    )
  }

  convertFromJSONToHTML = (text: string): string => {
    try {
      return stateToHTML(convertFromRaw(JSON.parse(text)))
    } catch (e) {
      console.log({ Error: e })
      return "<div>Message Can't Be Displayed</div>"
    }
  }
  renderRow(item: any, index: number): React.ReactNode {
    const description = this.convertFromJSONToHTML(item.marketingDescription);

    return (
      <View key={index} style={{ flex: 1, maxHeight: 40, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10, marginBottom: 10, alignContent: 'center' }}>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.adminCRMTableParagraph}>{item.name}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.adminCRMTableParagraph}>{item.isOrgTier}</Text>
        </View>
        <View style={{ flex: 3, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.fontRegular}>{item.isIndividualTier}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.adminCRMTableEmailStatus}>
            <div dangerouslySetInnerHTML={{ __html: description }} style={{
              fontFamily: 'Graphik-Regular-App',
              fontSize: 18,
              color: '#333333',
              opacity: 0.7
            }} /></Text>
        </View>

        <View style={this.styles.style.adminCRMTableRow}>
          <Text style={this.styles.style.adminCRMTableParagraph}></Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.adminCRMTableEmailStatus}>{item.groupsIncluded.join(", ")}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.fontRegular}>{item.waitForApproval}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={this.styles.style.fontRegular}>{item.enabled}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <JCButton buttonType={ButtonTypes.AdminOutline} onPress={() => { this.showEditTierModal() }}>Edit</JCButton>

        </View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
          <JCButton buttonType={ButtonTypes.AdminOutline} onPress={() => { if (window.confirm('Are you sure you wish to delete this tier?')) this.deleteTier(item.id) }}>Delete</JCButton>

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
  async deleteTier(id: string) {
    try {
      const deleteTier: any = await API.graphql({
        query: mutations.deleteTier,
        variables: { input: { id: id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
    }
    catch (e: any) {
      console.log(e)
    }
    this.setInitialData()
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
  updateTier(name, val) {
    const tmp = this.state.newTier
    tmp[name] = val
    this.setState({ newTier: tmp })
  }
  updateTierList(name, val) {
    const tmp = this.state.newTier
    var index = tmp[name].indexOf(val)
    if (index !== -1)
      tmp[name].splice(index, 1);
    else
      tmp[name].push(val)
    this.setState({ newTier: tmp })
  }
  renderAddTierModal(): React.ReactNode {
    return (
      <JCModal visible={this.state.showAddTierModal}
        title="Add Tier"
        onHide={() => { this.setState({ showAddTierModal: false }) }}>
        <>
          <Text>Add Tier: </Text>
          <TextInput
            onChange={(val: any) => { this.updateTier("name", val.nativeEvent.text) }}
            placeholder="Enter Tier Name"
            multiline={false}
            value={this.state.newTier.name}></TextInput>
          <JCSwitch switchLabel="Is Org Tier" initState={this.state.newTier.isOrgTier == "true"}
            onPress={(val) => this.updateTier("isOrgTier", val)}></JCSwitch>
          <JCSwitch switchLabel="Is Individual Tier" initState={this.state.newTier.isIndividualTier == "true"}
            onPress={(val) => this.updateTier("isIndividualTier", val)}></JCSwitch>
          <JCSwitch switchLabel="Wait for Approval" initState={this.state.newTier.waitForApproval == "true"}
            onPress={(val) => this.updateTier("waitForApproval", val)}></JCSwitch>
          <JCSwitch switchLabel="Enabled" initState={this.state.newTier.enabled == "true"}
            onPress={(val) => this.updateTier("enabled", val)}></JCSwitch>
          <EditableRichText onChange={(val) => { this.updateTier("marketingDescription", val) }}
            value={this.state.newTier.marketingDescription}
            isEditable={true}
            textStyle=""></EditableRichText>
          <Text>Groups: </Text>
          {this.state.groupList.map((item) => {
            return (
              <JCSwitch switchLabel={item} initState={this.state.newTier.groupsIncluded?.includes(item)}
                onPress={(val) => this.updateTierList("groupsIncluded", item)}></JCSwitch>
            )
          })
          }

          < JCButton buttonType={ButtonTypes.Outline}
            onPress={() => {
              this.createTier(this.state.newTier);
              this.closeAddTierModal();
              this.setInitialData()
            }}>Create Tier</JCButton></>
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
