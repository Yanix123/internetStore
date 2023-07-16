const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const loginRoute = require('../app/router/loginRoute');
const mainPageRoute = require('../app/router/mainPageRoute');
const regRoute = require('../app/router/registrationRoute');
const logout = require("../app/router/logoutRoute");

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'session',
  keys: ['secret-key'], // Specify your own secret key(s)
  maxAge: 24 * 60 * 60 * 1000, // Set the session duration (e.g., 24 hours)
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/log', loginRoute);
app.use('/main', mainPageRoute);
app.use('/reg', regRoute);
app.use('/main', logout);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();

module.exports = app;
