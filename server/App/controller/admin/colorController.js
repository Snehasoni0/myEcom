const { colorModel } = require("../../model/color/colormodel");

let colorInsert = async (req, res) => {
    let { colorName, colorPicker, colorStatus } = req.body;
    let obj = {
        colorName: colorName,
        colorPicker: colorPicker,
        colorStatus: colorStatus
    }
    try {
        let colorInsert = await colorModel.insertMany(obj)
        let resObj = {
            status: 1,
            'message': 'data inserted',
            colorInsert
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

let getColor = async (req, res) => {
    let colorData = await colorModel.find();
    let obj = {
        status: 1,
        data: colorData
    }
    res.send(obj)
}

let deleteColor = async (req, res) => {
    let id = req.params.id;
    let colorData = await colorModel.deleteOne({ _id: id });
    let obj = {
        status: 1,
        'message': 'data deleted',
        colorData
    }
    res.send(obj)
}

let deleteMultiColor = async (req, res) => {
    let {allId} = req.body;
    console.log(allId)
    // let id = req.body.id;

    

    let colorData = await colorModel.deleteMany({ _id:  allId})
    let obj = {
        status: 1,
        'message': 'data deleted',
        colorData
    }
    res.send(obj)
}

let editColor = async (req,res)=>{
    let id = req.params.id;
    console.log(id)

}



module.exports = { colorInsert, getColor, deleteColor,deleteMultiColor, editColor }