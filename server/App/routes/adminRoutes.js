let express = require("express");
const { categoryRoute } = require("./admin/categoryRoute");
const { sizeRoute } = require("./admin/sizeRoute");
const { colorRoute } = require("./admin/colorRoute");
const { storyRoute } = require("./admin/storyRoute");
const { sliderRoute } = require("./admin/slideRoute");
let adminRoute= express.Router();

adminRoute.use('/category',categoryRoute)
adminRoute.use('/size',sizeRoute)
adminRoute.use('/color',colorRoute)
adminRoute.use('/story',storyRoute)
adminRoute.use('/slider',sliderRoute)

module.exports={adminRoute}