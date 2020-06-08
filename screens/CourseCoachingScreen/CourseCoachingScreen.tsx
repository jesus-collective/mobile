import React from 'react';
import { Icon, Picker, StyleProvider, Container, Content } from 'native-base';
import { Text } from 'react-native'
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'
import getTheme from '../../native-base-theme/components';

import Validate from '../../components/Validate/Validate'
import { Image } from 'react-native'
import { API } from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import CourseHeader from '../../components/CourseHeader/CourseHeader';
import JCComponent from '../../components/JCComponent/JCComponent';
import data from '../CourseOverviewScreen/course.json';

interface Props {
  navigation: any
  route: any
}
interface State {
  showMap: boolean
  loadId: string
  data: any
  isEditable: boolean
  validationError: string
}



export default class CourseScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.route.params.id,
      data: null,
      isEditable: true,
      validationError: ""
    }
    this.setInitialData(props)
  }

  setInitialData(props: Props): void {

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
  openHome = (): void => {
    this.props.navigation.push("HomeScreen");
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    const validation: any = Validate.Course(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }

  updateValue(field: any, value: any): void {
    const temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  render(): React.ReactNode {

    //console.log(acc)
    console.log("CourseScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme()}>
          <Container style={{ flexDirection: "row" }}>
            <CourseSidebar courseId={this.state.data.id}></CourseSidebar>
            <Container style={{ flex: 85 }}>
              <CourseHeader courseData={data} groupData={this.state.data}></CourseHeader>


              <Content style={{ flex: 80 }}>
                <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                  <Container style={{ flex: 70, flexDirection: "column", justifyContent: 'flex-start' }}>
                    <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                    <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Book a Call</JCButton>
                    <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Send Message</JCButton>
                    <Text>Hi </Text>
                    <Text>For your journey in leadership formation, I’d like to invite you to our bi-weekly coaching sessions where we can connect and discuss issues in more details. Let’s schedule our Coaching Calls - talk soon!

                    Thanks!
- Jon</Text>
                    <Container>
                      <Text>Schedule your</Text>
                      <Text>30 Minute Coaching Call</Text>

                      <Container style={{ flexDirection: "row" }}>
                        <Container style={{ flex: 50 }}>
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
                        <Container style={{ flex: 50 }}>
                          <Text>Please confirm</Text>
                          <Text>you’re going to schedule coaching call with Jon Hand.</Text>
                          <Text>30 minutes</Text>
                          <Text>Monday, August 23  -  1:30 PM – 2:00 PM</Text>
                          <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Yes, schedule call</JCButton>
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
