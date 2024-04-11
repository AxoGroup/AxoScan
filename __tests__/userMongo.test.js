import { MongoClient } from 'mongodb';
// import { Mongoose } from 'mongoose';
import { User } from '../server/models/models.js';
const mongoUri = 'mongodb+srv://loganjnelsen:nL2cBABYu9iJjHvT@axoscan.iegl9s6.mongodb.net/?retryWrites=true&w=majority&appName=AxoScan'; //temp?

describe('User', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoUri);
    db = await connection.db('axoScan');
  });

  afterAll(async () => {
    await connection.close();
  });

  test('should insert a new user into collection', async () => {
    const users = db.collection('users');

    const mockUser = { username: 'some-username', password: 'some-password' };
    await User.insertOne(mockUser);

    const insertedUser = await users.findOne({ username: 'some-username' });
    expect(insertedUser).not.toBeNull();
    expect(insertedUser.username).toEqual(mockUser.username);
    expect(insertedUser.password).toEqual(mockUser.password);
  });
});
