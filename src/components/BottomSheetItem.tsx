import * as Location from "expo-location";
import { Crown } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { markers } from "@/utils/markers";
import { IMarker, IRegion } from "@/types/markers";

export default function BottomSheetItem({
  marker,
  location,
  onSetLocation,
  onFocusLocation,
}: {
  marker: IMarker;
  location: Location.LocationObject | null;
  onSetLocation: (longitude: number, latitude: number) => void;
  onFocusLocation: (location: IRegion) => void;
}) {
  return (
    <Pressable
      onPress={() => {
        onFocusLocation({
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        onSetLocation(marker.longitude, marker.latitude);
      }}
      style={styles.bottomSheetItemContainer}
    >
      <View>
        <Text style={{ fontSize: 18, fontWeight: 700 }}>{marker.location}</Text>
        <Text style={{ fontSize: 16, color: Colors.dark.tint }}>
          {(() => {
            if (!location?.coords) return "N/A";
            const lat1 = location.coords.latitude;
            const lon1 = location.coords.longitude;
            const lat2 = marker.latitude;
            const lon2 = marker.longitude;

            const R = 6371;
            const dLat = ((lat2 - lat1) * Math.PI) / 180;
            const dLon = ((lon2 - lon1) * Math.PI) / 180;
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;

            return distance < 1
              ? `${(distance * 1000).toFixed(0)} m`
              : `${distance.toFixed(1)} km`;
          })()}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          {markers.reduce(
            (max, marker) => (marker.fish > max.fish ? marker : max),
            markers[0]
          ).fish === marker.fish ? (
            <Crown color={Colors.dark.accent} fill={Colors.dark.accent} />
          ) : null}
          <Text style={{ fontSize: 18, fontWeight: 700 }}>{marker.fish}</Text>
        </View>
        <Text style={{ fontSize: 16, color: Colors.dark.tint }}>
          Fish Score
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bottomSheetItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
});
