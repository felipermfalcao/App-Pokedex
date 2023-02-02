import React from "react";
import { Text, View, StyleSheet, Button, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureDetector , Gesture, gestureHandlerRootHOC} from 'react-native-gesture-handler';

import Ball from "../../components/testeTouch";

const ExampleWithHoc = gestureHandlerRootHOC(() => (
  <View>
    <Ball />
  </View>
)
)

export default function Teste() {

    return (
      <Modal
      visible={true}>
      <ExampleWithHoc />
    </Modal>     
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