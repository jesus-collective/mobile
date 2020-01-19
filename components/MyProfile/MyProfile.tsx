import { Icon, Button, Text, View, Input, Form, Item, Label, Content } from 'native-base';
import { Image } from 'react-native'
import * as React from 'react';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import styles from '../../components/style.js'
import TagInput from 'react-native-tags-input';
import { Dimensions } from 'react-native'
const mainColor = '#3ca897';

interface Props {
  finalizeProfile(): void
}
interface State {
  UserDetails: any
  tags: any
  tagsColor: any
  tagsText: any
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
    }
    this.getUserDetails()
  }
  async getUserDetails() {
    console.log("getUserDetails")
    var user = await Auth.currentAuthenticatedUser();
    try {
      const getUser = await API.graphql(graphqlOperation(queries.getUser, { id: user['username'] }));
      this.setState({
        UserDetails: getUser.data.getUser
      }
      )
      console.log(this.state.UserDetails)
    }
    catch (e) {
      console.log(e)
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
      const updateUser = await API.graphql(graphqlOperation(mutations.updateUser, { input: this.state.UserDetails }));
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
  render() {
    return (
      (this.state.UserDetails != null ?
        <Content>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%" }}>
            <Text style={styles.fontTitle}>Create your profile</Text>
            <Button style={styles.saveProfileButton} onPress={() => this.finalizeProfile()}><Text uppercase={false} style={styles.saveProfileButtonText}>Save and Publish Your Profile</Text></Button>
          </View>

          <Form style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: "35%" }}>
              <View>
                <Image style={{ width: "250px", height: "290px" }} source={require('../../assets/profile-placeholder.png')}></Image>
                <Button style={styles.fontFormProfileImageButton}>
                  <Text uppercase={false} style={styles.fontFormProfileImageButtonText}>Upload Profile Picture</Text>
                </Button>
                <Text style={styles.fontFormProfileImageText}>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>
              </View>
              <Text style={styles.fontFormName}>Vanessa Smith</Text>
              <Text style={styles.fontFormRole}>My Current Role not defined</Text>
              <Text style={styles.fontFormUserType}>Partner</Text>

              <Text style={styles.fontFormText}><Text style={styles.fontFormMandatory}>*</Text>One Sentence about me</Text>
              <Input style={styles.fontFormAboutMe} value={this.state.UserDetails.aboutMeShort}
                onChange={(e) => { this.handleInputChange(e, "aboutMeShort") }} multiline={true} placeholder="Short sentence about me" />
              <Text style={styles.fontFormSmallDarkGrey}><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/pin 2.svg')}></Image>Location not defined</Text>
              <Text style={styles.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/calendar.svg')}></Image>Joined not defined</Text>
              <Text style={styles.fontFormSmallGrey}><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/church.svg')}></Image>Organization Name not defined</Text>
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
            <View style={{ marginLeft: 10, width: "65%" }}>
              <Text style={styles.font}>Tell us more about you</Text>
              <Text style={styles.fontBold}>About me</Text>
              <Input value={this.state.UserDetails.aboutMeLong}
                onChange={(e) => { this.handleInputChange(e, "aboutMeLong") }} multiline={true} placeholder="type here" />
              <Text style={styles.fontBold}>My Interests</Text>
              <Text style={styles.font}>You can select 7 key interests</Text>
              <TagInput
                updateState={this.updateTagState}
                tags={this.state.tags}
                placeholder="Tags..."
                label='Press comma & space to add a tag'
                labelStyle={{ color: '#fff' }}
                //leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText} />}
                leftElementContainerStyle={{ marginLeft: 3 }}
                containerStyle={{ width: (Dimensions.get('window').width - 40) }}
                inputContainerStyle={[styles.textInput, { backgroundColor: this.state.tagsColor }]}
                inputStyle={{ color: this.state.tagsText }}
                onFocus={() => this.setState({ tagsColor: '#fff', tagsText: mainColor })}
                onBlur={() => this.setState({ tagsColor: mainColor, tagsText: '#fff' })}
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
              <Text style={styles.font}>Describe your current Scope</Text>
              <Input placeholder="Type here." value={this.state.UserDetails.currentScope}
                onChange={(e) => { this.handleInputChange(e, "currentScope") }} multiline={true} />
              <Text style={styles.font}>Identify your personality type indicator</Text>
              <Input placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A" value={this.state.UserDetails.personality}
                onChange={(e) => { this.handleInputChange(e, "personality") }} multiline={true} />


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
              <Text style={styles.font}>Description of church or ministry organization</Text>
              <Input placeholder="Type here." value={this.state.UserDetails.orgDescription}
                onChange={(e) => { this.handleInputChange(e, "orgDescription") }} multiline={true} />
            </View>
          </Form>
        </Content>
        : null)

    )
  }
}