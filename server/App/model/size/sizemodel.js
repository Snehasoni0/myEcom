const mongoose = require('mongoose');
let sizeSchema = new mongoose.Schema({
    sizeName: {
        type: String,
        unique: true,
        required: true
    },
    sizeStatus: Boolean
},
    {
        timestamps: true
    }
)

let sizeModel = mongoose.model("size",sizeSchema)

module.exports={sizeModel}