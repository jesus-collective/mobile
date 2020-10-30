

import * as React from 'react';
import { NavigationContainerRef, Route } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function getRoot(): Route<string, object | undefined> | undefined {
    return navigationRef.current?.getCurrentRoute()
}
export function navigate(name: string, params: object): void {
    navigationRef.current?.navigate(name, params);
}
export function dispatch(a: any): any {
    return navigationRef.current?.dispatch(a)
}

