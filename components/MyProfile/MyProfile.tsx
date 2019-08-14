import { Card, CardItem, Container, Text, View, Input } from 'native-base';
import {Button, Image} from 'react-native'
import * as React from 'react';
interface Props { }
interface State { }
export default class MyProfile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View>
          <Image style={{width:290,height:341}} source={require('../../assets/profile-placeholder.png')}></Image>
          <Button color="#F0493E" title="Upload Profile Picture"></Button>
          <Text>Upload a picture of minimum 500px wide. Maximum size is 700kb.</Text>
          <Text style={{fontWeight:"bold"}}>Vanessa Smith</Text>
          <Text>My Current Role not defined</Text>
          <Text style={{fontWeight:"bold"}}>Partner</Text>
          <Text>One Sentence about me</Text>
          <Input placeholder="Short sentence about me" />

          <Text>Location not defined</Text>
          <Text>Joined not defined</Text>
          <Text>Organization Name not defined</Text>
          <Text>Private Information</Text>
          <Input placeholder="Address" />
          <Input placeholder="City" />
          <Input placeholder="Province/State" />
          <Input placeholder="Postal/Zip Code" />
          <Input placeholder="Country" />
          <Input placeholder="Email Address" />
          <Input placeholder="Phone #" />

        </View>
        <View>
          <Text>Tell us more about you</Text>
          <Text style={{fontWeight:"bold"}}>About me</Text>
          <Input placeholder="type here" />
          <Text style={{fontWeight:"bold"}}>My Interests</Text>
          <Text>You can select 7 key interests</Text>
          <Input placeholder="Current Role" />
          <Text>Describe your current Scope</Text>
          <Input placeholder="Type here." />
          <Text>Identify your personality type indicator</Text>
          <Input placeholder="Type here. like (MBTI, DISC, APEST, Birkman, Enneagram + Wing, Kolbe Index, other, N/A" />
          <Text style={{fontWeight:"bold"}}>Tell us more about your organization</Text>
          <Input placeholder="Organization Name" />
          <Input placeholder="Type of organization" />
          <Input placeholder="How many employees do you have?" />
          <Text>Description of church or ministry organization</Text>
          <Input placeholder="Type here." />
        </View>

      </View>


    )
  }
}