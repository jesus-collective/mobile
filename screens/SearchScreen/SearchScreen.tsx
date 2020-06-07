import React from 'react';
import { StyleProvider, Container, Content } from 'native-base';
import { Text } from 'react-native'

import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { API } from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import JCComponent from '../../components/JCComponent/JCComponent';


interface Props {
  navigation: any
}
interface State {
  showMap: boolean
  data: any
}



export default class GroupScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      showMap: false,
      data: []
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  search(item) {
    console.log(item.target.value)
    const searchGroups: any = API.graphql({
      query: queries.searchGroups,
      variables: { filter: { name: { match: item.target.value } } }
    });

    searchGroups.then((json) => {
      // console.log(json)
      this.setState({ data: json.data.searchGroups.items })
    }).catch((e: any) => {
      console.log(e)
    }

    );

  }
  render() {
    console.log("SearchScreen")
    return <StyleProvider style={getTheme(material)}>
      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <Content>
          <MyMap type={"no-filters"} visible={this.state.showMap} mapData={[]}></MyMap>
          <Container>
            <input onChange={(item: any) => { this.search(item) }} placeholder="Search..."></input>
            <Text>Results:</Text>
            {this.state.data.map((item: any) => {
              return (
                <Text key={item.id}>{item.name}</Text>
              )
            })}
          </Container>
        </Content>
      </Container>
    </StyleProvider>

  }
}
