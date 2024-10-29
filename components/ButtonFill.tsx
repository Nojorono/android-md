import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

// Get screen width for dynamic styling
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export type ButtonFillType = {
  continue1?: string;

  /** Style props */
  buttonFillPosition?: string;
  buttonFillMarginLeft?: number | string;
  buttonFillBottom?: number | string;
  buttonFillLeft?: number | string;
  buttonFillTop?: number | string;
  button1BackgroundColor?: string;
  continueLeft?: number | string;
  continueTextAlign?: string;
  onPress?: () => void;
  loading?: boolean
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const ButtonFill = ({
                      continue1,
                      buttonFillPosition,
                      buttonFillMarginLeft,
                      buttonFillBottom,
                      buttonFillLeft,
                      buttonFillTop,
                      button1BackgroundColor,
                      continueLeft,
                      continueTextAlign,
                      onPress,
                      loading,
                    }: ButtonFillType) => {
  const buttonFillStyle = useMemo(() => {
    return {
      ...getStyleValue("position", buttonFillPosition),
      ...getStyleValue("marginLeft", buttonFillMarginLeft),
      ...getStyleValue("bottom", buttonFillBottom),
      ...getStyleValue("left", buttonFillLeft),
      ...getStyleValue("top", buttonFillTop),
    };
  }, [buttonFillPosition, buttonFillMarginLeft, buttonFillBottom, buttonFillLeft, buttonFillTop]);

  const button1Style = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", button1BackgroundColor),
    };
  }, [button1BackgroundColor]);

  const continueStyle = useMemo(() => {
    return {
      ...getStyleValue("left", continueLeft),
      ...getStyleValue("textAlign", continueTextAlign),
    };
  }, [continueLeft, continueTextAlign]);

  return (
      <TouchableOpacity disabled={loading} onPress={onPress} style={[styles.buttonFill, buttonFillStyle]}>
        <View style={[styles.button1, button1Style]} />
        <Text style={[styles.continue, continueStyle]}>{continue1}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button1: {
    height: "100%",
    width: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: Border.br_base,
    backgroundColor: Color.colorRoyalblue_100,
    position: "absolute",
  },
  continue: {
    top: "33.33%",
    left: "26.3%",
    fontSize: FontSize.ptReg_size,
    fontWeight: "500",
    fontFamily: FontFamily.ptMedium,
    color: Color.colorWhite,
    position: "absolute",
  },
  buttonFill: {
    width: SCREEN_WIDTH * 0.80,
    height: 50,
    alignSelf: "center",
  },
});

export default ButtonFill;
