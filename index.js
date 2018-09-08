var express= require("express");
var mongoose= require("mongoose");
var methodOverride= require("method-override");
var bodyParser= require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");
var app = express();
var campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require ("./models/user");
// var seedDB= require("./seeds");
var campgroundRoute= require("./routes/campground");
var commentRoute= require("./routes/comment");
var indexRoute= require("./routes/index");

mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost:27017/campground', {server: { poolSize: 5 }});
mongoose.connect("mongodb://saima:saima@ds149844.mlab.com:49844/campground");
var conn = mongoose.connection;
conn.once('open', function ()
{
    console.log('test');
});



// seedDB();
// mongoose.connect("mongodb://localhost/campground");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

//passport
app.use(require("express-session")({
    secret: "this is campground project",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/" ,indexRoute);
app.use("/campground", campgroundRoute);
app.use("/campground/:id/comment" , commentRoute);

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server is running");
});