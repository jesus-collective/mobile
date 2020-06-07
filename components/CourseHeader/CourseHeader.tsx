import { Container, Button } from 'native-base';
import React from 'react';
import { Text } from 'react-native';

import EditableText from '../Forms/EditableText'
import moment from 'moment';
import JCComponent from '../JCComponent/JCComponent';
import { useRoute, useNavigation } from '@react-navigation/native';
interface Props {
    groupData: any
    courseData: any
    navigation?: any
    route?: any
    onChangeWeek?(week)
}
class CourseHeaderImpl extends JCComponent<Props> {

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        //const { navigate } = this.props.navigation;
        return (
            this.props.groupData ?
                this.props.courseData ?
                    <Container style={{ backgroundColor: "#F0493E", flex: 20 }}>
                        <Text style={this.styles.style.fontCourseHeaderTime}>{moment(this.props.groupData.time).format('MMMM Do YYYY')} - {this.props.groupData.length}</Text>
                        <EditableText multiline={false} textStyle={this.styles.style.fontCourseHeaderBold} value={this.props.groupData.name} isEditable={false}></EditableText>
                        <Text style={this.styles.style.fontCourseHeader}>Course</Text>
                        <EditableText multiline={true} textStyle={this.styles.style.fontCourseHeaderDescription} value={this.props.groupData.description} isEditable={false}></EditableText>
                        {this.props.onChangeWeek ?
                            <Container style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start", backgroundColor: "F0493E" }}>
                                {this.props.courseData.courseDetails.map((item: any, index1) => {
                                    return (
                                        <Button key={index1} onPress={() => { this.props.onChangeWeek(index1) }}><Text>{item.week}</Text></Button>
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

export default function CourseHeader(props: Props) {
    const route = useRoute();
    const navigation = useNavigation()
    return <CourseHeaderImpl {...props} navigation={navigation} route={route} />;
}

