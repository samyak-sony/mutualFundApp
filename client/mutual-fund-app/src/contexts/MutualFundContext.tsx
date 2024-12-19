import React, { createContext, useState, ReactNode } from 'react';
import { gettAllMutualFinds,searchMutualFunds,addMutualFunds,getMutualFundDetails } from '../api/mutualFund';

interface MutualFund {
    id?: number;        
    name: string;
    ticker?: string;   
    price?: number;    
    weight?: number;   
  }
  

interface MutualFundContextType {
    mutualFunds: MutualFund[];
    loadMutualFunds: () => void;
    searchFunds: (query: string) => void;
    addFunds: (mutualFunds: MutualFund[]) => Promise<MutualFund[]>; 
    getMutualDetails:(mutualFundId:number)=>Promise<MutualFund | undefined>;
}


const MutualFundContext = createContext<MutualFundContextType | undefined>(undefined);

export const MutualFundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);

    const loadMutualFunds = async () => {
        try {
          const funds = await gettAllMutualFinds();
          setMutualFunds(funds.map((fund: any) => ({
            id: fund.id,
            name: fund.name,
            ticker: fund.ticker,
            price: fund.price,
          })));
        } catch (error) {
          console.error(error);
        }
      };
      

    const searchFunds = async (query: string) => {
        try {
            const result = await searchMutualFunds(query);
            setMutualFunds(result);
        } catch (error) {
            console.error(error);
        }
    };

    const addFunds = async (mutualFundsToAdd: MutualFund[]) => {
        try {
            const result = await addMutualFunds(mutualFundsToAdd);
            setMutualFunds((prev) => [...prev, ...result.mutualFunds]);
            return result.mutualFunds;
        } catch (error) {
            console.error(error);
        }
    };

    const getMutualDetails = async(mutualFundId:number)=>{
        try{
            const fundDetails = await getMutualFundDetails(mutualFundId);
            console.log(fundDetails);
            return {...fundDetails,
                price:fundDetails.price ? parseFloat(fundDetails.price) : undefined
            };
        } catch(error){
            console.error(`Error fetching mutual fund details:`,error);
            return undefined;
        }
    }


    return (
        <MutualFundContext.Provider
            value={{ mutualFunds, loadMutualFunds, searchFunds, addFunds,getMutualDetails }}
        >
            {children}
        </MutualFundContext.Provider>
    );
};

export const useMutualFundContext = (): MutualFundContextType => {
    const context = React.useContext(MutualFundContext);
    if (!context) {
        throw new Error('useMutualFundContext must be used within a MutualFundProvider');
    }
    return context;
};
