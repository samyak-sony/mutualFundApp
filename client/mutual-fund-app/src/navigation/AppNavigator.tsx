import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BasketScreen from '../screens/BasketScreen';
import SearchScreen from '../screens/SearchScreen';
import AddMutualFundScreen from '../screens/AddMutualFundScreen';
import BasketDetailsScreen from '../screens/BasketDetailsScreen'; 

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
    return (
       
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
                <Stack.Screen name="BasketScreen" component={BasketScreen} options={{ title: 'Baskets' }} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Search Funds' }} />
                <Stack.Screen name="AddMutualFundScreen" component={AddMutualFundScreen} options={{ title: 'Add Fund' }} />
                <Stack.Screen name="BasketDetailsScreen" component={BasketDetailsScreen} options={{ title: 'Basket Details' }} />
            </Stack.Navigator>
        
    );
};

export default AppNavigator;
