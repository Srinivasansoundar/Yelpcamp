const Campground = require("../models/campground");
const {cloudinary,storage1}=require("../cloudinary/index")
const multer=require("multer")
const upload=multer({storage1})
const Slide=require("../models/slide")
module.exports.index = async (req, res) => {
    // const result=await cloudinary.uploader.upload("/campground2.jpg",{
    //     folder:"Carosel"
    // })
    // let arr=[]
    // arr.push({
    //     public_id:result.public_id,
    //     url:result.secure_url
    // })
    // const slide=new Slide({image:arr})
    // await slide.save()
    // console.log(slide)
    const campgrounds = await Campground.find({});
    const slide=await Slide.find({})
    res.render("campgrounds/index", {campgrounds,slide})
}
module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new")
}
module.exports.createCampground = async (req, res, next) => {
    // console.log(req.body.campground)
    // if(!req.body.campground){
    //     throw new ExpressError("Invalid campground data",400)
    // }
   
    const campground = new Campground(req.body.campground);
    campground.image = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id;
    await campground.save()
    req.flash("success", "Successfully created a new campground!")
    res.redirect(`/campground/${campground._id}`)
}
module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    //pupulate the camproud reviews,author of the reviews and then populate the campground author
    if (!campground) {
        req.flash("error", "Cannot find that campground")
        return res.redirect("/campground")
    }
    //console.log(campground)
    res.render("campgrounds/show", { campground })
}
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash("error", "Cannot find that campground")
        return res.redirect("/campground")
    }
    res.render("campgrounds/edit", { campground })

}
module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    // console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { runValidators: true, new: true })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    //we dont want to push array to arrays we want to push objects to array
    campground.image.push(...imgs)
    //console.log(campground)
    if (req.body.deleteImages) {
       for(let filename of req.body.deleteImages){
        await cloudinary.uploader.destroy(filename)
       }
       await campground.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } })
      // console.log(campground)
    }
    await campground.save()
    req.flash("success", "Successfully updated the campground!")
    res.redirect(`/campground/${campground._id}`)
}
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash("success", "Successfully deleted the campground!")
    res.redirect("/campground")
}
module.exports.uploadToCloudinary = async (path, folder = "Carousel") => {
    try {
      const data = await cloudinary.uploader.upload(path, { folder: folder });
      return { url: data.secure_url, publicId: data.public_id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };