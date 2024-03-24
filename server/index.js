import express from "express";
import morgan from "morgan";
import path from 'path'

import { PORT } from "./config.js";
import managerRouter from "./routes/manager.route.js";

const app = express()

app.use(morgan("dev"))
app.use(express.static(path.resolve('public')))

app.use('/stream-manager',managerRouter)

app.listen(PORT, ()=>{
    console.log(`Server is listening on post ${PORT}`)
})
