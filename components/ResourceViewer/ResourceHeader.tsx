import { Container, View, Header, Left, Body, Right, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../style.js'
import EditableText from '../Forms/EditableText'
const Context = React.createContext("resource")
import { ResourceContext } from './ResourceContext';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'


var moment = require('moment');
interface Props {
   
}

class ResourceHeader extends React.Component<Props, State> {
    static Consumer = ResourceContext.Consumer;
    constructor(props: Props) {
        super(props);
    }
    render() {
        //const { navigate } = this.props.navigation;
        return (
            <ResourceHeader.Consumer>
                {({ state, actions }) => {

                    return (<Container style={{ backgroundColor: "#F0493E", height: "20vw" }}>
                        <Image style={{ position:"relative", width: "100%", height: "20vw" }}
                            source={state.data.resources[state.currentResource].image}>
                        </ Image>
                        <View style={styles.resourcefileInputWrapper}>
                            <JCButton buttonType={ButtonTypes.Transparent} onPress={() => { }}><Ionicons size={32} name="ios-image" style={styles.resourceImageIcon} /></JCButton>
                            <input style={{ fontSize: "200px", position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='image/jpg' onChange={(e) => actions.updateResourceImage(state.currentResource, e)} />
                        </View>

                        <View style={styles.resourcefileFieldWrapper}>
                            <EditableText onChange={(val) => { actions.updateResource(state.currentResource, "title", val) }} multiline={false} inputStyle={styles.fontResourceHeaderBold} textStyle={styles.fontCourseHeaderBold} value={state.data.resources[state.currentResource].title} isEditable={true}></EditableText>
                            <EditableText onChange={(val) => { actions.updateResource(state.currentResource, "description", val) }} multiline={true} inputStyle={styles.fontResourceHeaderDescription} textStyle={styles.fontCourseHeaderDescription} value={state.data.resources[state.currentResource].description} isEditable={true}></EditableText>
                        </View>
                    </Container>)
                }
                }
            </ResourceHeader.Consumer >
        )
    }
}
export default ResourceHeader