import { Ionicons } from "@expo/vector-icons";
import { SFSymbol } from "expo-symbols";
import React, { ComponentProps } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

interface Props {
  androidName: ComponentProps<typeof Ionicons>[`name`];
  iosName: SFSymbol;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  width?: number;
  height?: number;
}

export default function IconButton({
  androidName,
  iosName,
  containerStyle,
  onPress,
  width,
  height,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: "#00000050",
          padding: 5,
          borderRadius: ((34 + 5) * 2) / 2,
          width: 34,
        },
        containerStyle,
      ]}
    >
      <Ionicons
        name={androidName}
        size={24}
        color={"white"}
        style={width && height ? { width, height } : {}}
      />
    </TouchableOpacity>
  );
}
