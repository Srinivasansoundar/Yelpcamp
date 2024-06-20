const {campgroundSchema}=require("./schemas.js")
const Campground=require("./models/campground");
const ExpressError = require("./utils/ExpressError")
const {reviewSchema}=require("./schemas.js")
const Review=require("./models/review.js")
const {cloudinary}=require("./cloudinary/index")
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo=req.originalUrl;
        req.flash("error", "you must log in")
        return res.redirect("/login")
    }
    next()
}
//req.path=new req.originalUrl=/campground/new
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        const msg=error.details.map(e=>e.message).join(",")
        throw new ExpressError(msg,400)
    }
    else{
        next();//point to next route handler  
    }
}
module.exports.isAuthor=async(req,res,next)=>{
    const {id}=req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)){
        req.flash("error","You do not have permission to do that!")
        return res.redirect(`/campground/${id}`);
    }
    next()   
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    const {id,reviewId}=req.params
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)){
        req.flash("error","You do not have permission to do that!")
        return res.redirect(`/campground/${id}`);
    }
    next()   
}
module.exports.validateReview=(req,res,next)=>{
    const{error}=reviewSchema.validate(req.body);
    if (error) {
        const msg=error.details.map(e=>e.message).join(",")
        throw new ExpressError(msg,400)
    }
    else{
        next();//point to next route handler  
    }
}
