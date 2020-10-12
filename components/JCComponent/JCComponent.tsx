
import * as React from 'react';
import MainStyles from '../../components/style';
import { Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';

export interface JCState {
    groups: any
    groupsLoaded: boolean
}
export default class JCComponent<Props = any, State extends JCState = any> extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = this.getInitialState()
        try {
            this.updateGroups()
        }
        catch (e) {
            console.log(e)
        }
    }
    componentDidMount(): void {
        Dimensions.addEventListener('change', () => { this.styles.updateStyles(this) })
    }
    protected getInitialState(): State {
        return { groups: null } as JCState as State;
    }
    updateGroups(): void {
        const user = Auth.currentAuthenticatedUser()
        user.then((user) => {
            this.setState({
                groups: user.signInUserSession.accessToken.payload["cognito:groups"],
                groupsLoaded: true
            })
        }).catch((e) => {
            this.setState({
                groupsLoaded: false
            })
        })
    }
    isMemberOf(group: string): boolean {
        if (this.state.groups)
            return this.state.groups.includes(group)
        else
            return false
    }
    groups = null
    styles = MainStyles.getInstance();
    componentWillUnmount(): void {
        Dimensions.removeEventListener("change", () => { this.styles.updateStyles(this) });
    }
}