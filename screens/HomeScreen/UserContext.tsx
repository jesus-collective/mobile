import { JCState } from "components/JCComponent/JCComponent"
import * as React from "react"
import { AuthStateData } from "src/types"

export interface UserState extends JCState {
  hasCompletedPersonalProfile: ProfileStatus
  hasPaidState: PaidStatus
  userExists: boolean
  user: any
  authState: any
  hasCompletedOrganizationProfile: string
  orgId: string
  isOrg: boolean
  initialAuthType: string | null
  initialParams: {}
  idempotency: string
  groups: string[]
  groupsLoaded: boolean
}
export interface UserActions {
  onSetUser(user: any): void
  updateHasCompletedPersonalProfile(): Promise<void> | null
  recheckUserState(): Promise<void>
  updateHasCompletedOrganizationProfile(): Promise<void> | null
  onStateChange(state: string, data: AuthStateData): Promise<any> | null
  updateGroups(): Promise<void> | null
  isMemberOf(group: string): boolean
}
export enum ProfileStatus {
  Completed,
  Incomplete,
  Unknown,
}
export enum PaidStatus {
  Success,
  InProgress,
  PermissionNotGranted,
  MissingCustomer,
  Problem2,
  Unknown,
}
type UserContextType = {
  userActions: UserActions
  userState: UserState | undefined
}
export const UserContext = React.createContext<UserContextType>({
  userActions: {
    onSetUser: () => {},
    updateHasCompletedPersonalProfile: async () => {},
    recheckUserState: async () => {},
    updateHasCompletedOrganizationProfile: async () => {},
    onStateChange: async () => {},
    updateGroups: async () => {},
    isMemberOf: () => {
      return false
    },
  },
  userState: undefined,
})
