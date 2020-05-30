import React from 'react';
import { StyleProvider, Container, Content, Card, CardItem } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import styles from '../../components/style'
import { Text } from 'react-native'
import { ResourceContext } from './ResourceContext';
import Validate from '../../components/Validate/Validate'
import { API, graphqlOperation, Auth, DataStore, Predicates } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import ResourceViewer from '../../components/ResourceViewer/ResourceViewer'
import { ResourceRoot, Resource, ResourceEpisode, ResourceSeries } from "../../src/models";
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props { }
interface State { }
class ResourceContent extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
    }
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

                        {state.data.resources.items[state.currentResource].series.items[0].episodes.items.map((episode) => {
                            return (
                                <TouchableOpacity onPress={() => { actions.changeSeries(0) }}>
                                    <Card style={styles.resourceContentCurrentSeriesCard}>
                                        <CardItem style={styles.resourceContentCurrentSeriesIframeContainer}>
                                            <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                src={"https://www.youtube.com/embed/" + episode.videoPreview.replace("https://youtu.be/", "")}

                                            />
                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}><Text style={{ wordBreak: "break-word", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, color: "#333333" }}>{episode.title}</Text></CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{episode.descripition}</Text></CardItem>
                                    </Card>
                                </TouchableOpacity>
                            )
                        })}
                    </Container>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>More Series</Text>
                    </Container>
                    <Container style={styles.resourceContentMoreSeriesContainer}>

                        {state.data.resources.items[state.currentResource].series.items.map((series, index) => {
                            return (
                                <TouchableOpacity onPress={() => { actions.changeSeries(index) }}>

                                    <Card style={styles.resourceContentMoreSeriesCard}>
                                        <CardItem style={styles.resourceContentMoreSeriesIframeContainer}>
                                            <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                src={"https://www.youtube.com/embed/videoseries?list=" + series.playlist}

                                            />
                                        </CardItem>
                                        <CardItem><Text style={{ wordBreak: "break-word", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, color: "#333333", paddingBottom: 0 }}>{series.title}</Text></CardItem>
                                        <CardItem><Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{series.category}</Text></CardItem>

                                    </Card>
                                </TouchableOpacity>
                            )
                        })}
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

                    <Container style={styles.resourceContentEpisodesContainer}>

                        {state.data.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items.map((episode, index) => {
                            return (
                                <Card style={styles.resourceContentEpisodeCard}>
                                    <CardItem style={styles.resourceContentEpisodesIframeContainer}>
                                        <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                            src={"https://www.youtube.com/embed/" + episode.videoPreview.replace("https://youtu.be/", "")}

                                        />
                                    </CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, color: "#333333" }}>{episode.title}</Text></CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{episode.descripition}</Text></CardItem>
                                </Card>

                            )
                        })}
                    </Container>

                </Container>
                <Container style={styles.resourceContentEpisodeRightContainer}>
                </Container>
            </Container>)
    }

    render() {

        return (
            <ResourceContent.Consumer>
                {({ state, actions }) => {
                    console.log(state.data)
                    if (state.currentSeries == null)
                        return this.renderSeries(state, actions)
                    else
                        return this.renderEpisodes(state, actions)
                }}
            </ResourceContent.Consumer>
        )
    }
}
export default ResourceContent