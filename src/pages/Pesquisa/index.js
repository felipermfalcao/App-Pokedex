import React from "react";
import { Text, View, StyleSheet, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureDetector , Gesture} from 'react-native-gesture-handler';
  

export default function Ball() {

const isPressed = useSharedValue(false);
const offset = useSharedValue({ x: 0, y: 0 });
const animatedStyles = useAnimatedStyle(() => {
  return {
    transform: [
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      { scale: withSpring(isPressed.value ? 0.5 : 1) },
    ],
    backgroundColor: isPressed.value ? '#003265' : 'blue',
  };
});

const start = useSharedValue({ x: 0, y: 0 });
const gesture = Gesture.Tap()
  .onBegin(() => {
    isPressed.value = true;
  })
  .onFinalize(() => {
    isPressed.value = false;
  });

    return (
      <View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, animatedStyles]} />
      </GestureDetector>

      </View>      
    );
  }

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
});