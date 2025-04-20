import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";

import schedule from "node-schedule"
import {fetchOrderById, fetchOrders} from "./fetchApi/api.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

// const job = schedule.scheduleJob('5 * * * * *', function(){
//   fetchData()
//   console.log('The answer to life, the universe, and everything!');
// });

//setInterval(()=>{fetchOrderById('it@zooart.com.pl-400')}, 5000)
setInterval(()=>{fetchOrders('2024-12-24 23:59:59', '2025-01-01 23:59:59')}, 5000)
 
  
 
     
  
 

app.use((req, res) => {
  res.status(404).json({
    message: `Not found - ${req.path}`,
  });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: err.message || `Internal Server Error. Something broke!`,
  });
});

export default app;
