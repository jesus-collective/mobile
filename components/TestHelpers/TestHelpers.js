import React from "react";
import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import { API } from 'aws-amplify';
import * as mutations from '../../src/graphql/mutations.ts';
import * as queries from '../../src/graphql/queries.ts';
//import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
Amplify.configure(awsconfig);

export default class TestHelper {
    constructor() {

    }

    static async DeleteUser(user, password) {
        console.log("hello2")
        return Auth.signIn(user, password).then(() => {
            return Auth.currentAuthenticatedUser().then((user) => {

                return API.graphql({
                    query: queries.getUser,
                    variables: { id: user['username'] },

                    authMode: "AMAZON_COGNITO_USER_POOLS"
                }).then((json) => {
                    console.log(json)
                    return API.graphql({
                        query: mutations.deleteUser,
                        variables: {
                            input: { id: user['username'], _version: json.data.getUser._version }
                        },
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    }).then((c) => {
                        console.log(c)
                        const delStat = user.deleteUser()
                        console.log(delStat)
                        return delStat
                    }).catch((e) => {
                        console.log(e)
                        const delStat = user.deleteUser()
                        console.log(delStat)
                        return delStat
                    })
                }).catch((e) => {
                    console.log(e)
                    const delStat = user.deleteUser()
                    console.log(delStat)
                    return delStat
                })



            }).catch((e) => {
                console.log(e);
            })
        }).catch((e) => { console.log(e) })


    }
}