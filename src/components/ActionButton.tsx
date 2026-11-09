import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@react-native-vector-icons/material-icons";

type Props = {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export default function ActionButton({
  label,
  icon,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
}: Props) {
  const isPrimary = variant === "primary";
  const contentColor = isPrimary ? "#ffffff" : "#0b6e8a";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={contentColor} />
      ) : (
        <MaterialIcons name={icon} size={24} color={contentColor} />
      )}
      <Text style={[styles.label, { color: contentColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0b6e8a",
  },
  primary: {
    backgroundColor: "#0b6e8a",
  },
  secondary: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});
