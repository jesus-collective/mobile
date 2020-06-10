import React from 'react';
import { Container, View } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import { Text, TouchableOpacity } from 'react-native'


import EditableText from '../../components/Forms/EditableText'
import JCSwitch from '../../components/JCSwitch/JCSwitch';


import ProfileImage from '../../components/ProfileImage/ProfileImage'
import { ResourceContext } from './ResourceContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import JCComponent from '../JCComponent/JCComponent';

interface Props {
    navigation?: any
    route?: any
}

class ResourceOverviewImpl extends JCComponent<Props>{
    static Consumer = ResourceContext.Consumer;
    constructor(props: Props) {
        super(props);
    }
    getValueFromKey(myObject: any, string: any) {
        const key = Object.keys(myObject).filter(k => k.includes(string));
        return key.length ? myObject[key[0]] : "";
    }



    renderButtons(state, actions): React.ReactNode {
        return (
            <Container style={{ minHeight: 30 }}>
                {state.canJoin ?
                    <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { actions.joinGroup() }} >Join Group</JCButton> :
                    null
                }
                {state.canLeave ?
                    <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { actions.leaveGroup() }} >Leave Group</JCButton> :
                    null
                }
                {state.createNew ?
                    <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { actions.createGroup() }} >Create Group</JCButton>
                    : null
                }
                {state.canSave ?
                    <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { actions.saveGroup() }} >Save Group</JCButton>
                    : null
                }
                {state.canDelete ?
                    <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { if (window.confirm('Are you sure you wish to delete this group?')) actions.deleteGroup() }}>Delete Group</JCButton>
                    : null
                }
                <Text>{state.validationError}</Text>
            </Container>
        )
    }
    render(): React.ReactNode {
        console.log("ResourceScreen")

        return (<ResourceOverviewImpl.Consumer>
            {({ state, actions }) => {
                if (state.groupData != null)
                    return <Container style={this.styles.style.resourcesOverviewScreenMainContainer}>

                        <Container style={this.styles.style.detailScreenLeftCard}>
                            <Container style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 20 }}>
                                <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: "Graphik-Regular-App", color: '#333333', textTransform: "uppercase", flex: 0 }}>Resource</Text>
                                {state.isEditable ?
                                    <JCSwitch switchLabel="Sponsored" initState={state.groupData.isSponsored ? state.groupData.isSponsored === "true" : false} onPress={(status) => { actions.updateValueGroup("isSponsored", status ? "true" : "false") }}></JCSwitch>
                                    :
                                    this.state.groupData.isSponsored == "true" ?
                                        <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: "Graphik-Regular-App", color: '#979797', textTransform: "uppercase", flex: 0 }}>Sponsored</Text> : null
                                }

                            </Container>

                            <EditableText onChange={(value: any) => {
                                actions.updateValueGroup("name", value);// actions.updateOverview("title", value)
                            }} placeholder="Enter Resource Name" multiline={false} textStyle={this.styles.style.groupNameInput} inputStyle={this.styles.style.groupNameInput} value={state.groupData.name} isEditable={state.isEditable}></EditableText>
                            <EditableText onChange={(value: any) => {
                                actions.updateValueGroup("description", value); //actions.updateOverview("description", value)
                            }} placeholder="Enter Resource Description" multiline={true} textStyle={this.styles.style.groupDescriptionInput} inputStyle={this.styles.style.groupDescriptionInput} value={state.groupData.description} isEditable={state.isEditable}></EditableText>

                            <Text style={{ fontFamily: "Graphik-Regular-App", fontSize: 16, lineHeight: 23, color: "#333333", paddingBottom: 12 }}>Organizer</Text>
                            <TouchableOpacity onPress={() => { actions.showProfile(state.groupData.ownerUser ? state.groupData.ownerUser.id : state.currentUserProfile.id) }}>
                                <ProfileImage user={state.groupData.ownerUser ? state.groupData.ownerUser : state.currentUserProfile} size="small" />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, letterSpacing: -0.3, color: "#333333", paddingTop: 48, paddingBottom: 12 }}>Members ({state.memberIDs.length})</Text>

                            <View style={this.styles.style.groupAttendeesPictures}>
                                {state.memberIDs.length == 0 ?
                                    <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 16, lineHeight: 24, letterSpacing: -0.3, color: "#333333", marginBottom: 30 }}>No Members Yet</Text> :
                                    state.memberIDs.map((id: any, index: any) => {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => { actions.showProfile(id) }}>
                                                <ProfileImage key={index} user={id} size="small" />
                                            </TouchableOpacity>
                                        )
                                    })}
                            </View>

                            {this.renderButtons(state, actions)}
                        </Container>
                        <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: "#F9FAFC", height: "100%" }}>

                            {/*
                            return (state.resourceData.resources.items[state.currentResource] ? <Container style={this.styles.style.resourcesOverviewRightCard} >

                                *   <EditableRichText onChange={(val) => { actions.updateResource(state.currentResource, "extendedDescription", val) }} value={state.resourceData.resources.items[state.currentResource].extendedDescription} isEditable={true} textStyle=""></EditableRichText>
                               
                            </Container> : null)
 */}
                        </Container>
                    </Container>
                else
                    return null
            }}

        </ResourceOverviewImpl.Consumer>
        )
    }
}
export default function ResourceOverview(props: Props) {
    const route = useRoute();
    const navigation = useNavigation()
    return <ResourceOverviewImpl {...props} navigation={navigation} route={route} />;
}

