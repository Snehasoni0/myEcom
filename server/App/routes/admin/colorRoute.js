let express = require("express");
const { colorInsert, getColor, deleteColor, deleteMultiColor, editColor } = require("../../controller/admin/colorController");
let colorRoute= express.Router();


colorRoute.post('/insert',colorInsert)
colorRoute.get('/view',getColor)
colorRoute.delete('/delete/:id',deleteColor)
colorRoute.post('/multidelete',deleteMultiColor)
colorRoute.get('/edit',editColor)

module.exports={colorRoute}