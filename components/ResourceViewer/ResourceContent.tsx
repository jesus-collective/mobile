import React from 'react';
import { StyleProvider, Container, Content, Card, CardItem } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import { Text } from 'react-native'
import { ResourceContext } from './ResourceContext';
import Validate from '../../components/Validate/Validate'
import { API, graphqlOperation, Auth, DataStore, Predicates } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import ResourceViewer from '../../components/ResourceViewer/ResourceViewer'
import { withNavigation } from 'react-navigation';
import { ResourceRoot, Resource, ResourceEpisode, ResourceSeries } from "../../src/models";
import { WebView } from 'react-native-webview'
interface Props { }
interface State { }
class ResourceContent extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
    }
    static Consumer = ResourceContext.Consumer;
    render() {
        return (
            <ResourceContent.Consumer>
                {({ state, actions }) => {
                    return (
                        <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                            <Container style={{ flex: 70, flexDirection: "column", justifyContent: 'flex-start' }}>
                                <Text>Current Series</Text>
                                <Text>Schedule</Text>
                                <Container style={{ overflow: "scroll", minHeight: 400, flexWrap: this.props.wrap ? "wrap" : "nowrap", flexGrow: 1, width: "100%", flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start" }}>

                                    {state.data.resources[state.currentResource].series[0].episodes.map((episode) => {
                                        return (
                                            <Card style={{ padding: "0px", marginLeft: "10px", marginRight: "10px", width: "300px" }}>
                                                <CardItem style={{ width: "300px", paddingLeft: "0px", paddingRight: "0px", margin: "0px" }}>
                                                    <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                        src={"https://www.youtube.com/embed/" + episode.videoPreview.replace("https://youtu.be/", "")}

                                                    />
                                                </CardItem>
                                                <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text>{episode.title}</Text></CardItem>
                                                <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text>{episode.descripition}</Text></CardItem>
                                            </Card>
                                        )
                                    })}
                                </Container>
                                <Text>More Series</Text>
                                <Container style={{ overflow: "scroll", minHeight: 400, flexWrap: this.props.wrap ? "wrap" : "nowrap", flexGrow: 1, width: "100%", flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start" }}>

                                    {state.data.resources[state.currentResource].series.map((series) => {
                                        return (
                                            <Card>
                                                <CardItem style={{ width: "300px", paddingLeft: "0px", paddingRight: "0px", margin: "0px" }}>
                                                    <iframe style={{ padding: 0, border: 0, width: 300, height: 168 }}
                                                        src={"https://www.youtube.com/embed/videoseries?list=" + series.playlist}

                                                    />
                                                </CardItem>
                                                <CardItem><Text>{series.title}</Text></CardItem>
                                                <CardItem><Text>{series.category}</Text></CardItem>

                                            </Card>
                                        )
                                    })}
                                </Container>
                            </Container>
                            <Container style={{ flex: 30, flexDirection: "column", justifyContent: 'flex-start' }}>
                            </Container>
                        </Container>)
                }}
            </ResourceContent.Consumer>
        )
    }
}
export default withNavigation(ResourceContent)