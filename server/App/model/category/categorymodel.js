const mongoose = require('mongoose');
let catergorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true
    },
    categoryImage: String,
    categoryDescription: String,
    categorystatus: Boolean
},
    {
        timestamps: true
    }
)

let categoryModel = mongoose.model("Category",catergorySchema)

module.exports={categoryModel}