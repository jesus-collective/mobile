import { Icon, Button, View, Input, Form, Item, Label, Content } from 'native-base';
import { Text, Image, Modal } from 'react-native'
import * as React from 'react';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import styles from '../../components/style'
import TagInput from 'react-native-tags-input';
import { Dimensions } from 'react-native'
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import Validate from '../Validate/Validate';
import moment from 'moment';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import MapSelector from './MapSelector'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import EditableText from '../Forms/EditableText';

import { constants } from '../../src/constants'

Amplify.configure(awsconfig);

const mainColor = '#ffffff';

interface Props {
  finalizeProfile?(): void
  navigation: any
  loadId?: any

}
interface State {
  UserDetails: any
  tags: any
  tagsColor: any
  tagsText: any
  profileImage: any
  validationText: any
  mapVisible: any
  // mapCoord: any
  isEditable: any
}
export default class MyProfile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      UserDetails: null,
      tags: {
        tag: '',
        tagsArray: []
      },
      tagsColor: mainColor,
      tagsText: '#fff',
      profileImage: "",
      validationText: null,
      mapVisible: false,
      //  mapCoord: { latitude: 0, longitude: 0 },
      isEditable: false
    }
    this.getUserDetails()
  }
  async getUserDetails() {
    console.log("getUserDetails")
    var user = await Auth.currentAuthenticatedUser();
    if (this.props.loadId) {
      try {
        const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: this.props.loadId }));
        this.setState({
          UserDetails: getUser.data.getUser,
          isEditable: getUser.data.getUser.id == user['username']
        }, () => this.getProfileImage()
        )

        //console.log(this.state.UserDetails)
      }
      catch (e) {
        if (e.data.getUser != null)
          this.setState({
            UserDetails: e.data.getUser
          }, () => this.getProfileImage()
          )
        console.log(e)
      }
    }
    else {

      try {
        const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: user['username'] }));
        this.setState({
          UserDetails: getUser.data.getUser,
          isEditable: true
        }, () => this.getProfileImage()
        )

        console.log(this.state.UserDetails)
      }
      catch (e) {
        console.log(e)
      }
    }
  }
  handleInputChange(event: any, name: string) {


    const value = event.target === undefined ? event : event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    // const name = target.name;
    var updateData = { ...this.state.UserDetails }
    updateData[name] = value
    this.setState({
      UserDetails: updateData
    });
    //console.log(this.state.UserDetails)
  }
  clean(item) {
    delete item.groups
    delete item.messages
    delete item.owns
    delete item._deleted
    delete item._lastChangedAt
    delete item.createdAt
    delete item.updatedAt
    return item
  }
  async finalizeProfile() {

    var validation = Validate.Profile(this.state.UserDetails)
    if (validation.result) {
      try {
        var toSave = this.clean(this.state.UserDetails)
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
  updateTagState = (state) => {
    this.setState({
      tags: state
    })
  };
  async onProfileImageChange(e: any) {
    const file = e.target.files[0];
    var user = await Auth.currentCredentials();
    var userId = user.identityId
    const lastDot = file.name.lastIndexOf('.');
    const ext = file.name.substring(lastDot + 1);
    const fn = 'profile/upload/profile-' + new Date().getTime() + '.' + ext
    const fnSave = fn.replace("/upload", "").replace(".", "-[size].").replace("." + ext, ".png")

    Storage.put(fn, file, {
      level: 'protected',
      contentType: file.type,
      identityId: userId
    })
      .then(result => {

        var updateData = { ...this.state.UserDetails }
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

  getProfileImage() {
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
  logout() {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));

  }
  showMap() {
    console.log("showMap")
    this.setState({ mapVisible: true })
  }
  saveLocation(coord) {
    console.log("saveLocation")
    this.handleInputChange({ target: { value: { latitude: coord.latitude, longitude: coord.longitude } } }, "location")
    this.setState({ mapVisible: false })
  }

  openConversation(initialUser, name) {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", { initialUserID: initialUser, initialUserName: name });
  }
  render() {

    return (
      (this.state.UserDetails != null ?
        <Content>
          <View style={styles.myProfileTopButtons}>
            {this.state.isEditable ?
              <Text style={styles.profileFontTitle}>Setup your profile</Text>
              : <Text style={styles.profileFontTitle}>{this.state.UserDetails.given_name}'s profile</Text>
            }
            {this.state.isEditable ?
              <View style={styles.myProfileTopButtonsInternalContainer}>
                <JCButton data-testid="profile-save" buttonType={ButtonTypes.SolidRightMargin} onPress={() => this.finalizeProfile()}>Save and Publish Your Profile</JCButton>
                <JCButton buttonType={ButtonTypes.Solid} onPress={() => this.logout()}>Logout</JCButton>
              </View>
              : null
            }
            {
              this.state.isEditable ? 
              <Text style={styles.myProfileErrorValidation}>{this.state.validationText}</Text>
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

          <Form style={styles.myProfileMainContainer}>
            <View style={styles.profileScreenLeftCard}>
              <View style={styles.myProfileImageWrapper}>
                <Image style={styles.myProfileImage}
                  source={this.state.profileImage == "" ? require('../../assets/profile-placeholder.png') : this.state.profileImage} onError={() => { this.getProfileImage() }}>

                </Image>
                {this.state.isEditable ?
                  <View style={styles.fileInputWrapper}>
                    <JCButton buttonType={ButtonTypes.Solid} onPress={() => { }}>Upload Profile Picture</JCButton>
                    <input data-testid="profile-image" style={{ fontSize: "200px", position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='image/*' onChange={(e) => this.onProfileImageChange(e)} />
                  </View>
                  : null
                }


                {/*<Text style={styles.fontFormProfileImageText}>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>*/}
              </View>
              <View style={styles.myProfilePersonalInfoWrapper}>
                <Text style={styles.fontFormName}>{this.state.UserDetails.given_name} {this.state.UserDetails.family_name}</Text>
                <Text style={styles.fontFormRole}>{this.state.UserDetails.currentRole ? this.state.UserDetails.currentRole : 'My Current Role not defined'}</Text>
                <Text style={styles.fontFormUserType}>Partner</Text>

                {this.state.isEditable ?
                  <Text style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>One sentence about me</Text>
                  : null
                }
                <EditableText onChange={(e) => { this.handleInputChange(e, "aboutMeShort") }}
                  placeholder="Short sentence about me" multiline={true}
                  textStyle={styles.fontFormSmallDarkGrey}
                  inputStyle={styles.fontFormAboutMe}
                  data-testid="profile-aboutMeShort"
                  value={this.state.UserDetails.aboutMeShort} isEditable={this.state.isEditable}></EditableText>


                <View style={styles.myProfileCoordinates}>
                  <Text style={styles.fontFormSmallDarkGrey}><Image style={{ width: "22px", height: "22px", top: 6, marginRight: 5 }} source={require('../../assets/svg/pin 2.svg')}></Image>{this.state.UserDetails.location ? "Lat: " + this.state.UserDetails.location.latitude.toString().substring(0, 5) + " Long:" + this.state.UserDetails.location.longitude.toString().substring(0, 5) : "Location not defined"}</Text>
                  {this.state.isEditable ?
                    <Text>( <JCButton data-testid="profile-setmap" buttonType={ButtonTypes.TransparentNoPadding} onPress={() => this.showMap()}>{this.state.UserDetails.location != null ? "Change" : "Set"}</JCButton>)</Text>
                    : null
                  }
                </View>
                <Text style={styles.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }} source={require('../../assets/svg/calendar.svg')}></Image>{this.state.UserDetails.joined ? moment(this.state.UserDetails.joined).format('MMMM Do YYYY') : "Join date unknown"}</Text>
                <Text style={styles.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }} source={require('../../assets/svg/church.svg')}></Image>{this.state.UserDetails.orgName ? this.state.UserDetails.orgName : "Organization Name not defined"}</Text>
                {!this.state.isEditable ?
                  <Button bordered style={styles.connectWithSliderButton} onPress={() => { this.openConversation(this.state.UserDetails.id, this.state.UserDetails.given_name + " " + this.state.UserDetails.family_name) }}><Text style={styles.fontStartConversation}>Start Conversation</Text></Button>
                  : null}

                {this.state.isEditable && constants['SETTING_ISVISIBLE_PROFILE_MESSAGES'] ?
                  <Text><JCButton data-testid="profile-setmap" buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { }}>Messages</JCButton></Text>
                  : null
                }
                {this.state.isEditable && constants['SETTING_ISVISIBLE_PROFILE_ACCOUNTSETTINGS'] ?
                  <Text><JCButton data-testid="profile-setmap" buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { }}>Account Settings</JCButton></Text>
                  : null
                }

              </View>


              {this.state.isEditable ?
                <Text style={styles.fontFormSmallHeader}>Private Information</Text>
                : null
              }
              {this.state.isEditable ?
                <View style={{ backgroundColor: '#FFFFFF', width: "100%", marginBottom: 30 }}>
                  <Item stackedLabel>
                    <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Address</Label>
                    <Input data-testid="profile-Address" style={styles.fontFormMediumInput} value={this.state.UserDetails.address}
                      onChange={(e) => { this.handleInputChange(e, "address") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>City</Label>
                    <Input data-testid="profile-City" style={styles.fontFormMediumInput} value={this.state.UserDetails.city}
                      onChange={(e) => { this.handleInputChange(e, "city") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Province/State</Label>
                    <Input data-testid="profile-Province" style={styles.fontFormMediumInput} value={this.state.UserDetails.province}
                      onChange={(e) => { this.handleInputChange(e, "province") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Postal/Zip Code</Label>
                    <Input data-testid="profile-PostalCode" style={styles.fontFormMediumInput} value={this.state.UserDetails.postalCode}
                      onChange={(e) => { this.handleInputChange(e, "postalCode") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Country</Label>
                    <Input data-testid="profile-Country" style={styles.fontFormMediumInput} value={this.state.UserDetails.country}
                      onChange={(e) => { this.handleInputChange(e, "country") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Email Address</Label>
                    <Input data-testid="profile-Email" style={styles.fontFormMediumInput} value={this.state.UserDetails.email}
                      onChange={(e) => { this.handleInputChange(e, "email") }} />
                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Phone #</Label>
                    <Input data-testid="profile-Phone" style={styles.fontFormMediumInput} value={this.state.UserDetails.phone}
                      onChange={(e) => { this.handleInputChange(e, "phone") }} />
                  </Item>
                </View>
                : null
              }
            </View>
            <View style={styles.profileScreenRightCard}>
              {this.state.isEditable ?
                <Text style={styles.fontMyProfileLeftTop}>Tell us more about you</Text>
                : null
              }

              {this.state.isEditable ?
                <Text style={styles.fontBold}>About me</Text>
                : null
              }

              <EditableText onChange={(e) => { this.handleInputChange(e, "aboutMeLong") }}
                placeholder="type here" multiline={true}
                data-testid="profile-aboutMeLong"
                textStyle={styles.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 15, marginBottom: 60, width: "100%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }}
                value={this.state.UserDetails.aboutMeLong} isEditable={this.state.isEditable}></EditableText>

              {this.state.isEditable ?
                <Text style={styles.fontBold}>My Interests</Text>
                : <Text style={styles.fontBold}>Interests</Text>
              }
              {this.state.isEditable ?
                <Text style={styles.fontFormText2}>You can select 7 key interests</Text>
                : null
              }

              <TagInput
                updateState={this.updateTagState}
                tags={this.state.tags}
                placeholder="Tags..."
                label={this.state.isEditable ? 'Press space to add a tag' : ""}

                //leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText} />}


                onFocus={() => this.setState({ tagsColor: '#fff', tagsText: "#000000" })}
                onBlur={() => this.setState({ tagsColor: mainColor, tagsText: '#000000' })}
                autoCorrect={false}
                scrollViewProps={{ contentContainerStyle: { justifyContent: "center" } }}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", color: this.state.tagsText, paddingLeft: 5, marginLeft: 0 }}
                containerStyle={{ justifyContent: "center", width: "100%", paddingLeft: 0, marginBottom: 20 }}
                inputContainerStyle={[styles.textInput, { backgroundColor: this.state.tagsColor, marginLeft: 0 }]}
                labelStyle={{ color: '#000000' }}
                tagStyle={styles.tag}
                tagTextStyle={styles.tagText}
                leftElementContainerStyle={{ marginLeft: 0 }}
              //keysForTag={' '}
              />
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={styles.fontFormSmall}>Current Role</Label>
                <EditableText onChange={(e) => { this.handleInputChange(e, "currentRole") }}
                  multiline={false}
                  data-testid="profile-currentRole"
                  textStyle={styles.fontFormSmallDarkGrey}
                  inputStyle={styles.fontFormMediumInput}
                  value={this.state.UserDetails.currentRole} isEditable={this.state.isEditable}></EditableText>


              </Item>
              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              {this.state.isEditable ?
                <Text style={styles.fontFormSmall}>Describe your current scope</Text>
                : <Text style={styles.fontFormSmall}>Current scope</Text>
              }
              <EditableText onChange={(e) => { this.handleInputChange(e, "currentScope") }}
                multiline={true}
                placeholder="Type here."
                data-testid="profile-currentScope"
                textStyle={styles.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }}
                value={this.state.UserDetails.currentScope} isEditable={this.state.isEditable}></EditableText>


              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              {this.state.isEditable ?
                <Text style={styles.fontFormSmall}>Identify your personality type indicator</Text>
                : <Text style={styles.fontFormSmall}>Personality type indicator</Text>
              }
              <EditableText onChange={(e) => { this.handleInputChange(e, "personality") }}
                multiline={true}
                data-testid="profile-personality"
                placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A"
                textStyle={styles.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }}
                value={this.state.UserDetails.personality} isEditable={this.state.isEditable}></EditableText>




              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              {this.state.isEditable ?
                <Text style={styles.fontBold}>Tell us more about your organization</Text>
                : <Text style={styles.fontBold}>Organization Info</Text>
              }
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={styles.fontFormSmall}>Organization Name</Label>

                <EditableText onChange={(e) => { this.handleInputChange(e, "orgName") }}
                  multiline={false}
                  data-testid="profile-orgName"
                  textStyle={styles.fontFormSmallDarkGrey}
                  inputStyle={styles.fontFormMediumInput}
                  value={this.state.UserDetails.orgName} isEditable={this.state.isEditable}></EditableText>



              </Item>
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={styles.fontFormSmall}>Type of organization</Label>

                <EditableText onChange={(e) => { this.handleInputChange(e, "orgType") }}
                  multiline={false}
                  data-testid="profile-orgType"
                  textStyle={styles.fontFormSmallDarkGrey}
                  inputStyle={styles.fontFormMediumInput}
                  value={this.state.UserDetails.orgType} isEditable={this.state.isEditable}></EditableText>

              </Item>
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={styles.fontFormSmall}>How many employees are there in the organization?</Label>

                <EditableText onChange={(e) => { this.handleInputChange(e, "orgSize") }}
                  multiline={false}
                  data-testid="profile-orgSize"
                  textStyle={styles.fontFormSmallDarkGrey}
                  inputStyle={styles.fontFormMediumInput}
                  value={this.state.UserDetails.orgSize} isEditable={this.state.isEditable}></EditableText>

              </Item>
              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              <Text style={styles.fontFormSmall}>Description of church or ministry organization</Text>
              <EditableText onChange={(e) => { this.handleInputChange(e, "orgDescription") }}
                multiline={true}
                data-testid="profile-orgDescription"
                textStyle={styles.fontFormSmallDarkGrey}
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