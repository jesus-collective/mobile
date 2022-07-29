import { StackNavigationProp } from "@react-navigation/stack"
import { StyleProvider } from "native-base"
import React from "react"
import { ScrollView, Text, View } from "react-native"
import { Data } from "../../components/Data/Data"
import Header from "../../components/Header/Header"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyMap from "../../components/MyMap/MyMap"
import getTheme from "../../native-base-theme/components"
import material from "../../native-base-theme/variables/material"

interface Props {
  navigation: StackNavigationProp<any, any>
}
interface State extends JCState {
  showMap: boolean
  data: any
}

export default class GroupScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      showMap: false,
      data: [],
    }
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  search(item: React.ChangeEvent<HTMLInputElement>): void {
    console.log(item.target.value)
    const searchGroups = Data.searchGroups({ name: { match: item.target.value } })

    searchGroups
      .then((json) => {
        // console.log(json)
        this.setState({ data: json.data?.searchGroups?.items })
      })
      .catch((e: any) => {
        console.log(e)
      })
  }
  render(): React.ReactNode {
    console.log("SearchScreen")
    return (
      <StyleProvider style={getTheme(material)}>
        <View>
          <Header
            title="Jesus Collective"
            navigation={this.props.navigation}
            onMapChange={this.mapChanged}
          />
          <ScrollView>
            <MyMap type={"no-filters"} visible={this.state.showMap} mapData={[]}></MyMap>
            <View>
              <input
                onChange={(item) => {
                  this.search(item)
                }}
                placeholder="Search..."
              ></input>
              <Text>Results:</Text>
              {this.state.data.map((item: any) => {
                return <Text key={item.id}>{item.name}</Text>
              })}
            </View>
          </ScrollView>
        </View>
      </StyleProvider>
    )
  }
}
