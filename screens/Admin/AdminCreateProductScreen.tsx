import { AntDesign } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { StackNavigationProp } from "@react-navigation/stack"
import { convertToRaw, EditorState } from "draft-js"
import * as React from "react"
import { useEffect, useState } from "react"
import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native"
import { AdminStyles } from "../../components/AdminStyles"
import { Data } from "../../components/Data/Data"
import EditableRichText from "../../components/Forms/EditableRichText"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCModal from "../../components/Forms/JCModal"
import Header from "../../components/Header/Header"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import {
  CreateProductInput,
  ListProductsQuery,
  TieredProductInput,
  UpdateProductInput,
} from "../../src/API"
import { UserContext } from "../HomeScreen/UserContext"
interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
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

export default function AdminScreen(props: Props) {
  const styles = StyleSheet.create(AdminStyles)
  const [products, setProducts] = useState<
    NonNullable<NonNullable<ListProductsQuery>["listProducts"]>["items"]
  >([])
  const [name, setName] = useState<string>("")
  const [eula, setEula] = useState<string>(
    JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
  )
  const [productId, setProductId] = useState<string>(`JC-${Date.now()}`)
  const [confirmationMsg, setConfirmationMsg] = useState<string>("")
  const [submitButtonText, setSubmitButtonText] = useState<string>("Process Payment")
  const [price, setPrice] = useState<string>("")
  const [pricePer, setPricePer] = useState<string>("One-Time")
  const [mode, setMode] = useState<"save" | "edit">("save")
  const [isLogin, setIsLogin] = useState<string>("false")
  const [isOrgTier, setIsOrgTier] = useState<string>("false")
  const [isIndividualTier, setIsIndividualTier] = useState<string>("false")
  const [tiered, setTiered] = useState<TieredProductInput[]>([
    { name: "", stripePaymentID: "", defaultAmount: 1, amountIsEditable: "false" },
  ])
  const [enabled, setEnabled] = useState<string>("true")
  const [isStripe, setIsStripe] = useState<string>("true")
  const [isDefault, setIsDefault] = useState<boolean>(false)
  const [isPaypal, setIsPaypal] = useState<string>("false")
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false)

  useEffect(() => {
    setInitialData()
  }, [])

  const setInitialData = async (): Promise<void> => {
    try {
      const listProducts = await Data.listProducts(null)
      setProducts(listProducts.data?.listProducts?.items ?? [])
    } catch (err) {
      console.error(err)
    }
  }

  const handlePress = (product: any): void => {
    setName(product.name)
    setProductId(product.id)
    setEula(product.eula)
    setConfirmationMsg(product.confirmationMsg)
    setSubmitButtonText(product.submitButtonText)
    setPrice(product.price.toFixed(2))
    setPricePer(product.pricePer)
    setMode("edit")
    setIsLogin(product.isLogin)
    setIsOrgTier(product.isOrgTier)
    setIsIndividualTier(product.isIndividualTier)
    setEnabled(product.enabled)
    setIsStripe(product.isStripe)
    setIsDefault(product.isDefault)
    setIsPaypal(product.isPaypal)
    setTiered(product.tiered)
    setShowAddProductModal(true)
  }

  const deleteProduct = async (id: string): Promise<void> => {
    if (window.confirm(`Delete ${id}?`)) {
      try {
        const deleteProduct = await Data.deleteProduct(id)
        console.log(deleteProduct)
        setInitialData()
      } catch (e) {
        console.error(e)
      }
    } else {
      return
    }
  }

  const saveProduct = async (): Promise<void> => {
    if (isNaN(parseInt(price))) return
    try {
      switch (mode) {
        case "save": {
          const newProduct: CreateProductInput = {
            id: productId,
            price: parseFloat(price),
            pricePer: pricePer,
            eula: eula,
            name: name,
            confirmationMsg: confirmationMsg,
            submitButtonText: submitButtonText,
            isLogin: isLogin,
            isOrgTier: isOrgTier,
            isIndividualTier: isIndividualTier,
            enabled: enabled,
            isStripe: isStripe,
            isDefault: isDefault,
            isPaypal: isPaypal,
            tiered: tiered,
          }
          const createProduct = await Data.createProduct(newProduct)
          console.log(createProduct)
          setInitialData()

          setName("")
          setEula(JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())))
          setProductId(`JC-${Date.now()}`)
          setConfirmationMsg("")
          setSubmitButtonText("Process Payment")
          setPrice("")
          setPricePer("One-Time")
          setIsLogin("false")
          setIsOrgTier("false")
          setIsIndividualTier("false")
          setEnabled("true")
          setIsStripe("true")
          setIsDefault(false)
          setIsPaypal("false")
          setTiered([
            { name: "", stripePaymentID: "", defaultAmount: 1, amountIsEditable: "false" },
          ])
          setShowAddProductModal(false)

          break
        }
        case "edit": {
          const editProduct: UpdateProductInput = {
            id: productId,
            price: parseFloat(price),
            pricePer: pricePer,
            eula: eula,
            name: name,
            confirmationMsg: confirmationMsg,
            submitButtonText: submitButtonText,
            isLogin: isLogin,
            isOrgTier: isOrgTier,
            isIndividualTier: isIndividualTier,
            enabled: enabled,
            isStripe: isStripe,
            isDefault: isDefault,
            tiered: tiered,
            isPaypal: isPaypal,
          }
          const updateProduct = await Data.updateProduct(editProduct)
          console.log(updateProduct)
          setInitialData()
          setName("")
          setEula(JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())))
          setProductId(`JC-${Date.now()}`)
          setConfirmationMsg("")
          setSubmitButtonText("Process Payment")
          setPrice("")
          setPricePer("One-Time")
          setIsLogin("false")
          setIsOrgTier("false")
          setIsIndividualTier("false")
          setEnabled("true")
          setIsStripe("true")
          setIsDefault(false)
          setIsPaypal("false")
          setTiered([
            { name: "", stripePaymentID: "", defaultAmount: 1, amountIsEditable: "false" },
          ])
          setShowAddProductModal(false)

          break
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const addTier = (): void => {
    const temp = tiered ? tiered : []
    temp.push({ name: "", defaultAmount: 1, stripePaymentID: "", amountIsEditable: "false" })
    setTiered(temp)
  }
  const deleteTier = (index: number): void => {
    const temp = tiered
    temp.splice(index, 1)
    setTiered(temp)
  }
  const updateTier = (index: number, field: string, value: any): void => {
    const temp = tiered
    temp[index][field] = value
    setTiered(temp)
  }
  const renderAddProductModal = (): React.ReactNode => {
    return (
      <JCModal
        visible={showAddProductModal}
        title="Add Tier"
        onHide={() => {
          setShowAddProductModal(false)
        }}
      >
        <>
          <View>
            <div style={{ flexDirection: "row" }}>
              <Text>Id: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  setProductId(val.nativeEvent.text)
                }}
                placeholder="productId"
                multiline={false}
                value={productId}
              ></TextInput>
            </div>
            <div style={{ flexDirection: "row" }}>
              <Text>Product name: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  setName(val.nativeEvent.text)
                }}
                placeholder="Name"
                multiline={false}
                value={name}
              ></TextInput>
            </div>
            <div style={{ flexDirection: "row" }}>
              <Text>Price: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  setPrice(val.nativeEvent.text)
                }}
                placeholder="Price in CAD"
                multiline={false}
                value={price}
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
              // placeholder="Event type"
              //placeholderStyle={{ color: "#bfc6ea" }}
              //placeholderIconColor="#007aff"
              selectedValue={pricePer}
            >
              <Picker.Item label="One-Time" value="One-Time" />
              <Picker.Item label="Monthly" value="Monthly" />
              <Picker.Item label="Yearly" value="Yearly" />
            </Picker>
            <div style={{ flexDirection: "row" }}>
              <Text>Purchase confirmation message: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  setConfirmationMsg(val.nativeEvent.text)
                }}
                placeholder="optional: 1-2 sentences"
                multiline={false}
                value={confirmationMsg}
              ></TextInput>
            </div>
            <div style={{ flexDirection: "row" }}>
              <Text>Purchase submit button text: </Text>
              <TextInput
                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  setSubmitButtonText(val.nativeEvent.text)
                }}
                placeholder="button text"
                multiline={false}
                value={submitButtonText}
              ></TextInput>
            </div>
            <JCSwitch
              switchLabel="Show on Login Page"
              initState={isLogin == "true"}
              onPress={(val) => {
                setIsLogin(val.toString())
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Org Tier"
              initState={isOrgTier == "true"}
              onPress={(val) => {
                setIsOrgTier(val.toString())
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Individual Tier"
              initState={isIndividualTier == "true"}
              onPress={(val) => {
                setIsIndividualTier(val.toString())
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Enabled"
              initState={enabled == "true"}
              onPress={(val) => {
                setEnabled(val.toString())
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Paypal"
              initState={isPaypal == "true"}
              onPress={(val) => {
                setIsPaypal(val.toString())
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Stripe"
              initState={isStripe == "true"}
              onPress={(val) => {
                setIsStripe(val.toString())
              }}
            ></JCSwitch>
            <JCSwitch
              switchLabel="Is Default"
              initState={isDefault == true}
              onPress={(val) => {
                setIsDefault(val)
              }}
            ></JCSwitch>
            {tiered?.map((item, index) => {
              return (
                <div style={{ flexDirection: "row", borderStyle: "solid", borderWidth: 1 }}>
                  <TextInput
                    onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      updateTier(index, "name", val.nativeEvent.text)
                    }}
                    placeholder="Tier Name"
                    multiline={false}
                    value={item.name ?? ""}
                  ></TextInput>
                  <TextInput
                    onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      updateTier(index, "stripePaymentID", val.nativeEvent.text)
                    }}
                    placeholder="Tier StripePaymentID"
                    multiline={false}
                    value={item.stripePaymentID ?? ""}
                  ></TextInput>
                  <TextInput
                    onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      updateTier(index, "defaultAmount", val.nativeEvent.text)
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
                      updateTier(index, "amountIsEditable", val.toString())
                    }}
                  ></JCSwitch>
                  <JCSwitch
                    switchLabel="Is Subscription"
                    initState={item.isSubscription ?? false}
                    onPress={(val) => {
                      updateTier(index, "isSubscription", val.toString())
                    }}
                  ></JCSwitch>
                  <AntDesign
                    name="delete"
                    size={20}
                    color="black"
                    onPress={() => deleteTier(index)}
                  />
                </div>
              )
            })}
            <AntDesign name="plus" size={20} color="black" onPress={() => addTier()} />

            <div style={{ flexDirection: "row" }}>
              <Text>EULA: </Text>

              <EditableRichText
                toolBar={toolBar}
                onChange={(eula2: any) => setEula(eula2)}
                value={eula}
                isEditable={true}
              />
            </div>
          </View>

          <JCButton buttonType={ButtonTypes.Outline} onPress={() => saveProduct()}>
            save product
          </JCButton>
        </>
      </JCModal>
    )
  }
  const UserConsumer = React.useContext(UserContext)

  useEffect(() => {
    props.navigation.setOptions({
      header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
        return <Header showAdmin={true} navigation={props.navigation} title={"Admin Page"} />
      },
    })
  }, [])

  const copyToClipboard = (text: string) => {
    console.log("text", text)
    const textField = document.createElement("textarea")
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()
  }

  if (!UserConsumer.userState) return null
  return (
    <View>
      {UserConsumer.userActions.isMemberOf("admin") ? (
        <ScrollView>
          <JCButton
            buttonType={ButtonTypes.Outline}
            onPress={() => {
              setShowAddProductModal(true)
            }}
          >
            Add product
          </JCButton>

          <View style={styles.fontRegular}>
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
            {products?.map((product: any) => {
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
                        {typeof product.price == "number" ? product.price.toFixed(2) : "NaN"}
                      </Text>
                    </View>
                  </View>
                  <AntDesign
                    name="delete"
                    size={20}
                    color="black"
                    onPress={() => deleteProduct(product.id)}
                  />
                  <AntDesign
                    name="edit"
                    size={20}
                    color="black"
                    onPress={() => handlePress(product)}
                  />

                  <AntDesign
                    name="link"
                    size={20}
                    color="black"
                    onPress={() => {
                      copyToClipboard(
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
          <View style={styles.adminScreenMainContainer}>
            <View style={styles.adminScreenLeftContainer}>
              <Text>You must be an admin to see this screen</Text>
            </View>
          </View>
        </ScrollView>
      )}
      {renderAddProductModal()}
    </View>
  )
}
