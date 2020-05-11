import { Icon, Button, View, Input, Form, Item, Label, Content } from 'native-base';
import { Text, Image, Modal } from 'react-native'
import * as React from 'react';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import styles from '../../components/style.js'
import TagInput from 'react-native-tags-input';
import { Dimensions } from 'react-native'
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import Validate from '../Validate/Validate';
import moment from 'moment';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import MapSelector from './MapSelector'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


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
  mapCoord: any

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
      mapCoord: { latitude: 0, longitude: 0 },

    }
    this.getUserDetails()
  }
  async getUserDetails() {
    console.log("getUserDetails")
    if (this.props.loadId) {
      try {
        const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: this.props.loadId }));
        this.setState({
          UserDetails: getUser.data.getUser
        }, () => this.getProfileImage()
        )

        //console.log(this.state.UserDetails)
      }
      catch (e) {
        if (e.data.getUser != null)
          this.setState({
            UserDetails: e.data.getUser
          })
        console.log(e)
      }
    }
    else {
      var user = await Auth.currentAuthenticatedUser();
      try {
        const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: user['username'] }));
        this.setState({
          UserDetails: getUser.data.getUser
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
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
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
    return item
  }
  async finalizeProfile() {

    var validation = Validate.Profile(this.state.UserDetails)
    if (validation.result) {
      try {
        var toSave = this.clean(this.state.UserDetails)
        const updateUser = await API.graphql(graphqlOperation(mutations.updateUser, { input: toSave }));
        //  console.log(updateUser)
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
  saveLocation() {
    console.log("saveLocation")
    this.handleInputChange({ target: { value: { latitude: this.state.mapCoord.latitude, longitude: this.state.mapCoord.longitude } } }, "location")
    this.setState({ mapVisible: false })
  }


  render() {

    return (
      (this.state.UserDetails != null ?
        <Content>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%", flexGrow: 0, marginTop: 30, paddingLeft: 32, minHeight: 45 }}>
            <Text style={styles.profileFontTitle}>Create your profile</Text>
            <View style={{ flex: 0, flexDirection: "row", alignSelf: "flex-end" }}>
                <JCButton buttonType={ButtonTypes.SolidRightMargin} onPress={() => this.finalizeProfile()}>Save and Publish Your Profile</JCButton>
                <JCButton buttonType={ButtonTypes.Solid} onPress={() => this.logout()}>Logout</JCButton>
            </View>
            <Text>{this.state.validationText}</Text>
              

          </View>

          <MapSelector mapVisible={this.state.mapVisible}
            onClose={(coord) => {
              console.log("onCloseMap");
              this.setState({ mapVisible: false, mapCoord: { latitude: coord.latitude, longitude: coord.longitude } })
            }}>
          </MapSelector>

          <Form style={{ marginBottom: 20, display: "flex", flexDirection: "row" }}>
            <View style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30, paddingTop: 40, marginLeft: 32, marginRight: 32, marginTop: 0, borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", border: "none", minHeight: 700, width: 446 }}>
              <View style={{ alignSelf: "center", marginBottom: 90 }}>
                <Image style={{ width: "250px", height: "290px", borderRadius: 120 }}
                  source={this.state.profileImage == "" ? require('../../assets/profile-placeholder.png') : this.state.profileImage} onError={() => { this.getProfileImage() }}>

                </Image>
                <View style={styles.fileInputWrapper}>
                  <JCButton buttonType={ButtonTypes.Solid} onPress={() => { }}>Upload Profile Picture</JCButton>
                  <input style={{ fontSize: "200px", position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='image/*' onChange={(e) => this.onProfileImageChange(e)} />
                </View>


                {/*<Text style={styles.fontFormProfileImageText}>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>*/}
              </View>
              <View style={{ marginBottom: 35, alignSelf: "center", width: "100%" }}>
                <Text style={styles.fontFormName}>{this.state.UserDetails.given_name} {this.state.UserDetails.family_name}</Text>
                <Text style={styles.fontFormRole}>{this.state.UserDetails.currentRole ? this.state.UserDetails.currentRole : 'My Current Role not defined'}</Text>
                <Text style={styles.fontFormUserType}>Partner</Text>

                <Text style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>One sentence about me</Text>
                <Input style={styles.fontFormAboutMe} value={this.state.UserDetails.aboutMeShort}
                  onChange={(e) => { this.handleInputChange(e, "aboutMeShort") }} multiline={true} placeholder="Short sentence about me" />
                <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%", flexGrow: 0, marginTop: 30, alignSelf: "flex-start", height: "2.75rem"}}>
                  <Text style={styles.fontFormSmallDarkGrey}><Image style={{ width: "22px", height: "22px", top: 6, marginRight: 5 }} source={require('../../assets/svg/pin 2.svg')}></Image>{this.state.UserDetails.location ? "Lat: " + this.state.UserDetails.location.latitude + " Long:" + this.state.UserDetails.location.longitude : "Location not defined"}</Text>
                  <Text>( <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => this.showMap()}>{this.state.UserDetails.location != null ? "Change" : "Set"}</JCButton>)</Text>
                </View>
                <Text style={styles.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }} source={require('../../assets/svg/calendar.svg')}></Image>{this.state.UserDetails.joined ? moment(this.state.UserDetails.joined).format('MMMM Do YYYY') : "Join date unknown"}</Text>
                <Text style={styles.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px", top: 3, marginRight: 5 }} source={require('../../assets/svg/church.svg')}></Image>{this.state.UserDetails.orgName ? this.state.UserDetails.orgName : "Organization Name not defined"}</Text>
              </View>
              <Text style={styles.fontFormSmallHeader}>Private Information</Text>
              <View style={{ backgroundColor: '#FFFFFF', width: "100%", marginBottom: 30 }}>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Address</Label>
                  <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.address}
                    onChange={(e) => { this.handleInputChange(e, "address") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>City</Label>
                  <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.city}
                    onChange={(e) => { this.handleInputChange(e, "city") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Province/State</Label>
                  <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.province}
                    onChange={(e) => { this.handleInputChange(e, "province") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Postal/Zip Code</Label>
                  <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.postalCode}
                    onChange={(e) => { this.handleInputChange(e, "postalCode") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Country</Label>
                  <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.country}
                    onChange={(e) => { this.handleInputChange(e, "country") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Email Address</Label>
                  <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.email}
                    onChange={(e) => { this.handleInputChange(e, "email") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Phone #</Label>
                  <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.phone}
                    onChange={(e) => { this.handleInputChange(e, "phone") }} />
                </Item>
              </View>
            </View>
            <View style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 32, marginRight: 32, marginTop: 0, borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", border: "none", minHeight: 1500, width: 446, paddingTop: 30, paddingRight: 30, paddingBottom: 30, paddingLeft: 30 }}>
              <Text style={styles.fontMyProfileLeftTop}>Tell us more about you</Text>
              <Text style={styles.fontBold}>About me</Text>
              <Input style={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 15, marginBottom: 60, width: "100%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }} value={this.state.UserDetails.aboutMeLong}
                onChange={(e) => { this.handleInputChange(e, "aboutMeLong") }} multiline={true} placeholder="type here" />
              <Text style={styles.fontBold}>My Interests</Text>
              <Text style={styles.fontFormText2}>You can select 7 key interests</Text>

              <TagInput
                updateState={this.updateTagState}
                tags={this.state.tags}
                placeholder="Tags..."
                label='Press space to add a tag'

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
                <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.currentRole}
                  onChange={(e) => { this.handleInputChange(e, "currentRole") }} />
              </Item>
              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              <Text style={styles.fontFormSmall}>Describe your current scope</Text>
              <Input style={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }} placeholder="Type here." value={this.state.UserDetails.currentScope}
                onChange={(e) => { this.handleInputChange(e, "currentScope") }} multiline={true} />
              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              <Text style={styles.fontFormSmall}>Identify your personality type indicator</Text>
              <Input style={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }} placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A" value={this.state.UserDetails.personality}
                onChange={(e) => { this.handleInputChange(e, "personality") }} multiline={true} />

              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              <Text style={styles.fontBold}>Tell us more about your organization</Text>
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={styles.fontFormSmall}>Organization Name</Label>
                <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.orgName}
                  onChange={(e) => { this.handleInputChange(e, "orgName") }} />
              </Item>
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={styles.fontFormSmall}>Type of organization</Label>
                <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.orgType}
                  onChange={(e) => { this.handleInputChange(e, "orgType") }} />
              </Item>
              <Item stackedLabel style={{ marginBottom: 15, width: "100%" }}>
                <Label style={styles.fontFormSmall}>How many employees are there in your organization?</Label>
                <Input style={styles.fontFormMediumInput} value={this.state.UserDetails.orgSize}
                  onChange={(e) => { this.handleInputChange(e, "orgSize") }} />
              </Item>
              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              <Text style={styles.fontFormSmall}>Description of church or ministry organization</Text>
              <Input style={{ borderWidth: 1, borderColor: "#dddddd", width: "100%", marginBottom: 15, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28 }} placeholder="Type here." value={this.state.UserDetails.orgDescription}
                onChange={(e) => { this.handleInputChange(e, "orgDescription") }} multiline={true} />
            </View>
          </Form>
        </Content>
        : null)

    )
  }
}