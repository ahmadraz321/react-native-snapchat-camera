import React from "react";
import { TouchableOpacity } from "react-native";
import IconButton from "./IconButton";
import { ThemedText } from "./ThemedText";

interface Props {
  handleOpenQrCode: () => void;
}

export default function QrButton({ handleOpenQrCode }: Props) {
  return (
    <TouchableOpacity
      onPress={handleOpenQrCode}
      style={{
        width: 200,
        alignItems: "center",
        top: "65%",
        alignSelf: "center",
        padding: 6,
        borderWidth: 3,
        borderRadius: 10,
        borderStyle: "dashed",
        borderColor: "white",
      }}
    >
      <IconButton iosName="qrcode" androidName="qr-code" onPress={() => {}} />
      <ThemedText type="defaultSemiBold" style={{ color: "white" }}>
        QR Code detected
      </ThemedText>
    </TouchableOpacity>
  );
}
