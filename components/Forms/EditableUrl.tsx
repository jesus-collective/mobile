import React from "react"
import { StyleProp, TextInput, TextStyle } from "react-native"
import JCButton, { ButtonTypes } from "../Forms/JCButton"
import JCComponent from "../JCComponent/JCComponent"

interface Props {
  value: string
  title: string
  isEditable: boolean
  textStyle: ButtonTypes
  inputStyle?: StyleProp<TextStyle>
  multiline: boolean
  placeholder?: string
  onChange(value: string): void
}

interface State {
  url: string
}

export default class EditableUrlImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      url: props.value,
    }
  }

  render(): JSX.Element | null {
    const {
      onChange,
      isEditable,
      placeholder,
      multiline,
      inputStyle,
      textStyle,
      value,
      title,
    } = this.props
    const { url } = this.state

    if (isEditable) {
      return (
        <TextInput
          onChange={(e) => {
            this.setState({ url: e.nativeEvent.text })
          }}
          onBlur={() => onChange(url)}
          placeholder={placeholder}
          multiline={multiline}
          style={inputStyle}
          value={url}
        />
      )
    }

    if (value) {
      return (
        <JCButton
          buttonType={textStyle}
          onPress={() => {
            window.open(value, "_blank")
          }}
        >
          {title}
        </JCButton>
      )
    }

    return null
  }
}
