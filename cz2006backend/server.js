const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var cors = require('cors')
const User = require('./app/models/User')
const routes = require('./app/routes/User.Routes.js');
const appointmentRoutes = require('./app/routes/Appointment.Routes.js');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
// const localURI = 'mongodb://localhost:27017/rbac'
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => {
  // console.log('Connected to the Database successfully')
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(accessToken, process.env.SECRET);
      // const expiryDate = new Date(exp*1000);
      // const nowDate = new Date(Date.now().valueOf())
      // console.log(expiryDate.toString())
      // console.log(nowDate.toString())
      // console.log(exp)
      // console.log(Date.now().valueOf() / 1000)
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one"
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } catch (error) {
      next();
    }
  } else {
    next();
  }
});

app.use('/', routes);
app.use('/', appointmentRoutes);
app.get('/', function (req, res) {
  res.send('Hello World')
})

module.exports = app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})
