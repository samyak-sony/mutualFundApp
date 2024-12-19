import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  TextInput,
  Keyboard,
  ScrollView
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useBasketContext } from "../contexts/BasketContext";
import { useMutualFundContext } from "../contexts/MutualFundContext";
import SearchDropdown from "../components/SearchDropdown";
import Button from "../components/Button";
import { MutualFund } from "../navigation/types";

interface BasketDetailsScreenParams {
  basketId: number;
  basketName: string;
}

const BasketDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: BasketDetailsScreenParams }>>();
  const { basketId, basketName } = route.params;

  const [loading, setLoading] = useState(false);
  const [basketFunds, setBasketFunds] = useState<MutualFund[]>([]);
  const [selectedMutualFund, setSelectedMutualFund] = useState<MutualFund | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { getDetails, addMutualFundBasket, removeMutualFundBasket } = useBasketContext();
  const { mutualFunds, loadMutualFunds, getMutualDetails } = useMutualFundContext();

  useEffect(() => {
    loadMutualFunds();
    fetchBasketDetails();
  }, [basketId]);

  const fetchBasketDetails = async () => {
    setLoading(true);
    try {
      const data = await getDetails(basketId);
      const fundsWithDetails = await Promise.all(
        data.map(async (fund) => {
          const fundDetails = await getMutualDetails(fund.id);
          return { ...fund, price: fundDetails?.price };
        })
      );
      setBasketFunds(fundsWithDetails);
    } catch (error) {
      Alert.alert("Error", "Failed to load basket details.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMutualFund = async () => {
    Keyboard.dismiss();

    const weightValue = parseFloat(weight);
    if (!selectedMutualFund || isNaN(weightValue) || weightValue <= 0) {
      Alert.alert("Error", "Please select a mutual fund and enter a valid weight.");
      return;
    }

    const totalWeight = basketFunds.reduce((acc, fund) => acc + fund.weight, 0);

    if (totalWeight + weightValue > 100) {
      Alert.alert("Error", "Total weight exceeds 100%. Please adjust the weight.");
      return;
    }

    try {
      await addMutualFundBasket(basketId, selectedMutualFund.id, weightValue);
      Alert.alert("Success", "Mutual fund added to the basket.");
      fetchBasketDetails();
      setWeight("");
      setSelectedMutualFund(null);
    } catch (error) {
      Alert.alert("Error", "Failed to add mutual fund.");
    }
  };

  const handleRemoveMutualFund = async (mutualFundId: number) => {
    try {
      await removeMutualFundBasket(basketId, mutualFundId);
      Alert.alert("Success", "Mutual fund removed from the basket.");
      fetchBasketDetails();
    } catch (error) {
      Alert.alert("Error", "Failed to remove mutual fund.");
    }
  };

  const handleMutualFundSelect = (id: number) => {
    const selectedFund = mutualFunds.find((fund) => typeof fund.id === "number" && fund.id === id);
    if (selectedFund) {
      setSelectedMutualFund(selectedFund as MutualFund);
      setSearchQuery(selectedFund.name);
      setIsSearchFocused(false);
    } else {
      Alert.alert("Error", "Selected mutual fund does not have a valid ID.");
    }
  };
  const totalWeight = basketFunds.reduce((acc, fund) => acc + fund.weight, 0);
  const filteredFunds = mutualFunds.filter((fund) =>
    fund.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{basketName} - Basket Details</Text>
      <Text style={styles.totalWeight}>{`Total allocation: ${totalWeight.toFixed(2)}%`}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={basketFunds}
          renderItem={({ item }) => (
            <View style={styles.mutualFundItem}>
              <View style={styles.mutualFundDetails}>
                <Text style={styles.mutualFundName}>{item.name}</Text>
                <Text style={styles.mutualFundPrice}>{`Price: $${item.price?.toFixed(2) || "N/A"}`}</Text>
              </View>
              <Text style={styles.mutualFundWeight}>{`Allocation: ${item.weight}%`}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveMutualFund(item.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
      <View style={styles.addFundSection}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search mutual funds..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        />
        {isSearchFocused && (
          <ScrollView style={styles.dropdownContainer}> 
          <SearchDropdown
            options={filteredFunds
              .filter((fund) => typeof fund.id === "number")
              .map((fund) => ({ id: fund.id as number, name: fund.name }))}
            onSelect={handleMutualFundSelect}
          />
          </ScrollView>
        )}
        {selectedMutualFund && (
          <TextInput
            style={styles.weightInput}
            placeholder="Selected Mutual Fund"
            value={selectedMutualFund.name}
            editable={false}
          />
        )}
        <TextInput
          style={styles.weightInput}
          placeholder="Enter Allocation (%)"
          value={weight}
          keyboardType="numeric"
          onChangeText={setWeight}
        />
        <Button title="Add Mutual Fund" onPress={handleAddMutualFund} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  mutualFundDetails: {
    flex: 1,
    flexDirection: "column",
  },
  mutualFundPrice: {
    fontSize: 14,
    color: "#666",
  },
  mutualFundItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  mutualFundName: {
    fontSize: 16,
    flex: 1,
  },
  totalWeight: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  mutualFundWeight: {
    fontSize: 16,
    marginRight: 10,
  },
  removeButton: {
    padding: 8,
    backgroundColor: "#ff0000",
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addFundSection: {
    marginTop: 20,
  },
  weightInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdownContainer: {
    maxHeight: 200,  
  },
});

export default BasketDetailsScreen;
