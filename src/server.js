
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const app = express();
const port = 3000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Database Setup
require('./config/db-setup.js')

// Routes
const router = require('./routes/index.js')
app.use(router)

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
