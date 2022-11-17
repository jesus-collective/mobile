import React, { createContext, Dispatch, useReducer } from "react"
import myAccountReducer from "./MyAccountReducer"
import { MyAccountAction, MyAccountPage, MyAccountState } from "./MyAccountTypes"

const initialState = {
  currentPage: MyAccountPage.Overview,
  user: null,
  pageTitle: "Manage Your Account",
  showChangePass: false,
  showChangeName: false,
}

const MyAccountContext = createContext<{
  state: MyAccountState
  dispatch: Dispatch<MyAccountAction>
}>({
  state: initialState,
  dispatch: () => null,
})

const MyAccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(myAccountReducer, initialState)
  return (
    <MyAccountContext.Provider value={{ state, dispatch }}>{children}</MyAccountContext.Provider>
  )
}
export { MyAccountProvider, MyAccountContext }
