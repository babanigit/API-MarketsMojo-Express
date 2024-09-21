import express from "express";
import * as ppControllers from "../controllers/personalPorfolio_Controller";
const router = express.Router();

router.route("/holding").get(ppControllers.getHoldings);
router.route("/totalreturns").get(ppControllers.getTotalReturns);

export default router;