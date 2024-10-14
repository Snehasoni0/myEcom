const mongoose = require('mongoose');
let ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        unique: true,
        required: true
    },
    ProductDescription: String,
    ShortDescription: String,
    ProductImage: String,
    AnimationImage: String,
    ProductGallery: String,
    Price: Number,
    MRP: Number,
    parentCat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory'
    },
    Size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size'
    },
    Color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    },
    Productstatus: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)

let ProductModel = mongoose.model("Product", ProductSchema)

module.exports = { ProductModel }