import React from 'react';
import { StyleProvider, Container } from 'native-base';


import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import ResourceViewer from '../../components/ResourceViewer/ResourceViewer'
//import ImportKidsAndYouth from './ImportKidsandYouth'
import { useNavigation, useRoute } from '@react-navigation/native';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';

interface Props {
  navigation?: any
  route?: any
}
interface State extends JCState {
  showMap: boolean

}



class ResourceScreenImpl extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      ...this.getInitialState(),
      showMap: false
    }


  }

  render(): React.ReactNode {
    //console.log(this.state)
    console.log("ResourceScreen")

    return (

      <StyleProvider style={getTheme(material)}>
        <Container >
          <Header title="Jesus Collective" navigation={this.props.navigation} />
          <MyMap type={'no-filters'} mapData={[]} visible={this.state.showMap}></MyMap>
          <ResourceViewer navigation={this.props.navigation} groupId={this.props.route.params.id}></ResourceViewer>

        </Container>
      </StyleProvider>


    );
  }
}

export default function ResourceScreen(props: Props): JSX.Element {
  const route = useRoute();
  const navigation = useNavigation()
  return <ResourceScreenImpl {...props} navigation={navigation} route={route} />;
}
