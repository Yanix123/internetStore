const express = require('express')
const router = express.Router();
const {loginUser} = require('../controller/login')


router.route('/login').get((req,res)=>{
    res.render('login.ejs')
}).post(loginUser)

module.exports = router;