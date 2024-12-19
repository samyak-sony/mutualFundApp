import axiosInstance from "./axiosConfig";

export const getBasketsByRiskCategory = async(riskCategory:string)=>{
    const response =  await axiosInstance.get(`/baskets/${riskCategory}`);
    return response.data;
}

export const createBasket = async(riskCategory:string,name:string)=>{
    const response = await axiosInstance.post(`/baskets/${riskCategory}`,{name});
    return response.data;
}

export const getBasketDetails = async(basketId:number)=>{
    const response = await axiosInstance.get(`/baskets/${basketId}/details`);
    return response.data.map((fund: any) => ({
        ...fund,
        weight: parseFloat(fund.weight), 
      }));
}

export const addMutualFundToBasket = async(basketId:number,mutualFundId:number,weight:number)=>{
    const response = await axiosInstance.post(`/baskets/${basketId}/mutualfunds`,{
        mutual_fund_id:mutualFundId,
        weight,
    });
    return response.data;
}

export const removeMutualFundFromBasket = async(basketId:number,mutualFundId:number)=>{
    const response = await axiosInstance.delete(`/baskets/${basketId}/mutualfunds/${mutualFundId}`);
    return response.data;
}