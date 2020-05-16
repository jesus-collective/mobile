import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify';
import awsconfig from '../../src/aws-exports';

Amplify.configure(awsconfig);

export default class TestHelper {
    constructor() {

    }

    static async DeleteUser(user, password) {
        console.log("hello2")

        return Auth.signIn(user, password).then(() => {
            return Auth.currentAuthenticatedUser().then((user) => {
                const delStat = user.deleteUser()
                console.log(delStat)
                return delStat
            }).catch((e) => {
                console.log(e);
            })
        }).catch((e) => { console.log(e) })


    }
}