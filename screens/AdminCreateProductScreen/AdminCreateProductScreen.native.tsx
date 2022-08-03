import { AntDesign } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import * as React from "react"
import {
  NativeSyntheticEvent,
  Picker,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native"
import { Data } from "../../components/Data/Data"
import EditableRichText from "../../components/Forms/EditableRichText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import Header from "../../components/Header/Header"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import {
  CreateProductInput,
  ListProductsQuery,
  TieredProductInput,
  UpdateProductInput,
  UserGroupType,
} from "../../src/API"
interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
interface State extends JCState {
  products: NonNullable<NonNullable<ListProductsQuery>["listProducts"]>["items"]
  name: string
  eula: string
  productId: string
  confirmationMsg: string
  price: string
  pricePer: string
  tiered: TieredProductInput[]
  mode: "save" | "edit"
  isLogin: string
  isOrgTier: string
  isIndividualTier: string
  enabled: string
  isStripe: string
  isDefault: boolean
  isPaypal: string
  groupList: string[]
  showAddProductModal: boolean
}

const toolBar = {
  options: ["inline", "list"],
  inline: {
    options: ["bold", "italic", "underline"],
  },
  list: {
    options: ["unordered", "ordered"],
  },
}

export default class AdminScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      products: [],
      name: "",
      productId: `JC-${Date.now()}`,
      confirmationMsg: "",
      price: "",
      pricePer: "One-Time",
      mode: "save",
      isLogin: "false",
      isOrgTier: "false",
      isIndividualTier: "false",
      tiered: [{ name: "", stripePaymentID: "", defaultAmount: 1, amountIsEditable: "false" }],
      enabled: "true",
      isStripe: "true",
      isDefault: false,
      isPaypal: "false",
      groupList: Object.keys(UserGroupType).map((org: string) => {
        return org
      }),
      showAddProductModal: false,
    }
    this.setInitialData()
  }
  async setInitialData(): Promise<void> {
    try {
      const listProducts = await Data.listProducts(null)
      this.setState({ products: listProducts.data?.listProducts?.items ?? [] })
    } catch (err) {
      console.error(err)
    }
  }

  handlePress(product: any): void {
    this.setState({
      name: product.name,
      productId: product.id,
      eula: product.eula,
      confirmationMsg: product.confirmationMsg,
      price: product.price.toFixed(2),
      pricePer: product.pricePer,
      mode: "edit",
      isLogin: product.isLogin,
      isOrgTier: product.isOrgTier,
      isIndividualTier: product.isIndividualTier,
      enabled: product.enabled,
      isStripe: product.isStripe,
      isDefault: product.isDefault,
      isPaypal: product.isPaypal,
      tiered: product.tiered,
      showAddProductModal: true,
    })
  }

  async deleteProduct(id: string): Promise<void> {
    if (window.confirm(`Delete ${id}?`)) {
      try {
        const deleteProduct = await Data.deleteProduct(id)
        console.log(deleteProduct)
        this.setInitialData()
      } catch (e) {
        console.error(e)
      }
    } else {
      return
    }
  }

  async saveProduct(): Promise<void> {
    if (isNaN(parseInt(this.state.price))) return
    try {
      switch (this.state.mode) {
        case "save": {
          const newProduct: CreateProductInput = {
            id: this.state.productId,
            price: parseFloat(this.state.price),
            pricePer: this.state.pricePer,
            eula: this.state.eula,
            name: this.state.name,
            confirmationMsg: this.state.confirmationMsg,
            isLogin: this.state.isLogin,
            isOrgTier: this.state.isOrgTier,
            isIndividualTier: this.state.isIndividualTier,
            enabled: this.state.enabled,
            isStripe: this.state.isStripe,
            isDefault: this.state.isDefault,
            isPaypal: this.state.isPaypal,
            tiered: this.state.tiered,
          }
          const createProduct = await Data.createProduct(newProduct)
          console.log(createProduct)
          this.setInitialData()
          this.setState({
            name: "",
            productId: `JC-${Date.now()}`,
            confirmationMsg: "",
            price: "",
            pricePer: "One-Time",
            isLogin: "false",
            isOrgTier: "false",
            isIndividualTier: "false",
            enabled: "true",
            isStripe: "true",
            isDefault: false,
            isPaypal: "false",
            tiered: [
              { name: "", stripePaymentID: "", defaultAmount: 1, amountIsEditable: "false" },
            ],
            showAddProductModal: false,
          })
          break
        }
        case "edit": {
          const editProduct: UpdateProductInput = {
            id: this.state.productId,
            price: parseFloat(this.state.price),
            pricePer: this.state.pricePer,
            eula: this.state.eula,
            name: this.state.name,
            confirmationMsg: this.state.confirmationMsg,
            isLogin: this.state.isLogin,
            isOrgTier: this.state.isOrgTier,
            isIndividualTier: this.state.isIndividualTier,
            enabled: this.state.enabled,
            isStripe: this.state.isStripe,
            isDefault: this.state.isDefault,
            tiered: this.state.tiered,
            isPaypal: this.state.isPaypal,
          }
          const updateProduct = await Data.updateProduct(editProduct)
          console.log(updateProduct)
          this.setInitialData()
          this.setState({
            name: "",
            productId: `JC-${Date.now()}`,
            confirmationMsg: "",
            price: "",
            pricePer: "One-Time",
            isLogin: "false",
            isOrgTier: "false",
            isIndividualTier: "false",
            enabled: "true",
            isStripe: "true",
            isDefault: false,
            isPaypal: "false",
            tiered: [
              { name: "", stripePaymentID: "", defaultAmount: 1, amountIsEditable: "false" },
            ],
            showAddProductModal: false,
          })
          break
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  addTier(): void {
    const temp = this.state.tiered ? this.state.tiered : []
    temp.push({ name: "", defaultAmount: 1, stripePaymentID: "", amountIsEditable: "false" })
    this.setState({ tiered: temp })
  }
  deleteTier(index: number): void {
    const temp = this.state.tiered
    temp.splice(index, 1)
    this.setState({ tiered: temp })
  }
  updateTier(index: number, field: string, value: any): void {
    const temp = this.state.tiered
    temp[index][field] = value
    this.setState({ tiered: temp })
  }
  renderAddProductModal(): React.ReactNode {
    return (
      <JCModal
        visible={this.state.showAddProductModal}
        title="Add Tier"
        onHide={() => {
          this.setState({ showAddProductModal: false })
        }}
      >
        <>
          <View>
            <div style={{ flexDirection: "row" }}>
              <Text>Id: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  this.setState({ productId: val.nativeEvent.text })
                }}
                placeholder="productId"
                multiline={false}
                value={this.state.productId}
              ></TextInput>
            </div>
            <div style={{ flexDirection: "row" }}>
              <Text>Product name: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  this.setState({ name: val.nativeEvent.text })
                }}
                placeholder="Name"
                multiline={false}
                value={this.state.name}
              ></TextInput>
            </div>
            <div style={{ flexDirection: "row" }}>
              <Text>Price: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  this.setState({ price: val.nativeEvent.text })
                }}
                placeholder="Price in CAD"
                multiline={false}
                value={this.state.price}
              ></TextInput>
            </div>
            <Picker
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponderCapture={() => true}
              onStartShouldSetResponderCapture={() => true}
              onMoveShouldSetResponder={() => true}
              mode="dropdown"
              // iosIcon={<Icon name="arrow-down" />}
              style={{
                width: "30%",
                marginBottom: 0,
                marginTop: 0,
                fontSize: 16,
                height: 30,
                flexGrow: 0,
                marginRight: 0,
                borderColor: "#dddddd",
              }}
              //  placeholder="Event type"
              // placeholderStyle={{ color: "#bfc6ea" }}
              // placeholderIconColor="#007aff"
              selectedValue={this.state.pricePer}
            >
              <Picker.Item label="One-Time" value="One-Time" />
              <Picker.Item label="Monthly" value="Monthly" />
              <Picker.Item label="Yearly" value="Yearly" />
            </Picker>
            <div style={{ flexDirection: "row" }}>
              <Text>Purchase confirmation message: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  this.setState({ confirmationMsg: val.nativeEvent.text })
                }}
                placeholder="optional: 1-2 sentences"
                multiline={false}
                value={this.state.confirmationMsg}
              ></TextInput>
            </div>
            <JCSwitch
              switchLabel="Show on Login Page"
              initState={this.state.isLogin == "true"}
              onPress={(val) => {
                this.setState({ isLogin: val.toString() })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Org Tier"
              initState={this.state.isOrgTier == "true"}
              onPress={(val) => {
                this.setState({ isOrgTier: val.toString() })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Individual Tier"
              initState={this.state.isIndividualTier == "true"}
              onPress={(val) => {
                this.setState({ isIndividualTier: val.toString() })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Enabled"
              initState={this.state.enabled == "true"}
              onPress={(val) => {
                this.setState({ enabled: val.toString() })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Paypal"
              initState={this.state.isPaypal == "true"}
              onPress={(val) => {
                this.setState({ isPaypal: val.toString() })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Stripe"
              initState={this.state.isStripe == "true"}
              onPress={(val) => {
                this.setState({ isStripe: val.toString() })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Default"
              initState={this.state.isDefault == true}
              onPress={(val) => {
                this.setState({ isDefault: val })
              }}
            ></JCSwitch>
            {this.state.tiered?.map((item, index) => {
              return (
                <div style={{ flexDirection: "row", borderStyle: "solid", borderWidth: 1 }}>
                  <TextInput
                    onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      this.updateTier(index, "name", val.nativeEvent.text)
                    }}
                    placeholder="Tier Name"
                    multiline={false}
                    value={item.name ?? ""}
                  ></TextInput>
                  <TextInput
                    onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      this.updateTier(index, "stripePaymentID", val.nativeEvent.text)
                    }}
                    placeholder="Tier StripePaymentID"
                    multiline={false}
                    value={item.stripePaymentID ?? ""}
                  ></TextInput>
                  <TextInput
                    onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      this.updateTier(index, "defaultAmount", val.nativeEvent.text)
                    }}
                    keyboardType="numeric"
                    placeholder="Default Amount"
                    multiline={false}
                    value={(item.defaultAmount ?? 1).toString()}
                  ></TextInput>
                  <JCSwitch
                    switchLabel="Is Editable"
                    initState={item.amountIsEditable == "true"}
                    onPress={(val) => {
                      this.updateTier(index, "amountIsEditable", val.toString())
                    }}
                  ></JCSwitch>
                  <JCSwitch
                    switchLabel="Is Subscription"
                    initState={item.isSubscription ?? false}
                    onPress={(val) => {
                      this.updateTier(index, "isSubscription", val.toString())
                    }}
                  ></JCSwitch>
                  <AntDesign
                    name="delete"
                    size={20}
                    color="black"
                    onPress={() => this.deleteTier(index)}
                  />
                </div>
              )
            })}
            <AntDesign name="plus" size={20} color="black" onPress={() => this.addTier()} />

            <div style={{ flexDirection: "row" }}>
              <Text>EULA: </Text>

              <EditableRichText
                toolBar={toolBar}
                onChange={(eula: any) => this.setState({ eula })}
                value={this.state.eula}
                isEditable={true}
              />
            </div>
          </View>

          <JCButton buttonType={ButtonTypes.Outline} onPress={() => this.saveProduct()}>
            save product
          </JCButton>
        </>
      </JCModal>
    )
  }
  static UserConsumer = UserContext.Consumer
  componentDidMount() {
    this.props.navigation.setOptions({
      header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
        return <Header showAdmin={true} navigation={props.navigation} title={"Admin Page"} />
      },
    })
  }
  copyToClipboard = (text: string) => {
    console.log("text", text)
    const textField = document.createElement("textarea")
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()
  }
  render(): React.ReactNode {
    return (
      <AdminScreen.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return (
            <View>
              {userActions.isMemberOf("admin") ? (
                <ScrollView>
                  <JCButton
                    buttonType={ButtonTypes.Outline}
                    onPress={() => {
                      this.setState({ showAddProductModal: true })
                    }}
                  >
                    Add product
                  </JCButton>

                  <View style={this.styles.style.fontRegular}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        width: 750,
                      }}
                    >
                      <View
                        style={{
                          borderColor: "black",
                          borderWidth: 1,
                          width: 250,
                          margin: 0,
                          borderRadius: 0,
                        }}
                      >
                        <Text style={{ alignSelf: "center" }}>Name</Text>
                      </View>
                      <View
                        style={{
                          borderColor: "black",
                          borderWidth: 1,
                          width: 250,
                          margin: 0,
                          borderRadius: 0,
                        }}
                      >
                        <Text style={{ alignSelf: "center" }}>Id</Text>
                      </View>
                      <View
                        style={{
                          borderColor: "black",
                          borderWidth: 1,
                          width: 250,
                          margin: 0,
                          borderRadius: 0,
                        }}
                      >
                        <Text style={{ alignSelf: "center" }}>Price (CAD)</Text>
                      </View>
                    </View>
                    {this.state.products?.map((product: any) => {
                      return (
                        <View key={product.id} style={{ display: "flex", flexDirection: "row" }}>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-evenly",
                              width: 750,
                            }}
                          >
                            <View
                              style={{
                                borderColor: "black",
                                borderWidth: 1,
                                width: 250,
                                margin: 0,
                                borderRadius: 0,
                              }}
                            >
                              <Text style={{ alignSelf: "center" }}>{product.name}</Text>
                            </View>
                            <View
                              style={{
                                borderColor: "black",
                                borderWidth: 1,
                                width: 250,
                                margin: 0,
                                borderRadius: 0,
                              }}
                            >
                              <Text style={{ alignSelf: "center" }}>{product.id}</Text>
                            </View>
                            <View
                              style={{
                                borderColor: "black",
                                borderWidth: 1,
                                width: 250,
                                margin: 0,
                                borderRadius: 0,
                              }}
                            >
                              <Text style={{ alignSelf: "center" }}>
                                {typeof product.price == "number"
                                  ? product.price.toFixed(2)
                                  : "NaN"}
                              </Text>
                            </View>
                          </View>
                          <AntDesign
                            name="delete"
                            size={20}
                            color="black"
                            onPress={() => this.deleteProduct(product.id)}
                          />
                          <AntDesign
                            name="edit"
                            size={20}
                            color="black"
                            onPress={() => this.handlePress(product)}
                          />

                          <AntDesign
                            name="link"
                            size={20}
                            color="black"
                            onPress={() => {
                              this.copyToClipboard(
                                "https://" +
                                  window.location.hostname +
                                  "/auth/signup?joinedProduct=" +
                                  product.id
                              )
                            }}
                          />
                        </View>
                      )
                    })}
                  </View>
                </ScrollView>
              ) : (
                <ScrollView>
                  <View style={this.styles.style.eventsScreenMainContainer}>
                    <View style={this.styles.style.eventsScreenLeftContainer}>
                      <Text>You must be an admin to see this screen</Text>
                    </View>
                  </View>
                </ScrollView>
              )}
              {this.renderAddProductModal()}
            </View>
          )
        }}
      </AdminScreen.UserConsumer>
    )
  }
}
