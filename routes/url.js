const express=require('express');
const validator=require('validator');
const shortid=require('shortid');
const URL=require('../model/url')
const {baseURL}=require('../config/constants')



const router=new express.Router();




router.post('/shortner',async(req,res)=>{

    const {longUrl}=req.body;

    //CHECK LONG URL
    if(!validator.isURL(longUrl)){
        return res.status(401).send({error:'It is not an URL'});
    }

    //GENERATE RANDOM CODE
    const urlCode=shortid.generate();
    console.log(baseURL);
    const shortURL=baseURL+urlCode;

    const url=new URL();

    try{
        url.longURL=longUrl;
        url.urlCode=urlCode;
        url.shortURL=shortURL;
        await url.save();
    }
    catch(e){

        return res.status(401).send({error:'something wrong'})

    }

    res.status(200).send({shortURL})


})

router.get('/:code',async(req,res)=>{
    const urlCode=req.params.code;
    try{
        const url=await URL.findOne({urlCode:urlCode});
        if(!url){
           return res.status(401).send({error:'can not find the url'});
        }
        
        res.redirect(url.longURL)
    }catch(e){
        res.status(401).send({e})
    }
})



module.exports=router;