const http = require('http');
const { handlerUser, handler } = require('./routes');

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log(`listen on localhost:3000`);
});
