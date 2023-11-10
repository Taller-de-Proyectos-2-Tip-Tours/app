
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import TourScreen from "../screens/TourScreen";
import TourListScreen from "../screens/TourListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReservesScreen from "../screens/ReservesScreen";
import NotificationHistoryScreen from "../screens/NotificationHistoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


export const Stack = createStackNavigator();
export const Tab = createBottomTabNavigator();

function StackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TourList"
          options={{ title: "Paseos" }}
          component={TourListScreen}
        />
        <Stack.Screen
          name="TourDetail"
          options={{ title: "Detalle del paseo" }}
          component={TourScreen}
        />
      </Stack.Navigator>
    );
  }
  
  function StackReserveNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ReserveList"
          options={{ title: "Mis reservas" }}
          component={ReservesScreen}
        />
        <Stack.Screen
          name="ReserveDetail"
          options={{ title: "Detalle de la reserva" }}
          component={TourScreen}
        />
      </Stack.Navigator>
    );
  }
  
  export function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === "toursTab") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "profileTab") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "bookingTab") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "notificationHistoryTab") {
              iconName = focused ? "notifications" : "notifications-outline";
            }
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="toursTab"
          component={StackNavigator}
          options={{ title: "Home", headerShown: false }}
        />
        <Tab.Screen
          name="bookingTab"
          component={StackReserveNavigator}
          options={{ title: "Mis reservas", headerShown: false }}
        />
        <Tab.Screen
          name="notificationHistoryTab"
          component={NotificationHistoryScreen}
          options={{ title: "Notificaciones" }}
        />
        <Tab.Screen
          name="profileTab"
          component={ProfileScreen}
          options={{ title: "Mi perfil" }}
        />
      </Tab.Navigator>
    );
  }

