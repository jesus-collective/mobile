﻿import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { AntDesign } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { StackNavigationProp } from "@react-navigation/stack"
import { Analytics, Auth } from "aws-amplify"
import { convertToRaw, EditorState } from "draft-js"
import moment from "moment-timezone"
import React from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { GetUserQueryResult, JCCognitoUser, MapData } from "src/types"
import PaidUsersModal from "../../components/CourseViewer/PaidUsersModal"
import { Data } from "../../components/Data/Data"
import EditableDate from "../../components/Forms/EditableDate"
import EditableDollar from "../../components/Forms/EditableDollar"
import EditableRichText from "../../components/Forms/EditableRichText"
import EditableText from "../../components/Forms/EditableText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import MyMap from "../../components/MyMap/MyMap"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import Validate from "../../components/Validate/Validate"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import {
  CreateCourseInfoInput,
  CreateGroupInput,
  GetGroupQuery,
  GetUserQuery,
  UserGroupType,
} from "../../src/API"
import Accordion from "./Accordion"

interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
interface State extends JCState {
  showMap: boolean
  loadId: string
  data: any
  courseData: any
  createNew: boolean
  canSave: boolean
  isPaid: boolean
  canPay: boolean
  canLeave: boolean
  canJoin: boolean
  isEditable: boolean
  canDelete: boolean
  validationError: string
  currentUser: string | null
  currentUserProfile: any
  memberIDs: string[]
  members: NonNullable<GraphQLResult<GetUserQuery>["data"]>["getUser"][]
  mapData: MapData[]
  canGotoActiveCourse: boolean
  showPaidUsersModal: boolean
  expanded: false
}

