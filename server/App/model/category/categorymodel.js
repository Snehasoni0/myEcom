const mongoose = require('mongoose');
let catergorySchema = new mongoose.Schema({
    catergoryName: {
        type: String,
        unique: true,
        required: true
    },
    catergoryImage: String,
    catergoryDescription: String,
    catergorystatus: Boolean
},
    {
        timestamps: true
    }
)

let catergoryModel = mongoose.model("Category",catergorySchema)

module.exports={catergoryModel}