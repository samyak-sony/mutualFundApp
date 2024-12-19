import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useBasketContext } from '../contexts/BasketContext';  

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { baskets } = useBasketContext(); 

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Mutual Fund App</Text>
            <Text style={styles.subtitle}>
                {baskets.length > 0
                    ? `You have ${baskets.length} baskets loaded.`
                    : 'No baskets loaded yet.'}
            </Text>
            <Button title="View Baskets" onPress={() => navigation.navigate('BasketScreen')} />
            <Button title="Search Mutual Funds" onPress={() => navigation.navigate('SearchScreen')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
});

export default HomeScreen;
