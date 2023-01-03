import { AntDesign } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import {
  loadStripe,
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from "@stripe/stripe-js"
import { Mutex } from "async-mutex"
import { Amplify, Auth } from "aws-amplify"
import onlyLastPromise, { DiscardSignal } from "only-last-promise"
import React, { useContext, useEffect, useReducer, useState } from "react"
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { JCCognitoUser } from "src/types"
import { v4 as uuidv4 } from "uuid"
import { Data } from "../../components/Data/Data"
import EditableRichText from "../../components/Forms/EditableRichText"
import EditableText from "../../components/Forms/EditableText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import Sentry from "../../components/Sentry"
import { UserActions, UserContext, UserState } from "../../screens/HomeScreen/UserContext"
import { GetUserQuery, ListProductsQuery, StripeInvoice, StripePriceDetail } from "../../src/API"
import awsConfig from "../../src/aws-exports"
import { Brand } from "../../src/Brand"
import "./CardSectionStyles.css"
import HandleStripePayment from "./HandleStripePayment"

const wrapper = onlyLastPromise()

const wrappedPreviewInvoice = async (invoiceData: any) => {
  console.log({ invoiceData: invoiceData })
  try {
    return await wrapper(Data.previewInvoice(invoiceData))
  } catch (error) {
    if (!(error instanceof DiscardSignal)) {
      throw error
    }
  }
}

Amplify.configure(awsConfig)
const handleInputMutex = new Mutex()
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

//type KeysOfType<T, U> = { [k in keyof T]: T[k] extends U ? k : never }[keyof T]
type Products = NonNullable<ListProductsQuery["listProducts"]>["items"]
type Product = NonNullable<Products>[0]
interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
  authState?: string
}

type OrderType = {
  isEditable: string[][]
  quantities: number[][]
  currentProduct: Products
  coupon: string
}

