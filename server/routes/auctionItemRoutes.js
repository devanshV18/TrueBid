import { addNewAuctionItem, getAllItems, getMyaAuctionDetails, removeFromAuctions, republishItem } from "../controllers/auctionItemController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import express from "express";

const router = express.Router()

router.post("/create",isAuthenticated, isAuthorized("Auctioneer"), addNewAuctionItem)

router.get("/allItems", getAllItems)

router.get("/auction/:id", isAuthenticated, getMyaAuctionDetails)

router.delete("/delete/:id", isAuthenticated, isAuthorized, removeFromAuctions)

router.put("/item/republish/:id", isAuthenticated, isAuthorized, republishItem)


export default router