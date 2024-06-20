const mongoose=require("mongoose");
const cities=require("./cities")
const {places,descriptors}=require("./seedHelpers")
//../ back out one by one folder
const Campground=require("../models/campground");
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })
    const sample=(array)=>array[Math.floor(Math.random()*array.length)];
const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000)
        const price=Math.floor(Math.random()*20)+10
        const camp=new Campground({
            author:'65b3916ff84ea7dd6718725a',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur itaque mollitia, deleniti nesciunt animi tenetur tempora ratione facere, debitis eum aliquam voluptate vitae veritatis fuga dolore laboriosam, eligendi beatae quos.",
            image: [
                {
                    url: 'https://res.cloudinary.com/daq7zqpld/image/upload/v1706454182/Yelpcamp/zi4fvrksaqahn8qqudnr.jpg',
                    filename: 'Yelpcamp/zi4fvrksaqahn8qqudnr',
                   
                },
                {
                  url: 'https://res.cloudinary.com/daq7zqpld/image/upload/v1706454182/Yelpcamp/lcoyjgddsd6rb4ssx2md.webp',
                  filename: 'Yelpcamp/lcoyjgddsd6rb4ssx2md',
                }
                
              ],
            price
        })
        await camp.save()
    }
}
seedDB().then(()=>{
    mongoose.connection.close()
})