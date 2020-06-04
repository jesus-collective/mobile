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

                        {state.resourceData.resources.items[state.currentResource].series.items.length > 0 ? state.resourceData.resources.items[state.currentResource].series.items[0].episodes.items.map((episode, index) => {
                            return (
                                <Card key={episode.id} style={styles.resourceContentCurrentSeriesCard}>
                                    {state.isEditable ?
                                        <CardItem>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={styles.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={styles.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(0); actions.changeEpisode(index) }}> <Ionicons size={24} name="ios-open" style={styles.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteEpisode(state.currentResource, 0, index) }}><Ionicons size={24} name="ios-trash" style={styles.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={styles.icon} /></JCButton>
                                        </CardItem>
                                        : null
                                    }
                                    <TouchableOpacity onPress={() => { if (!state.isEditable) { actions.changeSeries(0); actions.changeEpisode(index) } }}>

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
                                    </TouchableOpacity>
                                </Card>

                            )
                        }) : null}

                    </Container>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>More Series</Text>
                    </Container>
                    <Container style={styles.resourceContentMoreSeriesContainer}>

                        {state.resourceData.resources.items[state.currentResource].series.items.map((series, index) => {
                            return (


                                <Card key={index} style={styles.resourceContentMoreSeriesCard}>
                                    {state.isEditable ?
                                        <CardItem>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={styles.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={styles.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(index) }}> <Ionicons size={24} name="ios-open" style={styles.icon} /></JCButton>
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
                        {state.isEditable ?
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
                            : null}

                    </Container>
                </Container>
                <Container style={styles.resourceContentRightContainer}>
                </Container>
            </Container >)
    }
    generateKey(state) {
        return state.currentResource + "-" + state.currentSeries + "-" + state.currentEpisode
    }
    renderEpisodes(state, actions) {
        return (
            <Container style={styles.resourceContentEpisodeMainContainer}>
                <Container style={styles.resourceContentEpisodeLeftContainer}>
                    <EditableText
                        key={this.generateKey(state)}
                        onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }}
                        multiline={false}
                        inputStyle={styles.headerSeriesTitle}
                        textStyle={styles.headerSeriesTitle}
                        value={state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].title}
                        isEditable={state.isEditable}></EditableText>



                    <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                        src={"https://www.youtube.com/embed/videoseries?list=" + state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].playlist}

                    />

                    <EditableText
                        key={this.generateKey(state)}
                        onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }}
                        multiline={true}
                        inputStyle={styles.headerSeriesDescription}
                        textStyle={styles.headerSeriesDescription}
                        value={state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].description}
                        isEditable={state.isEditable}></EditableText>


                    {/*<Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].category}</Text>*/}

                    <Container style={styles.resourceContentEpisodesContainer}>
                        {state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items.map((episode, index) => {
                            return (
                                <TouchableOpacity key={episode.id} onPress={() => { !state.isEditable ? actions.changeEpisode(index) : null }}>

                                    <Card style={styles.resourceContentEpisodeCard}>
                                        {state.isEditable ?
                                            <CardItem>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={styles.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={styles.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeEpisode(index) }}> <Ionicons size={24} name="ios-open" style={styles.icon} /></JCButton>

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
                        {state.isEditable ?
                            <TouchableOpacity onPress={actions.createEpisode}>
                                <Card style={styles.resourceContentEpisodeCard}>
                                    <CardItem style={styles.resourceContentEpisodesIframeContainer}>
                                        <Text>Add Episode</Text>
                                    </CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, color: "#333333" }}></Text></CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}></Text></CardItem>
                                </Card>
                            </TouchableOpacity> : null
                        }

                    </Container>

                </Container >

                <Container style={styles.resourceContentEpisodeRightContainer}>
                </Container>

            </Container >)
    }
    renderEpisode(state, actions) {
        const episode = state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode]
        return (
            <Container style={styles.resourceContentEpisodeMainContainer}>
                <Container style={styles.resourceContentEpisodeLeftContainer}>
                    <EditableText
                        key={this.generateKey(state)}

                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "title", val) }}
                        multiline={false}
                        inputStyle={styles.headerEpisodeTitle}
                        textStyle={styles.headerEpisodeTitle}
                        value={episode.title}
                        isEditable={state.isEditable}></EditableText>


                    <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                        src={"https://www.youtube.com/embed/videoseries?list=" + state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].preview}

                    />

                    <EditableText
                        key={this.generateKey(state)}

                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "description", val) }}
                        multiline={true}
                        inputStyle={styles.headerEpisodeDescription}
                        textStyle={styles.headerEpisodeDescription}
                        value={episode.description}
                        isEditable={state.isEditable}></EditableText>

                    {/*}  <Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].category}</Text>*/}
                    {episode.videoPreview ?
                        <a href={episode.videoPreview}>
                            <Text>View Preview</Text>
                        </a> : null
                    }
                    {episode.videoLowRes ?
                        <a href={episode.videoLowRes}>
                            <Text>Lo Res Video</Text>
                        </a>
                        : null
                    }
                    {episode.videoHiRes ?
                        <a href={episode.videoHiRes}>
                            <Text>Hi Res Video</Text>
                        </a>
                        : null
                    }
                    {episode.lessonPlan ?
                        <a href={episode.lessonPlan}>
                            <Text>Lesson Plan</Text>
                        </a>
                        : null
                    }
                    {episode.activityPage ?
                        <a href={episode.activityPage}>
                            <Text>Activity Page</Text>
                        </a> : null
                    }


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