import express from 'express';
const router = express.Router();
import cors from 'cors';

// eslint-disable-next-line no-unused-vars
import receiptController from '../controllers/receiptControllers';
import searchArray from '../controllers/searchArray';

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

// post request
router.post('/upload', 
receiptController.uploadReceipt, searchArray.searched, 
(req, res) =>  res.status(200).json(res.locals.object));

// eslint-disable-next-line no-undef
export default router;