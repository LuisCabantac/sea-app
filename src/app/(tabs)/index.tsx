import * as Location from "expo-location";
import { Colors } from "@/constants/Colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fish, Locate, Navigation } from "lucide-react-native";
import { Pressable, StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

import { markers } from "@/utils/markers";
import { IRegion } from "@/types/markers";

import BottomSheetItem from "@/components/BottomSheetItem";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const mapRef = useRef<MapView>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  async function getUserCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  function focusMap() {
    const newLocation = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current?.animateCamera(
      { center: newLocation, zoom: 15 },
      { duration: 500 }
    );
  }

  function focusUserCurrentLocation(currentLocation?: IRegion) {
    getUserCurrentLocation();

    const defaultLocation = {
      latitude: location?.coords.latitude ?? 37.78825,
      longitude: location?.coords.longitude ?? -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current?.animateCamera(
      { center: currentLocation ? currentLocation : defaultLocation, zoom: 15 },
      { duration: 500 }
    );
  }

  const sortedMarkers = useMemo(() => {
    return markers.sort((a, b) => b.fish - a.fish);
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.dark.background, flex: 1 }}
      edges={["top"]}
    >
      <GestureHandlerRootView style={styles.bottomSheetContainer}>
        <View style={{ flex: 1, position: "relative" }}>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={initialRegion}
            customMapStyle={mapStyle}
            initialCamera={{
              center: {
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
              },
              pitch: 0,
              heading: 0,
              zoom: 15,
              altitude: 0,
            }}
            ref={mapRef}
          >
            {markers.map((marker) => {
              return (
                <Marker key={marker.id} coordinate={marker}>
                  <View
                    style={{
                      backgroundColor:
                        sortedMarkers[0].fish === marker.fish
                          ? Colors.dark.accent
                          : Colors.dark.text,
                      borderRadius: 9999,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                    }}
                  >
                    <Fish color={Colors.dark.tint} size={16} />
                    <Text
                      style={{
                        color: Colors.dark.tint,
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {marker.fish}
                    </Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
          <View style={styles.mapControls}>
            <Pressable onPress={focusMap}>
              <Navigation
                color={Colors.dark.tint}
                style={{ transform: [{ rotate: "280deg" }] }}
                fill={Colors.dark.tint}
              />
            </Pressable>
            <Pressable onPress={() => focusUserCurrentLocation()}>
              <Locate color={Colors.dark.tint} />
            </Pressable>
          </View>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enableOverDrag={false}
          enableDynamicSizing={false}
          backgroundStyle={{
            borderTopLeftRadius: 70,
            borderTopRightRadius: 70,
            backgroundColor: Colors.dark.text,
          }}
          handleIndicatorStyle={{
            backgroundColor: Colors.dark.tint,
            height: 8,
            width: 82,
          }}
          style={{ backgroundColor: "transparent" }}
        >
          <View style={styles.bottomSheetContentContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Spots near you
            </Text>
            <View
              style={{
                backgroundColor: Colors.dark.background,
                height: 20,
              }}
            ></View>
            <FlatList
              data={sortedMarkers}
              keyExtractor={(marker) => marker.id.toString()}
              scrollEnabled
              renderItem={(marker) => (
                <BottomSheetItem
                  marker={marker.item}
                  location={location}
                  onFocusUserCurrentLocation={focusUserCurrentLocation}
                />
              )}
            />
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "110%",
    width: "100%",
  },
  mapControls: {
    position: "absolute",
    top: "50%",
    right: "3%",
    alignSelf: "center",
    flexDirection: "column",
    backgroundColor: Colors.dark.text,
    borderRadius: 9999,
    paddingVertical: 10,
    paddingHorizontal: 6,
    rowGap: 12,
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  bottomSheetContentContainer: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
});

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#73747d",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#73747d",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9E9E9E",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#BDBDBD",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#73747d",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2C2C2C",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8A8A8A",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3C3C3C",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4E4E4E",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#73747d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#1c78c4",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3D3D3D",
      },
    ],
  },
];
