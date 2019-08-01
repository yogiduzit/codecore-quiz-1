const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const cookieParser = require('cookie-parser');

// Main application
const app = express();

// Routers
const welcomeRouter = require('./routes/welcome.js')
const cluckRouter = require('./routes/clucks.js');

app.use('/', welcomeRouter);
app.use('/clucks', cluckRouter);

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));



// Load all the static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(logger("dev"));

// Setting the views and view engine
app.set('view engine', 'ejs');
app.set('views', 'views');


const PORT = 3000;
const ADDRESS = 'localhost';

app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening at ${ADDRESS}:${PORT}`);
});

