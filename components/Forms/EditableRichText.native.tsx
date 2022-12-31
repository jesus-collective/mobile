//import './react-draft-wysiwyg.css';
//import './EditableRichText.css';
//import './react-draft-wysiwyg.css';
//TODO FIGURE OUT WHY THIS DOESN'T WORK
//import '../MessageBoard.css';
import JCComponent, { JCState } from "../JCComponent/JCComponent"

interface Props {
  value: string
  isEditable: boolean
  textStyle: any
  inputStyle?: any
  placeholder?: string
  onChange?(value: string): void
  toolBar?: any
}
interface State extends JCState {
  value: string

  isEditMode: boolean
  // textStyle: any,
  // inputStyle: any,
  //placeholder: string,
  //editorState
}
export default class EditableRichText extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      value: props.value,
      isEditMode: false,

      //textStyle: props.textStyle,
      //inputStyle: props.inputStyle,
      // placeholder: props.placeholder??"",
      // editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(props.value)))
    }
  }
  componentDidUpdate(prevProps: Props): void {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value,
        //  editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.value)))
      })
    }
  }
  onChanged(val: any): void {
    if (this.props.onChange) {
      this.props.onChange(val)
      this.setState({ isEditMode: false })
    }
  }
  updateEditorInput(value: any): void {
    // this.setState({ editorState: value })
  }
  updateInput(value: any): void {
    this.setState(
      { value: JSON.stringify(value) }
      // this.props.onChange(this.state.value)
    )
  }
  render(): React.ReactNode {
    return <></>
  }
}
