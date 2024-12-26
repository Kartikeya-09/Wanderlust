const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync= require("../utills/wrapAsync.js");
const ExpressError=require("../utills/ExpressError.js");
const {reviewSchema}= require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isReviewAuthor} = require("../middleware.js");


const reviewController=require("../controllers/reviews.js");

//Validate Review find error

const validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }else{
        next();
    }
};
 

// Reviews  POST Route

router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview)
);
 
 // Delete Review Route
 
 router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);
 
 
module.exports=router;