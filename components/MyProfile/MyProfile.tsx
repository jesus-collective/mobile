import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import Amplify, { API, Auth, graphqlOperation, Storage } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import moment from "moment"
import { Badge, Button, Content, Form, Label, Picker, View } from "native-base"
import * as React from "react"
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity } from "react-native"
import EditableLocation from "../../components/Forms/EditableLocation"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import MyMap from "../../components/MyMap/MyMap"
import Sentry from "../../components/Sentry"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { GetUserQuery, ListInvoicesMutation } from "../../src/API"
import awsconfig from "../../src/aws-exports"
import { constants } from "../../src/constants"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import EditableText from "../Forms/EditableText"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import { MapData } from "../MyGroups/MyGroups"
import Validate from "../Validate/Validate"
import {
  interests,
  numberOfEmployees,
  orgTypesChurches,
  orgTypesNonChurch,
  sundayAttendance,
} from "./dropdown"

const orgTypes = orgTypesChurches.concat(orgTypesNonChurch)

Amplify.configure(awsconfig)

interface Props {
  finalizeProfile?(): void
  navigation?: any
  route?: any
  loadId?: any
  hideOrg?: boolean
}
export type UserData = NonNullable<GetUserQuery["getUser"]>

interface State extends JCState {
  UserDetails: UserData | null
  interest: string | null
  interestsArray: string[]
  profileImage: string
  validationText: string
  mapVisible: boolean

