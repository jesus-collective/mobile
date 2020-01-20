import * as React from 'react';
import { Container, Content, Text, List, ListItem, Header } from "native-base";
import {  NavigationScreenProp } from 'react-navigation';


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
  }
];
interface Props {
  navigation: NavigationScreenProp<any, any>
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
          renderRow={data => {
            return (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}>
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