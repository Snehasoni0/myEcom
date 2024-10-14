let express = require("express");
const { sizeInsert, getSize, deleteMultiSize, deleteSize } = require("../../controller/admin/sizeController");
let sizeRoute= express.Router();

sizeRoute.post('/insert',sizeInsert)
sizeRoute.get('/view',getSize)
sizeRoute.delete('/delete/:id',deleteSize)
sizeRoute.post('/multidelete',deleteMultiSize)

module.exports={sizeRoute}