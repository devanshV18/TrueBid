import cron from "node-cron"
import {Auction} from "../models/auctionSchema.js"
import {User} from "../models/userSchema.js"
import { calculateCommission } from "../controllers/commissionController.js"
import { Bid } from "../models/bidSchema.js"
import {sendEmail} from "../utils/sendEmail.js"

export const endedAuctionCron = () => {
    // min hr days month year -> star 

    cron.schedule("*/1 * * * *", async() => {
        const now = new Date()
        // console.log("Cron for ended auction running")

        //fetching the ended auctions -> auctions that have end time before date.now and its commission is not yeat calculated -> false
        const endedAuctions = await Auction.find({
            endTime: { $lt: now },
            commissionCalculated: false
        })
        for(const auction of endedAuctions){
            try {
                const commissionAmount = calculateCommission(auction._id)
                auction.commissionCalculated = true
                const highestBidder = await Bid.findOne({
                    auctionItem: auction._id,
                    amount: auction.currentBid
                })
                const auctioneer = await User.findById(auction.createdBy)
                auctioneer.unpaidCommision = commissionAmount

                if(highestBidder){
                    auctioneer.highestBidder = highestBidder.bidder.id
                    await auction.save()
                    const bidder = await User.findById(highestBidder.bidder.id)
                    const highestBidAmount = bidder.moneySpent + highestBidder.amount

                    await User.findByIdAndUpdate(
                        bidder._id, 
                        {
                        $inc: {
                            moneySpent: highestBidAmount,
                            auctionsWon: 1
                        },
                        },
                        { new: true }
                    )

                    await User.findByIdAndUpdate(auctioneer._id, {
                        $inc: {
                            unpaidCommision: commissionAmount
                        },
                    },
                    { new: true }
                )

                    const subject = `Congratulations! You won the auction for ${auction.title}`
                    const message = `Dear ${bidder.userName}, \n\nCongratulations! You have won the auction for ${auction.title}. \n\nBefore proceeding for payment contact your auctioneer via your auctioneer email:${auctioneer.email} \n\nPlease complete your payment using one of the following methods:\n\n1. **Bank Transfer**: \n- Account Name: ${auctioneer.paymentMethods.bankTransfer.AccountHandlerName} \n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber} \n- Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **GooglePay**:\n- You can send payment via GooglePay: ${auctioneer.paymentMethods.upi.upiId}\n\n3.  **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n- To pay the 20% upfront, use any of the above methods.\n- The remaining 80% will be paid upon delivery.\n- If you want to see the condition of your auction item then send your email on this: ${auctioneer.email}\n\nPlease ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\nThank you for participating!\n\nBest regards,\nTrueBid auctions, India`;

                    console.log("Sending Email to the highest Bidder")
                    sendEmail( { emailTo: bidder.email, subject: subject, message: message } )
                    console.log("The email was successfully sent!")

                }else{
                    await auction.save()
                }
            } catch (error) {
                return next(console.log(error || "Something went wrong with the ended auction cron"))
            }
        }
    })
}