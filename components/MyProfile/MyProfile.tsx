import { Button, View, Input, Form, Item, Label, Content, Picker, Badge, Container } from 'native-base';
import { Text, Image, TouchableOpacity } from 'react-native'
import * as React from 'react';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';

import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import Validate from '../Validate/Validate';
import moment from 'moment';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import MyMap from '../../components/MyMap/MyMap'
import MapSelector from './MapSelector'
import EditableText from '../Forms/EditableText';
import { AntDesign } from '@expo/vector-icons';

import { interests } from './interests'
import { constants } from '../../src/constants'
import JCComponent from '../JCComponent/JCComponent';
import { useRoute, useNavigation } from '@react-navigation/native';

Amplify.configure(awsconfig);

interface Props {
  finalizeProfile?(): void
  navigation?: any
  route?: any
  loadId?: any

}
interface State {
  UserDetails: any
  interest: string
  interestsArray: any
  profileImage: any
  validationText: any
  mapVisible: any
  // mapCoord: any
  isEditable: any
  mapData: any
  initCenter: any
}
class MyProfileImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      UserDetails: null,
      interest: null,
      interestsArray: [],
      profileImage: "",
      validationText: null,
      mapVisible: false,
      //  mapCoord: { latitude: 0, longitude: 0 },
      isEditable: false,
      mapData: [],
      initCenter: { lat: 44, lng: -78.0 }
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
    const updateData = { ...this.state.UserDetails }
    updateData[name] = value
    this.setState({
      UserDetails: updateData
    });
    //console.log(this.state.UserDetails)
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
    return item
  }
  async finalizeProfile(): Promise<void> {

    const validation = Validate.Profile(this.state.UserDetails)
    if (validation.result) {
      try {
        const toSave = this.clean(this.state.UserDetails)
        toSave["profileState"] = "Complete"
        const updateUser = await API.graphql(graphqlOperation(mutations.updateUser, { input: toSave }));
        console.log({ "updateUser:": updateUser })
        if (this.props.finalizeProfile)
          this.props.finalizeProfile()
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
          userId: userId,
          filenameUpload: fn,
          filenameLarge: fnSave.replace('[size]', 'large'),
          filenameMedium: fnSave.replace('[size]', 'medium'),
          filenameSmall: fnSave.replace('[size]', 'small')
        }

        this.setState({
          UserDetails: updateData
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
            UserDetails: updateData
          });
        })
    }
    else if (this.state.interest && (this.state.interestsArray.filter(item => item === this.state.interest).length === 0) && this.state.interestsArray.length < 7) {
      this.setState({ interestsArray: this.state.interestsArray.concat(this.state.interest) },
        () => {
          const updateData = { ...this.state.UserDetails }
          updateData['interests'] = this.state.interestsArray
          this.setState({
            UserDetails: updateData
          });
        })
    }
  }
  handleDeleteInterest(event): void {
    const remainingInterests = this.state.interestsArray.filter(item => item !== event)
    this.setState({ interestsArray: remainingInterests },
      () => {
        const updateData = { ...this.state.UserDetails }
        updateData['interests'] = this.state.interestsArray
        this.setState({
          UserDetails: updateData
        });
      })
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
            {this.state.isEditable ?
              <Text style={this.styles.style.profileFontTitle}>Setup your profile</Text>
              : <Text style={this.styles.style.profileFontTitle}>{this.state.UserDetails.given_name}&apos;s profile</Text>
            }
            {this.state.isEditable ?
              <View style={this.styles.style.myProfileTopButtonsInternalContainer}>
                <JCButton data-testid="profile-save" buttonType={ButtonTypes.SolidRightMargin} onPress={() => this.finalizeProfile()}>Save and Publish Your Profile</JCButton>
                <JCButton buttonType={ButtonTypes.Solid} onPress={() => this.logout()}>Logout</JCButton>
              </View>
              : null
            }
            {
              this.state.isEditable ?
                <Text style={this.styles.style.myProfileErrorValidation}>{this.state.validationText}</Text>
                : null
            }
          </View>

          <MapSelector mapVisible={this.state.mapVisible} coord={this.state.UserDetails.location}
            onClose={(coord) => {
              console.log({ "onCloseMap": coord });
              this.saveLocation(coord)
              this.setState({ mapVisible: false })
            }}>
          </MapSelector>

          <Form style={this.styles.style.myProfileMainContainer}>
            <View style={this.styles.style.profileScreenLeftCard}>
              <View style={this.styles.style.myProfileImageWrapper}>
                <Image style={this.styles.style.myProfileImage}
                  source={this.state.profileImage == "" ? require('../../assets/profile-placeholder.png') : this.state.profileImage} onError={() => { this.getProfileImage() }}>

                </Image>
                {this.state.isEditable ?
                  <View style={this.styles.style.fileInputWrapper}>
                    <JCButton buttonType={ButtonTypes.SolidProfile} onPress={() => { null }}>Upload Profile Picture</JCButton>
                    <input data-testid="profile-image" style={{ fontSize: "200px", position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='image/*' onChange={(e) => this.onProfileImageChange(e)} />
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

                {this.state.isEditable ?
                  <Text style={this.styles.style.fontFormSmall}><Text style={this.styles.style.fontFormMandatory}>*</Text>One sentence about me</Text>
                  : null
                }
                <EditableText onChange={(e) => { this.handleInputChange(e, "aboutMeShort") }}
                  placeholder="Short sentence about me" multiline={true}
                  textStyle={this.styles.style.fontFormSmallDarkGrey}
                  inputStyle={this.styles.style.fontFormAboutMe}
                  data-testid="profile-aboutMeShort"
                  value={this.state.UserDetails.aboutMeShort} isEditable={this.state.isEditable}></EditableText>


                <View style={this.styles.style.myProfileCoordinates}>
                  <Text style={this.styles.style.fontFormSmallDarkGrey}><Image style={{ width: "22px", height: "22px", top: 6, marginRight: 5 }} source={require('../../assets/svg/pin 2.svg')}></Image>{this.state.UserDetails.location ? "Lat: " + this.state.UserDetails.location.latitude.toString().substring(0, 5) + " Long:" + this.state.UserDetails.location.longitude.toString().substring(0, 5) : "Location not defined"}</Text>
                  {this.state.isEditable ?
                    <Text>( <JCButton data-testid="profile-setmap" buttonType={ButtonTypes.TransparentNoPadding} onPress={() => this.showMap()}>{this.state.UserDetails.location != null ? "Change" : "Set"}</JCButton>)</Text>
                    : null
                  }
                </View>
                <Text style={this.styles.style.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }} source={require('../../assets/svg/calendar.svg')}></Image>{this.state.UserDetails.joined ? moment(this.state.UserDetails.joined).format('MMMM Do YYYY') : "Join date unknown"}</Text>
                <Text style={this.styles.style.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }} source={require('../../assets/svg/church.svg')}></Image>{this.state.UserDetails.orgName ? this.state.UserDetails.orgName : "Organization Name not defined"}</Text>
                {!this.state.isEditable ?
                  <Button bordered style={this.styles.style.connectWithSliderButton} onPress={() => { this.openConversation(this.state.UserDetails.id, this.state.UserDetails.given_name + " " + this.state.UserDetails.family_name) }}><Text style={this.styles.style.fontStartConversation}>Start Conversation</Text></Button>
                  : null}

                {this.state.isEditable && constants['SETTING_ISVISIBLE_PROFILE_MESSAGES'] ?
                  <Text><JCButton data-testid="profile-setmap" buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { null }}>Messages</JCButton></Text>
                  : null
                }
                {this.state.isEditable && constants['SETTING_ISVISIBLE_PROFILE_ACCOUNTSETTINGS'] ?
                  <Text><JCButton data-testid="profile-setmap" buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { null }}>Account Settings</JCButton></Text>
                  : null
                }

              </View>


              {this.state.isEditable ?
                <Text style={this.styles.style.fontFormSmallHeader}>Private Information</Text>
                : null
              }
              {this.state.isEditable ?
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

            <View style={this.styles.style.profileScreenRightCard}>
              <View style={{ width: '100%' }}>
                <MyMap initCenter={this.state.initCenter} visible={true} mapData={this.state.mapData} type={"profile"}></MyMap>
              </View>
              {this.state.isEditable ?
                <Text style={this.styles.style.fontMyProfileLeftTop}>Tell us more about you</Text>
                : null
              }
              <Text style={this.styles.style.fontBold}>About me</Text>

              <EditableText onChange={(e) => { this.handleInputChange(e, "aboutMeLong") }}
                placeholder="type here" multiline={true}
                data-testid="profile-aboutMeLong"
                textStyle={this.styles.style.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 15, marginBottom: 60, width: "100%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }}
                value={this.state.UserDetails.aboutMeLong} isEditable={this.state.isEditable}></EditableText>

              {this.state.isEditable ?
                <Text style={this.styles.style.fontBold}>My Interests</Text>
                : <Text style={this.styles.style.fontBold}>Interests</Text>
              }

              {this.state.isEditable ?
                <Container>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Picker style={{ height: 41, width: 308, marginRight: 10 }}
                      onValueChange={(itemValue) => this.setState({ interest: itemValue })}
                      selectedValue={this.state.interest}
                    >
                      <Picker.Item label={'None Selected'} value={null} />
                      {interests.map((item, index) => {
                        return (<Picker.Item key={index} label={item} value={item} />)
                      })}
                    </Picker>
                    <JCButton buttonType={ButtonTypes.SolidAboutMe} onPress={() => this.handleAddInterest()}><Text>+ Add</Text></JCButton>

                    {this.state.isEditable ?
                      <Text>You can select {this.state.interestsArray ? 7 - this.state.interestsArray.length : 7} more key interests</Text>
                      : null
                    }
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.state.interestsArray ?
                      this.state.interestsArray.map((item, index) => {
                        return (
                          <Badge key={index} style={{ backgroundColor: '#EFF1F5', marginRight: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontSize: 18, paddingLeft: 10, paddingRight: 10 }}>{item}</Text>
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
                        <Badge key={index} style={{ backgroundColor: '#EFF1F5', marginRight: 10, marginBottom: 10 }}>
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, paddingLeft: 10, paddingRight: 10 }}>{item}</Text>
                          </View>
                        </Badge>
                      )
                    }) : null}
                </View>
              }
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={this.styles.style.fontFormSmall}>Current Role</Label>
                <EditableText onChange={(e) => { this.handleInputChange(e, "currentRole") }}
                  multiline={false}
                  data-testid="profile-currentRole"
                  textStyle={this.styles.style.fontFormSmallDarkGrey}
                  inputStyle={this.styles.style.fontFormMediumInput}
                  value={this.state.UserDetails.currentRole} isEditable={this.state.isEditable}></EditableText>


              </Item>
              <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
              {this.state.isEditable ?
                <Text style={this.styles.style.fontFormSmall}>Describe your current scope</Text>
                : <Text style={this.styles.style.fontFormSmall}>Current scope</Text>
              }
              <EditableText onChange={(e) => { this.handleInputChange(e, "currentScope") }}
                multiline={true}
                placeholder="Type here."
                data-testid="profile-currentScope"
                textStyle={this.styles.style.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }}
                value={this.state.UserDetails.currentScope} isEditable={this.state.isEditable}></EditableText>


              <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
              {this.state.isEditable ?
                <Text style={this.styles.style.fontFormSmall}>Identify your personality type indicator</Text>
                : <Text style={this.styles.style.fontFormSmall}>Personality type indicator</Text>
              }
              <EditableText onChange={(e) => { this.handleInputChange(e, "personality") }}
                multiline={true}
                data-testid="profile-personality"
                placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A"
                textStyle={this.styles.style.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }}
                value={this.state.UserDetails.personality} isEditable={this.state.isEditable}></EditableText>




              <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
              {this.state.isEditable ?
                <Text style={this.styles.style.fontBold}>Tell us more about your organization</Text>
                : <Text style={this.styles.style.fontBold}>Organization Info</Text>
              }
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={this.styles.style.fontFormSmall}>Organization Name</Label>

                <EditableText onChange={(e) => { this.handleInputChange(e, "orgName") }}
                  multiline={false}
                  data-testid="profile-orgName"
                  textStyle={this.styles.style.fontFormSmallDarkGrey}
                  inputStyle={this.styles.style.fontFormMediumInput}
                  value={this.state.UserDetails.orgName} isEditable={this.state.isEditable}></EditableText>



              </Item>
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={this.styles.style.fontFormSmall}>Type of organization</Label>

                <EditableText onChange={(e) => { this.handleInputChange(e, "orgType") }}
                  multiline={false}
                  data-testid="profile-orgType"
                  textStyle={this.styles.style.fontFormSmallDarkGrey}
                  inputStyle={this.styles.style.fontFormMediumInput}
                  value={this.state.UserDetails.orgType} isEditable={this.state.isEditable}></EditableText>

              </Item>
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={this.styles.style.fontFormSmall}>How many employees are there in the organization?</Label>

                <EditableText onChange={(e) => { this.handleInputChange(e, "orgSize") }}
                  multiline={false}
                  data-testid="profile-orgSize"
                  textStyle={this.styles.style.fontFormSmallDarkGrey}
                  inputStyle={this.styles.style.fontFormMediumInput}
                  value={this.state.UserDetails.orgSize} isEditable={this.state.isEditable}></EditableText>

              </Item>
              <Text style={this.styles.style.fontFormSmall}>&nbsp;</Text>
              <Text style={this.styles.style.fontFormSmall}>Description of church or ministry organization</Text>
              <EditableText onChange={(e) => { this.handleInputChange(e, "orgDescription") }}
                multiline={true}
                data-testid="profile-orgDescription"
                textStyle={this.styles.style.fontFormSmallDarkGrey}
                placeholder="Type here."
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }}
                value={this.state.UserDetails.orgDescription} isEditable={this.state.isEditable}></EditableText>


            </View>
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