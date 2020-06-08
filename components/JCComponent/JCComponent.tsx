
import * as React from 'react';
import MainStyles from '../../components/style';
import { Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';

export default class JCComponent<Props = any, State = any> extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        const user = Auth.currentAuthenticatedUser();
        this.state = { groups: null }
        user.then((user) => {
            this.setState({
                groups: user.signInUserSession.accessToken.payload["cognito:groups"]
            })

        })

    }
    isMemberOf(group: string): boolean {
        console.log(this.state.groups)
        if (this.state.groups)
            return this.state.groups.includes(group)
        else return false

    }
    groups = null
    styles = MainStyles.getInstance();
    componentDidMount(): void {
        Dimensions.addEventListener('change', this.styles.updateStyles(this))
    }
    componentWillUnmount(): void {
        Dimensions.removeEventListener("change", this.styles.updateStyles(this));
    }

}