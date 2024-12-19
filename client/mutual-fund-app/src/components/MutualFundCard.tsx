import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MutualFundCardProps {
    name: string;
    ticker: string;
    price: number;
}

const MutualFundCard: React.FC<MutualFundCardProps> = ({ name, ticker, price }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.ticker}>{ticker}</Text>
            <Text style={styles.price}>{`Price: $${price}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f4f4f4',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ticker: {
        fontSize: 14,
        color: '#555',
    },
    price: {
        fontSize: 14,
        color: '#007BFF',
    },
});

export default MutualFundCard;
