import {  Container, Card,CardItem,Button,Text } from 'native-base';
import * as React from 'react';
interface Props{}
interface State{}
export default class MyConversations extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props);
    }
    render() {
    return (
      <Container style={{flexDirection:'column',alignItems:'flex-start'}} >
      <Button transparent><Text>Latest Conversations</Text></Button>
      <Card><CardItem><Text>Dave Smith</Text></CardItem></Card>
      <Card><CardItem><Text>Dave Smith</Text></CardItem></Card>
      <Card><CardItem><Text>Dave Smith</Text></CardItem></Card>
      <Card><CardItem><Text>Dave Smith</Text></CardItem></Card>
    </Container>

              
    )
  }
 }