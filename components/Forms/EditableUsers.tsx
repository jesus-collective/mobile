import { GraphQLResult } from "@aws-amplify/api/lib/types"
import React from "react"
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native"
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
  onAdd(/*userID: string*/ newUsers: any[]): Promise<boolean>
  onRemove(/*itemID: string*/ newUsers: any[]): Promise<boolean>
  testID?: any
}
export type SearchUser = NonNullable<
  NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]
>["items"][0]

async function autoCompleteUser(value: string): Promise<SearchUser[] | null | undefined> {
  let searchUsers
  try {
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

const UserBadge = ({ item, removeUser }: any) => {
  const { value, label } = item
  return (
    <View style={{ flexDirection: "row" }}>
      <ProfileImageNew
        user={value}
        style={ProfileImageStyle.UserXXSmall}
        type="user"
        quality={ProfileImageQuality.medium}
      />
      <Text style={{ marginLeft: 6, alignSelf: "center", flex: 1 }}>{label}</Text>
      <TouchableOpacity style={{ padding: 6 }} onPress={removeUser}>
        <Image
          style={{ width: 15, height: 15 }}
          source={require("../../assets/Facelift/svg/X.svg")}
        />
      </TouchableOpacity>
    </View>
  )
}
export type UserDropdownType = {
  label: string
  value: string
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

const ExpandIcon = ({ isLoading }: any) => {
  return isLoading ? (
    <ActivityIndicator color="grey" />
  ) : (
    <View style={{ borderRadius: 50, padding: 2, borderWidth: 1, borderColor: "lightgrey" }}>
      <Image
        style={{ width: 18, height: 18 }}
        source={require("../../assets/Facelift/svg/Plus.svg")}
      />
    </View>
  )
}
export function SearchUsers({
  users,
  limit,
  onAdd,
  onRemove,
}: {
  users: any[]
  limit?: number
  onAdd: Props["onAdd"]
  onRemove: Props["onRemove"]
}): JSX.Element {
  console.log({ users })
  const [searchOpen, setSearchOpen] = React.useState(false)
  const originalUsers = users.map((user) => {
    return generateDropdownItem({
      given_name: user?.user?.given_name ?? user?.given_name ?? user?.label,
      family_name: user?.user?.family_name ?? user?.family_name ?? user?.label,
      id: user?.userID ?? user?.id ?? user?.value,
    })
  })
  const [selectedUserIDS, setSelectedUserIDS] = React.useState<string[]>(
    originalUsers.map((user) => user?.value)
  )
  const [allUsers, setAllUsers] = React.useState<SearchUser[]>(users)
  const [items, setItems] = React.useState<UserDropdownType[]>(originalUsers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const debouncedSearchterm = useDebounce(searchTerm, 1000)
  React.useEffect(() => {
    if (debouncedSearchterm) {
      doSearch(debouncedSearchterm)
    }
  }, [debouncedSearchterm])
  React.useEffect(() => {
    if (!searchOpen) {
      setItems([])
    }
  }, [searchOpen])
  const doSearch = async (value: string) => {
    const newUsers = await autoCompleteUser(value)
    if (newUsers) {
      const usersForDropdown: UserDropdownType[] = newUsers.map((user) => {
        return generateDropdownItem(user)
      })
      setIsLoading(false)
      setAllUsers((prev) => [...prev, ...newUsers])
      setItems(usersForDropdown)
    }
  }

  const onSearchTermChange = (value: string) => {
    if (value) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    setSearchTerm(value)
  }
  return (
    <View style={{ zIndex: searchOpen ? 10000 + 1 : 10000 }}>
      <DropDownPicker
        style={{
          padding: 4,
          flexDirection: "column",
          maxHeight: 250,
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
        open={searchOpen}
        value={selectedUserIDS}
        multiple
        max={limit}
        renderBadgeItem={(item) => {
          return (
            <UserBadge
              removeUser={async () => {
                const userToRemove = users.find(
                  (a) => a?.userID === item.value || a?.id === item.value
                )
                if (userToRemove) {
                  const success = await onRemove(new Array(userToRemove))
                  if (!success) return
                  setSelectedUserIDS((prev) => prev.filter((id) => id !== item.value))
                }
              }}
              item={item}
            />
          )
        }}
        extendableBadgeContainer
        onClose={() => {
          setItems([])
        }}
        onSelectItem={async (items) => {
          if (limit && users.length >= limit) {
            console.log("Not work")
            return
          }
          if (selectedUserIDS && items.length > selectedUserIDS.length) {
            setSearchOpen(false)
            const newUser = items.filter((item) => {
              if (!item.value) return false
              return !selectedUserIDS.includes(item.value.toString())
            })
            if (newUser?.length) {
              const n1 = allUsers.find((a) => a?.id === newUser[0]?.value)
              const userData = [n1] ?? newUser
              console.log({ n1 }, { newUser })

              const success = await onAdd(userData)
              if (!success) {
                // On failure dropdown should remove newly added user
                setSelectedUserIDS((prev) => prev.filter((id) => id !== newUser[0]!.value))
              }

              console.log({ added: success })
            }
          } else if (selectedUserIDS && items.length < selectedUserIDS.length) {
            const removedUserID = selectedUserIDS.filter((val) => {
              return !items.find((item) => item?.value === val)
            })?.[0]
            console.log({ removedUserID })
            const removedUser = users.filter((user) => user.userID === removedUserID)
            if (removedUser?.length) {
              const success = await onRemove(removedUser)
              console.log({ removed: success })
              if (!success) {
                // setSelectedUserIDS((prev) => [...prev, removedUserID])
                // On failure dropdown should re-add users
              }
            }
          } else {
            // Users may have added users but number of users stayed the same.
            // This piece of code assumes removing/adding one user at a time
            // If this ever gets changed to allow for multiple additions, i.e. with a save button..
            // This condition can be triggered even though changes have been made if the number of users is the same.
          }
        }}
        arrowIconContainerStyle={{ alignItems: "flex-end", flex: 1, marginRight: 8 }}
        ArrowDownIconComponent={() => <ExpandIcon isLoading={isLoading} />}
        ArrowUpIconComponent={() => <ExpandIcon isLoading={isLoading} />}
        closeOnBackPressed
        mode="BADGE"
        dropDownContainerStyle={{ maxHeight: 200, zIndex: 5002 }}
        dropDownDirection="BOTTOM"
        showArrowIcon={true}
        selectedItemContainerStyle={{ backgroundColor: "lightgrey", flex: 1 }}
        placeholder="Add a user"
        searchPlaceholder="Type user's name here..."
        onChangeSearchText={onSearchTermChange}
        searchable={true}
        disableLocalSearch={true}
        items={items}
        setOpen={setSearchOpen}
        setValue={setSelectedUserIDS}
        setItems={setItems}
      />
    </View>
  )
}

export default function EditableUsers({
  textStyle,
  showProfileImages,
  isEditable,
  onAdd,
  onRemove,
  value,
}: Props) {
  if (isEditable) {
    return <SearchUsers onAdd={onAdd} onRemove={onRemove} users={value} />
  } else {
    return (
      <View>
        {value.map((item) => {
          return (
            <>
              {showProfileImages ? <ProfileImage size="small" user={item}></ProfileImage> : null}
              <Text style={textStyle}>
                {item.given_name} {item.family_name}
              </Text>
            </>
          )
        })}
      </View>
    )
  }
}
