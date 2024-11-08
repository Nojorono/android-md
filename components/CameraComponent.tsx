import * as React from "react";
import {useState, useEffect, Ref, useRef} from "react";
import { Dimensions, Text, SafeAreaView, StyleSheet, Button, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Camera, CameraType } from 'expo-camera/legacy';
import { useCameraPermissions, Camera as ExpoCamera } from 'expo-camera';
import { useRoute } from "@react-navigation/core";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type RootStackParamList = {
    MainTabNavigator: undefined;
    CameraComponent: undefined;
    SurveyForm: { itemId?: number; photo?: string } | undefined;
};

type CameraNavigationProp = NativeStackNavigationProp<RootStackParamList, "CameraComponent">;

const CameraComponent = () => {
    const route = useRoute();
    const navigation = useNavigation<CameraNavigationProp>();
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [facing, setFacing] = useState<CameraType>(CameraType.back);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<Camera | null>(null); // Correctly using useRef

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    if (hasCameraPermission === null) {
        return <View />;
    }

    if (!hasCameraPermission) {
        return (
            <View style={styles.container}>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    };

    const takePicture = async () => {
        if (cameraRef.current) { // Check if camera is ready
            const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
            setPhoto(photo.uri);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {photo ? (
                <Image source={{ uri: photo }} style={styles.preview} />
            ) : (
                <>
                    <Camera style={styles.camera} type={facing} ref={cameraRef}>
                    </Camera>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Flip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={takePicture}>
                            <Text style={styles.text}>Snap</Text>
                        </TouchableOpacity>
                    </View>
                </>

            )}
            {photo && <Button title="Retake" onPress={() => setPhoto(null)} />}
            {photo && <Button title="Take" onPress={() => navigation.navigate('SurveyForm', { photo: photo })} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    preview: {
        width: "100%",
        height: SCREEN_HEIGHT * 0.7,
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        margin: 10,
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default CameraComponent;
