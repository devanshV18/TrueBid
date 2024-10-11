import express from "express"
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js"
import { deletePaymentProof, getPaymentProofs, updateProofStatus, deleteAuctionItem, paymentProofDetails, fetchAllUsers } from "../controllers/adminController.js"

const router = express.Router()

router.delete("/auctionitem/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteAuctionItem)
router.get("/paymentproofs/getall", isAuthenticated, isAuthorized("Admin"), getPaymentProofs)
router.get("/paymentproof/:id", isAuthenticated, isAuthorized("Admin"), paymentProofDetails)
router.put("/paymentproof/status/update/:id", isAuthenticated, isAuthorized("Admin"), updateProofStatus)
router.delete("/paymentproof/delete/:id", isAuthenticated, isAuthorized("Admin"), deletePaymentProof)
router.get("/users/getall", isAuthenticated, isAuthorized("Admin"), fetchAllUsers)


export default router