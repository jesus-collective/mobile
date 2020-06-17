import React from 'react';
import { Container, Card, CardItem } from 'native-base';

import { Text, Image } from 'react-native'
import { ResourceContext } from './ResourceContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import EditableText from '../Forms/EditableText'
import JCComponent from '../JCComponent/JCComponent';

interface State {
    numberOfVideos: number
}

class ResourceContent extends JCComponent<State> {

    static Consumer = ResourceContext.Consumer;
    constructor() {
        super(null)
        this.state = {
            numberOfVideos: 8,
        }
    }
    renderSeries(state, actions): React.ReactNode {
        let temp = [];
        const moreVideosLength = state.resourceData.resources.items[state.currentResource].series.items.length - 3
        return (
            <Container style={{height: 650 + 350*(this.state.numberOfVideos/4), display: "flex", flexDirection: "row", justifyContent: 'flex-start', backgroundColor: "#F9FAFC"}}>
                <Container style={this.styles.style.resourceContentLeftContainer}>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>Current Series</Text>
                    </Container>
                    <Container style={this.styles.style.resourceContentCurrentSeriesContainer}>

                        {state.resourceData.resources.items[state.currentResource].series.items.length > 3 ? state.resourceData.resources.items[state.currentResource].series.items.slice(0,3).map((series, index) => {                            
                            const thumbnailIndex = this.findFirstEpisode(series.episodes.items)
                            return (
                                <Card key={series.id} style={this.styles.style.resourceContentCurrentSeriesCard}>
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
                                        <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
                                                <Image style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                    resizeMode="contain"
                                                    source={{uri: "https://img.youtube.com/vi/" + series.episodes.items[thumbnailIndex].videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg"}}
                                                    />
                                        </CardItem>

                                        <CardItem style={{ width: '100%', padding: 0, margin: 0, paddingBottom: 0, backgroundColor: '#F9FAFC' }}>
                                            <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, index, "title", val) }}
                                                multiline={false}
                                                inputStyle={this.styles.style.seriesTitle}
                                                textStyle={this.styles.style.seriesTitle}
                                                value={series.title}
                                                isEditable={state.isEditable}></EditableText>

                                        </CardItem>
                                        <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC' }}>
                                            <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, index, "description", val) }}
                                                multiline={true}
                                                inputStyle={this.styles.style.seriesDescription}
                                                textStyle={this.styles.style.seriesDescription}
                                                value={this.shortenDescription(series.description)}
                                                isEditable={state.isEditable}></EditableText>
                                        </CardItem>
                                        <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => actions.changeSeries(index)}>Learn More</JCButton>
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

                        {state.resourceData.resources.items[state.currentResource].series.items.slice(3,this.state.numberOfVideos+4).map((series, index) => {
                            temp.push(series)

                            if (index+1 === moreVideosLength && moreVideosLength - this.state.numberOfVideos < 4 && moreVideosLength - this.state.numberOfVideos !== 0) {
                                const offset = 4-temp.length
                                
                                for (let val = 0; val < offset; val++) {
                                    temp.push('dummy')
                                }
                                return <Container style={this.styles.style.resourceContentMoreSeriesRowContainer}>
                                {temp.map((series2, index2) => {

                                    if (series2 === 'dummy') {
                                        return <Card key={index2} style={this.styles.style.resourceContentMoreSeriesCardDummy}></Card>
                                    }

                                    const firstEpisodeIndex = this.findFirstEpisode(series2.episodes.items)
                                    return (
                                        <Card key={index2} style={this.styles.style.resourceContentMoreSeriesCard}>
                                            {state.isEditable ?
                                                <CardItem>
                                                    <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                    <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                    <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(index+index2+offset) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>
                                                    <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteSeries(state.currentResource, index+index2+offset) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                    <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                                </CardItem>
                                                : null
                                            }
                                            <TouchableOpacity onPress={() => { !state.isEditable ? actions.changeSeries(index+index2+offset) : null }}>
                                                <CardItem style={this.styles.style.resourceContentMoreSeriesIframeContainer}>
                                                    <Image style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                        source={{uri: "https://img.youtube.com/vi/" + series2.episodes.items[firstEpisodeIndex].videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg"}}
                                                    />
                                                </CardItem>
                                                <CardItem style={{ backgroundColor: '#F9FAFC' }}>
                                                    <EditableText
                                                        onChange={(val) => { actions.updateSeries(state.currentResource, index+index2+offset, "title", val) }}
                                                        multiline={false}
                                                        inputStyle={this.styles.style.moreSeriesTitle}
                                                        textStyle={this.styles.style.moreSeriesTitle}
                                                        value={series2.title}
                                                        isEditable={state.isEditable}></EditableText>
        
                                                </CardItem>
                                                <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                    <JCButton buttonType={ButtonTypes.MoreSeriesOutlineBold} onPress={() => actions.changeSeries(index+index2+offset)}>Learn More</JCButton>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </Card>
                                    )
                            })}
                            </Container>
                            }

                            if ((index+1)%4===0) {
                                const tempCopy = temp
                                temp = []
                                return <Container style={this.styles.style.resourceContentMoreSeriesRowContainer}>
                                    {tempCopy.map((series2, index2) => {
                                        const firstEpisodeIndex = this.findFirstEpisode(series2.episodes.items)
                                        return (
                                            <Card key={index2} style={this.styles.style.resourceContentMoreSeriesCard}>
                                                {state.isEditable ?
                                                    <CardItem>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(index+index2) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteSeries(state.currentResource, index+index2) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                                    </CardItem>
                                                    : null
                                                }
                                                <TouchableOpacity onPress={() => { !state.isEditable ? actions.changeSeries(index+index2) : null }}>
                                                    <CardItem style={this.styles.style.resourceContentMoreSeriesIframeContainer}>
                                                        <Image style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                            source={{uri: "https://img.youtube.com/vi/" + series2.episodes.items[firstEpisodeIndex].videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg"}}
                                                        />
                                                    </CardItem>
                                                    <CardItem style={{ backgroundColor: '#F9FAFC' }}>
                                                        <EditableText
                                                            onChange={(val) => { actions.updateSeries(state.currentResource, index+index2, "title", val) }}
                                                            multiline={false}
                                                            inputStyle={this.styles.style.moreSeriesTitle}
                                                            textStyle={this.styles.style.moreSeriesTitle}
                                                            value={series2.title}
                                                            isEditable={state.isEditable}></EditableText>
            
                                                    </CardItem>
                                                    <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <JCButton buttonType={ButtonTypes.MoreSeriesOutlineBold} onPress={() => actions.changeSeries(index+index2)}>Learn More</JCButton>
                                                    </CardItem>
                                                    {/*<CardItem>
                                                        <Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{series.category}</Text>
                                                    </CardItem>*/}
                                                </TouchableOpacity>
                                            </Card>
                                        )
                                })}
                                </Container>
                            
                        }

                        })}
                        {state.isEditable ?
                            <TouchableOpacity onPress={actions.createSeries}>
                                <Card style={this.styles.style.resourceContentCurrentSeriesCard}>
                                    <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
                                        <Text>Add Series</Text>
                                    </CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}><Text style={this.styles.style.episodeTitle}></Text></CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                </Card>
                            </TouchableOpacity>
                            : null}
                    {moreVideosLength-this.state.numberOfVideos > 0 ?
                        <Container style={this.styles.style.resourceContentLoadMoreButtonContainer}>
                            <JCButton buttonType={ButtonTypes.Solid} onPress={()=>this.handleMoreVideos(moreVideosLength)}>Load More Videos</JCButton>
                        </Container>
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
                    
                    {state.isEditable ? <EditableText
                        key={this.generateKey(state)}
                        onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }}
                        multiline={false}
                        inputStyle={this.styles.style.headerSeriesTitle}
                        textStyle={this.styles.style.headerSeriesTitle}
                        value={series.title}
                        isEditable={state.isEditable}></EditableText> 
                        : null
                    }

                    <EditableText
                        key={this.generateKey(state)}
                        onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }}
                        multiline={true}
                        inputStyle={this.styles.style.resourceContentEpisodesDescription}
                        textStyle={this.styles.style.resourceContentEpisodesDescription}
                        value={this.stripHTMLTags(series.description)}
                        isEditable={state.isEditable}></EditableText>

                    <Container style={{marginTop: 50, marginBottom: 40, borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, width: 200, alignSelf: 'center'}}></Container>

                    <Text style={this.styles.style.whoIsThisForText}>Who is this for?</Text>
                    <EditableText
                        key={this.generateKey(state)}
                        onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }}
                        multiline={true}
                        inputStyle={this.styles.style.resourceContentEpisodesText}
                        textStyle={this.styles.style.resourceContentEpisodesText}
                        value={this.stripHTMLTags(series.description)}
                        isEditable={state.isEditable}></EditableText>


                    {/*<Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].category}</Text>*/}

                    <Container style={this.styles.style.resourceContentEpisodesContainer}>
                        {series.episodes.items.sort((a,b)=>a.episodeNumber-b.episodeNumber).map((episode, index) => {
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
                                                    src={"https://img.youtube.com/vi/" + episode.videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg"}

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
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeTitle}></Text></CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                </Card>
                            </TouchableOpacity> : null
                        }

                    </Container>

                </Container >

                <Container style={this.styles.style.resourceContentEpisodeRightContainer}>
                    <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>+ Add to my Favourites</JCButton>
                    <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Share with Others</JCButton>
                    <Text style={this.styles.style.resourceContentEpisodesText}>Download all documantation that you’ll need for this package. Lessons overview and templates for whole cirruculum is available as well.</Text>
                
                    {series.allFiles ?
                        <JCButton buttonType={ButtonTypes.Solid} onPress={() => window.location.href = series.allFiles}><AntDesign name="download" size={24} color="white" style={{marginRight: 12}}/>Download Documents</JCButton>
                        : null
                    }
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

    shortenDescription(data: string): string {
        let start = 0;
        let end = 105;
        const cleaned = this.stripHTMLTags(data)

        while (cleaned[end] != " ") {
            end++
        }

        let shortData = cleaned.slice(start,end) + '...'

        while (!"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".includes(shortData[0])) {
            start++
            shortData = cleaned.slice(start,end) + '...'
        }

        return shortData  
    }

    stripHTMLTags(data: string): string {
        return data.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g,"").replace(/&gt;/g,"");
    }

    findFirstEpisode(series: any[]): number {
        let firstEpisodeIndex = 0
        series.forEach((episode, index) => {
            if (episode.episodeNumber === 1)
                firstEpisodeIndex = index;
        })
        return firstEpisodeIndex
    }

    handleMoreVideos(moreVideosLength: number): void {
        if (moreVideosLength - this.state.numberOfVideos >= 8) {
            this.setState({ numberOfVideos: this.state.numberOfVideos + 8 })
        } else  {
            this.setState({ numberOfVideos: this.state.numberOfVideos + 4 })
        }
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