import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Amplify, Analytics, Auth } from "aws-amplify"
import { EditorState, convertToRaw } from "draft-js"
import * as React from "react"
import { ScrollView, View } from "react-native"
import { v4 as uuidv4 } from "uuid"
import { Data } from "../../components/Data/Data"
import Sentry from "../../components/Sentry"
import { UserActions, UserContext, UserState } from "../../screens/HomeScreen/UserContext"
import {
  CreateGroupInput,
  CreateResourceEpisodeInput,
  CreateResourceInput,
  CreateResourceMenuItemInput,
  CreateResourceRootInput,
  CreateResourceSeriesInput,
  ResourceMenuItemType,
  ResourcePageItemInput,
  ResourcePageItemStyle,
  ResourcePageItemType,
  UpdateResourceEpisodeInput,
  UpdateResourceInput,
  UpdateResourceRootInput,
  UpdateResourceSeriesInput,
  UserGroupType,
} from "../../src/API"
import awsconfig from "../../src/aws-exports"
import {
  GetGroupQueryResult,
  GetResourceEpisodeData,
  GetResourceRootDataCustom,
  GetResourceSeriesData,
  GetUserQueryResult,
  GroupMemberByUserQueryResult,
  GroupMemberByUserQueryResultPromise,
  JCCognitoUser,
  ListResourceRootsQueryResult,
  PageItemIndex,
} from "../../src/types"
import ErrorBoundary from "../ErrorBoundry"
import JCComponent from "../JCComponent/JCComponent"
import Validate from "../Validate/Validate"
import ResourceConfig from "./ResourceConfig"
import ResourceContent from "./ResourceContent"
//import { DataStore, Predicates } from '@aws-amplify/datastore'
import { ResourceAdmin } from "../../screens/AdminNew/AdminResourcesScreen"
import { ResourceContext, ResourceState } from "./ResourceContext"
import ResourceDisplay from "./ResourceDisplay"

Amplify.configure(awsconfig)

interface Props {
  navigation?: StackNavigationProp<any, any>
  groupId?: any
  route?: any
  showConfig?: "config" | "detail" | "regular" | "admin"
  displayResource?: string
  displaySeries?: string
  displayEpisode?: string
  userAction?: UserActions
  userState?: UserState
  // isEditable: boolean
}

