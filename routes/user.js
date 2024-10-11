const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utills/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController= require("../controllers/users.js");

// sigunp with router.route functionality
router.route("/signup")
.get(userController.renderSignUpform)
.post(wrapAsync(userController.signUp));

// login with router.route functionality
router.route("/login")
.get(userController.renderloginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local",{
    failureRedirect:'/login',
    failureFlash: true,
  }),
  userController.login
 );


router.get("/logout",userController.logout);

module.exports=router;