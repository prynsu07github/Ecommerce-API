/* eslint-disable no-undef */
import express from 'express'
import dotenv from 'dotenv'
import Productrouter from '../api/routes/product.route.js'
import connectDatabase from './db.js'
import error from './middleware/error.js'
import Userrouter from '../api/routes/user.route.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
//to get the data in json format by post request
app.use(express.json())

//connecting database
connectDatabase()

app.use('/api/v1' , Productrouter) //product routes
app.use('/api/v1' , Userrouter) // user routes

app.use(error)

app.listen( PORT , ()=>{
    console.log("server started at " ,PORT)
})

//https://fakestoreapi.com/products