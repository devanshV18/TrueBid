import { addNewAuctionItem } from "../controllers/auctionItemController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import express from "express";

const router = express.Router()

router.post("/create",isAuthenticated, isAuthorized("Auctioneer"), addNewAuctionItem)

export default router