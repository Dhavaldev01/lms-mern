require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");

const authRoutes = require('./routes/auth-routes/index');


app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json());

// Database Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongodb is connected"))
  .catch((e) => console.log("error", e));

// routes Configuration
app.use('/auth', authRoutes);


  app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({
        success: false,
        message : "Somthing went worng"
    })
  })

app.listen(PORT, ()=>{
    console.log(`Srever is Running On Port ${PORT}`);
});