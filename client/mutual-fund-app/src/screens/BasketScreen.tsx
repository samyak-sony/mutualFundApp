import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import BasketCard from "../components/BasketCard";
import Loader from "../components/Loader";
import { useBasketContext } from "../contexts/BasketContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

type BasketScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BasketScreen"
>;

const BasketScreen: React.FC = () => {
  const navigation = useNavigation<BasketScreenNavigationProp>();
  const { baskets, loadBaskets, addBasket } = useBasketContext();
  const [loading, setLoading] = useState(false);
  const [riskCategory, setRiskCategory] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBasketName, setNewBasketName] = useState<string>("");
  const [newBasketRiskCategory, setNewBasketRiskCategory] = useState<string>("");

  const fetchBaskets = async () => {
    if (!riskCategory) return;
    setLoading(true);
    try {
      await loadBaskets(riskCategory);
    } catch (error) {
      console.error("Failed to fetch baskets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBasketPress = (basketId: number, basketName: string) => {
    navigation.navigate("BasketDetailsScreen", { basketId, basketName });
  };

  const handleCreateBasket = async () => {
    if (!newBasketName || !newBasketRiskCategory) {
      alert("Please enter both basket name and risk category.");
      return;
    }
    setLoading(true);
    try {
      await addBasket(newBasketRiskCategory, newBasketName);
      setIsModalVisible(false); 
      setNewBasketName(""); 
      setNewBasketRiskCategory("");
      await loadBaskets(newBasketRiskCategory); 
    } catch (error) {
      console.error("Failed to create basket:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Select Risk Category</Text>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.plusButton}
        >
          <Ionicons name="add-circle" size={28} color="#007bff" />
        </TouchableOpacity>
      </View>

      
      <TextInput
        style={styles.input}
        placeholder="Enter Risk Category (e.g., Low-Risk)"
        value={riskCategory}
        onChangeText={setRiskCategory}
      />

      
      <TouchableOpacity style={styles.button} onPress={fetchBaskets}>
        <Text style={styles.buttonText}>Fetch Baskets</Text>
      </TouchableOpacity>

     
      <FlatList
        data={baskets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleBasketPress(item.id, item.name)}
          >
            <BasketCard name={item.name} riskCategory={item.risk_category} />
          </TouchableOpacity>
        )}
      />

      
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Basket</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Enter Basket Name"
              value={newBasketName}
              onChangeText={setNewBasketName}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Enter Risk Category (e.g., Low-Risk)"
              value={newBasketRiskCategory}
              onChangeText={setNewBasketRiskCategory}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#007bff" }]}
                onPress={handleCreateBasket}
              >
                <Text style={styles.modalButtonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  plusButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BasketScreen;
