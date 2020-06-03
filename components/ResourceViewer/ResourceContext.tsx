
import * as React from 'react';
export const ResourceContext = React.createContext({
    actions: {
        createResource: null,
        changeResource: null,
        updateResource: null,
        deleteResource: null,
        updateResourceImage: null,
        changeSeries: null,
        createSeries: null,
        deleteSeries: null,
        updateSeries: null,
        createEpisode: null,
        deleteEpisode: null,
        updateEpisode: null,
        clearSeries: null,
        clearEpisode: null,
        changeEpisode: null
    }, state: null
})
