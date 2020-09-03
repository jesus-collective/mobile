import React from 'react';
import { StyleProvider, Card, Container, Content } from 'native-base';
import { Body, Left, Right, CardItem, Button } from 'native-base';
import ProfileImage from '../../components/ProfileImage/ProfileImage'

import { Text, View } from 'react-native'
import JCButton, { ButtonTypes } from '../Forms/JCButton'

import getTheme from '../../native-base-theme/components';

import CourseHeader from '../CourseHeader/CourseHeader';
import { Calendar } from 'react-native-calendars';
import JCComponent from '../JCComponent/JCComponent';
import EditableUsers from '../../components/Forms/EditableUsers'

import { useRoute, useNavigation } from '@react-navigation/native';
import { CourseContext } from './CourseContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EditableRichText from '../../components/Forms/EditableRichText';
import EditableFileUpload from '../../components/Forms/EditableFileUpload';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  navigation?: any
  route?: any
}


class CourseHomeImpl extends JCComponent<Props>{
  constructor(props: Props) {
    super(props);
  }

  openConversation(initialUser: string, name: string): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", { initialUserID: initialUser, initialUserName: name });
  }
  showProfile(id: string): void {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false });
  }
  static Consumer = CourseContext.Consumer;
  renderProfileCard(user): React.ReactNode {
    if (user)
      return (
        <TouchableOpacity key={user.id} onPress={() => { this.showProfile(user.id) }}>
          <Card style={this.styles.style.courseConversationCard}>
            <CardItem>
              <Left style={this.styles.style.courseHomeConversationCard}>
                <ProfileImage user={user} size='large' style='my-people'>
                </ProfileImage>

                <Body style={this.styles.style.dashboardConversationBody}>
                  <Text style={this.styles.style.courseFontConnectWithName}>{user.given_name} {user.family_name}</Text>
                  <Text style={this.styles.style.fontConnectConversation}>{user.currentRole}</Text>
                  <Button bordered style={this.styles.style.courseHomeConversationButton} onPress={() => { this.openConversation(user.id, user.given_name + " " + user.family_name) }}><Text style={this.styles.style.courseFontStartConversation}>Start Conversation</Text></Button>
                  <Button bordered style={this.styles.style.courseHomeConversationButton} onPress={() => { this.openConversation(user.id, user.given_name + " " + user.family_name) }}><Text style={this.styles.style.courseFontStartConversation}>Book Call</Text></Button>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </TouchableOpacity>
      )
    else null
  }
  render(): React.ReactNode {

    console.log("CourseHome")
    return (

      <CourseHomeImpl.Consumer>
        {({ state, actions }) => {
          console.log(state.isEditable && state.editMode)
          const instructors = state.courseData?.instructors?.items.map((item) => { return item.user })
          return (
            state.data && state.currentScreen == "Home" ?
              <StyleProvider style={getTheme()}>

                <Container style={this.styles.style.courseHomeMainContainer}>
                  <CourseHeader groupData={state.data}></CourseHeader>
                  <Container style={{ flex: 80 }}>
                    <Content contentContainerStyle={{ flex: 80 }} style={{ flex: 80 }}>
                      <Container style={{ flex: 80, display: "flex", flexDirection: "row", justifyContent: 'flex-start', paddingLeft: '5%' }}>

                        <Container style={this.styles.style.courseHomeLeftContainer}>
                          <Container style={this.styles.style.courseHomeSyllabusContainer}>
                            <Container style={this.styles.style.courseProfileImageButtonsContainer}>
                              <ProfileImage user={state.courseData?.instructors?.items[0]?.user} size='medium' style='courseProfile'>

                              </ProfileImage>

                              <Text style={this.styles.style.courseFontConnectWithName}>{state.courseData?.instructors?.items[0]?.user?.given_name} {state.courseData?.instructors?.items[0]?.user?.family_name}</Text>
                              <Text style={this.styles.style.courseFontConnectConversation}>{state.courseData?.instructors?.items[0]?.user?.currentRole}</Text>
                              <JCButton onPress={() => { null }} buttonType={ButtonTypes.CourseHome}>Book a Call</JCButton>
                              <JCButton onPress={() => { this.openConversation(state.courseData?.instructors?.items[0]?.user?.id, state.courseData?.instructors?.items[0]?.user?.given_name + " " + state.courseData.instructors?.items[0]?.user?.family_name) }} buttonType={ButtonTypes.CourseTransparentBoldOrange}>Send Message</JCButton>
                            </Container>
                            <Container style={this.styles.style.courseHomeMainTextContainer}>
                              <Text style={this.styles.style.courseHomeDescriptionText}>
                                {state.courseData ?
                                  <EditableRichText onChange={(val) => { actions.updateCourse("introduction", val) }}
                                    value={state.courseData.introduction}
                                    isEditable={state.isEditable && state.editMode}
                                    textStyle=""></EditableRichText> : null}

                              </Text>
                            </Container>
                          </Container>

                          <Container style={{ paddingTop: 40 }}>
                            <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 0, width: '90%' }}>Syllabus</Text>
                            <Card style={this.styles.style.courseHomeFileCard}>
                              {state.courseData ?
                                <EditableFileUpload
                                  textStyle={null}
                                  inputStyle={null}
                                  attachment={state.courseData.sylabusAttachment}
                                  isEditable={state.isEditable && state.editMode}
                                  attachmentName={state.courseData.sylabusAttachmentName}
                                  onChange={(obj) => {
                                    console.log({ "attachmentName": obj.attachmentName, "attachment": obj.attachment })
                                    if (obj.attachmentName != undefined) actions.updateCourse("sylabusAttachmentName", obj.attachmentName)
                                    if (obj.attachment != undefined) actions.updateCourse("sylabusAttachment", obj.attachment)
                                  }}>

                                </EditableFileUpload>
                                : null}
                            </Card>
                            {}
                            {state.editMode ?
                              <>
                                <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 70, width: '90%' }}>User Setup</Text>
                                <Card style={this.styles.style.courseHomeUserEditCard}>

                                  <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 0 }}>Instructor:</Text>

                                  <EditableUsers
                                    limit={1}
                                    onChange={(value: any[]) => { actions.updateInstructors(value) }}
                                    multiline={false}
                                    data-testid="profile-currentRole"
                                    showProfileImages={true}
                                    textStyle={this.styles.style.fontFormSmallDarkGrey}
                                    inputStyle={this.styles.style.fontFormLargeInput}
                                    value={instructors ? instructors : []} isEditable={true}></EditableUsers>


                                  {state.isEditable ?
                                    (<>
                                      <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 30 }}>Learning Groups:</Text>

                                      {state.courseData?.triads?.items.map((item, index) => {
                                        const coaches = item.coaches.items.map((item) => { return item.user })
                                        const users = item.users.items.map((item) => { return item.user })
                                        console.log(item)
                                        console.log(coaches)
                                        console.log(users)
                                        return (
                                          <Card key={index} style={{}}>
                                            <CardItem>
                                              <Left>
                                                <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 20 }}>Facilitator</Text>
                                              </Left>
                                              <Right>
                                                <TouchableOpacity style={this.styles.style.courseHomeDeleteTriad} onPress={() => { actions.deleteTriad(index) }}>
                                                  <AntDesign name="close" size={23} color="white" />
                                                </TouchableOpacity>
                                              </Right>
                                            </CardItem>
                                            <CardItem>
                                              <EditableUsers
                                                limit={1}
                                                onChange={(value: any[]) => { actions.updateTriadCoaches(index, value) }}
                                                multiline={false}
                                                data-testid="profile-currentRole"
                                                showProfileImages={true}
                                                textStyle={this.styles.style.fontFormSmallDarkGrey}
                                                inputStyle={this.styles.style.fontFormLargeInput}
                                                value={coaches ? coaches : []} isEditable={true}></EditableUsers>
                                            </CardItem>
                                            <CardItem>
                                              <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 30 }}>Learning Group</Text>
                                            </CardItem>
                                            <CardItem>
                                              <EditableUsers
                                                limit={3}
                                                onChange={(value: any[]) => { actions.updateTriadUsers(index, value) }}
                                                multiline={false}
                                                data-testid="profile-currentRole"
                                                showProfileImages={true}
                                                textStyle={this.styles.style.fontFormSmallDarkGrey}
                                                inputStyle={this.styles.style.fontFormLargeInput}
                                                value={users ? users : []} isEditable={true}></EditableUsers>
                                            </CardItem>
                                          </Card>
                                        )
                                      })
                                      }
                                      <TouchableOpacity style={{ marginTop: 30 }} onPress={() => { actions.createTriad() }}>
                                        <Card><Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App', paddingLeft: 5, paddingTop: 6, paddingBottom: 6 }}>Add Learning Group</Text></Card>
                                      </TouchableOpacity>
                                    </>)
                                    : (null)
                                  }

                                </Card>
                              </>
                              :
                              <>
                                <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 70, width: '90%' }}>My Facilitator</Text>
                                {
                                  actions.myCourseGroups().coach ?
                                    actions.myCourseGroups().coach.map((user) => {
                                      return this.renderProfileCard(user)
                                    })
                                    :
                                    <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App', marginTop: 70, width: '90%' }}>You have not been assigned a facilitator yet</Text>
                                }
                                <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 70, width: '90%' }}>My Learning Group</Text>
                                {
                                  actions.myCourseGroups().triad ?
                                    actions.myCourseGroups().triad.map((user) => {
                                      return this.renderProfileCard(user)
                                    }) :
                                    <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App', marginTop: 70, width: '90%' }}>You have not been assigned a learning group yet</Text>
                                }
                                <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 70, width: '90%' }}>My Cohort</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                  {
                                    actions.myCourseGroups().cohort ?
                                      actions.myCourseGroups().cohort.map((user) => {
                                        return this.renderProfileCard(user)
                                      })
                                      :
                                      <Text>You have not been assigned a learning group yet</Text>
                                  }
                                </View>
                              </>
                            }
                          </Container>
                        </Container>
                        <Container style={this.styles.style.courseHomeRightContainer}>

                          <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 30, width: '90%' }}>To-Do</Text>
                          <Card style={this.styles.style.courseHomeCoachingCard}>
                            <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App' }}>Call with {state.coachName}</Text>
                          </Card>

                          <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 50, width: '90%' }}>My Calendar</Text>
                          <Calendar style={this.styles.style.courseHomeCalendar}
                            // Collection of dates that have to be marked. Default = {}
                            current={'2020-05-01'}
                            markedDates={{
                              '2020-05-16': { selected: true, marked: true, selectedColor: 'blue' },
                              '2020-05-17': { marked: true },
                              '2020-05-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                              '2020-05-19': { disabled: true, disableTouchEvent: true }
                            }}
                          />
                          <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 50, width: '90%' }}>Course Activity</Text>
                          <Container style={this.styles.style.CourseHomeActivityContainer}>
                            <JCButton buttonType={state.activeCourseActivity == "today" ? ButtonTypes.TransparentActivityCourse : ButtonTypes.courseActivityTransparentRegularBlack} onPress={() => { actions.setActiveCourseActivity("today") }}>Today</JCButton>
                            <JCButton buttonType={state.activeCourseActivity == "yesterday" ? ButtonTypes.TransparentActivityCourse : ButtonTypes.courseActivityTransparentRegularBlack} onPress={() => { actions.setActiveCourseActivity("yesterday") }}>Yesterday</JCButton>
                            <JCButton buttonType={state.activeCourseActivity == "thisweek" ? ButtonTypes.TransparentActivityCourse : ButtonTypes.courseActivityTransparentRegularBlack} onPress={() => { actions.setActiveCourseActivity("thisweek") }}>This Week</JCButton>
                          </Container>

                          <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App', marginTop: 15 }}>Adam posted assignement to review</Text>
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
