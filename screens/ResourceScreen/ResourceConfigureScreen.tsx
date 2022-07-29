import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { View } from "react-native"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyMap from "../../components/MyMap/MyMap"
import ResourceViewer from "../../components/ResourceViewer/ResourceViewer"

interface Props {
  navigation?: StackNavigationProp<any, any>
  route?: any
}
interface State extends JCState {
  showMap: boolean
}

class ResourceScreenImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      showMap: false,
    }
  }

  render(): React.ReactNode {
    //console.log(this.state)
    console.log("ResourceConfigureScreen")

    return (
      <View>
        <MyMap type={"no-filters"} mapData={[]} visible={this.state.showMap}></MyMap>
        <ResourceViewer
          navigation={this.props.navigation}
          groupId={this.props.route.params.id}
          showConfig={"config"}
        ></ResourceViewer>
      </View>
    )
  }
}

export default function ResourceScreen(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return <ResourceScreenImpl {...props} navigation={navigation} route={route} />
}