function BillingImpl(props: Props) {
  const [order, setOrder] = useReducer(
    (state: OrderType, newState: OrderType) => ({ ...state, ...newState }),
    {
      isEditable: [[]],
      quantities: [[]],
      currentProduct: [],
      coupon: "",
    }
  )
  const styles = StyleSheet.create({
    flexRow: {
      flexDirection: "row",
      marginTop: 10,
    },
    SignUpScreenSetupTextSmaller: {
      fontFamily: "Graphik-Regular-App",
      textAlign: "center",
      width: "100%",
      fontSize: 18,
      lineHeight: 30,
      marginBottom: 8,
    },
    /* SignUpScreenSetupTextSmaller: {
          lineHeight: 24,
        },*/
    signUpScreen1PaymentColumn1:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { position: "absolute", left: "7.5%", width: "100%", top: "40vh", height: "100%" }
        : { marginLeft: 20, marginRight: 20, left: "0%" },
    SignUpScreenSetupText: {
      fontFamily: "Graphik-Medium-App",
      textAlign: "center",
      width: "50%",
      fontSize: 28,
      lineHeight: 33,
      marginBottom: 8,
      left: "16rem",
      position: "relative",
    },
    fontFormSmallDarkGreyCourseTopEditable: {
      fontFamily: "Graphik-Regular-App",
      fontSize: 40,
      lineHeight: 55,
      color: "#333333",
      paddingTop: 30,
      width: "100%",
      marginBottom: 15,
    },
    signUpScreen1PaymentColumn1Form:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { position: "absolute", left: "35%", width: "25%", top: 100, height: "100%" }
        : { marginLeft: 20, marginRight: 20 },
    signUpScreen1PaymentColumn2:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { position: "absolute", left: "70%", width: "25%", top: 100, height: "100%" }
        : {},

    fontFormSmallDarkGrey: {
      fontFamily: "Graphik-Regular-App",
      fontSize: 16,
      lineHeight: 26,
      color: "#333333",
      paddingTop: 6,
      width: "100%",
    },
    fontFormMandatory: {
      fontFamily: "Graphik-Regular-App",
      fontSize: 26,
      lineHeight: 33,
      color: "#F0493E",
    },
    fontFormSmall: {
      fontFamily: "Graphik-Regular-App",
      fontSize: 12,
      lineHeight: 21,
      textTransform: "uppercase",
      color: "#333333",
      opacity: 0.5,
      marginTop: 10,
    },
  })
  /*  const [isEditable, setIsEditable] = useState<string[][]>([[]])
  const [quantities, setQuantities] = useState<number[][]>([[]])
  const [currentProduct, setCurrentProduct] = useState<Products>([])
*/
  const [invoice, setInvoice] = useState<StripeInvoice | null>()
  const [userData, setUserData] = useState<NonNullable<GetUserQuery>["getUser"]>()
  const [showSubscriptionSelector, setShowSubscriptionSelector] = useState<boolean>(false)
  const [products, setProducts] = useState<Products>([])
  const [stripeValidation, setStripeValidation] = useState<any>({
    cardNumber: false,
    expiryDate: false,
    cvc: false,
  })
  const [showEULA, setShowEULA] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | undefined>("")
  const [invoiceQueue, setInvoiceQueue] = useState<Array<Promise<any>>>([])
  const [idempotency, setIdempotency] = useState<string>(uuidv4())
  const [processing, setProcessing] = useState<"entry" | "processing" | "complete">("entry")
  const [validatingUser, setValidatingUser] = useState<boolean>(false)
  const [freeDays, setFreeDays] = useState<number>(30)
  const [eula, setEula] = useState<boolean>(false)
  const [brand, setBrand] = useState(Brand())
  const [joinedProduct, setJoinedProduct] = useState<string[]>(
    props.route?.params?.joinedProduct
      ? props.route?.params?.joinedProduct == "null"
        ? []
        : props.route?.params?.joinedProduct.split(",")
      : []
  )
  useEffect(() => {
    createInvoice()
  }, [order])
  useEffect(() => {
    console.log({ brand: Brand })
    console.log({ joinedProduct: joinedProduct })
    setInitialData()
  }, [])

  const setInitialData = async (): Promise<void> => {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      const getUser = await Data.getUser(user["username"])
      if (getUser.data) {
        setUserData(getUser.data.getUser)
        console.log({ USER: getUser.data?.getUser })
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log({ UserError: e })
    }
    try {
      const listProducts = await Data.listProducts({
        enabled: { eq: "true" },
        isLogin: { eq: "true" },
      })
      if (listProducts.data?.listProducts) setProducts(listProducts.data.listProducts.items)
      if (order.currentProduct?.length == 0)
        if (joinedProduct.length == 0) {
          if (listProducts.data?.listProducts?.items) {
            console.log({ items: listProducts.data?.listProducts?.items })
            setOrder({
              currentProduct: [
                listProducts.data.listProducts.items.filter((e) => {
                  return e?.isDefault == true
                })[0],
              ],
              quantities: [
                listProducts.data.listProducts.items
                  .filter((e) => {
                    return e?.isDefault == true
                  })[0]
                  ?.tiered?.map((e) => e?.defaultAmount ?? 1) ?? [],
              ],
              isEditable: [
                listProducts.data.listProducts.items
                  .filter((e) => {
                    return e?.isDefault == true
                  })[0]
                  ?.tiered?.map((e) => e?.amountIsEditable ?? "false") ?? [],
              ],
              coupon: order.coupon,
            })
            console.log({ item0: listProducts.data.listProducts.items[0] })
          }
        } else {
          if (listProducts.data?.listProducts?.items) {
            const productIds = listProducts.data.listProducts.items
              .map((x) => x?.id ?? "")
              .filter((x) => joinedProduct.includes(x))
            const products = listProducts.data.listProducts.items.filter((x) =>
              productIds.includes(x?.id ?? "")
            )
            setOrder({
              currentProduct: products,
              quantities: [products[0]?.tiered?.map((e) => e?.defaultAmount ?? 1) ?? []],
              isEditable: [products[0]?.tiered?.map((e) => e?.amountIsEditable ?? "false") ?? []],
              coupon: order.coupon,
            })
          }
        }
    } catch (err) {
      Sentry.captureException(err)
      console.error(err)
    }
  }
  const createStripeUser = async () => {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      console.log(user)
      const customer = await Data.createStripeCustomer({
        idempotency: idempotency,
        firstName: user?.attributes?.given_name,
        lastName: user?.attributes?.family_name,
        email: user?.attributes?.email,
        phone: user?.attributes?.phone_number,
        orgName: user?.attributes!["custom:orgName"],
        billingAddress: userData?.billingAddress,
      })
      console.log({ customer: customer })
      //customerId = customer.data.createCustomer.customer.id;
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  const getOneOffPriceItems = (): StripePriceDetail[] => {
    const priceItems = order.currentProduct
      ?.map((item, index: number) => {
        const priceItems2 = item?.tiered?.map((item2, index2: number) => {
          if (item2?.isSubscription) return undefined
          return {
            price: item2?.stripePaymentID,
            quantity: order.quantities[index][index2],
          } as StripePriceDetail
        })
        return priceItems2
      })
      .flat()
    console.log({ priceItems: priceItems })
    if (priceItems == undefined) return []
    return priceItems
      .filter((x) => x != undefined && (x.quantity ?? 0) > 0)
      .filter((e) => e) as StripePriceDetail[]
  }
  const getSubscriptionPriceItems = (): StripePriceDetail[] => {
    const priceItems = order.currentProduct
      ?.map((item, index: number) => {
        const priceItems2 = item?.tiered?.map((item2, index2: number) => {
          if (!item2?.isSubscription) return undefined
          return {
            price: item2?.stripePaymentID,
            quantity: order.quantities[index][index2],
          } as StripePriceDetail
        })
        return priceItems2
      })
      .flat()
    console.log({ priceItems: priceItems })
    if (priceItems == undefined) return []
    return priceItems
      .filter((x) => x != undefined && (x.quantity ?? 0) > 0)
      .filter((e) => e) as StripePriceDetail[]
  }
  const createInvoice = async () => {
    const subscriptionPriceItems = getSubscriptionPriceItems()
    const oneOffPriceItems = getOneOffPriceItems()

    try {
      setInvoiceQueue([
        ...invoiceQueue,
        wrappedPreviewInvoice({
          idempotency: idempotency,
          priceInfo: {
            coupon: order.coupon,
            subscriptionPrices: subscriptionPriceItems,
            oneOffPrices: oneOffPriceItems,
          },
        }),
      ])
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log({ error: e })
    }
  }
  useEffect(() => {
    const updateInvoiceQueue = async () => {
      console.log({ invoiceQueue: invoiceQueue })
      try {
        const invoice = (await Promise.all(invoiceQueue))[invoiceQueue.length - 1]
        console.log({ invoiceQueue2: invoiceQueue })
        console.log({ invoice1: invoice })
        console.log({ invoice: invoice.data.previewInvoice?.invoice })
        setInvoice(invoice.data.previewInvoice?.invoice)
      } catch (e: any) {
        console.log({ ERROR: e })
      }
    }
    updateInvoiceQueue()
  }, [invoiceQueue])
  const selectProduct = (product: Product) => {
    if (order.currentProduct) {
      setInvoice(null)
      setShowSubscriptionSelector(false)
      setOrder({
        coupon: order.coupon,
        currentProduct: order.currentProduct.concat(product),
        quantities: [
          product?.tiered?.map((e) => {
            return e?.defaultAmount ?? 1
          }) ?? [],
        ],
        isEditable: [product?.tiered?.map((e) => e?.amountIsEditable ?? "false") ?? []],
      })
    }
  }

  const UserConsumer = useContext(UserContext)
  useEffect(() => {
    const makePayment = async () => {
      await createStripeUser()
      const subscriptionPriceItems = getSubscriptionPriceItems()
      const oneOffPriceItems = getOneOffPriceItems()

      try {
        if (stripe && elements) {
          console.log(freeDays)
          const status = await new HandleStripePayment().handleSubmit(
            stripe,
            elements,
            idempotency,
            {
              subscriptionPrices: subscriptionPriceItems,
              oneOffPrices: oneOffPriceItems,
              coupon: order.coupon ?? "",
            },
            freeDays,
            () => {
              setProcessing("complete")
            },
            (error) => {
              setProcessing("entry")
              setErrorMsg(error?.message)
            }
          )
          console.log(status)
        }
      } catch (e: any) {
        Sentry.captureException(e.errors || e)
        console.log({ "Payment Error": e })
      }
    }

    if (processing == "processing") makePayment()
  }, [processing])
  const makePayment = async (): Promise<void> => {
    setProcessing("processing")
  }
  const removeProduct = (index: number) => {
    const temp = order.currentProduct
    const temp2 = order.quantities
    temp?.splice(index)
    temp2.splice(index)
    setInvoice(null)
    setOrder({
      currentProduct: temp,
      quantities: temp2,
      isEditable: order.isEditable,
      coupon: order.coupon,
    })
  }
  const updateQuantity = (index: number, index2: number, value: number) => {
    const temp = order.quantities
    temp[index][index2] = value
    setInvoice(null)
    setOrder({
      quantities: temp,
      currentProduct: order.currentProduct,
      isEditable: order.isEditable,
      coupon: order.coupon,
    })
  }
  const renderEULA = (eula: string | null | undefined) => {
    return (
      <JCModal
        visible={showEULA}
        title="End User Licensing Agreement"
        onHide={() => {
          setShowEULA(false)
        }}
      >
        <ScrollView>
          <View accessible>
            <EditableRichText value={eula ?? ""} isEditable={false}></EditableRichText>
          </View>
        </ScrollView>
      </JCModal>
    )
  }
  const stripeFieldValidation = (
    element:
      | StripeCardNumberElementChangeEvent
      | StripeCardExpiryElementChangeEvent
      | StripeCardCvcElementChangeEvent,
    name: string
  ) => {
    if (!element.empty && element.complete) {
      setStripeValidation({ ...stripeValidation, [name]: true })
    } else {
      setStripeValidation({ ...stripeValidation, [name]: false })
    }
  }
  const renderProduct = (item: Product, index: number) => {
    return (
      <View
        accessible
        key={index}
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 4,
          borderColor: "rgba(51, 51, 51, 0.1)",
          shadowColor: "rgba(0, 0, 0, 0.09)",
          padding: 25,
          shadowOffset: { width: 5, height: 5 },
          shadowRadius: 30,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontFamily: "Graphik-Bold-App",
            paddingRight: 0,
            fontSize: 20,
          }}
        >
          {item?.name ?? ""}
        </Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-end", display: "none" }}
          onPress={() => {
            removeProduct(index)
          }}
        >
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>

        {item?.tiered?.map((item2, index2: number) => {
          return (
            <View key={index2} style={{ flexDirection: "row" }}>
              <Text
                style={{
                  flex: 1,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingRight: 10,
                  paddingLeft: 5,
                }}
              >
                {item2?.name ?? ""}
              </Text>
              {order.isEditable[index][index2] == "true" ? (
                <EditableText
                  accessibilityLabel={item2?.name ?? ""}
                  placeholder="Quantity"
                  multiline={false}
                  testID="course-weekTitle"
                  textStyle={styles.fontFormSmallDarkGreyCourseTopEditable}
                  inputStyle={{
                    borderWidth: 1,
                    borderColor: "#dddddd",
                    marginTop: 5,
                    marginBottom: 5,
                    width: "20%",
                    paddingTop: 5,
                    paddingRight: 5,
                    paddingBottom: 5,
                    paddingLeft: 5,
                    fontFamily: "Graphik-Regular-App",
                    fontSize: 10,
                    lineHeight: 15,
                  }}
                  onChange={(value) => {
                    updateQuantity(index, index2, parseInt(value))
                  }}
                  value={order.quantities[index][index2].toString()}
                  isEditable={true}
                ></EditableText>
              ) : (
                <Text>{order.quantities[index][index2].toString()}</Text>
              )}
            </View>
          )
        })}

        <View>
          <Text
            style={[
              styles.fontFormMandatory,
              { marginRight: -8 },
              !eula ? { color: "#F0493E" } : { opacity: 0 },
            ]}
          >
            *
          </Text>
          <JCSwitch
            testId={"billing-accept-eula"}
            containerWidth={"95%"}
            switchLabel="I accept the End User Licensing Agreement"
            initState={eula}
            onPress={(e) => {
              setEula(e)
            }}
          ></JCSwitch>
        </View>

        <JCButton
          buttonType={ButtonTypes.TransparentNoPadding}
          onPress={() => {
            setShowEULA(true)
          }}
        >
          Read the End User Licensing Agreement
        </JCButton>

        {renderEULA(item?.eula)}
      </View>
    )
  }

  const updateUserAndCheckState = async (
    userActions: UserActions,
    state: UserState | undefined
  ) => {
    if (state == undefined) return
    console.log(state)
    setValidatingUser(true)
    setErrorMsg("")
    const a = setInterval(async () => {
      await userActions.updateGroups()
      console.log({ Groups: state.groups })
      if (userActions.isMemberOf("subscriptionValid")) {
        console.log("Subscription is active.")
        setValidatingUser(false)
        clearInterval(a)
      } else {
        console.log("Subscription is not yet active")
      }
      await userActions.recheckUserState()
    }, 2000)
    setTimeout(() => {
      clearInterval(a)
      setValidatingUser(false)
      setErrorMsg("Something went wrong. Please try again later or contact support.")
    }, 60000)
  }
  const handleInputChange = async (
    value: any,
    field: keyof NonNullable<NonNullable<NonNullable<GetUserQuery>["getUser"]>["billingAddress"]>
  ) => {
    const release = await handleInputMutex.acquire()
    console.log({ field: field, value: value })
    console.log({ userData: userData?.billingAddress })
    try {
      if (userData && userData.billingAddress == null) {
        const user = await Data.updateUser({
          id: userData.id,
          billingAddress: {
            country: "",
            line1: "",
            line2: "",
            state: "",
            postal_code: "",
            city: "",
          },
        })
        console.log("Billing Address added")
        if (user.data) {
          const temp = user.data.updateUser

          if (temp?.billingAddress && temp?.billingAddress[field])
            temp.billingAddress[field] = value

          const user2 = await Data.updateUser({
            id: userData?.id ?? "",
            billingAddress: temp?.billingAddress,
          })

          console.log(user2)
          setUserData(temp)
        }
      } else {
        const temp = userData
        if (temp?.billingAddress) temp.billingAddress[field] = value

        const user = await Data.updateUser({
          id: userData?.id ?? "",
          billingAddress: temp?.billingAddress,
        })

        console.log(user)
        setUserData(temp)
      }
    } catch (e: any) {
      Sentry.captureException(e.errors || e)
      console.log({ errorUpdating: e })
    } finally {
      release()
    }
  }
  const isMakePaymentEnabled = (): boolean => {
    console.log("1")
    const billingAddress = userData?.billingAddress
    if (!billingAddress) return false
    console.log("2")
    if (!billingAddress.line1) return false
    console.log("3")
    if (!billingAddress.state) return false
    console.log("4")
    if (!billingAddress.country) return false
    console.log("5")
    if (!billingAddress.city) return false
    console.log("6")
    if (!billingAddress.postal_code) return false
    console.log("7")
    if (!stripeValidation.cardNumber) return false
    console.log("8")
    if (!stripeValidation.expiryDate) return false
    console.log("9")
    if (!stripeValidation.cvc) return false
    console.log("10")
    if (!order.currentProduct) return false
    console.log("11")
    return (
      order.currentProduct.length > 0 &&
      billingAddress.line1.length > 0 &&
      billingAddress.state?.length > 0 &&
      billingAddress.country?.length > 0 &&
      billingAddress.city?.length > 0 &&
      billingAddress.postal_code?.length > 0 &&
      eula == true
    )
  }
  const completePaymentProcess = async (actions: UserActions, state: UserState | undefined) => {
    updateUserAndCheckState(actions, state)
  }
  const stripe = useStripe()
  const elements = useElements()

  if (!UserConsumer.userState) return null
  if (!UserConsumer.userActions) return null
  return processing === "complete" ? (
    <ScrollView style={styles.signUpScreen1PaymentColumn1}>
      <Image
        style={{ alignSelf: "center", marginBottom: 20 }}
        source={require("../../assets/svg/checkmark-circle.svg")}
      />

      <Text accessibilityRole="header" style={styles.SignUpScreenSetupText}>
        Thank you. Your subscription is now active.
        <br />
        <JCButton
          accessibilityLabel="Navigate to profile"
          testID={"billing-continueToProfile-button"}
          onPress={() => {
            completePaymentProcess(UserConsumer.userActions, UserConsumer.userState)
          }}
          buttonType={brand == "oneStory" ? ButtonTypes.SolidOneStory : ButtonTypes.Solid}
          enabled={!validatingUser}
        >
          {validatingUser ? (
            <View style={{ flexDirection: "column", width: 177.7, top: 4 }}>
              <ActivityIndicator
                accessibilityRole="alert"
                accessibilityLabel="Loading"
                color="white"
              ></ActivityIndicator>
            </View>
          ) : (
            "Continue to your profile"
          )}
        </JCButton>
      </Text>
      <Text
        accessibilityLiveRegion={"assertive"}
        accessibilityRole="alert"
        style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
      >
        {errorMsg}
      </Text>
    </ScrollView>
  ) : (
    <>
      {processing == "processing" ? (
        <ScrollView style={styles.signUpScreen1PaymentColumn1}>
          <Text accessibilityRole="header" style={styles.SignUpScreenSetupText}>
            Processing Payment
          </Text>
          <Text style={styles.SignUpScreenSetupTextSmaller}>
            Please wait while we process your payment. This may take several seconds.
          </Text>
          <ActivityIndicator accessibilityRole="alert" accessibilityLabel="Loading" />
        </ScrollView>
      ) : null}

      <ScrollView style={{ display: processing == "entry" ? "flex" : "none" }}>
        <View style={styles.signUpScreen1PaymentColumn1Form}>
          <Text
            accessibilityRole="header"
            style={{
              fontFamily: "Graphik-Bold-App",
            }}
          >
            Billing Information
          </Text>
          {userData && (
            <>
              <View style={[styles.fontFormSmall, { opacity: 0.8 }]}>
                <Text
                  style={[
                    styles.fontFormMandatory,
                    !userData.billingAddress?.line1 ? { opacity: 1 } : { opacity: 0 },
                  ]}
                >
                  *
                </Text>
                Billing Address Line 1
              </View>

              <EditableText
                accessibilityLabel="Billing Address Line 1"
                onChange={async (e) => {
                  await handleInputChange(e, "line1")
                }}
                multiline={false}
                testID="billing-line1"
                textStyle={styles.fontFormSmallDarkGrey}
                inputStyle={{
                  borderWidth: 1,
                  borderColor: "#dddddd",
                  width: "100%",
                  marginBottom: 15,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 16,
                  lineHeight: 28,
                }}
                value={userData.billingAddress?.line1 ? userData.billingAddress?.line1 : ""}
                isEditable={true}
              ></EditableText>
              <View style={[styles.fontFormSmall, { opacity: 0.8 }]}>Billing Address Line 2</View>

              <EditableText
                accessibilityLabel="Billing Address Line 2"
                onChange={async (e) => {
                  await handleInputChange(e, "line2")
                }}
                multiline={false}
                testID="billing-line2"
                textStyle={styles.fontFormSmallDarkGrey}
                inputStyle={{
                  borderWidth: 1,
                  borderColor: "#dddddd",
                  width: "100%",
                  marginBottom: 15,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 16,
                  lineHeight: 28,
                }}
                value={userData.billingAddress?.line2 ? userData.billingAddress?.line2 : ""}
                isEditable={true}
              ></EditableText>
              <View style={[styles.fontFormSmall, { opacity: 0.8 }]}>
                <Text
                  style={[
                    styles.fontFormMandatory,
                    !userData.billingAddress?.city ? { opacity: 1 } : { opacity: 0 },
                  ]}
                >
                  *
                </Text>
                City
              </View>

              <EditableText
                accessibilityLabel="City"
                onChange={async (e) => {
                  await handleInputChange(e, "city")
                }}
                multiline={false}
                testID="billing-city"
                textStyle={styles.fontFormSmallDarkGrey}
                inputStyle={{
                  borderWidth: 1,
                  borderColor: "#dddddd",
                  width: "100%",
                  marginBottom: 15,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 16,
                  lineHeight: 28,
                }}
                value={userData.billingAddress?.city ? userData.billingAddress?.city : ""}
                isEditable={true}
              ></EditableText>
              <View style={[styles.fontFormSmall, { opacity: 0.8 }]}>
                <Text
                  style={[
                    styles.fontFormMandatory,
                    !userData?.billingAddress?.state ? { opacity: 1 } : { opacity: 0 },
                  ]}
                >
                  *
                </Text>
                State/Province
              </View>

              <EditableText
                accessibilityLabel="State/Province"
                onChange={async (e) => {
                  await handleInputChange(e, "state")
                }}
                multiline={false}
                testID="billing-state"
                textStyle={styles.fontFormSmallDarkGrey}
                inputStyle={{
                  borderWidth: 1,
                  borderColor: "#dddddd",
                  width: "100%",
                  marginBottom: 15,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 16,
                  lineHeight: 28,
                }}
                value={userData.billingAddress?.state ? userData.billingAddress?.state : ""}
                isEditable={true}
              ></EditableText>
              <View style={[styles.fontFormSmall, { opacity: 0.8 }]}>
                <Text
                  style={[
                    styles.fontFormMandatory,
                    !userData?.billingAddress?.country ? { opacity: 1 } : { opacity: 0 },
                  ]}
                >
                  *
                </Text>
                Country
              </View>

              <EditableText
                accessibilityLabel="Country"
                onChange={async (e) => {
                  await handleInputChange(e, "country")
                }}
                multiline={false}
                testID="billing-country"
                textStyle={styles.fontFormSmallDarkGrey}
                inputStyle={{
                  borderWidth: 1,
                  borderColor: "#dddddd",
                  width: "100%",
                  marginBottom: 15,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 16,
                  lineHeight: 28,
                }}
                value={userData.billingAddress?.country ? userData.billingAddress?.country : ""}
                isEditable={true}
              ></EditableText>
              <View style={[styles.fontFormSmall, { opacity: 0.8 }]}>
                <Text
                  style={[
                    styles.fontFormMandatory,
                    !userData?.billingAddress?.postal_code ? { opacity: 1 } : { opacity: 0 },
                  ]}
                >
                  *
                </Text>
                Zip/Postal Code
              </View>

              <EditableText
                accessibilityLabel="Zip/Postal Code"
                onChange={async (e) => {
                  await handleInputChange(e, "postal_code")
                }}
                multiline={false}
                testID="billing-postalcode"
                textStyle={styles.fontFormSmallDarkGrey}
                inputStyle={{
                  borderWidth: 1,
                  borderColor: "#dddddd",
                  width: "100%",
                  marginBottom: 15,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 16,
                  lineHeight: 28,
                }}
                value={
                  userData.billingAddress?.postal_code ? userData.billingAddress?.postal_code : ""
                }
                isEditable={true}
              ></EditableText>
            </>
          )}
          <div>
            <br></br>
            <br></br>
          </div>
          <Text style={{ fontFamily: "Graphik-Bold-App" }}>Credit Card Information</Text>
          <View style={[styles.fontFormSmall, { opacity: 0.8 }]}>
            <Text
              style={[
                styles.fontFormMandatory,
                !stripeValidation.cardNumber ? { opacity: 1 } : { opacity: 0 },
              ]}
            >
              *
            </Text>
            Credit Card Number
          </View>
          <CardNumberElement
            onChange={(el) => stripeFieldValidation(el, "cardNumber")}
            options={CARD_ELEMENT_OPTIONS}
          />
          <View style={[styles.fontFormSmall, { opacity: 0.8 }]}>
            <Text
              style={[
                styles.fontFormMandatory,
                !stripeValidation.expiryDate ? { opacity: 1 } : { opacity: 0 },
              ]}
            >
              *
            </Text>
            Expiry Date
          </View>
          <CardExpiryElement
            onChange={(el) => stripeFieldValidation(el, "expiryDate")}
            options={CARD_ELEMENT_OPTIONS}
          />
          <View style={[styles.fontFormSmall, { opacity: 0.8 }]}>
            <Text
              style={[
                styles.fontFormMandatory,
                !stripeValidation.cvc ? { opacity: 1 } : { opacity: 0 },
              ]}
            >
              *
            </Text>
            CVC
          </View>
          <CardCvcElement
            onChange={(el) => stripeFieldValidation(el, "cvc")}
            options={CARD_ELEMENT_OPTIONS}
          />
        </View>
        <View style={styles.signUpScreen1PaymentColumn2}>
          <View style={{ display: "none" }}>
            <JCButton
              buttonType={ButtonTypes.TransparentNoPadding}
              onPress={() => {
                setShowSubscriptionSelector(true)
              }}
            >
              Add another product
            </JCButton>
          </View>
          <View style={{ marginBottom: 20, marginTop: 20 }}>
            {order.currentProduct?.map((item: Product, index: number) => {
              return renderProduct(item, index)
            })}
          </View>

          {invoice?.lines?.data
            ?.filter((item) => item?.amount != "0")
            .map((line, index: number) => {
              return (
                <View accessible={!showEULA} key={index} style={styles.flexRow}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 12,
                      fontFamily: "Graphik-Regular-App",
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 10,
                      paddingRight: 25,
                    }}
                  >
                    {line?.description?.split("(")?.[0]?.split("×")[1]?.trim() ??
                      line?.description?.split("(")[0] ??
                      line?.description}
                  </Text>
                  <Text
                    style={{
                      right: "20%",
                      fontFamily: "Graphik-Bold-App",
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingRight: 10,
                    }}
                  >
                    ${line?.amount && (parseInt(line.amount) / 100).toFixed(2)}
                  </Text>
                </View>
              )
            })}
          <View accessible={!showEULA} style={[styles.flexRow, { marginBottom: 10 }]}>
            {!invoice ? (
              <View style={{ paddingTop: 10, marginRight: 10 }}>
                <ActivityIndicator
                  accessibilityRole="alert"
                  accessibilityLabel="Loading"
                ></ActivityIndicator>
              </View>
            ) : null}
            <Text
              style={{
                flex: 1,
                textAlign: !invoice ? "left" : "right",
                textAlignVertical: "center",
                paddingRight: 45,

                fontFamily: "Graphik-Bold-App",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {invoice ? "Total:" : <>Calculating Total...</>}
            </Text>
            <Text
              style={{
                fontFamily: "Graphik-Bold-App",
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 10,
              }}
            >
              {invoice?.total ? "$" + (parseInt(invoice.total) / 100).toFixed(2) : ""}
            </Text>
          </View>
          <Text
            style={{
              marginHorizontal: 10,
              fontFamily: "Graphik-Regular-App",
              fontSize: 12,
            }}
          >
            Coupon
          </Text>
          <EditableText
            placeholder="Coupon Name"
            multiline={false}
            testID="billing-coupon"
            textStyle={styles.fontFormSmallDarkGreyCourseTopEditable}
            inputStyle={{
              borderWidth: 1,
              borderColor: "#dddddd",
              marginTop: 5,
              marginBottom: 5,
              width: "100%",
              paddingTop: 5,
              paddingRight: 5,
              paddingBottom: 5,
              paddingLeft: 5,
              fontFamily: "Graphik-Regular-App",
              fontSize: 10,
              lineHeight: 15,
            }}
            onChange={async (value) => {
              setOrder({
                isEditable: order.isEditable,
                currentProduct: order.currentProduct,
                coupon: value,
                quantities: order.quantities,
              })
            }}
            value={order.coupon ?? ""}
            isEditable={true}
          ></EditableText>
          <Text style={{ color: "red", textAlign: "center", marginBottom: 4 }}>{errorMsg}</Text>
          <View style={{ marginHorizontal: 10 }}>
            <JCButton
              accessibilityLabel="Process Payment"
              testID={"billing-processPayment-button"}
              buttonType={brand == "oneStory" ? ButtonTypes.SolidOneStory : ButtonTypes.Solid}
              onPress={() => {
                setErrorMsg("")
                makePayment()
              }}
              enabled={isMakePaymentEnabled() && !!invoice}
            >
              {order.currentProduct &&
              order.currentProduct[0] &&
              order.currentProduct[0].submitButtonText != "" &&
              order.currentProduct[0].submitButtonText != null ? (
                order.currentProduct[0].submitButtonText
              ) : (
                <>Process Payment</>
              )}
            </JCButton>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
let env = "unknown"
if (window.location === undefined) env = "mobile"
else if (window.location.hostname === "localhost") env = "dev"
else if (window.location.hostname.includes("beta")) env = "beta"
else if (window.location.hostname.includes("dev")) env = "dev"
else if (window.location.hostname.includes("d13j9gfr4f50wr")) env = "jcfacelift"
else env = "beta"

export default function Billing(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()

  const [stripePromise] = useState(() =>
    loadStripe(
      env == "beta"
        ? "pk_live_51HlyrYLTzrDhiQ9282ydxEkzCmGQuJ6w6m2J7pvWL3DslQGdyZHhi6NFa7lLgErh9YjboGdEs09ce0y9c3H5SfVx00K1massZP"
        : "pk_test_51HlyrYLTzrDhiQ921sERNUY2GQBDgpHDOUYMiNZ0lTeTsse9u8oQoBfLg6UzWaxcNkYhek4tkNWILTlAiajet27k00FFv6z0RB"
    )
  )
  return (
    <Elements stripe={stripePromise}>
      <BillingImpl {...props} navigation={navigation} route={route} />
    </Elements>
  )
}
