import { GraphQLResult } from "@aws-amplify/api/lib/types"
import React from "react"
import { ActivityIndicator, Text, View } from "react-native"
//import Chips, { Chip } from "react-chips"
import DropDownPicker from "react-native-dropdown-picker"
import { Data } from "../../components/Data/Data"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../../components/ProfileImage/ProfileImageNew"
import { useDebounce } from "../../screens/AdminCRMScreen/AdminCRMScreen"
import { SearchableUserFilterInput, SearchUsersQuery } from "../../src/API"
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
  onChange(value: SearchUser | SearchUser[]): void
  testID?: any
}
export type SearchUser = NonNullable<
  NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]
>["items"][0]
async function autoCompleteUser(value: string): Promise<SearchUser[] | null | undefined> {
  let searchUsers
  try {
    console.log({ value })
    const name = value?.split(" ")
    const firstName = name[0]
    const lastName = name[1]
    const searchTerms: SearchableUserFilterInput[] = [
      { given_name: { wildcard: value.toLowerCase() + "*" } },
      { family_name: { wildcard: value.toLowerCase() + "*" } },
    ]
    if (firstName && lastName) {
      searchTerms.push({
        and: [
          {
            given_name: { wildcard: firstName.toLowerCase() + "*" },
          },
          {
            family_name: { wildcard: lastName.toLowerCase() + "*" },
          },
        ],
      })
    }
    searchUsers = await Data.searchUsers({
      or: searchTerms,
    })
    return searchUsers.data?.searchUsers?.items
  } catch (e: any) {
    console.log({ Error: e })
    return e.data.searchUsers.items
  }
}
export type UserDropdownType = {
  label: string
  value: any
  icon: () => JSX.Element
}
const generateDropdownItem = (user: any) => {
  return {
    label: user?.given_name + " " + user?.family_name,
    value: user?.id,
    icon: () => (
      <ProfileImageNew
        user={user?.id}
        style={ProfileImageStyle.UserXXSmall}
        type="user"
        quality={ProfileImageQuality.medium}
      />
    ),
  }
}
export function SearchUsers({
  users,
  limit,
  onChange,
}: {
  users: any[]
  limit?: number
  onChange: Props["onChange"]
}): JSX.Element {
  console.log({ users })
  const [open, setOpen] = React.useState(false)
  const originalUsers = users.map((user) => {
    console.log({ user })

    return generateDropdownItem({
      given_name: user?.user?.given_name ?? user?.given_name,
      family_name: user?.user?.family_name ?? user?.family_name,
      id: user?.userID ?? user?.id,
    })
  })
  console.log({ originalUsers }, { users })
  const [value, setValue] = React.useState<string[] | null>(
    originalUsers.map((user) => user?.value)
  )
  const [items, setItems] = React.useState<UserDropdownType[]>(originalUsers)
  const [userDataArchive, setUserDataArchive] = React.useState<SearchUser[]>(users)
  const [userArchive, setUserArchive] = React.useState<UserDropdownType[]>(originalUsers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const debouncedSearchterm = useDebounce(searchTerm, 1000)
  React.useEffect(() => {
    if (debouncedSearchterm) {
      doSearch(debouncedSearchterm)
    }
  }, [debouncedSearchterm])

  const doSearch = async (value: string) => {
    const newUsers = await autoCompleteUser(value)
    if (newUsers) {
      const usersForDropdown: UserDropdownType[] = newUsers.map((user) => {
        return generateDropdownItem(user)
      })
      setIsLoading(false)
      setUserDataArchive((prev) => [...prev, ...newUsers])
      setUserArchive((prev) => [...prev, ...usersForDropdown])
      setItems(usersForDropdown)
    }
  }

  const onSearchTermChange = (value: string) => {
    setIsLoading(true)
    setSearchTerm(value)
  }
  return (
    <DropDownPicker
      style={{
        padding: 4,
        flexDirection: "row",
        maxHeight: 300,
        overflow: "scroll",
        flex: 1,
      }}
      listItemContainerStyle={{
        flexDirection: "row",
        padding: 4,
        flex: 1,
      }}
      listItemLabelStyle={{ alignSelf: "center", marginLeft: 6, flex: 1 }}
      selectedItemLabelStyle={{ flex: 1 }}
      open={open}
      onClose={async () => {
        let newArr: UserDropdownType[] = []

        if (value?.length) {
          for (const i of value) {
            const newItem = [...userArchive, ...originalUsers].find((old) => old.value === i)
            if (newItem) newArr.push(newItem)
          }
        } else {
          newArr = []
        }

        const newExcludingOld = newArr.filter(
          (newItem) => !originalUsers.find((originalUser) => originalUser.value === newItem.value)
        )

        const newUsers: string[] = Array.from(new Set(newExcludingOld.map((a) => a.value)))
        console.log({ newUsers })
        const a = userDataArchive.filter((userFromArchive) =>
          Boolean(newUsers.find((newUser) => newUser === userFromArchive?.id))
        )
        // add each new user here
        if (newUsers.length) onChange(a)

        //onChange(a[0])

        setItems(newArr)
      }}
      value={value}
      multiple
      max={limit}
      renderBadgeItem={({ value, label }: { value: string; label: string }) => {
        return (
          <View style={{ flexDirection: "row" }}>
            <ProfileImageNew
              user={value}
              style={ProfileImageStyle.UserXXSmall}
              type="user"
              quality={ProfileImageQuality.medium}
            />
            <Text style={{ marginLeft: 6, alignSelf: "center", flex: 1 }}>{label}</Text>
          </View>
        )
      }}
      extendableBadgeContainer
      arrowIconContainerStyle={{ marginTop: 6, alignItems: "flex-end", flex: 1 }}
      ArrowDownIconComponent={isLoading ? () => <ActivityIndicator color="lightgrey" /> : undefined}
      ArrowUpIconComponent={isLoading ? () => <ActivityIndicator color="lightgrey" /> : undefined}
      closeOnBackPressed
      mode="BADGE"
      dropDownContainerStyle={{ maxHeight: 250 }}
      dropDownDirection="BOTTOM"
      showArrowIcon={true}
      selectedItemContainerStyle={{ backgroundColor: "lightgrey", flex: 1 }}
      placeholder="Add a user"
      searchPlaceholder="Type user's name here..."
      onChangeSearchText={onSearchTermChange}
      searchable={true}
      disableLocalSearch={true}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  )
}
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
  render(): React.ReactNode {
    console.log(this.props)
    console.log(this.state)
    if (this.props.isEditable) {
      return <SearchUsers onChange={this.props.onChange} users={this.props.value} />
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
