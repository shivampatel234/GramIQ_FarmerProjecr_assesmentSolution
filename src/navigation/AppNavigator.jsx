import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Basics from "../screens/Basics";
import Address from "../screens/Address";
import Crop from "../screens/Crop";
import DateScreen from "../screens/Date";
import FarmersList from "../screens/FarmersList";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Basics" component={Basics} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Crop" component={Crop} />
      <Stack.Screen name="Date" component={DateScreen} />
      <Stack.Screen name="FarmersList" component={FarmersList} />
    </Stack.Navigator>
  );
}
