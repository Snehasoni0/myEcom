let express = require("express");
const multer = require("multer");
const { subCategoryInsert, getSubCategory, subCatView } = require("../../controller/admin/subCatController");
let SubCategoryRoute = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/subCategory")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let uploads = multer({ storage: storage })

SubCategoryRoute.post("/insert", uploads.single("subCatImage"), subCategoryInsert)
SubCategoryRoute.get("/parent-category",getSubCategory)
SubCategoryRoute.get("/view-subcategory",subCatView)


module.exports = { SubCategoryRoute }