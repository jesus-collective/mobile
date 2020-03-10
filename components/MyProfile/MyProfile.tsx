import { Icon, Button, Text, View, Input, Form, Item, Label, Content } from 'native-base';
import { Image } from 'react-native'
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
      profileImage: ""
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
        }, () => this.getProfileImage(this.props.loadId)
        )

        console.log(this.state.UserDetails)
      }
      catch (e) {
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
        }, () => this.getProfileImage(user['username'])
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

  async finalizeProfile() {
    try {
      var toSave = this.state.UserDetails
      delete toSave.groups
      delete toSave.messages
      const updateUser = await API.graphql(graphqlOperation(mutations.updateUser, { input: toSave }));
      console.log(updateUser)
      this.props.finalizeProfile()
    } catch (e) {
      console.log(e)
    }
  }
  updateTagState = (state) => {
    this.setState({
      tags: state
    })
  };
  async onProfileImageChange(e: any) {
    const file = e.target.files[0];
    var user = await Auth.currentAuthenticatedUser();
    var userId = this.getValueFromKey(user.storage, 'aws.cognito.identity-id')

    Storage.put('profileImage.png', file, {
      level: 'protected',
      contentType: 'image/png',
      identityId: userId
    })
      .then(result => {
        console.log(result)
        var updateData = { ...this.state.UserDetails }
        updateData['profileImage'] = userId
        this.setState({
          UserDetails: updateData
        });
      })
      .catch(err => console.log(err));
  }
  getProfileImage(id) {
    console.log(this.state.UserDetails.profileImage)
    Storage.get('profileImage.png', {
      level: 'protected',
      contentType: 'image/png',
      identityId: this.state.UserDetails.profileImage ? this.state.UserDetails.profileImage : ""
    })
      .then(result => this.setState({ profileImage: result }))
      .catch(err => console.log(err));
  }
  getValueFromKey(myObject: any, string: any) {
    const key = Object.keys(myObject).filter(k => k.includes(string));
    return key.length ? myObject[key[0]] : "";
  }
  render() {
    return (
      (this.state.UserDetails != null ?
        <Content>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%" }}>
            <Text style={styles.profileFontTitle}>Create your profile</Text>
            <Button style={styles.saveProfileButton} onPress={() => this.finalizeProfile()}><Text uppercase={false} style={styles.saveProfileButtonText}>Save and Publish Your Profile</Text></Button>
          </View>

          <Form style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ flex: 30, flexDirection: "column" }}>
              <View style={{ alignSelf: "center" }}>
                <Image style={{ width: "250px", height: "290px", borderRadius: 120 }}
                  source={this.state.profileImage == "" ? require('../../assets/profile-placeholder.png') : this.state.profileImage}>

                </Image>
                <View style={styles.fileInputWrapper}>
                  <Button style={styles.fontFormProfileImageButton}><Text style={styles.fontFormProfileImageButtonText}>Upload Profile Picture</Text></Button>
                  <input style={{ fontSize: "200px", position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='image/png' onChange={(e) => this.onProfileImageChange(e)} />
                </View>


                <Text style={styles.fontFormProfileImageText}>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>
              </View>
              <View style={{ marginBottom: 40, alignSelf: "center" }}>
                <Text style={styles.fontFormName}>{this.state.UserDetails.given_name} {this.state.UserDetails.family_name}</Text>
                <Text style={styles.fontFormRole}>{this.state.UserDetails.currentRole?this.state.UserDetails.currentRole:'My Current Role not defined'}</Text>
                <Text style={styles.fontFormUserType}>Partner</Text>

                <Text style={styles.fontFormText}><Text style={styles.fontFormMandatory}>*</Text>One Sentence about me</Text>
                <Input style={styles.fontFormAboutMe} value={this.state.UserDetails.aboutMeShort}
                  onChange={(e) => { this.handleInputChange(e, "aboutMeShort") }} multiline={true} placeholder="Short sentence about me" />
                <Text style={styles.fontFormSmallDarkGrey}><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/pin 2.svg')}></Image>Location not defined</Text>
                <Text style={styles.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/calendar.svg')}></Image>Joined not defined</Text>
                <Text style={styles.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/church.svg')}></Image>Organization Name not defined</Text>
              </View>
              <Text style={styles.fontFormSmallHeader}>Private Information</Text>
              <View style={{ backgroundColor: '#F3F5F9' }}>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Address</Label>
                  <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.address}
                    onChange={(e) => { this.handleInputChange(e, "address") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>City</Label>
                  <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.city}
                    onChange={(e) => { this.handleInputChange(e, "city") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Province/State</Label>
                  <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.province}
                    onChange={(e) => { this.handleInputChange(e, "province") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Postal/Zip Code</Label>
                  <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.postalCode}
                    onChange={(e) => { this.handleInputChange(e, "postalCode") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Country</Label>
                  <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.country}
                    onChange={(e) => { this.handleInputChange(e, "country") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Email Address</Label>
                  <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.email}
                    onChange={(e) => { this.handleInputChange(e, "email") }} />
                </Item>
                <Item stackedLabel>
                  <Label style={styles.fontFormSmall}><Text style={styles.fontFormMandatory}>*</Text>Phone #</Label>
                  <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.phone}
                    onChange={(e) => { this.handleInputChange(e, "phone") }} />
                </Item>
              </View>
            </View>
            <View style={{ marginLeft: 10, flex: 70 }}>
              <Text style={styles.font}>Tell us more about you</Text>
              <Text style={styles.fontBold}>About me</Text>
              <Input style={{ borderWidth: 1, borderColor: "#dddddd" }} value={this.state.UserDetails.aboutMeLong}
                onChange={(e) => { this.handleInputChange(e, "aboutMeLong") }} multiline={true} placeholder="type here" />
              <Text style={styles.fontBold}>My Interests</Text>
              <Text style={styles.font}>You can select 7 key interests</Text>
              <TagInput
                updateState={this.updateTagState}
                tags={this.state.tags}
                placeholder="Tags..."
                label='Press space to add a tag'
                labelStyle={{ color: '#000000' }}
                //leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText} />}
                leftElementContainerStyle={{ marginLeft: 0 }}
                containerStyle={{ width: (Dimensions.get('window').width - 40) }}
                inputContainerStyle={[styles.textInput, { backgroundColor: this.state.tagsColor }]}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", color: this.state.tagsText }}
                onFocus={() => this.setState({ tagsColor: '#fff', tagsText: "#000000" })}
                onBlur={() => this.setState({ tagsColor: mainColor, tagsText: '#000000' })}
                autoCorrect={false}
                tagStyle={styles.tag}
                tagTextStyle={styles.tagText}
                keysForTag={' '}
              />
              <Item stackedLabel>
                <Label style={styles.fontFormSmall}>Current Role</Label>
                <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.currentRole}
                  onChange={(e) => { this.handleInputChange(e, "currentRole") }} />
              </Item>
              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              <Text style={styles.fontFormSmall}>Describe your current Scope</Text>
              <Input style={{ borderWidth: 1, borderColor: "#dddddd" }} placeholder="Type here." value={this.state.UserDetails.currentScope}
                onChange={(e) => { this.handleInputChange(e, "currentScope") }} multiline={true} />
              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              <Text style={styles.fontFormSmall}>Identify your personality type indicator</Text>
              <Input style={{ borderWidth: 1, borderColor: "#dddddd" }} placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A" value={this.state.UserDetails.personality}
                onChange={(e) => { this.handleInputChange(e, "personality") }} multiline={true} />

              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              <Text style={styles.fontBold}>Tell us more about your organization</Text>
              <Item stackedLabel>
                <Label style={styles.fontFormSmall}>Organization Name</Label>
                <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.orgName}
                  onChange={(e) => { this.handleInputChange(e, "orgName") }} />
              </Item>
              <Item stackedLabel>
                <Label style={styles.fontFormSmall}>Type of organization</Label>
                <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.orgType}
                  onChange={(e) => { this.handleInputChange(e, "orgType") }} />
              </Item>
              <Item stackedLabel>
                <Label style={styles.fontFormSmall}>How many employees do you have?</Label>
                <Input style={styles.fontFormSmallInput} value={this.state.UserDetails.orgSize}
                  onChange={(e) => { this.handleInputChange(e, "orgSize") }} />
              </Item>
              <Text style={styles.fontFormSmall}>&nbsp;</Text>
              <Text style={styles.font}>Description of church or ministry organization</Text>
              <Input style={{ borderWidth: 1, borderColor: "#dddddd" }} placeholder="Type here." value={this.state.UserDetails.orgDescription}
                onChange={(e) => { this.handleInputChange(e, "orgDescription") }} multiline={true} />
            </View>
          </Form>
        </Content>
        : null)

    )
  }
}