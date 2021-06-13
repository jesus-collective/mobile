import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API } from "aws-amplify"
import { Container, Content, StyleProvider } from "native-base"
import React from "react"
import { Text } from "react-native"
import { SearchGroupsQuery } from "src/API"
import Header from "../../components/Header/Header"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyMap from "../../components/MyMap/MyMap"
import getTheme from "../../native-base-theme/components"
import material from "../../native-base-theme/variables/material"
import * as queries from "../../src/graphql/queries"

interface Props {
  navigation: any
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
    const searchGroups = API.graphql({
      query: queries.searchGroups,
      variables: { filter: { name: { match: item.target.value } } },
    }) as Promise<GraphQLResult<SearchGroupsQuery>>

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
        <Container>
          <Header
            title="Jesus Collective"
            navigation={this.props.navigation}
            onMapChange={this.mapChanged}
          />
          <Content>
            <MyMap type={"no-filters"} visible={this.state.showMap} mapData={[]}></MyMap>
            <Container>
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
            </Container>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}
