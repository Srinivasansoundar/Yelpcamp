const express=require("express")
const router=express.Router()
const multer=require("multer")
const {storage}=require("../cloudinary")//node automatically see index file
const upload=multer({storage})
const {campgroundSchema}=require("../schemas.js")
const catchAsync = require("../utils/catchAsync")
const ExpressError = require("../utils/ExpressError")
const Campground = require("../models/campground");
const {isLoggedIn,isAuthor,validateCampground}=require("../middleware.js")
const campgrounds=require("../controllers/campground.js")
//grouping routes that have same path
router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array("image"), validateCampground,catchAsync(campgrounds.createCampground))
    
//upload.single("image") will l
//multer will look for a file with the key="name" and store it in a req.file
router.get("/new", isLoggedIn,campgrounds.renderNewForm)
router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array("image"),validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit",isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm))
module.exports=router;