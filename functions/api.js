const dotenv = require('dotenv').config();
const cors = require("cors");
const serverless = require('serverless-http');
const PORT = process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();
const mongoose = require('mongoose');

const allowedOrigins = ['https://expensereactapp.netlify.app', 'https://expensereactapp.netlify.app/'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, // Replace with your React app's URL
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true // Allow sending cookies across domains
}
// Apply the CORS middleware to all routes in your router
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))



try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected")
} catch (error) {
    console.error("UNABLE TO CONNECT", error);
}

// app.use('/api/',(req,res)=>{
//     res.send("app is running")
// })
app.use('/api/', require('../routes/authRoutes'))
app.use('/api/', require('../routes/budgetRoute'))
app.use('/api/', require('../routes/expenseRoutes'))
module.exports.handler = serverless(app)
// app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));


