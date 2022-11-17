import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { AntDesign } from "@expo/vector-icons"
import Badge from "@material-ui/core/Badge"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Amplify, API, Auth, Storage } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import moment from "moment"
import * as React from "react"
import { Image, Picker, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { MapData } from "src/types"
import { Data } from "../../components/Data/Data"
import EditableLocation from "../../components/Forms/EditableLocation"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import CrmMessageBoard from "../../components/MessageBoard/CRM-MessageBoard"
import MyMap from "../../components/MyMap/MyMap"
import Sentry from "../../components/Sentry"
import style from "../../components/style"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { GetUserQuery } from "../../src/API"
import { GetCrmRootQuery } from "../../src/API-crm"
import awsconfig from "../../src/aws-exports"
import { Brand } from "../../src/constants"
import { getCrmRoot } from "../../src/graphql-custom/crm"
import { JCCognitoUser } from "../../src/types"
import EditableText from "../Forms/EditableText"
import Validate from "../Validate/Validate"
import {
  interests,
  numberOfEmployees,
  orgTypesChurches,
  orgTypesNonChurch,
  sundayAttendance,
} from "./DropdownOptions"
const orgTypes = orgTypesChurches.concat(orgTypesNonChurch)

Amplify.configure(awsconfig)

interface Props {
  finalizeProfile?(): void
  navigation?: StackNavigationProp<any, any>
  route?: any
  loadId?: any
  hideOrg?: boolean
  userActions?: UserActions
}
export type UserData = NonNullable<GetUserQuery["getUser"]>

type CrmMessages = NonNullable<NonNullable<GetCrmRootQuery["getCRMRoot"]>["messages"]>["items"]

export default function MyProfile(props: Props): JSX.Element | null {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const styles = style.getInstance()
  const [showPage, setShowPage] = React.useState<"profile" | "settings" | "billing" | "admin">(
    "profile"
  )
  const [userDetails, setUserDetails] = React.useState<UserData | null>()
  const [profileConfig, setProfileConfig] = React.useState<any>()
  const [noUserFound, setNoUserFound] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)
  const [isEditable, setIsEditable] = React.useState(false)
  const scrollRef = React.useRef<ScrollView>(null)
  const [profileImage, setProfileImage] = React.useState("")
  const { userActions, userState } = React.useContext(UserContext)
  const [dirty, setDirty] = React.useState(false)
  const [mapData, setMapData] = React.useState<MapData[]>([])
  const [initCenter, setInitCenter] = React.useState<any>({ lat: 44, lng: -78.0 })
  const [interestsArray, setInterestsArray] = React.useState<any>([])
  const [interest, setInterest] = React.useState<any>([])
  const [validationText, setValidationText] = React.useState("")
  const [messages, setMessages] = React.useState<CrmMessages>([])
  React.useEffect(() => {
    const getInitialData = async () => {
      if (userActions.getProfileConfig) setProfileConfig(await userActions.getProfileConfig())
    }
    const getUserDetails = async (): Promise<void> => {
      console.log("getUserDetails")
      try {
        const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
        if (props.loadId) {
          try {
            const getUser = await Data.getUser(props.loadId)
            if (getUser.data?.getUser != null) {
              setUserDetails(getUser.data.getUser)
              setIsEditable(getUser.data.getUser.id == user["username"])
              setInterestsArray(getUser.data.getUser.interests ?? [])
              getProfileImage(getUser.data.getUser as UserData)
              convertProfileToMapData()
            } else setNoUserFound(true)
          } catch (e: any) {
            console.log({ Error: e })
            if (e.data?.getUser != null) {
              setUserDetails(e.data.getUser)
              setInterestsArray(e.data.getUser.interests ?? [])
              getProfileImage(e.data.getUser as UserData)
              convertProfileToMapData()
            } else setNoUserFound(true)
          }
        } else {
          try {
            const getUser = await Data.getUser(user["username"])
            if (getUser) {
              setUserDetails(getUser.data?.getUser)
              setIsEditable(getUser.data?.getUser?.id == user["username"])
              setEditMode(true)
              setInterestsArray(getUser.data?.getUser?.interests ?? [])
              getProfileImage(getUser.data?.getUser as UserData)
              convertProfileToMapData()
            }
            console.log(getUser.data?.getUser)
          } catch (e) {
            console.log(e)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    const fetchCrm = async () => {
      if (userActions?.isMemberOf("admin")) {
        const variables = { id: userDetails?.id }
        try {
          // fetch CRM root
          const crmRoot = (await API.graphql({
            query: getCrmRoot,
            variables,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as GraphQLResult<GetCrmRootQuery>

          if (crmRoot.data?.getCRMRoot) {
            console.debug("crmRoot exists:", crmRoot.data.getCRMRoot)
            const messages = crmRoot?.data?.getCRMRoot?.messages as CrmMessages
            setMessages(messages)
          } else {
            // if CRM does not exist, create it
            const createCrmRoot = await Data.createCrmRoot(variables)

            console.debug("crmRoot created:", createCrmRoot.data?.createCRMRoot)
            // recursive call to fetch data after CRM root is created
            fetchCrm()
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
    getInitialData()
    getUserDetails()
    fetchCrm()
  }, [userActions, props.loadId])
  const getProfileImage = (userData: UserData): void => {
    if (userData?.profileImage?.filenameUpload)
      Storage.get(userData.profileImage.filenameUpload, {
        level: "protected",
        identityId: userData.profileImage.userId ?? "",
      })
        .then((result) => setProfileImage(result as string))
        .catch((err) => {
          console.log(err)
        })
  }
  const clean = (item: any) => {
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
  const logout = (actions: UserActions): void => {
    //this.props.navigation.navigate("", null)

    Auth.signOut()
      .then(() => {
        console.log("SIGNED OUT")
        actions.onStateChange("signedOut", null)
        Sentry.configureScope((scope) => {
          scope.setUser(null)
        })
      })
      .catch(() => {
        console.log("SIGNED OUT CATCH")
        actions.onStateChange("signedOut", null)
        Sentry.configureScope((scope) => {
          scope.setUser(null)
        })
      })
  }
  const handleEditMode = () => {
    if (dirty) {
      if (window.confirm("You have unsaved changes")) {
        setEditMode(!editMode)
        setShowPage("profile")
      }
    } else {
      setEditMode(!editMode)
      setShowPage("profile")
    }
  }
  const finalizeProfile = async (): Promise<void> => {
    console.log("finalize profile")
    const validation = Validate.Profile(userDetails, profileConfig)
    if (validation.result) {
      try {
        const toSave = clean(userDetails)
        toSave["profileState"] = "Complete"
        const updateUser = await Data.updateUser(toSave)
        setDirty(false)
        console.log({ "updateUser:": updateUser })
        if (props.finalizeProfile) props.finalizeProfile()
        else setEditMode(false)
      } catch (e: any) {
        Sentry.captureException(e.errors || e)
        console.log(e)
      }
    }
    setValidationText(validation.validationError)
  }
  const deleteUser = (): void => {
    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      const deleteUser = Data.deleteUser(user["username"])
      deleteUser
        .then((c) => {
          console.log(c)
          const delStat = user.deleteUser(() => {
            null
          })
          console.log(delStat)
          navigation?.push("", null)
          // return delStat
        })
        .catch((e) => {
          console.log(e)
          const delStat = user.deleteUser(() => {
            null
          })
          console.log(delStat)
          navigation?.push("", null)
          //        this.props.navigation.navigate("/")
          // return delStat
        })
    })
  }
  const renderTopBar = (userActions: UserActions) => {
    const brand = Brand()
    if (!userDetails) return null
    return (
      <View style={styles.style.myProfileTopButtons}>
        {isEditable && (editMode || showPage != "profile") ? (
          <Text accessibilityRole="header" style={styles.style.profileFontTitle}>
            {props.hideOrg ? "Create Administrator's Profile" : "Tell us more about you"}
          </Text>
        ) : (
          <Text style={styles.style.profileFontTitle}>{userDetails.given_name}&apos;s profile</Text>
        )}
        <View style={styles.style.myProfileTopButtonsExternalContainer}>
          {isEditable ? (
            <View style={styles.style.myProfileTopButtonsInternalContainer}>
              {editMode ? (
                <JCButton
                  enabled={dirty}
                  testID="profile-save"
                  buttonType={
                    brand == "oneStory"
                      ? ButtonTypes.SolidRightMarginOneStory
                      : ButtonTypes.SolidRightMargin
                  }
                  onPress={async () => {
                    await finalizeProfile()
                  }}
                >
                  Save Profile
                </JCButton>
              ) : null}
              <JCButton
                testID={"logout"}
                buttonType={brand == "oneStory" ? ButtonTypes.SolidOneStory : ButtonTypes.Solid}
                onPress={() => logout(userActions)}
              >
                Logout
              </JCButton>
              {props.loadId && showPage == "settings" ? (
                <JCButton buttonType={ButtonTypes.SolidProfileDelete} onPress={() => deleteUser()}>
                  Delete
                </JCButton>
              ) : null}
            </View>
          ) : null}
          {isEditable && (editMode || showPage != "profile") ? (
            <Text style={styles.style.myProfileErrorValidation}>{validationText}</Text>
          ) : null}
        </View>
      </View>
    )
  }
  const renderAdmin = (userActions: UserActions): React.ReactNode => {
    if (userActions.isMemberOf("admin")) {
      return (
        <View style={styles.style.profileScreenRightCard}>
          <View style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <View>
              <Text style={styles.style.fontBold}>Admin/CRM</Text>
            </View>
            <CrmMessageBoard messages={messages} rootId={userDetails?.id} />
          </View>
        </View>
      )
    }

    return null
  }
  const renderAboutMeLong = () => {
    if (!profileConfig["aboutMeLong"].isVisible) return null

    if (!userDetails) return null
    return (
      <>
        {isEditable && editMode ? (
          <Text style={styles.style.myprofileAboutMe}>
            <Text style={styles.style.fontFormMandatory}>*</Text>
            About me
          </Text>
        ) : (
          <Text style={styles.style.myprofileAboutMe}>About me</Text>
        )}
        <EditableText
          accessibilityLabel="Describe yourself"
          onChange={(e) => {
            handleInputChange(e, "aboutMeLong")
          }}
          placeholder="Type here..."
          multiline={true}
          testID="profile-aboutMeLong"
          textStyle={styles.style.fontFormSmallDarkGrey}
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
          value={userDetails.aboutMeLong ?? ""}
          isEditable={isEditable && editMode}
        ></EditableText>
      </>
    )
  }
  const handleAddInterest = (): void => {
    if (interest && interestsArray === null) {
      setInterestsArray([interest])
      //await update
      const updateData = { ...userDetails } as UserData
      updateData["interests"] = interestsArray
      setUserDetails(updateData)
      setDirty(true)
    } else if (
      interest &&
      interestsArray.filter((item: string) => item === interest).length === 0 &&
      interestsArray.length < 7
    ) {
      setInterestsArray([...interestsArray, interest])
      //await update
      const updateData = { ...userDetails } as UserData
      updateData["interests"] = interestsArray
      setUserDetails(updateData)
      setDirty(true)
    }
  }

  const handleDeleteInterest = (event: string): void => {
    const remainingInterests = interestsArray.filter((item: string) => item !== event)
    setInterestsArray(remainingInterests.length === 0 ? [] : remainingInterests)
    // await update
    const updateData = { ...userDetails } as UserData
    updateData["interests"] = interestsArray
    setUserDetails(updateData)
    setDirty(true)
  }
  const renderInterests = () => {
    if (!profileConfig["interests"].isVisible) return null

    const brand = Brand()
    if (!userDetails) return null
    return (
      <>
        {isEditable && editMode ? (
          <Text style={styles.style.fontBold}>
            <Text style={styles.style.fontFormMandatory}>*</Text>
            My Interests
          </Text>
        ) : (
          <Text style={styles.style.myprofileAboutMe}>Interests</Text>
        )}
        {isEditable && editMode ? (
          <View style={styles.style.myprofilePickerMainContainer}>
            <View style={styles.style.myprofilePickerContainer}>
              <View style={styles.style.myprofilePickerContainerView}>
                <Picker
                  accessibilityLabel="Pick your personal interests"
                  accessibilityHint="Pick an interest and then click the add button"
                  testID="profile-interest-picker"
                  style={styles.style.myprofilePicker}
                  onValueChange={(itemValue: any) => setInterest(itemValue)}
                  selectedValue={interest ?? undefined}
                >
                  <Picker.Item label={"None Selected"} value={""} />
                  {interests.map((item, index) => {
                    return <Picker.Item key={index} label={item} value={item} />
                  })}
                </Picker>
                <JCButton
                  accessibilityLabel={`${
                    interest ? `Add ${interest} to list.` : `Add interest to list`
                  }`}
                  testID="profile-interest-button"
                  buttonType={
                    brand == "oneStory"
                      ? ButtonTypes.SolidAboutMeOneStory
                      : ButtonTypes.SolidAboutMe
                  }
                  onPress={() => {
                    handleAddInterest()
                    console.log(interestsArray)
                  }}
                >
                  <Text>+ Add</Text>
                </JCButton>
              </View>
              {isEditable && editMode ? (
                <Text style={{ width: "100%", marginTop: 8 }}>
                  You can select {interestsArray ? 7 - interestsArray.length : 7} more key interests
                </Text>
              ) : null}
            </View>
            <View style={styles.style.myprofileBadgeContainer}>
              {interestsArray
                ? interestsArray.map((item, index) => {
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
                          <TouchableOpacity
                            accessibilityLabel={`Remove ${item} from interests`}
                            accessibilityRole="button"
                            onPress={() => handleDeleteInterest(item ?? "")}
                          >
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
            {userDetails.interests
              ? userDetails.interests.map((item, index) => {
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
      </>
    )
  }
  const renderJoinedDate = () => {
    if (!profileConfig["aboutMeShort"].isVisible) return

    if (userDetails)
      return (
        <Text style={styles.style.fontFormSmallGrey}>
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
          {userDetails.joined
            ? moment(userDetails.joined).format("MMMM Do YYYY")
            : "Join date unknown"}
        </Text>
      )
  }
  const openConversation = (initialUser: string, name: string): void => {
    console.log("Navigate to conversationScreen")
    navigation?.push("ConversationScreen", {
      initialUserID: initialUser,
      initialUserName: name,
    })
  }
  const renderMap = () => {
    return userDetails?.location?.geocodeFull ? (
      <MyMap initCenter={initCenter} visible={true} mapData={mapData} type={"profile"}></MyMap>
    ) : null
  }
  const renderCurrentRoleEdit = () => {
    if (!profileConfig["currentRole"].isVisible) return

    if (!userDetails) return
    return (
      <View style={{ width: "100%" }}>
        <View>
          <Text style={styles.style.fontFormMandatory}>{isEditable && editMode ? "*" : ""}</Text>
          <Text style={styles.style.fontFormSmall}>Current Role</Text>
        </View>
        <EditableText
          accessibilityLabel="Current role"
          onChange={(e) => {
            handleInputChange(e, "currentRole")
          }}
          multiline={false}
          testID="profile-currentRole"
          placeholder="Type here..."
          textStyle={styles.style.fontFormSmallDarkGrey}
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
          value={userDetails.currentRole ?? ""}
          isEditable={isEditable && editMode}
        ></EditableText>
      </View>
    )
  }
  const renderCurrentScope = () => {
    if (!profileConfig["currentScope"].isVisible) return

    if (!userDetails) return null
    return (
      <>
        <Text style={styles.style.fontFormSmall}>&nbsp;</Text>
        {isEditable && editMode ? (
          <Text style={styles.style.fontFormSmall}>
            <Text style={styles.style.fontFormMandatory}>*</Text>
            Describe your current scope
          </Text>
        ) : (
          <Text style={styles.style.fontFormSmall}>Current scope</Text>
        )}
        <EditableText
          accessibilityLabel="Describe your current scope"
          onChange={(e) => {
            handleInputChange(e, "currentScope")
          }}
          multiline={true}
          placeholder="Type here..."
          testID="profile-currentScope"
          textStyle={styles.style.fontFormSmallDarkGrey}
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
          value={userDetails.currentScope ?? ""}
          isEditable={isEditable && editMode}
        ></EditableText>
      </>
    )
  }
  const renderPersonalityIndicator = () => {
    if (!profileConfig["personality"].isVisible) return

    if (!userDetails) return
    return (
      <>
        <Text style={styles.style.fontFormSmall}>&nbsp;</Text>
        {isEditable && editMode ? (
          <Text style={styles.style.fontFormSmall}>Identify your personality type indicator</Text>
        ) : userDetails.personality ? (
          <Text style={styles.style.fontFormSmall}>Personality type indicator</Text>
        ) : null}
        <EditableText
          onChange={(e) => {
            handleInputChange(e, "personality")
          }}
          accessibilityLabel="Identify personality type indicator"
          multiline={true}
          testID="profile-personality"
          placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A"
          textStyle={styles.style.fontFormSmallDarkGrey}
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
          value={userDetails.personality ?? ""}
          isEditable={isEditable && editMode}
        ></EditableText>
      </>
    )
  }
  const renderOrgName = () => {
    if (!profileConfig["orgName"].isVisible) return

    if (!userDetails) return
    return (isEditable && editMode) || userDetails.orgName ? (
      <View>
        <View>
          <Text style={styles.style.fontFormSmall}>Organization Name</Text>
        </View>
        <EditableText
          accessibilityLabel="Organization name"
          onChange={(e) => {
            handleInputChange(e, "orgName")
          }}
          multiline={false}
          testID="profile-orgName"
          placeholder="Type here..."
          textStyle={styles.style.fontFormSmallDarkGrey}
          inputStyle={styles.style.myProfileOrgTypeInput}
          value={userDetails.orgName ?? ""}
          isEditable={isEditable && editMode}
        ></EditableText>
      </View>
    ) : null
  }
  const renderOrgType = () => {
    if (!profileConfig["orgType"].isVisible) return

    if (userDetails)
      return (isEditable && editMode) || (userDetails.orgType && userDetails.orgType !== "None") ? (
        <View style={{ marginTop: 15 }}>
          <View>
            <Text style={styles.style.fontFormSmall}>Type of Organization</Text>
          </View>
          {isEditable && editMode ? (
            <View style={styles.style.myProfileOrgView}>
              <Picker
                accessibilityLabel="Organization type"
                testID="profile-orgType"
                style={styles.style.myprofilePicker}
                onValueChange={(itemValue) => {
                  handleInputChange(itemValue, "orgType")
                }}
                selectedValue={
                  userDetails?.orgType && orgTypes.includes(userDetails?.orgType)
                    ? userDetails.orgType
                    : userDetails.orgType === null || userDetails.orgType === "None"
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
              {userDetails.orgType === "" ||
              (userDetails.orgType !== null &&
                !orgTypes.includes(userDetails?.orgType ?? "") &&
                userDetails.orgType !== "None") ? (
                <EditableText
                  accessibilityLabel="Organization type"
                  onChange={(e) => {
                    handleInputChange(e, "orgType")
                  }}
                  multiline={false}
                  placeholder="Type here..."
                  textStyle={styles.style.fontFormSmallDarkGrey}
                  inputStyle={styles.style.myProfileOrgTypeInput}
                  value={userDetails.orgType ?? ""}
                  isEditable={isEditable && editMode}
                ></EditableText>
              ) : null}
            </View>
          ) : userDetails.orgType && userDetails.orgType !== "None" ? (
            <EditableText
              multiline={true}
              textStyle={styles.style.fontFormSmallDarkGrey}
              value={userDetails.orgType}
              isEditable={false}
            />
          ) : null}
        </View>
      ) : null
  }
  const renderAdminButton = (userActions: UserActions) => {
    return userActions.isMemberOf("admin") ? (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#33333320",
          paddingVertical: 10,
          borderRightWidth: showPage == "billing" ? 7 : 0,
          borderRightColor: "#F0493E",
        }}
      >
        <JCButton
          testID="profile-setmap"
          buttonType={ButtonTypes.TransparentBoldBlackNoMargin}
          onPress={() => {
            setShowPage("admin")
            setEditMode(false)
            scrollRef.current?.scrollTo(0, 80)
          }}
        >
          Admin
        </JCButton>
      </View>
    ) : null
  }
  const renderOrgSize = () => {
    if (!profileConfig["orgSize"].isVisible) return

    return userDetails?.orgType &&
      orgTypes.includes(userDetails?.orgType) &&
      (userDetails.orgSize || editMode) ? (
      <View style={{ marginTop: 15 }}>
        {isEditable && editMode ? (
          <View>
            <View style={styles.style.fontFormSmall}>
              How many employees are there in the organization?
            </View>
            <Picker
              accessibilityLabel="Number of employees in organization"
              testID="profile-orgSize"
              style={styles.style.myprofilePicker}
              onValueChange={(itemValue: any) => {
                handleInputChange(itemValue, "orgSize")
              }}
              selectedValue={userDetails.orgSize ?? ""}
            >
              <Picker.Item label={"None Selected"} value={""} />
              {numberOfEmployees.map((item, index) => {
                return <Picker.Item key={index} label={item} value={item} />
              })}
            </Picker>
          </View>
        ) : userDetails.orgSize ? (
          <View>
            <View style={styles.style.fontFormSmall}>Employees</View>

            <EditableText
              multiline={true}
              textStyle={styles.style.fontFormSmallDarkGrey}
              value={userDetails.orgSize}
              isEditable={false}
            />
          </View>
        ) : null}
      </View>
    ) : null
  }
  const checkForValidOrgInfo = (): boolean => {
    const user = userDetails

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
  const renderOrgAttendance = () => {
    if (!profileConfig["sundayAttendance"].isVisible) return

    return userDetails?.orgType &&
      orgTypesChurches.includes(userDetails?.orgType) &&
      (userDetails.sundayAttendance || editMode) ? (
      <View style={{ marginTop: 15 }}>
        {isEditable && editMode ? (
          <View>
            <View style={styles.style.fontFormSmall}>Average Sunday morning attendance</View>
            <Picker
              accessibilityLabel="Average Sunday morning attendance"
              style={styles.style.myprofilePicker}
              onValueChange={(itemValue: any) => {
                handleInputChange(itemValue, "sundayAttendance")
              }}
              selectedValue={userDetails.sundayAttendance ?? ""}
            >
              <Picker.Item label={"None Selected"} value={""} />
              {sundayAttendance.map((item, index) => {
                return <Picker.Item key={index} label={item} value={item} />
              })}
            </Picker>
          </View>
        ) : userDetails.sundayAttendance ? (
          <View>
            <View style={styles.style.fontFormSmall}>Average Sunday morning attendance</View>
            <EditableText
              accessibilityLabel="Average Sunday morning attendance"
              multiline={true}
              textStyle={styles.style.fontFormSmallDarkGrey}
              value={userDetails.sundayAttendance}
              isEditable={false}
            />
          </View>
        ) : null}
      </View>
    ) : null
  }
  const renderOrgVolunteers = () => {
    if (!profileConfig["numberVolunteers"].isVisible) return

    return userDetails?.orgType &&
      orgTypes.includes(userDetails?.orgType) &&
      (userDetails.numberVolunteers || editMode) ? (
      <View style={{ marginTop: 15 }}>
        {isEditable && editMode ? (
          <View>
            <View style={styles.style.fontFormSmall}>Number of volunteers</View>
            <Picker
              accessibilityLabel="Number of volunteers"
              style={styles.style.myprofilePicker}
              onValueChange={(itemValue: any) => {
                handleInputChange(itemValue, "numberVolunteers")
              }}
              selectedValue={userDetails.numberVolunteers ?? ""}
            >
              <Picker.Item label={"None Selected"} value={""} />
              {numberOfEmployees.map((item, index) => {
                return <Picker.Item key={index} label={item} value={item} />
              })}
            </Picker>
          </View>
        ) : userDetails.numberVolunteers ? (
          <View>
            <View style={styles.style.fontFormSmall}>Number of volunteers</View>
            <EditableText
              multiline={true}
              textStyle={styles.style.fontFormSmallDarkGrey}
              value={userDetails.numberVolunteers}
              isEditable={false}
            />
          </View>
        ) : null}
      </View>
    ) : null
  }
  const renderOrgDenomination = () => {
    if (!profileConfig["denomination"].isVisible) return

    return userDetails?.orgType &&
      orgTypesChurches.includes(userDetails?.orgType) &&
      (userDetails?.denomination || editMode) ? (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.style.fontFormSmall}>Denomination</Text>
        <EditableText
          onChange={(e) => {
            handleInputChange(e, "denomination")
          }}
          accessibilityLabel="Denomination"
          multiline={true}
          testID="profile-denomination"
          textStyle={styles.style.fontFormSmallDarkGrey}
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
          value={userDetails.denomination ?? ""}
          isEditable={isEditable && editMode}
        ></EditableText>
      </View>
    ) : null
  }
  const renderOrgPPLServed = () => {
    if (!profileConfig["pplServed"].isVisible) return

    return userDetails?.orgType &&
      orgTypesNonChurch.includes(userDetails?.orgType) &&
      (userDetails.pplServed || editMode) ? (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.style.fontFormSmall}>
          {editMode ? "How many people do you serve?" : "People impacted by our services"}
        </Text>
        <EditableText
          accessibilityLabel={
            editMode ? "How many people do you serve?" : "People impacted by our services"
          }
          onChange={(e) => {
            handleInputChange(e, "pplServed")
          }}
          multiline={true}
          testID="profile-pplServed"
          textStyle={styles.style.fontFormSmallDarkGrey}
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
          value={userDetails.pplServed ?? ""}
          isEditable={isEditable && editMode}
        ></EditableText>
      </View>
    ) : null
  }
  const renderOrgDescription = () => {
    if (!profileConfig["orgDescription"].isVisible) return

    if (userDetails)
      return userDetails.orgDescription || editMode ? (
        <View style={{ marginTop: 15 }}>
          <Text style={styles.style.fontFormSmall}>
            Description of church or ministry organization
          </Text>
          <EditableText
            onChange={(e) => {
              handleInputChange(e, "orgDescription")
            }}
            multiline={true}
            accessibilityLabel="Describe church or organization"
            testID="profile-orgDescription"
            textStyle={styles.style.fontFormSmallDarkGrey}
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
            value={userDetails.orgDescription ?? ""}
            isEditable={isEditable && editMode}
          ></EditableText>
        </View>
      ) : null
  }
  const renderProfile = () => {
    if (!userDetails) return
    return (
      <View style={styles.style.profileScreenRightCard}>
        <View style={{ width: "100%" }}>{renderMap()}</View>

        {renderAboutMeLong()}
        {renderInterests()}
        {renderCurrentRoleEdit()}
        {renderCurrentScope()}
        {renderPersonalityIndicator()}

        <Text style={styles.style.fontFormSmall}>&nbsp;</Text>
        {checkForValidOrgInfo() || (isEditable && editMode) ? (
          !props.hideOrg ? (
            <View>
              {isEditable && editMode ? (
                <Text style={styles.style.fontBold}>Tell us about your organization</Text>
              ) : (
                <Text style={styles.style.fontBold}>Organization Info</Text>
              )}
              {renderOrgName()}
              {renderOrgType()}
              {renderOrgSize()}
              {renderOrgAttendance()}
              {renderOrgVolunteers()}
              {renderOrgDenomination()}
              {renderOrgPPLServed()}
              {renderOrgDescription()}
            </View>
          ) : null
        ) : null}
      </View>
    )
  }
  const renderLocation = () => {
    if (!profileConfig["location"].isVisible) return

    if (!userDetails) return null
    return (
      <>
        {isEditable && editMode ? (
          <Text style={styles.style.fontFormSmallHeader}>
            <Text style={styles.style.fontFormMandatory}>*</Text>
            Public Location
          </Text>
        ) : null}
        {isEditable && editMode ? (
          <EditableLocation
            onChange={(value: any, location: any) => {
              if (location) {
                handleInputChange(
                  {
                    latitude: location.lat,
                    longitude: location.lng,
                    geocodeFull: value,
                    randomLatitude: userDetails?.location?.randomLatitude
                      ? userDetails?.location.randomLatitude
                      : Math.random() * 0.04 - 0.02,
                    randomLongitude: userDetails?.location?.randomLongitude
                      ? userDetails.location.randomLongitude
                      : Math.random() * 0.04 - 0.02,
                  },
                  "location"
                )
              }
            }}
            multiline={false}
            textStyle={styles.style.fontRegular}
            inputStyle={styles.style.groupNameInput}
            value={userDetails.location?.geocodeFull ?? ""}
            isEditable={isEditable && editMode}
            citiesOnly={true}
          ></EditableLocation>
        ) : null}
      </>
    )
  }
  const renderStartConversation = () => {
    if (!profileConfig["aboutMeShort"].isVisible) return null
    if (isEditable) return null
    if (!userDetails?.id) return null
    return (
      <Pressable
        style={styles.style.connectWithSliderButton}
        onPress={() => {
          openConversation(
            userDetails?.id,
            userDetails?.given_name + " " + userDetails?.family_name
          )
        }}
      >
        <Text style={styles.style.fontStartConversation}>Start Conversation</Text>
      </Pressable>
    )
  }
  const onProfileImageChange = async (e: any): Promise<void> => {
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
    } as any)
      .then(() => {
        const updateData = { ...userDetails }
        updateData["profileImage"] = {
          __typename: "Image",
          userId: userId,
          filenameUpload: fn,
          filenameLarge: fnSave.replace("[size]", "large"),
          filenameMedium: fnSave.replace("[size]", "medium"),
          filenameSmall: fnSave.replace("[size]", "small"),
        }
        setUserDetails(updateData as UserData)
        setDirty(true)
        getProfileImage(updateData as UserData)
      })
      .catch((err: unknown) => console.log(err))
  }
  const convertProfileToMapData = () => {
    if (userDetails?.location && userDetails?.location.latitude && userDetails?.location.longitude)
      setMapData([
        {
          latitude:
            Number(userDetails.location.latitude) + Number(userDetails.location.randomLatitude),
          longitude:
            Number(userDetails.location.longitude) + Number(userDetails.location.randomLatitude),
          name: userDetails.given_name + " " + userDetails.family_name,
          user: userDetails,
          link: "",
          type: "profile",
        },
      ])
    setInitCenter({
      lat: Number(userDetails?.location?.latitude) + Number(userDetails?.location?.randomLatitude),
      lng: Number(userDetails?.location?.longitude) + Number(userDetails?.location?.randomLatitude),
    })
  }
  const handleInputChange = (event: any, name: string): void => {
    const value =
      event.target === undefined
        ? event
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    // const name = target.name;
    console.log(value)
    const updateData = { ...userDetails } as any
    if (updateData && name) {
      updateData[name] = value
      setUserDetails(updateData)
    }
    setDirty(true)
    // await state updates
    if (name === "location") convertProfileToMapData()
  }
  const renderProfileImage = () => {
    if (!profileConfig?.["profileImage"]?.isVisible) return null
    const brand = Brand()
    return (
      <View style={styles.style.myProfileImageWrapper}>
        <Image
          style={styles.style.myProfileImage}
          source={
            profileImage == "" ? require("../../assets/profile-placeholder.png") : profileImage
          }
          onError={() => {
            getProfileImage(userDetails as UserData)
          }}
        ></Image>
        {isEditable && editMode ? (
          <View accessible={false} style={styles.style.fileInputWrapper}>
            <TouchableOpacity
              accessible={false}
              style={{
                backgroundColor: brand == "oneStory" ? "rgb(255, 198, 41)" : "#F0493E",
                padding: 12,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  margin: "auto",
                  fontSize: 16,
                  color: brand == "oneStory" ? "black" : "white",
                  fontFamily: "Graphik-Regular-App",
                  fontWeight: "700",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Set Account Picture
              </Text>
              <input
                aria-role="button"
                aria-label="Upload a profile picture"
                data-testId="profile-image"
                style={{
                  cursor: "pointer",
                  fontSize: 200,
                  height: 50,
                  width: 200,
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  opacity: "0",
                }}
                type="file"
                accept="image/*"
                onChange={(e) => onProfileImageChange(e)}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        {/*<Text style={styles.style.fontFormProfileImageText}>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>*/}
      </View>
    )
  }
  const renderName = () => {
    if (!profileConfig["fullName"].isVisible) return null
    if (!userDetails) return null
    return (
      <Text style={styles.style.fontFormName}>
        {userDetails.given_name} {userDetails.family_name}
      </Text>
    )
  }
  const renderCurrentRole = () => {
    if (!profileConfig["currentRole"].isVisible) return

    if (userDetails)
      return (
        <Text style={styles.style.fontFormRole}>
          {userDetails.currentRole ? userDetails.currentRole : "My Current Role not defined"}
        </Text>
      )
  }
  const renderAboutMeShort = () => {
    if (!profileConfig["aboutMeShort"].isVisible) return

    if (!userDetails) return null
    return (
      <>
        {isEditable && editMode ? (
          <Text style={styles.style.fontFormSmall}>One sentence about me</Text>
        ) : null}
        <EditableText
          onChange={(e) => {
            handleInputChange(e, "aboutMeShort")
          }}
          placeholder="Short sentence about me"
          multiline={true}
          placeholderTextColor="#757575"
          textStyle={styles.style.fontFormSmallDarkGrey}
          inputStyle={styles.style.fontFormAboutMe}
          testID="profile-aboutMeShort"
          value={userDetails.aboutMeShort ?? ""}
          isEditable={isEditable && editMode}
        ></EditableText>
      </>
    )
  }
  const renderMainUserGroup = (group: string) => {
    return <Text style={styles.style.fontFormUserType}>{group}</Text>
  }
  const renderLocation2 = () => {
    if (!profileConfig["location"].isVisible) return null

    if (!userDetails) return null
    return (
      <Text style={styles.style.fontFormSmallDarkGreyCoordinates}>
        <Image
          style={{
            width: "22px",
            height: "22px",
            top: 6,
            marginRight: 5,
          }}
          source={require("../../assets/svg/pin 2.svg")}
        ></Image>
        {userDetails.location?.geocodeFull
          ? userDetails.location.geocodeFull
          : "Location not defined"}
      </Text>
    )
  }
  const renderLeftBar = (userActions: UserActions) => {
    if (!userDetails) return null
    return (
      <View style={styles.style.profileScreenLeftCard}>
        {renderProfileImage()}
        <View style={styles.style.myProfilePersonalInfoWrapper}>
          {renderName()}
          {renderCurrentRole()}
          {renderMainUserGroup(userDetails?.mainUserGroup ?? "Inactive")}
          {renderAboutMeShort()}

          <View style={styles.style.myProfileCoordinates}>
            {renderLocation2()}
            {isEditable && userDetails.profileState !== "Incomplete" ? (
              <JCButton buttonType={ButtonTypes.EditButton} onPress={() => handleEditMode()}>
                {editMode ? "View Profile" : "Edit Profile"}
              </JCButton>
            ) : null}
          </View>
          {renderJoinedDate()}
          {renderStartConversation()}
        </View>
        {renderLocation()}
        {renderAdminButton(userActions)}
      </View>
    )
  }
  if (!userState) return null
  if (noUserFound) return <Text>No User Found</Text>
  if (!profileConfig) return null
  if (!userDetails) return null
  return (
    <ScrollView ref={scrollRef}>
      {renderTopBar(userActions)}

      <View style={styles.style.myProfileMainContainer}>
        {renderLeftBar(userActions)}
        {showPage == "admin" && renderAdmin(userActions)}
        {showPage == "profile" && renderProfile()}
      </View>
    </ScrollView>
  )
}
