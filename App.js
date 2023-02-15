import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Home from "./src/pages/Home";
import Teste from "./src/pages/Pesquisa";
import Desenvolvimento from "./src/pages/Desenvolvimento";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <Home />
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}