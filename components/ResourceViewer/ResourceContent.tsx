import React from 'react';
import { Container, Card, CardItem } from 'native-base';

import { Text } from 'react-native'
import { ResourceContext } from './ResourceContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import EditableText from '../Forms/EditableText'
import JCComponent from '../JCComponent/JCComponent';

class ResourceContent extends JCComponent {

    static Consumer = ResourceContext.Consumer;
    renderSeries(state, actions): React.ReactNode {
        return (
            <Container style={this.styles.style.resourceContentMainContainer}>
                <Container style={this.styles.style.resourceContentLeftContainer}>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>Current Series</Text>
                        <Text style={{ fontSize: 16, lineHeight: 24, fontFamily: "Graphik-Bold-App", color: '#F0493E', paddingRight: 15 }}>Schedule</Text>
                    </Container>
                    <Container style={this.styles.style.resourceContentCurrentSeriesContainer}>

                        {state.resourceData.resources.items[state.currentResource].series.items.length > 0 ? state.resourceData.resources.items[state.currentResource].series.items[0].episodes.items.map((episode, index) => {
                            return (
                                <Card key={episode.id} style={this.styles.style.resourceContentCurrentSeriesCard}>
                                    {state.isEditable ?
                                        <CardItem>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(0); actions.changeEpisode(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteEpisode(state.currentResource, 0, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                        </CardItem>
                                        : null
                                    }
                                    <TouchableOpacity onPress={() => { if (!state.isEditable) { actions.changeSeries(0); actions.changeEpisode(index) } }}>

                                        <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
                                            {episode.videoPreview ?
                                                <img style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                    src={"https://img.youtube.com/vi/" + episode.videoPreview.replace("https://youtu.be/", "") + "/mqdefault.jpg"}

                                                /> : null}
                                        </CardItem>

                                        <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}>
                                            <EditableText onChange={(val) => { actions.updateEpisode(state.currentResource, 0, index, "title", val) }}
                                                multiline={false}
                                                inputStyle={this.styles.style.episodeTitle}
                                                textStyle={this.styles.style.episodeTitle}
                                                value={episode.title}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                                            <EditableText onChange={(val) => { actions.updateEpisode(state.currentResource, 0, index, "description", val) }}
                                                multiline={true}
                                                inputStyle={this.styles.style.episodeDescription}
                                                textStyle={this.styles.style.episodeDescription}
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
                    <Container style={this.styles.style.resourceContentMoreSeriesContainer}>

                        {state.resourceData.resources.items[state.currentResource].series.items.map((series, index) => {
                            return (


                                <Card key={index} style={this.styles.style.resourceContentMoreSeriesCard}>
                                    {state.isEditable ?
                                        <CardItem>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteSeries(state.currentResource, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                        </CardItem>
                                        : null
                                    }
                                    <TouchableOpacity onPress={() => { !state.isEditable ? actions.changeSeries(index) : null }}>
                                        <CardItem style={this.styles.style.resourceContentMoreSeriesIframeContainer}>
                                            <img style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                src={"https://img.youtube.com/vi/" + series.episodes.items[0].videoPreview.replace("https://youtu.be/", "") + "/mqdefault.jpg"}

                                            />
                                        </CardItem>
                                        <CardItem>
                                            <EditableText
                                                onChange={(val) => { actions.updateSeries(state.currentResource, index, "title", val) }}
                                                multiline={false}
                                                inputStyle={this.styles.style.seriesTitle}
                                                textStyle={this.styles.style.seriesTitle}
                                                value={series.title}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                        <CardItem>
                                            <EditableText
                                                onChange={(val) => { actions.updateSeries(state.currentResource, index, "description", val) }}
                                                multiline={true}
                                                inputStyle={this.styles.style.seriesDescription}
                                                textStyle={this.styles.style.seriesDescription}
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
                                <Card style={this.styles.style.resourceContentCurrentSeriesCard}>
                                    <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
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
                <Container style={this.styles.style.resourceContentRightContainer}>
                </Container>
            </Container >)
    }
    generateKey(state): string {
        return state.currentResource + "-" + state.currentSeries + "-" + state.currentEpisode
    }
    renderEpisodes(state, actions): React.ReactNode {
        const series = state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries]
        return (
            <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
                <Container style={this.styles.style.resourceContentEpisodeLeftContainer}>
                    <EditableText
                        key={this.generateKey(state)}
                        onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }}
                        multiline={false}
                        inputStyle={this.styles.style.headerSeriesTitle}
                        textStyle={this.styles.style.headerSeriesTitle}
                        value={series.title}
                        isEditable={state.isEditable}></EditableText>



                    <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                        src={"https://www.youtube.com/embed/videoseries?list=" + series.playlist}

                    />

                    <EditableText
                        key={this.generateKey(state)}
                        onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }}
                        multiline={true}
                        inputStyle={this.styles.style.headerSeriesDescription}
                        textStyle={this.styles.style.headerSeriesDescription}
                        value={series.description}
                        isEditable={state.isEditable}></EditableText>


                    {/*<Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].category}</Text>*/}
                    {series.allFiles ?
                        <a href={series.allFiles}>
                            <Text>All series files</Text>
                        </a> : null
                    }
                    {series.playlist ?
                        <a href={series.playlist}>
                            <Text>Series Playlist</Text>
                        </a> : null
                    }

                    <Container style={this.styles.style.resourceContentEpisodesContainer}>
                        {series.episodes.items.map((episode, index) => {
                            return (
                                <TouchableOpacity key={episode.id} onPress={() => { !state.isEditable ? actions.changeEpisode(index) : null }}>

                                    <Card style={this.styles.style.resourceContentEpisodeCard}>
                                        {state.isEditable ?
                                            <CardItem>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeEpisode(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>

                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteEpisode(state.currentResource, state.currentSeries, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                            </CardItem> :
                                            null
                                        }
                                        <CardItem style={this.styles.style.resourceContentEpisodesIframeContainer}>
                                            {episode.videoPreview ?
                                                <img style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                    src={"https://img.youtube.com/vi/" + episode.videoPreview.replace("https://youtu.be/", "") + "/mqdefault.jpg"}

                                                /> : null}
                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                                            <EditableText
                                                onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, index, "title", val) }}
                                                multiline={false}
                                                inputStyle={this.styles.style.episodeTitle}
                                                textStyle={this.styles.style.episodeTitle}
                                                value={episode.title}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}>
                                            <EditableText
                                                onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, index, "description", val) }}
                                                multiline={true}
                                                inputStyle={this.styles.style.episodeDescription}
                                                textStyle={this.styles.style.episodeDescription}
                                                value={episode.description}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                        <CardItem>
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
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            )

                        })}
                        {state.isEditable ?
                            <TouchableOpacity onPress={actions.createEpisode}>
                                <Card style={this.styles.style.resourceContentEpisodeCard}>
                                    <CardItem style={this.styles.style.resourceContentEpisodesIframeContainer}>
                                        <Text>Add Episode</Text>
                                    </CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, color: "#333333" }}></Text></CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}></Text></CardItem>
                                </Card>
                            </TouchableOpacity> : null
                        }

                    </Container>

                </Container >

                <Container style={this.styles.style.resourceContentEpisodeRightContainer}>
                </Container>

            </Container >)
    }
    renderEpisode(state, actions): React.ReactNode {
        const series = state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries]
        const episode = state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode]
        return (
            <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
                <Container style={this.styles.style.resourceContentEpisodeLeftContainer}>
                    <EditableText
                        key={this.generateKey(state)}

                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "title", val) }}
                        multiline={false}
                        inputStyle={this.styles.style.headerEpisodeTitle}
                        textStyle={this.styles.style.headerEpisodeTitle}
                        value={episode.title}
                        isEditable={state.isEditable}></EditableText>


                    <iframe style={{ padding: 0, border: 0, width: 600, height: 336 }}
                        src={"https://www.youtube.com/embed/" + episode.videoPreview.replace("https://youtu.be/", "")}

                    />

                    <EditableText
                        key={this.generateKey(state)}

                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "description", val) }}
                        multiline={true}
                        inputStyle={this.styles.style.headerEpisodeDescription}
                        textStyle={this.styles.style.headerEpisodeDescription}
                        value={episode.description}
                        isEditable={state.isEditable}></EditableText>

                    {/*}  <Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].category}</Text>*/}

                    {series.allFiles ?
                        <a href={series.allFiles}>
                            <Text>All series files</Text>
                        </a> : null
                    }
                    {series.playlist ?
                        <a href={series.playlist}>
                            <Text>Series Playlist</Text>
                        </a> : null
                    }
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

                <Container style={this.styles.style.resourceContentEpisodeRightContainer}>
                </Container>

            </Container >)
    }
    render(): React.ReactNode {

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