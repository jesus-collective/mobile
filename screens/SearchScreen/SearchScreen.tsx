import React from 'react';
import { StyleProvider, Container, Content, Text, Button } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import EditableText from '../../components/Editable/EditableText'
import Validate from '../../components/Validate/Validate'
import { Image } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';


interface Props {
  navigation: any
}
interface State {
  showMap: boolean
  data: any
}



export default class GroupScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      showMap: false,
      data:[]
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  search(item) {
    console.log(item.target.value)
    var searchGroups: any = API.graphql({
      query: queries.searchGroups,
      variables: { filter: { name: { match: item.target.value } } }
    });

    searchGroups.then((json) => {
      console.log(json)
      this.setState({ data: json.data.searchGroups.items })
    }).catch((e:any) => {
      console.log(e)
    }

    );

  }
  render() {
    console.log("SearchScreen")
    return <StyleProvider style={getTheme(material)}>
      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <MyMap navigation={this.props.navigation} visible={this.state.showMap}></MyMap>
        <Content>
          <Container>
            <input onChange={(item: any) => { this.search(item) }} placeholder="Search..."></input>
            <Text>Results:</Text>
            {this.state.data.map((item:any) => {
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
