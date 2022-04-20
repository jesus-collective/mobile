import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Auth } from "aws-amplify"
import React, { useContext, useEffect, useState } from "react"
import { View } from "react-native"
import { Data } from "../../components/Data/Data"
import { MessageComment } from "../../components/MessageBoard/AssignmentMessageBoard/MessageThread"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { CreateDirectMessageUserMutation, GetDirectMessageRoomQuery } from "../../src/API"
import { JCCognitoUser } from "../../src/types"
import { CourseActions } from "../CourseViewer/CourseContext"
import { JCState } from "../JCComponent/JCComponent"
import MessageEditor from "../MessageBoard/AssignmentMessageBoard/MessageEditor"
import AssignmentCourseReview from "./AssignmentCourseReview"
import AssignmentLoadingSpinner from "./AssignmentLoadingSpinner"
import AssignmentUserIndicatorBar from "./AssignmentUserIndicatorBar"
import CreateAssignmentView from "./CreateAssignmentView"

interface Props {
  wordCount: number
  assignmentId: string
  actions: CourseActions
  userActions: UserActions
}
export interface AssignmentState extends JCState {
  assignmentComplete: boolean
  data: Array<GetDirectMessageRoomQuery["getDirectMessageRoom"]>
  currentUser: any
  currentRoomId: string | null
  isLoading: boolean
  newToList: any
  userList: any
  assignmentOption: string
  showEdit: MessageComment | null
  initialPost: boolean
  myRoom: GetDirectMessageRoomQuery["getDirectMessageRoom"] | null
}
export default function EditableCourseAssignment2(props: Props): JSX.Element {
  const assignmentContext = useContext(UserContext)
  const { userActions } = assignmentContext
  const [state, setState] = useState<AssignmentState>({
    data: [],
    currentUser: null,
    showEdit: null,
    currentRoomId: null,
    isLoading: true,
    newToList: [],
    userList: [...props.actions.myCourseGroups().all],
    assignmentComplete: false,
    assignmentOption: "Assignments to Review",
    initialPost: false,
    myRoom: null,
  })
  useEffect(() => {
    const getUser = async () => {
      const user: JCCognitoUser = await Auth.currentAuthenticatedUser()
      setState((prev) => ({
        ...prev,
        currentRoomId: "course-" + props.assignmentId + "-" + user.username,
        currentUser: user.username,
      }))
    }
    getUser()
  }, [])

  useEffect(() => {
    const getAssignments = async () => {
      if (state.currentUser) {
        await shouldCreateRoom(props.userActions)
        await getAssignmentData()
      }
    }
    getAssignments()
  }, [state.currentUser])

  useEffect(() => {
    if (state.data.length) {
      hasInitialPost()
    }
  }, [state.data])

  const clearAndRefetch = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    await getAssignmentData()
    setState((prev) => ({ ...prev, assignmentOption: "My Assignment" }))
  }

  const getAssignmentData = async () => {
    const data: Array<GetDirectMessageRoomQuery["getDirectMessageRoom"]> = []
    const fetchNext = async (next: string | null) => {
      try {
        const json = await Data.listDirectMessageRooms({
          limit: 200,
          filter: {
            id: { beginsWith: "course-" + props.assignmentId + "-" },
            roomType: { eq: "assignment" },
          },
          nextToken: next,
        })
        if (json?.data?.listDirectMessageRooms?.items?.length) {
          json?.data?.listDirectMessageRooms?.items?.forEach((item) => {
            data.push(item)
          })
        }
        if (json?.data?.listDirectMessageRooms?.nextToken !== null) {
          await fetchNext(json?.data?.listDirectMessageRooms?.nextToken ?? "")
        }
      } catch (err) {
        console.error({
          Error: {
            EditableCourseAssignment2: {
              "fetchNext()": "Something went wrong while fetching assignments",
            },
          },
        })
      }
    }
    await fetchNext(null)
    setState({
      ...state,
      myRoom: data.find((a) => a?.id.includes(state.currentUser)),
      showEdit: null,
      data: data,
      isLoading: false,
    })
  }

  const createRoom = async (user: JCCognitoUser): Promise<void> => {
    try {
      const createDirectMessageRoom = await Data.createDirectMessageRoom({
        id: "course-" + props.assignmentId + "-" + user["username"],
        roomType: "assignment",
        name: user.attributes?.given_name + " " + user.attributes?.family_name + "'s assignment",
      })
      if (createDirectMessageRoom.data?.createDirectMessageRoom) {
        const userPromises: Array<Promise<GraphQLResult<CreateDirectMessageUserMutation>>> = []
        state.userList.forEach((item: any) => {
          const a = Data.createDirectMessageUser({
            roomID: "course-" + props.assignmentId + "-" + user["username"],
            userID: item.id,
            userName: item.name,
          })
          userPromises.push(a)
        })
        await Promise.all(userPromises)
      } else {
        console.error({
          Error: {
            EditableCourseAssignment2: {
              "createRoom()":
                "An error occurred while trying to DirectMessageRoom for user (assignment)",
            },
          },
        })
      }
    } catch (err) {
      console.error({
        Error: {
          EditableCourseAssignment2: {
            "createRoom()":
              "An error occurred while trying to DirectMessageRoom for user (assignment)",
          },
        },
      })
    }
  }

  const shouldCreateRoom = async (userActions: UserActions): Promise<void> => {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    const userAssignment = await Data.getDirectMessageRoom(
      "course-" + props.assignmentId + "-" + user["username"]
    )
    if (userAssignment?.data?.getDirectMessageRoom) console.log("Assignment room already exists")
    else {
      if (!userActions.isMemberOf("courseAdmin") && !userActions.isMemberOf("courseCoach"))
        if (user) await createRoom(user)
    }
  }

  const hasInitialPost = (): void => {
    if (state.initialPost) return
    const usersAssignment: GetDirectMessageRoomQuery["getDirectMessageRoom"] = state.myRoom
    const hasPost = !!usersAssignment?.directMessage?.items?.length
    console.log("hasInitialPost", hasPost)
    setState((prev) => ({ ...prev, initialPost: hasPost }))
  }

  const getCurrentRoomRecipients = (): string[] => {
    const ids: string[] = []
    state.userList.forEach((user: any) => {
      ids.push(user.id)
    })
    console.log(ids)
    return ids
  }

  return (
    <View>
      {state.isLoading ? (
        <AssignmentLoadingSpinner />
      ) : state.showEdit ? (
        <View style={{ paddingBottom: 150 }}>
          <AssignmentUserIndicatorBar label="Update Assignment" />
          <MessageEditor
            assignment={state.showEdit}
            wordCount={props.wordCount}
            post={clearAndRefetch}
            recipients={getCurrentRoomRecipients()}
            roomId={state.currentRoomId ?? ""}
          />
        </View>
      ) : userActions.isMemberOf("courseAdmin") || userActions.isMemberOf("courseCoach") ? (
        <>
          <AssignmentUserIndicatorBar label="Admin/Coach View" />
          <AssignmentCourseReview
            getCurrentRoomRecipients={getCurrentRoomRecipients}
            wordCount={props.wordCount}
            setState={setState}
            state={state}
            myRoom={state.myRoom}
            data={state.data}
            userActions={userActions}
          />
        </>
      ) : state.initialPost ? (
        <AssignmentCourseReview
          getCurrentRoomRecipients={getCurrentRoomRecipients}
          wordCount={props.wordCount}
          setState={setState}
          state={state}
          myRoom={state.myRoom}
          data={state.data}
          userActions={userActions}
        />
      ) : !state.initialPost && !state.isLoading ? (
        <CreateAssignmentView
          getCurrentRoomRecipients={getCurrentRoomRecipients}
          clearAndRefetch={clearAndRefetch}
          currentRoomId={state.currentRoomId}
          wordCount={props.wordCount}
        />
      ) : null}
    </View>
  )
}
