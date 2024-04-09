import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://loganjnelsen:nL2cBABYu9iJjHvT@axoscan.iegl9s6.mongodb.net/?retryWrites=true&w=majority&appName=AxoScan'

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'axoScan'
})
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  fileName: {type: String, require: true},
  receipt: {type: Array, require: true},
    //date: new Date() 
});

const Receipt = mongoose.model('receipt', receiptSchema);

export default Receipt;

