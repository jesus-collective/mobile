import React from 'react';
import { Container, View } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import { Text, TouchableOpacity } from 'react-native'

import styles from '../../components/style'
import EditableText from '../../components/Forms/EditableText'

import ProfileImage from '../../components/ProfileImage/ProfileImage'
import { ResourceContext } from './ResourceContext';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Props {
    navigation: any

    isEditable: boolean
}

class ResourceOverview extends React.Component<Props>{
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
                    <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { actions.savGroup() }} >Save Group</JCButton>
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

        return (<ResourceOverview.Consumer>
            {({ state, actions }) => {
                if (state.groupData != null)
                    return <Container style={styles.resourcesOverviewScreenMainContainer}>

                        <Container style={styles.detailScreenLeftCard}>
                            <Container style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 20 }}>
                                <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: "Graphik-Regular-App", color: '#333333', textTransform: "uppercase", flex: 0 }}>Resource</Text>
                                <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: "Graphik-Regular-App", color: '#979797', textTransform: "uppercase", flex: 0 }}>Sponsored</Text>
                            </Container>

                            <EditableText onChange={(value: any) => {
                                actions.updateValueGroup("name", value);// actions.updateOverview("title", value)
                            }} placeholder="Enter Resource Name" multiline={false} textStyle={styles.groupNameInput} inputStyle={styles.groupNameInput} value={state.groupData.name} isEditable={state.isEditable}></EditableText>
                            <EditableText onChange={(value: any) => {
                                actions.updateValueGroup("description", value); //actions.updateOverview("description", value)
                            }} placeholder="Enter Resource Description" multiline={true} textStyle={styles.groupDescriptionInput} inputStyle={styles.groupDescriptionInput} value={state.groupData.description} isEditable={state.isEditable}></EditableText>

                            <Text style={{ fontFamily: "Graphik-Regular-App", fontSize: 16, lineHeight: 23, color: "#333333", paddingBottom: 12 }}>Organizer</Text>
                            <TouchableOpacity onPress={() => { actions.showProfile(state.groupData.ownerUser ? state.groupData.ownerUser.id : state.currentUserProfile.id) }}>
                                <ProfileImage user={state.groupData.ownerUser ? state.groupData.ownerUser : state.currentUserProfile} size="small" />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, letterSpacing: -0.3, color: "#333333", paddingTop: 48, paddingBottom: 12 }}>Members ({state.memberIDs.length})</Text>

                            <View style={styles.groupAttendeesPictures}>
                                {state.memberIDs.length == 0 ?
                                    <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, letterSpacing: -0.3, color: "#333333", marginBottom: 30 }}>No Members Yet</Text> :
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
                            return (state.resourceData.resources.items[state.currentResource] ? <Container style={styles.resourcesOverviewRightCard} >

                                *   <EditableRichText onChange={(val) => { actions.updateResource(state.currentResource, "extendedDescription", val) }} value={state.resourceData.resources.items[state.currentResource].extendedDescription} isEditable={true} textStyle=""></EditableRichText>
                               
                            </Container> : null)
 */}
                        </Container>
                    </Container>
                else
                    return null
            }}

        </ResourceOverview.Consumer>
        )
    }
}
export default function (props: Props) {
    const route = useRoute();
    const navigation = useNavigation()
    return <ResourceOverview {...props} navigation={navigation} route={route} />;
}

