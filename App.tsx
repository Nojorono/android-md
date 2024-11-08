import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import { Camera } from "expo-camera";
import * as Location from 'expo-location';
import * as Network from 'expo-network';
import LogInScreen from "./screens/LogInScreen";
import Toast from 'react-native-toast-message';
import MainTabNavigator from "./navigation/MainTabNavigator";
import { observer } from "mobx-react-lite";
import Spinner from 'react-native-loading-spinner-overlay';
import loadingStore from './stores/loadingStore';
import authStore from "./stores/authStore";
import SurveyForm from "./screens/Activity/SurveyForm";
import CameraComponent from "./components/CameraComponent";

const Stack = createNativeStackNavigator();

const App = () => {
    const [fontsLoaded] = Font.useFonts({
        'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
        'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
    });

    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    // Function to request camera and location permissions
    const requestPermissions = async () => {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

        if (cameraStatus === 'granted' && locationStatus === 'granted') {
            setPermissionsGranted(true);
        } else {
            Toast.show({
                type: 'error',
                text1: 'Permissions Required',
                text2: 'Camera and location permissions are required for this app to function properly.',
            });
        }
    };

    // Function to check network connectivity status
    const checkNetworkStatus = async () => {
        const networkState = await Network.getNetworkStateAsync();
        setIsConnected(networkState.isConnected ?? false);
    };

    useEffect(() => {
        requestPermissions(); // Request permissions when the app loads
        checkNetworkStatus(); // Check network status when app loads

        // Optional: Set up an interval to monitor connectivity periodically
        const interval = setInterval(checkNetworkStatus, 10000); // every 10 seconds
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    if (!fontsLoaded || !permissionsGranted || !isConnected) {
        return (
            <Spinner
                visible={true}
                color={'#0c4ca3'}
                size={"large"}
                animation={"fade"}
            />
        );
    }

    return (
        <>
            <Spinner
                visible={loadingStore.loading} // Spinner based on loading state in store
                color={'#0c4ca3'}
                size={"large"}
                animation={"fade"}
            />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {authStore.user ? (
                        <>
                            <Stack.Screen name="MainTabNavigator" component={MainTabNavigator}/>
                            <Stack.Screen name="SurveyForm" component={SurveyForm}/>
                            <Stack.Screen name="CameraComponent" component={CameraComponent} />
                        </>
                    ) : (
                        <Stack.Screen name="LogInScreen" component={LogInScreen} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            <Toast
                position='top'
                bottomOffset={20}
                // Add custom styling and configurations here if needed
            />
        </>
    );
};

export default observer(App);
