if(process.env.NODE_ENV !=="production"){
    require("dotenv").config()
}
//if environment is not production then the the contents in .env file and is added to the node app
//i am in develpment side
const express = require("express")
const path = require("path")
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport")
const localStrategy=require("passport-local")
const monogoSanitize=require("express-mongo-sanitize")
const helmet=require("helmet")
const catchAsync = require("./utils/catchAsync")
const Review=require("./models/review.js")
const ExpressError = require("./utils/ExpressError")
const {campgroundSchema,reviewSchema}=require("./schemas.js")
const Campground = require("./models/campground");
const userRoutes=require("./routes/user.js")
const campgroundsRoutes=require("./routes/campground")
const reviewsRoutes=require("./routes/review.js")
const User=require("./models/user.js");
const { cloudinary,storage} = require("./cloudinary/index.js");
const multer=require("multer")
const upload=multer({storage})
const Slide=require("./models/slide.js")
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })


const app = express()
const sessionCongfig={
    name:"session",
    secret:"thisisssecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,//security
        //secure:true,
        expires:Date.now()+1000*60*60*24*7,//expiration date it will expire after a week
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionCongfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session()) //persisten login session
//make sure passport.session comes after app.use(session())
app.use(helmet())
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const fontSrcUrls = [];
app.use(
    helmet({
        contentSecurityPolicy:{
        directives: {
            defaultSrc: [],
            connectSrc: [],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/daq7zqpld/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    },
    })
);


passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.engine("ejs", ejsMate);
app.use(monogoSanitize({
    replaceWith: '_'
}))
//it does not allow any dollar sign or period in the req.query

//dont give console.log(currentUser) 
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
    //it will look into the the req.flash of success most of the time there is nothing

})
app.get("/fakeUser",async(req,res)=>{
    const user=new User({email:"sollt@gmail.com",username:"colt"})
    const newUser=await User.register(user,"chicken")
    res.send(newUser)
})
app.use("/campground",campgroundsRoutes)
app.use("/campground/:id/reviews",reviewsRoutes)
app.use("/",userRoutes)
app.get("/", (req, res) => {
    res.render("home")
})
app.get("/upload",async (req,res)=>{
    res.render("campgrounds/up.ejs")
   
})
app.post("/upload",upload.array("image"),async(req,res)=>{
    try{
        const slide=new Slide()
        let img = req.files.map(f => ({ url: f.path, filename: f.filename }))
        slide.image=img
        await slide.save()
        //console.log(slide)
        res.send("oo")
        //res.render("/campgrounds/index.ejs",{slide})
    }
    catch(err){
        console.log(err)
    }
})
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not found", 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = "Oh something went wrong"
    res.status(statusCode).render("error", { err })
    //res.send("Somethng went wrong")
})
app.listen("3000", () => {
    console.log("Listening to the port 3000");
})