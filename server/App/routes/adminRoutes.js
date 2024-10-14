let express = require("express");
const { categoryRoute } = require("./admin/categoryRoute");
const { sizeRoute } = require("./admin/sizeRoute");
const { colorRoute } = require("./admin/colorRoute");
const { storyRoute } = require("./admin/storyRoute");
const { sliderRoute } = require("./admin/slideRoute");
const { SubCategoryRoute } = require("./admin/subCatRoute");
const { ProductRoute } = require("./admin/productRoute");
let adminRoute= express.Router();

adminRoute.use('/category',categoryRoute)
adminRoute.use('/size',sizeRoute)
adminRoute.use('/color',colorRoute)
adminRoute.use('/story',storyRoute)
adminRoute.use('/slider',sliderRoute)

adminRoute.use('/subcategory',SubCategoryRoute)

adminRoute.use('/product',ProductRoute)

module.exports={adminRoute}