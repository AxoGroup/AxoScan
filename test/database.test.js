import assert from 'assert'
import mongoose from 'mongoose';
import Receipt from '../server/models/models.js';
const MONGO_URI = 'mongodb+srv://InvectivusTaco:SomethingNewDontStealMyAccounts@cluster0.upscirl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


describe('names are hard', function () {
    describe('test', function() {
    it('test to check if mocha works', function(){
        assert.equal(1 === 1, true);
    });
  });
});

describe('Database', function() {
    const controlVar = "Target-pic-2-1024x999.jpg"

    before('Database Test', async function() {
       try{ mongoose.connect(MONGO_URI, {
            // options for the connect method to parse the URI
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // sets the name of the DB that our collections are part of
            dbName: 'receipts'
          })
        } catch(err) {
            throw new Error('databadse failed to connect')
        }
    });
    after(async function(){
      try{ 
         mongoose.disconnect();
      } catch(err) {
        throw new Error('Database failed to disconnect')
      } 
    });

    describe('testing memorize', function() {
        it('test\'s to see if we can find img filename in database', async function () {
            try {
            const test = await Receipt.findOne({fileName: controlVar})
            assert.ok(test, 'something')
            } catch(err) {
                throw new Error('Database failed to retrieve data / does not exist in database')
            }
        });
    });
});