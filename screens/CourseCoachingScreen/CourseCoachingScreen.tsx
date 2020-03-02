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
                        <Agenda
                          // The list of items that have to be displayed in agenda. If you want to render item as empty date
                          // the value of date key has to be an empty array []. If there exists no value for date key it is
                          // considered that the date in question is not yet loaded
                          items={{
                            '2020-05-22': [{ name: 'item 1 - any js object' }],
                            '2020-05-23': [{ name: 'item 2 - any js object', height: 80 }],
                            '2020-05-24': [],
                            '2020-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
                          }}
                          loadItemsForMonth={(month) => { console.log('trigger items loading') }}
                          // Callback that fires when the calendar is opened or closed
                         // onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                          // Callback that gets called on day press
                          onDayPress={(day) => { console.log('day pressed') }}
                          // Callback that gets called when day changes while scrolling agenda list
                          onDayChange={(day) => { console.log('day changed') }}
                          // Initially selected day
                          selected={'2020-05-23'}
                          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                          minDate={'2020-05-10'}
                          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                          maxDate={'2020-05-30'}
                          // Max amount of months allowed to scroll to the past. Default = 50
                          pastScrollRange={50}
                          // Max amount of months allowed to scroll to the future. Default = 50
                          futureScrollRange={50}
                          // Specify how each item should be rendered in agenda
                         // renderItem={(item, firstItemInDay) => { return (<View><Text>test</Text></View>); }}
                          // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
                         // renderDay={(day, item) => { return (<View />); }}
                          // Specify how empty date content with no items should be rendered
                         // renderEmptyDate={() => { return (<View />); }}
                          // Specify how agenda knob should look like
                          //renderKnob={() => { return (<View />); }}
                          // Specify what should be rendered instead of ActivityIndicator
                          //renderEmptyData={() => { return (<View />); }}
                          // Specify your item comparison function for increased performance
                         // rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
                          // Hide knob button. Default = false
                          //hideKnob={true}
                          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                          markedDates={{
                            '2020-05-23': { selected: true, marked: true },
                            '2020-05-24': { marked: true },
                            '2020-05-25': { disabled: true }
                          }}
                          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
                         // disabledByDefault={true}
                          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                          onRefresh={() => console.log('refreshing...')}
                          // Set this true while waiting for new data from a refresh
                          refreshing={false}
                          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                        //  refreshControl={null}
                          // Agenda theme
                          theme={{

                            agendaDayTextColor: 'yellow',
                            agendaDayNumColor: 'green',
                            agendaTodayColor: 'red',
                            agendaKnobColor: 'blue'
                          }}
                          // Agenda container style
                          
                        >

                        </Agenda> 
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
