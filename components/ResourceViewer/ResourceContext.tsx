import { JCState } from "components/JCComponent/JCComponent"
import * as React from "react"
import { CreateGroupInput, ResourceMenuItemType, ResourcePageItemInput } from "src/API"
import { GetResourceRootData, GroupData, PageItemIndex, UserData } from "src/types"
export interface ResourceState extends JCState {
  groupData: CreateGroupInput | GroupData | null | undefined
  resourceData: GetResourceRootData
  currentMenuItem: number
  currentResource: number | null
  currentSeries: number | null
  currentEpisode: number | null
  showMap: boolean
  loadId: string
  createNew: boolean
  canSave: boolean
  canLeave: boolean
  canJoin: boolean
  isEditable: boolean
  canDelete: boolean
  validationError: string
  currentUser: string | null
  currentUserProfile: UserData | null | undefined
  memberIDs: string[]
}
export type ResourceActions = {
  createPageItem(
    menuItemIndex: number,
    pageItemIndex: PageItemIndex,
    pageItem: ResourcePageItemInput
  ): Promise<void>
  updatePageItem(
    menuItemIndex: number,
    pageItemIndex: PageItemIndex,
    value: ResourcePageItemInput
  ): Promise<void>
  deletePageItem(menuItemIndex: number, pageItemIndex: PageItemIndex): Promise<void>

  createMenuItem(menuItemType: ResourceMenuItemType): Promise<void>
  changeMenuItem(menuItemIndex: number): void
  updateMenuItem(menuItemIndex: number, item: string, value: any): Promise<void>
  deleteMenuItem(menuItemIndex: number): Promise<void>

  createResource(): Promise<void>
  changeResource(index: number): void
  updateResource(index: number, item: string, value: any): Promise<void>
  deleteResource(index: number): Promise<void>
  updateResourceImage(menuItemIndex: number, pageItemIndex: PageItemIndex, e: any): Promise<void>
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
    createPageItem: async () => {},
    updatePageItem: async () => {},
    deletePageItem: async () => {},

    createMenuItem: async () => {},
    changeMenuItem: () => {},
    updateMenuItem: async () => {},
    deleteMenuItem: async () => {},
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
