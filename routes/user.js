import express from 'express';
import {
    getUser,
    getUserFreinds,
    addRemoveFreind,
} from '../controllers/auth.js';
import { varifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', varifyToken, getUser);

router.get('/:id/freinds', varifyToken, getUserFreinds);

router.patch('/:id/:freinds', varifyToken, addRemoveFreind);

export default router;
