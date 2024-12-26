const express = require("express");
const wrapAsync= require("../utills/wrapAsync.js");
const Listing = require("../models/listing.js");
const router = express.Router();

router.get("/trending",wrapAsync(async(req,res)=>{
    let listings= await Listing.find({});
    let allListings= listings.filter((el)=>el.category=="trending");
    return  res.render("listings/index.ejs",{allListings});

}));


router.get("/rooms",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "rooms");
    return res.render("listings/index.ejs",{allListings});
}))

router.get("/iconic",wrapAsync(async(req,res)=>{
    let listings= await Listing.find();
    let allListings= listings.filter((el)=>el.category=="iconic");
    return res.render("listings/index.ejs",{allListings});
}));

router.get("/mountain",wrapAsync(async(req,res)=>{
    let listings= await Listing.find();
    let allListings= listings.filter((el)=>el.category=="mountain");
    return res.render("listings/index.ejs",{allListings});
}));

router.get("/castle",wrapAsync(async(req,res)=>{
    let listings= await Listing.find();
    let allListings= listings.filter((el)=>el.category=="castle");
    return res.render("listings/index.ejs",{allListings});
}));

router.get("/amazing",wrapAsync(async(req,res)=>{
    let listings= await Listing.find();
    let allListings= listings.filter((el)=>el.category=="amazing");
    return res.render("listings/index.ejs",{allListings});
}));

router.get("/camping",wrapAsync(async(req,res)=>{
    let listings= await Listing.find();
    let allListings= listings.filter((el)=>el.category=="camping");
    return res.render("listings/index.ejs",{allListings});
}));

router.get("/farms",wrapAsync(async(req,res)=>{
    let listings= await Listing.find();
    let allListings= listings.filter((el)=>el.category=="farms");
    return res.render("listings/index.ejs",{allListings});
}));

router.get("/arctic",wrapAsync(async(req,res)=>{
    let allListings= await Listing.find({category:"arctic"}); //improved
    return res.render("listings/index.ejs",{allListings});
}));

module.exports=router;