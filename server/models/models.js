import mongoose, { Schema } from 'mongoose';

//const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  fileName: {type: String, require: true},
  receipt: {type: Array, require: true},
    //date: new Date() 
});

const Receipt = mongoose.model('receipt', receiptSchema);

export default Receipt;

