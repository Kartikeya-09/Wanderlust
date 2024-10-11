const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {listingSchema,reviewSchema}= require("./schema.js");
const ExpressError=require("./utills/ExpressError.js");


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirect URL save
        req.session.redirecturl=req.originalUrl;
        req.flash("error","you must be logged in to create listing!");
        res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirectUrl= req.session.redirecturl;
    }
    next();
};


module.exports.isOwner=async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.Owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of the listings");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


//Validate listing
module.exports.validateListing=(req,res,next)=>{
    

const validateListing=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    if(error){
        let errorMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }else{
        next();
    }
};
next();
}


// //Validate Review

// module.exports.validateReviews=(req,res,next)=>{
// const validateReview=(req,res,next)=>{
//     let {error}= reviewSchema.validate(req.body);
//     if(error){
//         let errMsg= error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errorMsg);
//     }else{
//         next();
//     }
// };
// next();
// }

//  check for an erron in authon project b last phase.. 
module.exports.isReviewAuthor=async (req,res,next) =>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(id);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of the review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
