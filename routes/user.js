import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/auth.js';
import { varifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', varifyToken, getUser);

router.get('/:id/friends', varifyToken, getUserFriends);

router.patch('/:id/:friendId', varifyToken, addRemoveFriend);

export default router;
