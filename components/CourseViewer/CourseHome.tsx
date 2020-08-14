import React from 'react';
import { StyleProvider, Card, Container, Content } from 'native-base';
import { Body, Left, CardItem, Button } from 'native-base';
import ProfileImage from '../../components/ProfileImage/ProfileImage'

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
    return (
      <TouchableOpacity key={user.id} onPress={() => { this.showProfile(user.id) }}>
        <Card style={this.styles.style.dashboardConversationCard}>
          <CardItem>
            <Left style={this.styles.style.courseHomeConversationCard}>
              <ProfileImage user={user} size='large' style='my-people'>
              </ProfileImage>

              <Body style={this.styles.style.dashboardConversationBody}>
                <Text style={this.styles.style.fontConnectWithName}>{user.given_name} {user.family_name}</Text>
                <Text style={this.styles.style.fontConnectConversation}>{user.currentRole}</Text>
                <Button bordered style={this.styles.style.courseHomeConversationButton} onPress={() => { this.openConversation(user.id, user.given_name + " " + user.family_name) }}><Text style={this.styles.style.courseFontStartConversation}>Start Conversation</Text></Button>
                <Button bordered style={this.styles.style.courseHomeConversationButton} onPress={() => { this.openConversation(user.id, user.given_name + " " + user.family_name) }}><Text style={this.styles.style.courseFontStartConversation}>Book Call</Text></Button>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
  render(): React.ReactNode {

    console.log("CourseHome")
    return (

      <CourseHomeImpl.Consumer>
        {({ state, actions }) => {
          console.log(state.isEditable && state.editMode)
          return (
            state.data && state.currentScreen == "Home" ?
              <StyleProvider style={getTheme()}>

                <Container style={{ flex: 85 }}>
                  <CourseHeader groupData={state.data}></CourseHeader>
                  <Container style={{ flex: 80 }}>
                    <Content contentContainerStyle={{ flex: 80 }} style={{ flex: 80 }}>
                      <Container style={{ flex: 80, display: "flex", flexDirection: "row", justifyContent: 'flex-start', paddingLeft: '5%' }}>
                        <Container style={{ flex: 70, flexDirection: "column", justifyContent: 'flex-start' }}>
                          <Container style={{ flexDirection: 'row' }}>
                            <Container style={{ flexDirection: 'column', marginTop: 30, flex: 20 }}>
                              <ProfileImage user={state.instructor} size='medium' style='my-people'>
                              </ProfileImage>

                              <Text style={this.styles.style.fontConnectWithName}>{state.instructor?.given_name} {state.instructor?.family_name}</Text>
                              <Text style={this.styles.style.fontConnectConversation}>{state.instructor?.currentRole}</Text>
                              <JCButton onPress={() => { null }} buttonType={ButtonTypes.CourseHome}>Book a Call</JCButton>
                              <JCButton onPress={() => { this.openConversation(state.instructor?.id, state.instructor?.given_name + " " + state.instructor?.family_name) }} buttonType={ButtonTypes.TransparentBoldOrange}>Send Message</JCButton>
                            </Container>
                            <Container style={{ flex: 80, height: 200, marginRight: 50 }}>
                              <Text style={{ marginTop: 30, marginLeft: 30, marginRight: 30, fontFamily: 'Graphik-Regular-App', fontSize: 20, lineHeight: 30 }}>
                                {state.courseData ?
                                  <EditableRichText onChange={(val) => { actions.updateCourse("introduction", val) }}
                                    value={state.courseData.introduction}
                                    isEditable={state.isEditable && state.editMode}
                                    textStyle=""></EditableRichText> : null}

                              </Text>
                            </Container>
                          </Container>

                          <Container style={{}}>
                            <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 0, width: '90%' }}>Syllabus</Text>
                            <Card style={{ width: '90%', borderColor: '#FFFFFF', paddingLeft: 30, paddingRight: 30, boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: 30, paddingTop: 30, paddingBottom: 30 }}>
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
                            {state.editMode ?
                              <>
                                <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 70, width: '90%' }}>User Setup</Text>
                                <Card style={{ width: '90%', borderColor: '#FFFFFF', paddingLeft: 30, paddingRight: 30, boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: 30, paddingTop: 30, paddingBottom: 30 }}>

                                  <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 0 }}>Instructor:</Text>
                                  <EditableUsers
                                    limit={1}
                                    onChange={(value: any[]) => { actions.updateCourse("instructor", value) }}
                                    multiline={false}
                                    data-testid="profile-currentRole"
                                    showProfileImages={true}
                                    textStyle={this.styles.style.fontFormSmallDarkGrey}
                                    inputStyle={this.styles.style.fontFormLargeInput}
                                    value={state.instructor} isEditable={true}></EditableUsers>


                                  {state.isEditable ?
                                    (<>
                                      <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 30 }}>Triads:</Text>

                                      {state.courseData?.triads?.items.map((item, index) => {
                                        const coaches = item.coaches.items.map((item) => { return item.user })
                                        const users = item.users.items.map((item) => { return item.user })
                                        console.log(item)
                                        console.log(coaches)
                                        console.log(users)
                                        return (
                                          <Card key={index} style={{ borderColor: '#FFFFFF' }}>
                                            <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 20 }}>Coach</Text>
                                            <EditableUsers
                                              limit={1}
                                              onChange={(value: any[]) => { actions.updateTriadCoaches(index, value) }}
                                              multiline={false}
                                              data-testid="profile-currentRole"
                                              showProfileImages={true}
                                              textStyle={this.styles.style.fontFormSmallDarkGrey}
                                              inputStyle={this.styles.style.fontFormLargeInput}
                                              value={coaches ? coaches : []} isEditable={true}></EditableUsers>
                                            <TouchableOpacity style={{ backgroundColor: '#F0493E', width: '20%', marginTop: 10, borderRadius: 5, height: 30, justifyContent: 'center', alignItems: 'center', boxShadow: '0px' }} onPress={() => { actions.deleteTriad(index) }}>
                                              <AntDesign name="close" size={23} color="white" />
                                            </TouchableOpacity>

                                            <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 30 }}>Triad</Text>
                                            <EditableUsers
                                              limit={3}
                                              onChange={(value: any[]) => { actions.updateTriadUsers(index, value) }}
                                              multiline={false}
                                              data-testid="profile-currentRole"
                                              showProfileImages={true}
                                              textStyle={this.styles.style.fontFormSmallDarkGrey}
                                              inputStyle={this.styles.style.fontFormLargeInput}
                                              value={users ? users : []} isEditable={true}></EditableUsers>

                                          </Card>
                                        )
                                      })
                                      }
                                      <TouchableOpacity style={{ marginTop: 30 }} onPress={() => { actions.createTriad() }}>
                                        <Card><Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App', paddingLeft: 5, paddingTop: 6, paddingBottom: 6 }}>Add Triad</Text></Card>
                                      </TouchableOpacity>
                                    </>)
                                    : (<>
                                      <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 30 }}>My Coach</Text>
                                      <Card>
                                        <EditableUsers
                                          limit={1}
                                          onChange={(value: any[]) => { null }}
                                          multiline={false}
                                          data-testid="profile-currentRole"
                                          showProfileImages={true}
                                          textStyle={this.styles.style.fontFormSmallDarkGrey}
                                          inputStyle={this.styles.style.fontFormLargeInput}
                                          value={state.myTriad.coach} isEditable={false}></EditableUsers>
                                      </Card>
                                      <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 30 }}>My Triad</Text>
                                      <Card>
                                        <EditableUsers
                                          limit={3}
                                          onChange={(value: any[]) => { null }}
                                          multiline={false}
                                          data-testid="profile-currentRole"
                                          showProfileImages={true}
                                          textStyle={this.styles.style.fontFormSmallDarkGrey}
                                          inputStyle={this.styles.style.fontFormLargeInput}
                                          value={state.myTriad.coach} isEditable={false}></EditableUsers>
                                      </Card>
                                    </>)
                                  }
                                  {!state.isEditable ? <>
                                    <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 30 }}>My Cohort</Text>
                                    <Card>
                                      <EditableUsers
                                        limit={15}
                                        //  onChange={(value: any[]) => { actions.updateTriad({ newToList: value }) }}
                                        multiline={false}
                                        data-testid="profile-currentRole"
                                        showProfileImages={true}
                                        textStyle={this.styles.style.fontFormSmallDarkGrey}
                                        inputStyle={this.styles.style.fontFormLargeInput}
                                        value={state.cohort} isEditable={true}>
                                      </EditableUsers>
                                    </Card>
                                  </> : null}
                                </Card>
                              </>
                              :
                              <>
                                <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 70, width: '90%' }}>My Coach</Text>
                                {
                                  state.myCoach ?
                                    state.myCoach.map((user) => {
                                      return this.renderProfileCard(user)
                                    })
                                    :
                                    <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App', marginTop: 70, width: '90%' }}>You have not been assigned a coach yet</Text>
                                }
                                <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 70, width: '90%' }}>My Triad</Text>
                                {
                                  state.myTriad ?
                                    state.myTriad.map((user) => {
                                      return this.renderProfileCard(user)
                                    }) :
                                    <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App', marginTop: 70, width: '90%' }}>You have not been assigned a triad yet</Text>
                                }
                                <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 70, width: '90%' }}>My Cohort</Text>
                                {
                                  state.myCohort ?
                                    state.myCohort.map((user) => {
                                      return this.renderProfileCard(user)
                                    })
                                    :
                                    <Text>You have not been assigned a triad yet</Text>
                                }
                              </>
                            }
                          </Container>
                        </Container>
                        <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>

                          <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 30, width: '90%' }}>To-Do</Text>
                          <Card style={{ width: '90%', borderColor: '#FFFFFF', paddingLeft: 30, paddingRight: 30, boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: 15, paddingTop: 30, paddingBottom: 30 }}>
                            <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App' }}>Coaching call with {state.coachName}</Text>
                          </Card>

                          <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 50, width: '90%' }}>My Calendar</Text>
                          <Calendar style={{ width: '90%', borderColor: '#FFFFFF', paddingLeft: 60, paddingRight: 60, boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: 15, paddingTop: 20, paddingBottom: 20 }}
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
                          <JCButton onPress={() => { null }} buttonType={ButtonTypes.CourseHomeSidebarTop}>Today</JCButton>
                          <JCButton onPress={() => { null }} buttonType={ButtonTypes.CourseHome}>Yesterday</JCButton>
                          <JCButton onPress={() => { null }} buttonType={ButtonTypes.CourseHome}>This Week</JCButton>
                          <Text style={{ fontSize: 16, lineHeight: 25, fontFamily: 'Graphik-Regular-App' }}>Adam posted assignement to review</Text>
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
