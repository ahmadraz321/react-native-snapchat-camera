import { saveToLibraryAsync } from "expo-media-library";
import React from "react";
import { Alert, Image, View } from "react-native";
import IconButton from "./IconButton";
import { shareAsync } from "expo-sharing";

interface Props {
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
}

export default function PictureView({ picture, setPicture }: Props) {
  return (
    <View>
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
          androidName="arrow-down"
          onPress={async () => {
            await saveToLibraryAsync(picture);
            Alert.alert("Saved to library");
          }}
        />
        <IconButton
          iosName="flashlight.off.circle"
          androidName="share-outline"
          onPress={async () => {
            await shareAsync(picture);
          }}
        />
      </View>
      <View style={{
        position: "absolute",
        left: 8,
        gap: 16,
        zIndex: 1,
        marginTop: 40,
      }}>
      <IconButton
          iosName="flashlight.off.circle"
          androidName="close"
          onPress={() => {
             setPicture("");
          }}
        />
      </View>
      <Image
        source={{ uri: picture }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}
