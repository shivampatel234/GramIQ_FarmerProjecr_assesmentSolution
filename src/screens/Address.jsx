import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function Address({ route, navigation }) {
  const params = route?.params ?? {};
  const farmerName = params.farmerName ?? "";
  const phone = params.phone ?? "";

  // Hooks
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [taluk, setTaluk] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- PINCODE API ----------------
  const fetchIndianPincodeDetails = async (pin) => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pin}`
      );
      const data = await response.json();
      if (data && data[0]?.Status === "Success") {
        const PO = data[0].PostOffice[0];
        return {
          success: true,
          taluka: PO.Block,
          district: PO.District,
          state: PO.State,
        };
      }
      return { success: false, message: "Invalid pincode" };
    } catch (e) {
      return { success: false, message: "Network error" };
    }
  };

  // ---------------- DISTRICT → LAT/LON ----------------
  const fetchLatLon = async (district, state) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
        district
      )}&state=${encodeURIComponent(state)}&country=India&format=json`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": "FarmerApp/1.0",
        },
      });

      const data = await res.json();
      if (data.length > 0) {
        return { lat: data[0].lat, lon: data[0].lon };
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  // ---------------- FETCH ADDRESS ----------------
  useEffect(() => {
    let active = true;
    setError("");
    setTaluk("");
    setDistrict("");
    setState("");
    setLat("");
    setLon("");

    if (pincode.length !== 6) return;

    const fetchAddress = async () => {
      setLoading(true);
      const result = await fetchIndianPincodeDetails(pincode);
      if (!active) return;

      if (result.success) {
        setTaluk(result.taluka);
        setDistrict(result.district);
        setState(result.state);
      } else {
        setError(result.message);
        // Allow user to manually input details
        setTaluk("");
        setDistrict("");
        setState("");
      }
      setLoading(false);
    };

    fetchAddress();

    return () => {
      active = false;
    };
  }, [pincode]);

  // ---------------- FETCH LAT/LON ----------------
  useEffect(() => {
    let active = true;
    if (!district || !state) return;

    const fetchLocation = async () => {
      const loc = await fetchLatLon(district, state);
      if (!active) return;

      if (loc) {
        setLat(loc.lat);
        setLon(loc.lon);
      } else {
        setLat("");
        setLon("");
      }
    };

    fetchLocation();

    return () => {
      active = false;
    };
  }, [district, state]);

  // ---------------- NEXT ----------------
  const handleNext = () => {
    if (pincode.length !== 6) {
      Alert.alert("Error", "Pincode must be 6 digits.");
      return;
    }
    if (!district || !state || !taluk) {
      Alert.alert(
        "Error",
        "Please fill Taluka, District and State fields manually."
      );
      return;
    }

    // Allow navigation even if lat/lon not available
    navigation.navigate("Crop", {
      farmerName,
      phone,
      pincode,
      taluk,
      district,
      state,
      lat,
      lon,
    });
  };

  // ---------------- UI ----------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address Details</Text>
      <Text style={styles.subtitle}>Enter your Indian 6 digit pincode</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pincode</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={(t) => setPincode(t.replace(/[^0-9]/g, ""))}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color="#2979FF"
            style={styles.loadingIndicator}
          />
        )}
      </View>

      {error !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}

      {pincode.length === 6 && district && state && taluk && error === "" && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            ✓ Address details fetched successfully
          </Text>
        </View>
      )}

      {/* Taluk */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Taluka</Text>
        <TextInput
          style={styles.input}
          value={taluk}
          placeholder="Enter Taluka"
          onChangeText={(t) => setTaluk(t)}
        />
      </View>

      {/* District */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>District</Text>
        <TextInput
          style={styles.input}
          value={district}
          placeholder="Enter District"
          onChangeText={(t) => setDistrict(t)}
        />
      </View>

      {/* State */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={state}
          placeholder="Enter State"
          onChangeText={(t) => setState(t)}
        />
      </View>

      {/* NEXT BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          (!district || !state || !taluk || loading) && styles.buttonDisabled,
        ]}
        onPress={handleNext}
        disabled={!district || !state || !taluk || loading}
      >
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Next"}</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F6EF",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
    color: "#1B5E20",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    elevation: 2,
  },
  loadingIndicator: {
    position: "absolute",
    top: 38,
    right: 15,
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#D32F2F",
  },
  errorText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D32F2F",
  },
  successContainer: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#2B7A4B",
  },
  successText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2B7A4B",
  },
  button: {
    backgroundColor: "#2B7A4B",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
