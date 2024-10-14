let express = require("express");
const multer = require("multer");
const { subCategoryInsert, getSubCategory, subCatView, subCatDelete, subCatMultiDelete, editData, updateRow } = require("../../controller/admin/subCatController");
let SubCategoryRoute = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/subcategory")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let uploads = multer({ storage: storage })

SubCategoryRoute.post("/insert", uploads.single("subCatImage"), subCategoryInsert)
SubCategoryRoute.get("/parent-category",getSubCategory)
SubCategoryRoute.get("/view-subcategory",subCatView)
SubCategoryRoute.delete("/delete-subcategory/:id",subCatDelete)
SubCategoryRoute.post("/multidelete-subcategory",subCatMultiDelete)
SubCategoryRoute.get("/edit-subcategory/:id",editData)
SubCategoryRoute.put("/update-subcategory",uploads.single("subCatImage"),updateRow)

module.exports = { SubCategoryRoute }