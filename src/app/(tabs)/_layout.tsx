import React from "react";
import { Tabs } from "expo-router";
import { Map, Fish } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.text,
        tabBarInactiveTintColor: Colors.dark.text,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.dark.background,
          height: 85,
          paddingTop: 15,
          borderColor: Colors.dark.background,
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
    backgroundColor: Colors.dark.background,
    paddingVertical: 4,
    width: 46,
    borderRadius: 8,
  },
  activeTabBarIcon: {
    backgroundColor: Colors.dark.tint,
  },
});
