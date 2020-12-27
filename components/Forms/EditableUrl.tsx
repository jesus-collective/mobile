import { useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { TextInput } from "react-native"
import JCButton, { ButtonTypes } from "../Forms/JCButton"
import JCComponent from "../JCComponent/JCComponent"

interface Props {
  value: string
  title: string
  isEditable: boolean
  textStyle: ButtonTypes
  inputStyle?: any
  multiline: boolean
  placeholder?: string
  onChange?(value: string): void
  navigation?: any
  route?: any
}
class EditableUrlImpl extends JCComponent<Props> {
  onChanged(val: any) {
    if (this.props.onChange) this.props.onChange(val.target.value)
  }
  navigate(id: string) {
    // window.location.href = id
    window.open(this.props.value, "_blank")
  }
  render() {
    if (this.props.isEditable)
      return (
        <TextInput
          onChange={(value) => {
            this.onChanged(value)
          }}
          placeholder={this.props.placeholder}
          multiline={this.props.multiline}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponderCapture={() => true}
          onStartShouldSetResponderCapture={() => true}
          onMoveShouldSetResponder={() => true}
          style={this.props.inputStyle}
          value={this.props.value}
        ></TextInput>
      )
    else
      return this.props.value && this.props.value != "" ? (
        <JCButton
          buttonType={this.props.textStyle}
          onPress={() => {
            this.navigate(this.props.value)
          }}
        >
          {this.props.title}
        </JCButton>
      ) : null
  }
}

export default function EditableUrl(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <EditableUrlImpl {...props} navigation={navigation} route={route} />
}
