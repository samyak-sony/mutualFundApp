import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import { useMutualFundContext } from '../contexts/MutualFundContext'; 

const AddMutualFundScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    const [price, setPrice] = useState('');

 
    const { addFunds } = useMutualFundContext();

    const handleAdd = async () => {
        try {
            
            const newMutualFund = {
                name,
                ticker,
                price: parseFloat(price),
            };
            
            const addedFunds = await addFunds([newMutualFund]);

            
            if (addedFunds && Array.isArray(addedFunds) && addedFunds.length > 0) {
                Alert.alert('Success', 'Mutual fund added successfully');
            } else {
                throw new Error('Failed to add mutual fund');
            }

            
            setName('');
            setTicker('');
            setPrice('');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to add mutual fund');
        }
    };

    return (
        <View style={styles.container}>
            <InputField
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter mutual fund name"
            />
            <InputField
                label="Ticker"
                value={ticker}
                onChangeText={setTicker}
                placeholder="Enter mutual fund ticker"
            />
            <InputField
                label="Price"
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price"
                keyboardType="numeric"
            />
            <Button title="Add Mutual Fund" onPress={handleAdd} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default AddMutualFundScreen;
