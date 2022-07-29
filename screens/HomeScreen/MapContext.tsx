import * as React from "react"
import { MapData } from "src/types"
import { JCState } from "../../components/JCComponent/JCComponent"
export interface MapState extends JCState {
  MapItems: MapData[]
}
export interface MapActions {
  reload(): Promise<void>
}

type MapContextType = {
  mapActions: MapActions
  mapState: MapState | undefined
}
export const MapContext = React.createContext<MapContextType>({
  mapActions: {
    reload: async () => {
      return
    },
  },
  mapState: undefined,
})
