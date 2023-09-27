import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import helmet from "helmet"
import { fileURLToPath } from "url";

// configuration

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express()
//middleware here

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors);
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

const storege = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"public/assets");
    },
    filename:(req,file)=>{
        cb(null,file.originalname);
    }
});
const upload = multer({storage});

const PORT = process.env.PORT;
app.listen(process.env.PORT||8880,() => console.log("Sever Start Port"+PORT));
 