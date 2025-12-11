import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFarmers } from "../storage/FarmerStorage";
import { calculateDistance } from "../utils/Distance"; // returns KM

const FarmersList = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    loadFarmers();
  }, []);

  const loadFarmers = async () => {
    const data = await getFarmers();

    // Correct distance calculation
    const updated = data.map((item) => ({
      ...item,
      distanceKm:
        item.lat && item.lon
          ? calculateDistance(item.lat, item.lon).toFixed(2) // ✔ CORRECT
          : "N/A",
    }));

    setFarmers(updated);
  };

  // TEMPORARY — CLEAR ALL FARMERS
//   const clearAllFarmers = async () => {
//     try {
//       await AsyncStorage.removeItem("FARMERS_DATA");
//       setFarmers([]);
//       alert("All farmer data cleared! (TEMP button)");
//     } catch (error) {
//       console.log("Error clearing data", error);
//     }
//   };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.farmerName}</Text>
      <Text style={styles.cell}>{item.VillageName}</Text>
      <Text style={styles.cell}>{item.taluk}</Text>
      <Text style={styles.cell}>{item.district}</Text>
      <Text style={styles.cell}>{item.state}</Text>
      <Text style={styles.cell}>{item.pincode}</Text>
      <Text style={styles.cell}>{item.phone}</Text>
      <Text style={styles.cell}>{item.crop}</Text>
      <Text style={styles.cell}>{item.acreage}</Text>
      <Text style={styles.cell}>{item.harvestingDate}</Text>

      {/* Distance */}
      <Text style={styles.cell}>{item.distanceKm} km</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Farmers List</Text>

      {/* TEMP BUTTON */}
      {/* <TouchableOpacity style={styles.tempButton} onPress={clearAllFarmers}>
        <Text style={styles.tempButtonText}>CLEAR ALL FARMER DATA (TEMP)</Text>
      </TouchableOpacity> */}

      {/* Table */}
      <ScrollView horizontal showsHorizontalScrollIndicator style={styles.scroll}>
        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell]}>Name</Text>
            <Text style={[styles.cell, styles.headerCell]}>Village</Text>
            <Text style={[styles.cell, styles.headerCell]}>Taluka</Text>
            <Text style={[styles.cell, styles.headerCell]}>District</Text>
            <Text style={[styles.cell, styles.headerCell]}>State</Text>
            <Text style={[styles.cell, styles.headerCell]}>Pincode</Text>
            <Text style={[styles.cell, styles.headerCell]}>Phone</Text>
            <Text style={[styles.cell, styles.headerCell]}>Crop</Text>
            <Text style={[styles.cell, styles.headerCell]}>Acreage</Text>
            <Text style={[styles.cell, styles.headerCell]}>Harvest</Text>
            <Text style={[styles.cell, styles.headerCell]}>Distance form given lat/log (Km)</Text>
          </View>

          <FlatList
            data={farmers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FarmersList;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#E9F6EF" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  scroll: {
    borderWidth: 1,
    borderColor: "#636e72",
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#b2bec3",
  },
  headerRow: {
    backgroundColor: "#dfe6e9",
    borderBottomWidth: 2,
  },
  cell: {
    width: 120,
    padding: 8,
    borderRightWidth: 1,
    borderColor: "#b2bec3",
    fontSize: 12,
    textAlign: "center",
    color: "#2d3436",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 13,
  },

  tempButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  tempButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
