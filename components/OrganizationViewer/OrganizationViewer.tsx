import { Picker } from "@react-native-picker/picker"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Amplify, Auth, Storage } from "aws-amplify"
import moment from "moment"
import * as React from "react"
import { useEffect, useState } from "react"
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { MapData } from "src/types"
import { Data } from "../../components/Data/Data"
import Sentry from "../../components/Sentry"
import {
  CreateOrganizationInput,
  CreateOrganizationMemberInput,
  GetOrganizationQuery,
} from "../../src/API"
import awsconfig from "../../src/aws-exports"
import { Brand } from "../../src/Brand"
import { constants } from "../../src/constants"
import { JCCognitoUser } from "../../src/types"
import EditableLocation from "../Forms/EditableLocation"
import EditableText from "../Forms/EditableText"
import EditableUsers from "../Forms/EditableUsers"
import JCButton, { ButtonTypes } from "../Forms/JCButton"
import MyMap from "../MyMap/MyMap"
import { ProfileStyle } from "../MyProfile/ProfileStyle"
//import { AlertConfigInput } from '../../src/API'
import {
  numberOfEmployees,
  orgTypesChurches,
  orgTypesNonChurch,
  sundayAttendance,
} from "../MyProfile/DropdownOptions"
import ProfileImage from "../ProfileImage/ProfileImage"
import Validate from "../Validate/Validate"
//import JCSwitch from '../../components/JCSwitch/JCSwitch';

const orgTypes = orgTypesChurches.concat(orgTypesNonChurch)

Amplify.configure(awsconfig)

interface Props {
  finalizeProfile?(): void
  navigation?: StackNavigationProp<any, any>
  route?: any
  loadId?: string
  create: boolean
}
export type OrganizationData = NonNullable<GetOrganizationQuery["getOrganization"]>

