import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Storage } from 'aws-amplify';

//import './react-draft-wysiwyg.css';
//import './EditableRichText.css';
import './react-draft-wysiwyg.css';
//TODO FIGURE OUT WHY THIS DOESN"T WORK
//import '../MessageBoard.css';
import { EditorState } from 'draft-js';
import { Text } from 'react-native'
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import JCComponent, { JCState } from '../JCComponent/JCComponent';
import { ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

interface Props {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    placeholder?: string,
    onChange?(string)
}
interface State extends JCState {
    value: string,
    isEditable: boolean,
    isEditMode: boolean,
    textStyle: any,
    inputStyle: any,
    placeholder: string,
    wordCount: number,
    editorState
}
export default class EditableRichText extends JCComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...super.getInitialState(),
            value: props.value,
            isEditMode: false,
            isEditable: props.isEditable,
            textStyle: props.textStyle,
            inputStyle: props.inputStyle,
            placeholder: props.placeholder,
            wordCount: 0,
            editorState: null
        }
    }
    componentDidUpdate(prevProps: Props): void {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value })
        }
    }
    onChanged(val: any): void {

        this.props.onChange(val)
        this.setState({ isEditMode: false })
    }
    updateEditorInput(value: any): void {
        const str = value.getCurrentContent().getPlainText(' ')
        const wordArray = str.match(/\S+/g);  // matches words according to whitespace
        this.setState({
            editorState: value,
            wordCount: wordArray ? wordArray.length : 0
        })
    }
    updateInput(value: any): void {

        this.setState({ value: JSON.stringify(value) }
            // this.props.onChange(this.state.value)
        )

    }
    convertCommentFromJSONToHTML = (text: string): string => {
        try {
            return stateToHTML(convertFromRaw(JSON.parse(text)))
        } catch (e) {
            console.log({ errorMessage: e })
            return "<div>Message Can't Be Displayed</div>"
        }
    }
    render(): React.ReactNode {

        if (this.state.isEditable)
            if (this.state.isEditMode)
                return (
                    <>
                        <Editor
                            placeholder="Empty Content"
                            initialContentState={ContentState.createFromText(this.state.value)}
                            editorState={this.state.editorState}
                            toolbarClassName="customToolbarRichText"
                            wrapperClassName="customWrapperRichTextEdit"
                            editorClassName="customEditorRichTextEdit"
                            onEditorStateChange={(z) => { this.updateEditorInput(z) }}
                            onContentStateChange={(z) => { this.updateInput(z) }}
                            toolbar={{
                                options: ['inline', 'list', 'colorPicker', 'link', 'emoji', 'image', 'history'],
                                inline: {
                                    options: ['bold', 'italic', 'underline', 'strikethrough']
                                },
                                list: {
                                    options: ['unordered', 'ordered']
                                },
                                image: {
                                    uploadCallback: async (z1) => {
                                        const id = uuidv1()

                                        const download = await Storage.get("messages/" + id + ".png", {
                                            level: 'protected',
                                            contentType: z1.type,
                                            identityId: ""
                                        })
                                        return { data: { link: download } }
                                    },
                                    previewImage: true,
                                    alt: { present: true, mandatory: true },
                                    defaultSize: {
                                        height: 'auto',
                                        width: 'auto',
                                    }
                                }
                            }}
                            onBlur={() => { this.onChanged(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))); }}
                        />
                        <Text>Word count: {this.state.wordCount}</Text>
                    </>
                )

            else
                return <TouchableOpacity onPress={() => { this.setState({ isEditMode: true }) }}>
                    <div id="comment-div">
                        {console.log(convertFromRaw(JSON.parse(this.state.value)).hasText())}
                        {!convertFromRaw(JSON.parse(this.state.value)).hasText() || this.state.value == null ?
                            <div style={{ fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 16, marginTop: 0, color: '#F0493E', textDecoration: 'underline' }}>Hold to Edit</div>
                            :
                            <div
                                dangerouslySetInnerHTML={{ __html: this.convertCommentFromJSONToHTML(this.props.value) }}
                                style={{ fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 26, color: "#333333", marginTop: 0, paddingTop: 0 }}></div>}
                    </div>
                </TouchableOpacity>
        else
            return <div id="comment-div" style={{}}>
                <div dangerouslySetInnerHTML={{ __html: this.convertCommentFromJSONToHTML(this.state.value) }} style={{ fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 26, color: "#333333", marginTop: 0, paddingTop: 0, height: 250 }}></div>
            </div>


    }
}