export default class CourseScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      showMap: false,
      loadId: props.route.params.id,
      createNew:
        props.route.params.create === "true" || props.route.params.create === true ? true : false,
      data: null,
      courseData: null,
      canPay: false,
      isPaid: false,
      canSave: false,
      canLeave: false,
      canJoin: false,
      isEditable: false,
      canDelete: false,
      validationError: "",
      currentUser: null,
      currentUserProfile: null,
      showPaidUsersModal: false,
      memberIDs: [],
      members: [],
      mapData: [],
      canGotoActiveCourse: false,
    }

    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      this.setState({
        currentUser: user.username,
      })
      const getUser = Data.getUser(user["username"])
      getUser
        .then((json) => {
          this.setState(
            {
              currentUserProfile: json.data?.getUser,
            },
            () => {
              this.setInitialData(props)
            }
          )
        })
        .catch((e: any) => {
          console.log({
            "Error Loading User": e,
          })
        })
    })
  }
  /* getValueFromKey(myObject: unknown, string: string): string {
    const key = Object.keys(myObject).filter((k) => k.includes(string))
    return key.length ? myObject[key[0]] : ""
  }*/
  setMembers(): void {
    this.state.memberIDs.map((id) => {
      const getUser = Data.getUser(id)
      getUser
        .then((json: GetUserQueryResult) => {
          this.setState({ members: this.state.members.concat(json.data.getUser) }, () => {
            this.setState({
              mapData: this.state.mapData.concat(this.convertProfileToMapData(this.state.members)),
            })
          })
        })
        .catch((e: any) => {
          console.log({ Error1: e })
          if (e.data) {
            this.setState({ members: this.state.members.concat(e.data.getUser) }, () => {
              this.setState({
                mapData: this.state.mapData.concat(
                  this.convertProfileToMapData(this.state.members)
                ),
              })
            })
          }
        })
    })
  }
  setInitialData(props: Props): void {
    if (props.route.params.create === true || props.route.params.create === "true")
      Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
        const z: CreateGroupInput = {
          id: "course-" + Date.now(),
          owner: user.username,
          type: "course",
          name: "",
          description: "",
          memberCount: 1,
          image: "temp",
          isSponsored: "false",
          length: "",
          time: "",
          effort: "",
          cost: "",
          ownerOrgID: "0000000000000",
          promotionalText: JSON.stringify(
            convertToRaw(EditorState.createEmpty().getCurrentContent())
          ),
          readGroups: [
            UserGroupType.partners,
            UserGroupType.legacyUserGroup1,
            UserGroupType.subscriptionPartners,
          ],
          //   organizerUser: { name: "" },
          //   instructors: [],
          //   course: []
        }
        const course: CreateCourseInfoInput = {
          id: z.id,
          introduction: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
        }
        const isEditable = true
        this.setState({
          data: z,
          courseData: course,
          isEditable: isEditable,
          canLeave: true && !isEditable,
          canJoin: true && !isEditable,
          canSave: !this.state.createNew && isEditable,
          createNew: this.state.createNew && isEditable,
          canDelete: !this.state.createNew && isEditable,
        })
      })
    else {
      const getGroup = Data.getGroup(props.route.params.id)

      const processResults = (json: GraphQLResult<GetGroupQuery>) => {
        const isEditable = json.data?.getGroup?.owner == this.state.currentUser

        this.setState(
          {
            data: json.data?.getGroup,
            memberIDs: json.data?.getGroup?.members?.items?.map((item) => item?.userID),
            isEditable: isEditable,
            canLeave: true && !isEditable,
            canJoin: true && !isEditable,
            canSave: !this.state.createNew && isEditable,
            createNew: this.state.createNew && isEditable,
            canDelete: !this.state.createNew && isEditable,
          },

          () => {
            const getCourseInfo = Data.getCourseInfoForOverview(props.route.params.id)
            getCourseInfo
              .then((json) => {
                this.setState({ canGotoActiveCourse: true, courseData: json.data.getCourseInfo })
              })
              .catch((e) => {
                this.setState({ canGotoActiveCourse: true, courseData: e.data.getCourseInfo })
              })

            const groupMemberByUser = Data.groupMemberByUser(
              this.state.currentUser,
              this.state.data.id
            )

            groupMemberByUser.then((json) => {
              console.log({ groupMemberByUser: json })
              if (json.data.groupMemberByUser.items.length > 0)
                this.setState({ canJoin: false, canLeave: true && !this.state.isEditable })
              else this.setState({ canJoin: true && !this.state.isEditable, canLeave: false })
            })
            this.setCanPay()
            this.setIsPaid()
            this.setMembers()

            const getUser = Data.getUser(this.state.data.owner)
            getUser
              .then((json) => {
                this.setState({
                  mapData: this.state.mapData.concat(
                    this.convertProfileToMapData([json.data?.getUser])
                  ),
                })
              })
              .catch((e) => {
                if (e.data) {
                  this.setState({
                    mapData: this.state.mapData.concat(
                      this.convertProfileToMapData([e.data.getUser])
                    ),
                  })
                }
              })
          }
        )
      }
      getGroup.then(processResults).catch(processResults)
    }
  }
  convertProfileToMapData(
    data: NonNullable<GraphQLResult<GetUserQuery>["data"]>["getUser"][]
  ): MapData[] {
    return data
      .map((dataItem) => {
        if (dataItem?.location && dataItem?.location?.latitude && dataItem?.location?.longitude) {
          return {
            latitude: dataItem.location.latitude,
            longitude: dataItem.location.longitude,
            name: dataItem.given_name + " " + dataItem.family_name,
            user: dataItem,
            link: "",
            type: "course",
          } as MapData
        } else return null
      })
      .filter((o) => o) as MapData[]
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    const validation: any = Validate.Course(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }
  createNew(): void {
    if (this.validate()) {
      const createGroup = Data.createGroup(this.state.data)
      const createCourseInfo = Data.createCourseInfo(this.state.courseData)
      createCourseInfo.then((json2) => {
        console.log({ "Success Data.createCourseInfo": json2 })
        createGroup
          .then((json) => {
            this.setState(
              {
                createNew: false,
              },
              () => {
                this.setState({
                  canSave: !this.state.createNew && this.state.isEditable,
                  createNew: this.state.createNew && this.state.isEditable,
                  canDelete: !this.state.createNew && this.state.isEditable,
                  canGotoActiveCourse: true,
                })
              }
            )
            console.log({ "Success Data.createGroup": json })
          })
          .catch((err) => {
            console.log({ "Error Data.createGroup": err })
          })
      })
    }
  }

  clean(item: any): void {
    delete item.members
    delete item.messages
    delete item.organizerGroup
    delete item.organizerUser
    delete item.instructors
    delete item.backOfficeStaff
    delete item.ownerUser
    delete item._deleted
    delete item._lastChangedAt
    delete item.createdAt
    delete item.updatedAt
    delete item.ownerOrg
    return item
  }
  save(): void {
    if (this.validate()) {
      const updateGroup = Data.updateGroup(this.clean(this.state.data))
      updateGroup
        .then((json) => {
          console.log({ "Success Data.updateGroup": json })
        })
        .catch((err) => {
          console.log({ "Error Data.updateGroup": err })
        })
    }
  }

  leave(userActions: UserActions): void {
    Analytics.record({
      name: "leftCourse",
      // Attribute values must be strings
      attributes: { id: this.state.data.id, name: this.state.data.name },
    })
    const groupMemberByUser = Data.groupMemberByUser(this.state.currentUser, this.state.data.id)

    groupMemberByUser
      .then((json) => {
        console.log({ "Success Data.groupMemberByUser": json })

        json.data.groupMemberByUser.items.map((item) => {
          const deleteGroupMember = Data.deleteGroupMember(item.id)
          deleteGroupMember
            .then((json) => {
              console.log({ "Success Data.deleteGroupMember": json })
            })
            .catch((err) => {
              console.log({ "Error Data.deleteGroupMember": err })
            })
        })

        const remainingUsers = this.state.memberIDs.filter(
          (user) => user !== this.state.currentUser
        )
        this.setState({ canJoin: true, canLeave: false, memberIDs: remainingUsers })
        this.renderButtons(userActions)
      })
      .catch((err) => {
        console.log({ "Error Data.groupMemberByUser": err })
      })
  }
  join(userActions: UserActions): void {
    Analytics.record({
      name: "joinedCourse",
      // Attribute values must be strings
      attributes: { id: this.state.data.id, name: this.state.data.name },
    })
    const createGroupMember = Data.createGroupMember({
      groupID: this.state.data.id,
      userID: this.state.currentUser,
    })
    createGroupMember
      .then((json) => {
        console.log({ "Success Data.createGroupMember": json })
      })
      .catch((err) => {
        console.log({ "Error Data.createGroupMember": err })
      })

    this.setState({
      canJoin: false,
      canLeave: true,
      memberIDs: this.state.memberIDs.concat(this.state.currentUser),
    })
    this.renderButtons(userActions)
  }
  gotoActiveCourse(): void {
    //console.log(this.props.navigation)
    this.props.navigation.push("CourseHomeScreen", { id: this.state.data.id, create: false })
  }
  delete(): void {
    const deleteGroup = Data.deleteGroup(this.state.data.id)
    deleteGroup
      .then((json) => {
        console.log({ "Success Data.deleteGroup": json })
        this.props.navigation.push("HomeScreen")
      })
      .catch((err) => {
        console.log({ "Error Data.deleteGroup": err })
      })
  }
  purchase(): void {
    this.props.navigation.push("CoursePaymentScreen", { id: this.state.data.id })
  }
  updateValue(field: string, value: any): void {
    const temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  showProfile(id: string): void {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false })
  }
  canPurchase(userActions: UserActions): boolean {
    if (this.isOwner()) return false
    else if (this.isCourseCoach(userActions)) return false
    else if (this.isCourseAdmin(userActions)) return false
    else if (this.canCoursePay()) return true
    else if (this.isCoursePaid()) return false
    else if (this.canCourseApply()) return false
    else return false
  }
  isCourseCoach(userActions: UserActions): boolean {
    return userActions.isMemberOf("courseCoach")
  }
  isCourseAdmin(userActions: UserActions): boolean {
    return userActions.isMemberOf("courseAdmin")
  }
  canCourseApply(): boolean {
    return false
  }
  isOwner(): boolean {
    return this.state.isEditable
  }
  async setCanPay(): Promise<void> {
    const courseTriadUserByUser = Data.courseTriadUserByUser(this.state.currentUser)
    courseTriadUserByUser
      .then((json) => {
        console.log(json)
        const results = json.data.courseTriadUserByUser.items
          .map((item) => {
            if (this.state.data.id == item.triad.courseInfoID) return true
            else return false
          })
          .filter((item) => item == true)
        if (results.length > 0) this.setState({ canPay: true })
        else this.setState({ canPay: false })
      })
      .catch((err) => {
        console.log({ "Error query.getPayment": err })
      })
  }
  async setIsPaid(): Promise<void> {
    const getPayment = Data.getPayment(this.state.data.id + "-" + this.state.currentUser)
    getPayment
      .then((json) => {
        console.log(json)
        if (json.data.getPayment != null) this.setState({ isPaid: true })
        else this.setState({ isPaid: false })
      })
      .catch((err) => {
        console.log({ "Error query.getPayment": err })
      })
  }
  canGotoCourse(userActions: UserActions): boolean {
    if (this.isOwner()) return true
    else if (this.isCourseCoach(userActions)) return true
    else if (this.isCourseAdmin(userActions)) return true
    else if (this.canCoursePay()) return false
    else if (this.isCoursePaid()) return true
    else if (this.canCourseApply()) return false
    else return false
  }
  isCourseClosed(userActions: UserActions): boolean {
    // const id = this.state.data.id
    if (this.isOwner()) return false
    else if (this.isCourseCoach(userActions)) return false
    else if (this.isCourseAdmin(userActions)) return false
    else if (this.canCoursePay()) return false
    else if (this.isCoursePaid()) return false
    else if (this.canCourseApply()) return false
    else return true
  }
  canCoursePay(): boolean {
    return this.state.canPay && !this.isCoursePaid()
  }
  isCoursePaid(): boolean {
    return this.state.isPaid
  }

  renderPaymentAdmin(): React.ReactNode {
    return (
      this.state.isEditable && (
        <View style={{ marginBottom: 35 }}>
          <JCButton
            testID="course-purchase"
            buttonType={ButtonTypes.courseMktOutlineBoldNoMargin}
            onPress={() => {
              this.setState({ showPaidUsersModal: true })
            }}
          >
            Paid Users
          </JCButton>
        </View>
      )
    )
  }
  renderPermissions(): React.ReactNode {
    return (
      this.state.isEditable && (
        <View style={{ marginBottom: 35 }}>
          <Text style={{ fontWeight: "bold" }}>Permissions</Text>
          <Picker
            mode="dropdown"
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 30,
              fontSize: 16,
              height: 30,
              flexGrow: 0,
              paddingTop: 3,
              paddingBottom: 3,
            }}
            selectedValue={undefined}
            onValueChange={(value: string) => {
              console.log({ value: value })
              let tmp = this.state.data.readGroups
              if (!tmp) tmp = []
              tmp.push(value as UserGroupType)
              this.updateValue("readGroups", tmp)
            }}
          >
            <Picker.Item key={null} label={"Add Group"} value={undefined} />
            {Object.keys(UserGroupType).map((org: string) => {
              return <Picker.Item key={org} label={org} value={org} />
            })}
          </Picker>
          {this.state.data?.readGroups?.map((item: UserGroupType | null, index: number) => {
            return (
              <React.Fragment key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>{item}</Text>
                  <TouchableOpacity
                    style={{ alignSelf: "center", marginLeft: 15 }}
                    onPress={() => {
                      if (this.state.data) {
                        let tmp = this.state.data.readGroups
                        if (!tmp) tmp = []
                        tmp.splice(index, 1)
                        this.updateValue("readGroups", tmp)
                      }
                    }}
                  >
                    <AntDesign name="close" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )
          })}
        </View>
      )
    )
  }
  renderButtons(userActions: UserActions): React.ReactNode {
    return (
      <View style={{ minHeight: 30 }}>
        {this.isCourseClosed(userActions) ? <Text>Course Closed</Text> : null}
        {this.canPurchase(userActions) ? (
          <JCButton
            testID="course-purchase"
            buttonType={ButtonTypes.courseMktOutlineBoldNoMargin}
            onPress={() => {
              this.purchase()
            }}
          >
            Purchase
          </JCButton>
        ) : null}
        {this.canGotoCourse(userActions) ? (
          <JCButton
            testID="course-goto"
            buttonType={ButtonTypes.courseMktOutlineBoldNoMargin}
            onPress={() => this.gotoActiveCourse()}
          >
            Go to Course
          </JCButton>
        ) : null}
        {this.state.createNew ? (
          <JCButton
            testID="course-createNew"
            buttonType={ButtonTypes.courseMktOutlineBoldNoMargin}
            onPress={() => {
              this.createNew()
            }}
          >
            Create Course
          </JCButton>
        ) : null}
        {this.state.canSave ? (
          <JCButton
            testID="course-save"
            buttonType={ButtonTypes.courseMktOutlineBoldNoMargin}
            onPress={() => {
              this.save()
            }}
          >
            Save Course
          </JCButton>
        ) : null}
        {this.state.canDelete ? (
          <JCButton
            testID="course-delete"
            buttonType={ButtonTypes.courseMktOutlineBoldNoMargin}
            onPress={() => {
              if (window.confirm("Are you sure you wish to delete this course?")) this.delete()
            }}
          >
            Delete Course
          </JCButton>
        ) : null}
        <Text>{this.state.validationError}</Text>
      </View>
    )
  }
  static UserConsumer = UserContext.Consumer
  renderPaidUsersModal(): React.ReactNode {
    return (
      <PaidUsersModal
        visible={this.state.showPaidUsersModal}
        groupId={this.state.data.id}
        onClose={() => {
          this.setState({ showPaidUsersModal: false })
        }}
      />
    )
  }
  async updateTriadSeparationStatus({ courseData }: any): Promise<boolean> {
    console.log("logging segregation status", this.state)
    try {
      const response = await Data.updateCourseInfo({
        id: courseData.id,
        separatedTriads: !courseData?.separatedTriads,
      })
      console.log({ response })
      if (response.data?.updateCourseInfo) {
        return true
      }
      return false
    } catch (error: any) {
      console.log({ error })
      if (error?.data?.updateCourseInfo) {
        return true
      }
      return false
    }
  }
  render(): React.ReactNode {
    console.log("CourseScreen")
    return (
      <CourseScreen.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return this.state.data ? (
            <View>
              <ScrollView>
                <MyMap
                  type={"no-filters"}
                  size={"25%"}
                  visible={this.state.showMap}
                  mapData={this.state.mapData}
                ></MyMap>
                <View style={this.styles.style.coursesScreenMainContainer}>
                  <View style={this.styles.style.detailScreenLeftCard}>
                    <View style={this.styles.style.courseSponsorContainer}>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 16,
                          fontFamily: "Graphik-Regular-App",
                          color: "#333333",
                          textTransform: "uppercase",
                          flex: 0,
                        }}
                      >
                        Course
                      </Text>
                      {this.state.isEditable ? (
                        <JCSwitch
                          switchLabel="Sponsored"
                          initState={
                            this.state.data.isSponsored
                              ? this.state.data.isSponsored === "true"
                              : false
                          }
                          onPress={(status) => {
                            this.updateValue("isSponsored", status ? "true" : "false")
                          }}
                        ></JCSwitch>
                      ) : this.state.data.isSponsored == "true" ? (
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 16,
                            fontFamily: "Graphik-Regular-App",
                            color: "#979797",
                            textTransform: "uppercase",
                            flex: 0,
                            marginRight: 20,
                          }}
                        >
                          Sponsored
                        </Text>
                      ) : null}
                    </View>

                    <View>
                      <EditableText
                        onChange={(value: any) => {
                          this.updateValue("name", value)
                        }}
                        testID="course-name"
                        placeholder="Enter Course Name"
                        multiline={false}
                        textStyle={this.styles.style.courseMktNameInput}
                        inputStyle={this.styles.style.courseMktNameInput}
                        value={this.state.data.name}
                        isEditable={this.state.isEditable}
                      ></EditableText>
                      <EditableText
                        onChange={(value: any) => {
                          this.updateValue("description", value)
                        }}
                        testID="course-description"
                        placeholder="Enter Course Description"
                        multiline={true}
                        textStyle={this.styles.style.courseMktDescriptionInput}
                        inputStyle={this.styles.style.courseMktDescriptionInput}
                        value={this.state.data.description}
                        isEditable={this.state.isEditable}
                      ></EditableText>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={this.styles.style.courseMainIcons}
                          source={require("../../assets/svg/calendar_black.svg")}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 16,
                            fontFamily: "Graphik-Regular-App",
                            color: "#333333",
                            textTransform: "uppercase",
                            marginTop: 20,
                          }}
                        >
                          Start Date
                        </Text>
                      </View>
                      <EditableDate
                        type="date"
                        testID="course-startDate"
                        onChange={(time: any, timeZone: any) => {
                          this.updateValue("time", time)
                          this.updateValue("tz", timeZone)
                        }}
                        placeholder="Enter Course Start Date"
                        textStyle={this.styles.style.courseDateInput}
                        inputStyle={this.styles.style.courseDescriptionInput}
                        value={this.state.data.time}
                        tz={this.state.data.tz ? this.state.data.tz : moment.tz.guess()}
                        isEditable={this.state.isEditable}
                      ></EditableDate>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={this.styles.style.courseMainIcons2}
                          source={require("../../assets/svg/hourglass.svg")}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 16,
                            fontFamily: "Graphik-Regular-App",
                            color: "#333333",
                            textTransform: "uppercase",
                            marginTop: 5,
                          }}
                        >
                          Duration
                        </Text>
                      </View>
                      <EditableText
                        testID="course-duration"
                        onChange={(value: any) => {
                          this.updateValue("length", value)
                        }}
                        placeholder="Enter Course Length"
                        multiline={false}
                        textStyle={this.styles.style.courseDateInput}
                        inputStyle={this.styles.style.courseDescriptionInput}
                        value={this.state.data.length}
                        isEditable={this.state.isEditable}
                      ></EditableText>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={this.styles.style.courseMainIcons}
                          source={require("../../assets/svg/time_black.svg")}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 16,
                            fontFamily: "Graphik-Regular-App",
                            color: "#333333",
                            textTransform: "uppercase",
                            marginTop: 5,
                          }}
                        >
                          Effort
                        </Text>
                      </View>
                      <EditableText
                        testID="course-effort"
                        onChange={(value: any) => {
                          this.updateValue("effort", value)
                        }}
                        placeholder="Enter Course Effort"
                        multiline={false}
                        textStyle={this.styles.style.courseDateInput}
                        inputStyle={this.styles.style.courseDescriptionInput}
                        value={this.state.data.effort}
                        isEditable={this.state.isEditable}
                      ></EditableText>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={this.styles.style.courseMainIcons2}
                          source={require("../../assets/svg/tag.svg")}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 16,
                            fontFamily: "Graphik-Regular-App",
                            color: "#333333",
                            textTransform: "uppercase",
                            marginTop: 5,
                          }}
                        >
                          Cost
                        </Text>
                      </View>
                      <EditableDollar
                        testID="course-amount"
                        onChange={(value: any) => {
                          this.updateValue("cost", value)
                        }}
                        placeholder="Enter Course Cost"
                        multiline={false}
                        textStyle={this.styles.style.courseDateInput}
                        inputStyle={this.styles.style.courseDescriptionInput}
                        value={this.state.data.cost}
                        isEditable={this.state.isEditable}
                      ></EditableDollar>
                    </View>
                    <Text
                      style={{
                        fontFamily: "Graphik-Regular-App",
                        fontSize: 16,
                        lineHeight: 23,
                        color: "#333333",
                        paddingBottom: 12,
                        marginTop: 52,
                      }}
                    >
                      Organizer
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.showProfile(
                          this.state.data.ownerUser
                            ? this.state.data.ownerUser.id
                            : this.state.currentUserProfile.id
                        )
                      }}
                    >
                      <ProfileImage
                        user={
                          this.state.data.ownerUser
                            ? this.state.data.ownerUser
                            : this.state.currentUserProfile
                        }
                        size="small"
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: "Graphik-Bold-App",
                        fontSize: 20,
                        lineHeight: 25,
                        letterSpacing: -0.3,
                        color: "#333333",
                        paddingTop: 48,
                        paddingBottom: 12,
                      }}
                    >
                      Members ({this.state.memberIDs.length})
                    </Text>
                    {this.state.isEditable ? (
                      <Text
                        style={{
                          fontFamily: "Graphik-Bold-App",
                          fontSize: 20,
                          lineHeight: 25,
                          letterSpacing: -0.3,
                          color: "#333333",
                          paddingTop: 48,
                          paddingBottom: 12,
                        }}
                      >
                        {this.state?.courseData?.separatedTriads ? "closed" : "open"} {"cohorts  "}
                        {this.state.courseData ? (
                          <JCSwitch
                            switchLabel=""
                            asyncOnPress={async () => {
                              const success = await this.updateTriadSeparationStatus(this.state)
                              if (success)
                                this.setState((prev) => ({
                                  courseData: {
                                    ...prev.courseData,
                                    separatedTriads: !prev.courseData.separatedTriads,
                                  },
                                }))
                              return success
                            }}
                            onPress={() => null}
                            initState={!this.state.courseData?.separatedTriads}
                          />
                        ) : null}
                      </Text>
                    ) : null}
                    <View style={this.styles.style.groupAttendeesPictures}>
                      {this.state.memberIDs.length == 0 ? (
                        <Text
                          style={{
                            fontFamily: "Graphik-Bold-App",
                            fontSize: 16,
                            lineHeight: 24,
                            letterSpacing: -0.3,
                            color: "#333333",
                            marginBottom: 30,
                          }}
                        >
                          No Members Yet
                        </Text>
                      ) : (
                        this.state.memberIDs.map((id: any, index: any) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                this.showProfile(id)
                              }}
                            >
                              <ProfileImage key={index} user={id} size="small" />
                            </TouchableOpacity>
                          )
                        })
                      )}
                    </View>
                    {this.renderPermissions()}
                    {this.renderPaymentAdmin()}
                    {this.renderButtons(userActions)}
                  </View>
                  <View style={this.styles.style.detailScreenRightCard}>
                    <View style={this.styles.style.coursesRightCard}>
                      {this.state.data ? (
                        <EditableRichText
                          onChange={(val) => {
                            this.updateValue("promotionalText", val)
                          }}
                          value={this.state.data.promotionalText}
                          isEditable={true}
                        ></EditableRichText>
                      ) : null}

                      <Text style={this.styles.style.courseDetailsAccordion}>Course Details</Text>

                      {this.state.courseData?.courseWeeks?.items.map(
                        (item: any, index1: number) => {
                          return (
                            <Accordion
                              key={index1}
                              header={
                                <>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }}
                                  >
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        fontFamily: "Graphik-SemiBold-App",
                                        fontSize: 16,
                                        lineHeight: 24,
                                        paddingRight: 4,
                                        letterSpacing: -0.3,
                                        color: "#ffffff",
                                        alignSelf: "center",
                                      }}
                                    >
                                      Week {index1 + 1} - {item.title}
                                    </Text>
                                  </View>
                                </>
                              }
                            >
                              <View style={{ marginBottom: 30 }}>
                                {item.lessons.items.map((lesson, index2: number) => {
                                  return (
                                    <Text
                                      key={index2}
                                      style={{
                                        fontFamily: "Graphik-Regular-App",
                                        fontSize: 16,
                                        lineHeight: 24,
                                        letterSpacing: -0.3,
                                        color: "#333333",
                                        paddingLeft: 20,
                                      }}
                                    >
                                      <Image
                                        style={this.styles.style.courseAccordionIcons}
                                        source={require("../../assets/svg/document.svg")}
                                      />
                                      {index1 + 1}.{index2 + 1} - {lesson.name}
                                    </Text>
                                  )
                                })}
                              </View>
                            </Accordion>
                          )
                        }
                      )}
                    </View>
                  </View>
                </View>
                {this.renderPaidUsersModal()}
              </ScrollView>
            </View>
          ) : null
        }}
      </CourseScreen.UserConsumer>
    )
  }
}
