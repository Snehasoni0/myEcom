let fs = require("fs");
const { subCategoryModel } = require("../../model/category/subCategory");
const { categoryModel } = require("../../model/category/categorymodel");

let subCategoryInsert = async (req, res) => {
    // console.log(req.body)
    // console.log(req.file)

    let { subCategoryName, subcatDescription, status, parentCatName } = req.body;

    let obj = {
        subCategoryName: subCategoryName,
        subCategoryDescription: subcatDescription,
        subCategorystatus: status,
        parentCat: parentCatName
    }

    if (req.file) {
        if (req.file.filename) {
            obj['subCategoryImage'] = req.file.filename
        }
    }
    try {
        let SubcategoryInsert = new subCategoryModel(obj)
        let finalRes = await SubcategoryInsert.save();
        let resObj = {
            status: 1,
            'message': "Data Insert",
            finalRes
        }
        res.send(resObj)
    }
    catch (error) {
        let resObj = {
            status: 0,
            'message': "Error Occured",
            error
        }
        res.send(resObj)
    }
    // res.send("API")
}

let getSubCategory = async (req, res) => {
    let data = await categoryModel.find({ categorystatus: 1 })
    let obj = {
        status: 1,
        data
    }
    res.send(obj)
}

let subCatView = async (req, res) => {
    let data = await subCategoryModel.find().populate('parentCat','subCategoryName');
    let obj = {
        status: 1,
        data
    }
    res.send(obj)
}
module.exports = { subCategoryInsert, getSubCategory, subCatView }