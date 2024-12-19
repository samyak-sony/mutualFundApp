import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';
import { BasketProvider } from './contexts/BasketContext';
import { MutualFundProvider } from './contexts/MutualFundContext';

const App: React.FC = () => {
  return (
    <BasketProvider>
      <MutualFundProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MutualFundProvider>
    </BasketProvider>
  );
};

export default App;
