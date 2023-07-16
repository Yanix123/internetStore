const adtModel = require('../models/adtModel');

async function saveAdt(req,res,next){
    try{
    const {adtHeader, adtPhoto, adtDes} = req.body;
    if(!adtHeader || !adtDes){
        return res.status(404).send()
    }
   const newAdt =  await adtModel.create({
    adtHeader:adtHeader,

    adtDes:adtDes

    })
    await newAdt.save();
    return res.status(200).send();
    }catch(error){
        console.log(error);
        return res.status(404).send({message:error})
    }
}
module.exports = {saveAdt}