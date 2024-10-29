import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ReimburseScreen from "../screens/ReimburseScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import ActivityScreen from "../screens/ActivityScreen";

type MainTabParamList = {
    Dashboard: undefined; // No parameters
    Reimburse: undefined; // No parameters
    Attendance: undefined; // No parameters
    Activity: undefined; // No parameters
    Settings: undefined; // No parameters
};
// Define the type for your tab navigator
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

                    if (route.name === "Dashboard") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Reimburse") {
                        iconName = focused ? "cash" : "cash-outline";
                    } else if (route.name === "Attendance") {
                        iconName = focused ? "checkmark-circle" : "checkmark-circle-outline";
                    } else if (route.name === "Activity") {
                        iconName = focused ? "pulse" : "pulse-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    }

                    return <Ionicons size={size} color={color} name={iconName} />;
                },
                tabBarActiveTintColor: "#0c4ca3",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    paddingBottom: 7,
                    position: 'absolute',
                    bottom: 0,
                    height: 63,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    backgroundColor: 'white',
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Activity" component={ActivityScreen} />
            <Tab.Screen name="Attendance" component={AttendanceScreen} />
            <Tab.Screen name="Reimburse" component={ReimburseScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
