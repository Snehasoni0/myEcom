let express = require("express");
const { adminRoute } = require("./routes/adminRoutes");
let mainRoute= express.Router();

mainRoute.use("/admin",adminRoute)


//http://localhost:8000/admin/category/insert
//http://localhost:8000/admin/color/insert
module.exports={mainRoute}