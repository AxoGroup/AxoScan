import fetch from 'node-fetch';
import FormData from 'form-data';
import Receipt from '../models/models.js';

const receiptController = { // controller object for receipt data handling
  async uploadReceipt(req, res, next) {
    try {
      console.log(req.file);
      const form = new FormData();  
      form.append('refresh', 'false'); 
      form.append('incognito', 'false');
      form.append('extractTime', 'false');
      form.append('extractLineItems', 'true'); 
      form.append('file', req.file.buffer, req.file.originalname); // req.file.buffer is the file data

      const options = { // options for the fetch request
        method: 'POST',
        headers: { accept: 'application/json', apikey: '65d90c50f6b911ee9433edbb2578dfab' },  
      };

      options.body = form;  // attach the form data to the options object

      const response = await fetch('https://api.taggun.io/api/receipt/v1/verbose/file', options); // fetch request to the API
      const parsedData = await response.json(); // parse the response data
      const productArray = parsedData.entities.productLineItems;  // extract the product line items from the parsed data
      res.locals.fileName = req.file.originalname;  // save the file name to res.locals
      res.locals.array = productArray;  // save the product array to res.locals
      return next();
    } catch (err) {
      return next({ log: 'Problem encountered fetching data from API', message: 'Could not retrieve receipt data' });
    }
  },

  async saveReceipt(req, res, next) { // save the receipt data to the database
    try {
      console.log(res.locals.array);
      await Receipt.create({ fileName: res.locals.fileName, receipt: res.locals.array });   // create a new document in the database
      return next();
    } catch (err) {
      return next({ log: 'Problem encountered sending information to Database', message: 'Problem with receipt response from DB' });
    }
  },
};

export default receiptController;
