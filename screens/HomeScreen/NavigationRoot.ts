import { NavigationContainerRef, Route } from "@react-navigation/native"
import * as React from "react"
type RouteOut = { brand: string }
export const navigationRef = React.createRef<NavigationContainerRef<any>>()

export function getRoot(): Route<string, RouteOut | undefined> | undefined {
  return navigationRef.current?.getCurrentRoute() as any
}
export function navigate(name: string, params: any): void {
  navigationRef.current?.navigate(name, params)
}
export function dispatch(a: any): any {
  return navigationRef.current?.dispatch(a)
}
