import {app} from "./app";
import "./config/db";

import { populateMutualFundTable } from "./utils/mutualFundService";
import * as dotenv from 'dotenv';
dotenv.config();

const start = async()=>{
    try{
        console.log('populating mutual fund databse');
        await populateMutualFundTable();

        app.listen(3000,()=>{
            console.log('Listening on port 3000');
        });
        
    }catch(err){
        console.error("Error during server startup",err);
        process.exit(1);
    }

   
}
start();

