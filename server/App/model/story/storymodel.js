const mongoose = require('mongoose');
let storySchema = new mongoose.Schema({
    storyname: {
        type: String,
        unique: true,
        required: true
    },
    storyImage: String,
    storyBannerImage: String,
    storyDescription:String,
    storyStatus:Boolean
},
    {
        timestamps: true
    }
)

let storyModel = mongoose.model("story",storySchema)

module.exports={storyModel}