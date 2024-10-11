const express = require("express");
const wrapAsync= require("../utills/wrapAsync.js");
const Listing = require("../models/listing.js");
const router = express.Router();
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js")

const upload = multer({storage});

//Index Route
//Create Route with router.route functionality

router.route("/")
.get(wrapAsync(listingController.index)) // to get single function from whole file.
.post(
    isLoggedIn,
   
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);
 

 //New route
 router.get("/new",isLoggedIn,listingController.renderNew);
 


//Show route
//Update route
//Delete route
router.route("/id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single("listing[image]"), // for Edit image by backend 
    validateListing,
    wrapAsync(listingController.updateListing))
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));




// Edit route

router.get("/:id/edit",
isLoggedIn,
isOwner,
 wrapAsync(listingController.editForm));

module.exports = router;