import React from 'react';
import { StyleProvider, Card, Container, Content } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import { Text } from 'react-native'

import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'

import getTheme from '../../native-base-theme/components';
import EditableDate from '../../components/Forms/EditableDate'
import EditableText from '../../components/Forms/EditableText'
import EditableDollar from '../../components/Forms/EditableDollar'
import Validate from '../../components/Validate/Validate'
import { Image } from 'react-native'
import { API, Auth, Analytics } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import JCComponent from '../../components/JCComponent/JCComponent';
import moment from 'moment';
import data from './course.json';

interface Props {
  navigation: any
  route: any
}
interface State {
  showMap: boolean
  loadId: string
  data: any
  createNew: boolean
  canSave: boolean
  canLeave: boolean
  canJoin: boolean
  isEditable: boolean
  canDelete: boolean
  validationError: string
  canGotoActiveCourse: boolean
}



export default class CourseScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.route.params.id,
      createNew: props.route.params.create === "true" || props.route.params.create === true ? true : false,
      data: null,
      canSave: true,
      canLeave: false,
      canJoin: false,
      isEditable: true,
      canDelete: true,
      validationError: "",
      canGotoActiveCourse: true
    }
    this.setInitialData(props)
  }

  setInitialData(props: Props): void {
    if (props.route.params.create === "true" || props.route.params.create === true)
      Auth.currentAuthenticatedUser().then((user: any) => {
        const z: CreateGroupInput = {
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
          ownerOrgID: "00000000-0000-0000-0000-000000000000"
          //   organizerUser: { name: "" },
          //   instructors: [],
          //   course: []
        }
        this.setState({ data: z })
      })
    else {
      const getGroup: any = API.graphql({
        query: queries.getGroup,
        variables: { id: props.route.params.id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      const processResults = (json) => {
        this.setState({ data: json.data.getGroup })
      }
      getGroup.then(processResults).catch(processResults)
    }
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    const validation: any = Validate.Course(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }
  createNew(): void {
    if (this.validate()) {
      const createGroup: any = API.graphql({
        query: mutations.createGroup,
        variables: { input: this.state.data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      createGroup.then((json: any) => {
        this.setState({ canDelete: true, canSave: true, createNew: false })
        console.log({ "Success mutations.createGroup": json });
      }).catch((err: any) => {
        console.log({ "Error mutations.createGroup": err });
      });
    }
  }
  clean(item): void {
    delete item.members
    delete item.messages
    delete item.organizerGroup
    delete item.organizerUser
    delete item.instructors
    delete item._deleted
    delete item._lastChangedAt
    delete item.createdAt
    delete item.updatedAt
    return item
  }
  save(): void {
    if (this.validate()) {
      const updateGroup: any = API.graphql({
        query: mutations.updateGroup,
        variables: { input: this.clean(this.state.data) },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      updateGroup.then((json: any) => {
        this.setState({ canDelete: true, canSave: true, createNew: false })
        console.log({ "Success mutations.updateGroup": json });
      }).catch((err: any) => {
        console.log({ "Error mutations.updateGroup": err });
      });
    }

  }
  leave(): void {
    Analytics.record({
      name: 'leftCourse',
      // Attribute values must be strings
      attributes: { id: this.state.data.id, name: this.state.data.name }
    });
  }
  join(): void {
    Analytics.record({
      name: 'joinedCourse',
      // Attribute values must be strings
      attributes: { id: this.state.data.id, name: this.state.data.name }
    });
  }
  gotoActiveCourse(): void {
    //console.log(this.props.navigation)
    this.props.navigation.push("CourseHomeScreen", { id: this.state.data.id, create: false })
  }
  delete(): void {
    const deleteGroup: any = API.graphql({
      query: mutations.deleteGroup,
      variables: { input: { id: this.state.data.id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    deleteGroup.then((json: any) => {
      console.log({ "Success mutations.deleteGroup": json });
      this.props.navigation.push("HomeScreen")
    }).catch((err: any) => {
      console.log({ "Error mutations.deleteGroup": err });
    });
  }
  updateValue(field: any, value: any): void {
    const temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  render(): React.ReactNode {
    console.log("CourseScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme()}>
          <Container style={{ flexDirection: "row" }}>
            <CourseSidebar courseId={this.state.data.id}></CourseSidebar>
            <Container style={{ flex: 80 }}>
              <Container style={{ backgroundColor: "#F0493E", flex: 20 }}>
                <Text style={this.styles.style.fontCourseHeaderTime}>{moment(this.state.data.time).format('MMMM Do YYYY')} - {this.state.data.length}</Text>

                <EditableText onChange={(value: any) => { this.updateValue("name", value) }} placeholder="Enter Course Name" multiline={false} textStyle={this.styles.style.fontCourseHeaderBold} inputStyle={this.styles.style.groupNameInput} value={this.state.data.name} isEditable={this.state.isEditable}></EditableText>

                <Text style={this.styles.style.fontCourseHeader}>Course</Text>
                <EditableText onChange={(value: any) => { this.updateValue("description", value) }} placeholder="Enter Course Description" multiline={true} textStyle={this.styles.style.fontCourseHeaderDescription} inputStyle={this.styles.style.groupDescriptionInput} value={this.state.data.description} isEditable={this.state.isEditable}></EditableText>
              </Container>
              <Container style={{ flex: 80 }}>
                <Content style={{ flex: 80 }}>
                  <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                    <Container style={{ flex: 15, flexDirection: "column", justifyContent: 'flex-start' }}>

                      <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      <Text>{//this.state.data.organizerUser.name
                      }
                      </Text>
                      <Text>Publisher</Text>
                      <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }} >Contact Us</JCButton>

                      {/*this.state.data.instructors.map((item: any) => {
                    return (<Card><Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      <Text>{item.name}</Text>
                      <Text>Instructor</Text>
                      <JCButton bordered style={this.styles.style.sliderButton}><Text>Ask Question</Text></Button>
                    </Card>)
                  }
                )*/}
                    </Container>
                    <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>

                      {data.courseInfo.introduction.map((item: any, index) => {
                        return <Text key={index}>{item}</Text>
                      })}

                      <Text>Course Details</Text>


                      {data.courseDetails.map((item: any, index1) => {
                        return (
                          <Card key={index1}>
                            <Text>{item.week}</Text>
                            <Text>{item.date} - {item.leader}</Text>
                            {item.lessons.map((item2, index2) => {
                              return (
                                <Text key={index2}>{index1 + 1}.{index2 + 1} - {item2.name}</Text>
                              )
                            })}

                          </Card>
                        )
                      })}
                    </Container>
                    <Container style={{ flex: 15, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                      <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }} >Join Course</JCButton>
                      {this.state.canJoin ?
                        <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.join() }} >Join Course</JCButton> :
                        null
                      }
                      {this.state.canLeave ?
                        <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.leave() }} >Leave Course</JCButton> :
                        null
                      }
                      {this.state.createNew ?
                        <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.createNew() }}>Create Course</JCButton>
                        : null
                      }
                      {this.state.canSave ?
                        <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.save() }}>Save Course</JCButton>
                        : null
                      }
                      {this.state.canDelete ?
                        <JCButton buttonType={ButtonTypes.Outline} onPress={() => { if (window.confirm('Are you sure you wish to delete this course?')) this.delete() }} >Delete Course</JCButton>
                        : null
                      }
                      {this.state.canGotoActiveCourse ?
                        <JCButton buttonType={ButtonTypes.Outline} onPress={() => this.gotoActiveCourse()} >Go to Course</JCButton>
                        : null
                      }
                      <EditableDate type="date" onChange={(value: any) => { this.updateValue("time", value) }} placeholder="Enter Course Start Date" multiline={false} textStyle={this.styles.style.fontRegular} inputStyle={this.styles.style.groupNameInput} value={this.state.data.time} isEditable={this.state.isEditable}></EditableDate>
                      <EditableText onChange={(value: any) => { this.updateValue("length", value) }} placeholder="Enter Course Length" multiline={false} textStyle={this.styles.style.fontRegular} inputStyle={this.styles.style.groupNameInput} value={this.state.data.length} isEditable={this.state.isEditable}></EditableText>
                      <EditableText onChange={(value: any) => { this.updateValue("effort", value) }} placeholder="Enter Course Effort" multiline={false} textStyle={this.styles.style.fontRegular} inputStyle={this.styles.style.groupNameInput} value={this.state.data.effort} isEditable={this.state.isEditable}></EditableText>
                      <EditableDollar onChange={(value: any) => { this.updateValue("cost", value) }} placeholder="Enter Course Cost" multiline={false} textStyle={this.styles.style.fontRegular} inputStyle={this.styles.style.groupNameInput} value={this.state.data.cost} isEditable={this.state.isEditable}></EditableDollar>
                      <Text>{this.state.validationError}</Text>

                    </Container>
                  </Container>

                </Content>
              </Container>
            </Container>
          </Container>

        </StyleProvider>
        :
        null

    );
  }
}
