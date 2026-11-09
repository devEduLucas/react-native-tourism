import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Accelerometer } from "expo-sensors";

type AccelerometerData = {
  x: number;
  y: number;
  z: number;
};

const GRAVITY = 9.81;

export function useAccelerometer(updateInterval = 100): AccelerometerData {
  const [data, setData] = useState<AccelerometerData>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (Platform.OS === "web") {
      const onMotion = (event: DeviceMotionEvent) => {
        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;
        setData({
          x: (acceleration.x ?? 0) / GRAVITY,
          y: (acceleration.y ?? 0) / GRAVITY,
          z: (acceleration.z ?? 0) / GRAVITY,
        });
      };

      window.addEventListener("devicemotion", onMotion);
      return () => window.removeEventListener("devicemotion", onMotion);
    }

    Accelerometer.setUpdateInterval(updateInterval);
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  }, [updateInterval]);

  return data;
}