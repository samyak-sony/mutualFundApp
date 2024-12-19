import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
    getBasketsByRiskCategory,
    createBasket,
    getBasketDetails,
    addMutualFundToBasket,
    removeMutualFundFromBasket
} from '../api/basket';
import { MutualFund } from '../navigation/types';

interface Basket {
    id: number;
    name: string;
    risk_category: string;
}

interface BasketContextType {
    baskets: Basket[];
    loadBaskets: (riskCategory: string) => void;
    addBasket: (riskCategory: string, name: string) => void;
    getDetails: (basketId: number) => Promise<MutualFund[]>;
    addMutualFundBasket: (basketId: number, mutualFundId: number, weight: number) => void;
    removeMutualFundBasket: (basketId: number, mutualFundId: number) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [baskets, setBaskets] = useState<Basket[]>([]);

    const loadBaskets = async (riskCategory: string) => {
        try {
            const data = await getBasketsByRiskCategory(riskCategory);
            setBaskets(data);
        } catch (error) {
            console.error(error);
        }
    };

    const addBasket = async (riskCategory: string, name: string) => {
        try {
            const basket = await createBasket(riskCategory, name);
            setBaskets((prevBaskets) => [...prevBaskets, basket]);
        } catch (error) {
            console.error(error);
        }
    };

    const getDetails = async (basketId: number): Promise<MutualFund[]> => {
        try {
          const details = await getBasketDetails(basketId); 
          return details; 
        } catch (error) {
          console.error(error);
          return []; 
        }
      };
      

    const addMutualFundBasket = async (basketId: number, mutualFundId: number, weight: number) => {
        try {
            await addMutualFundToBasket(basketId, mutualFundId, weight);
        } catch (error) {
            console.error(error);
        }
    };

    const removeMutualFundBasket = async (basketId: number, mutualFundId: number) => {
        try {
            await removeMutualFundFromBasket(basketId, mutualFundId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <BasketContext.Provider
            value={{
                baskets,
                loadBaskets,
                addBasket,
                getDetails,
                addMutualFundBasket,
                removeMutualFundBasket
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

export const useBasketContext = (): BasketContextType => {
    const context = React.useContext(BasketContext);
    if (!context) {
        throw new Error('useBasketContext must be used within a BasketProvider');
    }
    return context;
};
