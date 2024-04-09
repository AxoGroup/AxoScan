import express from 'express';
const router = express.Router();
import cors from 'cors';
import multer from 'multer';
//multer variables
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// eslint-disable-next-line no-unused-vars
import receiptController from '../controllers/receiptControllers.js';
import searchArray from '../controllers/searchArray.js';
import memorize from '../controllers/memorize.js';

// IMPORT MODEL INTO THE HERE OR CONTROLLER
// THATMODEL.CREATE
// THATMODEL.FIND

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

// post request
//TODO: REVIEW THIS, WE MAY BE ABLE TO JUST REPLACE WITH MONGO DB
//MODEL.CREATE(FILE)
router.post('/upload', upload.single('file'), memorize, receiptController.uploadReceipt, searchArray.searched, receiptController.saveReceipt, (req, res) => res.status(200).json(res.locals.array));

// eslint-disable-next-line no-undef
export default router;
