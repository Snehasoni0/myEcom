let express = require("express")
const mongoose = require('mongoose');
let cors = require("cors")
require("dotenv").config()
const { mainRoute } = require("./App/mainRoutes");
let app = express()
app.use(cors())
app.use("/uploads/category",express.static("uploads/category"))
app.use(express.json())
app.use(mainRoute)

//database and server connectivity
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
.then((res)=>{
    app.listen(process.env.SERVERPORT)
})

