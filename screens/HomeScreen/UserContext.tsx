import { JCState } from "components/JCComponent/JCComponent";
import * as React from "react";
export interface UserState extends JCState {
  hasCompletedPersonalProfile: string;
  hasPaidState: string;
  userExists: boolean;
  user: any;
  authState: any;
  hasCompletedOrganizationProfile: string;
  orgId: string;
  isOrg: boolean;
  initialAuthType: string | null;
  initialParams: {};
  idempotency: string;
  groups: string[];
  groupsLoaded: boolean;
}
export interface UserActions {
  updateHasCompletedPersonalProfile(): void | null;
  updatePaidState(): void | null;
  updateHasCompletedOrganizationProfile(): void | null;
  onStateChange(state: string, data: any): any | null;
  updateGroups(): Promise<void> | null;
  isMemberOf(group: string): boolean;
}
type UserContextType = {
  userActions: UserActions;
  userState: UserState | undefined;
};
export const UserContext = React.createContext<UserContextType>({
  userActions: {
    updateHasCompletedPersonalProfile: () => {},
    updatePaidState: () => {},
    updateHasCompletedOrganizationProfile: () => {},
    onStateChange: () => {},
    updateGroups: async () => {},
    isMemberOf: () => {
      return false;
    },
  },
  userState: undefined,
});
