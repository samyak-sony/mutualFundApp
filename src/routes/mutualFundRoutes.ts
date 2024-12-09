import express from 'express';
import {     
    getAllMutualFunds,
    getMutualFundDetails,
    addMutualFunds,
    searchMutualFund } from '../controllers/mutualFundController';

const router = express.Router();

router.get('/',getAllMutualFunds);
router.get('/search',searchMutualFund);
router.post('/',addMutualFunds);
router.get('/:mutualFundId',getMutualFundDetails);

export {router as mutualFundRouter};