import { Tabs } from "expo-router";
import React from "react";
import { Map, Fish } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          height: 85,
          paddingTop: 15,
          borderColor: "#000",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Find",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}
            >
              <Map size={26} color={color} />
              <Text style={{ color, fontSize: 12, fontWeight: "bold" }}>
                Find
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: "Coach",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}
            >
              <Fish size={26} color={color} />
              <Text style={{ color, fontSize: 12, fontWeight: "bold" }}>
                Coach
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 4,
    width: 46,
    borderRadius: 8,
  },
  activeTabBarIcon: {
    backgroundColor: "#4d4d4d",
  },
});
