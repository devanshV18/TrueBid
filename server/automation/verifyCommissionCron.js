import {User} from "../models/userSchema.js"
import { PaymentProof } from "../models/commissionProofSchema.js"
import { commission } from "../models/commissionSchema.js"
import cron from "node-cron"
import { sendEmail } from "../utils/sendEmail.js"

export const verifyCommissioCron = () => {
    cron.schedule("*/1 * * * *", async() => {
        console.log("Running Verify Commission Cron ... ")
        
        const approvedProofs = await PaymentProof.find({status: "Approved"})

        for(const proof of approvedProofs){
            try {
                const user = awaitUser.findById(proof.userId)
                let updatedUserData = {}
                if(user){
                    if(user.unpaidCommision >= proof.amount){
                            updatedUserData = await User.findByIdAndUpdate(user._id, {
                                $inc : {
                                    unpaidCommision: -proof.amount
                                },
                            },
                            { new: true }
                        )

                        await PaymentProof.findByIdAndUpdate(proof._id, {
                            status: "Settled"
                        })
                    }
                    else{
                        updatedUserData = await User.findByIdAndUpdate(
                                user._id, 
                                {
                                    unpaidCommision: 0, 
                                },
                            { new: true }
                        )

                        await PaymentProof.findByIdAndUpdate(proof._id, {
                            status: "Settled"
                        })
                    }
                    await commission.create({
                        amount: proof.amount,
                        user: user._id,
                    })

                    const settlementDate = new Date(Date.now())
                    .toString()
                    .substring(0,15)

                    const subject = `Your Payment has been successfully verified and settled`
                    const message = `Dear ${user.userName},\n\nWe are pleased to inform you that your recent payment has been successfully verified and settled. Thank you for promptly providing the necessary proof of payment. Your account has been updated, and you can now proceed with your activities on our platform without any restrictions.\n\nPayment Details:\nAmount Settled: ${proof.amount}\nUnpaid Amount: ${updatedUserData.unpaidCommision}\nDate of Settlement: ${settlementDate}\n\nBest regards,\TrueBid Auctions, India`;
                    sendEmail( { emailTo: user.email, subject: subject, message: message } )
                }
                console.log(`User ${proof.userId} paid a commission of ${proof.amount}`)
            } catch (error) {
                console.log(
                    `Error Processing your request pertaining to commission proof for the user ${proof.userId}: ${error.message}`
                )
            }
        }
    })
}