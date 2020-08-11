import { Image } from 'react-native'
import * as React from 'react';
import * as customQueries from '../../src/graphql-custom/queries';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import JCComponent, { JCState } from '../JCComponent/JCComponent';

Amplify.configure(awsconfig);

interface Props {
    user: any
    size: "small" | "xsmall" | "medium" | "large"
    style?: 'map' | 'my-people'
    isOrg?: boolean
}
interface State extends JCState {
    profileImage: any
    showEmpty: boolean
}
export default class MyProfile extends JCComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...super.getInitialState(),
            profileImage: null,
            showEmpty: false
        }

        if (typeof props.user === "string" && props.user !== "") {
            if (this.props.isOrg) {
                this.getProfileImageFromOrgID(props.user)
            } else {
                this.getProfileImageFromUserID(props.user)
            }
        } else {
            this.getProfileImage(props.user ? props.user.profileImage : null)
        }
    }
    componentDidUpdate(prevProps: Props): void {
        if (prevProps.user !== this.props.user)
            if (typeof this.props.user === "string" && this.props.user !== "") {
                this.getProfileImageFromUserID(this.props.user)
            } else {
                this.getProfileImage(this.props.user ? this.props.user.profileImage : null)
            }
        // this.getProfileImage(this.props.user ? this.props.user.profileImage : null)
    }
    getProfileImage(user: any): void {
        if (user == "" || user == null) {
            this.state = {
                ...super.getInitialState(),
                profileImage: null,
                showEmpty: true
            }
        }
        else {
            Storage.get(this.props.size == "small" || this.props.size == "xsmall" ? user.filenameSmall : this.props.size == "medium" ? user.filenameMedium : user.filenameLarge, {
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
    getProfileImageFromUserID(user: string): void {
        const getUser: any = API.graphql(graphqlOperation(customQueries.getUserForProfile, { id: user }));
        getUser.then((json) => {

            this.getProfileImage(json.data.getUser.profileImage)
        }).catch((e) => {

            if (e.data) {
                this.getProfileImage(e.data.getUser.profileImage)
            }
        })
    }

    getProfileImageFromOrgID(user: string): void {
        const getUser: any = API.graphql(graphqlOperation(customQueries.getOrgForImage, { id: user }));
        getUser.then((json) => {
            this.getProfileImage(json.data.getUser.profileImage)
        }).catch((e) => {
            if (e.data) {
                this.getProfileImage(e.data.getUser.profileImage)
            }
        })
    }

    render(): React.ReactNode {
        return (
            this.state.profileImage != null ?
                <Image style={this.props.size == 'xsmall' ?
                    { width: "20px", height: "20px", borderRadius: 18, marginRight: 5, marginBottom: 5 }
                    : this.props.size == 'small' ?
                        { width: "50px", height: "66px", borderRadius: 120, marginRight: 10, marginBottom: 15, marginLeft: 10 } :
                        this.props.style === "map" || this.props.style === "my-people" ? { width: "80px", height: "96px", borderRadius: 120, marginRight: 10, marginBottom: 15 } :
                            { width: "250px", height: "290px", borderRadius: 120, marginRight: 10, marginBottom: 15 }

                }
                    resizeMode={this.props.size == 'xsmall' ? "contain" : "cover"}
                    source={this.state.profileImage}>

                </ Image>
                :
                this.state.showEmpty || !this.state.profileImage ?
                    <Image style={this.props.size == 'xsmall' ?
                        { width: "20px", height: "20px", borderRadius: 18, marginRight: 5, marginBottom: 0 }
                        : this.props.size == 'small' ?
                            { width: "60px", height: "76px", borderRadius: 120, marginRight: 10, marginBottom: 0, marginLeft: 10 } :
                            this.props.style === "map" || this.props.style === "my-people" ? { width: "80px", height: "96px", borderRadius: 120, marginRight: 10, marginBottom: 0 } :
                                { width: "250px", height: "290px", borderRadius: 120, marginRight: 10, marginBottom: 15 }

                    }
                        resizeMode={this.props.size == 'xsmall' ? "contain" : "cover"}
                        source={require('../../assets/profile-placeholder.png')}>

                    </ Image>
                    : null


        )
    }
}