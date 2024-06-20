const cloudinary=require("cloudinary").v2
const {CloudinaryStorage}=require("multer-storage-cloudinary")
//asscociating our account with the cloudniary instance
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})
const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"Yelpcamp",
        allowedFormats:["jpeg","png","png"]
    }
   
})

module.exports={
    cloudinary,
    storage,
}