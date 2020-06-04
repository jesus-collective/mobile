import { Content, Container } from 'native-base';
import * as React from 'react';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'

import * as queries from '../../src/graphql/queries';
import * as customQueries from '../../src/graphql-custom/queries';
import * as mutations from '../../src/graphql/mutations';
import { API, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import { } from '@material-ui/core';
import ResourceMenu from './ResourceMenu'
import ResourceHeader from './ResourceHeader'
import ResourceOverview from './ResourceOverview'
import ResourceContent from './ResourceContent'
import { ResourceRoot, Resource, ResourceSeries, ResourceEpisode } from "../../src/models";
//import { DataStore, Predicates } from '@aws-amplify/datastore'
import { ResourceContext } from './ResourceContext';
import ErrorBoundary from '../ErrorBoundry'
Amplify.configure(awsconfig);


interface Props {
    navigation: any
    groupId: any
}
interface State {
    data: any
    currentResource: number
    currentSeries: number
    currentEpisode: number
}
class ResourceViewer extends React.Component<Props, State> {
    static Provider = ResourceContext.Provider;
    constructor(props: Props) {
        super(props);
        this.state = {
            data: null,
            currentResource: null,
            currentSeries: null,
            currentEpisode: null
        }
        this.setInitialData()
    }
    async createResourceRoot(): Promise<void> {
        console.log("test1")
        const resourceRoot = new ResourceRoot({
            type: `curriculum`,
            groupId: this.props.groupId,
            organizationId: "0"
        })
        const createResourceRoot: any = await API.graphql({
            query: mutations.createResourceRoot,
            variables: { input: resourceRoot },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(createResourceRoot)

        const resource = new Resource({
            type: "curriculum",
            menuTitle: "Overview",
            title: "Overview",
            image: {
                userId: "123",
                filenameSmall: "123",
                filenameMedium: "123",
                filenameLarge: "123",
                filenameUpload: "123"
            },
            description: "...",
            extendedDescription: "123",
            resourceID: createResourceRoot.data.createResourceRoot.id

        })
        try {
            const createResource: any = await API.graphql({
                query: mutations.createResource,
                variables: { input: resource },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(createResource)
        } catch (e) {
            console.log(e)
        }

        const series = new ResourceSeries({
            type: "curriculum",
            title: "Overview",
            image: "123",
            description: "...",
            category: ["123"],
            status: "123",
            allFiles: "123",
            playlist: "123",
            playlistImage: "123",
            seriesID: createResource.data.createResource.id
        })

        const createResourceSeries: any = await API.graphql({
            query: mutations.createResourceSeries,
            variables: { input: series },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(createResourceSeries)

        const getResourceRoot: any = API.graphql({
            query: customQueries.getResourceRoot,
            variables: { id: createResourceRoot.data.createResourceRoot.id },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });

        getResourceRoot.then((json) => {
            console.log(json)
            this.setState({ data: json.data.getResourceRoot, currentResource: 0 })
        }).catch((e) => {
            console.log(e)
        })





    }
    /*    async DeleteAll(): Promise<void> {
            try {
                const listResourceRoots: any = API.graphql({
                    query: queries.listResourceRoots,
                    variables: { limit: 20, filter: { groupId: { eq: this.props.groupId } }, nextToken: null },
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                });
                // Promise.all(q)
                return true
            }
            catch (e) {
                console.log(e)
            }
        }*/
    async setInitialData(): Promise<void> {
        // await DataStore.delete(ResourceSeries, Predicates.ALL)
        //await DataStore.delete(ResourceRoot, Predicates.ALL)
        // await DataStore.delete(Resource, Predicates.ALL)
        // await DataStore.delete(ResourceEpisode, Predicates.ALL)
        //  await this.DeleteAll()


        const listResourceRoots: any = API.graphql({
            query: queries.listResourceRoots,
            variables: { limit: 20, filter: { groupId: { eq: this.props.groupId } }, nextToken: null },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });

        listResourceRoots.then((json) => {

            console.log(json)
            if (json.data.listResourceRoots.items.length == 0) {
                console.log("starting from scratch")
                this.createResourceRoot();

            }
            else {
                console.log("existing data")
                console.log({ json: json })
                console.log({ id: json.data.listResourceRoots.items[0].id })
                const getResourceRoot: any = API.graphql({
                    query: customQueries.getResourceRoot,
                    variables: { id: json.data.listResourceRoots.items[0].id },
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                });

                getResourceRoot.then((json) => {
                    console.log(json)

                    this.setState({ data: json.data.getResourceRoot, currentResource: 0 })
                }).catch((e) => {
                    console.log(e)
                })


                //   console.log(getResourceRoot2)

            }
        }).catch((e) => {
            console.log(e)
        })

        //  const getResourceRoot2 = await DataStore.query(ResourceEpisode);

    }
    createResource = async (): Promise<void> => {
        const resource =
            new Resource({
                type: "curriculum",
                menuTitle: "New Menu Title",
                title: "New Title",
                image: null,
                description: "Enter description",
                extendedDescription: "Enter extended description",
                resourceID: this.state.data.id,
                order: this.state.data.resources.items.length + 1
            })
        try {
            console.log("Creating Resource")

            const createResource: any = await API.graphql({
                query: mutations.createResource,
                variables: { input: resource },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(createResource)
            const temp = this.state.data
            temp.resources.items.push(resource)
            console.log(temp)
            this.setState({ data: temp }, () => this.forceUpdate())

        } catch (e) {
            console.log(e)
        }

    }
    createSeries = async (): Promise<void> => {
        const series =
            new ResourceSeries({
                type: "curriculum",
                title: "New Title",
                image: null,
                description: "Enter description",
                seriesID: this.state.data.resources.items[this.state.currentResource].id,
                //order: this.state.data.resources.items[this.state.currentResource].series.items.length + 1
            })
        try {
            console.log("Creating Resource")

            const createResource: any = await API.graphql({
                query: mutations.createResourceSeries,
                variables: { input: series },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(createResource)
            const temp = this.state.data
            temp.resources.items[this.state.currentResource].series.items.push(series)
            this.setState({ data: temp })

        } catch (e) {
            console.log(e)
        }

    }
    createEpisode = async (): Promise<void> => {
        const episode =
            new ResourceEpisode({
                type: "curriculum",
                title: "New Title",
                //image: null,
                description: "Enter description",
                videoPreview: "Enter Url",
                episodeID: this.state.data.resources.items[this.state.currentResource].series.items[this.state.currentSeries].id,
                //order: this.state.data.resources.items[this.state.currentResource].series.items.length + 1
            })
        try {
            console.log("Creating Resource")

            const createResource: any = await API.graphql({
                query: mutations.createResourceEpisode,
                variables: { input: episode },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(createResource)
            const temp = this.state.data
            temp.resources.items[this.state.currentResource].series.items[this.state.currentSeries].episodes.items.push(episode)
            this.setState({ data: temp })

        } catch (e) {
            console.log(e)
        }

    }
    changeEpisode = (index: number): void => {
        console.log({ "changeEpisode": index })
        this.setState({ currentEpisode: index })
    }
    changeSeries = (index: number): void => {
        console.log({ "changeSeries": index })
        this.setState({ currentSeries: index, currentEpisode: null })
    }
    changeResource = (index: number): void => {
        console.log({ "changeResource": index })
        this.setState({ currentSeries: null, currentResource: index, currentEpisode: null })
    }
    updateResource = async (index: number, item: string, value: any): Promise<void> => {
        try {
            console.log({ "Updating Resource": index })

            const updateResource: any = await API.graphql({
                query: mutations.updateResource,
                variables: {
                    input: {
                        id: this.state.data.resources.items[index].id,
                        [item]: value
                    }
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(updateResource)
            const temp = this.state.data
            temp.resources.items[index][item] = value
            this.setState({ data: temp })

        } catch (e) {
            console.log(e)
        }
    }
    updateResourceOrder = (): void => {
        try {
            this.state.data.resources.items.forEach((item, index) => {
                this.updateResource(index, "order", index)
            })

            /* var temp = this.state.data
             temp.resources.items.forEach((item, index) => {
                 temp.resources.items[index].order = index
             }
             )
             this.setState({ data: temp })*/

        } catch (e) {
            console.log(e)
        }
    }
    deleteResource = async (index) => {

        try {
            console.log({ "Deleting Resource": index })
            const deleteResource: any = await API.graphql({
                query: mutations.deleteResource,
                variables: { input: { id: this.state.data.resources.items[index].id } },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(deleteResource)
            const temp = this.state.data
            temp.resources.items.splice(index, 1)
            this.setState({ data: temp }, this.updateResourceOrder)

        } catch (e) {
            console.log(e)
        }

    }
    updateSeriesOrder = (resourceIndex) => {
        try {
            this.state.data.resources.items[resourceIndex].series.items.forEach((item, index) => {
                this.updateSeries(resourceIndex, index, "order", index)
            })
        } catch (e) {
            console.log(e)
        }
    }
    updateSeries = async (resourceIndex: number, seriesIndex: number, item: string, value: string): Promise<void> => {
        try {
            console.log({ "Updating Resource": { resource: resourceIndex, series: seriesIndex } })

            const updateResource: any = await API.graphql({
                query: mutations.updateResourceSeries,
                variables: {
                    input: {
                        id: this.state.data.resources.items[resourceIndex].series.items[seriesIndex].id,
                        [item]: value
                    }
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(updateResource)
            const temp = this.state.data
            temp.resources.items[resourceIndex].series.items[seriesIndex][item] = value
            this.setState({ data: temp })

        } catch (e) {
            console.log(e)
        }
    }
    deleteSeries = async (resourceIndex: number, seriesIndex: number): Promise<void> => {

        try {
            console.log({ "Deleting Series": { resource: resourceIndex, series: seriesIndex } })
            const deleteResource: any = await API.graphql({
                query: mutations.deleteResourceSeries,
                variables: { input: { id: this.state.data.resources.items[resourceIndex].series.items[seriesIndex].id } },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(deleteResource)
            const temp = this.state.data
            temp.resources.items[resourceIndex].series.items.splice(seriesIndex, 1)
            console.log(temp.resources.items[resourceIndex])
            this.setState({ data: temp }, () => { this.updateSeriesOrder(resourceIndex) })

        } catch (e) {
            console.log(e)
        }

    }
    updateEpisodesOrder = (resourceIndex: number, seriesIndex: number): void => {
        try {
            this.state.data.resources.items[resourceIndex].series.items[seriesIndex].episodes.items.forEach((item, index) => {
                this.updateEpisode(resourceIndex, seriesIndex, index, "order", index)
            })
        } catch (e) {
            console.log(e)
        }
    }
    updateEpisode = async (resourceIndex: number, seriesIndex: number, episodeIndex: number, item: string, value: string): Promise<void> => {
        try {
            console.log({ "Updating Resource": { resource: resourceIndex, series: seriesIndex, episode: episodeIndex } })

            const updateResource: any = await API.graphql({
                query: mutations.updateResourceSeries,
                variables: {
                    input: {
                        id: this.state.data.resources.items[resourceIndex].series.items[seriesIndex].episodes.items[episodeIndex].id,
                        [item]: value
                    }
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(updateResource)
            const temp = this.state.data
            temp.resources.items[resourceIndex].series.items[seriesIndex].episodes.items[episodeIndex][item] = value
            this.setState({ data: temp })

        } catch (e) {
            console.log(e)
        }
    }
    clearEpisode = (): void => {
        this.setState({ currentSeries: null })
    }
    clearSeries = (): void => {
        this.setState({ currentSeries: null, currentEpisode: null })
    }
    deleteEpisode = async (resourceIndex: number, seriesIndex: number, episodeIndex: number): Promise<void> => {

        try {
            console.log({ "Deleting Episode": { resource: resourceIndex, series: seriesIndex, episode: episodeIndex } })
            const deleteResource: any = await API.graphql({
                query: mutations.deleteResourceSeries,
                variables: { input: { id: this.state.data.resources.items[resourceIndex].series.items[seriesIndex].episodes.items[episodeIndex].id } },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(deleteResource)
            const temp = this.state.data
            temp.resources.items[resourceIndex].series.items[seriesIndex].episodes.items.splice(episodeIndex, 1)
            this.setState({ data: temp }, () => { this.updateEpisodesOrder(resourceIndex, seriesIndex) })

        } catch (e) {
            console.log(e)
        }

    }
    getValueFromKey(myObject: any, string: any) {
        const key = Object.keys(myObject).filter(k => k.includes(string));
        return key.length ? myObject[key[0]] : "";
    }
    updateResourceImage = async (index1, e): Promise<void> => {

        const file = e.target.files[0];
        const lastDot = file.name.lastIndexOf('.');
        const ext = file.name.substring(lastDot + 1);
        const user = await Auth.currentCredentials();
        const userId = user.identityId
        const fn = 'resources/upload/group-' + this.state.data.resources.items[index1].id + '-' + new Date().getTime() + '-upload.' + ext
        const fnSave = fn.replace("/upload", "").replace("-upload.", "-[size].").replace("." + ext, ".png")


        Storage.put(fn, file, {
            level: 'protected',
            contentType: file.type,
            identityId: userId
        })
            .then(() => {

                Storage.get(fn, {
                    level: 'protected',
                    identityId: userId
                }).then(result2 => {
                    console.log(result2)
                    this.updateResource(index1, "image", {
                        userId: userId,
                        filenameUpload: fn,
                        filenameLarge: fnSave.replace('[size]', 'large'),
                        filenameMedium: fnSave.replace('[size]', 'medium'),
                        filenameSmall: fnSave.replace('[size]', 'small')
                    })
                })


                // console.log(result)

            })
            .catch(err => console.log(err));

    }
    render(): React.ReactNode {

        return (this.state.data != null ?
            <ErrorBoundary>
                <ResourceViewer.Provider value={{
                    state: {
                        ...this.state
                    }, actions: {
                        createResource: this.createResource,
                        changeResource: this.changeResource,
                        updateResource: this.updateResource,
                        deleteResource: this.deleteResource,
                        updateResourceImage: this.updateResourceImage,
                        changeSeries: this.changeSeries,
                        createSeries: this.createSeries,
                        deleteSeries: this.deleteSeries,
                        updateSeries: this.updateSeries,
                        createEpisode: this.createEpisode,
                        deleteEpisode: this.deleteEpisode,
                        updateEpisode: this.updateEpisode,
                        clearEpisode: this.clearEpisode,
                        clearSeries: this.clearSeries,
                        changeEpisode: this.changeEpisode
                    }
                }}>
                    <Container style={{ padding: 0, margin: 0 }}>
                        <ResourceMenu></ResourceMenu>
                        <ErrorBoundary>
                            <Content >
                                <ResourceHeader></ResourceHeader>
                                {this.state.currentResource == 0 ?
                                    <ResourceOverview></ResourceOverview>
                                    :
                                    <ResourceContent></ResourceContent>}
                                {/*  <ImportKidsandYouth></ImportKidsandYouth>*/}
                            </Content>
                        </ErrorBoundary>
                    </Container>
                </ResourceViewer.Provider>
            </ErrorBoundary>
            : null)

    }
}
export default ResourceViewer