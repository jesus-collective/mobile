
import { JCState } from 'components/JCComponent/JCComponent';
import * as React from 'react';
export interface UserState extends JCState {
    hasCompletedPersonalProfile: string;
    hasPaidState: string;
    userExists: boolean;
    user: any;
    authState: any;
    hasCompletedOrganizationProfile: string;
    orgId: string;
    isOrg: boolean;
}
type UserContextType = {
    actions: any
    state: UserState | undefined
}
export const UserContext = React.createContext<UserContextType>({
    actions: {
        updateHasCompletedPersonalProfile: null,
        onPaidStateChanged: null,
        updateHasCompletedOrganizationProfile: null,
        onStateChange: null
    }, state: null
})
