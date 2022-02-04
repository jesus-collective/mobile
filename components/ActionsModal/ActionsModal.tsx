import React, { useEffect, useMemo, useRef } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

export default function BottomMenuModal(props: Props) {
  // TODO: ADD A BACKDROP

  const { isOpen, close, menuItems } = props
  const prevOpenState = useRef(isOpen)
  const dimensions = useWindowDimensions()
  const top = useSharedValue(dimensions.height)

  const calculateModalHeight = useMemo(() => {
    const margin = 12
    const doneHeight = 44
    const itemsHeight = props.menuItems.length * 44
    const paddingBottom = 27
    const bottomTabBarHeight = 48
    const total = bottomTabBarHeight + margin + paddingBottom + doneHeight + itemsHeight + 100
    return dimensions.height - total
  }, [props.menuItems, dimensions.height])

  const closeModal = () => {
    top.value = dimensions.height
    close()
  }

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context: GestureContext) {
      context.startTop = top.value
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY
    },
    onEnd() {
      if (top.value > calculateModalHeight + 70) {
        top.value = calculateModalHeight
        close()
      } else {
        // threshhold not met, stay open
        top.value = calculateModalHeight
      }
    },
  })

  const toggleOpen = () => {
    if (isOpen) openModal()
    else if (!isOpen && prevOpenState.current === true) closeModal() // only close if it was previously open
  }

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPRING_CONFIG),
    }
  })

  const openModal = () => {
    top.value = withSpring(calculateModalHeight, SPRING_CONFIG)
  }

  useEffect(() => {
    toggleOpen()
  }, [isOpen])

  useEffect(() => {
    prevOpenState.current = isOpen
  })
  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[ModalStyle.MenuContainer, style]}>
          {menuItems.map((item, index) => {
            const menuItemsStyles = [
              ModalStyle.MenuItem,
              index === 0 ? ModalStyle.MenuItemFirst : {},
              index === menuItems.length - 1 ? ModalStyle.MenuItemLast : {},
            ]
            return (
              <TouchableOpacity
                key={item.title}
                delayPressIn={150}
                style={menuItemsStyles}
                onPress={item.action}
              >
                {item?.icon ? (
                  <Image style={ModalStyle.MenuItemIcon} source={require(`/${item?.icon}/`)} />
                ) : null}
                <Text style={ModalStyle.MenuItemText}>{item.title}</Text>
              </TouchableOpacity>
            )
          })}
          <TouchableOpacity
            delayPressIn={150}
            style={[ModalStyle.MenuItem, ModalStyle.MenuItemRounded]}
            onPress={closeModal}
          >
            <Text style={[ModalStyle.MenuItemText, ModalStyle.MenuItemTextRounded]}>Done</Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

const SPRING_CONFIG = {
  damping: 70,
  overshootClamping: true,
  restSpeedThreshold: 0.01,
  stiffness: 500,
}

export type ModalMenuItem = {
  title: string
  action: () => void
  icon?: string
}

type Props = {
  isOpen: boolean
  close: () => void
  menuItems: ModalMenuItem[]
}

type GestureContext = {
  startTop: number
}

const ModalStyle = StyleSheet.create({
  MenuContainer: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: 20,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  MenuItem: {
    borderTopColor: "#D1382E",
    borderTopWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    backgroundColor: "#FF4438",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
  },
  MenuItemRounded: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 12,
  },
  MenuItemFirst: {
    borderTopWidth: 0,
    borderTopColor: "unset",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  MenuItemTextRounded: {
    flex: 1,
    textAlign: "center",
  },
  MenuItemLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  MenuItemText: {
    color: "white",
    fontFamily: "Graphik-Semibold-App",
    fontSize: 15,
    flex: 1,
  },
  MenuItemIcon: {
    height: 24,
    width: 24,
  },
})
