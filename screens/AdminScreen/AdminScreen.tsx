import React from 'react';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/Header/Header'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import { MapData } from 'components/MyGroups/MyGroups';


interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  showMap: boolean
  mapData: MapData[]
  showMy: boolean
}


export default class AdminScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...this.getInitialState(),
      mapData: [],
      showMap: false,
      showMy: this.props.route.params ? this.props.route.params.mine : false
    }
  }

  render(): React.ReactNode {
    console.log("Homepage")
    return (

      <Container data-testid="events">
        <Header title="Jesus Collective" navigation={this.props.navigation} />

        <HeaderAdmin title="Jesus Collective" navigation={this.props.navigation} />
        {this.isMemberOf("admin") ?
          <Content>
            <Container style={this.styles.style.eventsScreenMainContainer}>
              <Container style={this.styles.style.eventsScreenLeftContainer}>
                <Text>Admin</Text>
              </Container>
              { /*
            <Container style={style.eventsScreenRightContainer}>
              <MyPeople wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyPeople>
              <MyConversations navigation={this.props.navigation}> </MyConversations>
              <Container ></Container>
            </Container>*/}
            </Container>
          </Content> : <Content>
            <Container style={this.styles.style.eventsScreenMainContainer}>
              <Container style={this.styles.style.eventsScreenLeftContainer}>
                <Text>You must be an admin to see this screen</Text>
              </Container>
            </Container>
          </Content>
        }
      </Container>


    );
  }
}
