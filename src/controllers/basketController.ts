import { Request,Response } from "express";
import pool from "../config/db";


// Get all baskets by risk category
async function getBasketByRisk(req:Request,res:Response) {
    const {riskCategory} = req.params;

    try{
        const result = await pool.query(
            "SELECT * FROM baskets WHERE risk_category = $1 ",[riskCategory]
        );
        res.status(200).json(result.rows);
    } catch(err) {
        console.error("error fetching baskets",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

// Create a new Basket

async function createBasket(req:Request,res:Response) {
    const { riskCategory } = req.params; 
    const { name } = req.body;

    const validRiskCategories = ['Low-Risk', 'Medium-Risk', 'High-Risk'];

    if (!validRiskCategories.includes(riskCategory)) {
       res.status(400).json({
        error: `Invalid risk category. Allowed values are: ${validRiskCategories.join(", ")}.`,
      });
      return;
    }

    try{
        const result = await pool.query(
            "INSERT INTO baskets (name,risk_category) VALUES ($1,$2) RETURNING *",[name,riskCategory]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error("Error creating basket:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

// Get details of a basket

async function getBasketDetails(req:Request,res:Response) {
    const {basketId} = req.params;

    try{
        const result = await pool.query(
            `SELECT mf.id, mf.name, bm.weight
            FROM basket_mutual_funds bm
            INNER JOIN mutual_fund mf ON bm.mutual_fund_id = mf.id
            WHERE bm.baskets_id = $1`,[basketId]
        );
        res.status(200).json(result.rows);
    }catch(err){
        console.error("Error fetching basket details:",err);
        res.status(500).json({error: "Internal Server Error"});
    }

}

//Add mutual fund to a basket
async function addMutualFundToBasket(req:Request,res:Response){

    try{
        const {basketId} = req.params;
        const {mutual_fund_id,weight} = req.body;


        const weightResult = await pool.query(
            "SELECT SUM(weight) as total_weight FROM basket_mutual_funds WHERE baskets_id = $1",[basketId]
        );
        const currentWeight= weightResult.rows[0]?.total_weight || 0;
        if(currentWeight + weight > 100) {
             res.status(400).json({
                error: "Total weight of the basket cannot exceed 100",
            });
            return;
        }

        const result = await pool.query(
            `INSERT INTO basket_mutual_funds (baskets_id,mutual_fund_id,weight)
            VALUES ($1,$2,$3) RETURNING *
            `,
            [basketId,mutual_fund_id,weight]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error("Error adding mutual fund to basket:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

//remove a mutual fund from a basket

async function removeMutualFund(req:Request,res:Response){
    const {basketId,mutualFundId} = req.params;

    try{
        const result = await pool.query(
            `
            DELETE FROM basket_mutual_funds
            WHERE baskets_id = $1 AND mutual_fund_id = $2
            RETURNING *
            `,
            [basketId,mutualFundId]
        );
        if(result.rowCount === 0) {
             res.status(404).json({error:"Mutual fund not found"});
             return;
        }
        res.status(200).json({message:"Mutual fund remove from basket"});
    }catch(err){
        console.error("Error removing mutual fund from basket:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export{
getBasketByRisk,
getBasketDetails,
removeMutualFund,
addMutualFundToBasket,
createBasket
}