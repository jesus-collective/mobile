import { User } from "src/API"

export enum MyAccountActionType {
  SET_PAGE = "SET_PAGE",
  SET_USER = "SET_USER",
  SHOW_CHANGE_PASS = "SHOW_CHANGE_PASS",
  SHOW_CHANGE_NAME = "SHOW_CHANGE_NAME",
}

export enum MyAccountPage {
  "Overview" = "Overview",
  "Invoices" = "Invoices",
  "Notification Settings" = "Notification Settings",
  "Your Organization" = "Your Organization",
}

export type MyAccountState = {
  currentPage?: MyAccountPage | null
  user: User | null
  pageTitle?: string
  showChangePass: boolean
  showChangeName: boolean
}

export type MyAccountAction = {
  type: MyAccountActionType
  payload?: any
}
