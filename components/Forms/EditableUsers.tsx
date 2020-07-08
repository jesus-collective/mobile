import React, { Component } from 'react';
import Chips, { Chip } from 'react-chips'
import * as queries from '../../src/graphql/queries';
import { API } from 'aws-amplify';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { Text } from 'react-native'
import JCComponent, { JCState } from '../JCComponent/JCComponent';
import ProfileImage from '../../components/ProfileImage/ProfileImage'

interface Props {
    value: any[],
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    multiline: boolean,
    placeholder?: string,
    placeholderTextColor?: string,
    listOfSuggestedUsers?: string[],
    showProfileImages: boolean,
    onChange?(value: any[]): void,
    "data-testid"?: any,
}
interface UserProps {
    children: any
    showProfileImages: boolean
}
interface UserState {

}
class UserChip extends Component<UserProps, UserState>{
    constructor(props: UserProps) {
        super(props);
    }
    render() {
        return (
            <Text>{this.props.children}</Text>
        )
    }
}
export default class EditableText extends JCComponent<Props> {
    constructor(props: Props) {
        super(props);

        this.state = {
            ... super.getInitialState()
        }

    }
    onChanged(val: any[]): void {
        console.log(val)
        this.props.onChange(val)
    }
    async autoCompleteUser(value: string): Promise<any[]> {
        let searchUsers: any
        try {
            searchUsers = await API.graphql({
                query: queries.searchUsers,
                variables: {
                    filter: {
                        or: [
                            { given_name: { wildcard: value.toLowerCase() + "*" } },
                            { family_name: { wildcard: value.toLowerCase() + "*" } }
                        ]
                    },
                    limit: 10
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            })
            console.log({ searchUsers: searchUsers })
            return searchUsers.data.searchUsers.items
        }
        catch (e) {
            console.log({ error: e })
            return e.data.searchUsers.items
        }

    }
    render(): React.ReactNode {


        if (this.props.isEditable)
            return (
                <Chips
                    fromSuggestionsOnly={true}
                    uniqueChips={true}
                    value={this.props.value}
                    onChange={(val: any[]) => { this.onChanged(val) }}
                    renderChip={(value) => {
                        return (
                            <Chip>
                                <span>
                                    {this.props.showProfileImages ? <ProfileImage size="xsmall" user={value}></ProfileImage> : null}
                                    <Text>{value.given_name} {value.family_name}</Text>
                                </span>
                            </Chip>
                        )
                    }}
                    placeholder={this.props.placeholder}
                    fetchSuggestions={
                        this.props.listOfSuggestedUsers ?
                            null :
                            (value: string) => {
                                return this.autoCompleteUser(value)
                            }
                    }
                    suggestions={this.props.listOfSuggestedUsers ? this.props.listOfSuggestedUsers : null}
                    renderSuggestion={(value) => {
                        return (
                            <Text>
                                {this.props.showProfileImages ? <ProfileImage size="xsmall" user={value}></ProfileImage> : null}
                                {value.given_name} {value.family_name}
                            </Text>
                        )
                    }}
                />
            )
        else
            return <div>{
                this.props.value.map((item) => {
                    { this.props.showProfileImages ? <ProfileImage size="small" user={item}></ProfileImage> : null }
                    <Text style={this.props.textStyle}>{item.given_name} {item.family_name}</Text>
                })
            }
            </div>
    }
}