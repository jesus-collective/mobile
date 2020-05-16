import { Container, Header, Left, Body, Right, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../style'
import EditableText from '../Forms/EditableText'
var moment = require('moment');
interface Props {
    groupData: any
    courseData: any
    navigation: any
    onChangeWeek?(week)
}
interface State {

}
class CourseHeader extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }
    render() {
        //const { navigate } = this.props.navigation;
        return (
            this.props.groupData ?
                this.props.courseData ?
                    <Container style={{ backgroundColor: "#F0493E", flex: 20 }}>
                        <Text style={styles.fontCourseHeaderTime}>{moment(this.props.groupData.time).format('MMMM Do YYYY')} - {this.props.groupData.length}</Text>
                        <EditableText multiline={false} textStyle={styles.fontCourseHeaderBold} value={this.props.groupData.name} isEditable={false}></EditableText>
                        <Text style={styles.fontCourseHeader}>Course</Text>
                        <EditableText multiline={true} textStyle={styles.fontCourseHeaderDescription} value={this.props.groupData.description} isEditable={false}></EditableText>
                        {this.props.onChangeWeek ?
                            <Container style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start", backgroundColor: "F0493E" }}>
                                {this.props.courseData.courseDetails.map((item: any, index1) => {
                                    return (
                                        <Button onPress={() => { this.props.onChangeWeek(index1) }}><Text>{item.week}</Text></Button>
                                    )
                                }
                                )}
                            </Container>
                            : null
                        }
                    </Container>
                    : null
                : null
        )
    }
}
export default withNavigation(CourseHeader)