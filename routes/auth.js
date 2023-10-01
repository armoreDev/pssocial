import express from 'express';
import { login } from '../controllers/auth.js';
import { varifyToken } from '../middleware/auth.js';
const router = express.Router();

router.post("/login", varifyToken , login)

export default router;