import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import { vendorRouter } from './src/api/vendors/vendor.routes'
import { customerRouter } from "./src/api/customers/customer.routes"
import { apparelRouter } from "./src/api/apparels/apparel.routes"
import { orderRouter } from "./src/api/orders/order.routes"

dotenv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.use("/api/vendor", vendorRouter);
app.use("/api/customer", customerRouter);
app.use("/api/apparel", apparelRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})