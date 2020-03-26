import { Container, Header, Left, Body, Right, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../style.js'
import EditableText from '../Forms/EditableText'
const Context = React.createContext("resource")


var moment = require('moment');
interface Props {
    title: any
    description: any
    image: any
}

class CourseHeader extends React.Component<Props, State> {
   
    constructor(props: Props) {
        super(props);
    }
    render() {
        //const { navigate } = this.props.navigation;
        return (
            
            <Container style={{ backgroundColor: "#F0493E", height: 100 }}>
                <EditableText multiline={false} textStyle={styles.fontCourseHeaderBold} value={this.props.title} isEditable={false}></EditableText>
                <EditableText multiline={true} textStyle={styles.fontCourseHeaderDescription} value={this.props.description} isEditable={false}></EditableText>
            </Container>
        )
    }
}
export default CourseHeader