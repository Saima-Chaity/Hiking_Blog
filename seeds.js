var mongoose= require("mongoose");
var campground = require("./models/campground");
var Comment = require("./models/comment");

var createdcampgrounds=[
    {
        Name: "JOFFRE LAKE",
        Image:"https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/20424125_10155546463107418_5615449016284494161_o.jpg?oh=f36aa7438749e4b7396a4b97113c8407&oe=59FF34C9",
        Description:"I always loved being in the nature and hiking in Joffre Lake was an amazing experience. I did this hike last weekend with my wife."
    },
    {
        Name:"WEDGEMOUNT LAKE",
        Image:"https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/20157645_555184061491213_5930999836681995257_o.jpg?oh=a2675e579aa4e3c7d086e12c6daa4179&oe=5A380B14",
        Description:"One of the most gorgeous backpacking trip I have done in the Canadian Rockies so far! It was quite a difficult one with 1200m of continuous uphill elevation but we enjoyed every bit of it."
    },
    {
        Name:"STAWAMUS CHIEF",
        Image:"http://photokaz.com/wp-content/uploads/2012/09/2012-09-13-Stawamus-Chief-1815-MKH.jpg",
        Description:"The Stawamus Chief, officially Stawamus Chief Mountain, is a granite dome located adjacent to the town of Squamish, British Columbia, Canada. It towers over 700 m above the waters of nearby Howe Sound."
    }, 
    {
        Name:"GROUSE GRIND",
        Image:"http://blog.favoroute.com/wp-content/uploads/2016/01/Grouse-Grind-Vancouver-Canada-Hidden-Gems-Favoroute1.jpg",
        Description:"The Grouse Grind is a 2.9-kilometre trail up the face of Grouse Mountain, commonly referred to as <strong>Mother Nature’s Stairmaster</strong>. This trail is very challenging. There is a wide range of mountaintop trails."
    },
    {
        Name:"SEA TO SKY SUMMIT",
        Image:"http://vacay.ca/wp-content/uploads/2014/05/sea-to-sky-view.jpg",
        Description:"This is another best hike I have done recently. The Sea-to-Sky, often referred to as the Corridor, or the Sea to Sky Country, is a region in British Columbia spreading from Horseshoe Bay through Whistler to the Pemberton Valley and sometimes beyond to include Birken and D'Arcy."
    },
    {
        Name:"BOWEN ISLAND",
        Image:"http://www.buckettripper.com/wp-content/uploads/2013/11/Entering-Snug-Cove-Harbor-in-British-Columbia.jpg",
        Description:"Bowen Island is an island municipality in Howe Sound, a part of the Metro Vancouver Regional District. Approximately 6 km wide by 12 km long, the island at its closest point is about 3 km west of the mainland."
    }
];

function seedDB(){
    campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed");
            for(var i=0; i<createdcampgrounds.length; i++){
                campground.create(createdcampgrounds[i], function(err, addedCampground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added New Campground");
                        Comment.create(
                            {
                                Author: "Saima",
                                Text: "One of the best hiking."
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    addedCampground.comments.push(comment);
                                    addedCampground.save();
                                    console.log("Created New Comment");
                                }
                            }
                        );
                    }
                });
            }
    });
}

module.exports = seedDB;