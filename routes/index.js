var express= require("express");
var router = express.Router();
var User = require ("../models/user");
var passport = require("passport");

//index route
router.get("/", function(req, res){
    res.render("landing");
});

//AUTH route
//get register route
router.get("/register", function(req, res){
    res.render("register");
});

//post route
router.post("/register", function(req, res){
    var newUser = new User ({username:req.body.username});
    User.register(newUser,req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome To Campground "  +  user.username);
                res.redirect("/campground");
            });
    });
});

//login logic
router.get("/login", function(req, res){
    res.render("login");
});

//post route
router.post("/login", passport.authenticate("local", 
   {
        successRedirect: "/campground",
        failureRedirect: "/login"
        
   }), function(req, res){
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/login");
});

module.exports = router;