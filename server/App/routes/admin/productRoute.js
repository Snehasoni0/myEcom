let express = require("express");
const multer = require("multer");
const { ProductInsert, getParentCat, getSubCat, getSize, getColor } = require("../../controller/admin/productController");
let ProductRoute = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/product")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let uploads = multer({ storage: storage })

ProductRoute.post("/insert", uploads.single("subCatImage"), ProductInsert)
ProductRoute.get("/view-parentCat", getParentCat);
ProductRoute.get("/view-subCat", getSubCat);
ProductRoute.get("/view-size", getSize);
ProductRoute.get("/view-color", getColor);

module.exports = { ProductRoute }


// http://localhost:8000/admin/product/view-parentCat