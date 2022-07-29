import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import { Text } from "native-base"
import React, { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import PaymentFrom from "../../components/Forms/PaymentForm"
import Header from "../../components/Header/Header"
import { GetProductQuery } from "../../src/API"

interface Params {
  navigation: StackNavigationProp<any, any>
  route: any
}

export default function CoursePayment({ navigation, route }: Params): JSX.Element {
  const productId = route.params?.id
  const [product, setProduct] = useState<
    NonNullable<GetProductQuery>["getProduct"] | "unknown" | null
  >("unknown")

  useEffect(() => {
    async function getProduct() {
      try {
        const getProduct = await Data.getProduct(productId)
        setProduct(getProduct.data?.getProduct)
      } catch (e) {
        console.error(e)
      }
    }
    getProduct()
  }, [])

  const success = async (details: any) => {
    const productId = details?.purchase_units[0]?.custom_id
    const id = details?.purchase_units[0]?.invoice_id
    const create_time = details?.create_time
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser

    try {
      const saveResult = await Data.createPayment({
        id: productId + "-" + user["username"],
        productID: productId,
        userID: user["username"],
        dateCompleted: create_time,
        paymentType: "Paypal",
        paymentInfo: details,
      })

      console.log(saveResult)
    } catch (e) {
      console.error(e)
    }
    navigation.push("PurchaseConfirmationScreen", { productId, id })
  }

  if (product === "unknown") {
    return <View />
  }

  if (productId && product) {
    return (
      <View>
        <Header title="Jesus Collective" navigation={navigation} />
        <ScrollView>
          <View
            style={{ maxWidth: 800, alignSelf: "center", marginVertical: 48, marginHorizontal: 24 }}
          >
            <PaymentFrom
              product={product}
              onSuccessCallback={success}
              onFailureCallback={(e: any) => console.error(e)}
            />
          </View>
        </ScrollView>
      </View>
    )
  } else {
    return (
      <View>
        <Header title="Jesus Collective" navigation={navigation} />
        <ScrollView>
          <View style={{ width: "50%", alignSelf: "center", marginVertical: 64 }}>
            <Text style={{ fontSize: 36, fontFamily: "Graphik-Regular-App" }}>
              Something went wrong.
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Graphik-Regular-App", marginTop: 16 }}>
              Product not found. Please contact the Jesus Collective team for assistance.
            </Text>
            <View style={{ marginTop: 50 }}>
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={() => navigation.push("HomeScreen")}
              >
                Back to Home
              </JCButton>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
