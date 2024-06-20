const express=require("express")
const router=express.Router({mergeParams:true})
const {reviewSchema}=require("../schemas.js")
const catchAsync = require("../utils/catchAsync")
const ExpressError = require("../utils/ExpressError")
const Review=require("../models/review.js")
const Campground = require("../models/campground");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js")
const reviews=require("../controllers/review.js")
router.post("/",isLoggedIn,validateReview,catchAsync(reviews.createReview))
router.delete("/:reviewId",isReviewAuthor,catchAsync(reviews.delteReview))
module.exports=router;