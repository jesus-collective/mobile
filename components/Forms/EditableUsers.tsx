import React, { Component } from 'react';
import Chips, { Chip } from 'react-chips'

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
        //TODO: Get users from DB
        return [
            { name: "George", id: "000" },
            { name: "Dave", id: "001" },
            { name: "Jon", id: "002" }
        ]
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
                                    {this.props.showProfileImages ? <ProfileImage size="xsmall" user={value.id}></ProfileImage> : null}
                                    <Text>{value.name}</Text>
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
                                {this.props.showProfileImages ? <ProfileImage size="xsmall" user={value.id}></ProfileImage> : null}
                                {value.name}
                            </Text>
                        )
                    }}
                />
            )
        else
            return <div>{
                this.props.value.map((item) => {
                    { this.props.showProfileImages ? <ProfileImage size="small" user={item.id}></ProfileImage> : null }
                    <Text style={this.props.textStyle}>{item.name}</Text>
                })
            }
            </div>
    }
}