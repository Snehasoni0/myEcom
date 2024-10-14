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

let deleteSize = async (req, res) => {
    let id = req.params.id;
    let sizeData = await sizeModel.deleteOne({ _id: id });
    let obj = {
        status: 1,
        'message': 'data deleted',
        sizeData
    }
    res.send(obj)
}

let deleteMultiSize = async (req, res) => {
    let {allId} = req.body;
    console.log(allId)

    let sizeData = await sizeModel.deleteMany({ _id:  allId})
    let obj = {
        status: 1,
        'message': 'data deleted',
        sizeData
    }
    res.send(obj)
}

module.exports = { sizeInsert, getSize, deleteSize, deleteMultiSize }