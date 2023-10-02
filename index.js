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
import { register } from "./controllers/auth.js";
import { createPost } from './controllers/posts.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import postsRouter from './routes/posts.js'
import { verifyToken } from './middleware/auth.js';

// configuration

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express()
//middleware here

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({ storage: storage })


/* Routes with file */
app.post('/auth/register', upload.single("picture"), register);
app.post('/posts', verifyToken, upload.single("picture"), createPost);

/* Routes */
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/posts', postsRouter)



// Connecting Database 
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(process.env.PORT || 8880, () => console.log("Sever Start Port :" + PORT));
        console.log("Connected Database")
    })
    .catch((err) => console.log(err))


