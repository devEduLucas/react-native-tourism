import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import ActionButton from "../components/ActionButton";
import InfoCard from "../components/InfoCard";
import ValueRow from "../components/ValueRow";
import { RootStackParamList } from "../types/navigation";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type AccelerometerData = {
  x: number;
  y: number;
  z: number;
};

const GRAVITY = 9.81;

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [{ x, y, z }, setAccelerometer] = useState<AccelerometerData>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (Platform.OS === "web") {
      const onMotion = (event: DeviceMotionEvent) => {
        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;
        setAccelerometer({
          x: (acceleration.x ?? 0) / GRAVITY,
          y: (acceleration.y ?? 0) / GRAVITY,
          z: (acceleration.z ?? 0) / GRAVITY,
        });
      };

      window.addEventListener("devicemotion", onMotion);
      return () => window.removeEventListener("devicemotion", onMotion);
    }

    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(setAccelerometer);
    return () => subscription.remove();
  }, []);

  async function getLocation() {
    setLoading(true);
    setError("");

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Permissão de localização negada.");
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch {
      setError("Não foi possível obter a localização.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appName}>Diário de Viagem</Text>
          <Text style={styles.subtitle}>
            Registre os melhores momentos da sua viagem
          </Text>
        </View>

        <View style={styles.actions}>
          <ActionButton
            label="Capturar fotografia"
            icon="photo-camera"
            onPress={() => navigation.navigate("Camera")}
          />
          <ActionButton
            label="Obter localização"
            icon="my-location"
            variant="secondary"
            onPress={getLocation}
            loading={loading}
          />
        </View>

        <InfoCard title="Localização atual">
          {coordinates ? (
            <>
              <ValueRow
                label="Latitude"
                value={coordinates.latitude.toFixed(6)}
              />
              <ValueRow
                label="Longitude"
                value={coordinates.longitude.toFixed(6)}
              />
            </>
          ) : (
            <Text style={styles.placeholder}>
              Toque em "Obter localização" para exibir as coordenadas.
            </Text>
          )}
          {error !== "" && <Text style={styles.error}>{error}</Text>}
        </InfoCard>

        <InfoCard title="Acelerômetro">
          <ValueRow label="Eixo X" value={x.toFixed(3)} />
          <ValueRow label="Eixo Y" value={y.toFixed(3)} />
          <ValueRow label="Eixo Z" value={z.toFixed(3)} />
        </InfoCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f6f8",
  },
  container: {
    padding: 20,
    gap: 20,
  },
  header: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#084f63",
  },
  subtitle: {
    fontSize: 14,
    color: "#5f7580",
    textAlign: "center",
  },
  actions: {
    gap: 12,
  },
  placeholder: {
    fontSize: 14,
    color: "#5f7580",
  },
  error: {
    fontSize: 14,
    color: "#c0392b",
    fontWeight: "600",
  },
});
