import * as React from "react";
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import authStore from "../stores/authStore";
import Toast from "react-native-toast-message";
import {FontFamily, Color, Border} from "../GlobalStyles";

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

    const user = authStore.user.user
    console.log(user)
    if (!user){
        Toast.show({
            type: 'error',
            text1: 'User not found',
        });
    }

    const handleLogout = async () => {
        await authStore.clearUser();
        Toast.show({
            type: 'success',
            text1: 'Logged out successfully',
        });
        navigation.navigate("LogInScreen");
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Replace title with account image */}
            <View style={[styles.containerFluid, { flexDirection: 'row', }]}>
                <View style={styles.column}>
                    <Image
                        source={{ uri: "https://cdn.vuetifyjs.com/images/lists/1.jpg" }}
                        style={styles.accountImage}
                    />
                </View>
                <View style={[styles.column, { paddingHorizontal: SCREEN_WIDTH * 0.04, alignItems: 'flex-start' }]}>
                        <Text style={[styles.menuText, { color: 'black'}]}>
                            {user?.email}
                        </Text>
                        <Text style={[styles.menuText, { color: 'black'}]}>
                            {user?.fullname}
                        </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate("UpdateProfileScreen")}
                >
                    <Text style={styles.menuText}>Update Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate("ChangePasswordScreen")}
                >
                    <Text style={styles.menuText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleLogout}
                >
                    <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9", // Light background color
        paddingHorizontal: SCREEN_WIDTH * 0.01, // Responsive padding
        paddingVertical: SCREEN_HEIGHT * 0.01,
    },
    containerFluid: {
        flex: 1,
        backgroundColor: "#F9F9F9", // Light background color
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: SCREEN_HEIGHT * 0.05, // Space below the header
    },
    accountImage: {
        width: 140,
        height: 140,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    scrollContainer: {
        paddingHorizontal: SCREEN_WIDTH * 0.05, // Responsive padding
        paddingVertical: SCREEN_HEIGHT * 0.05,
        paddingBottom: SCREEN_HEIGHT * 0.1, // Add padding at the bottom of the ScrollView
    },
    menuItem: {
        padding: 13,
        marginVertical: SCREEN_HEIGHT * 0.01,
        elevation: 5, // Shadow effect for Android
        shadowColor: "#000", // Shadow effect for iOS
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: Border.br_base,
        backgroundColor: Color.colorPrimary,
    },
    menuText: {
        fontSize: 13,
        color: Color.colorWhite,
        textAlign: "center",
        fontFamily: FontFamily.ptReguler, // Use regular font for menu text
    },
    column: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        backgroundColor: "#F9F9F9", // Light background color
        marginHorizontal: SCREEN_WIDTH * 0.01,
    },
});

export default SettingsScreen;
