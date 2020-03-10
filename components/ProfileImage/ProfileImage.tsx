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
    user: any
    size: any
}
interface State {
    profileImage: any
    showEmpty: boolean
}
export default class MyProfile extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            profileImage: null,
            showEmpty: false
        }
        this.getProfileImage(props.user)
        
    }

    getProfileImage(user) {
        console.log(user.profileImage)
        if (user.profileImage == "" || user.profileImage == null) {
            
            this.state = { profileImage: null, showEmpty: true }
        }
        else {
            Storage.get('profileImage.png', {
                level: 'protected',
                contentType: 'image/png',
                identityId: user.profileImage
            })
                .then(result => {
                    
                    this.setState({ profileImage: result })
                })
                .catch(err => {
                    console.log({ 'errr': err })
                    this.setState({ profileImage: null, showEmpty: true })
                })
        }
    }

    render() {
        
        return (
            this.state.profileImage != null ?
                <Image style={this.props.size == 'small' ?
                    { width: "40px", height: "45px", borderRadius: 19 } :
                    { width: "250px", height: "290px", borderRadius: 120 }

                }
                    source={this.state.profileImage}>

                </ Image>
                :
                this.state.showEmpty ?
                    <Image style={this.props.size == 'small' ?
                        { width: "40px", height: "45px", borderRadius: 19 } :
                        { width: "250px", height: "290px", borderRadius: 120 }

                    }
                        source={require('../../assets/profile-placeholder.png')}>

                    </ Image>
                    : null


        )
    }
}