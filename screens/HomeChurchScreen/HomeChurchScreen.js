import React from 'react';
import { Component } from 'react';
import Amplify, { Cache, API, graphqlOperation, Analytics } from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin.js'
Amplify.configure(awsConfig);
import { View } from 'react-native'
import { Authenticator } from 'aws-amplify-react-native';
import { Text, Drawer, Container, Left, Icon, Card, CardItem, Body, Title, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import { Callout, MapView, Marker, Location, Permissions, Constants } from 'expo';
import Header from '../../components/Header/Header.js'
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { ApolloProvider, withApollo } from "react-apollo";
import gql from 'graphql-tag';
import { Modal, TouchableHighlight,  StyleSheet } from 'react-native'

class HomeChurchScreen extends Component {

  constructor(props) {
    super(props)
    Cache.clear();
    this.state = {
      groupType: null,
      groups: [],
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      showFilter: false
    };
  }
  componentDidMount() {
    this._getLocationAsync();
    this.getHomeChurchGroupData()


  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

    // Center the map on the location we just fetched.
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.groupType != this.state.groupType) {
      this.getHomeChurchGroups()
    }
  }

  async getHomeChurchGroups() {
    if (this.state.groupType != null) {
      var promises = this.state.groupType.map((item) => {


        this.props.client.query({
          query: gql(queries.f1ListGroups),
          variables: { itemId: item.id }
        }
        ).then((e) => {
          this.setState({ groups: this.state.groups.concat(e.data.F1ListGroups.groups.group) });

          // this.setState({ groupType: e.data.F1ListGroups.groups.group })
          // console.log();
        });


        /*   const f1ListGroups = API.graphql(graphqlOperation(queries.f1ListGroups, { itemId: item.id }));
           return f1ListGroups.then(json => {
             console.log("Success queries.f1ListGroups: " + json)
             this.setState({groups:this.state.groups.concat(json.data.F1ListGroups.groups.group)});
           }).catch(err => {
             console.log(err)
             console.log("Error queries.f1ListGroups: " + err)
             return null;
           });*/
      })
    }
  }

  async getHomeChurchGroupData() {
    console.log("Start")

    this.props.client.query({
      query: gql(queries.f1ListGroupTypes)
    }).then((e) => {
      this.setState({ groupType: e.data.F1ListGroupTypes.groupTypes.groupType })
      console.log();
    });

    /* if (await Cache.getItem("groupType") != null) {
       this.setState({ groupType: await Cache.getItem("groupType") })
     }
     else {
       const f1ListGroupTypes = API.graphql(graphqlOperation(queries.f1ListGroupTypes, null));
       return f1ListGroupTypes.then(json => {
         console.log("Success queries.f1ListGroupTypes: " + json)
         this.setState({ groupType: json.data.F1ListGroupTypes.groupTypes.groupType })
         Cache.setItem("groupType", json.data.F1ListGroupTypes.groupTypes.groupType)
       }).catch(err => {
         console.log(err)
         console.log("Error queries.f1ListGroupTypes: " + err)
       });
     }*/
  }
  

  renderText() {
    
    if (this.state.groups == null)
      return null
    else
      return this.state.groups.map(item => (
        <MapView.Marker key={item.id}
          coordinate={{
            latitude: item.location.address.latitude,
            longitude: item.location.address.longitude
          }}
          title={item.name}
          description={item.description}
        >
          <MapView.Callout style={{ flex: -1, position: 'absolute', width: 300 }}>
            <Card>
              <CardItem header>
                <Text>{item.name}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    {item.description}
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>
                  {item.maritalStatus.name}  |   {item.gender.name}   |   {item.churchCampus.name}   |   {item.hasChildcare == "false" ? "No Childcare" : "Childcare"}
                </Text>
              </CardItem>

            </Card>
          </MapView.Callout>
        </MapView.Marker>
      ))
  }
  onFilter() {
    console.log("changestate")
    console.log(this.state.showFilter)
    this.setState({ showFilter: !this.state.showFilter })
  }
  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };
  calloutView = {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 20
  };
  calloutSearch = {
    borderColor: "transparent",
    marginleft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  };
  renderFilterCallout() {
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 10,
      
      },
      modal: {
        flex: 1,
        
        padding: 10,
        paddingTop:40
      },
      text: {
        color: '#3f2949',
        marginTop: 10
      }
    })
      return (
        <Modal animationType={"slide"} transparent={false}
        visible={this.state.showFilter}
        onRequestClose={() => { console.log("Modal has been closed.") }}>

        <View style={styles.modal}>
            <Text>By Distance: </Text>
            <Text>By Site: </Text>
            <Text>By Childcare: </Text>
            <Text>By Gender: </Text>
            <TouchableHighlight
            onPress={() => {
              this.onFilter();
            }}><Text>Close</Text></TouchableHighlight>
          </View>
        </Modal>
      )
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Home Church" navigation={this.props.navigation} />


        <MapView
          showsUserLocation={true}
          style={{ alignSelf: 'stretch', height: 1000 }}
          initialRegion={{
            latitude: 43.78825,
            longitude: -78.4324,
            latitudeDelta: 6,
            longitudeDelta: 6,
          }}

        >{this.renderText()}
          

        </MapView>

          <Button onPress={() => { this.onFilter() }} style={{ position: 'absolute', height:30, borderRadius: 20, backgroundColor: 'rgba(50,50,50,0.7)', alignSelf: "center", top: 100 }}><Text>Filter...</Text></Button>
          {this.renderFilterCallout()}

      </Container>

    );
  }
}
export default withApollo(HomeChurchScreen)
