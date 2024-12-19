import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, Button, Modal, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import { useBasketContext } from '../contexts/BasketContext';
import { useMutualFundContext } from '../contexts/MutualFundContext';
import MutualFundCard from '../components/MutualFundCard';
import Loader from '../components/Loader';

const SearchScreen: React.FC = () => {
    const { mutualFunds, searchFunds } = useMutualFundContext();
    const { baskets, addMutualFundBasket } = useBasketContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedBasket, setSelectedBasket] = useState<number | null>(null);
    const [weight, setWeight] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMutualFundId, setSelectedMutualFundId] = useState<number | null>(null);
    const [basketSearch, setBasketSearch] = useState(''); 

    useFocusEffect(
        React.useCallback(() => {
            setQuery(''); 
            searchFunds('');
        }, [])
    );

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            await searchFunds(query); 
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    
    const openModal = (mutualFundId: number) => {
        setSelectedMutualFundId(mutualFundId);
        setShowModal(true);
    };

    
    const handleAddToBasket = async () => {
        if (selectedBasket !== null && selectedMutualFundId !== null && weight.trim()) {
            const basketId = selectedBasket;
            const mutualFundId = selectedMutualFundId;
            const weightValue = parseFloat(weight);
            try {
                await addMutualFundBasket(basketId, mutualFundId, weightValue);
                setShowModal(false); 
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('Please select a basket and provide a weight');
        }
    };

   
    const filteredBaskets = baskets.filter(basket =>
        basket.name.toLowerCase().includes(basketSearch.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search mutual funds"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
            />
            {loading ? (
                <Loader />
            ) : (
                <FlatList
                    data={mutualFunds}
                    keyExtractor={(item) => item.id ? item.id.toString() : item.name}
                    renderItem={({ item }) => (
                        <View style={styles.fundCard}>
                            <MutualFundCard
                                name={item.name || ''}
                                ticker={item.ticker || ''}
                                price={item.price ?? 0}
                            />
                            <Button 
                                title="Add to Basket"
                                onPress={() => openModal(item.id!)} 
                            />
                        </View>
                    )}
                />
            )}

           
            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select a Basket and Set Weight</Text>
                        
                       
                        <TextInput
                            style={styles.input}
                            placeholder="Search for a Basket"
                            value={basketSearch}
                            onChangeText={setBasketSearch} 
                        />
                        
                        <Text style={styles.label}>Select Basket</Text>
                        <FlatList
                            data={filteredBaskets} 
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Button
                                    title={item.name}
                                    onPress={() => setSelectedBasket(item.id)}
                                />
                            )}
                        />
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Allocation %"
                            value={weight}
                            onChangeText={setWeight}
                            keyboardType="numeric"
                        />
                        <Button title="Add Mutual Fund to Basket" onPress={handleAddToBasket} />
                        <Button title="Cancel" onPress={() => setShowModal(false)} />
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    fundCard: {
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
    },
});

export default SearchScreen;
