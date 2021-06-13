/* eslint-disable */
import { GraphQLResult } from "@aws-amplify/api/lib/types"
import Amplify, { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { Button, Text } from "native-base"
import React from "react"
import { GetResourceQuery, GetResourceSeriesQuery, UpdateResourceSeriesMutation } from "src/API"
import JCComponent from "../../components/JCComponent/JCComponent"
import awsmobile from "../../src/aws-exports"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"

Amplify.configure(awsmobile)

Amplify.configure(awsmobile)
const federated = {
  google_client_id: "",
  facebook_app_id: "579712102531269",
  amazon_client_id: "",
}

interface Props {
  authState?: any
}

const preschool = {
  Easter: "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2018/03/04-Easter-Series.png",
  Encouragement:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2018/04/06-Encouragement.jpg",
  Creation:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/08/Preschool-Series-Sept.png",
  Promises:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2016/10/Preschool-Series-Oct.png",
  Praise:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2018/05/07-Preschool-Praise.png",
  "Good News":
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2018/06/07-Good_News.jpg",
  Know: "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2016/11/Preschool-Series-Nov.png",
  Christmas:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2016/12/Preschool-Series-Dec.png",
  Family:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/01/Preschool-Series-Jan.png",
  Miracles:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/02/Preschool-Series-Feb.png",
  Serve:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/03/Preschool-Series-March.png",
  Community:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/05/Preschool-Series-May.png",
  Mission:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/06/Preschool-Series-June.png",
  "What Does Love Look Like?":
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/07/Preschool-Series-July.png",
  Live: "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/08/Preschool-Series-August.png",
  Beginnings:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/08/Preschool-Series-Sept2017.png",
  Listen:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/08/10-October-Series.png",
  Unafraid:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/10/11-November-Series.png",
  "King of Kings":
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/10/12-Dec-Series.png",
  "God's Love":
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/11/01-January-Series.png",
  Peace:
    "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2017/12/02-February-Series-1.png",
  Pray: "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2018/01/03-March-Series.png",
  Alive: "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2018/03/04-April-Series.png",
  Help: "http://kidsandyouth.themeetinghouse.com/wp-content/uploads/2018/03/05-May-Series.png",
}

class IndexApp extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  async getResources() {
    try {
      const getResource = (await API.graphql({
        query: queries.getResource,
        variables: { id: "b89126a4-4df8-4890-aca7-45bf857f03c7" },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<GetResourceQuery>
      getResource.data?.getResource?.series?.items?.forEach((item) => {
        this.getResourceSeries(item?.id)
      })
    } catch (e) {
      console.error(e)
    }
  }

  async getResourceSeries(id: string) {
    try {
      const getResourceSeries = (await API.graphql({
        query: queries.getResourceSeries,
        variables: { id: id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<GetResourceSeriesQuery>
      let temp = getResourceSeries.data?.getResourceSeries
      if (temp) {
        temp["playlistImage"] = preschool[temp?.title]
        delete temp["episodes"]
        delete temp["parentResource"]
        delete temp["createdAt"]
        delete temp["updatedAt"]
        this.updateResourceSeries(temp)
      }
    } catch (e) {
      console.error(e)
    }
  }

  async updateResourceSeries(data: any) {
    try {
      const updateResourceSeries = (await API.graphql({
        query: mutations.updateResourceSeries,
        variables: { input: data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<UpdateResourceSeriesMutation>
      console.log(updateResourceSeries)
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div>
        <Button
          onPress={() => {
            this.getResources()
          }}
        >
          <Text>PreSchool</Text>
        </Button>
      </div>
    )
  }
}
export default IndexApp
