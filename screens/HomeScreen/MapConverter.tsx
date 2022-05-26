import { MapData } from "components/MyGroups/MapData"
import { ListGroupsQuery, ListOrganizationsQuery, ListUsersQuery } from "src/API"
export class MapConverter {
  static convertOrgToMapData(
    data: NonNullable<ListOrganizationsQuery["listOrganizations"]>["items"]
  ): MapData[] {
    return data
      ?.map((dataItem) => {
        if (dataItem?.location && dataItem?.location?.latitude && dataItem?.location?.longitude)
          return {
            id: dataItem.id,
            latitude: Number(dataItem.location.latitude) + Number(dataItem.location.randomLatitude),
            longitude:
              Number(dataItem.location.longitude) + Number(dataItem.location.randomLongitude),
            name: dataItem.orgName,
            user: dataItem,
            link: "",
            type: "organization",
          } as MapData
        else return null
      })
      .filter((o) => o) as MapData[]
  }

  static convertEventToMapData(
    data: NonNullable<ListGroupsQuery["listGroups"]>["items"]
  ): MapData[] {
    return data
      ?.map((dataItem) => {
        if (
          dataItem?.location &&
          dataItem?.locationLatLong?.latitude &&
          dataItem?.locationLatLong?.longitude
        )
          return {
            id: dataItem.id,
            latitude:
              Number(dataItem.locationLatLong.latitude) +
              Number(dataItem.locationLatLong.randomLatitude),
            longitude:
              Number(dataItem.locationLatLong.longitude) +
              Number(dataItem.locationLatLong.randomLongitude),
            name: dataItem.name,
            user: dataItem,
            link: "",
            type: "event",
          } as MapData
        else return null
      })
      .filter((o) => o) as MapData[]
  }
  static convertProfileToMapData(
    data: NonNullable<ListUsersQuery["listUsers"]>["items"]
  ): MapData[] {
    return data
      ?.map((dataItem) => {
        if (dataItem?.location && dataItem?.location?.latitude && dataItem?.location?.longitude)
          return {
            id: dataItem.id,
            latitude: Number(dataItem.location.latitude) + Number(dataItem.location.randomLatitude),
            longitude:
              Number(dataItem.location.longitude) + Number(dataItem.location.randomLongitude),
            name: dataItem.given_name + " " + dataItem.family_name,
            user: dataItem,
            link: "",
            type: "profile",
          } as MapData
        else return null
      })
      .filter((o) => o) as MapData[]
  }
}
