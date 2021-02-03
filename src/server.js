
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Database Setup
require('./config/db-setup.js')

// Routes
const router = require('./routes/index.js')
app.use(router)

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
