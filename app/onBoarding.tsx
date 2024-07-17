import { Alert, Button, Image, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";

export default function OnBoardingScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    usePermissions();

  async function handleContinue() {
    const allPermissions = await requestAllPermissions();
    if (allPermissions) {
      router.replace("/(tabs)");
    } else {
        Alert.alert("Permissions Required", "Please allow all permissions to continue");
    }
  }

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert(
        "Camera Permission Required",
        "Please allow camera permission to continue"
      );
      return false;
    }
    const microphoneStatus = await requestMicrophonePermission();
    if (!microphoneStatus.granted) {
      Alert.alert(
        "Microphone Permission Required",
        "Please allow microphone permission to continue"
      );
      return false;
    }
    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if (!mediaLibraryStatus.granted) {
      Alert.alert(
        "Media Library Permission Required",
        "Please allow media library permission to continue"
      );
      return false;
    }
    await AsyncStorage.setItem("hasOpened", "true");
    return true;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">SnapChat Camera!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        Welcome to Friend! to provide best experince, this app requires
        following permissions:
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Camera Permission</ThemedText>
        <ThemedText>🎥 For taking pictures</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">MicroPhone Permission</ThemedText>
        <ThemedText>🎙️ For taking pictures</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Media Library Permission</ThemedText>
        <ThemedText>📷 For taking pictures</ThemedText>
      </ThemedView>
      <Button title="Continue..." onPress={handleContinue} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
