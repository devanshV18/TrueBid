import express from "express"
import { isAuthenticated, isAuthorized } from "../middlewares/auth"
import { deletePaymentProof, getPaymentProofs, updateProofStatus, deleteAuctionItem, paymentProofDetails } from "../controllers/adminController"

const router = express.Router()

router.delete("/auctionitem/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteAuctionItem)
router.get("/paymentproofs/getall", isAuthenticated, isAuthorized("Admin"), getPaymentProofs)
router.get("/paymentproof/:id", isAuthenticated, isAuthorized("Admin"), paymentProofDetails)
router.put("/paymentproof/status/update/:id", isAuthenticated, isAuthorized("Admin"), updateProofStatus)
router.delete("/paymentproof/delete/:id", isAuthenticated, isAuthorized("Admin"), deletePaymentProof)


export default router