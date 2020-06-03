import * as React from 'react';
import { Container, Content, List, ListItem, Header } from "native-base";
import { Text } from 'react-native'

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
interface Props {
  route: any
  navigation: any
}
class SideBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <Container style={{ width: "100%" }}>
        <Content>
          <Header style={{ backgroundColor: "#FFFFFF" }}></Header>
          <List
            dataArray={routes}
            keyExtractor={data => data.name}
            renderRow={data => {
              return (
                <ListItem
                  style={{ marginRight: 20 }}
                  button
                  onPress={() => { this.props.navigation.navigate(data.route) }}>
                  <Text style={{ fontFamily: "Graphik-Regular-App", fontSize: 18, lineHeight: 30, color: "#333333" }}>{data.name}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    )
  }
}


export default SideBar