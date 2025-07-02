export default {
  expo: {
    name: "Sea",
    slug: "sea-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icons/default-icon.png",
    scheme: "seaapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.luiscabantac.seaapp",
      icon: {
        dark: "./src/assets/icons/ios-dark.png",
        light: "./src/assets/icons/ios-light.png",
        tinted: "./src/assets/icons/ios-tinted.png",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/icons/default-icon.png",
        monochromeImage: "./src/assets/icons/adaptive-icon.png",
        backgroundColor: "#000",
      },
      icon: "./src/assets/icons/default-icon.png",
      edgeToEdgeEnabled: true,
      package: "com.luiscabantac.seaapp",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/icons/default-icon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./src/assets/icons/splash-icon-light.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#000",
          dark: {
            image: "./src/assets/icons/splash-icon-dark.png",
            backgroundColor: "#000",
          },
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Sea to use your location.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "95b02f1a-57f2-441d-b8a9-e435bca4a658",
      },
    },
  },
};
