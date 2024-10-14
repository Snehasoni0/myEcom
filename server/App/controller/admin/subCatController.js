let fs = require("fs");
const { subCategoryModel } = require("../../model/category/subCategorymodel");
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
        // console.log(resObj)
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
        path : process.env.SUBCATEGORYBASEURL,
        data
    }
    res.send(obj)
}

let subCatDelete = async (req,res) =>{
    let id = req.params.id;

    let getData = await subCategoryModel.findOne({ _id: id })
    let imageName = getData.subCategoryImage;
    let path = "uploads/subcategory/" + imageName;
    fs.unlinkSync(path)

    let DeleteData = await subCategoryModel.deleteOne({ _id: id })
    let obj = {
        status: 1,
        msg: 'delete data',
        data: DeleteData
    }
    res.send(obj)
}

let subCatMultiDelete = async(req,res)=>{
    let { allId } = req.body;
    // console.log(allId)

    for (let id of allId) {
        let getData = await subCategoryModel.findById({ _id: id })
        let imageName = getData.subCategoryImage;
        let path = "uploads/subcategory/" + imageName;
        fs.unlinkSync(path)
    }

    let DeleteData = await subCategoryModel.deleteMany({ _id: allId })
    let obj = {
        status: 1,
        msg: 'delete data',
        data: DeleteData
    }
    res.send(obj)
}

let editData = async (req, res) => {
    let id = req.params.id;
    let singleCatData = await subCategoryModel.findOne({ _id: id })
    console.log(singleCatData)
    let obj = {
        status: 1,
        data: singleCatData,
        path: process.env.SUBCATEGORYBASEURL
    }
    res.send(obj)
}

let updateRow = async(req,res)=>{

    let id = req.params.id;
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
    let updateData = await subCategoryModel.updateOne({ _id: id }, { $set: obj })
    let resObj = {
        status: 1,
        msg: 'delete data',
        data: updateData
    }
    res.send(resObj)
}
module.exports = { subCategoryInsert, getSubCategory, subCatView , subCatDelete,subCatMultiDelete ,editData , updateRow}
