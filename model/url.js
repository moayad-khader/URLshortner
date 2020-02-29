const mongoose=require('mongoose');

const URL_Schema= new mongoose.Schema({
    longURL:String,
    shortURL:String,
    urlCode:String
});


const URL=mongoose.model('URL',URL_Schema);


module.exports=URL;