  isEditable: boolean
  showPage: "profile" | "settings" | "billing" | "admin"
  editMode: boolean
  mapData: MapData[]
  initCenter: any
  dirty: boolean
  oldPass: string
  newPass: string
  passError: string
  noUserFound: boolean
  invoices: NonNullable<NonNullable<ListInvoicesMutation>["listInvoices"]>["data"]
}
class MyProfileImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      UserDetails: null,
      interest: null,
      interestsArray: [],
      profileImage: "",
      validationText: "",
      showPage: "profile",
      mapVisible: false,

      isEditable: false,
      editMode: false,
      mapData: [],
      initCenter: { lat: 44, lng: -78.0 },
      dirty: false,
      oldPass: "",
      newPass: "",
      passError: "",
      noUserFound: false,
    }
    this.getUserDetails()
  }
  async listInvoices() {
    try {
      const invoice = (await API.graphql({
        query: mutations.listInvoices,
        variables: {
          idempotency: "",
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<ListInvoicesMutation>
      console.log({ invoice: invoice })
      this.setState({ invoices: invoice.data?.listInvoices?.data ?? [] })
    } catch (e) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  convertProfileToMapData() {
    if (
      this.state.UserDetails?.location &&
      this.state.UserDetails?.location.latitude &&
      this.state.UserDetails?.location.longitude
    )
      this.setState({
        mapData: [
          {
            latitude:
              Number(this.state.UserDetails.location.latitude) +
              Number(this.state.UserDetails.location.randomLatitude),
            longitude:
              Number(this.state.UserDetails.location.longitude) +
              Number(this.state.UserDetails.location.randomLatitude),
            name: this.state.UserDetails.given_name + " " + this.state.UserDetails.family_name,
            user: this.state.UserDetails,
            link: "",
            type: "profile",
          },
        ],
        initCenter: {
          lat:
            Number(this.state.UserDetails.location.latitude) +
            Number(this.state.UserDetails.location.randomLatitude),
          lng:
            Number(this.state.UserDetails.location.longitude) +
            Number(this.state.UserDetails.location.randomLatitude),
        },
      })
  }
  async getUserDetails(): Promise<void> {
    console.log("getUserDetails")
    try {
      const user = await Auth.currentAuthenticatedUser()
      if (this.props.loadId) {
        try {
          const getUser: any = await API.graphql(
            graphqlOperation(queries.getUser, { id: this.props.loadId })
          )
          if (getUser.data.getUser != null)
            this.setState(
              {
                UserDetails: getUser.data.getUser,
                isEditable: getUser.data.getUser.id == user["username"],
                interestsArray: getUser.data.getUser.interests,
              },
              () => {
                this.getProfileImage()
                this.convertProfileToMapData()
              }
            )
          else this.setState({ noUserFound: true })
          //console.log(this.state.UserDetails)
        } catch (e) {
          console.log({ Error: e })
          if (e.data?.getUser != null)
            this.setState(
              {
                UserDetails: e.data.getUser,
                interestsArray: e.data.getUser.interests,
              },
              () => {
                this.getProfileImage()
                this.convertProfileToMapData()
              }
            )
          else this.setState({ noUserFound: true })
        }
      } else {
        try {
          const getUser: any = await API.graphql(
            graphqlOperation(queries.getUser, { id: user["username"] })
          )
          this.setState(
            {
              UserDetails: getUser.data.getUser,
              isEditable: true,
              editMode: true,
              interestsArray: getUser.data.getUser.interests,
            },
            () => {
              this.getProfileImage()
              this.convertProfileToMapData()
            }
          )

          console.log(this.state.UserDetails)
        } catch (e) {
          console.log(e)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  handleAlertInputChange(event: any, name: string): void {
    const value =
      event.target === undefined
        ? event
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    // const name = target.name;
    console.log(value)
    const updateData = { ...this.state.UserDetails }
    if (updateData.alertConfig == null) {
      const z: {
        __typename: "AlertConfig"
        emailDirectMessage: string
        emailGroupMessage: string
        emailEventMessage: string
        emailOrgMessage: string
        emailResourceMessage: string
        emailCourseMessage: string
        emailPromotions: string
      } = {
        __typename: "AlertConfig",
        emailDirectMessage: "false",
        emailGroupMessage: "false",
        emailEventMessage: "false",
        emailOrgMessage: "false",
        emailResourceMessage: "false",
        emailCourseMessage: "false",
        emailPromotions: "false",
      }
      updateData.alertConfig = z
      delete updateData.alertConfig.__typename
    }
    updateData.alertConfig[name] = value.toString()
    this.setState(
      {
        UserDetails: updateData,
        dirty: true,
      },
      async () => {
        if (this.state.UserDetails)
          try {
            const updateUser = await API.graphql(
              graphqlOperation(mutations.updateUser, {
                input: {
                  id: this.state.UserDetails.id,
                  alertConfig: this.state.UserDetails.alertConfig,
                },
              })
            )
            console.log(updateUser)
          } catch (e) {
            Sentry.captureException(e.errors || e)
            console.log(e)
          }
      }
    )
  }
  handleInputChange(event: any, name: string): void {
    const value =
      event.target === undefined
        ? event
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    // const name = target.name;
    console.log(value)
    const updateData = { ...this.state.UserDetails }
    updateData[name] = value
    this.setState(
      {
        UserDetails: updateData,
        dirty: true,
      },
      () => {
        if (name === "location") this.convertProfileToMapData()
      }
    )
  }
  clean(item): void {
    delete item.organizations
    delete item.groups
    delete item.messages
    delete item.owns
    delete item._deleted
    delete item._lastChangedAt
    delete item.createdAt
    delete item.updatedAt
    delete item.coachingTriad
    delete item.userTriad
    delete item.courseInstructing
    delete item.payments
    delete item.courseBackOfficeStaff
    delete item.messageReplies
    if (item.profileImage) delete item.profileImage["__typename"]
    delete item.directMessages
    return item
  }
  async finalizeProfile(): Promise<void> {
    const validation = Validate.Profile(this.state.UserDetails)
    if (validation.result) {
      try {
        const toSave = this.clean(this.state.UserDetails)
        toSave["profileState"] = "Complete"
        const updateUser = await API.graphql(
          graphqlOperation(mutations.updateUser, { input: toSave })
        )
        this.setState({ dirty: false })
        console.log({ "updateUser:": updateUser })
        if (this.props.finalizeProfile) this.props.finalizeProfile()
        else this.setState({ editMode: false })
      } catch (e) {
        Sentry.captureException(e.errors || e)
        console.log(e)
      }
    }
    this.setState({ validationText: validation.validationError })
  }
  async onProfileImageChange(e: any): Promise<void> {
    const file = e.target.files[0]
    const user = await Auth.currentCredentials()
    const userId = user.identityId
    const lastDot = file.name.lastIndexOf(".")
    const ext = file.name.substring(lastDot + 1)
    const fn = "profile/upload/profile-" + new Date().getTime() + "." + ext
    const fnSave = fn
      .replace("/upload", "")
      .replace(".", "-[size].")
      .replace("." + ext, ".png")

    Storage.put(fn, file, {
      level: "protected",
      contentType: file.type,
      identityId: userId,
    })
      .then(() => {
        const updateData = { ...this.state.UserDetails }
        updateData["profileImage"] = {
          __typename: "Image",
          userId: userId,
          filenameUpload: fn,
          filenameLarge: fnSave.replace("[size]", "large"),
          filenameMedium: fnSave.replace("[size]", "medium"),
          filenameSmall: fnSave.replace("[size]", "small"),
        }

        this.setState(
          {
            UserDetails: updateData,
            dirty: true,
          },
          () => {
            this.getProfileImage()
          }
        )
      })
      .catch((err) => console.log(err))
  }

  getProfileImage(): void {
    console.log("get profile image")
    //console.log(this.state.UserDetails.profileImage)
    if (this.state.UserDetails?.profileImage?.filenameUpload)
      Storage.get(this.state.UserDetails.profileImage.filenameUpload, {
        level: "protected",
        identityId: this.state.UserDetails.profileImage.userId,
      })
        .then((result) => this.setState({ profileImage: result as string }))
        .catch((err) => {
          console.log(err)
        })
  }
  /* getValueFromKey(myObject: unknown, string: string) {
    const key = Object.keys(myObject).filter((k) => k.includes(string))
    return key.length ? myObject[key[0]] : ""
  }*/
  logout(actions: UserActions): void {
    //this.props.navigation.navigate("", null)
    Auth.signOut()
      .then((data) => {
        console.log("SIGNED OUT")
        actions.onStateChange("signedOut", null)
      })
      .catch((err) => {
        console.log("SIGNED OUT CATCH")
        actions.onStateChange("signedOut", null)
      })
  }
  showMap(): void {
    console.log("showMap")
    this.setState({ mapVisible: true })
  }
  renderMap() {
    return this.state.UserDetails?.location?.geocodeFull ? (
      <MyMap
        initCenter={this.state.initCenter}
        visible={true}
        mapData={this.state.mapData}
        type={"profile"}
      ></MyMap>
    ) : null
  }
  handleAddInterest(): void {
    if (this.state.interest && this.state.interestsArray === null) {
      this.setState({ interestsArray: [this.state.interest] }, () => {
        const updateData = { ...this.state.UserDetails }
        updateData["interests"] = this.state.interestsArray
        this.setState({
          UserDetails: updateData,
          dirty: true,
        })
      })
    } else if (
      this.state.interest &&
      this.state.interestsArray.filter((item) => item === this.state.interest).length === 0 &&
      this.state.interestsArray.length < 7
    ) {
      this.setState(
        {
          interestsArray: this.state.interestsArray.concat(this.state.interest),
        },
        () => {
          const updateData = { ...this.state.UserDetails }
          updateData["interests"] = this.state.interestsArray
          this.setState({
            UserDetails: updateData,
            dirty: true,
          })
        }
      )
    }
  }
  deleteUser(): void {
    Auth.currentAuthenticatedUser().then((user) => {
      const deleteUser: any = API.graphql({
        query: mutations.deleteUser,
        variables: {
          input: { id: user["username"] },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      deleteUser
        .then((c: any) => {
          console.log(c)
          const delStat = user.deleteUser()
          console.log(delStat)
          this.props.navigation.push("", null)
          // return delStat
        })
        .catch((e: any) => {
          console.log(e)
          const delStat = user.deleteUser()
          console.log(delStat)
          this.props.navigation.push("", null)
          //        this.props.navigation.navigate("/")
          // return delStat
        })
    })
  }
  handleDeleteInterest(event: string): void {
    const remainingInterests = this.state.interestsArray.filter((item) => item !== event)
    this.setState(
      {
        interestsArray: remainingInterests.length === 0 ? null : remainingInterests,
      },
      () => {
        const updateData = { ...this.state.UserDetails }
        updateData["interests"] = this.state.interestsArray
        this.setState({
          UserDetails: updateData,
          dirty: true,
        })
      }
    )
  }

  checkForValidOrgInfo(): boolean {
    const user = this.state.UserDetails

    if (user?.orgName || user?.orgDescription) {
      return true
    }

    if (user?.orgType && orgTypesChurches.includes(user?.orgType)) {
      if (user?.orgSize || user?.sundayAttendance || user?.numberVolunteers || user?.denomination) {
        return true
      }
    }

    if (user?.orgType && orgTypesNonChurch.includes(user?.orgType)) {
      if (user?.orgSize || user?.numberVolunteers || user?.pplServed) {
        return true
      }
    }

    return false
  }

  handleEditMode() {
    if (this.state.dirty && window.confirm("You have unsaved changes"))
      this.setState({
        editMode: !this.state.editMode,
        showPage: "profile",
      })
    else if (!this.state.dirty)
      this.setState({
        editMode: !this.state.editMode,
        showPage: "profile",
      })
  }

  async handlePasswordChange(): Promise<void> {
    if (!this.state.oldPass || !this.state.newPass) {
      this.setState({ passError: "Required: Current password, New password" })
      return
    }
    try {
      const user = await Auth.currentAuthenticatedUser()
      const result = await Auth.changePassword(user, this.state.oldPass, this.state.newPass)
      this.setState({ passError: result })
    } catch (e) {
      console.error(e)
      if (e.message.includes("validation")) this.setState({ passError: e.message.split(":")[0] })
      else this.setState({ passError: e.message })
    }
    this.setState({ oldPass: "", newPass: "" })
  }

  renderMainUserGroup(group: string) {
    switch (group) {
      case "verifiedUser":
        return <Text style={this.styles.style.fontFormUserType}>Verified</Text>
      case "friend":
        return <Text style={this.styles.style.fontFormUserType}>Friend</Text>
      case "partner":
        return <Text style={this.styles.style.fontFormUserType}>Partner</Text>
      case "admin":
        return <Text style={this.styles.style.fontFormUserType}>Admin</Text>
      default:
        return <Text style={this.styles.style.fontFormUserType}>Un-Verified</Text>
    }
  }
  openConversation(initialUser: string, name: string): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", {
      initialUserID: initialUser,
      initialUserName: name,
    })
  }
  static UserConsumer = UserContext.Consumer
  renderTopBar(userActions: UserActions) {
    if (this.state.UserDetails)
      return (
        <View style={this.styles.style.myProfileTopButtons}>
          {this.state.isEditable && (this.state.editMode || this.state.showPage != "profile") ? (
            <Text style={this.styles.style.profileFontTitle}>
              {this.props.hideOrg ? "Create Administrator's Profile" : "Setup your profile"}
            </Text>
          ) : (
            <Text style={this.styles.style.profileFontTitle}>
              {this.state.UserDetails.given_name}&apos;s profile
            </Text>
          )}
          <View style={this.styles.style.myProfileTopButtonsExternalContainer}>
            {this.state.isEditable ? (
              <View style={this.styles.style.myProfileTopButtonsInternalContainer}>
                {this.state.editMode ? (
                  <JCButton
                    enabled={this.state.dirty}
                    testID="profile-save"
                    buttonType={ButtonTypes.SolidRightMargin}
                    onPress={() => {
                      this.finalizeProfile()
                    }}
                  >
                    Save Profile
                  </JCButton>
                ) : null}
                <JCButton buttonType={ButtonTypes.Solid} onPress={() => this.logout(userActions)}>
                  Logout
                </JCButton>
                {this.props.loadId && this.state.showPage == "settings" ? (
                  <JCButton
                    buttonType={ButtonTypes.SolidProfileDelete}
                    onPress={() => this.deleteUser()}
                  >
                    Delete
                  </JCButton>
                ) : null}
              </View>
            ) : null}
            {this.state.isEditable && (this.state.editMode || this.state.showPage != "profile") ? (
              <Text style={this.styles.style.myProfileErrorValidation}>
                {this.state.validationText}
              </Text>
            ) : null}
          </View>
        </View>
      )
    else return null
  }
  renderLeftBar(userActions: UserActions) {
    if (this.state.UserDetails)
      return (
        <View style={this.styles.style.profileScreenLeftCard}>
          <View style={this.styles.style.myProfileImageWrapper}>
            <Image
              style={this.styles.style.myProfileImage}
              source={
                this.state.profileImage == ""
                  ? require("../../assets/profile-placeholder.png")
                  : this.state.profileImage
              }
              onError={() => {
                this.getProfileImage()
              }}
            ></Image>
            {this.state.isEditable && this.state.editMode ? (
              <View style={this.styles.style.fileInputWrapper}>
                <JCButton
                  buttonType={ButtonTypes.SolidProfile}
                  onPress={() => {
                    null
                  }}
                >
                  Set Profile Picture
                </JCButton>
                <input
                  data-testId="profile-image"
                  style={{
                    cursor: "pointer",
                    fontSize: 200,
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    opacity: "0",
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => this.onProfileImageChange(e)}
                />
              </View>
            ) : null}
            {/*<Text style={this.styles.style.fontFormProfileImageText}>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>*/}
          </View>
          <View style={this.styles.style.myProfilePersonalInfoWrapper}>
            <Text style={this.styles.style.fontFormName}>
              {this.state.UserDetails.given_name} {this.state.UserDetails.family_name}
            </Text>
            <Text style={this.styles.style.fontFormRole}>
              {this.state.UserDetails.currentRole
                ? this.state.UserDetails.currentRole
                : "My Current Role not defined"}
            </Text>
            {this.renderMainUserGroup(this.state.UserDetails?.mainUserGroup ?? "unverified")}

            {this.state.isEditable && this.state.editMode ? (
              <Text style={this.styles.style.fontFormSmall}>One sentence about me</Text>
            ) : null}
            <EditableText
              onChange={(e) => {
                this.handleInputChange(e, "aboutMeShort")
              }}
              placeholder="Short sentence about me"
              multiline={true}
              placeholderTextColor="#757575"
              textStyle={this.styles.style.fontFormSmallDarkGrey}
              inputStyle={this.styles.style.fontFormAboutMe}
              testID="profile-aboutMeShort"
              value={this.state.UserDetails.aboutMeShort ?? ""}
              isEditable={this.state.isEditable && this.state.editMode}
            ></EditableText>

            <View style={this.styles.style.myProfileCoordinates}>
              <Text style={this.styles.style.fontFormSmallDarkGreyCoordinates}>
                <Image
                  style={{
                    width: "22px",
                    height: "22px",
                    top: 6,
                    marginRight: 5,
                  }}
                  source={require("../../assets/svg/pin 2.svg")}
                ></Image>
                {this.state.UserDetails.location?.geocodeFull
                  ? this.state.UserDetails.location.geocodeFull
                  : "Location not defined"}
              </Text>
              {this.state.isEditable && this.state.UserDetails.profileState !== "Incomplete" ? (
                <JCButton buttonType={ButtonTypes.EditButton} onPress={() => this.handleEditMode()}>
                  {this.state.editMode ? "View Profile" : "Edit Profile"}
                </JCButton>
              ) : null}
            </View>
            <Text style={this.styles.style.fontFormSmallGrey}>
              <Image
                style={{
                  width: "22px",
                  height: "22px",
                  top: 3,
                  marginRight: 5,
                }}
                source={require("../../assets/svg/calendar.svg")}
              ></Image>
              Joined:{" "}
              {this.state.UserDetails.joined
                ? moment(this.state.UserDetails.joined).format("MMMM Do YYYY")
                : "Join date unknown"}
            </Text>
            {!this.state.isEditable ? (
              <Button
                bordered
                style={this.styles.style.connectWithSliderButton}
                onPress={() => {
                  this.openConversation(
                    this.state.UserDetails?.id,
                    this.state.UserDetails?.given_name + " " + this.state.UserDetails?.family_name
                  )
                }}
              >
                <Text style={this.styles.style.fontStartConversation}>Start Conversation</Text>
              </Button>
            ) : null}

            {this.state.isEditable &&
            this.state.UserDetails.profileState !== "Incomplete" &&
            constants["SETTING_ISVISIBLE_PROFILE_MESSAGES"] ? (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderColor: "#33333320",
                  paddingVertical: 10,
                }}
              >
                <JCButton
                  testID="profile-setmap"
                  buttonType={ButtonTypes.TransparentBoldBlackNoMargin}
                  onPress={() => {
                    this.props.navigation.push("ConversationScreen", {
                      initialUserID: null,
                      initialUserName: null,
                    })
                  }}
                >
                  Messages
                </JCButton>
              </View>
            ) : null}
            {this.state.isEditable &&
            this.state.UserDetails.profileState !== "Incomplete" &&
            constants["SETTING_ISVISIBLE_PROFILE_ACCOUNTSETTINGS"] ? (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#33333320",
                  paddingVertical: 10,
                  borderRightWidth: this.state.showPage == "settings" ? 7 : 0,
                  borderRightColor: "#F0493E",
                }}
              >
                <JCButton
                  testID="profile-setmap"
                  buttonType={ButtonTypes.TransparentBoldBlackNoMargin}
                  onPress={() =>
                    this.setState({
                      showPage: "settings",
                      editMode: false,
                    })
                  }
                >
                  Account Settings
                </JCButton>
              </View>
            ) : null}
            {this.state.isEditable &&
            this.state.UserDetails.profileState !== "Incomplete" &&
            constants["SETTING_ISVISIBLE_PROFILE_BILLING"] ? (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#33333320",
                  paddingVertical: 10,
                  borderRightWidth: this.state.showPage == "billing" ? 7 : 0,
                  borderRightColor: "#F0493E",
                }}
              >
                <JCButton
                  testID="profile-setmap"
                  buttonType={ButtonTypes.TransparentBoldBlackNoMargin}
                  onPress={() =>
                    this.setState(
                      {
                        showPage: "billing",
                        editMode: false,
                      },
                      () => {
                        this.listInvoices()
                      }
                    )
                  }
                >
                  Billing
                </JCButton>
              </View>
            ) : null}
            {userActions.isMemberOf("admin") ? (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#33333320",
                  paddingVertical: 10,
                  borderRightWidth: this.state.showPage == "billing" ? 7 : 0,
                  borderRightColor: "#F0493E",
                }}
              >
                <JCButton
                  testID="profile-setmap"
                  buttonType={ButtonTypes.TransparentBoldBlackNoMargin}
                  onPress={() =>
                    this.setState({
                      showPage: "admin",
                      editMode: false,
                    })
                  }
                >
                  Admin
                </JCButton>
              </View>
            ) : null}
          </View>

          {this.state.isEditable && this.state.editMode ? (
            <Text style={this.styles.style.fontFormSmallHeader}>Public Location</Text>
          ) : null}
          {this.state.isEditable && this.state.editMode ? (
            <EditableLocation
              onChange={(value: any, location: any) => {
                if (location) {
                  this.handleInputChange(
                    {
                      latitude: location.lat,
                      longitude: location.lng,
                      geocodeFull: value,
                      randomLatitude: this.state.UserDetails?.location?.randomLatitude
                        ? this.state.UserDetails?.location.randomLatitude
                        : Math.random() * 0.04 - 0.02,
                      randomLongitude: this.state.UserDetails?.location?.randomLongitude
                        ? this.state.UserDetails.location.randomLongitude
                        : Math.random() * 0.04 - 0.02,
                    },
                    "location"
                  )
                }
              }}
              multiline={false}
              textStyle={this.styles.style.fontRegular}
              inputStyle={this.styles.style.groupNameInput}
              value={this.state.UserDetails.location?.geocodeFull ?? ""}
              isEditable={this.state.isEditable && this.state.editMode}
              citiesOnly={true}
            ></EditableLocation>
          ) : null}
        </View>
      )
    else return null
  }
  renderProfile() {
    if (this.state.UserDetails)
      return (
        <View style={this.styles.style.profileScreenRightCard}>
          <View style={{ width: "100%" }}>{this.renderMap()}</View>
          {this.state.isEditable && this.state.editMode ? (
            <Text style={this.styles.style.fontMyProfileLeftTop}>Tell us more about you</Text>
          ) : null}

          {this.state.isEditable && this.state.editMode ? (
            <Text style={this.styles.style.myprofileAboutMe}>
              <Text style={this.styles.style.fontFormMandatory}>*</Text>
              About me
            </Text>
          ) : (
            <Text style={this.styles.style.myprofileAboutMe}>About me</Text>
          )}

          <EditableText
            onChange={(e) => {
              this.handleInputChange(e, "aboutMeLong")
            }}
            placeholder="type here"
            multiline={true}
            testID="profile-aboutMeLong"
            textStyle={this.styles.style.fontFormSmallDarkGrey}
            inputStyle={{
              borderWidth: 1,
              borderColor: "#dddddd",
              marginTop: 15,
              marginBottom: 60,
              width: "100%",
              paddingTop: 10,
              paddingRight: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              lineHeight: 28,
              height: 150,
            }}
            value={this.state.UserDetails.aboutMeLong ?? ""}
            isEditable={this.state.isEditable && this.state.editMode}
          ></EditableText>

          {this.state.isEditable && this.state.editMode ? (
            <Text style={this.styles.style.fontBold}>
              <Text style={this.styles.style.fontFormMandatory}>*</Text>
              My Interests
            </Text>
          ) : (
            <Text style={this.styles.style.myprofileAboutMe}>Interests</Text>
          )}

          {this.state.isEditable && this.state.editMode ? (
            <View style={this.styles.style.myprofilePickerMainContainer}>
              <View style={this.styles.style.myprofilePickerContainer}>
                <View style={this.styles.style.myprofilePickerContainerView}>
                  <Picker
                    testID="profile-interest-picker"
                    style={this.styles.style.myprofilePicker}
                    onValueChange={(itemValue) => this.setState({ interest: itemValue })}
                    selectedValue={this.state.interest}
                  >
                    <Picker.Item label={"None Selected"} value={""} />
                    {interests.map((item, index) => {
                      return <Picker.Item key={index} label={item} value={item} />
                    })}
                  </Picker>
                  <JCButton
                    testID="profile-interest-button"
                    buttonType={ButtonTypes.SolidAboutMe}
                    onPress={() => this.handleAddInterest()}
                  >
                    <Text>+ Add</Text>
                  </JCButton>
                </View>
                {this.state.isEditable && this.state.editMode ? (
                  <Text style={{ width: "100%", marginTop: 8 }}>
                    You can select{" "}
                    {this.state.interestsArray ? 7 - this.state.interestsArray.length : 7} more key
                    interests
                  </Text>
                ) : null}
              </View>
              <View style={this.styles.style.myprofileBadgeContainer}>
                {this.state.interestsArray
                  ? this.state.interestsArray.map((item, index) => {
                      return (
                        <Badge
                          key={index}
                          style={{
                            backgroundColor: "#EFF1F5",
                            marginRight: 10,
                            marginTop: 5,
                            height: 30,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 18,
                                paddingHorizontal: 10,
                              }}
                            >
                              {item}
                            </Text>
                            <TouchableOpacity onPress={() => this.handleDeleteInterest(item)}>
                              <AntDesign name="close" size={20} color="#979797" />
                            </TouchableOpacity>
                          </View>
                        </Badge>
                      )
                    })
                  : null}
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "flex-start",
                maxHeight: 100,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              {this.state.UserDetails.interests
                ? this.state.UserDetails.interests.map((item, index) => {
                    return (
                      <Badge
                        key={index}
                        style={{
                          backgroundColor: "#EFF1F5",
                          marginRight: 10,
                          marginBottom: 10,
                          height: 30,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              paddingHorizontal: 10,
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                      </Badge>
                    )
                  })
                : null}
            </View>
          )}
          <View style={{ width: "100%" }}>
            <Label style={this.styles.style.fontFormSmall}>
              <Text style={this.styles.style.fontFormMandatory}>
                {this.state.isEditable && this.state.editMode ? "*" : ""}
              </Text>
              Current Role
            </Label>
            <EditableText
              onChange={(e) => {
                this.handleInputChange(e, "currentRole")
              }}
              multiline={false}
              testID="profile-currentRole"
              textStyle={this.styles.style.fontFormSmallDarkGrey}
              inputStyle={{
                borderWidth: 1,
                borderColor: "#dddddd",
                width: "100%",
                marginBottom: 15,
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                fontFamily: "Graphik-Regular-App",
                fontSize: 16,
                lineHeight: 28,
              }}
              value={this.state.UserDetails.currentRole ?? ""}
              isEditable={this.state.isEditable && this.state.editMode}
            ></EditableText>
          </View>
          <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
          {this.state.isEditable && this.state.editMode ? (
            <Text style={this.styles.style.fontFormSmall}>
              <Text style={this.styles.style.fontFormMandatory}>*</Text>
              Describe your current scope
            </Text>
          ) : (
            <Text style={this.styles.style.fontFormSmall}>Current scope</Text>
          )}
          <EditableText
            onChange={(e) => {
              this.handleInputChange(e, "currentScope")
            }}
            multiline={true}
            placeholder="Type here."
            testID="profile-currentScope"
            textStyle={this.styles.style.fontFormSmallDarkGrey}
            inputStyle={{
              borderWidth: 1,
              borderColor: "#dddddd",
              width: "100%",
              marginBottom: 15,
              paddingTop: 10,
              paddingRight: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              lineHeight: 28,
            }}
            value={this.state.UserDetails.currentScope ?? ""}
            isEditable={this.state.isEditable && this.state.editMode}
          ></EditableText>

          <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
          {this.state.isEditable && this.state.editMode ? (
            <Text style={this.styles.style.fontFormSmall}>
              Identify your personality type indicator
            </Text>
          ) : this.state.UserDetails.personality ? (
            <Text style={this.styles.style.fontFormSmall}>Personality type indicator</Text>
          ) : null}
          <EditableText
            onChange={(e) => {
              this.handleInputChange(e, "personality")
            }}
            multiline={true}
            testID="profile-personality"
            placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A"
            textStyle={this.styles.style.fontFormSmallDarkGrey}
            inputStyle={{
              borderWidth: 1,
              borderColor: "#dddddd",
              width: "100%",
              marginBottom: 15,
              paddingTop: 10,
              paddingRight: 10,
              paddingBottom: 30,
              paddingLeft: 10,
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              lineHeight: 28,
            }}
            value={this.state.UserDetails.personality ?? ""}
            isEditable={this.state.isEditable && this.state.editMode}
          ></EditableText>

          <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
          {this.checkForValidOrgInfo() || (this.state.isEditable && this.state.editMode) ? (
            !this.props.hideOrg ? (
              <View>
                {this.state.isEditable && this.state.editMode ? (
                  <Text style={this.styles.style.fontBold}>Tell us about your organization</Text>
                ) : (
                  <Text style={this.styles.style.fontBold}>Organization Info</Text>
                )}

                {(this.state.isEditable && this.state.editMode) ||
                this.state.UserDetails.orgName ? (
                  <View>
                    <Label style={this.styles.style.fontFormSmall}>Organization Name</Label>
                    <EditableText
                      onChange={(e) => {
                        this.handleInputChange(e, "orgName")
                      }}
                      multiline={false}
                      testID="profile-orgName"
                      textStyle={this.styles.style.fontFormSmallDarkGrey}
                      inputStyle={this.styles.style.myProfileOrgTypeInput}
                      value={this.state.UserDetails.orgName ?? ""}
                      isEditable={this.state.isEditable && this.state.editMode}
                    ></EditableText>
                  </View>
                ) : null}

                {(this.state.isEditable && this.state.editMode) ||
                (this.state.UserDetails.orgType && this.state.UserDetails.orgType !== "None") ? (
                  <View style={{ marginTop: 15 }}>
                    <Label style={this.styles.style.fontFormSmall}>Type of Organization</Label>
                    {this.state.isEditable && this.state.editMode ? (
                      <View style={this.styles.style.myProfileOrgView}>
                        <Picker
                          testID="profile-orgType"
                          style={this.styles.style.myprofilePicker}
                          onValueChange={(itemValue) => {
                            this.handleInputChange(itemValue, "orgType")
                          }}
                          selectedValue={
                            this.state.UserDetails?.orgType &&
                            orgTypes.includes(this.state.UserDetails?.orgType)
                              ? this.state.UserDetails.orgType
                              : this.state.UserDetails.orgType === null ||
                                this.state.UserDetails.orgType === "None"
                              ? "None"
                              : ""
                          }
                        >
                          <Picker.Item label={"None Selected"} value={"None"} />
                          {orgTypes.map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item} />
                          })}
                          <Picker.Item label={"Other"} value={""} />
                        </Picker>
                        {this.state.UserDetails.orgType === "" ||
                        (this.state.UserDetails.orgType !== null &&
                          !orgTypes.includes(this.state.UserDetails?.orgType) &&
                          this.state.UserDetails.orgType !== "None") ? (
                          <EditableText
                            onChange={(e) => {
                              this.handleInputChange(e, "orgType")
                            }}
                            multiline={false}
                            textStyle={this.styles.style.fontFormSmallDarkGrey}
                            inputStyle={this.styles.style.myProfileOrgTypeInput}
                            value={this.state.UserDetails.orgType}
                            isEditable={this.state.isEditable && this.state.editMode}
                          ></EditableText>
                        ) : null}
                      </View>
                    ) : this.state.UserDetails.orgType &&
                      this.state.UserDetails.orgType !== "None" ? (
                      <EditableText
                        multiline={true}
                        textStyle={this.styles.style.fontFormSmallDarkGrey}
                        value={this.state.UserDetails.orgType}
                        isEditable={false}
                      />
                    ) : null}
                  </View>
                ) : null}

                {this.state.UserDetails?.orgType &&
                orgTypes.includes(this.state.UserDetails?.orgType) &&
                (this.state.UserDetails.orgSize || this.state.editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    {this.state.isEditable && this.state.editMode ? (
                      <View>
                        <Label style={this.styles.style.fontFormSmall}>
                          How many employees are there in the organization?
                        </Label>
                        <Picker
                          testID="profile-orgSize"
                          style={this.styles.style.myprofilePicker}
                          onValueChange={(itemValue) => {
                            this.handleInputChange(itemValue, "orgSize")
                          }}
                          selectedValue={this.state.UserDetails.orgSize}
                        >
                          <Picker.Item label={"None Selected"} value={""} />
                          {numberOfEmployees.map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item} />
                          })}
                        </Picker>
                      </View>
                    ) : this.state.UserDetails.orgSize ? (
                      <View>
                        <Label style={this.styles.style.fontFormSmall}>Employees</Label>

                        <EditableText
                          multiline={true}
                          textStyle={this.styles.style.fontFormSmallDarkGrey}
                          value={this.state.UserDetails.orgSize}
                          isEditable={false}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}

                {this.state.UserDetails?.orgType &&
                orgTypesChurches.includes(this.state.UserDetails?.orgType) &&
                (this.state.UserDetails.sundayAttendance || this.state.editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    {this.state.isEditable && this.state.editMode ? (
                      <View>
                        <Label style={this.styles.style.fontFormSmall}>
                          Average Sunday morning attendance
                        </Label>
                        <Picker
                          style={this.styles.style.myprofilePicker}
                          onValueChange={(itemValue) => {
                            this.handleInputChange(itemValue, "sundayAttendance")
                          }}
                          selectedValue={this.state.UserDetails.sundayAttendance}
                        >
                          <Picker.Item label={"None Selected"} value={""} />
                          {sundayAttendance.map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item} />
                          })}
                        </Picker>
                      </View>
                    ) : this.state.UserDetails.sundayAttendance ? (
                      <View>
                        <Label style={this.styles.style.fontFormSmall}>
                          Average Sunday morning attendance
                        </Label>
                        <EditableText
                          multiline={true}
                          textStyle={this.styles.style.fontFormSmallDarkGrey}
                          value={this.state.UserDetails.sundayAttendance}
                          isEditable={false}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}

                {this.state.UserDetails?.orgType &&
                orgTypes.includes(this.state.UserDetails?.orgType) &&
                (this.state.UserDetails.numberVolunteers || this.state.editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    {this.state.isEditable && this.state.editMode ? (
                      <View>
                        <Label style={this.styles.style.fontFormSmall}>Number of volunteers</Label>
                        <Picker
                          style={this.styles.style.myprofilePicker}
                          onValueChange={(itemValue) => {
                            this.handleInputChange(itemValue, "numberVolunteers")
                          }}
                          selectedValue={this.state.UserDetails.numberVolunteers}
                        >
                          <Picker.Item label={"None Selected"} value={""} />
                          {numberOfEmployees.map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item} />
                          })}
                        </Picker>
                      </View>
                    ) : this.state.UserDetails.numberVolunteers ? (
                      <View>
                        <Label style={this.styles.style.fontFormSmall}>Number of volunteers</Label>
                        <EditableText
                          multiline={true}
                          textStyle={this.styles.style.fontFormSmallDarkGrey}
                          value={this.state.UserDetails.numberVolunteers}
                          isEditable={false}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}

                {this.state.UserDetails?.orgType &&
                orgTypesChurches.includes(this.state.UserDetails?.orgType) &&
                (this.state.UserDetails.denomination || this.state.editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    <Text style={this.styles.style.fontFormSmall}>Denomination</Text>
                    <EditableText
                      onChange={(e) => {
                        this.handleInputChange(e, "denomination")
                      }}
                      multiline={true}
                      testID="profile-denomination"
                      textStyle={this.styles.style.fontFormSmallDarkGrey}
                      placeholder="Type here."
                      inputStyle={{
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        width: "100%",
                        marginBottom: 15,
                        paddingTop: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        fontFamily: "Graphik-Regular-App",
                        fontSize: 16,
                        lineHeight: 28,
                      }}
                      value={this.state.UserDetails.denomination ?? ""}
                      isEditable={this.state.isEditable && this.state.editMode}
                    ></EditableText>
                  </View>
                ) : null}

                {this.state.UserDetails?.orgType &&
                orgTypesNonChurch.includes(this.state.UserDetails?.orgType) &&
                (this.state.UserDetails.pplServed || this.state.editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    <Text style={this.styles.style.fontFormSmall}>
                      {this.state.editMode
                        ? "How many people do you serve?"
                        : "People impacted by our services"}
                    </Text>
                    <EditableText
                      onChange={(e) => {
                        this.handleInputChange(e, "pplServed")
                      }}
                      multiline={true}
                      testID="profile-pplServed"
                      textStyle={this.styles.style.fontFormSmallDarkGrey}
                      placeholder="Type here."
                      inputStyle={{
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        width: "100%",
                        marginBottom: 15,
                        paddingTop: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        fontFamily: "Graphik-Regular-App",
                        fontSize: 16,
                        lineHeight: 28,
                      }}
                      value={this.state.UserDetails.pplServed ?? ""}
                      isEditable={this.state.isEditable && this.state.editMode}
                    ></EditableText>
                  </View>
                ) : null}

                {this.state.UserDetails.orgDescription || this.state.editMode ? (
                  <View style={{ marginTop: 15 }}>
                    <Text style={this.styles.style.fontFormSmall}>
                      Description of church or ministry organization
                    </Text>
                    <EditableText
                      onChange={(e) => {
                        this.handleInputChange(e, "orgDescription")
                      }}
                      multiline={true}
                      testID="profile-orgDescription"
                      textStyle={this.styles.style.fontFormSmallDarkGrey}
                      placeholder="Type here."
                      inputStyle={{
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        width: "100%",
                        marginBottom: 15,
                        paddingTop: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        fontFamily: "Graphik-Regular-App",
                        fontSize: 16,
                        lineHeight: 28,
                      }}
                      value={this.state.UserDetails.orgDescription ?? ""}
                      isEditable={this.state.isEditable && this.state.editMode}
                    ></EditableText>
                  </View>
                ) : null}
              </View>
            ) : null
          ) : null}
        </View>
      )
    else return null
  }
  renderAccountSettings() {
    if (this.state.UserDetails)
      return (
        <View style={this.styles.style.profileScreenRightCard}>
          <Text style={this.styles.style.myprofileAboutMe}>Account Settings</Text>
          <View style={{ marginTop: 40 }}>
            <Label
              style={{
                ...this.styles.style.fontFormSmallDarkGrey,
                marginBottom: 15,
              }}
            >
              Change your password
            </Label>
            <TextInput
              placeholder="Current password"
              value={this.state.oldPass}
              onChange={(e) => this.setState({ oldPass: e.nativeEvent.text })}
              secureTextEntry={true}
              style={{
                borderWidth: 1,
                borderColor: "#dddddd",
                width: "100%",
                marginBottom: 15,
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                fontFamily: "Graphik-Regular-App",
                fontSize: 16,
                lineHeight: 28,
              }}
            ></TextInput>
            <TextInput
              placeholder="New password"
              value={this.state.newPass}
              onChange={(e) => this.setState({ newPass: e.nativeEvent.text })}
              secureTextEntry={true}
              style={{
                borderWidth: 1,
                borderColor: "#dddddd",
                width: "100%",
                marginBottom: 15,
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                fontFamily: "Graphik-Regular-App",
                fontSize: 16,
                lineHeight: 28,
              }}
            ></TextInput>
            <JCButton
              buttonType={ButtonTypes.SolidAboutMe}
              onPress={() => this.handlePasswordChange()}
            >
              <Text> Change Password</Text>
            </JCButton>
          </View>
          <Text
            style={{
              ...this.styles.style.fontFormSmallDarkGrey,
              marginTop: 5,
            }}
          >
            {this.state.passError}
          </Text>
          <View style={{ marginTop: 40 }}>
            <Label
              style={{
                ...this.styles.style.fontFormSmallDarkGrey,
                marginBottom: 15,
              }}
            >
              Alert Settings
            </Label>
            <JCSwitch
              containerWidth={500}
              flexDirection={"row"}
              toggleMargin={20}
              toggleMarginLeft={10}
              toggleMarginTop={0}
              toggleMarginBottom={0}
              switchLabel="Receive Email Alerts for Direct Messages"
              initState={this.state.UserDetails.alertConfig?.emailDirectMessage == "true"}
              onPress={(e) => {
                this.handleAlertInputChange(e, "emailDirectMessage")
              }}
            ></JCSwitch>
            <JCSwitch
              containerWidth={500}
              flexDirection={"row"}
              toggleMargin={20}
              toggleMarginLeft={10}
              toggleMarginTop={0}
              toggleMarginBottom={0}
              switchLabel="Receive Email Alerts for Group Messages"
              initState={this.state.UserDetails.alertConfig?.emailGroupMessage == "true"}
              onPress={(e) => {
                this.handleAlertInputChange(e, "emailGroupMessage")
              }}
            ></JCSwitch>
            <JCSwitch
              containerWidth={500}
              flexDirection={"row"}
              toggleMargin={20}
              toggleMarginLeft={10}
              toggleMarginTop={0}
              toggleMarginBottom={0}
              switchLabel="Receive Email Alerts for Event Messages"
              initState={this.state.UserDetails.alertConfig?.emailEventMessage == "true"}
              onPress={(e) => {
                this.handleAlertInputChange(e, "emailEventMessage")
              }}
            ></JCSwitch>
            <JCSwitch
              containerWidth={500}
              flexDirection={"row"}
              toggleMargin={20}
              toggleMarginLeft={10}
              toggleMarginTop={0}
              toggleMarginBottom={0}
              switchLabel="Receive Email Alerts for Resource Messages"
              initState={this.state.UserDetails.alertConfig?.emailResourceMessage == "true"}
              onPress={(e) => {
                this.handleAlertInputChange(e, "emailResourceMessage")
              }}
            ></JCSwitch>
            <JCSwitch
              containerWidth={500}
              flexDirection={"row"}
              toggleMargin={20}
              toggleMarginLeft={10}
              toggleMarginTop={0}
              toggleMarginBottom={0}
              switchLabel="Receive Email Alerts for Course Messages"
              initState={this.state.UserDetails.alertConfig?.emailCourseMessage == "true"}
              onPress={(e) => {
                this.handleAlertInputChange(e, "emailCourseMessage")
              }}
            ></JCSwitch>
            <JCSwitch
              containerWidth={500}
              flexDirection={"row"}
              toggleMargin={20}
              toggleMarginLeft={10}
              toggleMarginTop={0}
              toggleMarginBottom={0}
              switchLabel="Receive Email Alerts for Organization Messages"
              initState={this.state.UserDetails.alertConfig?.emailOrgMessage == "true"}
              onPress={(e) => {
                this.handleAlertInputChange(e, "emailOrgMessage")
              }}
            ></JCSwitch>
            <JCSwitch
              containerWidth={500}
              flexDirection={"row"}
              toggleMargin={20}
              toggleMarginLeft={10}
              toggleMarginTop={0}
              toggleMarginBottom={0}
              switchLabel="Receive Email Alerts for Org Messages"
              initState={this.state.UserDetails.alertConfig?.emailPromotions == "true"}
              onPress={(e) => {
                this.handleAlertInputChange(e, "emailPromotions")
              }}
            ></JCSwitch>
          </View>
        </View>
      )
    else return null
  }
  renderBilling() {
    if (this.state.UserDetails)
      return (
        <View style={this.styles.style.profileScreenRightCard}>
          <Text style={this.styles.style.myprofileAboutMe}>Billing</Text>
          <View style={{ marginTop: 40 }}>
            <Label
              style={{
                ...this.styles.style.fontFormSmallDarkGrey,
                marginBottom: 15,
              }}
            >
              More billing features coming soon, please contact Jesus Collective directly for any
              billing concerns.
            </Label>
          </View>
          <View style={{ marginTop: 40, width: "100%" }}>
            <Label
              style={{
                ...this.styles.style.fontFormSmallDarkGrey,
                marginBottom: 15,
              }}
            >
              Invoices
            </Label>
            {this.state.invoices ? (
              <>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={{ flex: 1 }}>Invoice Number</Text>
                  <Text style={{ flex: 1 }}>Transaction Date</Text>
                  <Text style={{ flex: 1 }}>Status</Text>
                  <Text style={{ flex: 1 }}>Amount</Text>
                </View>
                {this.state.invoices.map((item, index) => {
                  return (
                    <View key={index} style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={{ flex: 1 }}>
                        {item?.invoice_pdf ? (
                          <a href={item?.invoice_pdf}>{item?.number}</a>
                        ) : (
                          item?.invoice_pdf
                        )}
                      </Text>
                      <Text style={{ flex: 1 }}>
                        {moment.unix(parseInt(item?.created ?? "0")).format("MM/DD/YYYY")}
                      </Text>
                      <Text style={{ flex: 1 }}>{item?.status}</Text>
                      <Text style={{ flex: 1 }}>
                        {"$" + parseInt(item?.total ?? "0").toFixed(2)}{" "}
                        {item?.currency?.toUpperCase()}
                      </Text>
                    </View>
                  )
                })}
              </>
            ) : (
              <View>
                <Text>Loading Invoices</Text>
                <ActivityIndicator />
              </View>
            )}
          </View>
          <View style={{ marginTop: 40 }}>
            <Label
              style={{
                ...this.styles.style.fontFormSmallDarkGrey,
                marginBottom: 15,
              }}
            >
              Modify Subscription
            </Label>
          </View>
          <View style={{ marginTop: 40 }}>
            <Label
              style={{
                ...this.styles.style.fontFormSmallDarkGrey,
                marginBottom: 15,
              }}
            >
              Update Payment
            </Label>
          </View>
          <View style={{ marginTop: 40 }}>
            <Label
              style={{
                ...this.styles.style.fontFormSmallDarkGrey,
                marginBottom: 15,
              }}
            >
              Cancel Subscription
            </Label>
          </View>
        </View>
      )
    else return null
  }
  renderAdmin(): React.ReactNode {
    return (
      <View style={this.styles.style.profileScreenRightCard}>
        <Text style={this.styles.style.myprofileAboutMe}>Admin</Text>
      </View>
    )
  }
  render(): React.ReactNode {
    return (
      <MyProfileImpl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null

          if (this.state.noUserFound) return <Text>No User Found</Text>

          return this.state.UserDetails != null ? (
            <Content>
              {this.renderTopBar(userActions)}

              <Form style={this.styles.style.myProfileMainContainer}>
                {this.renderLeftBar(userActions)}
                {this.state.showPage == "admin" && this.renderAdmin()}
                {this.state.showPage == "billing" && this.renderBilling()}
                {this.state.showPage == "profile" && this.renderProfile()}
                {this.state.showPage == "settings" && this.renderAccountSettings()}
              </Form>
            </Content>
          ) : null
        }}
      </MyProfileImpl.UserConsumer>
    )
  }
}

export default function MyProfile(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MyProfileImpl {...props} navigation={navigation} route={route} />
}
