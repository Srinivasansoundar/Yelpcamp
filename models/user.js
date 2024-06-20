const mongoose=require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")
const Schema=mongoose.Schema
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
});
userSchema.plugin(passportLocalMongoose)
//it add password and username to the userSchema
module.exports=mongoose.model("User",userSchema)