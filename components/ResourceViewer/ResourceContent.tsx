import React from 'react';
import { Container, Card, CardItem } from 'native-base';
import styles from '../../components/style'
import { Text } from 'react-native'
import { ResourceContext } from './ResourceContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import EditableText from '../Forms/EditableText'

class ResourceContent extends React.Component {

    static Consumer = ResourceContext.Consumer;
    renderSeries(state, actions) {
        return (
            <Container style={styles.resourceContentMainContainer}>
                <Container style={styles.resourceContentLeftContainer}>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>Current Series</Text>
                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Graphik-Bold-App", color: '#F0493E', paddingRight: 15 }}>Schedule</Text>
                    </Container>
                    <Container style={styles.resourceContentCurrentSeriesContainer}>

                        {state.data.resources.items[state.currentResource].series.items.length > 0 ? state.data.resources.items[state.currentResource].series.items[0].episodes.items.map((episode, index) => {
                            return (
                                <TouchableOpacity key={episode.id} onPress={() => { !state.isEditable ? actions.changeSeries(0) : null }}>
                                    <Card style={styles.resourceContentCurrentSeriesCard}>

                                        <CardItem style={styles.resourceContentCurrentSeriesIframeContainer}>
                                            {episode.videoPreview ?
                                                <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                    src={"https://www.youtube.com/embed/" + episode.videoPreview.replace("https://youtu.be/", "")}

                                                /> : null}
                                        </CardItem>

                                        <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}>
                                            <EditableText onChange={(val) => { actions.updateEpisode(state.currentResource, 0, index, "title", val) }}
                                                multiline={false}
                                                inputStyle={styles.episodeTitle}
                                                textStyle={styles.episodeTitle}
                                                value={episode.title}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                                            <EditableText onChange={(val) => { actions.updateEpisode(state.currentResource, 0, index, "description", val) }}
                                                multiline={true}
                                                inputStyle={styles.episodeDescription}
                                                textStyle={styles.episodeDescription}
                                                value={episode.description}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            )
                        }) : null}

                    </Container>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>More Series</Text>
                    </Container>
                    <Container style={styles.resourceContentMoreSeriesContainer}>

                        {state.data.resources.items[state.currentResource].series.items.map((series, index) => {
                            return (


                                <Card key={index} style={styles.resourceContentMoreSeriesCard}>
                                    {state.isEditable ?
                                        <CardItem>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={styles.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={styles.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteSeries(state.currentResource, index) }}><Ionicons size={24} name="ios-trash" style={styles.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={styles.icon} /></JCButton>
                                        </CardItem>
                                        : null
                                    }
                                    <TouchableOpacity onPress={() => { !state.isEditable ? actions.changeSeries(index) : null }}>
                                        <CardItem style={styles.resourceContentMoreSeriesIframeContainer}>
                                            <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                src={"https://www.youtube.com/embed/videoseries?list=" + series.playlist}

                                            />
                                        </CardItem>
                                        <CardItem>
                                            <EditableText
                                                onChange={(val) => { actions.updateSeries(state.currentResource, index, "title", val) }}
                                                multiline={false}
                                                inputStyle={styles.seriesTitle}
                                                textStyle={styles.seriesTitle}
                                                value={series.title}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                        <CardItem>
                                            <EditableText
                                                onChange={(val) => { actions.updateSeries(state.currentResource, index, "description", val) }}
                                                multiline={true}
                                                inputStyle={styles.seriesDescription}
                                                textStyle={styles.seriesDescription}
                                                value={series.description}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                        {/*<CardItem>
                                            <Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{series.category}</Text>
                                        </CardItem>*/}
                                    </TouchableOpacity>
                                </Card>

                            )
                        })}
                        <TouchableOpacity onPress={actions.createSeries}>
                            <Card style={styles.resourceContentCurrentSeriesCard}>
                                <CardItem style={styles.resourceContentCurrentSeriesIframeContainer}>
                                    <Text>Add Series</Text>
                                </CardItem>
                                <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}><Text style={{ wordBreak: "break-word", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, color: "#333333" }}></Text></CardItem>
                                <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}><Text style={{ wordBreak: "break-word", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, color: "#333333" }}></Text></CardItem>
                                <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}></Text></CardItem>
                            </Card>
                        </TouchableOpacity>
                    </Container>
                </Container>
                <Container style={styles.resourceContentRightContainer}>
                </Container>
            </Container>)
    }
    renderEpisodes(state, actions) {
        return (
            <Container style={styles.resourceContentEpisodeMainContainer}>
                <Container style={styles.resourceContentEpisodeLeftContainer}>
                    <EditableText
                        onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }}
                        multiline={false}
                        inputStyle={styles.headerSeriesTitle}
                        textStyle={styles.headerSeriesTitle}
                        value={state.data.resources.items[state.currentResource].series.items[state.currentSeries].title}
                        isEditable={state.isEditable}></EditableText>



                    <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                        src={"https://www.youtube.com/embed/videoseries?list=" + state.data.resources.items[state.currentResource].series.items[state.currentSeries].playlist}

                    />

                    <EditableText
                        onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }}
                        multiline={true}
                        inputStyle={styles.headerSeriesDescription}
                        textStyle={styles.headerSeriesDescription}
                        value={state.data.resources.items[state.currentResource].series.items[state.currentSeries].description}
                        isEditable={state.isEditable}></EditableText>


                    {/*<Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.data.resources.items[state.currentResource].series.items[state.currentSeries].category}</Text>*/}

                    <Container style={styles.resourceContentEpisodesContainer}>
                        {state.data.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items.map((episode, index) => {
                            return (
                                <TouchableOpacity key={episode.id} onPress={() => { !state.isEditable ? actions.changeEpisode(index) : null }}>

                                    <Card style={styles.resourceContentEpisodeCard}>
                                        {state.isEditable ?
                                            <CardItem>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={styles.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={styles.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteEpisode(state.currentResource, state.currentSeries, index) }}><Ionicons size={24} name="ios-trash" style={styles.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={styles.icon} /></JCButton>
                                            </CardItem> :
                                            null
                                        }
                                        <CardItem style={styles.resourceContentEpisodesIframeContainer}>
                                            {episode.videoPreview ?
                                                <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                    src={"https://www.youtube.com/embed/" + episode.videoPreview.replace("https://youtu.be/", "")}

                                                /> : null}
                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                                            <EditableText
                                                onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, index, "title", val) }}
                                                multiline={false}
                                                inputStyle={styles.episodeTitle}
                                                textStyle={styles.episodeTitle}
                                                value={episode.title}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                                            <EditableText
                                                onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, index, "description", val) }}
                                                multiline={true}
                                                inputStyle={styles.episodeDescription}
                                                textStyle={styles.episodeDescription}
                                                value={episode.description}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            )

                        })}
                        <TouchableOpacity onPress={actions.createEpisode}>
                            <Card style={styles.resourceContentEpisodeCard}>
                                <CardItem style={styles.resourceContentEpisodesIframeContainer}>
                                    <Text>Add Episode</Text>
                                </CardItem>
                                <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, color: "#333333" }}></Text></CardItem>
                                <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}></Text></CardItem>
                            </Card>
                        </TouchableOpacity>

                    </Container>

                </Container >

                <Container style={styles.resourceContentEpisodeRightContainer}>
                </Container>

            </Container >)
    }
    renderEpisode(state, actions) {
        return (
            <Container style={styles.resourceContentEpisodeMainContainer}>
                <Container style={styles.resourceContentEpisodeLeftContainer}>
                    <EditableText
                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "title", val) }}
                        multiline={false}
                        inputStyle={styles.fontResourceHeaderBold}
                        textStyle={styles.headerEpisodeTitle}
                        value={state.data.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].title}
                        isEditable={state.isEditable}></EditableText>


                    <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                        src={"https://www.youtube.com/embed/videoseries?list=" + state.data.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].preview}

                    />

                    <EditableText
                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "description", val) }}
                        multiline={true}
                        inputStyle={styles.fontResourceHeaderBold}
                        textStyle={styles.headerEpisodeDescription}
                        value={state.data.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].description}
                        isEditable={state.isEditable}></EditableText>

                    {/*}  <Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.data.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].category}</Text>*/}



                </Container >

                <Container style={styles.resourceContentEpisodeRightContainer}>
                </Container>

            </Container >)
    }
    render() {

        return (
            <ResourceContent.Consumer>
                {({ state, actions }) => {
                    console.log(state.data)
                    if (state.currentEpisode != null)
                        return this.renderEpisode(state, actions)
                    if (state.currentSeries != null)
                        return this.renderEpisodes(state, actions)
                    else
                        return this.renderSeries(state, actions)

                }}
            </ResourceContent.Consumer>
        )
    }
}
export default ResourceContent