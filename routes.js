const fs = require('fs');
const { brotliDecompressSync } = require('zlib');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
  <html>
    <head><title>Enter Message</title><head>
    <body><form action="/message" method="POST"><input type="text" name="message">
      <button type="submit">Send</button></form>
    </body>
  </html>
  `);
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write(`
<html>
  <body><h1>Hello!</body>
</html>
`);
  res.end();
};

const requestUser = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <head><title>welcome</title></head>
        <body>
        <h1>Hello users</h1>
        <form action="/users" method="POST"><input type="text" name="user">
        <button type="submit">Send</button></form>
        </body>
      </html>
    `);
    return res.end();
  }

  if (url === '/users' && method === 'POST') {
    res.setHeader('Content-Type', 'text/html');
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString().split('=')[1].replace('+', ' ');

      res.write(`
      <html>
        <head><title>users</title></head>
        <body>
          <ul>
            <li>
              Jon
            </li>
            <li>
              Paige
            </li>
            <li>
            ${parsedBody}
            </li>
          </ul>
        </body>
      </html>
    `);
      return res.end();
    });
  }

};
module.exports = {
  handler: requestHandler,
  handlerUser: requestUser
};