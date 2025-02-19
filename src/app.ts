import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import {json} from "body-parser";
import { basketRouter } from "./routes/basketRoutes";
import { mutualFundRouter } from "./routes/mutualFundRoutes";
dotenv.config();

const app = express();
app.use(cors());
app.use(json())
app.use('/api/baskets',basketRouter);
app.use('/api/mutualfunds',mutualFundRouter);
export {app};
