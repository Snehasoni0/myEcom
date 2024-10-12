const mongoose = require('mongoose');
let subCategorySchema = new mongoose.Schema({
    subCategoryName: {
        type: String,
        unique: true,
        required: true
    },
    parentCat:{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    subCategoryImage: String,
    subCategoryDescription: String,
    subCategorystatus: {
        type: Boolean,
        default : true
    }
},
    {
        timestamps: true
    }
)

let subCategoryModel = mongoose.model("subCategory",subCategorySchema)

module.exports={subCategoryModel}