let express = require("express");
const { sizeInsert, getSize } = require("../../controller/admin/sizeController");
let sizeRoute= express.Router();

sizeRoute.post('/insert',sizeInsert)
sizeRoute.get('/view',getSize)

module.exports={sizeRoute}