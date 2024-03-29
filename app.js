const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const app = express();
const  Campground = require('./models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then (() => {
        console.log("Database Connected");
    })

    .catch (err => {
        console.log("Mongo Connection Error");
        console.log(err);
    })

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/campgrounds', async (req, res) => {
    const cps = await Campground.find({});
    res.render('campgrounds/index', {cps});
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', async (req, res) => {
    const cp = new Campground(req.body.campground);
    await cp.save();
    res.redirect(`campgrounds/${cp._id}`);
})

app.get('/campgrounds/:id', async (req, res) => {
    const cp = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {cp});
})

app.post('/campgrounds/:id', async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
})





app.listen(3000, () => {
    console.log("App is listening at port 3000");
})


