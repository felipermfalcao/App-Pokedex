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
import Pesquisa from "./src/pages/Pesquisa";
import Desenvolvimento from "./src/pages/Desenvolvimento";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            }
            else if (route.name === 'Temp1') {
              iconName = focused ? 'earth' : 'earth-outline';
            }
            else if (route.name === 'Pesquisa') {
              iconName = focused ? 'search' : 'search-outline';
            }
            else if (route.name === 'Temp3') {
              iconName = focused ? 'map' : 'map-outline';
            }
            else if (route.name === 'Temp4') {
              iconName = focused ? 'person' : 'person-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color='#4e637a' />;
          },
          tabBarInactiveTintColor: '#4e637a',
          tabBarActiveTintColor: '#4e637a',
          tabBarActiveBackgroundColor: '#fff',
          tabBarInactiveBackgroundColor: '#fff'
          
        })}      
        >
          <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarShowLabel: false }}/>
          <Tab.Screen name="Temp1" component={Pesquisa} options={{ headerShown: false, tabBarShowLabel: false}}/>
          <Tab.Screen name="Pesquisa" component={Desenvolvimento} options={{ headerShown: false, tabBarShowLabel: false}}/>
          <Tab.Screen name="Temp3" component={Desenvolvimento} options={{ headerShown: false, tabBarShowLabel: false }}/>
          <Tab.Screen name="Temp4" component={Desenvolvimento} options={{ headerShown: false, tabBarShowLabel: false }}/>
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}