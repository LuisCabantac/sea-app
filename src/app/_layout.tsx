import "react-native-reanimated";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const [loaded] = useFonts({
    BiotifRegular: require("../assets/fonts/Biotif-Regular.ttf"),
    BiotifItalic: require("../assets/fonts/Biotif-RegularItalic.ttf"),
    BiotifMedium: require("../assets/fonts/Biotif-Medium.ttf"),
    BiotifSemiBold: require("../assets/fonts/Biotif-SemiBold.ttf"),
    BiotifBold: require("../assets/fonts/Biotif-Bold.ttf"),
    BiotifBlack: require("../assets/fonts/Biotif-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
