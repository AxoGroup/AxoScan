import Receipt from '../models/models.js';

const memorizeDatabase = async (req, res, next) => {
  try {
    const checkForReceipt = await Receipt.findOne({ fileName: req.file.originalname });
    if (checkForReceipt) {
      console.log('req.file.originalname:', req.file.originalname, 'checkForReceipt.filename:', checkForReceipt.fileName);
      console.log('we found a match, check database to see if func was correctly implemented');
      return res.status(200).send(checkForReceipt.receipt);
    } else {
      return next();
    }
  } catch (err) {
    return next({
      log: 'Problem encountered with memorize middleware',
      message: { err: `problem in middleware check logs ${err}` },
    });
  }
};

export default memorizeDatabase;
