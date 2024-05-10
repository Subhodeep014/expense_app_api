const dotenv = require('dotenv').config();
const serverless = require('serverless-http');
const PORT = process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();
const mongoose = require('mongoose');


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))



try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected")
} catch (error) {
    console.error("UNABLE TO CONNECT", error);
}

// app.use('/',(req,res)=>{
//     res.send("app is running")
// })
app.use('/.netlify/functions/api', require('./routes/authRoutes'))
app.use('/.netlify/functions/api', require('./routes/budgetRoute'))
app.use('/.netlify/functions/api', require('./routes/expenseRoutes'))
module.exports
// app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));


