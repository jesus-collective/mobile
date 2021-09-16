import { Storage } from "aws-amplify"
//TODO FIGURE OUT WHY THIS DOESN'T WORK
//import '../MessageBoard.css';
import { ContentState, convertFromRaw, convertToRaw, EditorState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import React from "react"
import { Editor } from "react-draft-wysiwyg"
import { TouchableOpacity } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { v1 as uuidv1 } from "uuid"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
//import './react-draft-wysiwyg.css';
//import './EditableRichText.css';
import "./react-draft-wysiwyg.css"

export enum RichTextStyle {
  Default,
  resourceRichTextH1,
  resourceRichTextH2,
  resourceRichTextH3,
  resourceRichTextH4,
  resourceRichTextBody1,
  resourceRichTextBody2,
  resourceRichTextBody3,
  resourceRichTextBody4,
  resourceRichTextEdit,
}

interface Props {
  value: string | null
  isEditable: boolean
  textStyle?: React.CSSProperties
  inputStyle?: any
  placeholder?: string
  onChange?(value: string): void
  toolBar?: any
  testID?: string
}
interface State extends JCState {
  value: string | null
  isEditMode: boolean
  // textStyle: any,
  // inputStyle: any,
  //placeholder: string,
  editorState: EditorState
}

const emptyEditor = () => {
  return {
    json: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
    state: EditorState.createWithContent(
      convertFromRaw(
        JSON.parse(JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())))
      )
    ),
  }
}

export default class EditableRichText extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    let initial, initialValue
    try {
      initialValue = props.value
      initial = EditorState.createWithContent(convertFromRaw(JSON.parse(props.value)))
    } catch {
      const { json, state } = emptyEditor()
      initialValue = json
      initial = state
    }

    this.state = {
      ...super.getInitialState(),
      value: initialValue,
      isEditMode: false,

      //textStyle: props.textStyle,
      //inputStyle: props.inputStyle,
      // placeholder: props.placeholder,
      editorState: initial,
    }
  }
  componentDidUpdate(prevProps: Props): void {
    if (prevProps.value !== this.props.value) {
      try {
        const editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(this.props.value))
        )
        this.setState({
          value: this.props.value,
          editorState,
        })
      } catch {
        const { json: value, state: editorState } = emptyEditor()
        this.setState({ value, editorState })
      }
    }
  }

  onChanged(val: string): void {
    if (this.props.onChange) {
      this.props.onChange(val)
      this.setState({ isEditMode: false })
    }
  }
  updateEditorInput(value: any): void {
    this.setState({ editorState: value })
  }
  updateInput(value: any): void {
    this.setState(
      { value: JSON.stringify(value) }
      // this.props.onChange(this.state.value)
    )
  }
  convertDraftToHtml = (contentState: ContentState): string => {
    const raw = convertToRaw(contentState)
    try {
      return draftToHtml(raw)
    } catch (e) {
      console.log({ Error: e })
      return "<div>Message Can't Be Displayed</div>"
    }
  }
  render(): React.ReactNode {
    if (this.props.isEditable)
      if (this.state.isEditMode)
        return (
          <Editor
            webDriverTestID={this.props.testID + "-editor"}
            placeholder={this.props.placeholder ?? "Empty Content"}
            initialContentState={ContentState.createFromText(this.state.value)}
            editorState={this.state.editorState}
            toolbarClassName="customToolbarRichText"
            wrapperClassName="customWrapperRichTextEdit"
            editorClassName="customEditorRichTextEdit"
            onEditorStateChange={(z) => {
              this.updateEditorInput(z)
            }}
            onContentStateChange={(z) => {
              this.updateInput(z)
            }}
            toolbar={
              this.props.toolBar ?? {
                options: ["inline", "list", "colorPicker", "link", "emoji", "image", "history"],
                inline: {
                  options: ["bold", "italic", "underline", "strikethrough"],
                },
                list: {
                  options: ["unordered", "ordered"],
                },
                image: {
                  uploadCallback: async (z1) => {
                    const id = uuidv1()

                    const download = await Storage.get("messages/" + id + ".png", {
                      level: "protected",
                      contentType: z1.type,
                      identityId: "",
                    })
                    return { data: { link: download } }
                  },
                  previewImage: true,
                  alt: { present: true, mandatory: true },
                  defaultSize: {
                    height: "auto",
                    width: "auto",
                  },
                },
              }
            }
            onBlur={() => {
              this.onChanged(
                JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
              )
            }}
          />
        )
      else {
        return (
          <TouchableOpacity
            testID={this.props.testID + "-holdToEdit"}
            onPress={() => {
              this.setState({ isEditMode: true })
            }}
          >
            <div id="comment-div" style={{ width: "100%" }}>
              {!convertFromRaw(JSON.parse(this.state.value)).hasText() ||
              this.state.value == null ? (
                <div
                  style={{
                    fontFamily: "Graphik-Bold-App",
                    fontWeight: "bold",
                    fontSize: 16,
                    marginTop: 0,
                    color: "#F0493E",
                    textDecoration: "underline",
                  }}
                >
                  Hold to Edit
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.convertDraftToHtml(this.state.editorState.getCurrentContent()),
                  }}
                  style={{
                    fontFamily: "Graphik-Regular-App",
                    fontSize: "16px",
                    lineHeight: "26px",
                    color: "#333333",
                    marginTop: 0,
                    paddingTop: 0,
                    paddingRight: "30px",
                    minHeight: 50,
                  }}
                ></div>
              )}
            </div>
          </TouchableOpacity>
        )
      }
    else {
      return (
        <div id="comment-div">
          <div
            dangerouslySetInnerHTML={{
              __html: this.convertDraftToHtml(this.state.editorState.getCurrentContent()),
            }}
            style={
              this.props.textStyle
                ? EStyleSheet.flatten(this.props.textStyle)
                : {
                    fontFamily: "Graphik-Regular-App",
                    fontSize: "16px",
                    lineHeight: "26px",
                    color: "#333333",
                    marginTop: 0,
                    paddingTop: 0,
                    minHeight: 50,
                    paddingRight: 15,
                  }
            }
          ></div>
        </div>
      )
    }
  }
}
