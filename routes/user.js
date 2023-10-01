import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/auth.js';
import { varifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', varifyToken, getUser);

router.get('/:id/freinds', varifyToken, getUserFriends);

router.patch('/:id/:freinds', varifyToken, addRemoveFriend);

export default router;
