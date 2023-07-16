const {Schema, model} = require('mongoose');

const userModel = new Schema({
firstName:{
    type:String,
    required:true,
},
secondName:{
    type:String,
    required:true,
},
email:
{
    type:String,
    required:true
},
password:{
    required:true,
    type:String,
},
isactivated:{
    type:Boolean,
    default:false,
},
refreshToke:{
    type:String,
    default:undefined, 
},
role:{
    type:String,
    default:"User"
},
})


module.exports = model('user',userModel);