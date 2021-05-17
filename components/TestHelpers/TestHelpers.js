import Amplify, { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import awsconfig from "../../src/aws-exports"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"

//import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
Amplify.configure(awsconfig)

export default class TestHelper {
  static async DeleteUser(user, password) {
    console.log("hello2")
    return Auth.signIn(user, password)
      .then(() => {
        return Auth.currentAuthenticatedUser()
          .then((user) => {
            return API.graphql({
              query: queries.getUser,
              variables: { id: user["username"] },

              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })
              .then((json) => {
                console.log(json)
                return API.graphql({
                  query: mutations.deleteUser,
                  variables: {
                    input: { id: user["username"], _version: json.data.getUser._version },
                  },
                  authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                })
                  .then((c) => {
                    console.log(c)
                    const delStat = user.deleteUser()
                    console.log(delStat)
                    return delStat
                  })
                  .catch((e) => {
                    console.log(e)
                    const delStat = user.deleteUser()
                    console.log(delStat)
                    return delStat
                  })
              })
              .catch((e) => {
                console.log(e)
                const delStat = user.deleteUser()
                console.log(delStat)
                return delStat
              })
          })
          .catch((e) => {
            console.log(e)
          })
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
