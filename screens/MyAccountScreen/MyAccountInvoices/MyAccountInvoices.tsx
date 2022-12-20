import API, { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { ListInvoicesMutation } from "src/API"
import Sentry from "../../../components/Sentry"
import { listInvoices } from "../../../src/graphql-custom/mutations"
type Invoice = NonNullable<
  NonNullable<NonNullable<ListInvoicesMutation>["listInvoices"]>["data"]
>[0]
export default function MyAccountInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getInvoices = async () => {
      setIsLoading(true)
      try {
        const invoices = (await API.graphql({
          query: listInvoices,
          variables: {
            idempotency: "",
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<ListInvoicesMutation>
        console.log({ invoices: invoices.data?.listInvoices?.data })
        setInvoices(invoices.data?.listInvoices?.data ?? [])
      } catch (e: any) {
        Sentry.captureException(e.errors || e)
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }
    getInvoices()
  }, [])
  return (
    <View style={isMobileOnly ? { padding: 12, paddingBottom: 85 } : {}}>
      <Text style={style.Header}>Your Invoices</Text>
      <View style={style.HeaderHorizontalLine} />
      {isLoading ? (
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", marginTop: 12 }}>
          <Text style={[style.SecondaryText, { alignSelf: "center" }]}>
            Loading invoices.. this may take a minute.
          </Text>
          <ActivityIndicator size="large" color="#483938" style={{ marginTop: 12 }} />
        </View>
      ) : (
        invoices.map((item, index) => {
          return <InvoiceItem key={item?.id} item={item} />
        })
      )}
      {}
    </View>
  )
}
const InvoiceItem = ({ item }: { item: Invoice }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginTop: 12,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E4E1E1",
        borderRadius: 4,
        padding: 16,
      }}
    >
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={style.TertiaryText}>
          {moment.unix(parseInt(item?.created ?? "0")).format("ll")}
        </Text>
        <Text style={style.PrimaryText}>
          {item?.currency?.toUpperCase()} {" $" + (parseInt(item?.total ?? "0") / 100).toFixed(2)}
        </Text>
        <Text style={style.SecondaryText}>Invoice {item?.number}</Text>
      </View>
      <TouchableOpacity
        style={{ padding: 4, justifyContent: "center" }}
        onPress={() => {
          if (item?.invoice_pdf) Linking.openURL(item?.invoice_pdf)
        }}
      >
        <Image
          style={{ width: 24, height: 24 }}
          source={require("../../../assets/Facelift/svg/Download.svg")}
        />
      </TouchableOpacity>
    </View>
  )
}
const style = StyleSheet.create({
  Header: {
    color: "#483938",
    fontSize: 12,
    fontFamily: "Graphik-Medium-App",
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingBottom: 6,
  },
  PrimaryText: {
    flex: 1,
    fontFamily: "Graphik-Medium-App",
    fontSize: 15,
    color: "#1A0706",
  },
  SecondaryText: {
    flex: 1,
    fontFamily: "Graphik-Regular-App",
    color: "#6A5E5D",
  },
  TertiaryText: {
    flex: 1,
    textTransform: "uppercase",
    fontFamily: "Graphik-Medium-App",
    fontSize: 12,
    color: "#6A5E5D",
    lineHeight: 16,
    letterSpacing: 1,
  },
  HeaderHorizontalLine: {
    borderTopWidth: 1,
    borderColor: "#E4E1E1",
  },
})
