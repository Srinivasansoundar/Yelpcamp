const mongoose=require("mongoose")
const Schema=mongoose.Schema
const slideSchema=new Schema({
    image:[
        {
            filename:String,
            url:String
        }
    ]
})
module.exports=mongoose.model("Slide",slideSchema)