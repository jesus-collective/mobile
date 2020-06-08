import { Container, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';

import EditableText from '../Forms/EditableText'
import { ResourceContext } from './ResourceContext';
import { Storage } from 'aws-amplify';
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import JCComponent from '../JCComponent/JCComponent';

Amplify.configure(awsconfig);

interface Props {

}
interface State {
    imageUrl: any
    image: any
}
class ResourceHeader extends JCComponent<Props, State> {
    static Consumer = ResourceContext.Consumer;
    constructor() {
        super(null)
        this.state = {
            imageUrl: null,
            image: null
        }
    }
    async getImage(img): Promise<void> {
        if (img != null) {
            const z = await Storage.get(img.filenameLarge, {
                level: 'protected',
                contentType: 'image/png',
                identityId: img.userId
            })
            this.setState({ imageUrl: z, image: img })
        }
    }
    render(): React.ReactNode {
        //const { navigate } = this.props.navigation;
        return (
            <ResourceHeader.Consumer>
                {({ state, actions }) => {

                    if (this.state.imageUrl == null || this.state.image != state.resourceData.resources.items[state.currentResource].image)
                        this.getImage(state.resourceData.resources.items[state.currentResource].image)
                    return (
                        <Container style={{ backgroundColor: "#F0493E", height: "20vw" }}>
                            {this.state.imageUrl ?
                                <Image style={{ position: "relative", width: "100%", height: "20vw" }}
                                    source={this.state.imageUrl} onError={() => { this.getImage(state.resourceData.resources.items[state.currentResource].image) }}>
                                </ Image>
                                : null
                            }
                            {state.currentSeries == null ?
                                <View style={this.styles.style.resourcefileInputWrapper}>
                                    <JCButton buttonType={ButtonTypes.Transparent} onPress={() => { null }}><Ionicons size={32} name="ios-image" style={this.styles.style.resourceImageIcon} /></JCButton>
                                    <input style={{ fontSize: "200px", position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='image/*' onChange={(e) => actions.updateResourceImage(state.currentResource, e)} />
                                </View>
                                : null
                            }
                            {state.currentEpisode != null ?
                                <View style={this.styles.style.resourcefileFieldWrapper}>
                                    <JCButton buttonType={ButtonTypes.Transparent} onPress={() => { actions.clearEpisode() }}><Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /><Text>Back</Text></JCButton>
                                    <EditableText onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "title", val) }} multiline={false} inputStyle={this.styles.style.fontResourceHeaderBold} textStyle={this.styles.style.fontCourseHeaderBold} value={state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].title} isEditable={state.isEditable}></EditableText>
                                    <EditableText onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "description", val) }} multiline={true} inputStyle={this.styles.style.fontResourceHeaderDescription} textStyle={this.styles.style.fontCourseHeaderDescription} value={state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].description} isEditable={state.isEditable}></EditableText>
                                </View>
                                :
                                state.currentSeries != null ?
                                    state.resourceData.resources.items[state.currentResource] ?
                                        <View style={this.styles.style.resourcefileFieldWrapper}>
                                            <JCButton buttonType={ButtonTypes.Transparent} onPress={() => { actions.clearSeries() }}><Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /><Text>Back</Text></JCButton>
                                            <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }} multiline={false} inputStyle={this.styles.style.fontResourceHeaderBold} textStyle={this.styles.style.fontCourseHeaderBold} value={state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].title} isEditable={state.isEditable}></EditableText>
                                            <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }} multiline={true} inputStyle={this.styles.style.fontResourceHeaderDescription} textStyle={this.styles.style.fontCourseHeaderDescription} value={state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].description} isEditable={state.isEditable}></EditableText>
                                        </View>
                                        : null
                                    :
                                    state.resourceData.resources.items[state.currentResource] ?
                                        <View style={this.styles.style.resourcefileFieldWrapper}>
                                            <EditableText onChange={(val) => { actions.updateResource(state.currentResource, "title", val) }} multiline={false} inputStyle={this.styles.style.fontResourceHeaderBold} textStyle={this.styles.style.fontCourseHeaderBold} value={state.resourceData.resources.items[state.currentResource].title} isEditable={state.isEditable}></EditableText>
                                            <EditableText onChange={(val) => { actions.updateResource(state.currentResource, "description", val) }} multiline={true} inputStyle={this.styles.style.fontResourceHeaderDescription} textStyle={this.styles.style.fontCourseHeaderDescription} value={state.resourceData.resources.items[state.currentResource].description} isEditable={state.isEditable}></EditableText>
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