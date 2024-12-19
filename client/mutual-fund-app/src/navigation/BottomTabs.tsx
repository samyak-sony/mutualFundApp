import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import BasketScreen from '../screens/BasketScreen';
import SearchScreen from '../screens/SearchScreen';
import AddMutualFundScreen from '../screens/AddMutualFundScreen';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="BasketScreen"
                component={BasketScreen}
                options={{ tabBarLabel: 'Baskets' }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ tabBarLabel: 'Search' }}
            />
            <Tab.Screen
                name="AddMutualFundScreen"
                component={AddMutualFundScreen}
                options={{ tabBarLabel: 'Add Fund' }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
