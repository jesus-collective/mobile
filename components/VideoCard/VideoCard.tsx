import React from 'react';
import { Component } from 'react';
import awsConfig from '../../src/aws-exports';
import { ListItem, Card, CardItem, Body, List, Fab, Content, Text, Tab, Tabs, Separator, ScrollableTab, TabHeading } from "native-base";
import { Share,StyleSheet, TouchableOpacity, WebView, Image, SectionList, View } from 'react-native'
import {  Drawer, Container, Left, Icon, Title, Right, Button } from 'native-base';

interface IProps {
  videoId: string;
  episodeTitle: string;
  speakers: [];
  description:string;
}


interface IState {
  videoId: string;
  episodeTitle: string;
  speakers: [];
  description:string;
}

export default class VideoCard extends React.PureComponent<IProps, IState>  {
    constructor(props:IProps) {
      super(props)
      this.state = {
        videoId: props.videoId,
        episodeTitle: props.episodeTitle,
        speakers: props.speakers,
        description: props.description,
      };
    }
    componentWillReceiveProps(nextProps:IProps) {
      // You don't have to do this check first, but it can help prevent an unneeded render
      if (nextProps.videoId !== this.state.videoId) {
        this.setState({ videoId: nextProps.videoId });
      }
      if (nextProps.episodeTitle !== this.state.episodeTitle) {
        this.setState({ episodeTitle: nextProps.episodeTitle });
      }
      if (nextProps.description !== this.state.description) {
        this.setState({ description: nextProps.description });
      }
    }
    getSpeaker(){
      if (this.state.speakers==null) return null;
      else 
      return "("+this.state.speakers.join(", ")+")";
    }
    onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'React Native | A framework for building native apps using React',
        });
  
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
       // alert(error.message);
      }
    };
    render() {
      console.log("render VideoCard");
      return (<Card style={{ borderRadius: 8 }}>
        <CardItem header bordered style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
          <Text>{this.state.episodeTitle} {this.getSpeaker()}</Text>
        </CardItem>
        <CardItem bordered style={{ height: 200 }}>
          <WebView
            source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' + this.state.videoId + '?modestbranding=1&playsinline=1&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>' }}
          />
        </CardItem>
        <CardItem bordered>
          <Text>{this.state.description}</Text>
        </CardItem>
        <CardItem footer 
           bordered style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} >
        <Button style={{ padding: 1, margin: 1 }} small transparent><Icon name="download" type="AntDesign" style={{ fontSize: 15, margin: 1, padding: 1 }}></Icon></Button>
        <Button style={{ padding: 1, margin: 1 }} small transparent><Icon name="speaker-notes" type="MaterialIcons" style={{ fontSize: 15, margin: 1, padding: 1 }}></Icon></Button>
        <Button style={{ padding: 1, margin: 1 }} small transparent><Icon name="comment-quotes" type="Foundation" style={{ fontSize: 15, margin: 1, padding: 1 }}></Icon></Button>
        <Button style={{ padding: 1, margin: 1 }} small transparent><Icon name="comment-question" type="MaterialCommunityIcons" style={{ fontSize: 15, margin: 1, padding: 1 }}></Icon></Button>
        <Button style={{ padding: 1, margin: 1 }} onPress={this.onShare} small transparent><Icon name="share" type="Feather" style={{ fontSize: 15, margin: 1, padding: 1 }}></Icon></Button>
        
        
        
        </CardItem>
      </Card>);
    }
  }