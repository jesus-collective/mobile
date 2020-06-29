import * as React from 'react';
import { Container, Content, List, ListItem, Header } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { Text } from 'react-native'
import JCComponent, { JCState } from '../JCComponent/JCComponent';

const routes = [
  {
    name: "Home",
    route: "HomeScreen"
  },
  {
    name: "Events",
    route: "EventsScreen"
  },
  {
    name: "Groups",
    route: "GroupsScreen"
  },
  {
    name: "Resources",
    route: "ResourcesScreen"
  },

  {
    name: "Courses",
    route: "CoursesScreen"
  }

];

const resourceRoutes = [
  {
    name: "Overview",
    route: "ResourcesScreen",
    props: {}
  },
  {
    name: "Kids Curriculum",
    route: "ResourceScreen",
    props: { create: false, id: 'resource-1580889856205' }
  }
]

interface Props {
  route?: any
  navigation: any
}
interface State extends JCState {
  showResourcesSubMenu: boolean
}
class SideBar extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      showResourcesSubMenu: false
    }
  }

  renderResourcesSubMenu(): React.ReactNode {
    return <List
      dataArray={resourceRoutes}
      keyExtractor={data => data.name}
      renderRow={data => {
        return <ListItem
          style={{ marginRight: 20, borderBottomWidth: 0, height: 40 }}
          button
          onPress={() => { this.props.navigation.navigate(data.route, data.props); this.setState({ showResourcesSubMenu: false }) }}>
          <Text style={{ fontFamily: "Graphik-Regular-App", fontSize: 16, lineHeight: 30, color: "#333333", marginLeft: 24 }}>{data.name}</Text>
        </ListItem>
      }}
    />
  }

  render(): React.ReactNode {
    return (
      <Container style={{ width: "100%" }}>
        <Content>
          <Header style={{ backgroundColor: "#FFFFFF" }}></Header>
          <List
            dataArray={routes}
            keyExtractor={data => data.name}
            renderRow={data => {
              if (data.name === 'Resources')
                return (
                  <Container>
                    <ListItem
                      style={{ marginRight: 20 }}
                      button
                      onPress={() => { this.setState({ showResourcesSubMenu: !this.state.showResourcesSubMenu }) }}
                    >
                      <Text style={{ fontFamily: "Graphik-Regular-App", fontSize: 18, lineHeight: 30, color: "#333333", fontWeight: '800' }}>{data.name}</Text>
                      {this.state.showResourcesSubMenu ?
                        <Entypo name="chevron-up" size={22} color="#333333" />
                        : <Entypo name="chevron-down" size={22} color="#333333" />
                      }
                    </ListItem>
                    {this.state.showResourcesSubMenu ? this.renderResourcesSubMenu() : null}
                  </Container>
                )
              return (
                <ListItem
                  style={{ marginRight: 20 }}
                  button
                  onPress={() => { this.props.navigation.navigate(data.route); this.setState({ showResourcesSubMenu: false }) }}
                >
                  <Text style={{ fontFamily: "Graphik-Regular-App", fontSize: 18, lineHeight: 30, color: "#333333", fontWeight: '800' }}>{data.name}</Text>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    )
  }
}


export default SideBar