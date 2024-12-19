import axiosInstance from "./axiosConfig";

export const gettAllMutualFinds = async() =>{
    const response = await axiosInstance.get('/mutualfunds');
    return response.data;
}

export const searchMutualFunds = async(query:string)=>{
    const response = await axiosInstance.get(`/mutualfunds/search?query=${query}`)
    return response.data;
}

export const addMutualFunds = async(mutualFunds:any[])=>{
    const response = await axiosInstance.post('/mutualfunds',{mutualFunds});
    return response.data;
}

export const getMutualFundDetails = async(mutualFundId: number) => {
    try {
      const response = await axiosInstance.get(`/mutualfunds/${mutualFundId}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching mutual fund details:", error);
      throw error; 
    }
  };