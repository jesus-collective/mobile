import { Text, View, Input, Form, Item, Label,Content } from 'native-base';
import { Button, Image } from 'react-native'
import * as React from 'react';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import styles from '../../components/style.js'

interface Props {
  finalizeProfile(): void
}
interface State {
  UserDetails: any
}
export default class MyProfile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      UserDetails: null
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
  render() {
    return (
      (this.state.UserDetails != null ?
        <Content>
          <View style={{justifyContent: "space-between",flexDirection: "row", width:"100%" }}>
            <Text style={styles.fontTitle}>Create your profile</Text>
            <Button color="#F0493E" title="Save and Publish Your Profile" onPress={() => this.finalizeProfile()} />
          </View>

          <Form style={{display:"flex", flexDirection: "row"}}>
            <View style={{width:"35%"}}>
              <Image style={{ width: "150px", height:"130px"}} source={require('../../assets/profile-placeholder.png')}></Image>
              <Button color="#F0493E" title="Upload Profile Picture"></Button>
              <Text style={styles.font}>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>
              <Text style={styles.fontBold}>Vanessa Smith</Text>
              <Text style={styles.font}>My Current Role not defined</Text>
              <Text style={styles.fontBold}>Partner</Text>
              <Text style={styles.font}>One Sentence about me</Text>
              <Input value={this.state.UserDetails.aboutMeShort}
                onChange={(e) => { this.handleInputChange(e, "aboutMeShort") }} placeholder="Short sentence about me" />
              <Text style={styles.font}>Location not defined</Text>
              <Text style={styles.font}>Joined not defined</Text>
              <Text style={styles.font}>Organization Name not defined</Text>
              <Text style={styles.font}>Private Information</Text>
              <Item floatingLabel>
                <Label style={styles.font}>Address</Label>
                <Input value={this.state.UserDetails.address}
                  onChange={(e) => { this.handleInputChange(e, "address") }} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.font}>City</Label>
                <Input value={this.state.UserDetails.city}
                  onChange={(e) => { this.handleInputChange(e, "city") }} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.font}>Province/State</Label>
                <Input value={this.state.UserDetails.province}
                  onChange={(e) => { this.handleInputChange(e, "province") }} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.font}>Postal/Zip Code</Label>
                <Input value={this.state.UserDetails.postalCode}
                  onChange={(e) => { this.handleInputChange(e, "postalCode") }} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.font}>Country</Label>
                <Input value={this.state.UserDetails.country}
                  onChange={(e) => { this.handleInputChange(e, "country") }} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.font}>Email Address</Label>
                <Input value={this.state.UserDetails.email}
                  onChange={(e) => { this.handleInputChange(e, "email") }} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.font}>Phone #</Label>
                <Input value={this.state.UserDetails.phone}
                  onChange={(e) => { this.handleInputChange(e, "phone") }} />
              </Item>


            </View>
            <View style={{marginLeft:10,width:"65%"}}>
              <Text style={styles.font}>Tell us more about you</Text>
              <Text style={styles.fontBold}>About me</Text>
              <Input value={this.state.UserDetails.aboutMeLong}
                onChange={(e) => { this.handleInputChange(e, "aboutMeLong") }} placeholder="type here" />
              <Text style={styles.fontBold}>My Interests</Text>
              <Text style={styles.font}>You can select 7 key interests</Text>
              <Input placeholder="Current Role" value={this.state.UserDetails.currentRole}
                onChange={(e) => { this.handleInputChange(e, "currentRole") }} />
              <Text style={styles.font}>Describe your current Scope</Text>
              <Input placeholder="Type here." value={this.state.UserDetails.currentScope}
                onChange={(e) => { this.handleInputChange(e, "currentScope") }} />
              <Text style={styles.font}>Identify your personality type indicator</Text>
              <Input placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A" value={this.state.UserDetails.personality}
                onChange={(e) => { this.handleInputChange(e, "personality") }} />
              <Text style={styles.fontBold}>Tell us more about your organization</Text>
              <Input placeholder="Organization Name" value={this.state.UserDetails.orgName}
                onChange={(e) => { this.handleInputChange(e, "orgName") }} />
              <Input placeholder="Type of organization" value={this.state.UserDetails.orgType}
                onChange={(e) => { this.handleInputChange(e, "orgType") }} />
              <Input placeholder="How many employees do you have?" value={this.state.UserDetails.orgSize}
                onChange={(e) => { this.handleInputChange(e, "orgSize") }} />
              <Text style={styles.font}>Description of church or ministry organization</Text>
              <Input placeholder="Type here." value={this.state.UserDetails.orgDescription}
                onChange={(e) => { this.handleInputChange(e, "orgDescription") }} />
            </View>
          </Form>
        </Content>
        : null)

    )
  }
}