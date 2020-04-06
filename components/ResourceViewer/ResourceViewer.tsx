import { Icon, Button, View, Input, Form, Item, Label, Content, Container } from 'native-base';
import { Image } from 'react-native'
import * as React from 'react';
//import * as queries from '../../src/graphql/queries';
//import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import styles from '../../components/style.js'
import TagInput from 'react-native-tags-input';
import { Dimensions } from 'react-native'
import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports';
import { } from '@material-ui/core';
import ResourceMenu from './ResourceMenu'
import ResourceHeader from './ResourceHeader'
import { withNavigation } from 'react-navigation';
import ResourceOverview from './ResourceOverview'
import ResourceContent from './ResourceContent'
import { v1 as uuidv1 } from 'uuid';
import { ResourceRoot, Resource, ResourceEpisode, ResourceSeries } from "../../src/models";
import { DataStore, Predicates } from '@aws-amplify/datastore'
import { ResourceContext } from './ResourceContext';
Amplify.configure(awsconfig);

const mainColor = '#ffffff';

interface Props {
    navigation: any
    groupId: any
}
interface State {
    data: any
    currentResource: any
}
class ResourceViewer extends React.Component<Props, State> {
    static Provider = ResourceContext.Provider;
    constructor(props: Props) {
        super(props);
        this.state = {
            data: null,
            currentResource: null
        }
        this.setInitialData(props)
    }
    async createResourceRoot() {
        console.log("test1")
        const series = await DataStore.save(
            new ResourceSeries({
                type: "curriculum",
                title: "Overview",
                image: "test.jpg",
                description: "..."
            })
        );
        const resource = await DataStore.save(
            new Resource({
                type: "curriculum",
                menuTitle: "Overview",
                title: "Overview",
                image: "test.jpg",
                description: "...",
                extendedDescription:null,
                series: [series[0]]
            })
        );
        const resourceRoot = await DataStore.save(
            new ResourceRoot({
                type: `curriculum`,
                resources: [resource[0]]
            })
        );

        console.log(resourceRoot[0])
        this.setState({ data: resourceRoot[0], currentResource: 0 })


    }
    async setInitialData(props) {
       //    await DataStore.delete(ResourceSeries, Predicates.ALL)
      //     await DataStore.delete(ResourceRoot, Predicates.ALL)
      //     await DataStore.delete(Resource, Predicates.ALL)
    //       await DataStore.delete(ResourceEpisode, Predicates.ALL)
        const getResourceRoot = await DataStore.query(ResourceRoot);
        if (getResourceRoot.length == 0) {

            this.createResourceRoot();
        }
        else {
           
            this.setState({ data: getResourceRoot[0], currentResource: 0 })
        }
      
    }
    createResource = async () => {
        const resource = await DataStore.save(
            new Resource({
                type: "curriculum",
                menuTitle: "New Resource",
                title: "New Resource",
                image: "test.jpg",
                description: "..."
            })
        );
        const resourceRoute = await DataStore.save(
            ResourceRoot.copyOf(this.state.data, updated => {
                updated.resources = updated.resources.concat(resource)
            })
        );
        console.log(resourceRoute)
        this.setState({ data: resourceRoute[0] })
    }
   
    changeResource = (index) => {
        console.log({ "changeResource": index })
        this.setState({ currentResource: index })
    }
    updateResource = async (index, item, value) => {
        const resourceRoute = await DataStore.save(
            ResourceRoot.copyOf(this.state.data, updated => {
                updated.resources[index][item] = value
            })
        );
        console.log(resourceRoute)
        this.setState({ data: resourceRoute[0] })
    }
    deleteResource = async (index) => {
        if (index > 0) {
            const resourceRoute = await DataStore.save(
                ResourceRoot.copyOf(this.state.data, updated => {
                    updated.resources.splice(index, 1)
                })
            );
            console.log(resourceRoute)
            this.setState({ data: resourceRoute[0] })
        }
    }
    getValueFromKey(myObject: any, string: any) {
        const key = Object.keys(myObject).filter(k => k.includes(string));
        return key.length ? myObject[key[0]] : "";
    }
    updateResourceImage = async (index1, e) => {

        const file = e.target.files[0];
        var user = await Auth.currentAuthenticatedUser();
        var userId = this.getValueFromKey(user.storage, 'aws.cognito.identity-id')
        var id = uuidv1()
        Storage.put('resource/' + id + '.jpg', file, {
            level: 'protected',
            contentType: 'image/jpg',
            identityId: userId
        })
            .then(result => {

                Storage.get('resource/' + id + '.jpg', {
                    level: 'protected'
                }).then(result2 => {
                    console.log(result2)
                    this.updateResource(index1, "image", result2)
                })


                // console.log(result)

            })
            .catch(err => console.log(err));

    }
    render() {

        return (this.state.data != null ?
            <ResourceViewer.Provider value={{
                state: {
                    ...this.state
                }, actions: {
                    createResource: this.createResource,
                    changeResource: this.changeResource,
                    updateResource: this.updateResource,
                    deleteResource: this.deleteResource,
                    updateResourceImage: this.updateResourceImage
                }
            }}>
                <Container style={{ padding: 0, margin: 0 }}>
                    <ResourceMenu></ResourceMenu>
                    <Content >
                        <ResourceHeader></ResourceHeader>
                        {this.state.currentResource == 0 ?
                            <ResourceOverview></ResourceOverview>
                            :
                            <ResourceContent></ResourceContent>}
                    </Content>
                </Container>
            </ResourceViewer.Provider>
            : null)

    }
}
export default withNavigation(ResourceViewer)