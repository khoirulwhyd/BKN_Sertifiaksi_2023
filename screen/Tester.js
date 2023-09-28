import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Logins from "./Login";
import Setting from "./Setting";
const Tab = createBottomTabNavigator();





export default function Tester() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Logins} />
            <Tab.Screen name="Settings" component={Setting} />
        </Tab.Navigator>
    );
}