import mongoose from 'mongoose';
import "dotenv/config"

mongoose.connect(process.env.MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName2: 'user'
})
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, require: true},
  password: {type: String, require: true},
  
});

const User = mongoose.model('user', userSchema);

export default User;
