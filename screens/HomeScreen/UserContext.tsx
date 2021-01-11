import { JCState } from "components/JCComponent/JCComponent"
import * as React from "react"
import { AuthStateData } from "src/types"

export interface UserState extends JCState {
  hasCompletedPersonalProfile: string
  hasPaidState: string
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
  updateHasCompletedPersonalProfile(): void | null
  updatePaidState(): void | null
  updateHasCompletedOrganizationProfile(): void | null
  onStateChange(state: string, data: AuthStateData): Promise<any> | null
  updateGroups(): Promise<void> | null
  isMemberOf(group: string): boolean
}
type UserContextType = {
  userActions: UserActions
  userState: UserState | undefined
}
export const UserContext = React.createContext<UserContextType>({
  userActions: {
    onSetUser: () => {},
    updateHasCompletedPersonalProfile: () => {},
    updatePaidState: () => {},
    updateHasCompletedOrganizationProfile: () => {},
    onStateChange: async () => {},
    updateGroups: async () => {},
    isMemberOf: () => {
      return false
    },
  },
  userState: undefined,
})
