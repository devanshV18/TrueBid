import { config } from "dotenv";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
import { connectDB } from "./database/connectDB.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRoutes.js";
import auctionItemRouter from "./routes/auctionItemRoutes.js"
import bidRouter from "./routes/bidRoutes.js"
import commissionRouter from "./routes/commissionRouter.js"
import adminRouter from "./routes/adminRoutes.js"
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissioCron } from "./automation/verifyCommissionCron.js"

const app = express();
config({
    path : "./config/config.env"
})

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
    })
)

app.use("/api/users", userRouter)
app.use("/api/auctionitem", auctionItemRouter)
app.use("/api/bids", bidRouter )
app.use("/api/commission", commissionRouter)
app.use("/api/admin", adminRouter)
endedAuctionCron()
verifyCommissioCron()
connectDB();

app.use(errorMiddleware)


export default app;
