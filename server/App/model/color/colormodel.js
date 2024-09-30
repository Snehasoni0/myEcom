const mongoose = require('mongoose');
let colorSchema = new mongoose.Schema({
    colorName: {
        type: String,
        unique: true,
        required: true
    },
    colorPicker: String,
    colorStatus: Boolean
},
    {
        timestamps: true
    }
)

let colorModel = mongoose.model("Color",colorSchema)

module.exports={colorModel}