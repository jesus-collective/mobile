import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js"
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js"
import { Mutex } from "async-mutex"
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { Body, Card, CardItem, Content, Label } from "native-base"
import React, { useState } from "react"
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native"
import { JCCognitoUser } from "src/types"
import { v4 as uuidv4 } from "uuid"
import EditableRichText from "../../components/Forms/EditableRichText"
import EditableText from "../../components/Forms/EditableText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import Sentry from "../../components/Sentry"
import { UserActions, UserContext, UserState } from "../../screens/HomeScreen/UserContext"
import { GetUserQuery, ListProductsQuery, UpdateUserMutation } from "../../src/API"
import awsConfig from "../../src/aws-exports"
import * as customMutations from "../../src/graphql-custom/mutations"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import "./CardSectionStyles.css"
import EULA from "./eula.json"
import HandleStripePayment from "./HandleStripePayment"
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
type Products = NonNullable<ListProductsQuery["listProducts"]>["items"]
type Product = NonNullable<Products>[0]
interface Props {
  navigation?: any
  route?: any
  authState?: string
}
interface State extends JCState {
  showSubscriptionSelector: boolean
  products: Products
  userData: NonNullable<GetUserQuery>["getUser"]
  currentProduct: Products
  joinedProduct: string[]
  productType: "Partner" | "OneStory" | null
  idempotency: string
  eula: boolean
  showEULA: boolean
  errorMsg: string | undefined
  quantities: number[][]
  invoice: any
  processing: "entry" | "processing" | "complete"
  stripeValidation: any
  validatingUser: boolean
  invoiceQueue: Array<Promise<any>>
  freeDays: number
}
class BillingImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      showSubscriptionSelector: false,
      products: [],
      stripeValidation: {
        cardNumber: false,
        expiryDate: false,
        cvc: false,
      },
      showEULA: false,
      errorMsg: "",
      currentProduct: [],
      invoiceQueue: [],
      idempotency: uuidv4(),
      processing: "entry",
      validatingUser: false,
      freeDays: 30,
      eula: false,
      productType: props.route?.params?.productType,
      joinedProduct: props.route?.params?.joinedProduct
        ? props.route?.params?.joinedProduct == "null"
          ? []
          : props.route?.params?.joinedProduct.split(",")
        : [],
    }
    console.log({ productType: props.route?.params?.productType })
    console.log({ joinedProduct: this.state.joinedProduct })
    this.setInitialData()
  }

  async setInitialData(): Promise<void> {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      const getUser = (await API.graphql({
        query: queries.getUser,
        variables: { id: user["username"] },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<GetUserQuery>
      if (getUser.data) {
        this.setState({ userData: getUser.data.getUser })
        console.log({ USER: getUser.data?.getUser })
      }
    } catch (e) {
      Sentry.captureException(e.errors || e)
      console.log({ UserError: e })
    }
    try {
      const listProducts = (await API.graphql({
        query: queries.listProducts,
        variables: { filter: { enabled: { eq: "true" }, isLogin: { eq: "true" } }, limit: 50 },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<ListProductsQuery>
      if (listProducts.data?.listProducts)
        this.setState({ products: listProducts.data.listProducts.items })
      if (this.state.currentProduct?.length == 0)
        if (this.state.joinedProduct.length == 0) {
          if (listProducts.data?.listProducts?.items) {
            this.setState(
              {
                currentProduct: [listProducts.data.listProducts.items[0]],
                quantities: [
                  Array(listProducts.data.listProducts.items[0]?.tiered?.length).fill(1),
                ],
              },
              async () => {
                await this.createInvoice()
              }
            )
            console.log(listProducts.data.listProducts.items[0])
          }
        } else {
          console.log("Bad")
          /* const products = listProducts.data?.listProducts?.items?.filter(
            (item) => this.state.joinedProduct?.includes(item?.stripePaymentID)
          );
          this.setState(
            {
              currentProduct: products,
              quantities: Array(products?.length).fill(1),
            },
            () => {
              this.createInvoice();
            }
          );*/
        }
    } catch (err) {
      Sentry.captureException(err)
      console.error(err)
    }
  }
  async createStripeUser() {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      console.log(user)
      const customer: any = await API.graphql({
        query: mutations.createCustomer,
        variables: {
          idempotency: this.state.idempotency,
          firstName: user.attributes.given_name,
          lastName: user.attributes.family_name,
          email: user.attributes.email,
          phone: user.attributes.phone_number,
          billingAddress: this.state.userData?.billingAddress,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      console.log({ customer: customer })
      //customerId = customer.data.createCustomer.customer.id;
    } catch (e) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  getPriceItems() {
    const priceItems = this.state.currentProduct
      ?.map((item, index: number) => {
        const priceItems2 = item?.tiered?.map((item2, index2: number) => {
          return {
            price: item2?.stripePaymentID,
            quantity: this.state.quantities[index][index2],
          }
        })
        return priceItems2
      })
      .flat()
    console.log({ priceItems: priceItems })
    return priceItems?.filter((x) => x != undefined && x.quantity > 0)
  }
  async createInvoice() {
    const priceItems = this.getPriceItems()

    try {
      const newInvoice: any = API.graphql({
        query: customMutations.previewInvoice,
        variables: {
          idempotency: this.state.idempotency,
          priceInfo: {
            prices: priceItems,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      this.setState({ invoiceQueue: [...this.state.invoiceQueue, newInvoice] }, async () => {
        const currentIndex = this.state.invoiceQueue.length - 1
        const invoice = await this.state.invoiceQueue[currentIndex]

        if (currentIndex === this.state.invoiceQueue.length - 1) {
          console.log({ invoice: invoice.data.previewInvoice?.invoice })
          this.setState({ invoice: invoice.data.previewInvoice?.invoice })
        }
      })
    } catch (e) {
      Sentry.captureException(e.errors || e)
      console.log(e)
    }
  }
  selectProduct(product: Product) {
    if (this.state.currentProduct)
      this.setState(
        {
          showSubscriptionSelector: false,
          currentProduct: this.state.currentProduct.concat(product),
          quantities: [Array(product?.tiered?.length).fill(1)],
          invoice: null,
        },
        async () => {
          await this.createInvoice()
        }
      )
  }

  static UserConsumer = UserContext.Consumer
  renderAddProductModal(userState: UserState): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showSubscriptionSelector}
        title="Select a Subscription"
        onHide={() => {
          this.setState({ showSubscriptionSelector: false })
        }}
      >
        <>
          <Content>
            {this.state.products?.map((product, index: number) => {
              const showProduct =
                (userState.isOrg && product?.isOrgTier) ||
                (!userState.isOrg && product?.isIndividualTier)
              return showProduct ? (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.selectProduct(product)
                  }}
                >
                  <Card>
                    <CardItem>
                      <Body>
                        <Text
                          style={{
                            fontFamily: "Graphik-Bold-App",
                            paddingRight: 0,
                            fontSize: 20,
                          }}
                        >
                          {product?.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Graphik-Bold-App",
                            color: "#F0493E",
                          }}
                        >
                          ${product?.price?.toFixed(2)}/{product?.pricePer}
                        </Text>
                        <EditableRichText
                          value={product?.marketingDescription}
                          isEditable={false}
                        ></EditableRichText>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              ) : null
            })}
          </Content>
        </>
      </JCModal>
    )
  }

  async makePayment(stripe: Stripe | null, elements: StripeElements | null): Promise<void> {
    this.setState({ processing: "processing" }, async () => {
      await this.createStripeUser()
      const priceItems = this.getPriceItems()
      try {
        if (stripe && elements) {
          console.log(this.state.freeDays)
          const status = await new HandleStripePayment().handleSubmit(
            stripe,
            elements,
            this.state.idempotency,
            priceItems,
            this.state.freeDays,
            () => {
              this.setState({ processing: "complete" })
            },
            (error) => {
              this.setState({ processing: "entry", errorMsg: error?.message })
            }
          )
          console.log(status)
        }
      } catch (e) {
        Sentry.captureException(e.errors || e)
        console.log({ "Payment Error": e })
      }
    })
  }
  removeProduct(index: number) {
    const temp = this.state.currentProduct
    const temp2 = this.state.quantities
    temp?.splice(index)
    temp2.splice(index)
    this.setState(
      {
        currentProduct: temp,
        quantities: temp2,
        invoice: null,
      },
      async () => {
        await this.createInvoice()
      }
    )
  }
  updateQuantity(index: number, index2: number, value: number) {
    const temp = this.state.quantities
    temp[index][index2] = value
    this.setState(
      {
        quantities: temp,
        invoice: null,
      },
      async () => {
        await this.createInvoice()
      }
    )
  }
  renderEULA() {
    return (
      <JCModal
        visible={this.state.showEULA}
        title="End User Licensing Agreement"
        onHide={() => {
          this.setState({ showEULA: false })
        }}
      >
        <Content>
          {EULA.map((item, index) => {
            return <Text key={index}>{item}</Text>
          })}
        </Content>
      </JCModal>
    )
  }
  stripeFieldValidation = (element, name: string) => {
    if (!element.empty && element.complete) {
      this.setState({ stripeValidation: { ...this.state.stripeValidation, [name]: true } })
    } else {
      this.setState({ stripeValidation: { ...this.state.stripeValidation, [name]: false } })
    }
  }
  renderProduct(item: Product, index: number) {
    return (
      <View
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
            this.removeProduct(index)
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
              <EditableText
                placeholder="Quantity"
                multiline={false}
                testID="course-weekTitle"
                textStyle={this.styles.style.fontFormSmallDarkGreyCourseTopEditable}
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
                  this.updateQuantity(index, index2, parseInt(value))
                }}
                value={this.state.quantities[index][index2].toString()}
                isEditable={true}
              ></EditableText>
            </View>
          )
        })}

        <Label>
          <Text
            style={[
              this.styles.style.fontFormMandatory,
              { marginRight: -8 },
              !this.state.eula ? { color: "#F0493E" } : { opacity: 0 },
            ]}
          >
            *
          </Text>
          <JCSwitch
            testId={"billing-accept-eula"}
            containerWidth={"95%"}
            switchLabel="I accept the End User Licensing Agreement"
            initState={this.state.eula}
            onPress={(e) => {
              this.setState({ eula: e })
            }}
          ></JCSwitch>
        </Label>

        <JCButton
          buttonType={ButtonTypes.TransparentNoPadding}
          onPress={() => {
            this.setState({ showEULA: true })
          }}
        >
          Read the End User Licensing Agreement
        </JCButton>

        {this.renderEULA()}
      </View>
    )
  }
  showSubscriptionSelector() {
    this.setState({ showSubscriptionSelector: true })
  }

  updateUserAndCheckState = async (userActions: UserActions, state: UserState) => {
    console.log(state)
    this.setState({ validatingUser: true, errorMsg: "" })
    const a = setInterval(async () => {
      await userActions.updateGroups()
      console.log({ Groups: state.groups })
      if (userActions.isMemberOf("subscriptionValid")) {
        console.log("Subscription is active.")
        this.setState({ validatingUser: false })
        clearInterval(a)
      } else {
        console.log("Subscription is not yet active")
      }
      await userActions.recheckUserState()
    }, [2000])
    setTimeout(() => {
      clearInterval(a)
      this.setState({
        validatingUser: false,
        errorMsg: "Something went wrong. Please try again later or contact support.",
      })
    }, 60000)
  }

  async handleInputChange(value: string, field: string) {
    const release = await handleInputMutex.acquire()
    console.log({ field: field, value: value })
    try {
      if (this.state.userData && this.state.userData.billingAddress == null) {
        const user = (await API.graphql(
          graphqlOperation(mutations.updateUser, {
            input: {
              id: this.state.userData.id,
              billingAddress: {
                country: "",
                line1: "",
                line2: "",
                state: "",
                postal_code: "",
                city: "",
              },
            },
          })
        )) as GraphQLResult<UpdateUserMutation>
        if (user.data)
          this.setState({ userData: user.data.updateUser }, async () => {
            const temp = this.state.userData

            temp.billingAddress[field] = value
            const user = await API.graphql(
              graphqlOperation(mutations.updateUser, {
                input: {
                  id: this.state.userData?.id,
                  billingAddress: temp?.billingAddress,
                },
              })
            )
            this.setState({ userData: temp })
          })
      } else {
        const temp = this.state.userData

        temp.billingAddress[field] = value
        const user = await API.graphql(
          graphqlOperation(mutations.updateUser, {
            input: {
              id: this.state.userData?.id,
              billingAddress: temp?.billingAddress,
            },
          })
        )
        this.setState({ userData: temp })
      }
    } catch (e) {
      Sentry.captureException(e.errors || e)
      console.log({ errorUpdating: e })
    } finally {
      release()
    }
  }
  isMakePaymentEnabled(): boolean {
    console.log("1")
    const billingAddress = this.state.userData?.billingAddress
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
    if (!this.state.stripeValidation.cardNumber) return false
    console.log("8")
    if (!this.state.stripeValidation.expiryDate) return false
    console.log("9")
    if (!this.state.stripeValidation.cvc) return false
    console.log("10")
    if (!this.state.currentProduct) return false
    console.log("11")
    return (
      this.state.currentProduct.length > 0 &&
      billingAddress.line1.length > 0 &&
      billingAddress.state?.length > 0 &&
      billingAddress.country?.length > 0 &&
      billingAddress.city?.length > 0 &&
      billingAddress.postal_code?.length > 0 &&
      this.state.eula == true
    )
  }
  async completePaymentProcess(actions: UserActions, state: UserState) {
    this.updateUserAndCheckState(actions, state)
  }
  render() {
    return (
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <BillingImpl.UserConsumer>
            {({ userState, userActions }) => {
              if (!userState) return null
              return this.state.processing === "complete" ? (
                <Content style={this.styles.style.signUpScreen1PaymentColumn1}>
                  <Image
                    style={{ alignSelf: "center", marginBottom: 20 }}
                    source={require("../../assets/svg/checkmark-circle.svg")}
                  />

                  <Text
                    style={{
                      fontFamily: "Graphik-Semibold-App",
                      alignSelf: "center",
                      fontSize: 42,
                      lineHeight: 51,
                      textAlign: "center",
                      width: "100%",
                      marginBottom: 20,
                    }}
                  >
                    We&apos;ve received your payment.
                    <br />
                    <JCButton
                      testID={"billing-continueToProfile-button"}
                      onPress={() => {
                        this.completePaymentProcess(userActions, userState)
                      }}
                      buttonType={ButtonTypes.Solid}
                      enabled={!this.state.validatingUser}
                    >
                      {this.state.validatingUser ? (
                        <View style={{ flexDirection: "column", width: 177.7, top: 4 }}>
                          <ActivityIndicator color="white"></ActivityIndicator>
                        </View>
                      ) : (
                        "Continue to your profile"
                      )}
                    </JCButton>
                  </Text>
                  <Text style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
                    {this.state.errorMsg}
                  </Text>
                </Content>
              ) : (
                <>
                  {this.state.processing == "processing" ? (
                    <Content style={this.styles.style.signUpScreen1PaymentColumn1}>
                      <Text
                        style={{
                          fontFamily: "Graphik-Bold-App",
                          alignSelf: "center",
                          fontSize: 42,
                          lineHeight: 51,
                          textAlign: "center",
                          width: "100%",
                          marginBottom: 20,
                        }}
                      >
                        Processing Payment
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Graphik-Bold-App",
                          textAlign: "center",
                          width: "100%",
                          fontSize: 12,
                          marginBottom: 8,
                        }}
                      >
                        Please wait while we process your payment. This may take several seconds.
                      </Text>
                      <ActivityIndicator />
                    </Content>
                  ) : null}

                  <Content style={{ display: this.state.processing == "entry" ? "flex" : "none" }}>
                    <View style={this.styles.style.signUpScreen1PaymentColumn1Form}>
                      {this.state.productType == "OneStory" && (
                        <Text>
                          You are in the right place to sign up for One Story Curriculum! One Story
                          is excited to partner with Jesus Collective in this tangible way and
                          provide our curriculum through the Jesus Collective platform. Through this
                          platform, you not only access these great discipleship resources for kids
                          and youth in a super easy to use way, but you also get the benefit of
                          having meaningful interaction and engagement with other One Story users to
                          give feedback, share ideas and more.
                          <br />
                          <br />
                          What is Jesus Collective, you ask? Jesus Collective is a relational
                          Jesus-centred network that provides a place of belonging, learning and
                          resourcing for like-minded churches and leaders, develops and supports
                          future ready leaders, and equips churches to make more disciples in a
                          post-Christian context. Jesus Collective wants to give greater voice and
                          visibility to this Jesus-centred, third-way movement God is raising up
                          around the world. Isn’t that exciting?
                          <br />
                          <br />
                          Learn more here:{" "}
                          <a href="https://jesuscollective.com">jesuscollective.com.</a>
                          <br />
                          <br />
                          <a href="https://jesuscollective.com/get-involved">
                            Apply for Partnerships
                          </a>
                          <br />
                          <br />
                          <br />
                        </Text>
                      )}
                      <Text
                        style={{
                          fontFamily: "Graphik-Bold-App",
                        }}
                      >
                        Billing Information
                      </Text>
                      {this.state.userData && (
                        <>
                          <Label style={this.styles.style.fontFormSmall}>
                            <Text
                              style={[
                                this.styles.style.fontFormMandatory,
                                !this.state.userData.billingAddress?.line1
                                  ? { opacity: 1 }
                                  : { opacity: 0 },
                              ]}
                            >
                              *
                            </Text>
                            Billing Address Line 1
                          </Label>

                          <EditableText
                            onChange={async (e) => {
                              await this.handleInputChange(e, "line1")
                            }}
                            multiline={false}
                            testID="billing-line1"
                            textStyle={this.styles.style.fontFormSmallDarkGrey}
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
                              this.state.userData.billingAddress?.line1
                                ? this.state.userData.billingAddress?.line1
                                : ""
                            }
                            isEditable={true}
                          ></EditableText>
                          <Label style={this.styles.style.fontFormSmall}>
                            Billing Address Line 2
                          </Label>

                          <EditableText
                            onChange={async (e) => {
                              await this.handleInputChange(e, "line2")
                            }}
                            multiline={false}
                            testID="billing-line2"
                            textStyle={this.styles.style.fontFormSmallDarkGrey}
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
                              this.state.userData.billingAddress?.line2
                                ? this.state.userData.billingAddress?.line2
                                : ""
                            }
                            isEditable={true}
                          ></EditableText>
                          <Label style={this.styles.style.fontFormSmall}>
                            <Text
                              style={[
                                this.styles.style.fontFormMandatory,
                                !this.state.userData.billingAddress?.city
                                  ? { opacity: 1 }
                                  : { opacity: 0 },
                              ]}
                            >
                              *
                            </Text>
                            City
                          </Label>

                          <EditableText
                            onChange={async (e) => {
                              await this.handleInputChange(e, "city")
                            }}
                            multiline={false}
                            testID="billing-city"
                            textStyle={this.styles.style.fontFormSmallDarkGrey}
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
                              this.state.userData.billingAddress?.city
                                ? this.state.userData.billingAddress?.city
                                : ""
                            }
                            isEditable={true}
                          ></EditableText>
                          <Label style={this.styles.style.fontFormSmall}>
                            <Text
                              style={[
                                this.styles.style.fontFormMandatory,
                                !this.state.userData?.billingAddress?.state
                                  ? { opacity: 1 }
                                  : { opacity: 0 },
                              ]}
                            >
                              *
                            </Text>
                            State/Province
                          </Label>

                          <EditableText
                            onChange={async (e) => {
                              await this.handleInputChange(e, "state")
                            }}
                            multiline={false}
                            testID="billing-state"
                            textStyle={this.styles.style.fontFormSmallDarkGrey}
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
                              this.state.userData.billingAddress?.state
                                ? this.state.userData.billingAddress?.state
                                : ""
                            }
                            isEditable={true}
                          ></EditableText>
                          <Label style={this.styles.style.fontFormSmall}>
                            <Text
                              style={[
                                this.styles.style.fontFormMandatory,
                                !this.state.userData?.billingAddress?.country
                                  ? { opacity: 1 }
                                  : { opacity: 0 },
                              ]}
                            >
                              *
                            </Text>
                            Country
                          </Label>

                          <EditableText
                            onChange={async (e) => {
                              await this.handleInputChange(e, "country")
                            }}
                            multiline={false}
                            testID="billing-country"
                            textStyle={this.styles.style.fontFormSmallDarkGrey}
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
                              this.state.userData.billingAddress?.country
                                ? this.state.userData.billingAddress?.country
                                : ""
                            }
                            isEditable={true}
                          ></EditableText>
                          <Label style={this.styles.style.fontFormSmall}>
                            <Text
                              style={[
                                this.styles.style.fontFormMandatory,
                                !this.state.userData?.billingAddress?.postal_code
                                  ? { opacity: 1 }
                                  : { opacity: 0 },
                              ]}
                            >
                              *
                            </Text>
                            Zip/Postal Code
                          </Label>

                          <EditableText
                            onChange={async (e) => {
                              await this.handleInputChange(e, "postal_code")
                            }}
                            multiline={false}
                            testID="billing-postalcode"
                            textStyle={this.styles.style.fontFormSmallDarkGrey}
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
                              this.state.userData.billingAddress?.postal_code
                                ? this.state.userData.billingAddress?.postal_code
                                : ""
                            }
                            isEditable={true}
                          ></EditableText>
                        </>
                      )}
                      <div>
                        <br></br>
                        <br></br>
                      </div>
                      <Text style={{ fontFamily: "Graphik-Bold-App" }}>
                        Credit Card Information
                      </Text>
                      <Label style={this.styles.style.fontFormSmall}>
                        <Text
                          style={[
                            this.styles.style.fontFormMandatory,
                            !this.state.stripeValidation.cardNumber
                              ? { opacity: 1 }
                              : { opacity: 0 },
                          ]}
                        >
                          *
                        </Text>
                        Credit Card Number
                      </Label>
                      <CardNumberElement
                        onChange={(el) => this.stripeFieldValidation(el, "cardNumber")}
                        options={CARD_ELEMENT_OPTIONS}
                      />
                      <Label style={this.styles.style.fontFormSmall}>
                        <Text
                          style={[
                            this.styles.style.fontFormMandatory,
                            !this.state.stripeValidation.expiryDate
                              ? { opacity: 1 }
                              : { opacity: 0 },
                          ]}
                        >
                          *
                        </Text>
                        Expiry Date
                      </Label>
                      <CardExpiryElement
                        onChange={(el) => this.stripeFieldValidation(el, "expiryDate")}
                        options={CARD_ELEMENT_OPTIONS}
                      />
                      <Label style={this.styles.style.fontFormSmall}>
                        <Text
                          style={[
                            this.styles.style.fontFormMandatory,
                            !this.state.stripeValidation.cvc ? { opacity: 1 } : { opacity: 0 },
                          ]}
                        >
                          *
                        </Text>
                        CVC
                      </Label>
                      <CardCvcElement
                        onChange={(el) => this.stripeFieldValidation(el, "cvc")}
                        options={CARD_ELEMENT_OPTIONS}
                      />
                    </View>
                    <View style={this.styles.style.signUpScreen1PaymentColumn2}>
                      <View style={{ display: "none" }}>
                        <JCButton
                          buttonType={ButtonTypes.TransparentNoPadding}
                          onPress={() => {
                            this.showSubscriptionSelector()
                          }}
                        >
                          Add another product
                        </JCButton>
                      </View>
                      <View style={{ marginBottom: 20, marginTop: 20 }}>
                        {this.state.currentProduct?.map((item: Product, index: number) => {
                          return this.renderProduct(item, index)
                        })}
                      </View>

                      {this.state.invoice?.lines?.data
                        .filter((item) => item.amount != 0)
                        .map((line, index: number) => {
                          return (
                            <View key={index} style={this.styles.style.flexRow}>
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
                                {line.description.split("(")?.[0]?.split("×")[1]?.trim() ??
                                  line.description.split("(")[0] ??
                                  line.description}
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
                                ${(line.amount / 100).toFixed(2)}
                              </Text>
                            </View>
                          )
                        })}
                      <View style={[this.styles.style.flexRow, { marginBottom: 10 }]}>
                        {!this.state.invoice ? (
                          <View style={{ paddingTop: 10, marginRight: 10 }}>
                            <ActivityIndicator></ActivityIndicator>
                          </View>
                        ) : null}
                        <Text
                          style={{
                            flex: 1,
                            textAlign: !this.state.invoice ? "left" : "right",
                            textAlignVertical: "center",
                            paddingRight: 45,

                            fontFamily: "Graphik-Bold-App",
                            paddingTop: 10,
                            paddingBottom: 10,
                          }}
                        >
                          {this.state.invoice ? "Total:" : "Calculating Total..."}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Graphik-Bold-App",
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingRight: 10,
                          }}
                        >
                          {this.state.invoice
                            ? "$" + (this.state.invoice.total / 100).toFixed(2)
                            : ""}
                        </Text>
                      </View>
                      <Text style={{ color: "red", textAlign: "center", marginBottom: 4 }}>
                        {this.state.errorMsg}
                      </Text>
                      <View style={{ marginHorizontal: 10 }}>
                        <JCButton
                          testID={"billing-processPayment-button"}
                          buttonType={ButtonTypes.Solid}
                          onPress={() => {
                            this.setState({ errorMsg: "" })
                            this.makePayment(stripe, elements)
                          }}
                          enabled={this.isMakePaymentEnabled() && !!this.state.invoice}
                        >
                          Process Payment
                        </JCButton>
                      </View>
                    </View>
                  </Content>
                  {this.renderAddProductModal(userState)}
                </>
              )
            }}
          </BillingImpl.UserConsumer>
        )}
      </ElementsConsumer>
    )
  }
}
let env = "unknown"
if (window.location === undefined) env = "mobile"
else if (window.location.hostname === "localhost") env = "dev"
else if (window.location.hostname.includes("beta")) env = "beta"
else if (window.location.hostname.includes("dev")) env = "dev"
else env = "prod"

export default function Billing(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()

  const [stripePromise, setStripePromise] = useState(() =>
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
