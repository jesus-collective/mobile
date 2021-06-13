import * as React from "react"
import { JCState } from "../../components/JCComponent/JCComponent"
import { AuthStateData } from "../../src/types"

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
  initialParams: any
  idempotency: string
  groups: string[] | null
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
  isReady(): boolean
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
    onSetUser: () => null,
    updateHasCompletedPersonalProfile: async () => {
      return
    },
    recheckUserState: async () => {
      return
    },
    updateHasCompletedOrganizationProfile: async () => {
      return
    },
    onStateChange: async () => null,
    updateGroups: async () => {
      return
    },
    isReady: () => {
      return false
    },
    isMemberOf: () => {
      return false
    },
  },
  userState: undefined,
})
