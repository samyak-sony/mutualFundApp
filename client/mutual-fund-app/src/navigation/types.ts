export type RootStackParamList = {
    HomeScreen: undefined;
    BasketScreen: undefined;
    SearchScreen: undefined;
    BasketDetailsScreen: {
        basketId: number;
        basketName: string;
      };
}

export interface MutualFund {
    id: number;
    name: string;
    weight: number;
    price?: number; 
}
export type BasketDetailsScreenProps = {
    basketId: number;
    basketName: string;
  };

  