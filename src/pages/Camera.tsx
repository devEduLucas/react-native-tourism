import { useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library/legacy";
import ActionButton from "../components/ActionButton";

export default function Camera() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  async function takePicture() {
    if (!cameraRef.current || busy) return;

    setBusy(true);
    setMessage("");

    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (!photo) {
        setMessage("Não foi possível capturar a fotografia.");
        return;
      }

      setPhotoUri(photo.uri);

      const media = await MediaLibrary.requestPermissionsAsync(true);
      if (!media.granted) {
        setSaved(false);
        setMessage("Permissão da galeria negada. A foto não foi salva.");
        return;
      }

      await MediaLibrary.saveToLibraryAsync(photo.uri);
      setSaved(true);
      setMessage("Fotografia salva na galeria.");
    } catch {
      setSaved(false);
      setMessage("Erro ao capturar ou salvar a fotografia.");
    } finally {
      setBusy(false);
    }
  }

  function newPhoto() {
    setPhotoUri(null);
    setMessage("");
    setSaved(false);
  }

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permission} edges={["bottom"]}>
        <Text style={styles.permissionText}>
          O aplicativo precisa de permissão para usar a câmera.
        </Text>
        <ActionButton
          label="Conceder permissão"
          icon="lock-open"
          onPress={requestPermission}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <View style={styles.viewer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.media} />
        ) : (
          <CameraView ref={cameraRef} style={styles.media} facing="back" />
        )}
      </View>

      {message !== "" && (
        <Text style={[styles.message, saved ? styles.success : styles.error]}>
          {message}
        </Text>
      )}

      <View style={styles.footer}>
        {photoUri ? (
          <ActionButton
            label="Nova fotografia"
            icon="refresh"
            onPress={newPhoto}
          />
        ) : (
          <ActionButton
            label="Capturar"
            icon="photo-camera"
            onPress={takePicture}
            loading={busy}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6f8",
  },
  permission: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 20,
    backgroundColor: "#f2f6f8",
  },
  permissionText: {
    fontSize: 16,
    color: "#1b2a30",
    textAlign: "center",
  },
  viewer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  media: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 16,
  },
  success: {
    color: "#1e8449",
  },
  error: {
    color: "#c0392b",
  },
  footer: {
    padding: 16,
  },
});
