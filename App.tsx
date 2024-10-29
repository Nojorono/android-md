import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import LogInScreen from "./screens/LogInScreen";
import Toast from 'react-native-toast-message';
import MainTabNavigator from "./navigation/MainTabNavigator";
import { observer } from "mobx-react-lite";
import Spinner from 'react-native-loading-spinner-overlay';
import loadingStore from './stores/loadingStore';
import authStore from "./stores/authStore";

const Stack = createNativeStackNavigator();

const App = () => {
    const [fontsLoaded] = Font.useFonts({
        'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
        'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null; // You might want to show a loading screen here instead.
    }

    return (
        <>
            <Spinner
                visible={loadingStore.loading}
                color={'#0c4ca3'}
                size={"large"}
                animation={"fade"}
            />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {authStore.user ? (
                        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
                    ) : (
                        <Stack.Screen name="LogInScreen" component={LogInScreen} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            <Toast
                position='top'
                bottomOffset={20}
                // Consider adding custom styling and configurations here
            />
        </>
    );
};

export default observer(App);
