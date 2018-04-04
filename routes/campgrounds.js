var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX
router.get("/", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
  Campground.create(req.body.campground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      newlyCreated.author.id = req.user._id;
      newlyCreated.author.username = req.user.username;
      newlyCreated.save();
      req.flash("success", "Campground added");
      res.redirect("/campgrounds");
    }
  });
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//SHOW ROUTE
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", { campground: foundCampground });
    }
  });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground updated");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground deleted");
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;