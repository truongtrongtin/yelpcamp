var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  passport = require('passport'),
  session = require('express-session'),
  LocalStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  User = require('./models/user'),
  seedDB = require('./seeds'),
  PORT = process.env.PORT || 3000;

// requiring routes
var indexRoutes = require('./routes/index'),
  campgroundRoutes = require('./routes/campgrounds'),
  commentRoutes = require('./routes/comments');

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect(
  'mongodb://zero0305:0246813579@cluster0-shard-00-00-hqyhv.mongodb.net:27017,cluster0-shard-00-01-hqyhv.mongodb.net:27017,cluster0-shard-00-02-hqyhv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(
  session({
    secret: 'Once again Rusty wins cutest dog',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// var campgrounds = [
// 	{name: "North Bend Park", location: "Virginia", image: "https://www.campsitephotos.com/photo/camp/40513/North_Bend_C_189.jpg"},
// 	{name: "William O Brien State Park", location: "Minnesota", image: "https://www.campsitephotos.com/photo/camp/65347/St_Croix_River.jpg"},
// 	{name: "Curt Gowdy State Park", location: "Wyoming", image: "https://www.campsitephotos.com/photo/camp/68495/Curt_Gowdy_State_Park_Sunset.jpg"},
// 	{name: "Boulder Basin", location: "California", image: "https://www.campsitephotos.com/photo/camp/15802/Boulder_Basin_002.jpg"},
// 	{name: "Fishermens Bend", location: "Oregon", image: "https://www.campsitephotos.com/photo/camp/47439/Fishermens_Bend_017.jpg"},
// ];

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
