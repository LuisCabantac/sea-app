import { Colors } from "@/constants/Colors";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CoachScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.dark.background, flex: 1 }}>
      <Text style={{ color: Colors.dark.text }}>Coach</Text>
    </SafeAreaView>
  );
}
