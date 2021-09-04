const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./app/Routes.Facility');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
}).then(() => {
    console.log('Connected to the Database successfully')
}).catch(err => console.log(err.reason));

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

app.use('/api', routes);

app.get("/api", function (req, res) {
    res.json({
        message: "Testing message... Hello World!"
    })
})

// start the server listening for requests
app.listen(PORT,() => console.log("Server is running..."));
