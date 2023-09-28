import express from 'express';
import { login } from '../controllers/auth';
const route = express.Router();

route.post("/login", login)