let express = require("express");
const multer = require("multer");
const { categoryInsert, categoryView } = require("../../controller/admin/categoryController");
let categoryRoute = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/category")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let uploads = multer({ storage: storage })

categoryRoute.post("/insert", uploads.single("categoryImage"), categoryInsert)
categoryRoute.get("/view",categoryView)

module.exports = { categoryRoute }