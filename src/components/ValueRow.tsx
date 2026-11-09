import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export default function ValueRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#1b2a30",
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#084f63",
    fontVariant: ["tabular-nums"],
  },
});
