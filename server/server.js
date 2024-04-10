import express from 'express';
import path from 'path';
import {mongoose} from 'mongoose'
import uploadRouter from './routes/authRoutes.js';
import 'dotenv/config';

const PORT = 3000;
const app = express();
// delcare routers

mongoose.connect(process.env.MONGO_URI, {
  // Tells mongoose to use new URL parser for parsing connection strings to avoid depreciation warngings 
  // useNewUrlParser: true,
  //Enables new unified topology engine in MONGO db's Node.js driver, reccomended for new projects
  // useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'receipts'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log('Mongo Connection error', err));

// handle parsing request body
app.use(express.json());

// favicon error handler
app.get('/favicon.ico', (req, res) => res.status(204));

// static routes

// app.use(express.static(path.resolve('index.html'));
app.get('/', (req, res) => {
    res.status(200).send(express.static(path.resolve('index.html')));
});

// route handlers
app.use('/api', uploadRouter);

  //catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }, 
  }
  let errorObj = Object.assign({}, defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


// route handler to then send to middleware, then we can work ond atabase to connect / send data to databsae

