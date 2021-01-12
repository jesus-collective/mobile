import { Ionicons } from "@expo/vector-icons"
import { Auth, Storage } from "aws-amplify"
import React from "react"
import { ActivityIndicator, Image, View } from "react-native"
import { ImageInput } from "src/API"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import { ResourceContext } from "./ResourceContext"
interface Props {
  fileName: string
  currentImage: ImageInput | null | undefined
  onUpdate(image: ImageInput): void
}
interface State extends JCState {
  uploading: boolean
  imageUrl: any
}
class ResourceImage extends JCComponent<Props, State> {
  static Consumer = ResourceContext.Consumer
  constructor(props: Props) {
    super(props)
    this.getImage()
  }
  componentDidMount() {
    this.getImage()
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.currentImage?.filenameUpload != this.props.currentImage?.filenameUpload)
      this.getImage()
  }
  async getImage(): Promise<void> {
    if (this.props.currentImage != null && this.props.currentImage?.filenameUpload != null) {
      const z = await Storage.get(this.props.currentImage?.filenameUpload, {
        level: "protected",
        contentType: "image/png",
        identityId: this.props.currentImage?.userId,
      })
      this.setState({ imageUrl: z })
    }
  }
  render() {
    return (
      <View style={{ alignSelf: 'center' }}>
        {this.state.uploading ? (
          <ActivityIndicator />
        ) : (
          <>
            <JCButton
              buttonType={ButtonTypes.Transparent}
              onPress={() => {
                null
              }}
            >
              {this.state.imageUrl ? (
                <Image
                  width={64}
                  height={64}
                  style={{ height: 64, width: 64 }}
                  source={this.state.imageUrl}
                ></Image>
              ) : (
                <Ionicons size={32} name="ios-image" style={this.styles.style.resourceImageIcon} />
              )}
            </JCButton>
            <input
              style={{
                fontSize: 200,
                position: "absolute",
                top: "0px",
                right: "0px",
                opacity: "0",
              }}
              type="file"
              accept="image/*"
              onChange={async (e) => {
                this.setState({ uploading: true })
                console.log("Uploading")
                if (e.target.files) {
                  const file = e.target.files[0]
                  const lastDot = file.name.lastIndexOf(".")
                  const ext = file.name.substring(lastDot + 1)
                  const user = await Auth.currentCredentials()
                  const userId = user.identityId
                  const fn = this.props.fileName + new Date().getTime() + "-upload." + ext

                  console.log({ filename: fn })

                  const fnSave = fn
                    .replace("/upload", "")
                    .replace("-upload.", "-[size].")
                    .replace("." + ext, ".png")

                  console.log("putting")
                  await Storage.put(fn, file, {
                    level: "protected",
                    contentType: file.type,
                    identityId: userId,
                  })
                    .then(() => {
                      console.log("getting")
                      return Storage.get(fn, {
                        level: "protected",
                        identityId: userId,
                      }).then((result2) => {
                        console.log({ fileInfo: result2 })
                        const image = {
                          userId: userId,
                          filenameUpload: fn,
                          filenameLarge: fnSave.replace("[size]", "large"),
                          filenameMedium: fnSave.replace("[size]", "medium"),
                          filenameSmall: fnSave.replace("[size]", "small"),
                        }
                        this.props.onUpdate(image)
                        this.setState({ uploading: false })
                        //this.updatePageItem(menuItemIndex, pageItemIndex, tempPageItems)
                      })

                      // console.log(result)
                    })
                    .catch((err) => {
                      this.setState({ uploading: false })
                      console.log(err)
                    })
                }
              }}
            />
          </>
        )}
      </View>
    )
  }
}
export default ResourceImage
