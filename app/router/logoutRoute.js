const express = require('express')
const router = express.Router();
const getUserRole = require('../service/getUserRole');

router.route('/logout').get( async(req,res)=>{
    try{
    const user = await getUserRole(req, res);
    if(!user){
        return res.status(404).send({message:"user not found"});
    }
    req.session = null;
      
        return res.redirect('/log/login');
}catch(error){
    console.log(error)
return res.status(500).send();
}
    });

module.exports = router;