
import { JCState } from 'components/JCComponent/JCComponent';
import * as React from 'react';
export interface ResourceState extends JCState {
    groupData: any
    resourceData: any
    currentResource: number
    currentSeries: number
    currentEpisode: number
    showMap: boolean
    loadId: string
    createNew: boolean
    canSave: boolean
    canLeave: boolean
    canJoin: boolean
    isEditable: boolean
    canDelete: boolean
    validationError: string
    currentUser: string
    currentUserProfile: any
    memberIDs: string[]
}
type ResourceContextType = {
    actions: any,
    state: ResourceState | undefined
}
export const ResourceContext = React.createContext<ResourceContextType>({
    actions: {
        createResource: null,
        changeResource: null,
        updateResource: null,
        deleteResource: null,
        updateResourceImage: null,
        changeSeries: null,
        createSeries: null,
        deleteSeries: null,
        updateSeries: null,
        createEpisode: null,
        deleteEpisode: null,
        updateEpisode: null,
        clearSeries: null,
        clearEpisode: null,
        changeEpisode: null,
        mapChanged: null,
        validateGroup: null,
        createGroup: null,
        saveGroup: null,
        leaveGroup: null,
        joinGroup: null,
        deleteGroup: null,
        showProfile: null,
        updateValueGroup: null


    }, state: undefined
})
