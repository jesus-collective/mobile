import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import moment from "moment"
import React from "react"
import { View } from "react-native"
import { Data } from "../../components/Data/Data"
import EditableText from "../../components/Forms/EditableText"
import EditableUsers, { SearchUser } from "../../components/Forms/EditableUsers"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import { ListPaymentsQuery } from "../../src/API"
import JCComponent from "../JCComponent/JCComponent"

interface Props {
  visible: boolean
  onClose(): void
  navigation?: NavigationProp<any, any>
  route?: any
  groupId: string
}
interface State {
  data: NonNullable<NonNullable<GraphQLResult<ListPaymentsQuery>["data"]>["listPayments"]>["items"]
  users: SearchUser[]
  paymentNote: string | null
}
class PaidUsersModalImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: [],
      users: [],
      paymentNote: null,
    }
  }
  componentDidMount() {
    this.setInitialData()
  }
  setInitialData() {
    const listPayment = Data.listPayments({ id: { beginsWith: this.props.groupId } })
    listPayment
      .then((json) => {
        console.log(json)
        this.setState({
          data: json.data?.listPayments?.items ?? [],
          users: [],
          paymentNote: null,
        })
      })
      .catch((json) => {
        this.setState({
          data: json.data?.listPayments?.items ?? [],
          users: [],
          paymentNote: null,
        })
        console.log({ error: json })
      })
  }
  async addUser() {
    if (this.state.users) {
      for await (const user of this.state.users) {
        try {
          console.log("adding", this.props.groupId + "-" + this.state.users[0]!.id)
          const addPayment = await Data.createPayment({
            id: this.props.groupId + "-" + this.state.users[0]!.id,
            productID: this.props.groupId,
            userID: this.state.users[0]!.id,
            dateCompleted: moment().toString(),
            paymentType: "manual",
            paymentInfo: this.state.paymentNote,
          })
          console.log({ addPayment })
          this.setInitialData()
        } catch (error) {
          console.log("could not add ", user?.given_name + " " + user?.family_name)
          this.setInitialData()
        }
      }
    }
    console.log(this.state.users)
  }
  // async removeUser() {
  //   if(this.state.users) {
  //     for await (const user of this.state.users) {
  //       try {
  //         console.log("removing", this.props.groupId + "-" + this.state.users[0]!.id)
  //         const removePayment = await Data.deletePayment(
  //           this.props.groupId + "-" + this.state.users[0]!.id,
  //         )
  //       console.log({removePayment})
  //         this.setInitialData()
  //       } catch (error) {
  //         console.log("could not remove ", user?.given_name + " " + user?.family_name)
  //         this.setInitialData()
  //       }
  //     }
  //   }
  // }
  render() {
    return (
      <JCModal
        visible={this.props.visible}
        title="Paid Users for this Course"
        onHide={() => {
          this.props.onClose()
        }}
      >
        <View>
          <EditableUsers
            limit={1}
            onChange={(value) => {
              this.setState({ users: value })
            }}
            multiline={false}
            testID="profile-currentRole"
            showProfileImages={true}
            textStyle={this.styles.style.fontFormSmallDarkGrey}
            inputStyle={this.styles.style.fontFormLargeInput}
            value={this.state.data}
            isEditable={true}
          ></EditableUsers>
          <EditableText
            onChange={(value) => {
              this.setState({ paymentNote: value })
            }}
            testID="course-name"
            placeholder="Payment Note"
            multiline={true}
            textStyle={this.styles.style.courseMktNameInput}
            inputStyle={this.styles.style.courseMktNameInput}
            value={this.state.paymentNote ?? ""}
            isEditable={true}
          ></EditableText>
          <JCButton
            testID="course-purchase"
            buttonType={ButtonTypes.courseMktOutlineBoldNoMargin}
            onPress={() => {
              console.log("add users")
              this.addUser()
            }}
          >
            Add User
          </JCButton>
        </View>
      </JCModal>
    )
  }
}

export default function PaidUsersModal(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <PaidUsersModalImpl {...props} navigation={navigation} route={route} />
}
