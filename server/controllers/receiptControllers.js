import fetch from "node-fetch";
import FormData from "form-data";
import { Receipt } from "../models/models.js";
// import process from 'process';

const receiptController = {
  // controller object for receipt data handling
  async uploadReceipt(req, res, next) {
    console.log("made it to uploadReceipt");
    try {
      console.log(req.file);
      const form = new FormData();
      form.append("refresh", "false");
      form.append("incognito", "false");
      form.append("extractTime", "false");
      form.append("extractLineItems", "true");
      form.append("file", req.file.buffer, req.file.originalname); // req.file.buffer is the file data

      const options = {
        // options for the fetch request
        method: "POST",
        headers: {
          accept: "application/json",
          apikey: "65d90c50f6b911ee9433edbb2578dfab",
        },
      };

      options.body = form; // attach the form data to the options object

      const response = await fetch(
        "https://api.taggun.io/api/receipt/v1/verbose/file",
        options
      ); // fetch request to the API
      const parsedData = await response.json(); // parse the response data
      const productArray = parsedData.entities.productLineItems; // extract the product line items from the parsed data
      res.locals.fileName = req.file.originalname; // save the file name to res.locals
      res.locals.array = productArray; // save the product array to res.locals
      return next();
    } catch (err) {
      return next({
        log: "Problem encountered fetching data from API",
        message: "Could not retrieve receipt data",
      });
    }
  },

  async saveReceipt(req, res, next) {
    console.log("made it to saveReceipt");
    // save the receipt data to the database
    try {
      console.log("res.locals.fileName", res.locals.fileName);
      console.log("res.locals.array", res.locals.array);
      await Receipt.create({
        fileName: res.locals.fileName,
        receipt: res.locals.array,
      }); // create a new document in the database
      console.log("after create check");
      return next();
    } catch (err) {
      return next({
        log: "Problem encountered sending information to Database",
        message: "Problem with receipt response from DB",
      });
    }
  },

  async memoize(req, res, next) {
    console.log("made it to memo");
    try {
      const checkForReceipt = await Receipt.findOne({
        fileName: req.file.originalname,
      }); // check if receipt is already in database
      if (checkForReceipt) {
        console.log(
          "req.file.originalname:",
          req.file.originalname,
          "checkForReceipt.filename:",
          checkForReceipt.fileName
        );
        console.log(
          "we found a match, check database to see if func was correctly implemented"
        );
        return res.status(200).send(checkForReceipt.receipt);
      } else {
        return next();
      }
    } catch (err) {
      return next({
        log: "Problem encountered with memorize middleware",
        message: { err: `problem in middleware check logs ${err}` },
      });
    }
  },
};

export default receiptController;
