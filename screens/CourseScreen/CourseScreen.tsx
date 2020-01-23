import React from 'react';
import { StyleProvider,Card, Container, Content, Text, Button } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyConversations from '../../components/MyConversations/MyConversations';
import MyEvents from '../../components/MyEvents/MyEvents';
import MyGroups from '../../components/MyGroups/MyGroups';
import MyResources from '../../components/MyResources/MyResources';
import MyPeople from '../../components/MyPeople/MyPeople';
import MyOrganizations from '../../components/MyOrganizations/MyOrganizations';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import { NavigationScreenProp } from 'react-navigation';
import { Image } from 'react-native'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {
  showMap: boolean
}


export default class CourseScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      showMap: false
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  item = {
    "type": "course",
    "name": "Leadership Formation",
    "description": "Personal Development With Hands On Practical Learning. All In a Facilitated And Peer Learning Environment.",
    "time": "01 Aug - 12 Sep",
    "length":"6 weeks",
    "effort":"4-6 hours/week",
    "cost":"Free",
    "location": "Calgary Community Center",
    "organizer": {
      "name": "Jesus Collective",
      "image": "../../assets/profile-placeholder.png"
    },
    "memberCount": 60,
    "instructors": [
      {
        "name": "Dave Smith",
        "image": "../../assets/profile-placeholder.png"
      },
      {
        "name": "Ed Teach",
        "image": "../../assets/profile-placeholder.png"
      }
    ],
    "members": [
      {
        "name": "Dave Smith",
        "image": "../../assets/profile-placeholder.png"
      },
      {
        "name": "Dave Smith",
        "image": "../../assets/profile-placeholder.png"
      },
      {
        "name": "Dave Smith",
        "image": "../../assets/profile-placeholder.png"
      }
    ],
    "summary": "Congratulations! You’ve taken the first step to understanding the Leadership in church environment. We urge you to immerse yourself in the experience and explore all the resources curated for you. About this course This is six-week program that will prepare on your journey as a church leader. We’ll explore different topics and interact with other members to form unique learning experience. Week 1: Focus on understanding the basics Week 2: How to communicate Week 3: Explore different topics and issues that church faces today Week 4: Practical examples and interaction Week 5: How to solve conflicts Week 6: Servant leadership Course runs every day over the period of six weeks. You’re being updated on a daily basis and all assigments are scheduled ahead. All participants are grouped in cohorts units usaully of 12 people and divided into smaller triads groups of 3 people. Participants engage deeply around content in a cohort experience that helps them to integrate new understandings into the practice of their current ministry context.  At the end of the 6 week intensive, participants then practice their new learning in their church leadership roles, and our desire is that they would come back for another intensive experience or opt into the longer developmental cohort. What other people say “ Arcu bibendum at varius vel pharetra vel. Dui vivamus arcu felis bibendum. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.” Rena Chiu “ Arcu bibendum at varius vel pharetra vel. Dui vivamus arcu felis bibendum” Rena Chiu “ Arcu bibendum at varius vel pharetra vel. Dui vivamus arcu felis bibendum. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.” Rena Chiu",
    "course": [
      {
        "week": 1,
        "name": "Understanding the basics",
        "sections": [
          {
            "section": 1,
            "name": "Introduction into the topic"
          },
          {
            "section": 2,
            "name": "Basic principles that we use"
          },
        ]
      },
      {
        "week": 2,
        "name": "Understanding the basics",
        "sections": [
          {
            "section": 1,
            "name": "Introduction into the topic"
          },
          {
            "section": 2,
            "name": "Basic principles that we use"
          },
        ]
      }
    ]
  }
  render() {
    console.log("EventScreen")
    return (
      <StyleProvider style={getTheme(material)}>

      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <MyMap visible={this.state.showMap}></MyMap>
        <Content style={{ backgroundColor:"#F0493E", flex: 20 }}>
          <Text style={styles.fontCourseHeaderTime}>{this.item.time} - {this.item.length}</Text>
          <Text style={styles.fontCourseHeaderBold}>{this.item.name}</Text>
          <Text style={styles.fontCourseHeader}>Course</Text>
          <Text style={styles.fontCourseHeaderDescription}>{this.item.description}</Text>
        </Content>
        <Content style={{ flex: 80 }}>
          <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
            <Container style={{ flex: 15, flexDirection: "column", justifyContent: 'flex-start' }}>

              <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
              <Text>{this.item.organizer.name}</Text>
              <Text>Publisher</Text>
              <Button bordered style={styles.sliderButton}><Text>Contact Us</Text></Button>

              {this.item.instructors.map((item: any) => {
                return (<Card><Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                  <Text>{item.name}</Text>
                  <Text>Instructor</Text>
                  <Button bordered style={styles.sliderButton}><Text>Ask Question</Text></Button>
                </Card>)
              }
              )}
            </Container>
            <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <Text>{this.item.summary}</Text>
              <Text>Course Details</Text>
              {this.item.course.map((item) => {
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
               <Text>{this.item.time}</Text>
               <Text>{this.item.length}</Text>
               <Text>{this.item.effort}</Text>
               <Text>{this.item.cost}</Text>
            </Container>
          </Container>
        </Content>
      </Container>
</StyleProvider>

    );
  }
}
