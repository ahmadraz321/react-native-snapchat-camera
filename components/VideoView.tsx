import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import IconButton from "./IconButton";

interface Props {
  video: string;
  setVideo: React.Dispatch<React.SetStateAction<string>>;
}

export default function VideoViewComponent({ video, setVideo }: Props) {
  const videoViewRef = useRef<VideoView>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);
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
            await saveToLibraryAsync(video);
            Alert.alert("Saved to library");
          }}
        />
        <IconButton
          iosName="flashlight.off.circle"
          androidName={isPlaying ? "pause" : "play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
            setIsPlaying(!isPlaying);
          }}
        />
        <IconButton
          iosName="flashlight.off.circle"
          androidName="share-outline"
          onPress={async () => {
            await shareAsync(video);
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          left: 8,
          gap: 16,
          zIndex: 1,
          marginTop: 40,
        }}
      >
        <IconButton
          iosName="flashlight.off.circle"
          androidName="close"
          onPress={() => {
            setVideo("");
          }}
        />
      </View>
      <VideoView
        ref={videoViewRef}
        style={{
          width: "100%",
          height: "100%",
        }}
        player={player}
        allowsFullscreen
        nativeControls
      />
    </View>
  );
}