function OrganizationImpl(props: Props) {
  const [organizationDetails, setOrganizationDetails] = useState<OrganizationData | null>(null)

  const [profileImage, setProfileImage] = useState<any>("")
  const [validationText, setValidationText] = useState<any>(null)
  const [showAccountSettings, setShowAccountSettings] = useState<boolean>(false)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [mapData, setMapData] = useState<MapData[]>([])
  const [initCenter, setInitCenter] = useState<any>({ lat: 44, lng: -78.0 })
  const [dirty, setDirty] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [newAdmins, setNewAdmins] = useState<any[]>([])
  const [removeAdmins, setRemoveAdmins] = useState<any[] | null>(null)
  useEffect(() => {
    getUserDetails().then(() => getOrg())
  }, [])
  useEffect(() => {
    getProfileImage()
    convertProfileToMapData()
  }, [organizationDetails])

  const convertProfileToMapData = () => {
    if (
      organizationDetails?.location &&
      organizationDetails?.location.latitude &&
      organizationDetails?.location.longitude
    )
      setMapData([
        {
          latitude:
            Number(organizationDetails.location.latitude) +
            Number(organizationDetails.location.randomLatitude),
          longitude:
            Number(organizationDetails.location.longitude) +
            Number(organizationDetails.location.randomLatitude),
          name: "test",
          user: organizationDetails,
          link: "",
          type: "organization",
        },
      ])

    setInitCenter({
      lat:
        Number(organizationDetails?.location?.latitude) +
        Number(organizationDetails?.location?.randomLatitude),
      lng:
        Number(organizationDetails?.location?.longitude) +
        Number(organizationDetails?.location?.randomLatitude),
    })
  }

  const getUserDetails = async (): Promise<void> => {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      setCurrentUser(user["username"])
    } catch (e) {
      console.log(e)
    }
  }

  const getOrg = async (): Promise<void> => {
    if (!currentUser) {
      return
    }

    if (props.loadId && props.create === false) {
      try {
        const getOrg = await Data.getOrganization(props.loadId)
        setOrganizationDetails(getOrg.data?.getOrganization)
        setIsEditable(getOrg.data?.getOrganization?.admins.includes(currentUser))
        setEditMode(
          getOrg.data?.getOrganization?.admins.includes(currentUser) &&
            getOrg.data?.getOrganization?.profileState === "Incomplete"
        )
      } catch (e: any) {
        if (e.data?.getOrganization) {
          setOrganizationDetails(e.data.getOrganization)
          setIsEditable(e.data.getOrganization.admins.includes(currentUser))
        }
        console.error(e)
      }
    } else {
      try {
        const id = `organization-${Date.now()}`
        const orgInput: CreateOrganizationInput = {
          id: id,
          superAdmin: currentUser,
          admins: [currentUser],
          orgName: "",
          profileState: "Incomplete",
          parentOrganizationId: id,
          joined: moment().format(),
        }
        const createOrg = await Data.createOrganization(orgInput)

        const orgMember: CreateOrganizationMemberInput = {
          userRole: "superAdmin",
          userId: currentUser,
          organizationId: createOrg.data?.createOrganization?.id,
        }

        try {
          const createOrgMember = await Data.createOrganizationMember(orgMember)
          console.log({ createOrgMember: createOrgMember })
        } catch (e) {
          console.log({ error: e })
        }

        setOrganizationDetails(createOrg.data?.createOrganization)
        setIsEditable(true)
        setEditMode(true)
      } catch (e) {
        console.error(e)
      }
    }
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
    const updateData = { ...organizationDetails }
    updateData[name] = value
    setOrganizationDetails(updateData)
    setDirty(true)
  }
  const clean = (item: OrganizationData): OrganizationData => {
    delete item.parentOrganization
    delete item.subOrganizations
    delete item.ownsGroups
    delete item.members
    delete item.resource
    delete item.createdAt
    delete item.updatedAt
    if (item.profileImage) delete item.profileImage["__typename"]
    return item
  }
  const finalizeProfile = async (): Promise<void> => {
    const validation = Validate.Organization(organizationDetails)
    if (validation.result) {
      try {
        const toSave = clean(organizationDetails)
        toSave["profileState"] = "Complete"
        await Data.updateOrganization(toSave)
        if (props.finalizeProfile) props.finalizeProfile()
        else {
          setDirty(false)
          setEditMode(false)
        }
      } catch (e: any) {
        Sentry.captureException(e.errors || e)
        console.log(e)
      }
    }
    setValidationText(validation.validationError)
  }
  const onProfileImageChange = async (e: any): Promise<void> => {
    const file = e.target.files[0]
    const user = await Auth.currentCredentials()
    const userId = user.identityId
    const lastDot = file.name.lastIndexOf(".")
    const ext = file.name.substring(lastDot + 1)
    const fn = "profile/upload/organization-" + new Date().getTime() + "." + ext
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
        const updateData = { ...organizationDetails }
        updateData["profileImage"] = {
          __typename: "Image",
          userId: userId,
          filenameUpload: fn,
          filenameLarge: fnSave.replace("[size]", "large"),
          filenameMedium: fnSave.replace("[size]", "medium"),
          filenameSmall: fnSave.replace("[size]", "small"),
        }
        setOrganizationDetails(updateData)
        setDirty(true)
      })
      .catch((err) => console.log(err))
  }
  const getProfileImage = (): void => {
    console.log("get profile image")
    //console.log(organizationDetails.profileImage)
    if (organizationDetails?.profileImage != null)
      if (organizationDetails?.profileImage.filenameUpload)
        Storage.get(organizationDetails.profileImage.filenameUpload, {
          level: "protected",
          identityId: organizationDetails.profileImage.userId ?? "",
        })
          .then((result) => setProfileImage(result))
          .catch((err) => {
            console.log(err)
          })
  }

  const addAdmins = async (): Promise<void> => {
    if (!newAdmins || newAdmins.length === 0) {
      return
    }

    const newAdmins = organizationDetails?.admins
    const justNewAdmins = []

    newAdmins.forEach((user) => {
      if (!newAdmins.includes(user.id)) newAdmins.push(user.id)
      justNewAdmins.push(user.id)
    })

    if (newAdmins.length < organizationDetails?.admins.length) {
      return
    }

    try {
      const addAdmins = await Data.updateOrganization({
        id: organizationDetails?.id,
        admins: newAdmins,
      })
      console.log({ success: addAdmins })
    } catch (err) {
      Sentry.captureException(err)
      console.error(err)
    }
    createGroupMembers(justNewAdmins)
  }

  const createGroupMembers = (admins: string[]) => {
    admins.map(async (admin) => {
      const orgMember: CreateOrganizationMemberInput = {
        userRole: "admin",
        userId: admin,
        organizationId: organizationDetails?.id,
      }
      try {
        const createOrgMember = await Data.createOrganizationMember(orgMember)
        console.log({ createOrgMember: createOrgMember })
      } catch (e) {
        console.error(e)
      }
    })
  }

  const renderMap = () => {
    return organizationDetails?.location?.geocodeFull ? (
      <MyMap initCenter={initCenter} visible={true} mapData={mapData} type={"profile"}></MyMap>
    ) : null
  }

  const showProfile = (id: string): void => {
    console.log("Navigate to profileScreen")
    props.navigation?.push("ProfileScreen", { id: id, create: false })
  }

  const deleteOrg = (): void => {
    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      if (organizationDetails?.superAdmin === user["username"]) {
        const deleteOrganization = Data.deleteOrganization(organizationDetails.id)
        deleteOrganization
          .then((c) => {
            console.log(c)
            props.navigation?.navigate("HomeScreen")
          })
          .catch((e) => {
            console.log(e)
            props.navigation?.navigate("HomeScreen")
          })
      } else {
        return false
      }
    })
  }
  const styles = StyleSheet.create(ProfileStyle)
  const handleEditMode = () => {
    if (dirty && window.confirm("You have unsaved changes")) {
      setEditMode(!editMode)
      setShowAccountSettings(false)
    } else if (!dirty) {
      setEditMode(!editMode)
      setShowAccountSettings(false)
    }
  }

  const renderMainUserGroup = (group: string) => {
    switch (group) {
      case "verifiedUser":
        return <Text style={styles.fontFormUserType}>Verified</Text>
      case "friend":
        return <Text style={styles.fontFormUserType}>Friend</Text>
      case "partner":
        return <Text style={styles.fontFormUserType}>Partner</Text>
      case "admin":
        return <Text style={styles.fontFormUserType}>Admin</Text>
      default:
        return <Text style={styles.fontFormUserType}>Un-Verified</Text>
    }
  }
  /*openConversation(initialUser, name): void {
    console.log("Navigate to conversationScreen")
    props.navigation.push("ConversationScreen", { initialUserID: initialUser, initialUserName: name });
  }*/

  const brand = Brand()
  return organizationDetails != null ? (
    <ScrollView>
      <View style={styles.myProfileTopButtons}>
        {isEditable && (editMode || showAccountSettings) ? (
          <Text style={styles.profileFontTitle}>Create Organization/Church Profile</Text>
        ) : (
          <Text style={styles.profileFontTitle}>{organizationDetails.orgName}</Text>
        )}
        <View style={styles.myProfileTopButtonsExternalContainer}>
          {isEditable ? (
            <View style={styles.myProfileTopButtonsInternalContainer}>
              {editMode ? (
                <JCButton
                  enabled={dirty}
                  testID="org-save"
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
              {props.loadId && showAccountSettings ? (
                <JCButton
                  buttonType={
                    brand == "oneStory"
                      ? ButtonTypes.SolidProfileDeleteOneStory
                      : ButtonTypes.SolidProfileDelete
                  }
                  onPress={() => deleteOrg()}
                >
                  Delete
                </JCButton>
              ) : null}
            </View>
          ) : null}
          {isEditable && (editMode || showAccountSettings) ? (
            <Text style={styles.myProfileErrorValidation}>{validationText}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.myProfileMainContainer}>
        <View style={styles.profileScreenLeftCard}>
          <View style={styles.myProfileImageWrapper}>
            <Image
              style={styles.myProfileImage}
              source={
                profileImage == "" ? require("../../assets/profile-placeholder.png") : profileImage
              }
              onError={() => {
                getProfileImage()
              }}
            ></Image>
            {isEditable && editMode ? (
              <View style={styles.fileInputWrapper}>
                <JCButton
                  buttonType={
                    brand == "oneStory"
                      ? ButtonTypes.SolidProfileOneStory
                      : ButtonTypes.SolidProfile
                  }
                  onPress={() => {
                    null
                  }}
                >
                  Set Logo
                </JCButton>
                <input
                  data-testId="org-image"
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
                  onChange={(e) => onProfileImageChange(e)}
                />
              </View>
            ) : null}
            {/*<Text style={styles.fontFormProfileImageText}>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>*/}
          </View>
          <View style={styles.myProfilePersonalInfoWrapper}>
            <Text style={styles.fontFormName}>{organizationDetails.orgName}</Text>
            {isEditable && editMode ? (
              <Text style={styles.fontFormSmall}>One sentence about us</Text>
            ) : null}
            <EditableText
              onChange={(e) => {
                handleInputChange(e, "aboutMeShort")
              }}
              placeholder="Short sentence about me"
              multiline={true}
              placeholderTextColor="#757575"
              textStyle={styles.fontFormSmallDarkGrey}
              inputStyle={styles.fontFormAboutMe}
              testID="org-aboutMeShort"
              value={organizationDetails.aboutMeShort ?? ""}
              isEditable={isEditable && editMode}
            ></EditableText>

            <View style={styles.myProfileCoordinates}>
              <Text style={styles.fontFormSmallDarkGreyCoordinates}>
                <Image
                  style={{ width: "22px", height: "22px", top: 6, marginRight: 5 }}
                  source={require("../../assets/svg/pin 2.svg")}
                ></Image>
                {organizationDetails.location?.geocodeFull
                  ? organizationDetails.location.geocodeFull
                  : "Location not defined"}
              </Text>
              {isEditable && organizationDetails.profileState !== "Incomplete" ? (
                <JCButton buttonType={ButtonTypes.EditButton} onPress={() => handleEditMode()}>
                  {editMode ? "View Profile" : "Edit Profile"}
                </JCButton>
              ) : null}
            </View>
            <Text style={styles.fontFormSmallGrey}>
              <Image
                style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }}
                source={require("../../assets/svg/calendar.svg")}
              ></Image>
              Joined:{" "}
              {organizationDetails.joined
                ? moment(organizationDetails.joined).format("MMMM Do YYYY")
                : "Join date unknown"}
            </Text>
            <Text style={styles.fontFormSmallGrey}>
              <Image
                style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }}
                source={require("../../assets/svg/church.svg")}
              ></Image>
              {organizationDetails.orgName ? organizationDetails.orgName : "No Organization Name"}
            </Text>
            {/*!isEditable ?
                  <Button bordered style={styles.connectWithSliderButton} onPress={() => { this.openConversation(organizationDetails.id, organizationDetails.given_name + " " + organizationDetails.family_name) }}><Text style={styles.fontStartConversation}>Start Conversation</Text></Button>
                : null*/}

            {isEditable &&
            organizationDetails.profileState !== "Incomplete" &&
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
                  testID="org-setmap"
                  buttonType={ButtonTypes.TransparentBoldBlackNoMargin}
                  onPress={() => console.error("messages not yet supported")}
                >
                  Messages
                </JCButton>
              </View>
            ) : null}
            {isEditable &&
            organizationDetails.profileState !== "Incomplete" &&
            constants["SETTING_ISVISIBLE_PROFILE_ACCOUNTSETTINGS"] ? (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#33333320",
                  paddingVertical: 10,
                  borderRightWidth: showAccountSettings ? 7 : 0,
                  borderRightColor: "#F0493E",
                }}
              >
                <JCButton
                  buttonType={ButtonTypes.TransparentBoldBlackNoMargin}
                  onPress={() => {
                    setShowAccountSettings(!showAccountSettings)
                    setEditMode(false)
                  }}
                >
                  Account Settings
                </JCButton>
              </View>
            ) : null}
          </View>

          {isEditable && editMode ? (
            <Text style={styles.fontFormSmallHeader}>Public Location</Text>
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
                      randomLatitude: organizationDetails.location?.randomLatitude
                        ? organizationDetails.location.randomLatitude
                        : Math.random() * 0.04 - 0.02,
                      randomLongitude: organizationDetails.location?.randomLongitude
                        ? organizationDetails.location.randomLongitude
                        : Math.random() * 0.04 - 0.02,
                    },
                    "location"
                  )
                }
              }}
              multiline={false}
              textStyle={styles.fontRegular}
              inputStyle={styles.groupNameInput}
              value={organizationDetails.location?.geocodeFull ?? ""}
              isEditable={isEditable && editMode}
              citiesOnly={true}
            ></EditableLocation>
          ) : null}

          {!editMode ? (
            <View>
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
                Members ({organizationDetails.admins.length - 1})
              </Text>
              <View style={styles.groupAttendeesPictures}>
                {organizationDetails.admins.map((id: any, index: any) => {
                  if (id === organizationDetails.superAdmin) {
                    return null
                  }
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        showProfile(id)
                      }}
                    >
                      <ProfileImage key={index} user={id} size="small" />
                    </TouchableOpacity>
                  )
                })}
              </View>

              <Text
                style={{
                  fontFamily: "Graphik-Bold-App",
                  fontSize: 20,
                  lineHeight: 25,
                  letterSpacing: -0.3,
                  color: "#333333",
                  paddingBottom: 12,
                }}
              >
                Administrator
              </Text>
              <TouchableOpacity
                onPress={() => {
                  showProfile(organizationDetails.superAdmin)
                }}
              >
                <ProfileImage user={organizationDetails.superAdmin} size="small" />
              </TouchableOpacity>
            </View>
          ) : null}

          {isEditable && editMode ? (
            <Text style={styles.profilePrivateInformation}>Private Information</Text>
          ) : null}
          {isEditable && editMode ? (
            <View style={{ backgroundColor: "#FFFFFF", width: "100%", marginBottom: 30 }}>
              <View>
                <View style={styles.fontFormSmall}>
                  <Text style={styles.fontFormMandatory}>*</Text>Address
                </View>
                <TextInput
                  testID="org-Address"
                  style={styles.fontFormMediumInput}
                  value={organizationDetails.address ?? ""}
                  onChange={(e) => {
                    handleInputChange(e, "address")
                  }}
                />
              </View>
              <View>
                <View style={styles.fontFormSmall}>
                  <Text style={styles.fontFormMandatory}>*</Text>City
                </View>
                <TextInput
                  testID="org-City"
                  style={styles.fontFormMediumInput}
                  value={organizationDetails.city ?? ""}
                  onChange={(e) => {
                    handleInputChange(e, "city")
                  }}
                />
              </View>
              <View>
                <View style={styles.fontFormSmall}>
                  <Text style={styles.fontFormMandatory}>*</Text>Province/State
                </View>
                <TextInput
                  testID="org-Province"
                  style={styles.fontFormMediumInput}
                  value={organizationDetails.province ?? ""}
                  onChange={(e) => {
                    handleInputChange(e, "province")
                  }}
                />
              </View>
              <View>
                <View style={styles.fontFormSmall}>
                  <Text style={styles.fontFormMandatory}>*</Text>Postal/Zip Code
                </View>
                <TextInput
                  testID="org-PostalCode"
                  style={styles.fontFormMediumInput}
                  value={organizationDetails.postalCode ?? ""}
                  onChange={(e) => {
                    handleInputChange(e, "postalCode")
                  }}
                />
              </View>
              <View>
                <View style={styles.fontFormSmall}>
                  <Text style={styles.fontFormMandatory}>*</Text>Country
                </View>
                <TextInput
                  testID="org-Country"
                  style={styles.fontFormMediumInput}
                  value={organizationDetails.country ?? ""}
                  onChange={(e) => {
                    handleInputChange(e, "country")
                  }}
                />
              </View>
              <View>
                <View style={styles.fontFormSmall}>
                  <Text style={styles.fontFormMandatory}>*</Text>Admin Email Address
                </View>
                <TextInput
                  testID="org-Email"
                  style={styles.fontFormMediumInput}
                  value={organizationDetails.adminEmail ?? ""}
                  onChange={(e) => {
                    handleInputChange(e, "adminEmail")
                  }}
                />
              </View>
              <View>
                <View style={styles.fontFormSmall}>
                  <Text style={styles.fontFormMandatory}>*</Text>Admin Phone #
                </View>
                <TextInput
                  testID="org-Phone"
                  style={styles.fontFormMediumInput}
                  value={organizationDetails.phone ?? ""}
                  onChange={(e) => {
                    handleInputChange(e, "phone")
                  }}
                />
              </View>
            </View>
          ) : null}
        </View>

        {!showAccountSettings ? (
          <View style={styles.profileScreenRightCard}>
            <View style={{ width: "100%" }}>{renderMap()}</View>
            {isEditable && editMode ? (
              <Text style={styles.fontMyProfileLeftTop}>Tell us about your Org</Text>
            ) : null}
            {isEditable && editMode ? (
              <Text style={styles.myprofileAboutMe}>
                <Text style={styles.fontFormMandatory}>*</Text>About us
              </Text>
            ) : (
              <Text style={styles.myprofileAboutMe}>About us</Text>
            )}
            <EditableText
              onChange={(e) => {
                handleInputChange(e, "aboutMeLong")
              }}
              placeholder="type here"
              multiline={true}
              testID="org-aboutMeLong"
              textStyle={styles.fontFormSmallDarkGrey}
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
              }}
              value={organizationDetails.aboutMeLong ?? ""}
              isEditable={isEditable && editMode}
            ></EditableText>

            <Text style={styles.fontFormSmall}>&nbsp;</Text>
            {isEditable && editMode ? (
              <View>
                <Text style={styles.fontBold}>
                  <Text style={styles.fontFormMandatory}>*</Text>Tell us about your organization
                </Text>
                {(isEditable && editMode) || organizationDetails.orgName ? (
                  <View>
                    <View style={styles.fontFormSmall}>Organization Name</View>
                    <EditableText
                      onChange={(e) => {
                        handleInputChange(e, "orgName")
                      }}
                      multiline={false}
                      testID="org-orgName"
                      textStyle={styles.fontFormSmallDarkGrey}
                      inputStyle={styles.myProfileOrgTypeInput}
                      value={organizationDetails.orgName}
                      isEditable={isEditable && editMode}
                    ></EditableText>
                  </View>
                ) : null}

                {(isEditable && editMode) ||
                (organizationDetails.orgType && organizationDetails.orgType !== "None") ? (
                  <View style={{ marginTop: 15 }}>
                    <View style={styles.fontFormSmall}>Type of Organization</View>
                    {isEditable && editMode ? (
                      <View style={styles.myProfileOrgView}>
                        <Picker
                          testID="org-typeOfOrg"
                          style={styles.myprofilePicker}
                          onValueChange={(itemValue) => {
                            handleInputChange(itemValue, "orgType")
                          }}
                          selectedValue={
                            (orgTypes.includes(organizationDetails.orgType ?? "")
                              ? organizationDetails.orgType
                              : organizationDetails.orgType === null ||
                                organizationDetails.orgType === "None"
                              ? "None"
                              : "") ?? undefined
                          }
                        >
                          <Picker.Item label={"None Selected"} value={"None"} />
                          {orgTypes.map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item} />
                          })}
                          <Picker.Item label={"Other"} value={""} />
                        </Picker>
                        {organizationDetails.orgType === "" ||
                        (!orgTypes.includes(organizationDetails.orgType ?? "") &&
                          organizationDetails.orgType !== "None" &&
                          organizationDetails.orgType !== null) ? (
                          <EditableText
                            onChange={(e) => {
                              handleInputChange(e, "orgType")
                            }}
                            multiline={false}
                            textStyle={styles.fontFormSmallDarkGrey}
                            inputStyle={styles.myProfileOrgTypeInput}
                            value={organizationDetails.orgType ?? ""}
                            isEditable={isEditable && editMode}
                          ></EditableText>
                        ) : null}
                      </View>
                    ) : organizationDetails.orgType && organizationDetails.orgType !== "None" ? (
                      <EditableText
                        multiline={true}
                        textStyle={styles.fontFormSmallDarkGrey}
                        value={organizationDetails.orgType}
                        isEditable={false}
                      />
                    ) : null}
                  </View>
                ) : null}

                {orgTypes.includes(organizationDetails.orgType ?? "") &&
                (organizationDetails.orgSize || editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    {isEditable && editMode ? (
                      <View>
                        <View style={styles.fontFormSmall}>
                          How many employees are there in the organization?
                        </View>
                        <Picker
                          testID="org-numEmployees"
                          style={styles.myprofilePicker}
                          onValueChange={(itemValue) => {
                            handleInputChange(itemValue, "orgSize")
                          }}
                          selectedValue={organizationDetails.orgSize ?? undefined}
                        >
                          <Picker.Item label={"None Selected"} value={""} />
                          {numberOfEmployees.map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item} />
                          })}
                        </Picker>
                      </View>
                    ) : organizationDetails.orgSize ? (
                      <View>
                        <View style={styles.fontFormSmall}>Employees</View>

                        <EditableText
                          multiline={true}
                          textStyle={styles.fontFormSmallDarkGrey}
                          value={organizationDetails.orgSize}
                          isEditable={false}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}

                {orgTypesChurches.includes(organizationDetails.orgType ?? "") &&
                (organizationDetails.sundayAttendance || editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    {isEditable && editMode ? (
                      <View>
                        <View style={styles.fontFormSmall}>Average Sunday morning attendance</View>
                        <Picker
                          testID="org-aveSunday"
                          style={styles.myprofilePicker}
                          onValueChange={(itemValue) => {
                            handleInputChange(itemValue, "sundayAttendance")
                          }}
                          selectedValue={organizationDetails.sundayAttendance ?? undefined}
                        >
                          <Picker.Item label={"None Selected"} value={""} />
                          {sundayAttendance.map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item} />
                          })}
                        </Picker>
                      </View>
                    ) : organizationDetails.sundayAttendance ? (
                      <View>
                        <View style={styles.fontFormSmall}>Average Sunday morning attendance</View>
                        <EditableText
                          multiline={true}
                          textStyle={styles.fontFormSmallDarkGrey}
                          value={organizationDetails.sundayAttendance}
                          isEditable={false}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}

                {orgTypes.includes(organizationDetails.orgType ?? "") &&
                (organizationDetails.numberVolunteers || editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    {isEditable && editMode ? (
                      <View>
                        <View style={styles.fontFormSmall}>Number of volunteers</View>
                        <Picker
                          testID="org-numVolunteers"
                          style={styles.myprofilePicker}
                          onValueChange={(itemValue) => {
                            handleInputChange(itemValue, "numberVolunteers")
                          }}
                          selectedValue={organizationDetails.numberVolunteers ?? undefined}
                        >
                          <Picker.Item label={"None Selected"} value={""} />
                          {numberOfEmployees.map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item} />
                          })}
                        </Picker>
                      </View>
                    ) : organizationDetails.numberVolunteers ? (
                      <View>
                        <View style={styles.fontFormSmall}>Number of volunteers</View>
                        <EditableText
                          multiline={true}
                          textStyle={styles.fontFormSmallDarkGrey}
                          value={organizationDetails.numberVolunteers}
                          isEditable={false}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}

                {orgTypesChurches.includes(organizationDetails.orgType ?? "") &&
                (organizationDetails.denomination || editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    <Text style={styles.fontFormSmall}>Denomination</Text>
                    <EditableText
                      onChange={(e) => {
                        handleInputChange(e, "denomination")
                      }}
                      multiline={true}
                      testID="org-denomination"
                      textStyle={styles.fontFormSmallDarkGrey}
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
                      value={organizationDetails.denomination ?? ""}
                      isEditable={isEditable && editMode}
                    ></EditableText>
                  </View>
                ) : null}

                {orgTypesNonChurch.includes(organizationDetails.orgType ?? "") &&
                (organizationDetails.pplServed || editMode) ? (
                  <View style={{ marginTop: 15 }}>
                    <Text style={styles.fontFormSmall}>
                      {editMode
                        ? "How many people do you serve?"
                        : "People impacted by our services"}
                    </Text>
                    <EditableText
                      onChange={(e) => {
                        handleInputChange(e, "pplServed")
                      }}
                      multiline={true}
                      testID="org-pplServed"
                      textStyle={styles.fontFormSmallDarkGrey}
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
                      value={organizationDetails.pplServed ?? ""}
                      isEditable={isEditable && editMode}
                    ></EditableText>
                  </View>
                ) : null}

                {organizationDetails.orgDescription || editMode ? (
                  <View style={{ marginTop: 15 }}>
                    <Text style={styles.fontFormSmall}>
                      Description of church or ministry organization
                    </Text>
                    <EditableText
                      onChange={(e) => {
                        handleInputChange(e, "orgDescription")
                      }}
                      multiline={true}
                      testID="org-orgDescription"
                      textStyle={styles.fontFormSmallDarkGrey}
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
                      value={organizationDetails.orgDescription ?? ""}
                      isEditable={isEditable && editMode}
                    ></EditableText>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.profileScreenRightCard}>
            <Text style={styles.myprofileAboutMe}>Account Settings</Text>

            <EditableUsers
              onChange={(newAdmins2: any[]) => setNewAdmins(newAdmins2)}
              multiline={false}
              showProfileImages={true}
              textStyle={styles.fontFormSmallDarkGrey}
              inputStyle={styles.fontFormLargeInput}
              value={newAdmins}
              isEditable={true}
            ></EditableUsers>
            <JCButton buttonType={ButtonTypes.SolidAboutMe} onPress={() => addAdmins()}>
              <Text>Add Admins</Text>
            </JCButton>

            {/*<EditableUsers
                  onChange={(removeAdmins: any[]) => this.setState({ removeAdmins })}
                  multiline={false}
                  showProfileImages={true}
                  textStyle={styles.fontFormSmallDarkGrey}
                  inputStyle={styles.fontFormLargeInput}
                  value={removeAdmins} isEditable={true}></EditableUsers>
                <JCButton buttonType={ButtonTypes.SolidAboutMe} onPress={() => this.removeAdmins()}><Text>Remove Admins</Text></JCButton>*/}
            {/*<View style={{ ...styles.fontFormSmallDarkGrey, marginBottom: 15 }}>Alert Settings</View>
                  <JCSwitch containerWidth={500} switchLabel="Receive Email Alerts for Direct Messages" initState={organizationDetails.alertConfig?.emailDirectMessage == "true"} onPress={(e) => { this.handleAlertInputChange(e, "emailDirectMessage") }}></JCSwitch>
                  <JCSwitch containerWidth={500} switchLabel="Receive Email Alerts for Group Messages" initState={organizationDetails.alertConfig?.emailGroupMessage == "true"} onPress={(e) => { this.handleAlertInputChange(e, "emailGroupMessage") }}></JCSwitch>
                  <JCSwitch containerWidth={500} switchLabel="Receive Email Alerts for Event Messages" initState={organizationDetails.alertConfig?.emailEventMessage == "true"} onPress={(e) => { this.handleAlertInputChange(e, "emailEventMessage") }}></JCSwitch>
                  <JCSwitch containerWidth={500} switchLabel="Receive Email Alerts for Resource Messages" initState={organizationDetails.alertConfig?.emailResourceMessage == "true"} onPress={(e) => { this.handleAlertInputChange(e, "emailResourceMessage") }}></JCSwitch>
                  <JCSwitch containerWidth={500} switchLabel="Receive Email Alerts for Course Messages" initState={organizationDetails.alertConfig?.emailCourseMessage == "true"} onPress={(e) => { this.handleAlertInputChange(e, "emailCourseMessage") }}></JCSwitch>
                  <JCSwitch containerWidth={500} switchLabel="Receive Email Alerts for Organization Messages" initState={organizationDetails.alertConfig?.emailOrgMessage == "true"} onPress={(e) => { this.handleAlertInputChange(e, "emailOrgMessage") }}></JCSwitch>
                  <JCSwitch containerWidth={500} switchLabel="Receive Email Alerts for Org Messages" initState={organizationDetails.alertConfig?.emailPromotions == "true"} onPress={(e) => { this.handleAlertInputChange(e, "emailPromotions") }}></JCSwitch>*/}
          </View>
        )}
      </View>
    </ScrollView>
  ) : null
}

export default function Organization(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return <OrganizationImpl {...props} navigation={navigation} route={route} />
}
