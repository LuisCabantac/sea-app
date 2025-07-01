function getRandomOffset(delta: number) {
  return (Math.random() - 0.5) * delta;
}

const locationNames = [
  "Golden Gate Marina",
  "Fisherman's Wharf",
  "Alcatraz Waters",
  "Bay Bridge Pier",
  "Crissy Field Shore",
  "Marina District",
  "Aquatic Cove",
  "Pier 39 Docks",
  "Telegraph Hill Bay",
  "Russian Hill Coast",
];

export const markers = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  latitude: 37.78825 + getRandomOffset(0.06),
  longitude: -122.4324 + getRandomOffset(0.06),
  fish: Math.floor(Math.random() * 100) + 1,
  location: locationNames[i],
}));
