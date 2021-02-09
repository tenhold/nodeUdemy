const path = require('path');
const express = require('express');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const expressHbs = require('express-handlebars');

const app = express();

app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }));

// setting the template engine
app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
// where to find them
app.set('views', 'views');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'not found' });
});

app.listen(3000, () => {
  console.log('listen on http://localhost:3000');
});