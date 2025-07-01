interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IRegion extends ILocation {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface IMarker extends ILocation {
  id: number;
  fish: number;
  location: string;
}
