const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors,places} = require('./seedhelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then (() => {
        console.log("Database Connected");
    })

    .catch (err => {
        console.log("Mongo Connection Error");
        console.log(err);
    })


const randomDes = Math.random()*descriptors.length;
const randomPl = Math.random()*places.length;


const seedDB = async() => {
    Campground.deleteMany({});
    for (let i=0; i<50; i++) {
        const randomCity = Math.floor(Math.random()*1000);
        const randomDes = Math.floor(Math.random()*descriptors.length);
        const randomPl = Math.floor(Math.random()*places.length);
        const randomPrice = Math.floor(Math.random()*200);

        const cp = new Campground ({
            location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
            title: `${descriptors[randomDes]} ${places[randomPl]}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Hey There'           
        })
        await cp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
