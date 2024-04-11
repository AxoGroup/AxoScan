import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://loganjnelsen:nL2cBABYu9iJjHvT@axoscan.iegl9s6.mongodb.net/?retryWrites=true&w=majority&appName=AxoScan';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'axoScan',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const receiptItemSchema = new Schema(
  {
    type: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { _id: false }
);

const receiptSchema = new Schema({
  fileName: { type: String, required: true },
  receipt: { type: [receiptItemSchema], required: true },
});

// [{ type: String, value: Number }]

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Receipt = mongoose.model('receipt', receiptSchema);
const User = mongoose.model('user', userSchema);

export { Receipt, User };
