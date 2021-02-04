const http = require('http');

const express = require('express');

// const { handler } = require('./routes');

const app = express();

app.use((req, res, next) => {
  console.log('in the middleware');
  next(); // allows the request to continue to the next middleware in the line
});

app.use((req, res, next) => {
  console.log('in another middleware');
  res.send('<h1>Hello from express</h1>');
});

app.listen(3000, () => {
  console.log('app listening on port http://localhost:3000');
});
