import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config({path: './.env'});
import connectDB from './src/db/index.js';
import {app} from './app.js'

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`server is running at port : ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})