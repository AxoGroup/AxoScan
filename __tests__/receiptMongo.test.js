// import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { Receipt } from '../server/models/models.js';
import receiptController from '../server/controllers/receiptControllers.js';
const mongoUri = 'mongodb+srv://loganjnelsen:nL2cBABYu9iJjHvT@axoscan.iegl9s6.mongodb.net/?retryWrites=true&w=majority&appName=AxoScan'; //temp?

jest.mock('node-fetch', () => jest.fn());
jest.mock('form-data', () => jest.fn());
describe('Receipt', () => {
  let connection;
  let db;

  beforeEach(async () => {
    await Receipt.deleteMany({});
  });
  // console.log('globalThis.__MONGO_URI__', globalThis.__MONGO_URI__);
  // console.log('globalThis.__MONGO_DB_NAME__', globalThis.__MONGO_DB_NAME__);
  beforeAll(async () => {
    // connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
    connection = await mongoose.connect(mongoUri, {
      dbName: 'axoScan',
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  //-----
  test('should insert a new receipt into collection', async () => {
    // const receipts = db.collection('receipts');
    // const mockReceipt = {
    //   fileName: 'some-Receipt-name',
    //   receipt: [
    //     { type: 'potatoes', value: 5 },
    //     { type: 'tomatoes', value: 6 },
    //   ],
    // };
    const res = {
      locals: {
        fileName: 'some-Receipt-name',
        array: [
          { type: 'potatoes', value: 5 },
          { type: 'tomatoes', value: 6 },
        ],
      },
    };
    const next = jest.fn();
    await receiptController.saveReceipt({}, res, next);
    // await Receipt.create(mockReceipt);

    const insertedReceipt = await Receipt.findOne({ fileName: 'some-Receipt-name' });
    console.log(insertedReceipt);
    expect(insertedReceipt).not.toBeNull();
    expect(insertedReceipt.fileName).toEqual(res.locals.fileName);
    expect(insertedReceipt.receipt).toEqual(expect.arrayContaining([expect.objectContaining({ type: 'potatoes', value: 5 }), expect.objectContaining({ type: 'tomatoes', value: 6 })]));
  });
});
