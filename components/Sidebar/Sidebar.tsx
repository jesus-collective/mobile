import * as React from 'react';
import { Container, Content, List, ListItem, Header } from "native-base";
import { Text } from 'react-native'

const routes = [
  {
    name: "Home",
    route: "HomeScreen"
  },
  {
    name: "Explore",
    route: "ExploreScreen"
  },
  {
    name: "Support",
    route: "SupportScreen"
  },
  {
    name: "Get Involved",
    route: "GetInvolvedScreen"
  },
  {
    name: "Contact",
    route: "ContactScreen"
  },
  {
    name: "Kids and Youth",
    route: "KidsAndYouthScreen"
  },

  {
    name: "Events",
    route: "NewsScreen"
  },
  {
    name: "Groups",
    route: "NewsScreen"
  },
  {
    name: "Training",
    route: "NewsScreen"
  },
  {
    name: "Resources",
    route: "NewsScreen"
  },

  {
    name: "Profile",
    route: "ProfileScreen"
  },
  {
    name: "Group",
    route: "GroupScreen"
  },
  {
    name: "Event",
    route: "EventScreen"
  }

];
interface Props {
  navigation: any
}
interface State {

}
export default class SideBar extends React.Component<Props, State> {

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
                onPress={() => this.props.navigation.push(data.route)}>
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