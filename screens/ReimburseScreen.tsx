import * as React from "react";
import {Text, StyleSheet, View, Dimensions, SafeAreaView} from "react-native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

// Get screen width and height for dynamic styling
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ReimburseScreen = () => {

    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff", paddingHorizontal: SCREEN_WIDTH * 0.10, // Responsive padding
        paddingVertical: SCREEN_HEIGHT * 0.02,
    },
    logo: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_WIDTH * 0.2,
        marginBottom: SCREEN_HEIGHT * 0.05,
    },
    appTitle: {
        fontSize: FontSize.ptMedium1_size,
        color: Color.navy,
        textAlign: "center",
        fontFamily: FontFamily.ptMedium,
        fontWeight: "600",
        marginBottom: SCREEN_HEIGHT * 0.03,
    },
    mainImage: {
        width: SCREEN_WIDTH * 0.6,
        height: SCREEN_HEIGHT * 0.12,
        marginBottom: SCREEN_HEIGHT * 0.17,
    },
});

export default ReimburseScreen;
