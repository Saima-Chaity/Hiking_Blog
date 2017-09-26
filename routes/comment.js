var express= require("express");
var router = express.Router({mergeParams: true});
var campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObject = require("../middleware");

//comments
router.get("/new", middlewareObject.isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("comment/new", {campgrounds:campgrounds});
        }
    });
});

//post comments
router.post("/", middlewareObject.isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    req.flash("success", "Successfully Added New Comment!");
                    // console.log(req.User.username)
                    comment.Author.id = req.user._id ;
                    comment.Author.username = req.user.username ;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campground/"+ campground._id);
                }
            });
        }
    });
});

//edit comments
router.get("/:comment_id/edit", middlewareObject.checkCommentOwner, function(req,res){
    Comment.findById(req.params.comment_id, function(err, editedComment) {
        if(err){
            res.redirect("back");
        } else{
            res.render("comment/edit", {campground_id: req.params.id, comment:editedComment});
        }
    });
});

//update comment
router.put("/:comment_id", middlewareObject.checkCommentOwner,  function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err){
            res.redirect("back");
        } else{
            req.flash("success", "Successfully Updated Comment!")
            res.redirect("/campground/" + req.params.id);
        }
    });
});

//delete route
router.delete("/:comment_id", middlewareObject.checkCommentOwner, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, removedComment) {
        if(err){
            res.redirect("back");
        } else{
            req.flash("success", "Successfully Deleted Comment!")
            res.redirect("/campground/" + req.params.id);
        }
    });
});

module.exports = router;