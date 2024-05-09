import 'dotenv/config';
import express from 'express'
import router from './routes/router.mjs'
import cors from 'cors';

const app = express()
import { connectToDatabase } from './model/connect.mjs';

connectToDatabase();
app.use(cors());

app.use('/',router)

app.listen(3000,()=>{
    console.log("Server Started on 3000")
})