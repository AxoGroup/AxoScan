import express from 'express';
const router = express.Router();
import cors from 'cors';
// eslint-disable-next-line no-unused-vars
import {test, registerUser, loginUser, getProfile, updateProfile, deleteAccount, isAuthenticated} from '../controllers/controllers'

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)