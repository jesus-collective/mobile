import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type SubNavItem = {
  title: string
  hide?: boolean
  action: () => void
}

type Props = {
  navItems: SubNavItem[]
  currentTab?: number // currentTab can be used to override local active state
}

export const SubHeader = (props: Props) => {
  const { navItems, currentTab } = props
  const [active, setActive] = useState(currentTab ?? 0)
  const setActiveTab = (index: number, action: SubNavItem["action"]) => {
    setActive(index)
    action()
  }
  return (
    <View style={style.SubHeaderContainer}>
      {navItems
        .filter((item) => !item?.hide)
        .map((navItem, index) => {
          const { title, action } = navItem
          let isActive
          if (currentTab) isActive = currentTab === index
          else isActive = active === index
          return (
            <TouchableOpacity
              key={navItem.title}
              onPress={() => setActiveTab(index, action)}
              style={[style.ButtonContainer, isActive ? style.ActiveButtonContainer : {}]}
            >
              <Text style={[style.Text, isActive ? style.ActiveText : {}]}>{title}</Text>
            </TouchableOpacity>
          )
        })}
    </View>
  )
}

const style = StyleSheet.create({
  Text: {
    textAlign: "center",
    fontSize: 12,
    paddingHorizontal: 1,
    paddingBottom: 8,
    color: "#6A5E5D",
    fontFamily: "Graphik-Regular-App",
  },
  ButtonContainer: {
    marginHorizontal: 8,
  },
  SubHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E4E1E1",
    paddingHorizontal: 8,
    paddingTop: 8,
    justifyContent: "center", // this needs fixing
  },
  ActiveButtonContainer: {
    borderBottomColor: "#FF4438",
    borderBottomWidth: 2,
  },
  ActiveText: {
    color: "#1A0706",
    fontFamily: "Graphik-Semibold-App",
  },
})
