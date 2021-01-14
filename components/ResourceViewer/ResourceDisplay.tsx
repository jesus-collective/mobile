import React from "react"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import { ResourcePageItemStyle, ResourcePageItemType } from "../../src/API"
import ResourceContent from "./ResourceContent"
import { ResourceContext } from "./ResourceContext"

interface Props {
  displayResource?: string
  displaySeries?: string
  displayEpisode?: string
}
interface State extends JCState {}
class ResourceDisplay extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
    }
  }
  generateRichText(str: string): string {
    return (
      '{"blocks":[{"key":"5r4ij","text":"' +
      str +
      '","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    )
  }
  render() {
    return (
      <ResourceDisplay.Consumer>
        {({ resourceState, resourceActions }) => {
          let title, subTitle, description: string
          const resource = resourceActions.getResourceByID(this.props.displayResource)
          const series = resourceActions.getSeriesByID(
            this.props.displayResource,
            this.props.displaySeries
          )
          const episode = resourceActions.getEpisodeByID(
            this.props.displayResource,
            this.props.displaySeries,
            this.props.displayEpisode
          )
          if (episode != null) {
            title = episode?.title ?? ""
            subTitle = series?.title ?? ""
            description = episode?.description ?? ""
          } else if (series != null) {
            title = series?.title ?? ""
            subTitle = resource?.title ?? ""
            description = series.description ?? ""
          } else {
            title = resource?.title ?? ""
            subTitle = ""
            description = resource?.description ?? ""
          }
          return (
            <ResourceContent
              hideEditButton={true}
              pageItemIndex={[]}
              isBase={false}
              pageItems={[
                {
                  type: ResourcePageItemType.Column,
                  style: ResourcePageItemStyle.Column3070,
                  pageItemsLeft: [
                    {
                      type: ResourcePageItemType.Menu,
                      style: ResourcePageItemStyle.MenuLeft,
                    },
                  ],
                  pageItemsRight: [
                    {
                      type: ResourcePageItemType.RichText,
                      title1: this.generateRichText(title),
                      style: ResourcePageItemStyle.RichTextH1,
                    },
                    {
                      type: ResourcePageItemType.RichText,
                      title1: this.generateRichText(subTitle),
                      style: ResourcePageItemStyle.RichTextH2,
                    },
                    {
                      type: ResourcePageItemType.RichText,
                      title1: this.generateRichText(description),
                      style: ResourcePageItemStyle.RichTextBody1,
                    },
                    {
                      type: ResourcePageItemType.DropDownPicker,
                      title1: "Options",
                      style: ResourcePageItemStyle.RichTextBody1,
                      resourceID: this.props.displayResource,
                      seriesID: this.props.displaySeries,
                      episodeID: this.props.displayEpisode,
                    },
                    {
                      type: ResourcePageItemType.Grid,
                      resourceID: this.props.displayResource,
                      seriesID: this.props.displaySeries,
                      episodeID: this.props.displayEpisode,
                    },
                  ],
                },
              ]}
            ></ResourceContent>
          )
        }}
      </ResourceDisplay.Consumer>
    )
  }
}

export default ResourceDisplay