class ResourceViewerImpl extends JCComponent<Props, ResourceState> {
  static Provider = ResourceContext.Provider
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      resourceData: null,
      groupData: null,
      currentMenuItem: 0,
      currentResource: null,
      currentSeries: null,
      currentEpisode: null,
      isEditable: false,
      showMap: false,
      loadId: props.route?.params?.id ?? "NONE",
      createNew:
        props.route?.params?.create === "true" || props.route?.params?.create === true
          ? true
          : false,
      canSave: false,
      canLeave: false,
      canJoin: false,
      canDelete: false,
      validationError: "",
      currentUser: null,
      currentUserProfile: null,
      memberIDs: [],
    }
  }
  static UserConsumer = UserContext.Consumer

  componentDidMount() {
    this.setState({
      resourceData: null,
      groupData: null,
      currentMenuItem: 0,
      currentResource: null,
      currentSeries: null,
      currentEpisode: null,
      isEditable: false,
      showMap: false,
      loadId: this.props.route?.params?.id ?? "NONE",
      createNew:
        this.props.route?.params?.create === "true" || this.props.route?.params?.create === true
          ? true
          : false,
      canSave: false,
      canLeave: false,
      canJoin: false,
      canDelete: false,
      validationError: "",
      currentUser: null,
      currentUserProfile: null,
      memberIDs: [],
    })
    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      this.setState({
        currentUser: user.username,
      })
      const getUser = Data.getUser(user["username"])
      getUser
        .then((json: GetUserQueryResult) => {
          this.setState(
            {
              currentUserProfile: json.data?.getUser,
            },
            () => {
              this.setInitialData(this.props)
            }
          )
        })
        .catch((e: any) => {
          console.log({
            "Error Loading User": e,
          })
        })
    })
  }
  createGroupInitial = async () => {
    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      const z: CreateGroupInput = {
        id: "resource-" + Date.now(),
        owner: user.username,
        type: "resource",
        name: "",
        description: "",
        memberCount: 1,
        isSponsored: "false",
        image: "temp",
        ownerOrgID: "0000000000000",
        readGroups: [
          UserGroupType.partners,
          UserGroupType.legacyUserGroup1,
          UserGroupType.subscriptionPartners,
        ],
      }
      const isEditable = true
      this.setState(
        {
          groupData: z,
          isEditable: isEditable,
          canLeave: true && !isEditable,
          canJoin: true && !isEditable,
          canSave: !this.state.createNew && isEditable,
          createNew: this.state.createNew && isEditable,
          canDelete: !this.state.createNew && isEditable,
        },
        () => {
          this.setInitialResourceData()
        }
      )
    })
  }
  convertToCurriculum = async (): Promise<void> => {
    console.log("converting")
    try {
      const resourceRoot: UpdateResourceRootInput = {
        id: this.state.resourceData?.id,
        type: `curriculum`,
      }
      const updateResourceRoot = await Data.updateResourceRoot(resourceRoot)
      console.log({ updateResourceRoot: updateResourceRoot })
      if (updateResourceRoot.data?.updateResourceRoot) {
        const menuItem: CreateResourceMenuItemInput = {
          type: ResourceMenuItemType.menuItem,
          readGroups: [UserGroupType.verifiedUsers],
          menuTitle: "Overview",
          order: "0",
          depth: "1",
          resourceRootID: updateResourceRoot.data.updateResourceRoot.id,
        }

        const createMenuItem = await Data.createResourceMenuItem(menuItem)
        console.log({ createMenuItem: createMenuItem })

        const getResourceRoot = await Data.getResourceRoot(
          updateResourceRoot.data.updateResourceRoot.id
        )

        console.log({ updateResourceRoot: updateResourceRoot })
        console.log({ resourceRoot: getResourceRoot })
        if (getResourceRoot.data?.getResourceRoot)
          this.setState({
            resourceData: getResourceRoot.data.getResourceRoot as GetResourceRootDataCustom,
            currentResource: 0,
            currentEpisode: null,
            currentSeries: null,
          })
      }
    } catch (e) {
      console.log({ error: e })
    }
  }

  loadGroup(id) {
    const getGroup = Data.getGroup(id)
    const processResults = (json: GetGroupQueryResult) => {
      const isEditable =
        (json.data?.getGroup?.owner == this.state.currentUser ||
          this.props.userAction?.isMemberOf("admin")) ??
        false

      this.setState(
        {
          groupData: json.data?.getGroup,
          memberIDs:
            json.data?.getGroup?.members?.items?.map((item) =>
              item?.userID ? item?.userID : ""
            ) ?? [],
          isEditable: isEditable,
          canLeave: true && !isEditable,
          canJoin: true && !isEditable,
          canSave: !this.state.createNew && isEditable,
          createNew: this.state.createNew && isEditable,
          canDelete: !this.state.createNew && isEditable,
        },
        () => {
          this.setInitialResourceData()
          const groupMemberByUser: GroupMemberByUserQueryResultPromise = Data.groupMemberByUser(
            this.state.currentUser,
            this.state.groupData?.id
          )
          groupMemberByUser.then((json: GroupMemberByUserQueryResult) => {
            console.log({ groupMemberByUser: json })
            if (json.data?.groupMemberByUser?.items && json.data.groupMemberByUser.items.length > 0)
              this.setState({ canJoin: false, canLeave: true && !this.state.isEditable })
            else this.setState({ canJoin: true && !this.state.isEditable, canLeave: false })
          })
        }
      )
    }
    getGroup.then(processResults).catch(processResults)
  }
  setInitialData(props: Props): void {
    if (props.route?.params?.create === "true" || props.route?.params?.create === true) {
      console.log("creating Resource")
      this.createGroupInitial()
    } else {
      this.loadGroup(props.route?.params?.id)
    }
  }
  async setInitialResourceData(): Promise<void> {
    console.log({ groupData: this.state.groupData })
    const listResourceRoots = Data.listResourceRoots({ groupId: { eq: this.state.groupData?.id } })

    listResourceRoots
      .then((json: ListResourceRootsQueryResult) => {
        console.log({ json: json })
        if (json.data?.listResourceRoots?.items?.length == 0) {
          console.log("starting from scratch")
          this.createResourceRoot()
        } else {
          console.log("existing data")
          console.log({ json: json })
          if (json.data?.listResourceRoots?.items && json.data?.listResourceRoots?.items[0]) {
            console.log({ id: json.data?.listResourceRoots?.items[0].id })
            const getResourceRoot = Data.getResourceRoot(json.data?.listResourceRoots?.items[0].id)

            getResourceRoot
              .then((json) => {
                console.log({ json: json })
                if (json.data?.getResourceRoot)
                  this.setState({
                    resourceData: json.data.getResourceRoot as GetResourceRootDataCustom,
                    currentResource: 0,
                  })
              })
              .catch((e: any) => {
                console.log({ Error: e })
              })
          }
          //   console.log(getResourceRoot2)
        }
      })
      .catch((e: any) => {
        console.log({ error: e })
      })

    //  const getResourceRoot2 = await DataStore.query(ResourceEpisode);
  }
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async createResourceRoot(): Promise<void> {
    console.log("test1")
    try {
      const resourceRoot: CreateResourceRootInput = {
        type: `simple`,
        groupId: this.state.groupData?.id,
        organizationId: "0",
      }
      const createResourceRoot = await Data.createResourceRoot(resourceRoot)
      console.log({ createResourceRoot: createResourceRoot })
      if (createResourceRoot.data?.createResourceRoot) {
        const menuItem: CreateResourceMenuItemInput = {
          type: ResourceMenuItemType.menuItem,
          readGroups: [UserGroupType.verifiedUsers],
          menuTitle: "Overview",
          order: "0",
          depth: "1",
          resourceRootID: createResourceRoot.data.createResourceRoot.id,
          pageItems: [
            {
              id: uuidv4(),
              color: "#0000ff",
              type: ResourcePageItemType.Header,
              title1: "Overview",
              title2: "Hello",
            },
            {
              id: uuidv4(),
              type: ResourcePageItemType.List,
              title1: "Overview",
              title2: "Hello",
              style: ResourcePageItemStyle.ListAuto,
            },
          ],
        }
        const z: ResourcePageItemInput = {
          id: uuidv4(),
          type: ResourcePageItemType.Header,
          title1: "Overview",
          title2: "Hello",
          order: 0,
        }
        const createMenuItem = await Data.createResourceMenuItem(menuItem)

        const createPageItem = await Data.createResource
        console.log({ createMenuItem: createMenuItem })

        const getResourceRoot = await Data.getResourceRoot(
          createResourceRoot.data.createResourceRoot.id
        )

        console.log({ createResourceRoot: createResourceRoot })
        console.log({ resourceRoot: getResourceRoot })
        if (getResourceRoot.data?.getResourceRoot)
          this.setState({
            resourceData: getResourceRoot.data.getResourceRoot as GetResourceRootDataCustom,
            currentResource: 0,
            currentEpisode: null,
            currentSeries: null,
          })
      }
    } catch (e) {
      console.log({ error: e })
    }
  }

  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  validateGroup = (): boolean => {
    const validation: any = Validate.Resource(this.state.groupData)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }
  createGroup = (): void => {
    if (this.validateGroup()) {
      const createGroup = Data.createGroup(this.state.groupData)
      createGroup
        .then((json) => {
          this.setState(
            {
              createNew: false,
              loadId: json.data.createGroup.id,
            },
            () => {
              this.setState(
                {
                  canSave: !this.state.createNew && this.state.isEditable,
                  createNew: this.state.createNew && this.state.isEditable,
                  canDelete: !this.state.createNew && this.state.isEditable,
                },
                () => {
                  this.joinGroup()
                }
              )
            }
          )
          console.log({ "Success Data.createGroup": json })
        })
        .catch((err) => {
          console.log({ "Error Data.createGroup": err })
        })
    }
  }
  clean(item) {
    delete item.members
    delete item.messages
    delete item.organizerGroup
    delete item.organizerUser
    delete item.instructors
    delete item.backOfficeStaff
    delete item.ownerUser
    delete item._deleted
    delete item._lastChangedAt
    delete item.createdAt
    delete item.updatedAt
    delete item.ownerOrg
    return item
  }
  saveGroup = (): void => {
    if (this.validateGroup()) {
      const updateGroup = Data.updateGroup(this.clean(this.state.groupData))
      updateGroup
        .then((json) => {
          // this.setState({ canDelete: true, canSave: true, createNew: false })
          console.log({ "Success Data.updateGroup": json })
        })
        .catch((err) => {
          Sentry.captureException(err)
          console.log({ "Error Data.updateGroup": err })
        })
    }
  }
  leaveGroup = (): void => {
    if (this.state.currentUser && this.state.groupData) {
      Analytics.record({
        name: "leftResource",
        // Attribute values must be strings
        attributes: { id: this.state.groupData.id, name: this.state.groupData.name },
      })
      const groupMemberByUser = Data.groupMemberByUser(
        this.state.currentUser,
        this.state.groupData.id
      )
      groupMemberByUser
        .then((json) => {
          console.log({ "Success Data.groupMemberByUser": json })

          json.data.groupMemberByUser.items.map((item) => {
            const deleteGroupMember = Data.deleteGroupMember(item.id)
            deleteGroupMember
              .then((json) => {
                console.log({ "Success Data.deleteGroupMember": json })
              })
              .catch((err) => {
                console.log({ "Error Data.deleteGroupMember": err })
              })
          })

          const remainingUsers = this.state.memberIDs.filter(
            (user) => user !== this.state.currentUser
          )
          this.setState({ canJoin: true, canLeave: false, memberIDs: remainingUsers })
          // this.renderButtons()
        })
        .catch((err) => {
          console.log({ "Error Data.groupMemberByUser": err })
        })
    }
  }
  joinGroup = (): void => {
    if (this.state.currentUser && this.state.groupData) {
      Analytics.record({
        name: "joinedResource",
        // Attribute values must be strings
        attributes: { id: this.state.groupData.id, name: this.state.groupData.name },
      })
      const createGroupMember = Data.createGroupMember({
        groupID: this.state.groupData.id,
        userID: this.state.currentUser,
      })
      createGroupMember
        .then((json) => {
          console.log({ "Success Data.createGroupMember": json })
        })
        .catch((err) => {
          console.log({ "Error Data.createGroupMember": err })
        })

      this.setState({
        canJoin: false,
        canLeave: true,
        memberIDs: this.state.memberIDs.concat(this.state.currentUser),
      })
      // this.renderButtons()
      console.log({ memberIds: this.state.memberIDs })
    }
  }
  deleteGroup = (): void => {
    if (this.state.groupData) {
      const deleteGroup = Data.deleteGroup(this.state.groupData.id)
      deleteGroup
        .then((json) => {
          console.log({ "Success Data.deleteGroup": json })
          this.props.navigation?.push("HomeScreen")
        })
        .catch((err) => {
          console.log({ "Error Data.deleteGroup": err })
        })
    }
  }
  showProfile = (id: string): void => {
    console.log("Navigate to profileScreen")
    this.props.navigation?.push("ProfileScreen", { id: id, create: false })
  }
  updateValueGroup = (field: string, value: any): void => {
    const temp = this.state.groupData
    if (temp) temp[field] = value
    this.setState({ groupData: temp })
  }

  setIsEditable = (val: boolean): void => {
    this.setState({ isEditable: val })
  }
  createMenuItem = async (menuItemType: ResourceMenuItemType): Promise<void> => {
    if (this.state.resourceData && this.state.resourceData?.menuItems?.items) {
      const menuItem: CreateResourceMenuItemInput = {
        type: menuItemType,
        menuTitle: "New Menu Title",
        readGroups: [UserGroupType.verifiedUsers],
        resourceRootID: this.state.resourceData.id,
        order: (this.state.resourceData?.menuItems.items.length + 1).toString(),
        pageItems: [
          { id: uuidv4(), type: ResourcePageItemType.Header },
          {
            id: uuidv4(),
            type: ResourcePageItemType.Column,
            style: ResourcePageItemStyle.Column3070,
            pageItemsLeft: [{ id: uuidv4(), type: ResourcePageItemType.Menu }],
          },
        ],
      }
      try {
        console.log("Creating Resource")

        const createMenuItem = await Data.createResourceMenuItem(menuItem)
        console.log({ createMenuItem: createMenuItem })
        const temp = this.state.resourceData
        if (createMenuItem.data?.createResourceMenuItem) {
          temp.menuItems?.items?.push(createMenuItem.data?.createResourceMenuItem)
          this.setState({ resourceData: temp }, () => this.forceUpdate())
        }
      } catch (e) {
        console.log({ error: e })
      }
    }
  }
  createResource = async (): Promise<void> => {
    if (this.state.resourceData && this.state.resourceData.resources?.items) {
      const resource: CreateResourceInput = {
        type: "curriculum",
        title: "New Title",
        image: null,
        description: "Enter description",
        extendedDescription: JSON.stringify(
          convertToRaw(EditorState.createEmpty().getCurrentContent())
        ),
        resourceID: this.state.resourceData.id,
        order: (this.state.resourceData.resources.items.length + 1).toString(),
        readGroups: [UserGroupType.verifiedUsers],
      }
      try {
        console.log("Creating Resource")

        const createResource = await Data.createResource(resource)
        console.log({ createResource: createResource })
        const temp = this.state.resourceData
        temp.resources?.items?.push(createResource.data.createResource)
        this.setState({ resourceData: temp }, () => this.forceUpdate())
      } catch (e) {
        console.log(e)
      }
    }
  }
  getResource = (resourceIndex: number | null | undefined) => {
    if (resourceIndex != null) {
      return this.state.resourceData?.resources.items[resourceIndex]
    } else return null
  }
  createSeries = async (): Promise<void> => {
    const resource = this.getResource(this.state.currentResource)
    if (resource) {
      const series: CreateResourceSeriesInput = {
        type: "curriculum",
        title: "New Title",
        imageFile: null,
        description: "Enter description",
        seriesID: resource.id,
        //order: this.state.resourceData.resources.items[this.state.currentResource].series.items.length + 1
      }
      try {
        console.log("Creating Resource")

        const createResource = await Data.createResourceSeries(series)
        console.log({ createResource: createResource })
        const temp = this.state.resourceData
        if (this.state.currentResource != null && temp) {
          temp.resources.items[this.state.currentResource]?.series.items.push(
            createResource.data.createResourceSeries
          )
          this.setState({ resourceData: temp })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  getSeries = (
    resourceIndex: number | null | undefined,
    seriesIndex: number | null
  ): GetResourceSeriesData | undefined => {
    if (resourceIndex == null) return null
    if (seriesIndex == null) return null
    const series =
      this.state.resourceData?.resources?.items[resourceIndex]?.series?.items[seriesIndex]
    return series
  }
  getEpisode = (
    resourceIndex: number | null | undefined,
    seriesIndex: number | null | undefined,
    episodeIndex: number | null
  ): GetResourceEpisodeData | undefined | null => {
    if (episodeIndex == null || seriesIndex == undefined) return null
    const series = this.getSeries(resourceIndex, seriesIndex)
    if (series && series?.episodes?.items) {
      const episode = series.episodes.items[episodeIndex]
      return episode
    } else return null
  }
  createEpisode = async (): Promise<void> => {
    const series = this.getSeries(this.state.currentResource, this.state.currentSeries)
    if (series) {
      const episode: CreateResourceEpisodeInput = {
        type: "curriculum",
        title: "New Title",
        //image: null,
        description: "Enter description",
        episodeID: series.id,
        //order: this.state.resourceData.resources.items[this.state.currentResource].series.items.length + 1
      }
      try {
        console.log("Creating Resource")

        const createResource = await Data.createResourceEpisode(episode)
        console.log(createResource)
        const temp = this.state.resourceData
        if (temp && this.state.currentResource != null && this.state.currentSeries != null) {
          temp.resources.items[this.state.currentResource]!.series.items[
            this.state.currentSeries
          ]?.episodes?.items?.push(createResource.data.createResourceEpisode)
          this.setState({ resourceData: temp })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  changeEpisode = (index: number): void => {
    console.log({ changeEpisode: index })
    this.setState({ currentEpisode: index })
  }
  changeSeries = (index: number): void => {
    console.log({ changeSeries: index })
    this.setState({ currentSeries: index, currentEpisode: null })
  }
  changeResource = (index: number): void => {
    console.log({ changeResource: index })
    this.setState({ currentSeries: null, currentResource: index, currentEpisode: null })
  }
  changeMenuItem = (index: number): void => {
    console.log({ changeResource: index })
    this.props.navigation?.navigate("ResourceScreen", {
      create: false,
      id: this.state.groupData?.id,
    })
    this.setState({ currentMenuItem: index })
  }
  getMenuItem = (menuItemIndex: number | null) => {
    if (menuItemIndex != null && this.state.resourceData?.menuItems?.items)
      return this.state.resourceData?.menuItems?.items[menuItemIndex]
    else return null
  }
  updateMenuItem = async (menuItemIndex: number, item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating MenuItem": menuItemIndex })
      const menuItem = this.getMenuItem(menuItemIndex)
      if (menuItem) {
        const updateMenuItem = await Data.updateResourceMenuItem({
          id: menuItem.id,
          [item]: value,
        })
        console.log(updateMenuItem)
        const temp = this.state.resourceData
        if (temp && temp.menuItems) {
          temp.menuItems.items[menuItemIndex][item] = value
          this.setState({ resourceData: temp })
        }
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  updateToRoot(
    rootPageItems: ResourcePageItemInput[],
    pageItemIndex: PageItemIndex,
    value: ResourcePageItemInput
  ): any {
    const rootPageItems2 = rootPageItems
    console.log({ rootPageItems2, pageItemIndex, value })
    if (pageItemIndex.length == 1) {
      return rootPageItems2
    } else {
      //      if (rootPageItems2.pageItems == null) rootPageItems2.pageItems = []
      console.log({ pageItemIndexA: pageItemIndex })
      const z = this.updateToRoot(
        rootPageItems2[pageItemIndex[0]][pageItemIndex[1]]
          ? rootPageItems2[pageItemIndex[0]][pageItemIndex[1]]
          : [],

        pageItemIndex.slice(2),
        value
      )
      console.log({ pageItemIndexB: pageItemIndex })

      rootPageItems2[pageItemIndex[0]][pageItemIndex[1]] = z

      return rootPageItems2
    }
  }
  addToRoot(
    rootPageItems: ResourcePageItemInput[],
    pageItem: ResourcePageItemInput,
    pageItemIndex: PageItemIndex
  ): any {
    const rootPageItems2 = rootPageItems
    console.log({ rootPageItems2, pageItem, pageItemIndex })
    if (pageItemIndex.length == 0) {
      rootPageItems2.push(pageItem)
      console.log(rootPageItems)
      return rootPageItems2
    } else {
      //      if (rootPageItems2.pageItems == null) rootPageItems2.pageItems = []
      console.log({ pageItemIndexA: pageItemIndex })
      const z = this.addToRoot(
        rootPageItems2[pageItemIndex[0]][pageItemIndex[1]]
          ? rootPageItems2[pageItemIndex[0]][pageItemIndex[1]]
          : [],
        pageItem,
        pageItemIndex.slice(2)
      )
      console.log({ pageItemIndexB: pageItemIndex })
      rootPageItems2[pageItemIndex[0]][pageItemIndex[1]] = z
      console.log({ rootPageItems2222: rootPageItems2 })
      return rootPageItems2
    }
  }
  deleteToRoot(
    rootPageItems: ResourcePageItemInput[],

    pageItemIndex: PageItemIndex
  ): any {
    const rootPageItems2 = rootPageItems
    console.log({ rootPageItems2, pageItemIndex })
    if (pageItemIndex.length == 1) {
      rootPageItems2.splice(pageItemIndex[0] as number, 1)
      console.log(rootPageItems)
      return rootPageItems2
    } else {
      //      if (rootPageItems2.pageItems == null) rootPageItems2.pageItems = []
      console.log({ pageItemIndexA: pageItemIndex })
      const z = this.deleteToRoot(
        rootPageItems2[pageItemIndex[0]][pageItemIndex[1]]
          ? rootPageItems2[pageItemIndex[0]][pageItemIndex[1]]
          : [],
        pageItemIndex.slice(2)
      )
      console.log({ pageItemIndexB: pageItemIndex })
      rootPageItems2[pageItemIndex[0]][pageItemIndex[1]] = z
      console.log({ rootPageItems2222: rootPageItems2 })
      return rootPageItems2
    }
  }
  createPageItem = async (
    menuItemIndex: number,
    pageItemIndex: PageItemIndex,
    pageItem: ResourcePageItemInput
  ): Promise<void> => {
    try {
      console.log({
        "Creating PageItem": menuItemIndex,
        PageIndex: pageItemIndex,
        pageItem: pageItem,
      })
      const menuItem = this.getMenuItem(menuItemIndex)
      if (menuItem) {
        let rootPageItems: ResourcePageItemInput[] = menuItem?.pageItems

        if (!rootPageItems) rootPageItems = []
        rootPageItems = this.addToRoot(rootPageItems, pageItem, pageItemIndex)
        console.log({ rootPageItems: rootPageItems })
        const updateMenuItem = await Data.updateResourceMenuItem({
          id: menuItem.id,
          pageItems: rootPageItems,
        })
        console.log(updateMenuItem)
        const temp = this.state.resourceData
        if (temp && temp.menuItems && temp.menuItems.items) {
          temp.menuItems.items[menuItemIndex]!.pageItems = rootPageItems
          this.setState({ resourceData: temp })
        }
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  updatePageItem = async (
    menuItemIndex: number,
    pageItemIndex: PageItemIndex,
    value: ResourcePageItemInput
  ): Promise<void> => {
    try {
      console.log({ "Updating MenuItem": menuItemIndex, value: value })
      const menuItem = this.getMenuItem(menuItemIndex)
      if (menuItem) {
        let rootPageItems: ResourcePageItemInput[] = menuItem.pageItems
        rootPageItems = this.updateToRoot(rootPageItems, pageItemIndex, value)

        const updateMenuItem = await Data.updateResourceMenuItem({
          id: menuItem.id,
          pageItems: rootPageItems,
        })
        console.log(updateMenuItem)
        const temp = this.state.resourceData
        if (temp && temp.menuItems && temp.menuItems.items) {
          temp.menuItems.items[menuItemIndex]!.pageItems = rootPageItems
          this.setState({ resourceData: temp })
        }
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  deletePageItem = async (menuItemIndex: number, pageItemIndex: PageItemIndex): Promise<void> => {
    try {
      console.log({ "Updating MenuItem": menuItemIndex })
      const menuItem = this.getMenuItem(menuItemIndex)
      if (menuItem) {
        let rootPageItems: ResourcePageItemInput[] = menuItem.pageItems
        rootPageItems = this.deleteToRoot(rootPageItems, pageItemIndex)
        const updateMenuItem = await Data.updateResourceMenuItem({
          id: menuItem.id,
          pageItems: rootPageItems,
        })
        console.log(updateMenuItem)
        const temp = this.state.resourceData
        if (temp && temp.menuItems && temp.menuItems.items) {
          temp.menuItems.items[menuItemIndex]!.pageItems = rootPageItems
          this.setState({ resourceData: temp })
        }
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  updateResource = async (index: number, value: UpdateResourceInput): Promise<void> => {
    try {
      console.log({ "Updating Resource": index })
      const resource = this.getResource(index)

      if (resource) {
        const value2 = { ...value }
        delete value.series
        delete value.createdAt
        delete value.updatedAt

        const updateResource = await Data.updateResource(value)
        console.log(updateResource)
        const temp = this.state.resourceData
        if (temp && temp.resources && temp.resources.items) {
          temp.resources.items[index] = value2
          this.setState({ resourceData: temp })
        }
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  reorderMenu() {
    const temp = this.state.resourceData
    if (temp && temp.menuItems && temp.menuItems.items) {
      console.log(temp.menuItems.items)
      temp.menuItems.items = temp?.menuItems.items.sort((a, b) => {
        return (a?.order ?? "0").localeCompare(b?.order ?? "0")
      })
      console.log(temp.menuItems.items)
    }
    this.setState({ resourceData: temp })
  }
  moveMenuItemUp = async (index: number): Promise<void> => {
    try {
      await this.updateMenuItem(index - 1, "order", index.toString())
      await this.updateMenuItem(index, "order", (index - 1).toString())
      this.reorderMenu()
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  updateMenuItemOrder = (): void => {
    try {
      this.state.resourceData?.menuItems?.items?.forEach((item, index: number) => {
        this.updateMenuItem(index, "order", index)
      })
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  updateResourceOrder = (): void => {
    try {
      this.state.resourceData?.resources.items.forEach((item, index: number) => {
        const z = item
        if (z) {
          z.order = index.toString()
          this.updateResource(index, z)
        }
      })

      /* var temp = this.state.data
             temp.resources.items.forEach((item, index) => {
                 temp.resources.items[index].order = index
             }
             )
             this.setState({ data: temp })*/
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }

  deleteMenuItem = async (menuItemIndex: number) => {
    try {
      console.log({ "Deleting MenuItem": menuItemIndex })
      const menuItem = this.getMenuItem(menuItemIndex)
      if (menuItem) {
        const deleteMenuItem = await Data.deleteResourceMenuItem(menuItem.id)
        console.log(deleteMenuItem)
        const temp = this.state.resourceData
        temp?.menuItems?.items?.splice(menuItemIndex, 1)
        this.setState({ resourceData: temp }, this.updateMenuItemOrder)
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  deleteResource = async (index: number) => {
    console.log({ "Deleting resource": index })
    try {
      const resource = this.getResource(index)
      if (resource) {
        const deleteResource = await Data.deleteResource(resource.id)
        console.log(deleteResource)
        const temp = this.state.resourceData
        temp?.resources.items.splice(index, 1)
        this.setState({ resourceData: temp, currentResource: 0 }, this.updateResourceOrder)
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  updateSeriesOrder = (resourceIndex: number) => {
    try {
      this.state.resourceData?.resources.items[resourceIndex]!.series.items.forEach(
        (item, index: number) => {
          const z = item
          if (z) {
            z.order = index
            this.updateSeries(resourceIndex, index, z)
          }
        }
      )
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  updateSeries = async (
    resourceIndex: number,
    seriesIndex: number,
    value: UpdateResourceSeriesInput
  ): Promise<void> => {
    try {
      console.log({ "Updating Series": { resource: resourceIndex, series: seriesIndex } })
      const series = this.getSeries(resourceIndex, seriesIndex)
      const value2 = { ...value }
      delete value.createdAt
      delete value.updatedAt
      delete value.episodes
      if (value.parentResource) delete value.parentResource
      if (series) {
        const updateResource = await Data.updateResourceSeries(value)
        console.log(updateResource)
        const temp = this.state.resourceData
        if (temp && temp.resources && temp.resources.items) {
          temp.resources.items[resourceIndex]!.series.items[seriesIndex] = value2

          this.setState({ resourceData: temp })
        }
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  deleteSeries = async (resourceIndex: number, seriesIndex: number): Promise<void> => {
    try {
      console.log({ "Deleting Series": { resource: resourceIndex, series: seriesIndex } })
      const series = this.getSeries(resourceIndex, seriesIndex)
      if (series) {
        const deleteResource = await Data.deleteResourceSeries(series.id)
        console.log(deleteResource)
        const temp = this.state.resourceData
        temp?.resources.items[resourceIndex]!.series.items.splice(seriesIndex, 1)
        console.log(temp?.resources.items[resourceIndex])
        this.setState({ resourceData: temp }, () => {
          this.updateSeriesOrder(resourceIndex)
        })
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  /*  updateEpisodesOrder = (resourceIndex: number, seriesIndex: number): void => {
    try {
      const series = this.getSeries(resourceIndex, seriesIndex)
      series?.episodes?.items?.forEach((item: UpdateResourceEpisodeInput | null, index: number) => {
        // item.epi = index.toString()
        const z = { ...item }
        z.order
        this.updateEpisode(resourceIndex, seriesIndex, index, "order", index.toString())
      })
    } catch (e) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }*/

  updateEpisode = async (
    resourceIndex: number,
    seriesIndex: number,
    episodeIndex: number,
    value: UpdateResourceEpisodeInput
  ): Promise<void> => {
    try {
      console.log({
        "Updating Resource": {
          resource: resourceIndex,
          series: seriesIndex,
          episode: episodeIndex,
        },
      })
      const value2 = { ...value }
      delete value.createdAt
      delete value.updatedAt
      if (value.parentSeries) delete value.parentSeries
      const episode = this.getEpisode(resourceIndex, seriesIndex, episodeIndex)
      if (episode) {
        const updateResourceEpisode = await Data.updateResourceEpisode(value)
        console.log(updateResourceEpisode)
        const temp = this.state.resourceData
        if (temp) {
          temp.resources.items![resourceIndex].series.items![seriesIndex].episodes.items![
            episodeIndex
          ] = value2
          this.setState({ resourceData: temp })
        }
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  clearEpisode = (): void => {
    this.setState({ currentEpisode: null })
  }
  clearSeries = (): void => {
    this.setState({ currentSeries: null, currentEpisode: null })
  }
  deleteEpisode = async (
    resourceIndex: number,
    seriesIndex: number,
    episodeIndex: number
  ): Promise<void> => {
    try {
      console.log({
        "Deleting Episode": { resource: resourceIndex, series: seriesIndex, episode: episodeIndex },
      })
      const episode = this.getEpisode(resourceIndex, seriesIndex, episodeIndex)
      if (episode) {
        const deleteResource = await Data.deleteResourceEpisode(episode.id)
        console.log(deleteResource)
        const temp = this.state.resourceData
        if (temp) {
          temp.resources?.items[resourceIndex]!.series?.items[seriesIndex]?.episodes?.items?.splice(
            episodeIndex,
            1
          )
          this.setState({ resourceData: temp }, () => {
            // this.updateEpisodesOrder(resourceIndex, seriesIndex)
          })
        }
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  /* getValueFromKey(myObject: unknown, string: string) {
    const key = Object.keys(myObject).filter((k) => k.includes(string))
    return key.length ? myObject[key[0]] : ""
  }*/

  findResourceByID(resource: string | undefined): number | undefined {
    //    console.log({ resource: resource })
    if (resource == undefined) return undefined
    return this.state.resourceData?.resources.items.map((item) => item?.id).indexOf(resource)
  }
  findSeriesByID(resource: string | undefined, series: string | undefined) {
    const resourceID = this.findResourceByID(resource)
    if (resource == undefined || resourceID == undefined) return undefined
    if (series == undefined) return undefined
    return this.state.resourceData?.resources.items[resourceID]?.series?.items
      ?.map((item) => item?.id)
      .indexOf(series)
  }
  findEpisodeByID(
    resource: string | undefined,
    series: string | undefined,
    episode: string | undefined
  ) {
    const resourceID = this.findResourceByID(resource)
    const seriesID = this.findSeriesByID(resource, series)
    if (resource == undefined || resourceID == undefined) return undefined
    if (series == undefined || seriesID == undefined) return undefined
    if (episode == undefined) return undefined
    return this.state.resourceData?.resources?.items[resourceID]?.series?.items[
      seriesID
    ].episodes?.items
      ?.map((item) => item?.id)
      .indexOf(episode)
  }
  getResourceByID = (resourceID: string | undefined): any => {
    return this.getResource(this.findResourceByID(resourceID))
  }
  getSeriesByID = (resourceID: string | undefined, seriesID: string | undefined): any => {
    return this.getSeries(
      this.findResourceByID(resourceID),
      this.findSeriesByID(resourceID, seriesID)
    )
  }
  getEpisodeByID = (
    resourceID: string | undefined,
    seriesID: string | undefined,
    episodeID: string
  ): any => {
    return this.getEpisode(
      this.findResourceByID(resourceID),
      this.findSeriesByID(resourceID, seriesID),
      this.findEpisodeByID(resourceID, seriesID, episodeID)
    )
  }
  renderRouter() {
    if (this.props.showConfig == "admin") return <ResourceAdmin></ResourceAdmin>
    else {
      if (this.state.resourceData == null) return null
      if (this.props.showConfig == "config") return <ResourceConfig></ResourceConfig>
      else if (this.props.showConfig == "detail") {
        return (
          <ResourceDisplay
            displayResource={this.props.displayResource}
            displayEpisode={this.props.displayEpisode}
            displaySeries={this.props.displaySeries}
          ></ResourceDisplay>
        )
      } else
        return this.state.currentResource == 0 ? (
          <>
            <ResourceContent pageItemIndex={[]} isBase={true}></ResourceContent>
          </>
        ) : (
          <>
            <ResourceContent pageItemIndex={[]} isBase={true}></ResourceContent>
          </>
        )
    }
  }

  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <ResourceViewerImpl.Provider
          value={{
            resourceState: {
              ...this.state,
            },
            resourceActions: {
              convertToCurriculum: this.convertToCurriculum,
              createPageItem: this.createPageItem,
              updatePageItem: this.updatePageItem,
              deletePageItem: this.deletePageItem,
              createMenuItem: this.createMenuItem,
              changeMenuItem: this.changeMenuItem,
              updateMenuItem: this.updateMenuItem,
              deleteMenuItem: this.deleteMenuItem,
              createResource: this.createResource,
              changeResource: this.changeResource,
              updateResource: this.updateResource,
              deleteResource: this.deleteResource,
              changeSeries: this.changeSeries,
              createSeries: this.createSeries,
              deleteSeries: this.deleteSeries,
              updateSeries: this.updateSeries,
              createEpisode: this.createEpisode,
              deleteEpisode: this.deleteEpisode,
              updateEpisode: this.updateEpisode,
              clearEpisode: this.clearEpisode,
              clearSeries: this.clearSeries,
              changeEpisode: this.changeEpisode,
              mapChanged: this.mapChanged,
              validateGroup: this.validateGroup,
              createGroup: this.createGroup,
              createGroupInitial: this.createGroupInitial,
              saveGroup: this.saveGroup,
              leaveGroup: this.leaveGroup,
              joinGroup: this.joinGroup,
              deleteGroup: this.deleteGroup,
              showProfile: this.showProfile,
              updateValueGroup: this.updateValueGroup,
              getResource: this.getResource,
              getSeries: this.getSeries,
              getEpisode: this.getEpisode,
              getResourceByID: this.getResourceByID,
              getSeriesByID: this.getSeriesByID,
              getEpisodeByID: this.getEpisodeByID,
              getMenuItem: this.getMenuItem,
              moveMenuItemUp: this.moveMenuItemUp,
            },
          }}
        >
          <View style={{ padding: 0, margin: 0 }}>
            <ErrorBoundary>
              <ScrollView>{this.renderRouter()}</ScrollView>
            </ErrorBoundary>
          </View>
        </ResourceViewerImpl.Provider>
      </ErrorBoundary>
    )
  }
}

export default function ResourceViewer(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return (
    <UserContext.Consumer>
      {({ userActions, userState }) => (
        <ResourceViewerImpl
          {...props}
          userAction={userActions}
          userState={userState}
          navigation={navigation}
          route={route}
        />
      )}
    </UserContext.Consumer>
  )
}
