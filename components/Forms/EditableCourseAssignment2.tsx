import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Auth } from "aws-amplify"
import { MessageComment } from "components/MessageBoard/AssignmentMessageBoard/MessageThread"
import { Container } from "native-base"
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Text, TouchableHighlight, View } from "react-native"
import { Data } from "../../components/Data/Data"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { CreateDirectMessageUserMutation, GetDirectMessageRoomQuery } from "../../src/API"
import { JCCognitoUser } from "../../src/types"
import ActivityBoxStyles from "../Activity/ActivityBoxStyles"
import { CourseActions } from "../CourseViewer/CourseContext"
import { JCState } from "../JCComponent/JCComponent"
import MessageEditor from "../MessageBoard/AssignmentMessageBoard/MessageEditor"
import Messages from "../MessageBoard/AssignmentMessageBoard/Messages"

interface Props {
  wordCount: number
  assignmentId: string
  actions: CourseActions
  userActions: UserActions
}
interface State extends JCState {
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
  const [state, setState] = useState<State>({
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
  const AssignmentsToggle = ({
    optionState,
    changeOption,
    adminCoach,
  }: {
    optionState: string
    changeOption: (newOption: string) => void
    adminCoach: boolean
  }): JSX.Element => {
    const options = adminCoach
      ? ["Assignments to Review"]
      : ["Assignments to Review", "My Assignment"]
    return (
      <View style={[ActivityBoxStyles.ActivityButtonContainer, { borderBottomWidth: 0 }]}>
        {options.map((option: string) => {
          return (
            <TouchableHighlight
              underlayColor="rgba(255,255,255,0.2)"
              key={option}
              disabled={optionState === option}
              onPress={() => changeOption(option)}
              style={{
                padding: 16,
                borderBottomWidth: optionState === option ? 2 : 0,
                borderBottomColor: optionState === option ? "#F0493E" : "none",
              }}
            >
              <Text
                style={[
                  ActivityBoxStyles.ActivityButtonText,
                  { fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Semibold-App" },
                  optionState === option ? { color: "#F0493E" } : {},
                ]}
              >
                {option}
              </Text>
            </TouchableHighlight>
          )
        })}
      </View>
    )
  }
  const CourseReview = ({
    data,
    myRoom,
    userActions,
  }: {
    data: Array<GetDirectMessageRoomQuery["getDirectMessageRoom"]>
    myRoom: GetDirectMessageRoomQuery["getDirectMessageRoom"]
    userActions?: UserActions
  }): JSX.Element => {
    console.log("My Room", myRoom)
    const isAdminOrIsCoach =
      !!userActions?.isMemberOf("courseAdmin") || !!userActions?.isMemberOf("courseCoach")
    const assignmentsMinusMine = data.filter(
      (item) => item?.directMessage?.items?.length && !item?.id.includes(state.currentUser)
    )
    const NoAssignments = () => {
      return (
        <Text
          style={{
            paddingLeft: 16,
            fontSize: 18,
            lineHeight: 25,
            fontFamily: "Graphik-Semibold-App",
          }}
        >
          No assignments to review
        </Text>
      )
    }
    const showMine = state.assignmentOption === "My Assignment" && data.length
    const showOthers = state.assignmentOption === "Assignments to Review" && data.length
    const showNoAssignments = !assignmentsMinusMine.length
    return (
      <Container style={{ width: "100%", paddingBottom: 250 }}>
        <AssignmentsToggle
          adminCoach={isAdminOrIsCoach}
          optionState={state.assignmentOption}
          changeOption={(newSelection) => setState({ ...state, assignmentOption: newSelection })}
        />
        {showMine ? (
          <Messages
            showEdit={(assignment: MessageComment) => setState({ ...state, showEdit: assignment })}
            wordCount={props.wordCount}
            recipients={getCurrentRoomRecipients()}
            open
            room={myRoom}
          />
        ) : showNoAssignments ? (
          <NoAssignments />
        ) : showOthers ? (
          assignmentsMinusMine.map((item, index: number) => {
            return (
              <Messages
                wordCount={props.wordCount}
                recipients={getCurrentRoomRecipients()}
                room={item}
                key={index}
              />
            )
          })
        ) : (
          <Spinner />
        )}
      </Container>
    )
  }
  const UserIndicatorBar = ({ label }: { label: string }): JSX.Element => {
    let bgColor
    switch (label) {
      case "Assignment":
        bgColor = "#F0493E"
        break
      case "Update Assignment":
        bgColor = "#F0493E"
        break
      default:
        bgColor = "#71C209"
        break
    }
    return (
      <View
        style={{
          padding: 4,
          paddingLeft: 12,
          marginTop: 20,
          backgroundColor: bgColor,
          borderRadius: 4,
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 18,
            fontFamily: "Graphik-Bold-App",
            alignSelf: "flex-start",
          }}
        >
          {label}
        </Text>
      </View>
    )
  }
  const Spinner = (): JSX.Element => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 40,
          minHeight: 400,
        }}
      >
        <ActivityIndicator color="#F0493E" size="large"></ActivityIndicator>
        <p style={{ marginTop: 12, fontFamily: "Graphik-Bold-App", fontSize: 16 }}>
          Loading assignments...
        </p>
      </div>
    )
  }
  const AssignmentEditView = () => {
    return (
      <View style={{ paddingBottom: 150 }}>
        <UserIndicatorBar label="Update Assignment" />
        <MessageEditor
          assignment={state.showEdit}
          wordCount={props.wordCount}
          post={clearAndRefetch}
          recipients={getCurrentRoomRecipients()}
          roomId={state.currentRoomId ?? ""}
        />
      </View>
    )
  }
  const AssignmentAdminCoachView = () => {
    return (
      <>
        <UserIndicatorBar label="Admin/Coach View" />
        <CourseReview myRoom={state.myRoom} data={state.data} userActions={userActions} />
      </>
    )
  }
  const CreateAssignmentView = () => {
    return (
      <View style={{ paddingBottom: 150 }}>
        <UserIndicatorBar label="Assignment" />
        <MessageEditor
          wordCount={props.wordCount}
          newAssignment={true}
          post={clearAndRefetch}
          recipients={getCurrentRoomRecipients()}
          roomId={state.currentRoomId ?? ""}
        />
      </View>
    )
  }
  const AssignmentsView = () => {
    return <CourseReview myRoom={state.myRoom} data={state.data} userActions={userActions} />
  }
  return (
    <View>
      {state.isLoading ? (
        <Spinner />
      ) : state.showEdit ? (
        <AssignmentEditView />
      ) : userActions.isMemberOf("courseAdmin") || userActions.isMemberOf("courseCoach") ? (
        <AssignmentAdminCoachView />
      ) : state.initialPost ? (
        <AssignmentsView />
      ) : !state.initialPost && !state.isLoading ? (
        <CreateAssignmentView />
      ) : null}
    </View>
  )
}
