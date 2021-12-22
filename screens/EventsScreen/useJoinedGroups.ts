// this might not be needed
// import { useEffect, useState } from "react"
// import { Group } from "src/API"
// import { Data } from "../../components/Data/Data"
// import { loadUser } from "./GroupUtils"

// export const useJoinedGroups = (data: Group[]) => {
//   const [user, setUser] = useState<string | null>(null)
//   const [joinedGroups, setJoinedGroups] = useState<string[]>([])
//   const handleUpdateJoined = (newJoined: string[]) => {
//     setJoinedGroups(newJoined)
//   }
//   useEffect(() => {
//     // TODO: can user be pulled from context?
//     const loadUserId = async () => {
//       try {
//         const userId = await loadUser()
//         setUser(userId)
//       } catch (err) {
//         console.log({ err })
//       }
//     }
//     loadUserId()
//   }, [])
//   useEffect(() => {
//     const loadJoinedData = async () => {
//       console.log("loadig joined data")
//       if (data.length) {
//         const fetchJoinedData = async () => {
//           data.forEach((item: any) => {
//             console.log({ item })
//             if (item?.id) {
//               const groupMemberByUser = Data.groupMemberByUser(user, item.id)
//               groupMemberByUser.then((json) => {
//                 if ((json.data?.groupMemberByUser?.items?.length ?? 0) > 0) {
//                   setJoinedGroups((prev) => [...prev, item.id])
//                 }
//               })
//             }
//           })
//         }
//         fetchJoinedData()
//       }
//     }
//     if (user) {
//       loadJoinedData()
//     }
//   }, [data, user])
//   return { joinedGroups, handleUpdateJoined }
// }
