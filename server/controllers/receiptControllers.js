import fetch from 'node-fetch';
import FormData from 'form-data';
import gptCategorize from '../openai-test.js';
import Receipt from '../models/models.js';
import User from '../models/userModel.js';

const receiptController = {
  async uploadReceipt(req, res, next) {
    try {
      console.log(req.file);
      const form = new FormData();
      form.append('refresh', 'false');
      form.append('incognito', 'false');
      form.append('extractTime', 'false');
      form.append('extractLineItems', 'true');
      form.append('file', req.file.buffer, req.file.originalname);

      const options = {
        method: 'POST',
        headers: { accept: 'application/json', apikey: 'b6abedc0f43c11ee9433edbb2578dfab' },
      };

      options.body = form;

      const response = await fetch('https://api.taggun.io/api/receipt/v1/verbose/file', options);
      const parsedData = await response.json();
      const productArray = parsedData.entities.productLineItems;
      res.locals.fileName = req.file.originalname;
      res.locals.array = productArray;
      return next();
    } catch (err) {
      return next({ log: 'Problem encountered fetching data from API', message: 'Could not retrieve receipt data' });
    }
  },

  async saveReceipt(req, res, next) {
    try {
      console.log(res.locals.array);
      const receiptData = await Receipt.create({ fileName: res.locals.fileName, receipt: res.locals.array });
      
      const userId = req.body.userId //replace with static user_id
      const user = await User.findById(userId);

      const lineItems = res.locals.array;
      const total = lineItems.reduce((sum, currentItem) => sum + currentItem.value, 0);
      user.receipts.push({receiptData, total});

      return next();
    } catch (err) {
      return next({ log: 'Problem encountered sending information to Database', message: 'Problem with receipt response from DB' });
    }
  },

  async categorize(req, res, next) {
    try {
      const userId = req.body.userId //replace with static user_id
      const user = await User.findById(userId);

      const lineItems = res.locals.array;
      for (let i = 0; i < lineItems.length; i++) {
        const currentItem = lineItems[i];
        const type = currentItem.type;
        const value = currentItem.value;

        const category = gptCategorize(type);
        if (!user.categoryTotals[category]) {
          user.categoryTotals[category] = value 
        } else {
          user.categoryTotals[category] = user.categoryTotals[category] + value;
        }
      }

      return next();
    } catch (error) {
      return next({log: 'error in categorize', message: {error: 'error in categorize'}})
    }
  },

  async totalSum(req, res, next) {
    try {
      const userId = req.body.userId //replace with static user_id
      const user = await User.findById(userId);

      const total = user.receipts.reduce((total, currentReceipt) => total + currentReceipt.total, 0)

      res.locals.totalSum = total;
      res.locals.totalByCategory = user.categoryTotals;
      return next();
      
    } catch (err) {
      return next({ log: 'Problem encountered sending information to Database', message: 'Problem with receipt response from DB' });
    }
  },
};

export default receiptController;
