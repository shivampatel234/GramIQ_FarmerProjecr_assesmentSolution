import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "FARMERS_DATA";

// Save new farmer
export const saveFarmer = async (farmer) => {
  const existing = await getFarmers();
  existing.push(farmer);
  await AsyncStorage.setItem(KEY, JSON.stringify(existing));
};

// Get all farmers
export const getFarmers = async () => {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
};

// Delete farmer by id
export const deleteFarmer = async (id) => {
  const existing = await getFarmers();
  const filtered = existing.filter((farmer) => farmer.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
};

// Update farmer by id
export const updateFarmer = async (updatedFarmer) => {
  const existing = await getFarmers();
  const updatedList = existing.map((farmer) =>
    farmer.id === updatedFarmer.id ? updatedFarmer : farmer
  );
  await AsyncStorage.setItem(KEY, JSON.stringify(updatedList));
};
