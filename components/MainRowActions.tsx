import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { CameraMode } from "expo-camera";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}

export default function MainRowActions({
  handleTakePicture,
  cameraMode,
  isRecording,
}: Props) {
  const [assets, setAssets] = useState<Asset[]>([]);

  async function getAlbum() {
    const fetchAlbum = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      album: fetchAlbum[1],
      mediaType: "photo",
      sortBy: "creationTime",
      first: 4,
    });

    setAssets(albumAssets.assets);
  }

  useEffect(() => {
    getAlbum();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={{ width: 40, height: 40, borderRadius: 5 }}
          />
        )}
        horizontal
        inverted
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={handleTakePicture}>
        <Ionicons
          name={
            cameraMode === "picture"
              ? "radio-button-off"
              : isRecording
              ? "radio-button-on"
              : "radio-button-off"
          }
          color={isRecording ? Colors.light.snapPrimary : "white"}
          size={64}
        />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {[0, 1, 2, 3].map((item) => (
          <Ionicons
            key={item}
            name="happy"
            style={{}}
            size={40}
            color={"white"}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 45,
    height: 100,
  },
});
