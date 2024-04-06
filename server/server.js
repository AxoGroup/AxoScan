import express from 'express';
import path from 'path';
const app = express();
// eslint-disable-next-line no-unused-vars

const PORT = 3000;

app.use(express.static(path.resolve('index.html')));
app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', (req, res) => {
    res.send('Hello World');
  });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});


// route handler to then send to middleware, then we can work ond atabase to connect / send data to databsae

