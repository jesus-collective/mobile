import { useNavigation, useRoute } from "@react-navigation/native"
import Amplify, { API, graphqlOperation, Storage } from "aws-amplify"
import * as React from "react"
import { Image, ImageStyle, TouchableOpacity } from "react-native"
import awsconfig from "../../src/aws-exports"
import * as customQueries from "../../src/graphql-custom/queries"
import JCComponent, { JCState } from "../JCComponent/JCComponent"

Amplify.configure(awsconfig)

interface Props {
  user: any
  size: "small" | "xsmall" | "medium" | "large" | "small2" | "small3" | "small4" | "smallReply"
  style?: "map" | "my-people" | "courseProfile"
  inlineStyle?: ImageStyle
  isOrg?: boolean
  linkToProfile?: boolean
  navigation?: any
  route?: any
}
interface State extends JCState {
  profileImage: any
  showEmpty: boolean
}
class MyProfileImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      profileImage: null,
      showEmpty: false,
    }

    if (typeof props.user === "string" && props.user !== "") {
      if (this.props.isOrg) {
        this.getProfileImageFromOrgID(props.user)
      } else {
        this.getProfileImageFromUserID(props.user)
      }
    } else {
      this.getProfileImage(props.user ? props.user.profileImage : null)
    }
  }
  showProfile(): void {
    console.log("Navigate to profileScreen")
    if (typeof this.props.user === "string" && this.props.user !== "") {
      if (this.props.isOrg) {
        this.props.navigation.push("OrganizationScreen", { id: this.props.user, create: false })
      } else {
        this.props.navigation.push("ProfileScreen", { id: this.props.user, create: false })
      }
    } else {
      this.props.navigation.push("ProfileScreen", { id: this.props.user.id, create: false })
    }
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.user !== this.props.user)
      if (typeof this.props.user === "string" && this.props.user !== "") {
        this.getProfileImageFromUserID(this.props.user)
      } else {
        this.getProfileImage(this.props.user ? this.props.user.profileImage : null)
      }
    // this.getProfileImage(this.props.user ? this.props.user.profileImage : null)
  }
  getProfileImage(user: any): void {
    if (user == "" || user == null) {
      this.state = {
        ...super.getInitialState(),
        profileImage: null,
        showEmpty: true,
      }
    } else {
      Storage.get(
        this.props.size == "small" || this.props.size == "xsmall"
          ? user.filenameSmall
          : this.props.size == "medium"
          ? user.filenameMedium
          : user.filenameLarge,
        {
          level: "protected",
          contentType: "image/png",
          identityId: user.userId,
        }
      )
        .then((result) => {
          this.setState({ profileImage: result }, () => {
            this.forceUpdate()
          })
        })
        .catch((err) => {
          console.log({ error: err })
          this.setState({ profileImage: null, showEmpty: true }, () => {
            this.forceUpdate()
          })
        })
    }
  }
  getProfileImageFromUserID(user: string): void {
    const getUser: any = API.graphql(
      graphqlOperation(customQueries.getUserForProfile, { id: user })
    )
    getUser
      .then((json) => {
        this.getProfileImage(json.data.getUser.profileImage)
      })
      .catch((e: any) => {
        if (e.data) {
          this.getProfileImage(e.data?.getUser?.profileImage)
        }
      })
  }

  getProfileImageFromOrgID(user: string): void {
    const getUser: any = API.graphql(graphqlOperation(customQueries.getOrgForImage, { id: user }))
    getUser
      .then((json) => {
        this.getProfileImage(json.data.getUser.profileImage)
      })
      .catch((e: any) => {
        if (e.data) {
          this.getProfileImage(e.data?.getUser?.profileImage)
        }
      })
  }

  renderImage(): React.ReactNode {
    return this.state.profileImage ? (
      <Image
        style={
          this.props.inlineStyle ??
          (this.props.size == "xsmall"
            ? { width: "20px", height: "20px", borderRadius: 18, marginRight: 5, marginBottom: 5 }
            : this.props.size == "small"
            ? this.styles.style.smallProfileImageMBoard
            : this.props.size == "small3"
            ? this.styles.style.smallProfileImageConversations
            : this.props.size == "small4"
            ? this.styles.style.small4ProfileImageConversations
            : this.props.size == "small2"
            ? {
                width: "50px",
                height: "66px",
                borderRadius: 120,
                marginRight: 10,
                marginBottom: 0,
                marginLeft: 10,
                top: 0,
              }
            : this.props.size == "smallReply"
            ? {
                width: "35px",
                height: "45px",
                borderRadius: 120,
                marginRight: 20,
                marginBottom: 0,
                marginLeft: 20,
                top: 0,
              }
            : this.props.style === "map" || this.props.style === "my-people"
            ? {
                width: "80px",
                height: "96px",
                borderRadius: 120,
                marginRight: 10,
                marginBottom: 15,
              }
            : this.props.style === "courseProfile"
            ? {
                width: "80px",
                height: "96px",
                borderRadius: 120,
                marginRight: 10,
                marginBottom: 15,
                alignSelf: "center",
              }
            : {
                width: "250px",
                height: "290px",
                borderRadius: 120,
                marginRight: 10,
                marginBottom: 15,
              })
        }
        resizeMode={this.props.size == "xsmall" ? "contain" : "cover"}
        source={this.state.profileImage}
      />
    ) : this.state.showEmpty || !this.state.profileImage ? (
      <Image
        style={
          this.props.inlineStyle ??
          (this.props.size == "xsmall"
            ? { width: "20px", height: "20px", borderRadius: 18, marginRight: 5, marginBottom: 0 }
            : this.props.size == "small"
            ? {
                width: "50px",
                height: "66px",
                borderRadius: 120,
                marginRight: 10,
                marginBottom: 15,
                marginLeft: 10,
                top: 30,
              }
            : this.props.size == "small2"
            ? {
                width: "50px",
                height: "66px",
                borderRadius: 120,
                marginRight: 10,
                marginBottom: 0,
                marginLeft: 10,
                top: 0,
              }
            : this.props.style === "map" || this.props.style === "my-people"
            ? {
                width: "80px",
                height: "96px",
                borderRadius: 120,
                marginRight: 10,
                marginBottom: 15,
                alignSelf: "center",
              }
            : {
                width: "50px",
                height: "66px",
                borderRadius: 120,
                marginRight: 10,
                marginLeft: 10,
                marginBottom: 0,
                alignSelf: "center",
              })
        }
        resizeMode={this.props.size == "xsmall" ? "contain" : "cover"}
        source={require("../../assets/profile-placeholder.png")}
      />
    ) : null
  }
  render(): React.ReactNode {
    if (this.props.linkToProfile)
      return (
        <TouchableOpacity
          onPress={() => {
            this.showProfile()
          }}
        >
          {this.renderImage()}
        </TouchableOpacity>
      )
    else return this.renderImage()
  }
}
export default function MyProfile(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MyProfileImpl {...props} navigation={navigation} route={route} />
}
