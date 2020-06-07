import React from 'react';
import { StyleProvider, Container } from 'native-base';


import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import ResourceViewer from '../../components/ResourceViewer/ResourceViewer'
import ImportKidsAndYouth from './ImportKidsandYouth'
import { useNavigation, useRoute } from '@react-navigation/native';
import JCComponent from '../../components/JCComponent/JCComponent';

interface Props {
  navigation: any
  route: any
}
interface State {
  showMap: boolean

}



class ResourceScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = { showMap: false }


  }

  render() {
    //console.log(this.state)
    console.log("ResourceScreen")

    return (

      <StyleProvider style={getTheme(material)}>
        <Container >
          <Header title="Jesus Collective" navigation={this.props.navigation} />
          <MyMap navigation={this.props.navigation} visible={this.state.showMap}></MyMap>
          <ResourceViewer navigation={this.props.navigation} groupId={this.props.route.params.id}></ResourceViewer>
          <ImportKidsAndYouth></ImportKidsAndYouth>
        </Container>
      </StyleProvider>


    );
  }
}

export default function (props: Props) {
  const route = useRoute();
  const navigation = useNavigation()
  return <ResourceScreen {...props} navigation={navigation} route={route} />;
}
