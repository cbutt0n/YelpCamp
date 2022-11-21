
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
   for(let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price =Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
        //your user id
        author: '63618b88eb0204b3e6ccccca',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint at consectetur iusto aut quam, quibusdam doloribus facere. Harum odit nam quod. Laudantium harum consequuntur molestiae nulla, id sapiente quaerat blanditiis.',
        price,
        geometry: {
            type: "Point",
            coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]

        },
        images:  [
            {  
                url: 'https://res.cloudinary.com/djoqzwang/image/upload/v1668546619/YelpCamp/cd6b0hsrigcnlomzddjk.jpg',
                filename: 'YelpCamp/cd6b0hsrigcnlomzddjk',
            },
            {
                
                url: 'https://res.cloudinary.com/djoqzwang/image/upload/v1668547425/YelpCamp/oini2ytyv7doh2qscvxq.jpg',
                filename: 'YelpCamp/oini2ytyv7doh2qscvxq',
    
            },
            
                ]
             })
    await camp.save();
   }
}

seedDB().then(() => {
    mongoose.connection.close();
})