import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CoachScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
      <Text style={{ color: "#fff" }}>Coach</Text>
    </SafeAreaView>
  );
}
