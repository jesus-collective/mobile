import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import { Body, Button, Card, CardItem, Container, Content, Left, StyleProvider } from "native-base"
import * as React from "react"
import { Text, TouchableOpacity } from "react-native"
import { JCCognitoUser } from "src/types"
import { Data, UserGroupType } from "../../components/Data/Data"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import getTheme from "../../native-base-theme/components"
import { ListUsersQuery } from "../../src/API"
import { constants } from "../../src/constants"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { MapData } from "../MyGroups/MyGroups"
interface Props {
  navigation: StackNavigationProp<any, any>
  wrap: boolean
  onDataload(mapData: MapData[]): void
}
interface State extends JCState {
  openSingle: string
  openMultiple: string
  userGroupType: UserGroupType
  // type: String
  //cardWidth: any
  //createString: String
  data: NonNullable<ListUsersQuery["listUsers"]>["items"]
  currentUser: string | null
  //showCreateButton: Boolean
}

export default class MyPeople extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      openSingle: "ProfileScreen",
      openMultiple: "ProfilesScreen",
      //createString: "+ Create Event",
      //type: props.type,
      //cardWidth: 250,
      userGroupType: UserGroupType.All,
      data: [],
      currentUser: null,
      // showCreateButton: false
    }
    const user = Auth.currentAuthenticatedUser()
    user.then((user: JCCognitoUser) => {
      const groupList: string[] = user.getSignInUserSession()?.getAccessToken().payload[
        "cognito:groups"
      ]
      this.setState(
        {
          userGroupType:
            groupList?.includes("partner") || groupList?.includes("legacyUserGroup1")
              ? UserGroupType.Partners
              : groupList?.includes("subscriptionkyyouth") ||
                groupList?.includes("subscriptionkykids") ||
                groupList?.includes("subscriptionkyearlyyears")
              ? UserGroupType.OneStory
              : groupList?.includes("Friend")
              ? UserGroupType.Friends
              : UserGroupType.All,
          currentUser: user.username,
        },
        () => this.setInitialData()
      )
    })
  }
  convertProfileToMapData(data: NonNullable<ListUsersQuery["listUsers"]>["items"]): MapData[] {
    return data
      ?.map((dataItem) => {
        if (dataItem?.location && dataItem?.location?.latitude && dataItem?.location?.longitude)
          return {
            latitude: Number(dataItem.location.latitude) + Number(dataItem.location.randomLatitude),
            longitude:
              Number(dataItem.location.longitude) + Number(dataItem.location.randomLongitude),
            name: dataItem.given_name + " " + dataItem.family_name,
            user: dataItem,
            link: "",
            type: "profile",
          } as MapData
        else return null
      })
      .filter((o) => o) as MapData[]
  }

  setInitialData(): void {
    const listUsers = Data.listUsers(this.state.userGroupType, null)
    listUsers
      .then((json) => {
        // console.log(json)
        this.setState({ data: json.data?.listUsers?.items ?? [] }, () => {
          this.props.onDataload(this.convertProfileToMapData(this.state.data))
        })
      })
      .catch((e) => {
        console.log(e)
        this.setState({ data: e.data.listUsers.items }, () => {
          this.props.onDataload(this.convertProfileToMapData(this.state.data))
        })
      })
  }

  openConversation(initialUser: string, name: string): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", {
      initialUserID: initialUser,
      initialUserName: name,
    })
  }
  showProfiles(): void {
    console.log("Navigate to profilesScreen")
    this.props.navigation.push("ProfilesScreen")
  }
  showProfile(id: string): void {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false })
  }

  render(): React.ReactNode {
    if (!constants["SETTING_ISVISIBLE_profile"]) return null
    else
      return (
        <StyleProvider style={getTheme()}>
          <Container style={this.styles.style.peopleContainer}>
            <Text style={this.styles.style.fontConnectWith}>Connect with Others</Text>
            <Button
              bordered
              style={this.styles.style.jcDirectoryButton}
              onPress={() => {
                this.showProfiles()
              }}
            >
              <Text style={{ fontFamily: "Graphik-Regular-App", fontSize: 16, color: "#F0493E" }}>
                Jesus Collective Directory
              </Text>
            </Button>
            <Content style={this.styles.style.rightCardWidth}>
              {this.state.data?.map((item) => {
                if (item == null) return null
                if (item.id !== this.state.currentUser) {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        this.showProfile(item.id)
                      }}
                    >
                      <Card style={this.styles.style.dashboardConversationCard}>
                        <CardItem>
                          <Left style={this.styles.style.dashboardConversationCardLeft}>
                            <ProfileImage user={item} size="small2" style="my-people" />

                            <Body style={this.styles.style.dashboardConversationBody}>
                              <Text style={this.styles.style.fontConnectWithName}>
                                {item.given_name} {item.family_name}
                              </Text>
                              <Text style={this.styles.style.fontConnectConversation}>
                                {item.currentRole}
                              </Text>
                              <Button
                                bordered
                                style={this.styles.style.connectWithSliderButton}
                                onPress={() => {
                                  this.openConversation(
                                    item.id,
                                    item.given_name + " " + item.family_name
                                  )
                                }}
                              >
                                <Text style={this.styles.style.fontStartConversation}>
                                  Start Conversation
                                </Text>
                              </Button>
                            </Body>
                          </Left>
                        </CardItem>
                      </Card>
                    </TouchableOpacity>
                  )
                } else {
                  return null
                }
              })}
            </Content>
          </Container>
        </StyleProvider>
      )
  }
}
