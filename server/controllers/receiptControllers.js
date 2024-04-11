import fetch from 'node-fetch';
import FormData from 'form-data';
import { Receipt } from '../models/models.js';
import axios from 'axios';
// import process from 'process';

const receiptController = {
  // controller object for receipt data handling
  async uploadReceipt(req, res, next) {
    console.log('made it to uploadReceipt');
    try {
      console.log(req.file);
      const data = new FormData();
      data.append('document', req.file.buffer, {
        filename: req.file.originalname, // Specify the filename to be used by the API
        contentType: req.file.mimetype || 'image/jpeg',
      }); // req.file.buffer is the file data

      const config = {
        method: 'POST',
        url: 'https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict',
        headers: {
          Authorization: 'Token 8dd7a8499ab53ab1d5ba74bfcfec49b4',
          ...data.getHeaders(),
        },
        data,
      };

      const response = await axios(config); // fetch request to the API
      console.log(response);
      // console.log('response', JSON.stringify(response.data.document.inference.pages[0].prediction.category.value, null, 2));
      res.locals.category = response.data.document.inference.pages[0].prediction.category.value;

      res.locals.totalAmount = response.data.document.inference.pages[0].prediction.total_amount.value;
      // console.log('res.locals.totalAmount', res.locals.totalAmount);
      res.locals.fileName = req.file.originalname;
      // console.log('res.locals.fileName', res.locals.fileName);

      return next();
    } catch (err) {
      return next({
        log: 'Problem encountered fetching data from API',
        message: 'Could not retrieve receipt data',
      });
    }
  },

  async saveReceipt(req, res, next) {
    console.log('made it to saveReceipt');
    // save the receipt data to the database
    try {
      console.log('res.locals.fileName', res.locals.fileName);
      console.log('res.locals.userId', req.user.id);
      console.log('res.locals.totalAmount', res.locals.totalAmount);
      console.log('res.locals.category', res.locals.category);
      await Receipt.create({
        fileName: res.locals.fileName,
        category: res.locals.category,
        total: res.locals.totalAmount,
        userId: req.user.id,
      }); // create a new document in the database
      console.log('after create check');
      return next();
    } catch (err) {
      return next({
        log: 'Problem encountered sending information to Database',
        message: 'Problem with receipt response from DB',
      });
    }
  },

  async memoize(req, res, next) {
    console.log('made it to memo');
    try {
      const checkForReceipt = await Receipt.findOne({
        fileName: req.file.originalname,
      }); // check if receipt is already in database
      if (checkForReceipt) {
        console.log('req.file.originalname:', req.file.originalname, 'checkForReceipt.filename:', checkForReceipt.fileName);
        console.log('we found a match, check database to see if func was correctly implemented');
        const receipts = await Receipt.find({ userId: req.user.id });
        return res.status(200).send(receipts);
      } else {
        return next();
      }
    } catch (err) {
      return next({
        log: 'Problem encountered with memorize middleware',
        message: { err: `problem in middleware check logs ${err}` },
      });
    }
  },
  async getReceipts(req, res, next) {
    try {
      const receipts = await Receipt.find({ userId: req.user.id });
      res.locals.receipts = receipts;
      return next();
    } catch (e) {
      return next({
        log: 'Problem encountered with getReceipts middleware',
        message: { err: `problem in middleware check logs ${e}` },
      });
    }
  },
};

export default receiptController;
