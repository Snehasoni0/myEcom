const { catergoryModel } = require("../../model/category/categorymodel");

let categoryInsert = async (req, res) => {
    // res.send('welcome')
    let { categoryName, categoryImage, categoryDes, status } = req.body;

    let obj = {
        catergoryName: categoryName,
        catergoryImage: categoryImage,
        catergoryDescription: categoryDes,
        catergorystatus: status
    }

    if (req.file) {
        if (req.file.filename) {
            obj['catergoryImage'] = req.file.filename
        }
    }
    try {
        let categoryInsert = new catergoryModel(obj)
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
    let categoryData = await catergoryModel.find();
    let obj = {
        status: 1,
        path: process.env.CATEGORYBASEURL,
        data: categoryData
    }
    res.send(obj);
}

module.exports = { categoryInsert, categoryView }