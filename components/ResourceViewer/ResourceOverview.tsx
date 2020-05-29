import React from 'react';
import { StyleProvider, Container, Content } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import { Text } from 'react-native'

import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import EditableText from '../../components/Forms/EditableText'
import Validate from '../../components/Validate/Validate'
import { API, graphqlOperation, Auth, Analytics } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import ResourceViewer from '../../components/ResourceViewer/ResourceViewer'
import { ResourceRoot, Resource, ResourceEpisode, ResourceSeries } from "../../src/models";
import EditableRichText from '../Forms/EditableRichText'
import { ResourceContext } from './ResourceContext';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Props {
    navigation: any
    route: any
}
interface State {
    showMap: boolean
    loadId: string
    data: any
    createNew: boolean
    canSave: boolean
    canLeave: boolean
    canJoin: boolean
    isEditable: boolean
    canDelete: boolean
    validationError: String
    currentUser: String
    currentUserProfile: any
}

class ResourceOverview extends React.Component<Props, State>{
    static Consumer = ResourceContext.Consumer;
    constructor(props: Props) {
        super(props);

        this.state = {
            showMap: false,
            loadId: props.route.params.id,
            createNew: props.route.params.create === "true" ? true : false,
            data: null,
            canSave: true,
            canLeave: false,
            canJoin: true,
            isEditable: true,
            canDelete: true,
            validationError: "",
            currentUser: null,
            currentUserProfile: null
        }
        Auth.currentAuthenticatedUser().then((user: any) => {
            this.setState({
                currentUser: user.username
            })
            const getUser: any = API.graphql(graphqlOperation(queries.getUser, { id: user['username'] }));
            getUser.then((json) => {
                this.setState({
                    currentUserProfile: json.data.getUser
                })
            })
        })
        this.setInitialData(props)
    }
    getValueFromKey(myObject: any, string: any) {
        const key = Object.keys(myObject).filter(k => k.includes(string));
        return key.length ? myObject[key[0]] : "";
    }
    setInitialData(props) {
        if (props.route.params.create === "true")
            Auth.currentAuthenticatedUser().then((user: any) => {
                var z: CreateGroupInput = {
                    id: "resource-" + Date.now(),
                    owner: user.username,
                    type: "resource",
                    name: "",
                    description: "",
                    memberCount: 1,
                    image: "temp"
                }
                this.setState({ data: z })
            })
        else {
            var getGroup: any = API.graphql({
                query: queries.getGroup,
                variables: { id: props.route.params.id },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            var processResults = (json) => {
                this.setState({ data: json.data.getGroup })
            }
            getGroup.then(processResults).catch(processResults)
        }
    }
    mapChanged = () => {
        this.setState({ showMap: !this.state.showMap })
    }
    validate(): boolean {
        var validation: any = Validate.Resource(this.state.data)
        this.setState({ validationError: validation.validationError })
        return validation.result
    }
    createNew() {
        if (this.validate()) {
            var createGroup: any = API.graphql({
                query: mutations.createGroup,
                variables: { input: this.state.data },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            createGroup.then((json: any) => {
                this.setState({ canDelete: true, canSave: true, createNew: false })
                console.log({ "Success mutations.createGroup": json });
            }).catch((err: any) => {
                console.log({ "Error mutations.createGroup": err });
            });
        }
    }
    clean(item) {
        delete item.members
        delete item.messages
        delete item.organizerGroup
        delete item.organizerUser
        delete item.instructors
        delete item.ownerUser
        delete item._deleted
        delete item._lastChangedAt
        delete item.createdAt
        delete item.updatedAt
        return item
    }
    save() {
        if (this.validate()) {
            var updateGroup: any = API.graphql({
                query: mutations.updateGroup,
                variables: { input: this.clean(this.state.data) },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            updateGroup.then((json: any) => {
                this.setState({ canDelete: true, canSave: true, createNew: false })
                console.log({ "Success mutations.updateGroup": json });
            }).catch((err: any) => {
                console.log({ "Error mutations.updateGroup": err });
            });
        }

    }
    leave() {
        Analytics.record({
            name: 'leftResource',
            // Attribute values must be strings
            attributes: { id: this.state.data.id, name: this.state.data.name }
        });
        var deleteGroupMember: any = API.graphql({
            query: mutations.deleteGroupMember,
            variables: { input: { id: this.state.data.id } },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        deleteGroupMember.then((json: any) => {
            this.setState({ canJoin: true, canLeave: false })
            console.log({ "Success mutations.deleteGroupMember": json });
        }).catch((err: any) => {
            console.log({ "Error mutations.deleteGroupMember": err });
        });
    }
    join() {
        Analytics.record({
            name: 'joinedResource',
            // Attribute values must be strings
            attributes: { id: this.state.data.id, name: this.state.data.name }
        });
        var createGroupMember: any = API.graphql({
            query: mutations.createGroupMember,
            variables: { input: { groupID: this.state.data.id, userID: this.state.currentUser } },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        createGroupMember.then((json: any) => {

            this.setState({ canJoin: false, canLeave: true })
            console.log({ "Success mutations.createGroupMember": json });
        }).catch((err: any) => {
            console.log({ "Error mutations.createGroupMember": err });
        });
    }
    delete() {
        var deleteGroup: any = API.graphql({
            query: mutations.deleteGroup,
            variables: { input: { id: this.state.data.id } },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        deleteGroup.then((json: any) => {
            console.log({ "Success mutations.deleteGroup": json });
            this.props.navigation.push("HomeScreen")
        }).catch((err: any) => {
            console.log({ "Error mutations.deleteGroup": err });
        });
    }
    updateValue(field: any, value: any) {
        var temp = this.state.data
        temp[field] = value
        this.setState({ data: temp })
    }

    render() {
        return (
            this.state.data != null ?


                <Container style={styles.resourcesOverviewScreenMainContainer}>

                    <Container style={styles.detailScreenLeftCard}>
                        <Container style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 20 }}>
                            <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: "Graphik-Regular-App", color: '#333333', textTransform: "uppercase", flex: 0 }}>Resource</Text>
                            <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: "Graphik-Regular-App", color: '#979797', textTransform: "uppercase", flex: 0 }}>Sponsored</Text>
                        </Container>
                        <EditableText onChange={(value: any) => { this.updateValue("name", value); this.updateOverview("title", value) }} placeholder="Enter Resource Name" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.name} isEditable={this.state.isEditable}></EditableText>
                        <EditableText onChange={(value: any) => { this.updateValue("description", value); this.updateOverview("description", value) }} placeholder="Enter Resource Description" multiline={true} textStyle={styles.fontRegular} inputStyle={styles.groupDescriptionInput} value={this.state.data.description} isEditable={this.state.isEditable}></EditableText>

                        <Text>Organizer</Text>
                        <ProfileImage user={this.state.data.ownerUser ? this.state.data.ownerUser : this.state.currentUserProfile} size="small" />
                        <Text>Members ({this.state.data.members == null ? "0" : this.state.data.members.items.length})</Text>

                        {
                            this.state.data.members == null ? <Text>No Members Yet</Text> :
                                this.state.data.members.items.length == 0 ?
                                    <Text>No Members Yet</Text> :
                                    this.state.data.members.items.map((item: any, index: any) => {
                                        return (<ProfileImage key={index} user={item} size="small" />)
                                    })}
                        {this.state.canJoin ?
                            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.join() }} >Join Resource</JCButton> :
                            null
                        }
                        {this.state.canLeave ?
                            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.leave() }} >Leave Resource</JCButton> :
                            null
                        }
                        {this.state.createNew ?
                            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.createNew() }} >Create Resource</JCButton>
                            : null
                        }
                        {this.state.canSave ?
                            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.save() }} >Save Resource</JCButton>
                            : null
                        }
                        {this.state.canDelete ?
                            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { if (window.confirm('Are you sure you wish to delete this resource?')) this.delete() }} >Delete Resource</JCButton>
                            : null
                        }
                        <Text>{this.state.validationError}</Text>
                    </Container>
                    <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ResourceOverview.Consumer>
                            {({ state, actions }) => {

                                return (state.data.resources.items[state.currentResource] ? <Container style={{ display: "inline", marginTop: 10, overflow: "visible", width: "100%" }} >

                                    {/*   <EditableRichText onChange={(val) => { actions.updateResource(state.currentResource, "extendedDescription", val) }} value={state.data.resources.items[state.currentResource].extendedDescription} isEditable={true} textStyle=""></EditableRichText>
                                */}
                                </Container> : null)
                            }}
                        </ResourceOverview.Consumer>
                    </Container>
                </Container>
                : null
        )
    }
}
export default function (props) {
    const route = useRoute();
    const navigation = useNavigation()
    return <ResourceOverview {...props} navigation={navigation} route={route} />;
}

