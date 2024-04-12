import express from 'express';
import path from 'path';
// import cookieParser from 'cookie-parser'
const app = express();
// eslint-disable-next-line no-unused-vars
const PORT = 3000;

//import controller
import userController from './controllers/userController.js'

// delcare routers
import uploadRouter from './routes/authRoutes.js';

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({exnteded: true})); 

// app.use(cookieParser()); //allows server to add broswer cookies to req.cookies object

// favicon error handler
app.get('/favicon.ico', (req, res) => res.status(204));

// static routes

// app.use(express.static(path.resolve('index.html'));
app.get('/', (req, res) => {
    res.status(200).send(express.static(path.resolve('index.html')));
});

app.post('/api/login', userController.loginUser, (req, res) => {
  res.status(200).send('there')
})

// route handlers
app.use('/api', uploadRouter);

//login

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

