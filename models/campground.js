var mongoose= require("mongoose");
var campgroundSchema = new mongoose.Schema({
    Name: String,
    Image: String,
    Description: String,
    Price: String,
    created: {type: Date, default: Date.now},
    Author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:
    [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("campground", campgroundSchema);