// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

// export default function Basics({ navigation }) {
//   const [farmerName, setFarmerName] = useState("");
//   const [phone, setPhone] = useState("");

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Farmer Information</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Farmer Name"
//         value={farmerName}
//         onChangeText={setFarmerName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Mobile Number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={phone}
//         onChangeText={setPhone}
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() =>
//           navigation.navigate("Address", { farmerName, phone })
//         }
//       >
//         <Text style={styles.buttonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E9F6EF",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 30,
//     marginTop: 20,
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 20,
//     elevation: 2,
//   },
//   button: {
//     backgroundColor: "#2B7A4B",
//     padding: 16,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

///
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from "react-native";

export default function Basics({ navigation }) {
  const [farmerName, setFarmerName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = () => {
    // Validation: Name
    if (!farmerName.trim()) {
      Alert.alert("Validation Error", "Farmer name cannot be empty.");
      return;
    }

    // Validation: Phone - must be 10 digits
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      Alert.alert("Validation Error", "Please enter a valid 10-digit mobile number.");
      return;
    }

    // Navigate only if valid
    navigation.navigate("Address", { farmerName, phone });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Farmer Name"
        value={farmerName}
        onChangeText={setFarmerName}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F6EF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  button: {
    backgroundColor: "#2B7A4B",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
