import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Storage } from 'aws-amplify';

//import './react-draft-wysiwyg.css';
//import './EditableRichText.css';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import JCComponent from '../JCComponent/JCComponent';

interface Props {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    placeholder?: string,
    onChange?(string)
}
interface State {
    value: string,
    isEditable: boolean,
    isEditMode: boolean,
    textStyle: any,
    inputStyle: any,
    placeholder: string,
    editorState
}
export default class EditableRichText extends JCComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value,
            isEditMode: false,
            isEditable: props.isEditable,
            textStyle: props.textStyle,
            inputStyle: props.inputStyle,
            placeholder: props.placeholder,
            editorState: null
        }
    }
    onChanged(val: any) {

        this.props.onChange(val.target.value)
        this.setState({ isEditMode: false })
    }
    updateEditorInput(value: any) {

        this.setState({ editorState: value })
    }
    updateInput(value: any) {

        this.setState({ value: JSON.stringify(value) },
            this.props.onChange(this.state.value)
        )

    }
    render() {

        if (this.state.isEditable)
            if (this.state.isEditMode)
                return <Editor
                    placeholder="Empty Content"
                    initialContentState={JSON.parse(this.props.value)}
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
                    onBlur={() => { this.setState({ isEditMode: false }) }}
                />

            else
                return <TouchableOpacity onPress={() => { this.setState({ isEditMode: true }) }}>
                    <Editor
                        placeholder="Empty Content"
                        readOnly
                        toolbarHidden
                        initialContentState={JSON.parse(this.props.value)}
                        toolbarClassName="customToolbarRichText"
                        wrapperClassName="customWrapperRichText"
                        editorClassName="customEditorRichText"
                    /></TouchableOpacity>
        else
            return <Editor
                placeholder="Empty Content"
                readOnly
                toolbarHidden
                initialContentState={JSON.parse(this.props.value)}
                toolbarClassName="customToolbarRichText"
                wrapperClassName="customWrapperRichText"
                editorClassName="customEditorRichText"
            />


    }
}