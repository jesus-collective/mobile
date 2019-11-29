import React from 'react';
import { Component } from 'react';
import awsConfig from '../../src/aws-exports';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import Amplify, { API, graphqlOperation, Analytics } from 'aws-amplify';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin'
Amplify.configure(awsConfig);

import { Share,StyleSheet, TouchableOpacity, WebView, Image, SectionList, View } from 'react-native'
import {  Drawer, Container, Left, Icon, Title, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import { SearchBar } from "react-native-elements";
import { ListItem, Card, CardItem, Body, List, Fab, Content, Text, Tab, Tabs, Separator, ScrollableTab, TabHeading } from "native-base";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import VideoCard from '../../components/VideoCard/VideoCard'
import * as TeachingTabs from './TeachingTabs'

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    padding: 10,
  },
  titleContainer: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "#DCDCDC",
    padding: 10
  },
  title: {
    fontSize: 25,
    color: "#520000"
  },
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  contentRight:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
interface IProps{
    data:any;
    searching:string;
}

interface IState{
  data:any;
    searching:string;
   
}
class VideoList extends React.PureComponent<IProps, IState>  {
  constructor(props:IProps) {
    super(props)
    this.state = {
      data: props.data,
      searching: props.searching

    };
  }
  componentWillReceiveProps(nextProps:IProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
      console.log("data")
    }
    if (nextProps.searching !== this.state.searching) {
      this.setState({ searching: nextProps.searching });
      console.log("searching")
    }

  }
  render() {
    if (this.state.searching == null || this.state.searching == "" || this.state.data == null)
      return (null)
    else return (
      <Content>
        {this.state.data.map(item => (
          <VideoCard speakers={item.speakers} episodeTitle={item.episodeTitle} videoId={item.Youtube.contentDetails.videoId} description={item.description}></VideoCard>
        ))
        }

      </Content>
    )
  }
}
interface IProps2{

}
interface IState2{
  searching:string;
  data: [];
  currentTab:{
    adult:string;
    kids:string;
    youth:string;
    base:string;
  }
  currentTabData:{[id:string]:any};
}

export default class TeachingScreen extends React.PureComponent<IProps2, IState2>   {
  constructor(props:IProps2) {
    super(props)
    this.state = {
      searching: '',
      data: [],
      currentTab: {
        adult: "adult-sunday",
        kids: "kids-sunday",
        youth: "youth-sunday",
        base: "this-week"
      },
      currentTabData:[]
    };
  }
  onUpdateCurrentTabData() {
    console.log("onUpdateCurrentTabData: " + this.state.currentTabData[this.state.currentTab.base]);
    Analytics.record({ name: 'teachTabVisit',
    attributes: { tab: this.state.currentTabData[this.state.currentTab.base] } });
    this.list(this.state.currentTabData[this.state.currentTab.base])
  }

  componentDidUpdate(prevProps:IProps2, prevState:IState2) {
    if (prevState.currentTab !== this.state.currentTab) {
      console.log("componentDidUpdate currentTab")
      this.onUpdateCurrentTabData();
    }
  }
  updateSearch(search:string, videoType:string) {
    console.log("updateSearch: " + search + videoType)
    this.setState({ searching: search });
    this.search(search, videoType.replace(".$", ""));
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };
  list(videoTypes) {
    const listVideos = API.graphql(graphqlOperation(queries.listVideos, { filter: { videoTypes: { contains: videoTypes } } }));
    listVideos.then(json => {
      console.log("Success queries.listVideos: " + json)

      const temp = this.state.data;
      temp[videoTypes] = json.data.listVideos.items
      this.setState({ data: temp });
    }).catch(err => {
      console.log("Error queries.listVideos: " + err);
      console.log(err);
    });

  }
  search(string:string, videoTypes:string) {
    console.log("search: " + string + " " + videoTypes)
    Analytics.record({ name: 'teachSearch',
    attributes: { videoType: videoTypes, searchString:string } });
    const searchVideo = API.graphql(graphqlOperation(queries.searchVideos, { filter: { videoTypes: { match: videoTypes }, description: { matchPhrasePrefix: string + "*" } } }));
    searchVideo.then(json => {
      console.log("Success queries.searchVideos: " + json)

      const temp = this.state.data;
      temp["search-" + videoTypes.replace(".$", "")] = json.data.searchVideos.items;
      this.setState({ data: temp });
    }).catch(err => {
      console.log("Error queries.searchVideos: " + err);
      console.log(err);
    });

  }

  onSubTabChange(tab:string) {
    var temp = { ...this.state.currentTab };
    temp[temp.base] = tab.ref.key.replace(".$", "")
    this.setState({ currentTab: temp });
  }

  onTabChange(tab:string) {
    var temp = { ...this.state.currentTab };
    temp.base = tab.ref.key.replace(".$", "");
    this.setState({ currentTab: temp });
  }
  renderList(name:string) {
    if (this.state.searching == null || this.state.searching == "")
      return (<Content>
        <SectionList
          sections={[
            { title: 'D', data: this.getListData(name) }
          ]}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) =>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => { }}>
                <Image style={styles.image} style={{ width: 96, height: 54 }} source={{ uri: item.Youtube.snippet.thumbnails.default.url }} />

