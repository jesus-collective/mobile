import { Container, View, Header, Left, Body, Right, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../style'
import EditableText from '../Forms/EditableText'
const Context = React.createContext("resource")
import { ResourceContext } from './ResourceContext';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

Amplify.configure(awsconfig);


var moment = require('moment');
interface Props {

}
interface State {
    imageUrl: any
    image: any
}
class ResourceHeader extends React.Component<Props, State> {
    static Consumer = ResourceContext.Consumer;
    constructor(props: Props) {
        super(props);
        this.state = {
            imageUrl: null,
            image: null
        }
    }
    async getImage(img) {
        if (img != null) {
            var z = await Storage.get(img.filenameLarge, {
                level: 'protected',
                contentType: 'image/png',
                identityId: img.userId
            })
            this.setState({ imageUrl: z, image: img })
        }
    }
    render() {
        //const { navigate } = this.props.navigation;
        return (
            <ResourceHeader.Consumer>
                {({ state, actions }) => {
                    if (this.state.imageUrl == null || this.state.image != state.data.resources[state.currentResource].image)
                        this.getImage(state.data.resources.items[state.currentResource].image)
                    return (<Container style={{ backgroundColor: "#F0493E", height: "20vw" }}>
                        {this.state.imageUrl ?
                            <Image style={{ position: "relative", width: "100%", height: "20vw" }}
                                source={this.state.imageUrl} onError={() => { this.getImage(state.data.resources.items[state.currentResource].image) }}>
                            </ Image> : null}
                        <View style={styles.resourcefileInputWrapper}>
                            <JCButton buttonType={ButtonTypes.Transparent} onPress={() => { }}><Ionicons size={32} name="ios-image" style={styles.resourceImageIcon} /></JCButton>
                            <input style={{ fontSize: "200px", position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='image/*' onChange={(e) => actions.updateResourceImage(state.currentResource, e)} />
                        </View>
                        {state.data.resources.items[state.currentResource] ?
                            <View style={styles.resourcefileFieldWrapper}>
                                <EditableText onChange={(val) => { actions.updateResource(state.currentResource, "title", val) }} multiline={false} inputStyle={styles.fontResourceHeaderBold} textStyle={styles.fontCourseHeaderBold} value={state.data.resources.items[state.currentResource].title} isEditable={true}></EditableText>
                                <EditableText onChange={(val) => { actions.updateResource(state.currentResource, "description", val) }} multiline={true} inputStyle={styles.fontResourceHeaderDescription} textStyle={styles.fontCourseHeaderDescription} value={state.data.resources.items[state.currentResource].description} isEditable={true}></EditableText>
                            </View> : null}
                    </Container>)
                }
                }
            </ResourceHeader.Consumer >
        )
    }
}
export default ResourceHeader