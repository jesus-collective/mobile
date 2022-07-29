import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import moment from "moment"
import React from "react"
import { Text, View } from "react-native"
import EditableText from "../Forms/EditableText"
import JCComponent from "../JCComponent/JCComponent"
interface Props {
  groupData: any
  navigation?: NavigationProp<any, any>
  route?: any
}
class CourseHeaderImpl extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  render(): React.ReactNode {
    return this.props.groupData ? (
      <View style={this.styles.style.courseHeaderContainer}>
        <Text style={this.styles.style.fontCourseHeaderTime}>
          {moment(this.props.groupData.time).format("MMMM Do YYYY")} - {this.props.groupData.length}
        </Text>
        <EditableText
          multiline={false}
          textStyle={this.styles.style.fontCourseHeaderBold}
          value={this.props.groupData.name}
          isEditable={false}
        ></EditableText>
        <Text style={this.styles.style.fontCourseHeader}>Course</Text>
        <EditableText
          multiline={true}
          textStyle={this.styles.style.fontCourseHeaderDescription}
          value={this.props.groupData.description}
          isEditable={false}
        ></EditableText>
      </View>
    ) : null
  }
}

export default function CourseHeader(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <CourseHeaderImpl {...props} navigation={navigation} route={route} />
}
