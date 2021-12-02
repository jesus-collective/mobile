import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

type SubNavItem = {
  title: string
  action: () => void
}

type Props = {
  navItems: SubNavItem[]
}

export const SubHeader = (props: Props) => {
  const { navItems } = props
  const [active, setActive] = useState(0)
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E4E1E1",
        paddingHorizontal: 8,
        paddingTop: 8,
        justifyContent: "space-evenly",
      }}
    >
      {navItems.map((navItem, index) => {
        const isActive = index === active
        return (
          <TouchableOpacity
            onPress={() => {
              setActive(index)
              navItem.action()
            }}
            style={isActive ? { borderBottomColor: "#FF4438", borderBottomWidth: 2 } : {}}
          >
            <Text
              style={{
                textAlign: "center",
                color: isActive ? "#1A0706" : "#6A5E5D",
                fontFamily: isActive ? "Graphik-Bold-App" : "Graphik-Regular-App",
                fontSize: 12,
                paddingHorizontal: 1,
                paddingBottom: 8,
              }}
            >
              {navItem.title}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
