import { NavigationProp, RouteProp } from "@react-navigation/native"
import moment from "moment"
import React from "react"
import { Payment } from "src/API"
import { Data } from "../Data/Data"
import EditableText from "../Forms/EditableText"
import EditableUsers, { SearchUser } from "../Forms/EditableUsers"
import JCModal from "../Forms/JCModal"
type PaidUsersModal2Props = {
  visible: boolean
  onClose(): void
  navigation?: NavigationProp<any, any>
  route?: RouteProp<any, any>
  groupId: string
}

export default function PaidUsersModal({ groupId, visible, onClose }: PaidUsersModal2Props) {
  const [paymentsData, setPaymentsData] = React.useState<Payment[]>([])
  const [paymentNote, setPaymentNote] = React.useState<string | null>(null)
  const getPayments = () => {
    console.log("getting payments")
    const listPayments = Data.listPayments({ id: { beginsWith: groupId } })
    listPayments
      .then(({ data, errors }) => {
        setPaymentsData(data?.listPayments?.items as Payment[])
      })
      .catch((data) => {
        console.error({ data })
        setPaymentsData((data?.listPayments?.items as Payment[]) ?? [])
      })
      .finally(() => {
        setPaymentNote(null)
      })
  }
  React.useEffect(getPayments, [groupId])
  const addUser = async (users: SearchUser[]) => {
    console.log({ addingUser: users[0] })
    if (!users.length) return false
    const newUser = users[0]
    const newUserID = newUser?.id
    if (!newUserID) return false
    console.log("id exists", newUserID)
    try {
      // in EditableUsers value is the id of the object being passed
      if (!newUserID || !groupId) return false

      console.log("adding", users[0])
      const addPayment = await Data.createPayment({
        id: groupId + "-" + newUserID,
        productID: groupId,
        userID: newUserID,
        dateCompleted: moment().toString(),
        paymentType: "manual",
        paymentInfo: paymentNote,
      })
      if (!addPayment.data?.createPayment) return false
      console.log({ addPayment })
      return true
    } catch (error) {
      console.error({ "failed to add": error })
      return false
    } finally {
      getPayments()
      setPaymentNote(null)
    }
  }
  const removeUser = async (users: any[]) => {
    // in EditableUsers value is the id of the object being passed
    if (!users.length) return false
    try {
      console.log("removing", users[0])
      const removePayment = await Data.deletePayment(users[0]!.id)
      if (!removePayment.data?.deletePayment) return false
      console.log({ removePayment })

      return true
    } catch (error) {
      console.error({ "failed to remove": error })
      return false
    } finally {
      getPayments()
      setPaymentNote(null)
    }
  }
  return (
    <JCModal unsetOverflow visible={visible} title="Paid Users for this Course" onHide={onClose}>
      <EditableUsers
        limit={1}
        onAdd={(users) => addUser(users)}
        onRemove={(users) => removeUser(users)}
        multiline={false}
        testID="profile-currentRole"
        showProfileImages={true}
        textStyle={{
          fontFamily: "Graphik-Regular-App",
          fontSize: 16,
          lineHeight: 26,
          color: "#333333",
          paddingTop: 6,
          width: "100%",
        }}
        inputStyle={{
          fontFamily: "Graphik-Regular-App",
          fontSize: 16,
          lineHeight: 28,
          letterSpacing: -0.3,
          color: "#333333",
          width: "100%",
          height: 30,
          borderWidth: 0,
          borderColor: "#dddddd",
          overflow: "hidden",
          marginTop: 7,
        }}
        value={paymentsData}
        isEditable={true}
      ></EditableUsers>
      <EditableText
        onChange={(value) => setPaymentNote(value)}
        testID="course-name"
        placeholder="Payment Note(optional)"
        multiline={true}
        textStyle={{ width: "100%" }}
        inputStyle={{ width: "100%" }}
        value={paymentNote ?? ""}
        isEditable={true}
      ></EditableText>
    </JCModal>
  )
}
