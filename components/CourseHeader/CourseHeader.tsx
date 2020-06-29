import { Container } from 'native-base';
import React from 'react';
import { Text } from 'react-native';

import EditableText from '../Forms/EditableText'
import moment from 'moment';
import JCComponent from '../JCComponent/JCComponent';
import { useRoute, useNavigation } from '@react-navigation/native';
interface Props {
    groupData: any
    navigation?: any
    route?: any
}
class CourseHeaderImpl extends JCComponent<Props> {

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        //const { navigate } = this.props.navigation;
        return (
            this.props.groupData ?
                <Container style={{ backgroundColor: "#F0493E", flex: 20 }}>
                    <Text style={this.styles.style.fontCourseHeaderTime}>{moment(this.props.groupData.time).format('MMMM Do YYYY')} - {this.props.groupData.length}</Text>
                    <EditableText multiline={false} textStyle={this.styles.style.fontCourseHeaderBold} value={this.props.groupData.name} isEditable={false}></EditableText>
                    <Text style={this.styles.style.fontCourseHeader}>Course</Text>
                    <EditableText multiline={true} textStyle={this.styles.style.fontCourseHeaderDescription} value={this.props.groupData.description} isEditable={false}></EditableText>

                </Container>

                : null
        )
    }
}

export default function CourseHeader(props: Props): JSX.Element {
    const route = useRoute();
    const navigation = useNavigation()
    return <CourseHeaderImpl {...props} navigation={navigation} route={route} />;
}

