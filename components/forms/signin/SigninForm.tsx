import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { Color, FontFamily, FontSize, Border } from "../../../GlobalStyles";
import { Image } from "expo-image";
import ButtonFill from "../../ButtonFill";
import { signin } from "../../../utils/api/auth/signin";
import { observer } from "mobx-react";
import authStore from "../../../stores/authStore";
import loadingStore from "../../../stores/loadingStore";
import Toast from "react-native-toast-message";


// Get screen width and height for dynamic styling
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface SigninFormProps {
  onSigninSuccess: () => void;
}

const SigninForm: React.FC<SigninFormProps> = ({ onSigninSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  let isValid: boolean | ((prevState: boolean) => boolean);
  const validateEmail = (input: string) => {
    isValid = !!input && input.includes("@");
    setEmailValid(isValid);
  };

  const validatePassword = (input: string) => {
    isValid =  !!input && input.length >= 5;
    setPasswordValid(isValid);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async () => {
    loadingStore.setLoading(true);
    validateEmail(email)
    validatePassword(password)
    if (emailValid && passwordValid && isValid) {
      try {
        const response = await signin({ email, password });
        console.log(response)
        if (response.statusCode === 200) {
          authStore.setUserData(response.data);
          onSigninSuccess();
          Toast.show({
            type: 'success', text1: 'User successfully Signin! 👋'
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to sign in. Please try again.";
        Toast.show({
          type: 'error', text1: 'Failed to sign in. Please try again.'
        });
        console.error("Error signing in:", errorMessage);
      } finally {
        loadingStore.setLoading(false);
      }
    }
    loadingStore.setLoading(false);
  };


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "android" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "android" ? 50 : 0}
      >
        {/* Email Field */}
        {!isKeyboardVisible && (
            <Image
                style={styles.mainImage}
                contentFit="cover"
                source={require("../../../assets/logo-nojorono-biru-2.png")}
            />
        )}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, styles.text]}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, styles.text]}
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
          </View>
          {!emailValid && (
              <Text style={styles.errorText}>
                Please enter a valid email address
              </Text>
          )}
        </View>

        {/* Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, styles.text]}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, styles.text]}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Enter your password"
                secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                  style={styles.eyeIcon}
                  contentFit="cover"
                  source={require("../../../assets/eye-closed.png")}
              />
            </TouchableOpacity>
          </View>
          {!passwordValid && (
              <Text style={styles.errorText}>
                Password must be at least 8 characters long
              </Text>
          )}
        </View>

        {/* Submit Button */}
        <ButtonFill
            continue1="Login"
            buttonFillPosition="relative"
            button1BackgroundColor="#0c4ca3"
            continueTextAlign="center"
            continueLeft="43%"
            onPress={handleSubmit}
            loading={loadingStore.loading}
        />

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.colorWhite,
  },
  text: {
    textAlign: "left",
    color: Color.navy,
    fontFamily: FontFamily.ptReguler,
  },
  fieldContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: FontSize.ptReg_size * (SCREEN_WIDTH / 375),
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorGray,
    borderRadius: Border.br_base,
    height: Platform.OS === "android" ? 50 : 56,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: FontSize.ptReg_size * (SCREEN_WIDTH / 375),
  },
  errorText: {
    marginTop: 5,
    color: "red",
    fontSize: FontSize.ptSmall_size * (SCREEN_WIDTH / 375),
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  forgotPasswordText: {
    fontSize: FontSize.ptReguler_size * (SCREEN_WIDTH / 375),
    marginTop: 20,
  },
  mainImage: {
    width: 200, // 60% of screen width
    height: SCREEN_HEIGHT * 0.12,
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
});

export default observer(SigninForm);
