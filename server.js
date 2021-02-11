
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', 'src/views')

// Cookie parser
app.use(cookieParser());

// Database Setup
require('./src/config/db-setup.js')

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Routes
const router = require('./src/routes/index.js')
app.use(router)

const Post = require('./src/models/post.js')


app.get('/', (req, res) => {
  var currentUser = req.user;
  Post.find({}).lean()
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

module.exports = app;