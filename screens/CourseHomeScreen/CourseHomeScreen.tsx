import React from 'react';
import { Accordion, StyleProvider, Card, Container, Content, Text, Button } from 'native-base';
import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import EditableText from '../../components/Editable/EditableText'
import Validate from '../../components/Validate/Validate'
import { Image } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';
import CourseHeader from '../../components/CourseHeader/CourseHeader';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const data = require('../CourseOverviewScreen/course.json');

interface Props {
  navigation: any
}
interface State {
  showMap: boolean
  loadId: string
  data: any
  isEditable: boolean
  validationError: String
}



export default class CourseScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.navigation.state.params.id,
      data: null,
      isEditable: true,
      validationError: ""
    }
    this.setInitialData(props)
  }

  setInitialData(props) {

    var getGroup: any = API.graphql({
      query: queries.getGroup,
      variables: { id: props.navigation.state.params.id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });

    getGroup.then((json) => {
      this.setState({ data: json.data.getGroup })
    })

  }

  openHome = () => {
    this.props.navigation.push("HomeScreen");
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    var validation: any = Validate.Course(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }


  updateValue(field: any, value: any) {
    var temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  render() {

    //console.log(acc)
    console.log("CourseScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme(material)}>
          <Container style={{ flexDirection: "row" }}>
            <CourseSidebar courseId={this.state.data.id}></CourseSidebar>
            <Container style={{ flex: 85 }}>
              <CourseHeader courseData={data} groupData={this.state.data}></CourseHeader>

              <Content style={{ flex: 80 }}>
                <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                  <Container style={{ flex: 70, flexDirection: "column", justifyContent: 'flex-start' }}>
                    <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                    <Button><Text>Book a Call</Text></Button>
                    <Button><Text>Send Message</Text></Button>
                    <Text>Hi </Text>
                    <Text>I’m Jon Hand and welcome to our six-week leadership journey. I’ll be your instructor. You can go ahead and start viewing content. We will officially kick-off on Monday with our Zoom Video Call.

If there is anything that I can help you with, feel free to ask anytime. Talk soon!

Jon </Text>
                    <Text>Syllabus</Text>
                    <Card>
                      <Text>Leadership Formation Course</Text>
                      <Button><Text>Download</Text></Button>

                    </Card>
                    <Text>My Coach</Text>
                    <Card>
                      <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      <Text>Jon Hand</Text>
                      <Text>Youth Leader in Calgary Area</Text>
                      <Button><Text>View profile</Text></Button>
                    </Card>
                    <Text>My Triad</Text>
                    <Card>
                      <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      <Text>Jon Hand</Text>
                      <Text>Youth Leader in Calgary Area</Text>
                      <Button><Text>View profile</Text></Button>
                    </Card>
                    <Text>My Cohort</Text>
                    <Card>
                      <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                      <Text>Jon Hand</Text>
                      <Text>Youth Leader in Calgary Area</Text>
                      <Button><Text>View profile</Text></Button>
                    </Card>
                  </Container>
                  <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>

                    <Text>To-Do</Text>
                    <Card>
                      <Text> Coaching call with Jon Hand</Text>
                    </Card>

                    <Text>My Calendar</Text>
                    <Calendar
                      // Collection of dates that have to be marked. Default = {}
                      current={'2020-05-01'}
                      markedDates={{
                        '2020-05-16': { selected: true, marked: true, selectedColor: 'blue' },
                        '2020-05-17': { marked: true },
                        '2020-05-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                        '2020-05-19': { disabled: true, disableTouchEvent: true }
                      }}
                    />
                    <Text>Course Activity</Text>
                    <Button><Text>Today</Text></Button>
                    <Button><Text>Yesterday</Text></Button>
                    <Button><Text>This Week</Text></Button>
                    <Text>Adam posted assignement to review</Text>
                  </Container>

                </Container>
              </Content>
            </Container>
          </Container>
        </StyleProvider >
        :
        null

    );
  }
}