              </TouchableOpacity>
              <TouchableOpacity style={styles.content} onPress={() => { }}>
             
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{item.episodeTitle}</Text>
                </View>
                  <View style={styles.contentRight}>
                  <Button style={{ padding: 1, margin: 1 }} small transparent><Icon name="download" type="AntDesign" style={{ fontSize: 15, margin: 1, padding: 1 }}></Icon></Button>
                  <Button style={{ padding: 1, margin: 1 }} small transparent><Icon name="arrow-forward" style={{ fontSize: 15, margin: 1, padding: 1 }} /></Button>
               </View>
              
              </TouchableOpacity>
            </View>



          }
          renderSectionHeader={({ section }) =>
            <Text>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
       
      </Content>);
    else
      return null;


  }
  getSearchData(videoType:string) {
    if (this.state.data[videoType] == null)
      return [];
    else
      return this.state.data[videoType];
  }
  getListData(name:string) {
    if (this.state.data[name] == null)
      return [];
    else
      return this.state.data[name];
  }
  renderFab(item) {
    if (item.fab != null)
      return (
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="podcast" type="FontAwesome" />
        </Fab>);
    else return null
  }
  renderSubTabs(item) {
    if (item.subTabs != null)
      return (
        <Tabs tabContainerStyle={{ height: 10, backgroundColor: "red" }}
          onChangeTab={(e) => { this.onSubTabChange(e) }}
          tabBarUnderlineStyle={{ backgroundColor: "black", height: 1 }}
          renderTabBar={() => <ScrollableTab style={{ backgroundColor: "#444444", height: 30 }} />}>
          {item.subTabs.map((item2) => {
            return (<Tab key={item2.name} heading={<TabHeading style={{ backgroundColor: '#444444' }}><Text style={{ fontSize: 10, color: "#ffffff" }} >{item2.title}</Text></TabHeading>}>
              <SearchBar placeholder={item2.searchPlaceHolder} onChangeText={(e) => { this.updateSearch(e, item2.name) }} value={this.state.searching}></SearchBar>
              <VideoList searching={this.state.searching} data={this.getSearchData(item2.name)} ></VideoList>
              {this.renderList(item2.name)}
              {this.renderFab(item2)}
            </Tab>);
          })}
        </Tabs>);
    else
      return (
        <Tabs tabContainerStyle={{ height: 10, backgroundColor: "red" }}
        onChangeTab={(e) => { this.onSubTabChange(e) }}
        tabBarUnderlineStyle={{ backgroundColor: "black", height: 1 }}
        renderTabBar={() => <ScrollableTab style={{ backgroundColor: "#444444", height: 30 }} />}>
        
        <Tab key="site" heading={<TabHeading style={{ backgroundColor: '#444444' }}><Text style={{ fontSize: 10, color: "#ffffff" }} >Regional Sites</Text></TabHeading>}>
        <Content>
          <SearchBar placeholder={item.searchPlaceHolder} onChangeText={(e) => { this.updateSearch(e, "all") }} value={this.state.searching}></SearchBar>
          <VideoList searching={this.state.searching} data={this.getSearchData("all")}></VideoList>
          <Content>
            <Separator bordered><Text>Adult Teaching</Text></Separator>
            <Content>
              <VideoCard speakers={["test"]} episodeTitle="Test" videoId="HWg4ZCxABNQ" description="ABC adh asd adhjs da dhjs dhjas djhas dd 123"></VideoCard>
            </Content>
            <Separator bordered>
              <Text>Youth</Text>
            </Separator>
            <VideoCard speakers={["test","test2"]} episodeTitle="Test" videoId="HWg4ZCxABNQ" description="ABC 123"></VideoCard>
            <Separator bordered>
              <Text>Kids</Text>
            </Separator>
            <Content>
              <VideoCard speakers={null} episodeTitle="Test" videoId="HWg4ZCxABNQ" description="ABC 123"></VideoCard>
            </Content>
          </Content>
        </Content>
        </Tab>
        <Tab key="oak" heading={<TabHeading style={{ backgroundColor: '#444444' }}><Text style={{ fontSize: 10, color: "#ffffff" }} >Oakville</Text></TabHeading>}>
        <Content>
          <SearchBar placeholder={item.searchPlaceHolder} onChangeText={(e) => { this.updateSearch(e, "all") }} value={this.state.searching}></SearchBar>
          <VideoList searching={this.state.searching} data={this.getSearchData("all")}></VideoList>
          <Content>
            <Separator bordered><Text>Adult Teaching</Text></Separator>
            <Content>
              <VideoCard speakers={["test"]} episodeTitle="Test" videoId="HWg4ZCxABNQ" description="ABC adh asd adhjs da dhjs dhjas djhas dd 123"></VideoCard>
            </Content>
            <Separator bordered>
              <Text>Youth</Text>
            </Separator>
            <VideoCard speakers={["test","test2"]} episodeTitle="Test" videoId="HWg4ZCxABNQ" description="ABC 123"></VideoCard>
            <Separator bordered>
              <Text>Kids</Text>
            </Separator>
            <Content>
              <VideoCard speakers={null} episodeTitle="Test" videoId="HWg4ZCxABNQ" description="ABC 123"></VideoCard>
            </Content>
          </Content>
        </Content>
        </Tab>
        </Tabs>
      );
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Teaching" navigation={this.props.navigation} />
        <Tabs renderTabBar={() => <ScrollableTab />} onChangeTab={(e) => { this.onTabChange(e) }}>
          {TeachingTabs.TabSetup.map((item) => {
            return (
              <Tab key={item.name} heading={item.title} >
                {this.renderSubTabs(item)}
              </Tab>);
          })}
        </Tabs>
        <Footer title="Home" navigation={this.props.navigation}></Footer>

      </Container>
    );
  }
}