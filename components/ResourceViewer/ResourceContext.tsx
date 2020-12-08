import { JCState } from "components/JCComponent/JCComponent"
import * as React from "react"
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
export type ResourceActions = {
  createResource(): Promise<void>
  changeResource(index: number): void
  updateResource(index: number, item: string, value: any): Promise<void>
  deleteResource(index: number): Promise<void>
  updateResourceImage(index1: number, e: any): Promise<void>
  changeSeries(index: number): void
  createSeries(): Promise<void>
  deleteSeries(resourceIndex: number, seriesIndex: number): Promise<void>
  updateSeries(
    resourceIndex: number,
    seriesIndex: number,
    item: string,
    value: string
  ): Promise<void>
  createEpisode(): Promise<void>
  deleteEpisode(resourceIndex: number, seriesIndex: number, episodeIndex: number): Promise<void>
  updateEpisode(
    resourceIndex: number,
    seriesIndex: number,
    episodeIndex: number,
    item: string,
    value: string
  ): Promise<void>
  clearSeries(): void
  clearEpisode(): void
  changeEpisode(index: number): void
  mapChanged(): void
  validateGroup(): boolean
  createGroup(): void
  saveGroup(): void
  leaveGroup(): void
  joinGroup(): void
  deleteGroup(): void
  showProfile(id: string): void
  updateValueGroup(field: string, value: any): void
}
type ResourceContextType = {
  resourceActions: ResourceActions
  resourceState: ResourceState | undefined
}
export const ResourceContext = React.createContext<ResourceContextType>({
  resourceActions: {
    createResource: async () => {},
    changeResource: () => {},
    updateResource: async () => {},
    deleteResource: async () => {},
    updateResourceImage: async () => {},
    changeSeries: () => {},
    createSeries: async () => {},
    deleteSeries: async () => {},
    updateSeries: async () => {},
    createEpisode: async () => {},
    deleteEpisode: async () => {},
    updateEpisode: async () => {},
    clearSeries: () => {},
    clearEpisode: () => {},
    changeEpisode: () => {},
    mapChanged: () => {},
    validateGroup: () => {
      return false
    },
    createGroup: () => {},
    saveGroup: () => {},
    leaveGroup: () => {},
    joinGroup: () => {},
    deleteGroup: () => {},
    showProfile: () => {},
    updateValueGroup: () => {},
  },
  resourceState: undefined,
})
