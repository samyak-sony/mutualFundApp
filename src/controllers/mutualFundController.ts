import { Request,Response } from "express";
import pool from "../config/db";

//get all mutual funds

async function getAllMutualFunds(req:Request,res:Response) {
    try{
        const result = await pool.query("SELECT * FROM mutual_fund");
        res.status(200).json(result.rows);
    }catch(err){
        console.error("Error fetching mutual funds:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
};

// Search mutual fund by name

async function searchMutualFund(req:Request,res:Response){
    const { query } = req.query;

    try{
        const result = await pool.query(
            "SELECT * FROM mutual_fund WHERE name ILIKE $1 OR ticker ILIKE $1",
            [`%${query}%`]
        );
        res.status(200).json(result.rows);
    }catch(err){
        console.error("Error searching mutual funds:",err);
        res.status(500).json({error: "Internal Server Error"});
    }
};

async function addMutualFunds(req:Request,res:Response){
    const { mutualFunds } = req.body; 

    try { 
      const values = mutualFunds.map((mf: any) => `('${mf.name}', '${mf.ticker}', ${mf.price})`).join(",");
      const query = `
        INSERT INTO mutual_fund (name, ticker, price)
        VALUES ${values}
        ON CONFLICT (ticker) DO NOTHING
      `;
  
      await pool.query(query);
      res.status(201).json({ message: "Mutual funds added successfully" });
    } catch (err) {
      console.error("Error adding mutual funds:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

async function getMutualFundDetails(req:Request,res:Response){
    const { mutualFundId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM mutual_fund WHERE id = $1",
      [mutualFundId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Mutual fund not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching mutual fund details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
    getAllMutualFunds,
    getMutualFundDetails,
    addMutualFunds,
    searchMutualFund
}