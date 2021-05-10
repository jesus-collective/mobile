import { useNavigation, useRoute } from "@react-navigation/native"
import { Card, Container, Content, Icon, Picker, StyleProvider } from "native-base"
import React from "react"
import { Image, Text } from "react-native"
import getTheme from "../../native-base-theme/components"
import CourseHeader from "../CourseHeader/CourseHeader"
import JCButton, { ButtonTypes } from "../Forms/JCButton"
import JCComponent from "../JCComponent/JCComponent"
import { CourseContext } from "./CourseContext"

interface Props {
  navigation?: any
  route?: any
}

class CourseCoachingImpl extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }
  static Consumer = CourseContext.Consumer

  render(): React.ReactNode {
    console.log("CourseCoaching")
    return (
      <CourseCoachingImpl.Consumer>
        {({ state }) => {
          if (!state) return null
          return state.data && state.currentScreen == "Coaching" ? (
            <StyleProvider style={getTheme()}>
              <Container style={{ flex: 85 }}>
                <CourseHeader groupData={state.data}></CourseHeader>

                <Container style={{ flex: 80 }}>
                  <Content style={{ flex: 80 }}>
                    <Container
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Container
                        style={{
                          flex: 70,
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          paddingLeft: "5%",
                          marginRight: 30,
                        }}
                      >
                        <Container
                          style={{
                            flexDirection: "row",
                            paddingBottom: 30,
                            paddingTop: 30,
                            marginBottom: 250,
                          }}
                        >
                          <Container style={{ flexDirection: "column", marginTop: 30, flex: 20 }}>
                            <Image
                              style={{
                                margin: 0,
                                padding: 0,
                                width: 110,
                                height: 136,
                                marginBottom: 20,
                                marginLeft: "15%",
                              }}
                              source={require("../../assets/profile-placeholder.png")}
                            />
                            <JCButton
                              buttonType={ButtonTypes.CourseHome}
                              onPress={() => {
                                null
                              }}
                            >
                              Book a Call
                            </JCButton>
                            <JCButton
                              buttonType={ButtonTypes.CourseHome}
                              onPress={() => {
                                null
                              }}
                            >
                              Send Message
                            </JCButton>
                          </Container>
                          <Container style={{ flex: 80, height: 200 }}>
                            <Text
                              style={{
                                marginTop: 30,
                                marginLeft: 60,
                                marginRight: 30,
                                fontFamily: "Graphik-Regular-App",
                                fontSize: 20,
                                lineHeight: 30,
                              }}
                            >
                              Hi{" "}
                            </Text>
                            <Text
                              style={{
                                marginTop: 30,
                                marginLeft: 60,
                                marginRight: 30,
                                fontFamily: "Graphik-Regular-App",
                                fontSize: 20,
                                lineHeight: 30,
                              }}
                            >
                              For your journey in leadership formation, I’d like to invite you to
                              our bi-weekly coaching sessions where we can connect and discuss
                              issues in more details. Let’s schedule our Coaching Calls - talk soon!
                              Thanks! - Jon
                            </Text>
                          </Container>
                        </Container>
                        <Card style={this.styles.style.courseCoachingCard}>
                          <Text
                            style={{
                              fontFamily: "Graphik-Regular-App",
                              fontSize: 16,
                              lineHeight: 24,
                            }}
                          >
                            Schedule your
                          </Text>
                          <Text
                            style={{ fontFamily: "Graphik-Bold-App", fontSize: 28, lineHeight: 33 }}
                          >
                            30 Minute Coaching Call
                          </Text>

                          <Container style={{ flexDirection: "row" }}>
                            <Container
                              style={{ flex: 40, marginTop: 30, height: 50, marginRight: 30 }}
                            >
                              <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{
                                  width: "100%",
                                  height: 50,
                                  paddingLeft: 15,
                                  paddingRight: 15,
                                }}
                                placeholder="Select your Coach"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                              >
                                {
                                  //   selectedValue={this.state.selected2}
                                  // onValueChange={this.onValueChange2.bind(this)}
                                }
                                <Picker.Item label="Jon Hand" value="key0" />
                              </Picker>
                            </Container>
                            <Container
                              style={{
                                flex: 60,
                                marginTop: 30,
                                height: "auto",
                                alignContent: "space-between",
                              }}
                            >
                              <Container>
                                <Text
                                  style={{
                                    fontFamily: "Graphik-Regular-App",
                                    fontSize: 28,
                                    lineHeight: 33,
                                  }}
                                >
                                  Please confirm
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Graphik-Regular-App",
                                    fontSize: 16,
                                    lineHeight: 24,
                                  }}
                                >
                                  you’re going to schedule coaching call with Jon Hand.
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Graphik-Regular-App",
                                    fontSize: 14,
                                    lineHeight: 24,
                                    marginTop: 35,
                                  }}
                                >
                                  30 minutes
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Graphik-Regular-App",
                                    fontSize: 14,
                                    lineHeight: 24,
                                  }}
                                >
                                  Monday, August 23 - 1:30 PM – 2:00 PM
                                </Text>
                              </Container>
                              <JCButton
                                buttonType={ButtonTypes.CourseHome}
                                onPress={() => {
                                  null
                                }}
                              >
                                Yes, schedule call
                              </JCButton>
                            </Container>
                          </Container>
                        </Card>
                      </Container>
                      <Container
                        style={{
                          flex: 30,
                          flexDirection: "column",
                          alignContent: "flex-start",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      ></Container>
                    </Container>
                  </Content>
                </Container>
              </Container>
            </StyleProvider>
          ) : null
        }}
      </CourseCoachingImpl.Consumer>
    )
  }
}
export default function CourseCoaching(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <CourseCoachingImpl {...props} navigation={navigation} route={route} />
}
