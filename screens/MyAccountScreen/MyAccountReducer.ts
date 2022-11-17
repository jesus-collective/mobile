import { MyAccountAction, MyAccountActionType, MyAccountState } from "./MyAccountTypes"
export default function myAccountReducer(
  state: MyAccountState,
  action: MyAccountAction
): MyAccountState {
  switch (action.type) {
    case MyAccountActionType.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        pageTitle: action.payload.pageTitle,
      }
    case MyAccountActionType.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      }
    case MyAccountActionType.SHOW_CHANGE_PASS:
      return {
        ...state,
        showChangePass: action.payload.showChangePass,
      }
    case MyAccountActionType.SHOW_CHANGE_NAME:
      return {
        ...state,
        showChangeName: action.payload.showChangeName,
      }
    default:
      return state
  }
}
