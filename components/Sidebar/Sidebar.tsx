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
      <Container><Content>
        <Header></Header>
        <List
          dataArray={routes}
          keyExtractor={data => data.name}
          renderRow={data => {
            return (
              <ListItem
                button
                onPress={() => this.props.navigation.push(data.route)}>
                <Text>{data.name}</Text>
              </ListItem>
            );
          }}
        />
      </Content>
      </Container>
    )
  }
}