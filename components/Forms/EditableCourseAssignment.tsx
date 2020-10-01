import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Storage } from 'aws-amplify';

import './react-draft-wysiwyg.css';
import * as customQueries from '../../src/graphql-custom/queries';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { EditorState } from 'draft-js';
import { Text } from 'react-native'
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import JCComponent, { JCState } from '../JCComponent/JCComponent';
import { ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import MessageBoard from '../MessageBoard/MessageBoard';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { API, Auth } from 'aws-amplify';
import { Container } from 'native-base';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
enum initialPostState {
    Yes,
    No,
    Unknown
}
interface Props {
    wordCount: number
    assignmentId: String
    actions: any
}
interface State extends JCState {
    assignmentComplete: boolean
    selectedRoom: any
    data: any
    currentUser: any
    currentRoomId: string
    newToList: any
    userList: any

}
export default class EditableRichText extends JCComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        const z = this.props.actions?.myCourseGroups()
        this.state = {
            ...super.getInitialState(),
            selectedRoom: null,
            data: [],
            currentUser: null,
            currentRoomId: null,
            newToList: [],
            assignmentComplete: false,
            userList: [...z.all]
        }
        console.log({ userList: this.state.userList })

        Auth.currentAuthenticatedUser().then((user: any) => { this.setState({ currentUser: user.username }) })
        this.getInitialData(null)
    }
    async getInitialData(next: string): Promise<void> {
        try {
            const user = await Auth.currentAuthenticatedUser();
            try {
                const query = { limit: 20, filter: { id: { contains: "course-" + this.props.assignmentId + "-" } }, nextToken: next }

                const json: any = await API.graphql({
                    query: customQueries.listDirectMessageRooms,
                    variables: query,
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                });
                if (json?.data?.listDirectMessageRooms?.nextToken !== null) {
                    this.setState({ data: this.state.data.concat(json.data.listDirectMessageRooms.items) })
                    this.getInitialData(json.data.listDirectMessageRooms.nextToken)
                } else if (json?.data?.listDirectMessageRooms) {
                    this.setState({ data: this.state.data.concat(json.data.listDirectMessageRooms.items) }, this.shouldCreateRoom)
                }
            } catch (json) {
                if (json?.data?.listDirectMessageRooms?.nextToken !== null) {
                    this.setState({ data: this.state.data.concat(json.data.listDirectMessageRooms.items) })
                    this.getInitialData(json.data.listDirectMessageRooms.nextToken)
                } else if (json?.data?.listDirectMessageUsers) {
                    this.setState({ data: this.state.data.concat(json.data.listDirectMessageRooms.items) }, this.shouldCreateRoom)
                }
                console.error({ Error: json })
            }
        } catch (err) {
            console.error(err)
        }
    }
    createRoom = (): void => {
        console.log("CreateRoom")
        Auth.currentAuthenticatedUser().then((user: any) => {
            const createDirectMessageRoom: any = API.graphql({
                query: mutations.createDirectMessageRoom,
                variables: { input: { id: "course-" + this.props.assignmentId + "-" + user['username'], roomType: "assignment", name: user.attributes['given_name'] + ' ' + user.attributes['family_name'] + "'s assignment" } },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            createDirectMessageRoom.then((json) => {
                console.log({ createDirectMessageRoom: json })
                console.log("createDMUser")
                const userList = this.state.userList
                userList.map((item) => {
                    const createDirectMessageUser2: any = API.graphql({
                        query: mutations.createDirectMessageUser,
                        variables: { input: { roomID: "course-" + this.props.assignmentId + "-" + user['username'], userID: item.id, userName: item.name } },
                        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                    });
                    createDirectMessageUser2.then((json2) => {
                        console.log({ createDirectMessageUser: json2 });
                    }
                    ).catch((json2) => {
                        console.log({ Error: json2 });
                    })
                })
            })

        }).catch((e) => {
            console.log({ Error: e })
        })

    }
    shouldCreateRoom = async (): Promise<void> => {
        console.log({ "Number of rooms": this.state.data.length })
        const user = await Auth.currentAuthenticatedUser();
        if (this.state.data.filter(item => item.id == "course-" + this.props.assignmentId + "-" + user['username']).length <= 0)
            this.createRoom()

    }

    hasInitialPost = (): initialPostState => {
        if (this.props.assignmentId)
            if (this.state.data.filter(item => item.id == "course-" + this.props.assignmentId + "-" + this.state.currentUser)[0]?.directMessage.items.length <= 0) {
                console.log({ "Assignment does not have initial post": this.props.assignmentId })
                return initialPostState.No
            }
            else {
                console.log({ "Assignment has initial post": this.props.assignmentId })
                return initialPostState.Yes
            }
        else
            return initialPostState.Unknown
    }
    getOtherUsers(data: any): { ids: string[], names: string[] } {
        const ids = [];
        const names = [];
        data.messageUsers.items.forEach(user => {
            if (user.userID !== this.state.currentUser) {
                ids.push(user.userID)
                names.push(user.userName)
            }
        });

        return { ids, names }
    }
    switchRoom(index: number): void {
        this.setState({ selectedRoom: index })
        this.setState({ currentRoomId: this.state.data[index].roomID })
    }
    getCurrentRoomRecipients(): string[] {
        const ids = [];
        this.state.userList.forEach(user => {
            ids.push(user.id)
        })
        console.log(ids)
        return ids
    }
    render(): React.ReactNode {
        return <>
            <div style={{ padding: 5, height: 25, width: "94%", marginTop: 20, backgroundColor: (this.hasInitialPost() == initialPostState.Yes) ? "#71C209" : "#71C209", borderRadius: 4 }}><span style={{ color: "#ffffff", fontSize: 18, fontFamily: 'Graphik-Bold-App', alignSelf: 'center', paddingLeft: 10, paddingTop: 15 }}>Assignment</span></div>
            {(this.hasInitialPost() == initialPostState.Yes) ?
                <Container style={this.styles.style.courseAssignmentMainContainer}>

                    <Container style={this.styles.style.courseAssignmentScreenLeftCard}>
                        <Text style={this.styles.style.eventNameInput}>Review Assignments</Text>

                        {this.state.data != null ?
                            this.state.data.map((item, index) => {
                                const otherUsers = this.getOtherUsers(item)
                                let stringOfNames = ''
                                otherUsers.names.forEach((name, index) => {
                                    if (otherUsers.names.length === index + 1)
                                        stringOfNames += name
                                    else
                                        stringOfNames += (name + ', ')
                                })
                                return (
                                    <TouchableOpacity style={{ backgroundColor: this.state.selectedRoom == index ? "#eeeeee" : "unset", borderRadius: 10, width: "100%", paddingTop: 8, paddingBottom: 8, display: "flex", alignItems: "center" }} key={item.id} onPress={() => this.switchRoom(index)}>
                                        <Text style={{ fontSize: 20, lineHeight: 25, fontWeight: "normal", fontFamily: "Graphik-Regular-App", width: "100%", display: "flex", alignItems: "center" }} >
                                            <ProfileImage user={otherUsers.ids.length === 1 ? otherUsers.ids[0] : null} size="small2"></ProfileImage>
                                            {item.name ? item.name : stringOfNames}
                                        </Text>
                                    </TouchableOpacity>)
                            }) : null}
                    </Container>


                    <Container style={this.styles.style.courseAssignmentScreenRightCard}>
                        <MessageBoard showWordCount={true} totalWordCount={this.props.wordCount} style="courseResponse" roomId={"course-" + this.props.assignmentId + "-" + this.state.currentUser} recipients={this.getCurrentRoomRecipients()}></MessageBoard>
                    </Container>
                </Container>
                : (this.hasInitialPost() == initialPostState.No) ?
                    <MessageBoard showWordCount={true} totalWordCount={this.props.wordCount} style="course" roomId={"course-" + this.props.assignmentId + "-" + this.state.currentUser} recipients={this.getCurrentRoomRecipients()}></MessageBoard>
                    : null
            }


        </>
    }
}