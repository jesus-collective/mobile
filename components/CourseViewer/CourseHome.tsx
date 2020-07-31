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
                      <Container style={{ flex: 80, display: "flex", flexDirection: "row", justifyContent: 'flex-start', paddingLeft: '5%' }}>
                        <Container style={{ flex: 70, flexDirection: "column", justifyContent: 'flex-start' }}>
                          <Container style={{ flexDirection: 'row' }}>
                            <Container style={{ flexDirection: 'column', marginTop: 30, flex: 20 }}>
                              <Image style={{ margin: 0, padding: 0, width: 110, height: 136, marginBottom: 20, marginLeft: '15%' }} source={require("../../assets/profile-placeholder.png")} />
                              <JCButton onPress={() => { null }} buttonType={ButtonTypes.CourseHome}>Book a Call</JCButton>
                              <JCButton onPress={() => { null }} buttonType={ButtonTypes.TransparentBoldOrange}>Send Message</JCButton>
                            </Container>
                            <Container style={{ flex: 80 }}>
                            <Text style={{ marginTop: 30, marginLeft: 30, marginRight: 30, fontFamily: 'Graphik-Regular-App', fontSize: 20, lineHeight: 30 }}>Welcome Message</Text>
                            </Container>
                          </Container>
                          <Container style={{ marginTop: 150 }}>
                          {state.courseData ?
                            <EditableRichText onChange={(val) => { actions.updateCourse("introduction", val) }}
                              value={state.courseData.introduction}
                              isEditable={true}
                              textStyle=""></EditableRichText> : null}
                          <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 25 }}>Instructor:</Text>
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
                            {state.courseData ?
                              <EditableFileUpload
                                textStyle={null}
                                inputStyle={null}
                                attachment={state.courseData.sylabusAttachment}
                                isEditable={state.isEditable}
                                attachmentName={state.courseData.sylabusAttachmentName}
                                onChange={(obj) => {
                                  console.log({ "attachmentName": obj.attachmentName, "attachment": obj.attachment })
                                  if (obj.attachmentName != undefined) actions.updateCourse("sylabusAttachmentName", obj.attachmentName)
                                  if (obj.attachment != undefined) actions.updateCourse("sylabusAttachment", obj.attachment)
                                }}>

                              </EditableFileUpload>
                              : null}

                          </Card>
                          {state.isEditable ?
                            (<>
                              {state.courseData?.triads?.items.map((item, index) => {
                                <Card>
                                  <Text>Coach</Text>
                                  <EditableUsers
                                    limit={1}
                                    onChange={(value: any[]) => { actions.updateTriad(index, "coach", value) }}
                                    multiline={false}
                                    data-testid="profile-currentRole"
                                    showProfileImages={true}
                                    textStyle={this.styles.style.fontFormSmallDarkGrey}
                                    inputStyle={this.styles.style.fontFormLargeInput}
                                    value={item.coach} isEditable={true}></EditableUsers>

                                  <Text>Triad</Text>
                                  <EditableUsers
                                    limit={3}
                                    onChange={(value: any[]) => { actions.updateTriad(index, "triad", value) }}
                                    multiline={false}
                                    data-testid="profile-currentRole"
                                    showProfileImages={true}
                                    textStyle={this.styles.style.fontFormSmallDarkGrey}
                                    inputStyle={this.styles.style.fontFormLargeInput}
                                    value={item.triad} isEditable={true}></EditableUsers>
                                  <TouchableOpacity onPress={() => { actions.deleteTriad(index) }}>
                                    <AntDesign name="close" size={20} color="black" />
                                  </TouchableOpacity>
                                </Card>
                              })
                              }
                              <TouchableOpacity onPress={() => { actions.createTriad() }}>
                                < Card ><Text>Add Triad</Text></Card>
                              </TouchableOpacity>
                            </>)
                            : (<>
                              <Text>My Coach</Text>
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
                              <Text>My Triad</Text>
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
