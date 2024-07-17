import { FlashMode } from "expo-camera";
import React from "react";
import { View } from "react-native";
import IconButton from "./IconButton";

interface Props {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTourch: boolean;
  cameraFacing: "front" | "back";
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
  setCameraTourch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"front" | "back">>;
}

export default function CameraTool({
  cameraZoom,
  cameraFlash,
  cameraTourch,
  cameraFacing,
  setCameraZoom,
  setCameraFlash,
  setCameraTourch,
  setCameraFacing,
}: Props) {
  return (
    <View
      style={{
        position: "absolute",
        right: 8,
        gap: 16,
        zIndex: 1,
        marginTop: 40,
      }}
    >
      <IconButton
        iosName="flashlight.off.circle"
        androidName={cameraTourch ? "flash" : "flash-off"}
        onPress={() => setCameraTourch((prev) => !prev)}
      />
      <IconButton
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === "back" ? "front" : "back"
          )
        }
        iosName={"arrow.triangle.2.circlepath.camera"}
        androidName="camera-reverse"
        width={25}
        height={21}
      />
      <IconButton
        onPress={() =>
          setCameraFlash((prevValue) => (prevValue === "off" ? "on" : "off"))
        }
        iosName={cameraFlash === "on" ? "bolt.circle" : "bolt.slash.circle"}
        androidName={cameraFlash === "on" ? "flashlight" : "flashlight-outline"}
      />
      <IconButton
        onPress={() => {}}
        iosName={"speaker"}
        androidName="volume-high"
      />
      <IconButton
        onPress={() => {
          if (cameraZoom < 1) {
            setCameraZoom((prevValue) => prevValue + 0.1);
          }
        }}
        iosName={"plus.magnifyingglass"}
        androidName="add-circle-outline"
      />
      <IconButton
        onPress={() => {
          if (cameraZoom > 0) {
            setCameraZoom((prevValue) => prevValue - 0.1);
          }
        }}
        iosName={"minus.magnifyingglass"}
        androidName="remove-circle-outline"
      />
    </View>
  );
}
