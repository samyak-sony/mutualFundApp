import express from 'express';
import {getBasketByRisk,
        getBasketDetails,
        addMutualFundToBasket,
        removeMutualFund,
        createBasket } from '../controllers/basketController';


const router = express.Router();

router.get("/:riskCategory",getBasketByRisk);
router.get("/:basketId/details",getBasketDetails);
router.post("/:riskCategory",createBasket);
router.post("/:basketId/mutualfunds",addMutualFundToBasket);
router.delete("/:basketId/mutualfunds/:mutualFundId",removeMutualFund);

export {router as basketRouter};
