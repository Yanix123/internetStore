const express = require('express');
const router = express.Router();
const { registrateUser, confirmUserEmail } = require('../controller/registration');

router.get('/registr', (req, res) => {
  res.render('reg.ejs');
});

router.post('/registr', registrateUser);
router.get('/verify-email', confirmUserEmail);

module.exports = router;
