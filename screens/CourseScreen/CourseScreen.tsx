import React from 'react';
import { StyleProvider, Card, Container, Content, Text, Button } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import EditableText from '../../components/EditableText/EditableText'
import Validate from '../../components/Validate/Validate'
import { Image } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';


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
  validationError: String
}



export default class CourseScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.navigation.state.params.id,
      createNew: props.navigation.state.params.create,
      data: null,
      canSave: true,
      canLeave: false,
      isEditable: true,
      validationError: ""
    }
    this.setInitialData(props)
  }

  setInitialData(props) {
    if (props.navigation.state.params.create)
      Auth.currentAuthenticatedUser().then((user: any) => {
        var z: CreateGroupInput = {
          id: "course-" + Date.now(),
          owner: user.username,
          type: "course",
          name: "",
          description: "",
          memberCount: 1,
          image: "temp",
          length: "",
          time: "",
          effort: "",
          cost: "",
       //   organizerUser: { name: "" },
       //   instructors: [],
       //   course: []
        }
        this.setState({ data: z })
      })
    else {
      var getGroup: any = API.graphql({
        query: queries.getGroup,
        variables: { id: props.navigation.state.params.id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      getGroup.then((json) => {
        this.setState({ data: json.data.getGroup })
      })
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    var validation: any = Validate.Course(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }
  createNew() {
    if (this.validate()) {
      var createGroup: any = API.graphql({
        query: mutations.createGroup,
        variables: { input: this.state.data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      createGroup.then((json: any) => {
        this.setState({ canSave: true, createNew: false })
        console.log({ "Success mutations.createGroup": json });
      }).catch((err: any) => {
        console.log({ "Error mutations.createGroup": err });
      });
    }
  }
  save() {
    if (this.validate()) {
      var updateGroup: any = API.graphql({
        query: mutations.updateGroup,
        variables: { input: this.state.data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      updateGroup.then((json: any) => {
        this.setState({ canSave: true, createNew: false })
        console.log({ "Success mutations.updateGroup": json });
      }).catch((err: any) => {
        console.log({ "Error mutations.updateGroup": err });
      });
    }

  }
  updateValue(field: any, value: any) {
    var temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  render() {
    console.log("CourseScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme(material)}>
          <Container >
            <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
            <MyMap navigation={this.props.navigation} visible={this.state.showMap}></MyMap>
            <Content style={{ backgroundColor: "#F0493E", flex: 20 }}>
              <Text style={styles.fontCourseHeaderTime}>{this.state.data.time} - {this.state.data.length}</Text>

              <EditableText onChange={(value: any) => { this.updateValue("name", value) }} placeholder="Enter Course Name" multiline={false} textStyle={styles.fontCourseHeaderBold} inputStyle={styles.groupNameInput} value={this.state.data.name} isEditable={this.state.isEditable}></EditableText>

              <Text style={styles.fontCourseHeader}>Course</Text>
              <EditableText onChange={(value: any) => { this.updateValue("description", value) }} placeholder="Enter Course Description" multiline={true} textStyle={styles.fontCourseHeaderDescription} inputStyle={styles.groupDescriptionInput} value={this.state.data.description} isEditable={this.state.isEditable}></EditableText>
            </Content>
            <Content style={{ flex: 80 }}>
              <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                <Container style={{ flex: 15, flexDirection: "column", justifyContent: 'flex-start' }}>

                  <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                  <Text>{//this.state.data.organizerUser.name
                  }
                  </Text>
                  <Text>Publisher</Text>
                  <Button bordered style={styles.sliderButton}><Text>Contact Us</Text></Button>

                  {/*this.state.data.instructors.map((item: any) => {
                    return (<Card><Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      <Text>{item.name}</Text>
                      <Text>Instructor</Text>
                      <Button bordered style={styles.sliderButton}><Text>Ask Question</Text></Button>
                    </Card>)
                  }
                )*/}
                </Container>
                <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                  <Text>{this.state.data.summary}</Text>
                  <Text>Course Details</Text>
                  {/*this.state.data.course.map((item) => {
                    return (
                      <Container>
                        <Text>Week {item.week}</Text>
                        <Text>Week {item.week} - {item.name}</Text>
                        {item.sections.map((item2) => {
                          return (
                            <Text>{item.week}.{item2.section} - {item2.name}</Text>
                          )
                        })}

                      </Container>
                    )
                  })*/}
                </Container>
                <Container style={{ flex: 15, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                  <Button bordered style={styles.sliderButton}><Text>Join Course</Text></Button>
                  {this.state.canLeave ?
                    <Button bordered style={styles.sliderButton}><Text>Leave Course</Text></Button> :
                    null
                  }
                  {this.state.createNew ?
                    <Button onPress={() => { this.createNew() }} bordered style={styles.sliderButton}><Text>Create Course</Text></Button>
                    : null
                  }
                  {this.state.canSave ?
                    <Button onPress={() => { this.save() }} bordered style={styles.sliderButton}><Text>Save Course</Text></Button>
                    : null
                  }
                  <EditableText onChange={(value: any) => { this.updateValue("time", value) }} placeholder="Enter Course Time" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.time} isEditable={this.state.isEditable}></EditableText>
                  <EditableText onChange={(value: any) => { this.updateValue("length", value) }} placeholder="Enter Course Length" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.length} isEditable={this.state.isEditable}></EditableText>
                  <EditableText onChange={(value: any) => { this.updateValue("effort", value) }} placeholder="Enter Course Effort" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.effort} isEditable={this.state.isEditable}></EditableText>
                  <EditableText onChange={(value: any) => { this.updateValue("cost", value) }} placeholder="Enter Course Cost" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.cost} isEditable={this.state.isEditable}></EditableText>
                  <Text>{this.state.validationError}</Text>

                </Container>
              </Container>
            </Content>
          </Container>
        </StyleProvider>
        :
        null

    );
  }
}
