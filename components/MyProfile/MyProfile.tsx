import { Button, View, Input, Form, Item, Label, Content, Picker, Badge, Container } from 'native-base';
import { Text, Image, TouchableOpacity } from 'react-native'
import * as React from 'react';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'

import { Auth } from 'aws-amplify';
import { GetUserQuery } from '../../src/API'
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import Validate from '../Validate/Validate';
import moment from 'moment';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import EditableLocation from '../../components/Forms/EditableLocation'
import MyMap from '../../components/MyMap/MyMap'
import EditableText from '../Forms/EditableText';
import { AntDesign } from '@expo/vector-icons';

import { interests, orgSizeBig, orgSizeSmall, orgTypes } from './dropdown'
import { constants } from '../../src/constants'
import JCComponent, { JCState } from '../JCComponent/JCComponent';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MapData } from 'components/MyGroups/MyGroups';
import { TextInput } from 'react-native-gesture-handler';

Amplify.configure(awsconfig);

interface Props {
  finalizeProfile?(): void
  navigation?: any
  route?: any
  loadId?: any

}
export type UserData = NonNullable<GetUserQuery['getUser']>;

interface State extends JCState {
  UserDetails: UserData
  interest: string
  interestsArray: any
  profileImage: any
  validationText: any
  mapVisible: any
  // mapCoord: any
  isEditable: boolean
  showAccountSettings: boolean
  editMode: boolean
  mapData: MapData[]
  initCenter: any
  dirty: boolean
  oldPass: string
  newPass: string
  passError: string
}
class MyProfileImpl extends JCComponent<Props, State> {
  orgsWithEmployees = ["Church", "Church Plant", "Academic Institution", "Compassion/Mission"]
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      UserDetails: null,
      interest: null,
      interestsArray: [],
      profileImage: "",
      validationText: null,
      showAccountSettings: false,
      mapVisible: false,
      //  mapCoord: { latitude: 0, longitude: 0 },
      isEditable: false,
      editMode: false,
      mapData: [],
      initCenter: { lat: 44, lng: -78.0 },
      dirty: false,
      oldPass: '',
      newPass: '',
      passError: '',
    }
    this.getUserDetails()
  }

  convertProfileToMapData() {
    if (this.state.UserDetails.location && this.state.UserDetails.location.latitude && this.state.UserDetails.location.longitude)
      this.setState({
        mapData: [{
          latitude: this.state.UserDetails.location.latitude,
          longitude: this.state.UserDetails.location.longitude,
          name: this.state.UserDetails.given_name + " " + this.state.UserDetails.family_name,
          user: this.state.UserDetails,
          link: "",
          type: "profile"
        }],
        initCenter: { lat: this.state.UserDetails.location.latitude, lng: this.state.UserDetails.location.longitude }
      })
  }
  async getUserDetails(): Promise<void> {
    console.log("getUserDetails")
    const user = await Auth.currentAuthenticatedUser();
    if (this.props.loadId) {
      try {
        const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: this.props.loadId }));
        this.setState({
          UserDetails: getUser.data.getUser,
          isEditable: getUser.data.getUser.id == user['username'],
          interestsArray: getUser.data.getUser.interests
        }, () => { this.getProfileImage(); this.convertProfileToMapData() }
        )

        //console.log(this.state.UserDetails)
      }
      catch (e) {
        if (e.data.getUser != null)
          this.setState({
            UserDetails: e.data.getUser,
            interestsArray: e.data.getUser.interests
          }, () => { this.getProfileImage(); this.convertProfileToMapData() }
          )
        console.log(e)
      }
    }
    else {

      try {
        const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: user['username'] }));
        this.setState({
          UserDetails: getUser.data.getUser,
          isEditable: true,
          editMode: true,
          interestsArray: getUser.data.getUser.interests
        }, () => { this.getProfileImage(); this.convertProfileToMapData() }
        )

        console.log(this.state.UserDetails)
      }
      catch (e) {
        console.log(e)
      }
    }
  }
  handleInputChange(event: any, name: string): void {

    const value = event.target === undefined ? event : event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    // const name = target.name;
    console.log(value)
    const updateData = { ...this.state.UserDetails }
    updateData[name] = value
    this.setState({
      UserDetails: updateData,
      dirty: true
    }, () => {
      if (name === "location")
        this.convertProfileToMapData()
    });
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
    if (item.profileImage)
      delete item.profileImage["__typename"]
    delete item.directMessages
    return item
  }
  async finalizeProfile(): Promise<void> {

    const validation = Validate.Profile(this.state.UserDetails)
    if (validation.result) {
      try {
        const toSave = this.clean(this.state.UserDetails)
        toSave["profileState"] = "Complete"
        const updateUser = await API.graphql(graphqlOperation(mutations.updateUser, { input: toSave }));
        this.setState({ dirty: false })
        console.log({ "updateUser:": updateUser })
        if (this.props.finalizeProfile)
          this.props.finalizeProfile()
        else
          this.setState({ editMode: false })
      } catch (e) {
        console.log(e)
      }
    }
    this.setState({ validationText: validation.validationError })
  }
  async onProfileImageChange(e: any): Promise<void> {
    const file = e.target.files[0];
    const user = await Auth.currentCredentials();
    const userId = user.identityId
    const lastDot = file.name.lastIndexOf('.');
    const ext = file.name.substring(lastDot + 1);
    const fn = 'profile/upload/profile-' + new Date().getTime() + '.' + ext
    const fnSave = fn.replace("/upload", "").replace(".", "-[size].").replace("." + ext, ".png")

    Storage.put(fn, file, {
      level: 'protected',
      contentType: file.type,
      identityId: userId
    })
      .then(() => {

        const updateData = { ...this.state.UserDetails }
        updateData['profileImage'] = {
          __typename: "Image",
          userId: userId,
          filenameUpload: fn,
          filenameLarge: fnSave.replace('[size]', 'large'),
          filenameMedium: fnSave.replace('[size]', 'medium'),
          filenameSmall: fnSave.replace('[size]', 'small')
        }

        this.setState({
          UserDetails: updateData,
          dirty: true
        }, () => {
          this.getProfileImage()



        });
      })
      .catch(err => console.log(err));
  }

  getProfileImage(): void {
    console.log("get profile image")
    //console.log(this.state.UserDetails.profileImage)
    if (this.state.UserDetails.profileImage != null)
      Storage.get(this.state.UserDetails.profileImage.filenameUpload, {
        level: 'protected',
        identityId: this.state.UserDetails.profileImage.userId
      })
        .then(result => this.setState({ profileImage: result }))
        .catch(err => { console.log(err) });
  }
  getValueFromKey(myObject: any, string: any) {
    const key = Object.keys(myObject).filter(k => k.includes(string));
    return key.length ? myObject[key[0]] : "";
  }
  logout(): void {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));

  }
  showMap(): void {
    console.log("showMap")
    this.setState({ mapVisible: true })
  }
  renderMap() {
    return (
      this.state.UserDetails.location?.geocodeFull ? <MyMap initCenter={this.state.initCenter} visible={true} mapData={this.state.mapData} type={"profile"}></MyMap> : null
    )
  }
  saveLocation(coord): void {
    console.log("saveLocation")
    this.handleInputChange({ target: { value: { latitude: coord.latitude, longitude: coord.longitude } } }, "location")
    this.setState({ mapVisible: false })
  }
  handleAddInterest(): void {
    if (this.state.interest && this.state.interestsArray === null) {
      this.setState({ interestsArray: [this.state.interest] },
        () => {
          const updateData = { ...this.state.UserDetails }
          updateData['interests'] = this.state.interestsArray
          this.setState({
            UserDetails: updateData,
            dirty: true
          });
        })
    }
    else if (this.state.interest && (this.state.interestsArray.filter(item => item === this.state.interest).length === 0) && this.state.interestsArray.length < 7) {
      this.setState({ interestsArray: this.state.interestsArray.concat(this.state.interest) },
        () => {
          const updateData = { ...this.state.UserDetails }
          updateData['interests'] = this.state.interestsArray
          this.setState({
            UserDetails: updateData,
            dirty: true
          });
        })
    }
  }
  deleteUser(): void {
    Auth.currentAuthenticatedUser().then((user) => {
      const deleteUser: any = API.graphql({
        query: mutations.deleteUser,
        variables: {
          input: { id: user['username'] }
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      })
      deleteUser.then((c: any) => {
        console.log(c)
        const delStat = user.deleteUser()
        console.log(delStat)
        this.props.navigation.navigate("/")
        // return delStat
      }).catch((e: any) => {
        console.log(e)
        const delStat = user.deleteUser()
        console.log(delStat)
        this.props.navigation.navigate("/")
        // return delStat
      })
    })
  }
  handleDeleteInterest(event): void {
    const remainingInterests = this.state.interestsArray.filter(item => item !== event)
    this.setState({ interestsArray: remainingInterests.length === 0 ? null : remainingInterests },
      () => {
        const updateData = { ...this.state.UserDetails }
        updateData['interests'] = this.state.interestsArray
        this.setState({
          UserDetails: updateData,
          dirty: true
        });
      })
  }

  async handlePasswordChange(): Promise<void> {
    if (!this.state.oldPass || !this.state.newPass) {
      this.setState({ passError: 'Required: Current password, New password' })
      return
    }
    try {
      const user = await Auth.currentAuthenticatedUser()
      const result = await Auth.changePassword(user, this.state.oldPass, this.state.newPass);
      this.setState({ passError: result })
    } catch (e) {
      console.error(e)
      if (e.message.includes('validation'))
        this.setState({ passError: e.message.split(":")[0] })
      else
        this.setState({ passError: e.message })
    }
    this.setState({ oldPass: '', newPass: '' })
  }

  renderMainUserGroup(group) {
    switch (group) {
      case 'verifiedUser':
        return <Text style={this.styles.style.fontFormUserType}>Verified</Text>
      case 'friend':
        return <Text style={this.styles.style.fontFormUserType}>Friend</Text >
      case 'partner':
        return <Text style={this.styles.style.fontFormUserType}>Partner</Text>
      case 'admin':
        return <Text style={this.styles.style.fontFormUserType}>Admin</Text>
      default:
        return <Text style={this.styles.style.fontFormUserType}>Un-Verified</Text >
    }
  }
  openConversation(initialUser, name): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", { initialUserID: initialUser, initialUserName: name });
  }
  render(): React.ReactNode {
    return (
      (this.state.UserDetails != null ?
        <Content>
          <View style={this.styles.style.myProfileTopButtons}>
            {this.state.isEditable && (this.state.editMode || this.state.showAccountSettings) ?
              <Text style={this.styles.style.profileFontTitle}>Setup your profile</Text>
              : <Text style={this.styles.style.profileFontTitle}>{this.state.UserDetails.given_name}&apos;s profile</Text>
            }
            <View style={this.styles.style.myProfileTopButtonsExternalContainer}>
              {this.state.isEditable ?
                <View style={this.styles.style.myProfileTopButtonsInternalContainer}>
                  {this.state.editMode ? <JCButton enabled={this.state.dirty}
                    data-testid="profile-save"
                    buttonType={ButtonTypes.SolidRightMargin}
                    onPress={() => { this.finalizeProfile() }}>Save Profile</JCButton> : null}
                  <JCButton buttonType={ButtonTypes.Solid} onPress={() => this.logout()}>Logout</JCButton>
                  {this.props.loadId && this.state.showAccountSettings ? <JCButton buttonType={ButtonTypes.SolidProfileDelete} onPress={() => this.deleteUser()}>Delete</JCButton> : null}
                </View>
                : null
              }
              {
                this.state.isEditable && (this.state.editMode || this.state.showAccountSettings) ?
                  <Text style={this.styles.style.myProfileErrorValidation}>{this.state.validationText}</Text>
                  : null
              }
            </View>
          </View>

          <Form style={this.styles.style.myProfileMainContainer}>
            <View style={this.styles.style.profileScreenLeftCard}>
              <View style={this.styles.style.myProfileImageWrapper}>
                <Image style={this.styles.style.myProfileImage}
                  source={this.state.profileImage == "" ? require('../../assets/profile-placeholder.png') : this.state.profileImage} onError={() => { this.getProfileImage() }}>

                </Image>
                {this.state.isEditable && this.state.editMode ?
                  <View style={this.styles.style.fileInputWrapper}>
                    <JCButton buttonType={ButtonTypes.SolidProfile} onPress={() => { null }}>Set Profile Picture</JCButton>
                    <input data-testid="profile-image" style={{ cursor: 'pointer', fontSize: "200px", position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='image/*' onChange={(e) => this.onProfileImageChange(e)} />
                  </View>
                  : null
                }
                {/*<Text style={this.styles.style.fontFormProfileImageText}>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>*/}
              </View>
              <View style={this.styles.style.myProfilePersonalInfoWrapper}>
                <Text style={this.styles.style.fontFormName}>{this.state.UserDetails.given_name} {this.state.UserDetails.family_name}</Text>
                <Text style={this.styles.style.fontFormRole}>{this.state.UserDetails.currentRole ? this.state.UserDetails.currentRole : 'My Current Role not defined'}</Text>
                {
                  this.renderMainUserGroup(this.state.UserDetails.mainUserGroup)
                }

                {this.state.isEditable && this.state.editMode ?
                  <Text style={this.styles.style.fontFormSmall}>One sentence about me</Text>
                  : null
                }
                <EditableText onChange={(e) => { this.handleInputChange(e, "aboutMeShort") }}
                  placeholder="Short sentence about me" multiline={true}
                  placeholderTextColor="#757575"
                  textStyle={this.styles.style.fontFormSmallDarkGrey}
                  inputStyle={this.styles.style.fontFormAboutMe}
                  data-testid="profile-aboutMeShort"
                  value={this.state.UserDetails.aboutMeShort} isEditable={this.state.isEditable && this.state.editMode}></EditableText>

                <View style={this.styles.style.myProfileCoordinates}>
                  <Text style={this.styles.style.fontFormSmallDarkGreyCoordinates}><Image style={{ width: "22px", height: "22px", top: 6, marginRight: 5 }} source={require('../../assets/svg/pin 2.svg')}></Image>{this.state.UserDetails.location?.geocodeFull ? this.state.UserDetails.location.geocodeFull : "Location not defined"}</Text>
                  {this.state.isEditable && this.state.UserDetails.profileState !== "Incomplete" ? <JCButton buttonType={ButtonTypes.EditButton} onPress={() => this.setState({ editMode: !this.state.editMode, showAccountSettings: false })}>{this.state.editMode ? 'View Profile' : 'Edit Profile'}</JCButton> : null}
                </View>
                <Text style={this.styles.style.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }} source={require('../../assets/svg/calendar.svg')}></Image>{this.state.UserDetails.joined ? moment(this.state.UserDetails.joined).format('MMMM Do YYYY') : "Join date unknown"}</Text>
                <Text style={this.styles.style.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }} source={require('../../assets/svg/church.svg')}></Image>{this.state.UserDetails.orgName ? this.state.UserDetails.orgName : "No Organization Name"}</Text>
                {!this.state.isEditable ?
                  <Button bordered style={this.styles.style.connectWithSliderButton} onPress={() => { this.openConversation(this.state.UserDetails.id, this.state.UserDetails.given_name + " " + this.state.UserDetails.family_name) }}><Text style={this.styles.style.fontStartConversation}>Start Conversation</Text></Button>
                  : null}

                {this.state.isEditable && this.state.UserDetails.profileState !== "Incomplete" && constants['SETTING_ISVISIBLE_PROFILE_MESSAGES'] ?
                  <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#33333320', paddingVertical: 10 }}><JCButton data-testid="profile-setmap" buttonType={ButtonTypes.TransparentBoldBlackNoMargin} onPress={() => { this.props.navigation.push("ConversationScreen", { initialUserID: null, initialUserName: null }) }}>Messages</JCButton></View>
                  : null
                }
                {this.state.isEditable && this.state.UserDetails.profileState !== "Incomplete" && constants['SETTING_ISVISIBLE_PROFILE_ACCOUNTSETTINGS'] ?
                  <View style={{ borderBottomWidth: 1, borderBottomColor: '#33333320', paddingVertical: 10, borderRightWidth: this.state.showAccountSettings ? 7 : 0, borderRightColor: '#F0493E' }}><JCButton data-testid="profile-setmap" buttonType={ButtonTypes.TransparentBoldBlackNoMargin} onPress={() => this.setState({ showAccountSettings: !this.state.showAccountSettings, editMode: false })}>Account Settings</JCButton></View>
                  : null
                }

              </View>


              {this.state.isEditable && this.state.editMode ?
                <Text style={this.styles.style.fontFormSmallHeader}>Public Location</Text>
                : null
              }
              {this.state.isEditable && this.state.editMode ?
                <EditableLocation onChange={(value: any, location: any) => {
                  if (location) {
                    this.handleInputChange({ latitude: location.lat, longitude: location.lng, geocodeFull: value }, "location");
                  }
                }}
                  multiline={false} textStyle={this.styles.style.fontRegular}
                  inputStyle={this.styles.style.groupNameInput} value={this.state.UserDetails.location?.geocodeFull}
                  isEditable={this.state.isEditable && this.state.editMode} citiesOnly={true}>
                </EditableLocation>
                : null
              }

              {this.state.isEditable && this.state.editMode ?
                <Text style={this.styles.style.fontFormSmallHeader}>Private Information</Text>
                : null
              }
              {this.state.isEditable && this.state.editMode ?
                <View style={{ backgroundColor: '#FFFFFF', width: "100%", marginBottom: 30 }}>
                  <Item stackedLabel>
                    <Label style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>*</Text>Address</Label>
                    <Input data-testid="profile-Address" style={this.styles.style.fontFormMediumInput} value={this.state.UserDetails.address}
                      onChange={(e) => { this.handleInputChange(e, "address") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>*</Text>City</Label>
                    <Input data-testid="profile-City" style={this.styles.style.fontFormMediumInput} value={this.state.UserDetails.city}
                      onChange={(e) => { this.handleInputChange(e, "city") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>*</Text>Province/State</Label>
                    <Input data-testid="profile-Province" style={this.styles.style.fontFormMediumInput} value={this.state.UserDetails.province}
                      onChange={(e) => { this.handleInputChange(e, "province") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>*</Text>Postal/Zip Code</Label>
                    <Input data-testid="profile-PostalCode" style={this.styles.style.fontFormMediumInput} value={this.state.UserDetails.postalCode}
                      onChange={(e) => { this.handleInputChange(e, "postalCode") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>*</Text>Country</Label>
                    <Input data-testid="profile-Country" style={this.styles.style.fontFormMediumInput} value={this.state.UserDetails.country}
                      onChange={(e) => { this.handleInputChange(e, "country") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>*</Text>Email Address</Label>
                    <Input data-testid="profile-Email" style={this.styles.style.fontFormMediumInput} value={this.state.UserDetails.email}
                      onChange={(e) => { this.handleInputChange(e, "email") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>*</Text>Phone #</Label>
                    <Input data-testid="profile-Phone" style={this.styles.style.fontFormMediumInput} value={this.state.UserDetails.phone}
                      onChange={(e) => { this.handleInputChange(e, "phone") }} />
                  </Item>
                </View>
                : null
              }
            </View>

            {!this.state.showAccountSettings ? <View style={this.styles.style.profileScreenRightCard}>
              <View style={{ width: '100%' }}>
                {this.renderMap()}
              </View>
              {this.state.isEditable && this.state.editMode ?
                <Text style={this.styles.style.fontMyProfileLeftTop}>Tell us more about you</Text>
                : null
              }

              {this.state.isEditable && this.state.editMode ?
                <Text style={this.styles.style.myprofileAboutMe}><Text style={this.styles.style.fontFormMandatory}>*</Text>About me</Text>
                : <Text style={this.styles.style.myprofileAboutMe}>About me</Text>
              }

              <EditableText onChange={(e) => { this.handleInputChange(e, "aboutMeLong") }}
                placeholder="type here" multiline={true}
                data-testid="profile-aboutMeLong"
                textStyle={this.styles.style.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 15, marginBottom: 60, width: "100%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
                value={this.state.UserDetails.aboutMeLong} isEditable={this.state.isEditable && this.state.editMode}></EditableText>

              {this.state.isEditable && this.state.editMode ?
                <Text style={this.styles.style.fontBold}><Text style={this.styles.style.fontFormMandatory}>*</Text>My Interests</Text>
                : <Text style={this.styles.style.myprofileAboutMe}>Interests</Text>
              }

              {this.state.isEditable && this.state.editMode ?
                <Container style={this.styles.style.myprofilePickerMainContainer}>
                  <View style={this.styles.style.myprofilePickerContainer}>
                    <View style={this.styles.style.myprofilePickerContainerView}>
                      <Picker style={this.styles.style.myprofilePicker}
                        onValueChange={(itemValue) => this.setState({ interest: itemValue })}
                        selectedValue={this.state.interest}
                      >
                        <Picker.Item label={'None Selected'} value={''} />
                        {interests.map((item, index) => {
                          return (<Picker.Item key={index} label={item} value={item} />)
                        })}
                      </Picker>
                      <JCButton buttonType={ButtonTypes.SolidAboutMe} onPress={() => this.handleAddInterest()}><Text>+ Add</Text></JCButton>
                    </View>
                    {this.state.isEditable && this.state.editMode ?
                      <Text style={{ width: "100%", marginTop: 8 }}>You can select {this.state.interestsArray ? 7 - this.state.interestsArray.length : 7} more key interests</Text>
                      : null
                    }
                  </View>
                  <View style={this.styles.style.myprofileBadgeContainer}>
                    {this.state.interestsArray ?
                      this.state.interestsArray.map((item, index) => {
                        return (
                          <Badge key={index} style={{ backgroundColor: '#EFF1F5', marginRight: 10, marginTop: 5, height: 30 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>{item}</Text>
                              <TouchableOpacity onPress={() => this.handleDeleteInterest(item)}>
                                <AntDesign name="close" size={20} color="#979797" />
                              </TouchableOpacity>
                            </View>
                          </Badge>
                        )
                      }) : null}
                  </View>
                </Container>
                : <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-start', maxHeight: 100 }}>
                  {this.state.UserDetails.interests ?
                    this.state.UserDetails.interests.map((item, index) => {
                      return (
                        <Badge key={index} style={{ backgroundColor: '#EFF1F5', marginRight: 10, marginBottom: 10, height: 30 }}>
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>{item}</Text>
                          </View>
                        </Badge>
                      )
                    }) : null}
                </View>
              }
              <View>
                <Label style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>{this.state.isEditable && this.state.editMode ? '*' : ''}</Text>Current Role</Label>
                <EditableText onChange={(e) => { this.handleInputChange(e, "currentRole") }}
                  multiline={false}
                  data-testid="profile-currentRole"
                  textStyle={this.styles.style.fontFormSmallDarkGrey}
                  inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
                  value={this.state.UserDetails.currentRole} isEditable={this.state.isEditable && this.state.editMode}></EditableText>
              </View>
              <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
              {this.state.isEditable && this.state.editMode ?
                <Text style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>*</Text>Describe your current scope</Text>
                : <Text style={this.styles.style.fontFormSmall}>Current scope</Text>
              }
              <EditableText onChange={(e) => { this.handleInputChange(e, "currentScope") }}
                multiline={true}
                placeholder="Type here."
                data-testid="profile-currentScope"
                textStyle={this.styles.style.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
                value={this.state.UserDetails.currentScope} isEditable={this.state.isEditable && this.state.editMode}></EditableText>


              <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
              {this.state.isEditable && this.state.editMode ?
                <Text style={this.styles.style.fontFormSmall}>Identify your personality type indicator</Text>
                : this.state.UserDetails.personality ? <Text style={this.styles.style.fontFormSmall}>Personality type indicator</Text> : null
              }
              <EditableText onChange={(e) => { this.handleInputChange(e, "personality") }}
                multiline={true}
                data-testid="profile-personality"
                placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A"
                textStyle={this.styles.style.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
                value={this.state.UserDetails.personality} isEditable={this.state.isEditable && this.state.editMode}></EditableText>

              <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
              {this.state.isEditable && this.state.editMode ?
                <Text style={this.styles.style.fontBold}><Text style={this.styles.style.fontFormMandatory}>*</Text>Tell us more about your organization</Text>
                : <Text style={this.styles.style.fontBold}>Organization Info</Text>
              }
              <View>
                <Label style={this.styles.style.fontFormSmall}>Organization Name</Label>
                <EditableText onChange={(e) => { this.handleInputChange(e, "orgName") }}
                  multiline={false}
                  data-testid="profile-orgName"
                  textStyle={this.styles.style.fontFormSmallDarkGrey}
                  inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
                  value={this.state.UserDetails.orgName} isEditable={this.state.isEditable && this.state.editMode}></EditableText>
              </View>

              <View style={{ marginTop: 15 }}>
                {!this.state.isEditable && this.state.editMode ? <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text> : null}
                <Label style={this.styles.style.fontFormSmall}>Type of Organization</Label>
                {this.state.isEditable && this.state.editMode ?
                  <View style={this.styles.style.myProfileOrgView}>
                    <Picker style={this.styles.style.myprofilePicker}
                      onValueChange={(itemValue) => { this.handleInputChange(itemValue, "orgType") }}
                      selectedValue={orgTypes.includes(this.state.UserDetails.orgType) ? this.state.UserDetails.orgType : this.state.UserDetails.orgType === null || this.state.UserDetails.orgType === 'None' ? 'None' : ""}
                    >
                      <Picker.Item label={'None Selected'} value={'None'} />
                      {orgTypes.map((item, index) => {
                        return (<Picker.Item key={index} label={item} value={item} />)
                      })}
                      <Picker.Item label={"Other"} value={""} />
                    </Picker>
                    {this.state.UserDetails.orgType === "" || (!orgTypes.includes(this.state.UserDetails.orgType) && this.state.UserDetails.orgType !== "None" && this.state.UserDetails.orgType !== null) ?
                      <EditableText onChange={(e) => { this.handleInputChange(e, "orgType") }}
                        multiline={false}
                        textStyle={this.styles.style.fontFormSmallDarkGrey}
                        inputStyle={this.styles.style.myProfileOrgTypeInput}
                        value={this.state.UserDetails.orgType} isEditable={this.state.isEditable && this.state.editMode}></EditableText> : null}
                  </View>
                  :
                  <EditableText
                    multiline={true}
                    textStyle={this.styles.style.fontFormSmallDarkGrey}
                    value={this.state.UserDetails.orgType} isEditable={false} />
                }
              </View>
              <View style={{ marginTop: 15 }}>
                <Label style={this.styles.style.fontFormSmall}>{this.state.UserDetails.orgType === "Home School" ? "Number of kids in home school" : this.orgsWithEmployees.includes(this.state.UserDetails.orgType) ? "How many employees are there in the organization?" : "Size of the organization"}</Label>
                {this.state.isEditable && this.state.editMode ? this.state.UserDetails.orgType === "Home School" || this.state.UserDetails.orgType === "Home Group/Home Church" || this.state.UserDetails.orgType === "Church Plant" ?
                  <View>
                    <Picker style={this.styles.style.myprofilePicker}
                      onValueChange={(itemValue) => { this.handleInputChange(itemValue, "orgSize") }}
                      selectedValue={this.state.UserDetails.orgSize}
                    >
                      <Picker.Item label={'None Selected'} value={''} />
                      {orgSizeSmall.map((item, index) => {
                        return (<Picker.Item key={index} label={item} value={item} />)
                      })}
                    </Picker>
                  </View>
                  : <View>
                    <Picker style={this.styles.style.myprofilePicker}
                      onValueChange={(itemValue) => { this.handleInputChange(itemValue, "orgSize") }}
                      selectedValue={this.state.UserDetails.orgSize}
                    >
                      <Picker.Item label={'None Selected'} value={''} />
                      {orgSizeBig.map((item, index) => {
                        return (<Picker.Item key={index} label={item} value={item} />)
                      })}
                    </Picker>
                  </View>

                  : <EditableText
                    multiline={true}
                    textStyle={this.styles.style.fontFormSmallDarkGrey}
                    value={this.state.UserDetails.orgSize} isEditable={false} />
                }
              </View>

              {this.state.UserDetails.orgDescription || this.state.editMode ? <View>
                <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
                <Text style={this.styles.style.fontFormSmall}>Description of church or ministry organization</Text>
              </View> : null}
              <EditableText onChange={(e) => { this.handleInputChange(e, "orgDescription") }}
                multiline={true}
                data-testid="profile-orgDescription"
                textStyle={this.styles.style.fontFormSmallDarkGrey}
                placeholder="Type here."
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
                value={this.state.UserDetails.orgDescription} isEditable={this.state.isEditable && this.state.editMode}></EditableText>
            </View>
              : <View style={this.styles.style.profileScreenRightCard}>
                <Text style={this.styles.style.myprofileAboutMe}>Account Settings</Text>
                <View style={{ marginTop: 40 }}>
                  <Label style={{ ...this.styles.style.fontFormSmallDarkGrey, marginBottom: 15 }}>Change your password</Label>
                  <TextInput placeholder="Current password" value={this.state.oldPass} onChange={e => this.setState({ oldPass: e.nativeEvent.text })} secureTextEntry={true} style={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}></TextInput>
                  <TextInput placeholder="New password" value={this.state.newPass} onChange={e => this.setState({ newPass: e.nativeEvent.text })} secureTextEntry={true} style={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}></TextInput>
                  <JCButton buttonType={ButtonTypes.SolidAboutMe} onPress={() => this.handlePasswordChange()}><Text> Change Password</Text></JCButton>
                </View>
                <Text style={{ ...this.styles.style.fontFormSmallDarkGrey, marginTop: 5 }}>{this.state.passError}</Text>
              </View>}
          </Form>
        </Content>
        : null)
    )
  }
}

export default function MyProfile(props: Props): JSX.Element {
  const route = useRoute();
  const navigation = useNavigation()
  return <MyProfileImpl {...props} navigation={navigation} route={route} />;
}