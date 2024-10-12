const { categoryModel } = require("../../model/category/categorymodel");
let fs = require("fs")

let categoryInsert = async (req, res) => {

    // res.send('welcome')
    let { categoryName, categoryImage, categoryDescription, status } = req.body;

    let obj = {
        categoryName: categoryName,
        categoryImage: categoryImage,
        categoryDescription: categoryDescription,
        categorystatus: status
    }

    if (req.file) {
        if (req.file.filename) {
            obj['categoryImage'] = req.file.filename
        }
    }
    try {
        let categoryInsert = new categoryModel(obj)
        let finalRes = await categoryInsert.save();
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
}


let categoryView = async (req, res) => {
    let limit = 5;
    let searchData = {

    }
    let { catName, catDesc, pageNumber } = req.query;
    if (catName !== undefined) {
        searchData['categoryName'] = new RegExp(catName, 'i')
    }
    if (catDesc !== undefined) {
        searchData['categoryDescription'] = new RegExp(catDesc, 'i')
    }

    let ViewData = await categoryModel.find(searchData).skip((pageNumber-1)*limit).limit(limit);
    let ViewDatalen = await categoryModel.find(searchData);
    let totlength = ViewDatalen.length;
    let obj = {
        status: 1,
        path: process.env.CATEGORYBASEURL,
        tot: totlength,
        limit,
        pages: Math.ceil(totlength / limit),
        data: ViewData,
    }
    res.send(obj);
}

let categoryDelete = async (req, res) => {
    let id = req.params.id;

    let getData = await categoryModel.findOne({ _id: id })
    // console.log(getData)
    let imageName = getData.categoryImage;
    let path = "uploads/category/" + imageName;
    fs.unlinkSync(path)

    let DeleteData = await categoryModel.deleteOne({ _id: id })
    let obj = {
        status: 1,
        msg: 'delete data',
        data: DeleteData
    }
    res.send(obj)
}

let categoryMultiDelete = async (req, res) => {
    let { allId } = req.body;
    // console.log(allId)

    for (let id of allId) {
        let getData = await categoryModel.findById({ _id: id })
        let imageName = getData.categoryImage;
        let path = "uploads/category/" + imageName;
        fs.unlinkSync(path)
    }

    let DeleteData = await categoryModel.deleteMany({ _id: allId })
    let obj = {
        status: 1,
        msg: 'delete data',
        data: DeleteData
    }
    res.send(obj)
}

let editData = async (req, res) => {
    let id = req.params.id;
    console.log(id)
    let singleCatData = await categoryModel.findOne({ _id: id })
    console.log(singleCatData)
    let obj = {
        status: 1,
        data: singleCatData,
        path: process.env.CATEGORYBASEURL
    }
    res.send(obj)
}

let updateRow = async (req, res) => {
    let id = req.params.id;
    let { categoryName, categoryImage, categoryDescription, status } = req.body;
    let obj = {
        categoryName: categoryName,
        categoryImage: categoryImage,
        categoryDescription: categoryDescription,
        categorystatus: status
    }

    if (req.file) {
        if (req.file.filename) {
            obj['categoryImage'] = req.file.filename
        }
    }

    let updateData = await categoryModel.updateOne({ _id: id }, { $set: obj })
    let resObj = {
        status: 1,
        msg: 'delete data',
        data: updateData
    }
    res.send(resObj)
}



module.exports = { categoryInsert, categoryView, categoryDelete, categoryMultiDelete, editData, updateRow }