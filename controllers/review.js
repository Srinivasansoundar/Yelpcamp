const Review=require("../models/review.js")
const Campground = require("../models/campground");
module.exports.createReview=async(req,res)=>{
    const campground=await Campground.findById(req.params.id);
    const review=new Review(req.body.review)
    review.author=req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success","Created a new review!")
    res.redirect(`/campground/${campground._id}`)
}
module.exports.delteReview=async(req,res)=>{
    const{id,reviewId}=req.params
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})    
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Successfully deleted the review!")
    res.redirect(`/campground/${id}`)
}