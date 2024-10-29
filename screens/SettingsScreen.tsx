import * as React from "react";
import { Text, StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import authStore from "../stores/authStore";
import Toast from "react-native-toast-message";
import { FontFamily, Color } from "../GlobalStyles";

// Get screen width and height for dynamic styling
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Define RootStackParamList with your screen names
type RootStackParamList = {
    MainTabNavigator: undefined;
    LogInScreen: undefined;
    UpdateProfileScreen: undefined;
    ChangePasswordScreen: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "MainTabNavigator">;

const SettingsScreen = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const handleLogout = async () => {
        await authStore.clearUser(); // Clear user data
        Toast.show({
            type: 'success',
            text1: 'Logged out successfully',
        });
        navigation.navigate("LogInScreen"); // Redirect to login screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.appTitle}>Settings</Text>

            {/* Menu Options */}
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UpdateProfileScreen")}>
                <Text style={styles.menuText}>Update Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ChangePasswordScreen")}>
                <Text style={styles.menuText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: SCREEN_WIDTH * 0.10, // Responsive padding
        paddingVertical: SCREEN_HEIGHT * 0.02,
    },
    appTitle: {
        fontSize: 24,
        color: Color.navy,
        textAlign: "center",
        fontFamily: FontFamily.ptMedium,
        fontWeight: "600",
        marginBottom: SCREEN_HEIGHT * 0.05,
    },
    menuItem: {
        padding: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        marginVertical: SCREEN_HEIGHT * 0.01,
    },
    menuText: {
        fontSize: 18,
        color: Color.navy,
        textAlign: "center",
    },
});

export default SettingsScreen;
