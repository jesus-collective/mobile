
import * as React from 'react';
export const ResourceContext = React.createContext({ actions: { 
    createResource: null,
    changeResource: null,
    updateResource: null,
    deleteResource: null
} , state:null})
