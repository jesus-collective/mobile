import React from 'react';
import { StyleProvider, Container, Content, Text, Button } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import EditableText from '../../components/EditableText/EditableText'
import { Image } from 'react-native'
import { API } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'

interface Props {
  navigation: any
}
interface State {
  showMap: boolean
  loadId: string
  data: any
  createNew: boolean
  canSave: boolean
  canLeave: boolean
  isEditable: boolean
}



export default class GroupScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.navigation.state.params.id,
      createNew: props.navigation.state.params.create,
      data: this.getInitialData(props),
      canSave: true,
      canLeave: false,
      isEditable: true
    }

  }
  getInitialData(props) {
    var z: CreateGroupInput = {
      id:"group-"+Date.now(),
      //owner:String!
      type: "group",
      name: "",
      description: "",
      memberCount: 1,
      image: ""
    }

    const data = require('../../assets/json/groups.json');
    if (props.navigation.state.params.create)
      return z
    else
      return data.filter(item => item.id == props.navigation.state.params.id)[0]
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }

  render() {
    console.log("GroupScreen")
    return (
      <StyleProvider style={getTheme(material)}>
        <Container >
          <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
          <MyMap navigation={this.props.navigation} visible={this.state.showMap}></MyMap>
          <Content>
            <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
              <Container style={{ flex: 30, flexDirection: "column",alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text>Group</Text>
                <Text>Sponsored</Text>

                <EditableText placeholder="Enter Group Name" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.name} isEditable={this.state.isEditable}></EditableText>
                <EditableText placeholder="Enter Group Description" multiline={true} textStyle={styles.fontRegular} inputStyle={styles.groupDescriptionInput} value={this.state.data.description} isEditable={this.state.isEditable}></EditableText>

                <Text>Organizer</Text>
                <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                <Text>Members ({this.state.data.memberCount})</Text>

                {
                  this.state.data.members == null ? <Text>No Members Yet</Text> :
                    this.state.data.members.map((item: any) => {
                      return (<Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />)
                    })}
                {this.state.canLeave ?
                  <Button bordered style={styles.sliderButton}><Text>Leave Group</Text></Button> :
                  null
                }
                {this.state.createNew ?
                  <Button bordered style={styles.sliderButton}><Text>Create Group</Text></Button>
                  : null
                }
                {this.state.canSave ?
                  <Button bordered style={styles.sliderButton}><Text>Save Group</Text></Button>
                  : null
                }
              </Container>
              <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <MessageBoard navigation={this.props.navigation} groupId={this.state.data.id}></MessageBoard>
              </Container>
            </Container>
          </Content>
        </Container>
      </StyleProvider>

    );
  }
}
