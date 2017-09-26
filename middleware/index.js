var campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObject={};

middlewareObject.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You Need To Be Logged In!");
    res.redirect("/login");
};

middlewareObject.checkCampgroundOwner = function (req, res, next){
     if(req.isAuthenticated()){
        campground.findById(req.params.id, function(err, editedCampground){
           if(err){
               req.flash("error", "Access Denied!");
               res.redirect("back");
           } else 
           {
                if(editedCampground.Author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Access Denied!");
                    res.redirect("back");
                }
           }
        });
    } else 
    {
        req.flash("error", "Access Denied!");
        res.redirect("back");
    }
};

middlewareObject.checkCommentOwner = function(req, res, next){
     if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, editedComment){
           if(err){
               req.flash("error", "Access Denied!");
               res.redirect("back");
           } else 
           {
                if(editedComment.Author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Access Denied!");
                    res.redirect("back");
                }
           }
        });
    } else 
    {
        req.flash("error", "Access Denied!");
        res.redirect("back");
    }
};

module.exports= middlewareObject;