import React from 'react';
import { Icon, Picker, Accordion, StyleProvider, Card, Container, Content, Text, Button } from 'native-base';
import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import EditableText from '../../components/Editable/EditableText'
import Validate from '../../components/Validate/Validate'
import { Image, View } from 'react-native'
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
    var processResults=(json) => {
      this.setState({ data: json.data.getGroup })
    }
    getGroup.then(processResults).catch(processResults)
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
                    <Text>For your journey in leadership formation, I’d like to invite you to our bi-weekly coaching sessions where we can connect and discuss issues in more details. Let’s schedule our Coaching Calls - talk soon!

Thanks!
- Jon</Text>
                    <Container>
                      <Text>Schedule your</Text>
                      <Text>30 Minute Coaching Call</Text>
                     
                      <Container style={{ flexDirection: "row" }}>
                      <Container style={{flex:50}}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your Coach"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"

                      >
                        {//   selectedValue={this.state.selected2}
                          // onValueChange={this.onValueChange2.bind(this)}
                        }
                        <Picker.Item label="Jon Hand" value="key0" />

                      </Picker>
                       
                         </Container>
                        <Container style={{flex:50}}>
                          <Text>Please confirm</Text>
                          <Text>you’re going to schedule coaching call with Jon Hand.</Text>
                          <Text>30 minutes</Text>
                          <Text>Monday, August 23  -  1:30 PM – 2:00 PM</Text>
                          <Button><Text>Yes, schedule call</Text></Button>
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                  <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>


                  </Container>
                </Container>
              </Content>
            </Container>
          </Container>
        </StyleProvider>
        :
        null

    );
  }
}
