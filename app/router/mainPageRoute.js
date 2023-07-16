const express = require('express');
const router = express.Router();
const getUserRole = require('../service/getUserRole');
const { paginateData } = require('../service/paginatedData');
const { saveAdt } = require('../controller/createAdt');
const getUserName = require('../service/getUserName');


router.route('/')
  .get(async (req, res, next) => {
    try {
      const paginatedData = await paginateData(req, res, next);
      const user = await getUserRole(req, res);
      const username = await getUserName(req, res);
      if (username) {
        req.session.username = username; // Сохраняем имя пользователя в сессии
      }

      // Handle GET request for Admin role
      if (user === 'Admin') {
        return res.render('mainAdmin.ejs', {
          data: paginatedData.docs,
          message: 'Handling GET requests for Admin role',
          username: req.session.username
        });
      }
      // Handle GET request for User role
      else if (user === 'User') {
        return res.render('main.ejs', {
          data: paginatedData.docs,
          message: 'Handling GET requests for User role',
          username: req.session.username
        });
      }
      // Handle GET request for Unknown role
      else {
        return res.render('main.ejs', {
          data: paginatedData.docs,
          message: 'Handling GET requests for Unknown role',
          username: req.session.username
        });
      }
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  })
  .post(async (req, res) => { 
    const user = await getUserRole(req, res);

    // Handle POST request for Admin role
    if (user === 'Admin') {
      await saveAdt(req, res);
    }
    // Handle POST request for User role
    else if (user === 'User') {
      // Add your code here
    }
    // Handle POST request for Unknown role
    else {
      // Add your code here
    }
  });

module.exports = router;
