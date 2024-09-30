const mongoose = require('mongoose');
let sliderSchema = new mongoose.Schema({
    slidername: {
        type: String,
        unique: true,
        required: true
    },
    sliderHeading: {
        type: String,
        unique: true,
        required: true
    },
    sliderSubHeading: {
        type: String,
        unique: true,
        required: true
    },
    sliderImage: String,
    sliderStatus:Boolean
},
    {
        timestamps: true
    }
)

let sliderModel = mongoose.model("slider",sliderSchema)

module.exports={sliderModel}