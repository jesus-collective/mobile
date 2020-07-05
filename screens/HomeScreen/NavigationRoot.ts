

import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params): void {
    navigationRef.current?.navigate(name, params);
}