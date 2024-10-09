import { addNewAuctionItem } from "../controllers/auctionItemController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import express from "express";

const router = express.Router()

router.post("/create",isAuthenticated, addNewAuctionItem)

export default router