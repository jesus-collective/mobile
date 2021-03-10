import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { useNavigation, useRoute } from "@react-navigation/native"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import moment from "moment"
import React from "react"
import { Text, View } from "react-native"
import EditableText from "../../components/Forms/EditableText"
import EditableUsers from "../../components/Forms/EditableUsers"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import { ListPaymentsQuery, SearchUsersQuery } from "../../src/API"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import JCComponent from "../JCComponent/JCComponent"

interface Props {
  visible: boolean
  onClose(): void
  navigation?: any
  route?: any
  groupId: string
}
interface State {
  data: NonNullable<NonNullable<GraphQLResult<ListPaymentsQuery>["data"]>["listPayments"]>["items"]
  users: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
  paymentNote: string
}
class PaidUsersModalImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  componentDidMount() {
    this.setInitialData()
  }
  setInitialData() {
    const listPayment = API.graphql({
      query: queries.listPayments,
      variables: { filter: { id: { beginsWith: this.props.groupId } } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListPaymentsQuery>>
    listPayment
      .then((json) => {
        console.log(json)
        this.setState({
          data: json.data?.listPayments?.items ?? [],
          users: null,
          paymentNote: null,
        })
      })
      .catch((json) => {
        this.setState({
          data: json.data?.listPayments?.items ?? [],
          users: null,
          paymentNote: null,
        })
        console.log({ error: json })
      })
  }
  addUser() {
    if (this.state.users) {
      const addPayment = API.graphql({
        query: mutations.createPayment,
        variables: {
          input: {
            id: this.props.groupId + "-" + this.state.users[0]!.id,
            productID: this.props.groupId,
            userID: this.state.users[0]!.id,
            dateCompleted: moment().toString(),
            paymentType: "manual",
            paymentInfo: this.state.paymentNote,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<ListPaymentsQuery>>
      addPayment
        .then((json) => {
          this.setInitialData()
        })
        .catch((json) => {
          this.setInitialData()
        })
    }
  }
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
          {this.state.data?.map((item) => {
            return (
              <View key={item?.id}>
                <Text style={{ fontWeight: "bold" }}>
                  {item?.user?.given_name ?? ""} {item?.user?.family_name ?? ""}
                </Text>
                <Text style={{ fontWeight: "bold" }}>{item?.user?.email ?? ""}</Text>
              </View>
            )
          })}
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
            value={this.state.users ? this.state.users : []}
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
            value={this.state.paymentNote}
            isEditable={true}
          ></EditableText>
          <JCButton
            testID="course-purchase"
            buttonType={ButtonTypes.courseMktOutlineBoldNoMargin}
            onPress={() => {
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
