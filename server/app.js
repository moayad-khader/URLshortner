const express=require('express');
const bodyParser=require('body-parser');
require('../db/mongoose');
const Router=require('../routes/url')


const app=express();


app.use(bodyParser.json());
app.use(Router);





module.exports=app;



