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
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}
            >
              <Map size={26} color={color} />
              <Text
                style={{
                  color,
                  fontSize: 12,
                  fontFamily: "BiotifBold",
                }}
              >
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
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.dark.background,
            borderBottomColor: Colors.dark.card,
            borderBottomWidth: 1,
          },
          headerTitle: () => null,
          headerLeft: () => (
            <View
              style={{
                paddingHorizontal: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.dark.card,
                  borderRadius: 9999,
                  padding: 8,
                }}
              >
                <Fish size={26} color={Colors.dark.text} />
              </View>
              <Text
                style={{
                  color: Colors.dark.text,
                  fontSize: 20,
                  fontFamily: "BiotifBold",
                }}
              >
                Sea Coach
              </Text>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}
            >
              <Fish size={26} color={color} />
              <Text
                style={{
                  color,
                  fontSize: 12,
                  fontFamily: "BiotifBold",
                }}
              >
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
