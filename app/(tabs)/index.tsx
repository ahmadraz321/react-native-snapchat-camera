import BottomRow from "@/components/BottomRow";
import CameraTool from "@/components/CameraTool";
import IconButton from "@/components/IconButton";
import MainRowActions from "@/components/MainRowActions";
import PictureView from "@/components/PictureView";
import QrButton from "@/components/QrButton";
import VideoViewComponent from "@/components/VideoView";
import {
  BarcodeScanningResult,
  CameraMode,
  CameraView,
  FlashMode,
} from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import { useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";

export default function HomeScreen() {
  const [cameraMode, setCameraMode] = useState<CameraMode>("picture");
  const cameraRef = useRef<CameraView>(null);
  const [qrCodeDetected, setQrCodeDetected] = useState<string>("");
  const [isBrowsing, setIsBrowsing] = useState<boolean>(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [cameraZoom, setCameraZoom] = useState<number>(0);
  const [cameraFlash, setCameraFlash] = useState<FlashMode>("off");
  const [cameraTourch, setCameraTourch] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");
  const [picture, setPicture] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);

  async function handleOpenQrCode() {
    setIsBrowsing(true);
    const url = qrCodeDetected;
    const browserResult = await WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });
    if (browserResult.type === "cancel") {
      setIsBrowsing(false);
    }
  }

  async function toggleRecording() {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync();
      setVideo(response?.uri || "");
    }
  } 
  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync();
    setPicture(response?.uri || "");
  }

  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    if (scanningResult.data) {
      setQrCodeDetected(scanningResult.data);
      console.log(scanningResult.data);
    }
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    timeOut.current = setTimeout(() => {
      setQrCodeDetected("");
    }, 2000);
  };

  if (isBrowsing) return <></>;
  if (picture) return <PictureView picture={picture} setPicture={setPicture} />;
  // if (video) return <VideoViewComponent video={video} setVideo={setVideo} />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        ref={cameraRef}
        mode={cameraMode}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarcodeScanned}
        zoom={cameraZoom}
        flash={cameraFlash}
        facing={cameraFacing}
        enableTorch={cameraTourch}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {qrCodeDetected ? (
              <QrButton handleOpenQrCode={handleOpenQrCode} />
            ) : null}
            <CameraTool
              cameraFacing={cameraFacing}
              cameraFlash={cameraFlash}
              cameraTourch={cameraTourch}
              cameraZoom={cameraZoom}
              setCameraFacing={setCameraFacing}
              setCameraFlash={setCameraFlash}
              setCameraTourch={setCameraTourch}
              setCameraZoom={setCameraZoom}
            />
            <IconButton
              androidName="accessibility"
              iosName="0.circle"
              onPress={() => {}}
            />
            <MainRowActions
              cameraMode={cameraMode}
              isRecording={false}
              handleTakePicture={handleTakePicture}
            />
            <BottomRow setCameraMode={setCameraMode} cameraMode={cameraMode} />
          </View>
        </SafeAreaView>
      </CameraView>
    </SafeAreaView>
  );
}
