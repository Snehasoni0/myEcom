const { sizeModel } = require("../../model/size/sizemodel");

let sizeInsert = async (req, res) => {
    let { sizeName, sizeStatus } = req.body;

    let obj = {
        sizeName: sizeName,
        sizeStatus: sizeStatus
    }

    try {
        let sizeInsert = await sizeModel.insertMany(obj)
        let resObj = {
            status: 1,
            'message': 'data inserted',
            sizeInsert
        }
        res.send(resObj)
    }
    catch (error) {
        let resObj = {
            status: 0,
            'message': 'data not inserted',
            error
        }
        res.send(resObj)
    }

}


let getSize = async (req, res) => {
    let sizeData = await sizeModel.find()
    let obj = {
        status: 1,
        data :sizeData
    }
    res.send(obj)
}
module.exports = { sizeInsert, getSize }