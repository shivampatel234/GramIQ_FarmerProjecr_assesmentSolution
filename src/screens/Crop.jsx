// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

// const Crop = ({ navigation, route }) => {
//   const [VillageName, setVillageName] = useState(route.params?.VillageName || "")
//   const [crop, setCrop] = useState(route.params?.crop || "");
//   const [acreage, setAcreage] = useState(route.params?.acreage || "");

//   const handleNext = () => {
//     navigation.navigate("Date", {
//       ...route.params,
//       VillageName,
//       crop,
//       acreage,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Crop Details</Text>
//       <Text style={styles.label}>Village Name</Text>
//       <TextInput
//         style={styles.input}
//         value={VillageName}
//         onChangeText={setVillageName}
//         placeholder="Enter Village name"
//       />

//       <Text style={styles.label}>Crop Type</Text>
//       <TextInput
//         style={styles.input}
//         value={crop}
//         onChangeText={setCrop}
//         placeholder="Enter crop name"
//       />

//       <Text style={styles.label}>Acreage (in acres)</Text>
//       <TextInput
//         style={styles.input}
//         value={acreage}
//         onChangeText={setAcreage}
//         keyboardType="numeric"
//         placeholder="Enter acreage"
//       />

//       <TouchableOpacity style={styles.button} onPress={handleNext}>
//         <Text style={styles.buttonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Crop;

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     padding: 20, 
//     backgroundColor: "#E9F6EF" 
// },
//   header: { 
//     fontSize: 22, 
//     fontWeight: "bold", 
//     marginBottom: 20 
// },
//   label: { 
//     fontSize: 16, 
//     marginBottom: 6 
// },
//   input: {
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#2C8D5A",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   buttonText: { 
//     color: "#fff", 
//     fontSize: 18, 
//     textAlign: "center" 
// },
// });


import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from "react-native";

const Crop = ({ navigation, route }) => {
  const [VillageName, setVillageName] = useState(route.params?.VillageName || "");
  const [crop, setCrop] = useState(route.params?.crop || "");
  const [acreage, setAcreage] = useState(route.params?.acreage || "");

  const handleNext = () => {
    // Validation: Village Name
    if (!VillageName.trim()) {
      Alert.alert("Validation Error", "Village name cannot be empty.");
      return;
    }

    // Validation: Crop
    if (!crop.trim()) {
      Alert.alert("Validation Error", "Crop name cannot be empty.");
      return;
    }

    // Validation: Acreage (must be number and not empty)
    if (!acreage.trim()) {
      Alert.alert("Validation Error", "Acreage cannot be empty.");
      return;
    }

    const isNumeric = /^[0-9]+(\.[0-9]+)?$/; // allows decimals too (optional)

    if (!isNumeric.test(acreage)) {
      Alert.alert("Validation Error", "Acreage must be a valid number.");
      return;
    }

    // If all valid → Navigate
    navigation.navigate("Date", {
      ...route.params,
      VillageName,
      crop,
      acreage,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crop Details</Text>

      <Text style={styles.label}>Village Name</Text>
      <TextInput
        style={styles.input}
        value={VillageName}
        onChangeText={setVillageName}
        placeholder="Enter village name"
      />

      <Text style={styles.label}>Crop Type</Text>
      <TextInput
        style={styles.input}
        value={crop}
        onChangeText={setCrop}
        placeholder="Enter crop name"
      />

      <Text style={styles.label}>Acreage (in acres)</Text>
      <TextInput
        style={styles.input}
        value={acreage}
        onChangeText={setAcreage}
        keyboardType="numeric"
        placeholder="Enter acreage"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Crop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E9F6EF"
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 6
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2C8D5A",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center"
  },
});
