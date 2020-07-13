import React from 'react';
import { StyleProvider, Card, Container, Content } from 'native-base';
import { Text } from 'react-native'
import JCButton, { ButtonTypes } from '../Forms/JCButton'

import getTheme from '../../native-base-theme/components';

import { Image } from 'react-native'
import CourseHeader from '../CourseHeader/CourseHeader';
import { Calendar } from 'react-native-calendars';
import JCComponent from '../JCComponent/JCComponent';
import EditableUsers from '../../components/Forms/EditableUsers'

import { useRoute, useNavigation } from '@react-navigation/native';
import { CourseContext } from './CourseContext';
import EditableText from '../../components/Forms/EditableText';

interface Props {
  navigation?: any
  route?: any
}


class CourseHomeImpl extends JCComponent<Props>{
  constructor(props: Props) {
    super(props);
  }
  static Consumer = CourseContext.Consumer;

  render(): React.ReactNode {

    console.log("CourseHome")
    return (

      <CourseHomeImpl.Consumer>
        {({ state, actions }) => {
          return (
            state.data && state.currentScreen == "Home" ?
              <StyleProvider style={getTheme()}>

                <Container style={{ flex: 85 }}>
                  <CourseHeader groupData={state.data}></CourseHeader>
                  <Container style={{ flex: 80 }}>
                    <Content contentContainerStyle={{ flex: 80 }} style={{ flex: 80 }}>
                      <Container style={{ flex: 80, display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                        <Container style={{ flex: 70, flexDirection: "column", justifyContent: 'flex-start' }}>
                          <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                          <JCButton onPress={() => { null }} buttonType={ButtonTypes.Outline}>Book a Call</JCButton>
                          <JCButton onPress={() => { null }} buttonType={ButtonTypes.Outline}>Send Message</JCButton>
                          <EditableText multiline={false}
                            textStyle={this.styles.style.fontCourseHeaderBold}
                            value={state.data.introduction}
                            isEditable={false}></EditableText>

                          <Text>Hi </Text>
                          <Text>I’m Jon Hand and welcome to our six-week leadership journey. I’ll be your instructor. You can go ahead and start viewing content. We will officially kick-off on Monday with our Zoom Video Call.

                          If there is anything that I can help you with, feel free to ask anytime. Talk soon!

                          Jon </Text>
                          <EditableUsers
                            limit={1}
                            onChange={(value: any[]) => { actions.updateCourse("instructor", value) }}
                            multiline={false}
                            data-testid="profile-currentRole"
                            showProfileImages={true}
                            textStyle={this.styles.style.fontFormSmallDarkGrey}
                            inputStyle={this.styles.style.fontFormLargeInput}
                            value={state.instructor} isEditable={true}></EditableUsers>
                          <Text>Syllabus</Text>
                          <Card>
                            <Text>Leadership Formation Course</Text>
                            <JCButton onPress={() => { null }} buttonType={ButtonTypes.Outline}>Download</JCButton>

                          </Card>
                          <Text>My Coach</Text>
                          <Card>
                            <EditableUsers
                              limit={1}
                              onChange={(value: any[]) => { actions.updateTriad({ coach: value }) }}
                              multiline={false}
                              data-testid="profile-currentRole"
                              showProfileImages={true}
                              textStyle={this.styles.style.fontFormSmallDarkGrey}
                              inputStyle={this.styles.style.fontFormLargeInput}
                              value={state.triad.coach} isEditable={true}></EditableUsers>
                          </Card>
                          <Text>My Triad</Text>
                          <Card>
                            <EditableUsers
                              limit={3}
                              onChange={(value: any[]) => { actions.updateTriad({ triad: value }) }}
                              multiline={false}
                              data-testid="profile-currentRole"
                              showProfileImages={true}
                              textStyle={this.styles.style.fontFormSmallDarkGrey}
                              inputStyle={this.styles.style.fontFormLargeInput}
                              value={state.triad.coach} isEditable={true}></EditableUsers>
                          </Card>
                          <Text>My Cohort</Text>
                          <Card>
                            <EditableUsers
                              limit={15}
                              //  onChange={(value: any[]) => { actions.updateTriad({ newToList: value }) }}
                              multiline={false}
                              data-testid="profile-currentRole"
                              showProfileImages={true}
                              textStyle={this.styles.style.fontFormSmallDarkGrey}
                              inputStyle={this.styles.style.fontFormLargeInput}
                              value={state.cohort} isEditable={true}></EditableUsers>
                          </Card>
                        </Container>
                        <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>

                          <Text>To-Do</Text>
                          <Card>
                            <Text>Coaching call with {state.coachName}</Text>
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
                          <JCButton onPress={() => { null }} buttonType={ButtonTypes.Outline}>Today</JCButton>
                          <JCButton onPress={() => { null }} buttonType={ButtonTypes.Outline}>Yesterday</JCButton>
                          <JCButton onPress={() => { null }} buttonType={ButtonTypes.Outline}>This Week</JCButton>
                          <Text>Adam posted assignement to review</Text>
                        </Container>

                      </Container>
                    </Content>
                  </Container>
                </Container>

              </StyleProvider > :
              null
          )
        }
        }
      </CourseHomeImpl.Consumer >


    );
  }
}

export default function CourseHome(props: Props): JSX.Element {
  const route = useRoute();
  const navigation = useNavigation()
  return <CourseHomeImpl {...props} navigation={navigation} route={route} />;
}
