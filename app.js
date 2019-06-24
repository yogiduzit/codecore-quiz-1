const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');

const welcomeRouter = require('./routes/welcome.js')
const cluckRouter = require('./routes/clucks.js');
const app = express();

app.use('/', welcomeRouter);

// Main application


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

