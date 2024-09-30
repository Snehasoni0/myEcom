let express = require("express");
const { colorInsert, getColor } = require("../../controller/admin/colorController");
let colorRoute= express.Router();


colorRoute.post('/insert',colorInsert)
colorRoute.get('/view',getColor)

module.exports={colorRoute}