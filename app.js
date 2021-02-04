const http = require('http');

const app = require('express')();

app.use('/user', (req, res, next) => {
  console.log('hello from /user');
  res.send('<h1>hello from "/user"</h1>');
});

app.use('/', (req, res, next) => {
  console.log('hello from /');
  res.send('<h1>hello from "/"</h1>');
});


app.listen(3000, () => {
  console.log('listen on http://localhost:3000');
});
