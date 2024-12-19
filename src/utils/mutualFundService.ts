import axios,{AxiosError} from "axios";
import pool from "../config/db";

const MFAPI_URL = "https://api.mfapi.in/mf";

// fetch all mutual funds from mfapi

async function fetchAllMutualFunds() {
    try{
        const response = await axios.get(MFAPI_URL);
        if(!Array.isArray(response.data)){
            throw new Error("Unexpected API response format.");
        }
        return response.data;
    }catch(error) {
        console.error("Error fetching data",error);
        throw new Error("Failed to fetch data");
    }
};

// fetch nav for a specific mutual fund
async function fetchMutualFundNav(schemeCode: number){
    try{
        const response = await axios.get(`${MFAPI_URL}/${schemeCode}`);
        const nav = response.data?.data?.[0]?.nav;
        return nav?parseFloat(nav):null;
    }catch(error) {
        console.error(`Error fetching details for schemeCode ${schemeCode}`,error);
        throw new Error(`Failed to fetch details for schemeCode ${schemeCode}`);
    }
};

// populate the mutual_fund table
async function populateMutualFundTable(limit:number = 60) {
    const client = await pool.connect();
    try{
        const result = await client.query('SELECT COUNT(*) FROM mutual_fund');
        const existingCount = parseInt(result.rows[0].count, 10);

        if (existingCount > 0) {
            console.log(`Mutual fund table already populated with ${existingCount} records. Skipping population.`);
            return;
        }
        
        const mutualFunds = await fetchAllMutualFunds();
        const limitedFunds = mutualFunds.slice(0,limit);
            
        await client.query('BEGIN');
        
        for(const fund of limitedFunds) {
            const{schemeCode,schemeName} = fund;
            console.log("FUND DATA: ",fund);

            if(!schemeCode||!schemeName){
                console.warn(`Skipping mutual fund with incomplete data: ${JSON.stringify(fund)}`);
                continue;
            }
            let fundPrice = await fetchMutualFundNav(schemeCode);
        
            if(!fundPrice || isNaN(fundPrice)){
                console.warn(`Skipping mutual fund ${schemeName} code:${schemeCode} due to missing price`);
                continue;
            }
            // const price = await fetchMutualFundNav(schemeCode);
            const ticker = `FUND-${schemeCode}`;
            
                await client.query(
                `
                INSERT INTO mutual_fund (id,name,ticker,price)
                VALUES ($1,$2,$3,$4)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    price = EXCLUDED.price
                `,
                [schemeCode,schemeName,ticker,fundPrice]
                );
            
        }
        await client.query("COMMIT");
        console.log(`Successfully populated ${mutualFunds.length} mutual funds.`);

    }catch(error) {
        console.error("Error populating mutual funds table:",error);
        await client.query("ROLLBACK");
        throw new Error("Failed to populate table");
    }finally{
        client.release();
    }
}

export{
    populateMutualFundTable,
    fetchAllMutualFunds,
    fetchMutualFundNav

}