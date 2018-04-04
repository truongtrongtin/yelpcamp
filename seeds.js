var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  { name: "North Bend Park", location: "Virginia", image: "https://www.campsitephotos.com/photo/camp/40513/North_Bend_C_189.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus." },
  { name: "William O Brien State Park", location: "Minnesota", image: "https://www.campsitephotos.com/photo/camp/65347/St_Croix_River.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus." },
  { name: "Curt Gowdy State Park", location: "Wyoming", image: "https://www.campsitephotos.com/photo/camp/68495/Curt_Gowdy_State_Park_Sunset.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus." },
  { name: "Curt Gowdy State Park", location: "Wyoming", image: "https://www.campsitephotos.com/photo/camp/68495/Curt_Gowdy_State_Park_Sunset.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus." },
  { name: "Boulder Basin", location: "California", image: "https://www.campsitephotos.com/photo/camp/15802/Boulder_Basin_002.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus." },
  { name: "Fishermens Bend", location: "Oregon", image: "https://www.campsitephotos.com/photo/camp/47439/Fishermens_Bend_017.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus." },
];

function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log("err");
    }
    console.log("Removed Campgrounds!");
    //add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          //create a comment
          Comment.create({
            text: "This place is great, but I wish there was internet",
            author: "Homer"
          }, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created new comment");
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;