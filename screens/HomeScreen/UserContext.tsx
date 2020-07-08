
import * as React from 'react';
export const UserContext = React.createContext({
    actions: {
        updateHasCompletedPersonalProfile: null,
        onPaidStateChanged: null
    }, state: null
})
