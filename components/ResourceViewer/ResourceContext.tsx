/* eslint-disable @typescript-eslint/no-empty-function */
import { JCState } from "components/JCComponent/JCComponent"
import * as React from "react"
import {
  GetResourceData,
  GetResourceEpisodeData,
  GetResourceRootDataCustom,
  GetResourceSeriesData,
  GroupData,
  PageItemIndex,
  UserData,
} from "src/types"
import {
  CreateGroupInput,
  ResourceMenuItemType,
  ResourcePageItemInput,
  UpdateResourceEpisodeInput,
  UpdateResourceInput,
  UpdateResourceSeriesInput,
} from "../../src/API"
export interface ResourceState extends JCState {
  groupData: CreateGroupInput | GroupData | null | undefined
  resourceData: GetResourceRootDataCustom | null
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
  updateResource(index: number, value: UpdateResourceInput): Promise<void>
  deleteResource(index: number): Promise<void>

  changeSeries(index: number): void
  createSeries(): Promise<void>
  deleteSeries(resourceIndex: number, seriesIndex: number): Promise<void>
  updateSeries(
    resourceIndex: number,
    seriesIndex: number,

    value: UpdateResourceSeriesInput
  ): Promise<void>
  createEpisode(): Promise<void>
  deleteEpisode(resourceIndex: number, seriesIndex: number, episodeIndex: number): Promise<void>
  updateEpisode(
    resourceIndex: number,
    seriesIndex: number,
    episodeIndex: number,

    value: UpdateResourceEpisodeInput
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
  getResource(resourceIndex: number | null | undefined): any
  getSeries(resourceIndex: number | null | undefined, seriesIndex: number | null | undefined): any
  getEpisode(
    resourceIndex: number | null | undefined,
    seriesIndex: number | null | undefined,
    episodeIndex: number | null
  ): any
  getResourceByID(resourceID: string | undefined | null): GetResourceData | null
  getSeriesByID(
    resourceID: string | undefined | null,
    seriesID: string | undefined | null
  ): GetResourceSeriesData | null
  getEpisodeByID(
    resourceID: string | null | undefined,
    seriesID: string | null | undefined,
    episodeID: string | null | undefined
  ): GetResourceEpisodeData | null

  getMenuItem(menuIndex: number | null): any
  moveMenuItemUp(index: number): void
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
    moveMenuItemUp: async () => {},
    createMenuItem: async () => {},
    changeMenuItem: () => {},
    updateMenuItem: async () => {},
    deleteMenuItem: async () => {},
    createResource: async () => {},
    changeResource: () => {},
    updateResource: async () => {},
    deleteResource: async () => {},

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
    getResource: () => {},
    getSeries: () => {},
    getEpisode: () => {},
    getMenuItem: () => {},
    getResourceByID: () => null,
    getSeriesByID: () => null,
    getEpisodeByID: () => null,
  },
  resourceState: undefined,
})
