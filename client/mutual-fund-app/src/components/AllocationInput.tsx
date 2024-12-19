import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface AllocationInputProps {
    initialValue?: number;
    onValueChange: (value: number) => void;
}

const AllocationInput: React.FC<AllocationInputProps> = ({ initialValue = 0, onValueChange }) => {
    const [value, setValue] = useState(initialValue.toString());

    const handleChange = (text: string) => {
        const numericValue = parseFloat(text) || 0;
        setValue(text);
        onValueChange(numericValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Allocation Percentage:</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={handleChange}
                keyboardType="numeric"
                placeholder="Enter percentage"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});

export default AllocationInput;
