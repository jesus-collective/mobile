import { Icon, Button, View, Input, Form, Item, Label, Content } from 'native-base';
import { Image } from 'react-native'
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

        if (typeof props.user === "string" && props.user !== "") {
            this.getProfileImageFromUserID(props.user)
        } else {
            this.getProfileImage(props.user ? props.user.profileImage : null)
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user)
            if (typeof this.props.user === "string" && this.props.user !== "") {
                this.getProfileImageFromUserID(this.props.user)
            } else {
                this.getProfileImage(this.props.user ? this.props.user.profileImage : null)
            }
        // this.getProfileImage(this.props.user ? this.props.user.profileImage : null)
    }
    getProfileImage(user) {
        if (user == "" || user == null) {
            this.state = { profileImage: null, showEmpty: true }
        }
        else {
            Storage.get(this.props.size == "small" ? user.filenameSmall : this.props.size == "medium" ? user.filenameMedium : user.filenameLarge, {
                level: 'protected',
                contentType: 'image/png',
                identityId: user.userId
            })
                .then(result => {
                    this.setState({ profileImage: result }, () => { this.forceUpdate() })
                })
                .catch(err => {
                    console.log({ 'errr': err })
                    this.setState({ profileImage: null, showEmpty: true }, () => { this.forceUpdate() })
                })
        }
    }
    getProfileImageFromUserID(user) {
        var getUser: any = API.graphql(graphqlOperation(queries.getUser, { id: user }));
        getUser.then((json) => {

            this.getProfileImage(json.data.getUser.profileImage)
        }).catch((e) => {

            if (e.data) {
                this.getProfileImage(e.data.getUser.profileImage)
            }
        })
    }

    render() {
        return (
            this.state.profileImage != null ?
                <Image style={this.props.size == 'small' ?
                    { width: "55px", height: "55px", borderRadius: 50, marginRight: 10, marginBottom: 15 } :
                    { width: "250px", height: "290px", borderRadius: 120, marginRight: 10, marginBottom: 15 }

                }
                    source={this.state.profileImage}>

                </ Image>
                :
                this.state.showEmpty ?
                    <Image style={this.props.size == 'small' ?
                        { width: "55px", height: "55px", borderRadius: 50, marginRight: 10, marginBottom: 15 } :
                        { width: "250px", height: "290px", borderRadius: 120, marginRight: 10, marginBottom: 15 }

                    }
                        source={require('../../assets/profile-placeholder.png')}>

                    </ Image>
                    : null


        )
    }
}