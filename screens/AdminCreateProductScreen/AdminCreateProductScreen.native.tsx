import { AntDesign } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import { Container, Content, Icon, Picker, Text } from "native-base"
import * as React from "react"
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, View } from "react-native"
import { Data } from "../../Components/Data/Data"
import EditableRichText from "../../components/Forms/EditableRichText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import Header from "../../components/Header/Header"
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin"
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
  description: string
  productId: string
  confirmationMsg: string
  price: string
  pricePer: string
  tiered: TieredProductInput[]
  mode: "save" | "edit"
  isLogin: string
  isOrgTier: string
  isIndividualTier: string
  marketingDescription: string
  groupsIncluded: string[]
  enabled: string
  isStripe: string
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
      // description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
      productId: `JC-${Date.now()}`,
      confirmationMsg: "",
      price: "",
      pricePer: "One-Time",
      mode: "save",
      isLogin: "false",
      isOrgTier: "false",
      isIndividualTier: "false",
      //  marketingDescription: JSON.stringify(
      //    convertToRaw(EditorState.createEmpty().getCurrentContent())
      //  ),
      tiered: [{ name: "", stripePaymentID: "", stripeIsTiered: "false" }],
      groupsIncluded: [],
      enabled: "true",
      isStripe: "true",
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
      this.setState({ products: listProducts.data?.listProducts?.items })
    } catch (err) {
      console.error(err)
    }
  }

  handlePress(product: any): void {
    this.setState({
      name: product.name,
      productId: product.id,
      description: product.description,
      confirmationMsg: product.confirmationMsg,
      price: product.price.toFixed(2),
      pricePer: product.pricePer,
      mode: "edit",
      isLogin: product.isLogin,
      isOrgTier: product.isOrgTier,
      isIndividualTier: product.isIndividualTier,
      marketingDescription: product.marketingDescription,
      groupsIncluded: product.groupsIncluded,
      enabled: product.enabled,
      isStripe: product.isStripe,
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
        case "save":
          const newProduct: CreateProductInput = {
            id: this.state.productId,
            price: parseFloat(this.state.price),
            pricePer: this.state.pricePer,
            description: this.state.description,
            name: this.state.name,
            confirmationMsg: this.state.confirmationMsg,
            isLogin: this.state.isLogin,
            isOrgTier: this.state.isOrgTier,
            isIndividualTier: this.state.isIndividualTier,
            marketingDescription: this.state.marketingDescription,
            groupsIncluded: this.state.groupsIncluded,
            enabled: this.state.enabled,
            isStripe: this.state.isStripe,
            isPaypal: this.state.isPaypal,
            tiered: this.state.tiered,
          }
          const createProduct = await Data.createProduct(newProduct)
          console.log(createProduct)
          this.setInitialData()
          this.setState({
            name: "",
            // description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
            productId: `JC-${Date.now()}`,
            confirmationMsg: "",
            price: "",
            pricePer: "One-Time",
            isLogin: "false",
            isOrgTier: "false",
            isIndividualTier: "false",
            //  marketingDescription: JSON.stringify(
            //    convertToRaw(EditorState.createEmpty().getCurrentContent())
            // ),
            groupsIncluded: [],
            enabled: "true",
            isStripe: "true",
            isPaypal: "false",
            tiered: [{ name: "", stripePaymentID: "", stripeIsTiered: "false" }],
            showAddProductModal: false,
          })
          break
        case "edit":
          const editProduct: UpdateProductInput = {
            id: this.state.productId,
            price: parseFloat(this.state.price),
            pricePer: this.state.pricePer,
            description: this.state.description,
            name: this.state.name,
            confirmationMsg: this.state.confirmationMsg,
            isLogin: this.state.isLogin,
            isOrgTier: this.state.isOrgTier,
            isIndividualTier: this.state.isIndividualTier,
            marketingDescription: this.state.marketingDescription,
            groupsIncluded: this.state.groupsIncluded,
            enabled: this.state.enabled,
            isStripe: this.state.isStripe,
            tiered: this.state.tiered,
            isPaypal: this.state.isPaypal,
          }
          const updateProduct = await Data.updateProduct(editProduct)
          console.log(updateProduct)
          this.setInitialData()
          this.setState({
            name: "",
            //  description: JSON.stringify(
            //    convertToRaw(EditorState.createEmpty().getCurrentContent())
            //  ),
            productId: `JC-${Date.now()}`,
            confirmationMsg: "",
            price: "",
            pricePer: "One-Time",
            isLogin: "false",
            isOrgTier: "false",
            isIndividualTier: "false",
            //   marketingDescription: JSON.stringify(
            //     convertToRaw(EditorState.createEmpty().getCurrentContent())
            //   ),
            groupsIncluded: [],
            enabled: "true",
            isStripe: "true",
            isPaypal: "false",
            tiered: [{ name: "", stripePaymentID: "", stripeIsTiered: "false" }],
            showAddProductModal: false,
          })
          break
      }
    } catch (err) {
      console.error(err)
    }
  }
  updateTierList(val: any): void {
    const tmp = this.state.groupsIncluded
    const index = tmp.indexOf(val)
    if (index !== -1) tmp.splice(index, 1)
    else tmp.push(val)
    this.setState({ groupsIncluded: tmp })
  }
  addTier(): void {
    const temp = this.state.tiered ? this.state.tiered : []
    temp.push({ name: "", stripeIsTiered: "false", stripePaymentID: "" })
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
            <Text>Id: </Text>
            <TextInput
              onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                this.setState({ productId: val.nativeEvent.text })
              }}
              placeholder="productId"
              multiline={false}
              value={this.state.productId}
            ></TextInput>
            <Text>Product name: </Text>
            <TextInput
              onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                this.setState({ name: val.nativeEvent.text })
              }}
              placeholder="Name"
              multiline={false}
              value={this.state.name}
            ></TextInput>
            <Text>Price: </Text>
            <TextInput
              onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                this.setState({ price: val.nativeEvent.text })
              }}
              placeholder="Price in CAD"
              multiline={false}
              value={this.state.price}
            ></TextInput>
            <Picker
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponderCapture={() => true}
              onStartShouldSetResponderCapture={() => true}
              onMoveShouldSetResponder={() => true}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
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
              placeholder="Event type"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.pricePer}
            >
              <Picker.Item label="One-Time" value="One-Time" />
              <Picker.Item label="Monthly" value="Monthly" />
              <Picker.Item label="Yearly" value="Yearly" />
            </Picker>
            <Text>Purchase confirmation message</Text>
            <TextInput
              onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                this.setState({ confirmationMsg: val.nativeEvent.text })
              }}
              placeholder="optional: 1-2 sentences"
              multiline={false}
              value={this.state.confirmationMsg}
            ></TextInput>
            <JCSwitch
              switchLabel="Show on Login Page"
              initState={this.state.isLogin == "true"}
              onPress={(val) => {
                this.setState({ isLogin: val })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Org Tier"
              initState={this.state.isOrgTier == "true"}
              onPress={(val) => {
                this.setState({ isOrgTier: val })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Individual Tier"
              initState={this.state.isIndividualTier == "true"}
              onPress={(val) => {
                this.setState({ isIndividualTier: val })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Enabled"
              initState={this.state.enabled == "true"}
              onPress={(val) => {
                this.setState({ enabled: val })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Paypal"
              initState={this.state.isPaypal == "true"}
              onPress={(val) => {
                this.setState({ isPaypal: val })
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Stripe"
              initState={this.state.isStripe == "true"}
              onPress={(val) => {
                this.setState({ isStripe: val })
              }}
            ></JCSwitch>
            {this.state.tiered?.map((item, index) => {
              return (
                <React.Fragment key={index}>
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
                  <JCSwitch
                    switchLabel="Is Tier"
                    initState={item.stripeIsTiered == "true"}
                    onPress={(val) => {
                      this.updateTier(index, "stripeIsTiered", val)
                    }}
                  ></JCSwitch>
                  <AntDesign
                    name="delete"
                    size={20}
                    color="black"
                    onPress={() => this.deleteTier(index)}
                  />
                </React.Fragment>
              )
            })}
            <AntDesign name="plus" size={20} color="black" onPress={() => this.addTier()} />
            <EditableRichText
              onChange={(val: any) => {
                this.setState({ marketingDescription: val })
              }}
              value={this.state.marketingDescription}
              isEditable={true}
            ></EditableRichText>
            <Text>Groups: </Text>
            {this.state.groupList.map((item, index) => {
              return (
                <JCSwitch
                  key={index}
                  switchLabel={item}
                  initState={this.state.groupsIncluded?.includes(item)}
                  onPress={() => {
                    this.updateTierList(item)
                  }}
                ></JCSwitch>
              )
            })}
          </View>
          <Text>Description</Text>

          <EditableRichText
            toolBar={toolBar}
            onChange={(description: any) => this.setState({ description })}
            value={this.state.description}
            isEditable={true}
          />

          <JCButton buttonType={ButtonTypes.Outline} onPress={() => this.saveProduct()}>
            save product
          </JCButton>
        </>
      </JCModal>
    )
  }
  static UserConsumer = UserContext.Consumer

  render(): React.ReactNode {
    return (
      <AdminScreen.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return (
            <Container>
              <Header title="Jesus Collective" navigation={this.props.navigation} />

              <HeaderAdmin title="Jesus Collective" navigation={this.props.navigation} />
              {userActions.isMemberOf("admin") ? (
                <Content>
                  <JCButton
                    buttonType={ButtonTypes.Outline}
                    onPress={() => {
                      this.setState({ showAddProductModal: true })
                    }}
                  >
                    Add product
                  </JCButton>

                  <Container style={this.styles.style.fontRegular}>
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
                        </View>
                      )
                    })}
                  </Container>
                </Content>
              ) : (
                <Content>
                  <Container style={this.styles.style.eventsScreenMainContainer}>
                    <Container style={this.styles.style.eventsScreenLeftContainer}>
                      <Text>You must be an admin to see this screen</Text>
                    </Container>
                  </Container>
                </Content>
              )}
              {this.renderAddProductModal()}
            </Container>
          )
        }}
      </AdminScreen.UserConsumer>
    )
  }
}
