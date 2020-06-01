import { Icon, Button, View, Input, Form, Item, Label, Content, Container } from 'native-base';
import { Image } from 'react-native'
import * as React from 'react';
import GRAPHQL_AUTH_MODE, { Greetings } from 'aws-amplify-react-native'

import * as queries from '../../src/graphql/queries';
import * as customQueries from '../../src/graphql-custom/queries';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import styles from '../../components/style'
import TagInput from 'react-native-tags-input';
import { Dimensions } from 'react-native'
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import { } from '@material-ui/core';
import ResourceMenu from './ResourceMenu'
import ResourceHeader from './ResourceHeader'
import ResourceOverview from './ResourceOverview'
import ResourceContent from './ResourceContent'
import { v1 as uuidv1 } from 'uuid';
import { ResourceRoot, Resource, ResourceEpisode, ResourceSeries } from "../../src/models";
//import { DataStore, Predicates } from '@aws-amplify/datastore'
import { ResourceContext } from './ResourceContext';
import ImportKidsandYouth from '../../screens/ResourceScreen/ImportKidsandYouth'
import ErrorBoundary from '../ErrorBoundry'
Amplify.configure(awsconfig);

const mainColor = '#ffffff';

interface Props {
    navigation: any
    groupId: any
}
interface State {
    data: any
    currentResource: any
    currentSeries: any
}
class ResourceViewer extends React.Component<Props, State> {
    static Provider = ResourceContext.Provider;
    constructor(props: Props) {
        super(props);
        this.state = {
            data: null,
            currentResource: null,
            currentSeries: null
        }
        this.setInitialData(props)
    }
    async createResourceRoot() {
        console.log("test1")
        const resourceRoot = new ResourceRoot({
            type: `curriculum`,
            groupId: this.props.groupId
        })
        var createResourceRoot: any = await API.graphql({
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
            var createResource: any = await API.graphql({
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

        var createResourceSeries: any = await API.graphql({
            query: mutations.createResourceSeries,
            variables: { input: series },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(createResourceSeries)

        var getResourceRoot: any = API.graphql({
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
    async DeleteAll() {
        try {
            var listResourceRoots: any = API.graphql({
                query: queries.listResourceRoots,
                variables: { limit: 20, filter: { groupId: { eq: this.props.groupId } }, nextToken: null },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            var q = await listResourceRoots.then((json) => {
                console.log(json)
                var z = json.data.listResourceRoots.items.map(async (item) => {
                    var listResourceRoots: any = await API.graphql({
                        query: mutations.deleteResourceRoot,
                        variables: { input: { id: item.id } },
                        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                    });

                    // listResourceRoots.then((z) => { console.log(z) }).catch((e) => { console.log({ Error: e }) })
                })
                return z
            })
            // Promise.all(q)
            return true
        }
        catch (e) {
            console.log(e)
        }
    }
    async setInitialData(props) {
        // await DataStore.delete(ResourceSeries, Predicates.ALL)
        //await DataStore.delete(ResourceRoot, Predicates.ALL)
        // await DataStore.delete(Resource, Predicates.ALL)
        // await DataStore.delete(ResourceEpisode, Predicates.ALL)
        //  await this.DeleteAll()


        var listResourceRoots: any = API.graphql({
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
                var getResourceRoot: any = API.graphql({
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
    createResource = async (size) => {
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

            var createResource: any = await API.graphql({
                query: mutations.createResource,
                variables: { input: resource },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(createResource)
            var temp = this.state.data
            temp.resources.items.concat(resource)
            this.setState({ data: temp })

        } catch (e) {
            console.log(e)
        }

    }
    changeSeries = (index) => {
        console.log({ "changeResource": index })
        this.setState({ currentSeries: index })
    }
    changeResource = (index) => {
        console.log({ "changeResource": index })
        this.setState({ currentSeries: null, currentResource: index })
    }
    updateResource = async (index, item, value) => {
        try {
            console.log({ "Updating Resource": index })

            var updateResource: any = await API.graphql({
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
            var temp = this.state.data
            temp.resources.items[index][item] = value
            this.setState({ data: temp })

        } catch (e) {
            console.log(e)
        }
    }
    updateResourceOrder = () => {
        try {
            var z = this.state.data.resources.items.map((item, index) => {
                var updateResource: any = API.graphql({
                    query: mutations.updateResource,
                    variables: { input: { id: item.id, order: index } },
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                });

            })
            Promise.all(z)
            var temp = this.state.data
            temp.resources.items.forEach((item, index) => {
                temp.resources.items[index].order = index
            }
            )
            this.setState({ data: temp })



        } catch (e) {
            console.log(e)
        }
    }
    deleteResource = async (index) => {

        try {
            console.log({ "Deleting Resource": index })
            var deleteResource: any = await API.graphql({
                query: mutations.deleteResource,
                variables: { input: { id: this.state.data.resources.items[index].id } },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            console.log(deleteResource)
            var temp = this.state.data
            temp.resources.items.splice(index, 1)
            this.setState({ data: temp }, this.updateResourceOrder)

        } catch (e) {
            console.log(e)
        }

    }
    getValueFromKey(myObject: any, string: any) {
        const key = Object.keys(myObject).filter(k => k.includes(string));
        return key.length ? myObject[key[0]] : "";
    }
    updateResourceImage = async (index1, e) => {

        const file = e.target.files[0];
        const lastDot = file.name.lastIndexOf('.');
        const ext = file.name.substring(lastDot + 1);
        var user = await Auth.currentCredentials();
        var userId = user.identityId
        const fn = 'resources/upload/group-' + this.state.data.resources.items[index1].id + '-' + new Date().getTime() + '-upload.' + ext
        const fnSave = fn.replace("/upload", "").replace("-upload.", "-[size].").replace("." + ext, ".png")


        Storage.put(fn, file, {
            level: 'protected',
            contentType: file.type,
            identityId: userId
        })
            .then(result => {

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
    render() {

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
                        changeSeries: this.changeSeries
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