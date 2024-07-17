import { CameraMode } from "expo-camera";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import IconButton from "./IconButton";
import { ThemedText } from "./ThemedText";

interface Props {
  setCameraMode: React.Dispatch<React.SetStateAction<CameraMode>>;
  cameraMode: CameraMode;
}

export default function BottomRow({ setCameraMode, cameraMode }: Props) {
  return (
    <View style={[styles.directionRow, styles.BottomContainer]}>
      <Link href={"/media-library"} asChild>
        <IconButton
          androidName="images"
          iosName="photo.stack"
          onPress={() => {}}
        />
      </Link>
      <View style={styles.directionRow}>
        <TouchableOpacity onPress={() => setCameraMode("picture")}>
          <ThemedText
            style={{ fontWeight: cameraMode === "picture" ? "bold" : "100" }}
          >
            Snap
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCameraMode("video")}>
          <ThemedText
            style={{ fontWeight: cameraMode === "video" ? "bold" : "100" }}
          >
            Video
          </ThemedText>
        </TouchableOpacity>
      </View>
      <IconButton
        androidName="search"
        iosName="magnifyingglass.circle"
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  directionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  BottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    alignSelf: "center",
    bottom: 6,
  },
});
