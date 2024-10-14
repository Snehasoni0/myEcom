let fs = require("fs");
const { categoryModel } = require("../../model/category/categorymodel");
const { subCategoryModel } = require("../../model/category/subCategorymodel");
const { sizeModel } = require("../../model/size/sizemodel");
const { colorModel } = require("../../model/color/colormodel");

let ProductInsert = async (req, res) => {


}

let getParentCat = async (req, res) => {
    let data = await categoryModel.find({categorystatus:1});
    let obj = {
        status : 1,
        data
    }
    res.send(obj)
}

let getSubCat = async (req,res)=>{
    let data = await subCategoryModel.find({subCategorystatus:1});
    let obj={
        status : 1,
        data
    }
    res.send(obj)
}

let getSize = async (req,res)=>{
    let data = await sizeModel.find({sizeStatus:1});
    let obj={
        status : 1,
        data
    }
    res.send(obj)
}

let getColor = async (req,res)=>{
    let data = await colorModel.find({colorStatus:1});
    let obj={
        status : 1,
        data
    }
    res.send(obj)
}

module.exports = { ProductInsert , getParentCat , getSubCat , getSize , getColor}
