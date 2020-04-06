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

interface Props { }

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
                                {state.data.resources[state.currentResource].series[0].episodes.map((episode)=>{
                                    return (
                                        <Card>
                                            <CardItem><Text>{episode.videoPreview}</Text></CardItem>
                                            <CardItem><Text>{episode.title}</Text></CardItem>
                                           
                                        </Card>
                                    )
                                })}
                                <Text>More Series</Text>
                                {state.data.resources[state.currentResource].series.map((series) => {
                                    return (
                                        <Card>
                                             <CardItem><Text>{series.playlist}</Text></CardItem>
                                             <CardItem><Text>{series.title}</Text></CardItem>
                                             <CardItem><Text>{series.category}</Text></CardItem> 
                                            
                                        </Card>
                                    )
                                })}
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