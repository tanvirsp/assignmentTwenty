const express = require('express');
const app = express();
const router = require("./src/routes/api")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');
const { rateLimit } = require('express-rate-limit')
const helmet = require('helmet');
const hpp = require('hpp');


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})

//Security Middleware
app.use(limiter)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(mongoSanitize())
app.use(helmet())
app.use(hpp())



app.use("/api", router);




//Root Rought
app.get("/", (req, res) =>{
    res.send("Server is Running")
})


//Undefined Route
app.use("*", (req, res) =>{
	res.status(404).json({status: "fail", data: "Page Not Found"})
});




module.exports = app;
