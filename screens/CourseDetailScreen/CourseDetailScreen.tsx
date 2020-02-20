import React from 'react';
import { Accordion, StyleProvider, Card, Container, Content, Text, Button, Left, Right, CardItem, Body } from 'native-base';
import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import Validate from '../../components/Validate/Validate'
import { Image } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import CourseHeader from '../../components/CourseHeader/CourseHeader';
const data = require('../CourseScreen/course.json');

interface Props {
  navigation: any
}
interface State {
  showMap: boolean
  loadId: string
  data: any
  isEditable: boolean
  validationError: String
  activeWeek: any
}



export default class CourseScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.navigation.state.params.id,
      data: null,
      isEditable: true,
      validationError: "",
      activeWeek: 0
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
  setActiveWeek(index) {
    this.setState({ activeWeek: index })
  }
  render() {
    const week = data.courseDetails[this.state.activeWeek]
    console.log("CourseScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme(material)}>
          <Container style={{ flexDirection: "row" }}>
            <CourseSidebar courseId={this.state.data.id}></CourseSidebar>
            <Container style={{ flex: 85 }}>
              <CourseHeader onChangeWeek={(week) => { this.setActiveWeek(week) }} courseData={data} groupData={this.state.data}></CourseHeader>
              <Content style={{ flex: 85 }}>
                <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                  <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <Text>{week.week}</Text>
                    <Text>{week.date}</Text>
                    <Text>{week.leader}</Text>
                    {week.events.map((item) => {
                      return <Card style={{ minHeight: "40px", maxHeight: "100px", width: "80% " }}>
                        <Container style={{ flexDirection: "row" }}>
                          <Text>MON</Text>
                          <Container style={{ flexDirection: "column", minHeight: "40px", maxHeight: "80px" }}>
                            <Text>{item.name}</Text>
                            <Container style={{ flexDirection: "row", minHeight: "40px", maxHeight: "80px" }}>
                              <Text><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/time.svg')} />3 hours</Text>
                              <Text><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/document.svg')} />Assignment</Text>
                            </Container>
                          </Container>
                          <Text>Completed</Text>

                          <Text><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/checkmark.svg')} /></Text>
                        </Container>
                      </Card>
                    })}
                  </Container>
                  <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <Container style={{ flex: 5, flexDirection: "row" }}>
                      <Button transparent><Text>Cohort</Text></Button>
                      <Button transparent><Text>Triad</Text></Button>
                      <Button transparent><Text>Instructor</Text></Button>
                    </Container>
                    <Container style={{ flex: 95, flexDirection: "row" }}>
                      <MessageBoard navigation={this.props.navigation} groupId={this.state.data.id}></MessageBoard>
                    </Container>
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
