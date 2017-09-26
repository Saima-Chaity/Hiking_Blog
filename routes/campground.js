var express= require("express");
var router = express.Router();
var campground = require("../models/campground");
var middlewareObject = require("../middleware");

//get all campground
router.get("/", function(req, res){
    campground.find({},function(err, Allcampground){
        if(err){
            console.log(err);
        }else{
            // console.log("removed");
            res.render("campgrounds/campground", {campgrounds:Allcampground});
        }
    });
});

//post route
router.post("/", middlewareObject.isLoggedIn, function(req, res){
    var name = req.body.Name;
    var image = req.body.Image;
    var description = req.body.Description;
    var price = req.body.Price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var Newcampground = { Name:name, Image:image, Description:description, Price:price, Author:author};
    campground.create(Newcampground, function(err, createdCampground){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Successfully Added New Post");
            res.redirect("/campground");
        }
    });
});

//new route
router.get("/new", middlewareObject.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});
//show route
router.get("/:id", function(req, res) {
    campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campgrounds:foundCampground});
        }
    });
});

//edit route
router.get("/:id/edit", middlewareObject.checkCampgroundOwner, function(req, res) {
    campground.findById(req.params.id, function(err, editedCampground){
        if(err){
            res.render("back");
        } else
        {
            res.render("campgrounds/edit", {campgrounds:editedCampground});
        }
    });
});

//update route
router.put("/:id", middlewareObject.checkCampgroundOwner,  function(req,res){
    campground.findByIdAndUpdate(req.params.id, req.body.campgrounds, function(err, updatedCampground){
        if (err){
            console.log(err);
        }else{
            req.flash("success", "Successfully Updated Campground!");
            res.redirect("/campground/"+ req.params.id);
        }
    });
});

//delete route
router.delete("/:id", middlewareObject.checkCampgroundOwner, function(req,res){
    campground.findByIdAndRemove(req.params.id, function(err, removedCampground){
        if (err){
            console.log(err);
        }else{
            req.flash("success", "Successfully Deleted Campground!");
            res.redirect("/campground");
        }
    });
});

module.exports = router;