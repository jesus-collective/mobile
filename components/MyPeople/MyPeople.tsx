import { Card, CardItem, Container, Button, Text } from 'native-base';
import * as React from 'react';
interface Props { }
interface State { }
export default class MyPeople extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <Container style={{ flexDirection: 'column', alignItems: 'flex-start' }} >
        <Button transparent><Text>People you may connect with</Text></Button>
        <Card><CardItem><Text>Dave Smith</Text></CardItem></Card>
        <Card><CardItem><Text>Dave Smith</Text></CardItem></Card>
        <Card><CardItem><Text>Dave Smith</Text></CardItem></Card>
        <Card><CardItem><Text>Dave Smith</Text></CardItem></Card>
      </Container>


    )
  }
}