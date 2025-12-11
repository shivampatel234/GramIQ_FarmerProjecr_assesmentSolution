import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { saveFarmer } from "../storage/FarmerStorage";

const DateScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleSave = async () => {
    const farmerData = {
      ...route.params,
      harvestingDate: date.toDateString(),
      id: Date.now(),
    };
    await saveFarmer(farmerData);
    navigation.navigate("FarmersList");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Harvesting Date</Text>

      <TouchableOpacity style={styles.dateBox} onPress={() => setShow(true)}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Farmer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E9F6EF" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  dateBox: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateText: { fontSize: 18 },
  button: {
    backgroundColor: "#2C8D5A",
    padding: 16,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 18 },
});
