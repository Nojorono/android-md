import * as React from "react";
import { Dimensions, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import authStore from "../../stores/authStore";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type RootStackParamList = {
    MainTabNavigator: undefined;
    CameraComponent: undefined;
    SurveyForm: { itemId: number; photo?: string } | undefined;
};

type SurveyFormNavigationProp = NativeStackNavigationProp<RootStackParamList, "SurveyForm">;

const SurveyForm = () => {
    const route = useRoute();
    const navigation = useNavigation<SurveyFormNavigationProp>();
    const user = authStore.user.user;

    // Retrieve the photo from route params
    // @ts-ignore
    const { photo } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>
            {photo && (
                <Image source={{ uri: photo }} style={styles.photoPreview} />
            )}
            <TouchableOpacity
                onPress={() => navigation.navigate('CameraComponent')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: SCREEN_WIDTH * 0.02,
        paddingVertical: SCREEN_HEIGHT * 0.04,
    },
    button: {
        backgroundColor: '#0c4ca3',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    photoPreview: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.7,
        marginBottom: 20,
    },
});

export default SurveyForm;
