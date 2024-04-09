import fetch from 'node-fetch';
import FormData from 'form-data';
import Receipt from '../models/models.js'

const receiptController = {
  async uploadReceipt(req, res, next) {
    
    // console.log('req.file.originalname:', req.file.originalname)
    
    // const checkForReceipt = await Receipt.findOne({ fileName: req.file.originalname });
    // console.log('req.file.originalname:', req.file.originalname, 'checkForReceipt.filename:', checkForReceipt.fileName)
    // if (checkForReceipt) {
    //   console.log('we found a match, check database to see if func was correctly implemented')
    //   return res.status(200).send(checkForReceipt.receipt);
    // }
    
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
      res.locals.fileName = req.file.originalname
      res.locals.array = productArray;
      return next();
    } catch (err) {
      return next({ log: 'Problem encountered fetching data from API', message: 'Could not retrieve receipt data' });
    }
  },

  async saveReceipt(req, res, next) {
    try {
      console.log(res.locals.array);
      await Receipt.create({fileName: res.locals.fileName, receipt: res.locals.array});
      return next();
    } catch(err){
      return next({log: 'Problem encountered sending information to Database', message: 'Problem with receipt response from DB'})
    }
  } 
};

export default receiptController;
