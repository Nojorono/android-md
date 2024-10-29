import * as React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import ButtonFill from "../components/ButtonFill";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Get screen width and height for dynamic styling
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type RootStackParamList = {
  HelloScreen: undefined;
  LogInScreen: undefined;
  DashboardScreen: undefined;
};

type HelloScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HelloScreen">;

const HelloScreen = () => {
  const navigation = useNavigation<HelloScreenNavigationProp>();

  const handlePressLogin = () => {
    navigation.navigate("LogInScreen");
  };

  return (
      <View style={styles.helloScreen}>
        <Image
            style={styles.mainImage}
            contentFit="cover"
            source={require("../assets/logo-nojorono-biru-2.png")}
        />
        <ButtonFill
            continue1="Next"
            buttonFillPosition="relative"
            buttonFillMarginLeft={0}
            buttonFillBottom={SCREEN_HEIGHT * 0.15}
            buttonFillLeft="unset"
            button1BackgroundColor="#0c4ca3"
            continueLeft="44%"
            continueTextAlign="left"
            onPress={handlePressLogin}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  helloScreen: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
    justifyContent: "center",
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

export default HelloScreen;
