﻿import React from 'react';
import { StyleProvider, Card, Container, Content, Text, Button } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import EditableText from '../../components/EditableText/EditableText'
import Validate from '../../components/Validate/Validate'
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
  validationError: String
}



export default class CourseScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.navigation.state.params.id,
      createNew: props.navigation.state.params.create,
      data: this.getInitialData(props),
      canSave: true,
      canLeave: false,
      isEditable: true,
      validationError: ""
    }

  }
  getInitialData(props) {
    var z: CreateGroupInput = {
      id: "course-" + Date.now(),
      //owner:String!
      type: "course",
      name: "",
      description: "",
      memberCount: 1,
      image: "",
      length: "",
      time: "",
      effort:"",
      cost:"",
      organizerUser: { name: "" },
      instructors: [],
      course: []
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
  validate(): boolean {
    var validation: any = Validate.Course(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }
  createNew() {
    if (this.validate()) {

    }
  }
  save() {
    if (this.validate()) {

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
                <Text>{this.state.data.organizerUser.name}</Text>
                <Text>Publisher</Text>
                <Button bordered style={styles.sliderButton}><Text>Contact Us</Text></Button>

                {this.state.data.instructors.map((item: any) => {
                  return (<Card><Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                    <Text>{item.name}</Text>
                    <Text>Instructor</Text>
                    <Button bordered style={styles.sliderButton}><Text>Ask Question</Text></Button>
                  </Card>)
                }
                )}
              </Container>
              <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text>{this.state.data.summary}</Text>
                <Text>Course Details</Text>
                {this.state.data.course.map((item) => {
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
                })}
              </Container>
              <Container style={{ flex: 15, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Button bordered style={styles.sliderButton}><Text>Join Now</Text></Button>
                {this.state.canLeave ?
                  <Button bordered style={styles.sliderButton}><Text>Leave Group</Text></Button> :
                  null
                }
                {this.state.createNew ?
                  <Button onPress={() => { this.createNew() }} bordered style={styles.sliderButton}><Text>Create Group</Text></Button>
                  : null
                }
                {this.state.canSave ?
                  <Button onPress={() => { this.save() }} bordered style={styles.sliderButton}><Text>Save Group</Text></Button>
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

    );
  }
}
