import { Container, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../style'
import EditableText from '../Forms/EditableText'
import { ResourceContext } from './ResourceContext';
import { Storage } from 'aws-amplify';
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

Amplify.configure(awsconfig);


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

                    if (this.state.imageUrl == null || this.state.image != state.data.resources.items[state.currentResource].image)
                        this.getImage(state.data.resources.items[state.currentResource].image)
                    return (
                        <Container style={{ backgroundColor: "#F0493E", height: "20vw" }}>
                            {this.state.imageUrl ?
                                <Image style={{ position: "relative", width: "100%", height: "20vw" }}
                                    source={this.state.imageUrl} onError={() => { this.getImage(state.data.resources.items[state.currentResource].image) }}>
                                </ Image>
                                : null
                            }
                            {state.currentSeries == null ?
                                <View style={styles.resourcefileInputWrapper}>
                                    <JCButton buttonType={ButtonTypes.Transparent} onPress={() => { }}><Ionicons size={32} name="ios-image" style={styles.resourceImageIcon} /></JCButton>
                                    <input style={{ fontSize: "200px", position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='image/*' onChange={(e) => actions.updateResourceImage(state.currentResource, e)} />
                                </View>
                                : null
                            }
                            {state.currentEpisode != null ?
                                <View style={styles.resourcefileFieldWrapper}>
                                    <JCButton buttonType={ButtonTypes.Transparent} onPress={() => { actions.clearEpisode() }}><Ionicons size={24} name="ios-arrow-back" style={styles.icon} /><Text>Back</Text></JCButton>
                                    <EditableText onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "title", val) }} multiline={false} inputStyle={styles.fontResourceHeaderBold} textStyle={styles.fontCourseHeaderBold} value={state.data.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].title} isEditable={true}></EditableText>
                                    <EditableText onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "description", val) }} multiline={true} inputStyle={styles.fontResourceHeaderDescription} textStyle={styles.fontCourseHeaderDescription} value={state.data.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].description} isEditable={true}></EditableText>
                                </View>
                                :
                                state.currentSeries != null ?
                                    state.data.resources.items[state.currentResource] ?
                                        <View style={styles.resourcefileFieldWrapper}>
                                            <JCButton buttonType={ButtonTypes.Transparent} onPress={() => { actions.clearSeries() }}><Ionicons size={24} name="ios-arrow-back" style={styles.icon} /><Text>Back</Text></JCButton>
                                            <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }} multiline={false} inputStyle={styles.fontResourceHeaderBold} textStyle={styles.fontCourseHeaderBold} value={state.data.resources.items[state.currentResource].series.items[state.currentSeries].title} isEditable={true}></EditableText>
                                            <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }} multiline={true} inputStyle={styles.fontResourceHeaderDescription} textStyle={styles.fontCourseHeaderDescription} value={state.data.resources.items[state.currentResource].series.items[state.currentSeries].description} isEditable={true}></EditableText>
                                        </View>
                                        : null
                                    :
                                    state.data.resources.items[state.currentResource] ?
                                        <View style={styles.resourcefileFieldWrapper}>
                                            <EditableText onChange={(val) => { actions.updateResource(state.currentResource, "title", val) }} multiline={false} inputStyle={styles.fontResourceHeaderBold} textStyle={styles.fontCourseHeaderBold} value={state.data.resources.items[state.currentResource].title} isEditable={true}></EditableText>
                                            <EditableText onChange={(val) => { actions.updateResource(state.currentResource, "description", val) }} multiline={true} inputStyle={styles.fontResourceHeaderDescription} textStyle={styles.fontCourseHeaderDescription} value={state.data.resources.items[state.currentResource].description} isEditable={true}></EditableText>
                                        </View>
                                        : null

                            }
                        </Container>
                    )
                }
                }
            </ResourceHeader.Consumer >
        )
    }
}
export default ResourceHeader