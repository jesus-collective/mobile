import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import React from "react"
import Chips, { Chip } from "react-chips"
import { Text } from "react-native"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { SearchUsersQuery } from "../../src/API"
import * as queries from "../../src/graphql/queries"
import JCComponent from "../JCComponent/JCComponent"

interface Props {
  value: any[]
  isEditable: boolean
  textStyle: any
  inputStyle?: any
  multiline: boolean
  placeholder?: string
  limit?: number
  placeholderTextColor?: string
  listOfSuggestedUsers?: string[]
  showProfileImages: boolean
  onChange?(
    value: NonNullable<
      NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]
    >["items"][]
  ): void
  testID?: any
}

/*class UserChip extends Component<UserProps> {
  constructor(props: UserProps) {
    super(props)
  }
  render() {
    return <Text>{this.props.children}</Text>
  }
}*/
export default class EditableText extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
    }
  }
  onChanged(
    val: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"][]
  ): void {
    if (this.props.limit) if (val.length > this.props.limit) val.slice(0, this.props.limit)
    if (this.props.onChange) this.props.onChange(val)
  }
  async autoCompleteUser(
    value: string
  ): Promise<
    | NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
    | null
    | undefined
  > {
    let searchUsers
    try {
      searchUsers = (await API.graphql({
        query: queries.searchUsers,
        variables: {
          filter: {
            or: [
              { given_name: { wildcard: value.toLowerCase() + "*" } },
              { family_name: { wildcard: value.toLowerCase() + "*" } },
            ],
          },
          limit: 10,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<SearchUsersQuery>
      return searchUsers.data?.searchUsers?.items
    } catch (e: any) {
      console.log({ Error: e })
      return e.data.searchUsers.items
    }
  }
  render(): React.ReactNode {
    if (this.props.isEditable) {
      return (
        <Chips
          fromSuggestionsOnly={true}
          uniqueChips={true}
          value={this.props.value ? this.props.value : []}
          onChange={(
            val: NonNullable<
              NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]
            >["items"][]
          ) => {
            this.onChanged(val)
          }}
          renderChip={(
            value: NonNullable<
              NonNullable<
                NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]
              >["items"]
            >[0]
          ) => {
            return (
              <Chip>
                <span>
                  {this.props.showProfileImages ? (
                    <ProfileImage size="xsmall" user={value}></ProfileImage>
                  ) : null}
                  <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: "Graphik-Bold-App" }}>
                    {value?.given_name} {value?.family_name}
                  </Text>
                </span>
              </Chip>
            )
          }}
          placeholder={this.props.placeholder}
          fetchSuggestions={
            this.props.listOfSuggestedUsers
              ? null
              : (value: string) => {
                  return this.autoCompleteUser(value)
                }
          }
          suggestions={this.props.listOfSuggestedUsers ? this.props.listOfSuggestedUsers : null}
          renderSuggestion={(
            value: NonNullable<
              NonNullable<
                NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]
              >["items"]
            >[0]
          ) => {
            return (
              <Text>
                {this.props.showProfileImages ? (
                  <ProfileImage size="xsmall" user={value}></ProfileImage>
                ) : null}
                {value?.given_name} {value?.family_name}
              </Text>
            )
          }}
        />
      )
    } else
      return (
        <div>
          {this.props.value.map((item) => {
            return (
              <>
                {this.props.showProfileImages ? (
                  <ProfileImage size="small" user={item}></ProfileImage>
                ) : null}
                <Text style={this.props.textStyle}>
                  {item.given_name} {item.family_name}
                </Text>
              </>
            )
          })}
        </div>
      )
  }
}
