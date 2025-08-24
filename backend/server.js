
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"
import {sql} from "./config/db.js"
import {aj} from "./lib/arcjet.js"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000

//apply arcjet rate-limit to all routes

app.use(async (req,res,next) => {
   try {
       const decision = await aj.protect(req,{
         requested:1
       }) 

       if(decision.isDenied()){
          if(decision.reason.isRateLimit()){
              res.status(429).json({error:"Too Many Requests"});
          }
          else if (decision.reason.isBot()){
                res.status(403).json({error:"Bot access denied"});
          }
          else{
               res.status(403).json({error:"Forbidden"});
          }
          return
       }

       // check for spoofedBots - a bot that acts like not a bot
       if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed() )){
            res.status(403).json({error:"Spoofed bot detected"});
            return;
       }


     next();
   } catch (error) {
        console.log("Arcjet error", error);
        next(error);
        
   }
})

app.use(express.json()); // we can extract the json data 

app.use(cors());   // so that we donot have any cors error 
app.use(helmet()); 

app.use(morgan("dev"));


app.get("/" , (req,res) => {
     res.send("hello from backend");
} )


app.use("/api/products" , productRoutes);



async function initDB(){
       try {
          await sql `CREATE TABLE IF NOT EXISTS products(
               id SERIAL PRIMARY KEY,
               name VARCHAR(255) NOT NULL ,
               image VARCHAR(255) NOT NULL ,
               price DECIMAL(10,2) NOT NULL,
               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`;


      console.log("database initialised");
      
       } catch (error) {
          console.log(sql);
          
          console.log("Error initDB --" );
          
       }
}

initDB().then(() => {
   app.listen( PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

})

