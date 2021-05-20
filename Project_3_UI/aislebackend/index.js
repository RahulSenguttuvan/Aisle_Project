// Body parser used to get json data in req.body
const bodyParser = require('body-parser');
const express = require('express');
// cors used to allow backend to access API 
const cors = require('cors')
const Authenticate = require('./Routes/Authenticate/AuthenticateOtp')
const ProfileInfo = require('./Routes/ProfileInfo/GetProfileInfo')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE, GET, POST, OPTIONS,PUT');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
var corsOptions = {
    origin: 'http://localhost:3001',
    credentials : true
   }



app.options('*', cors(corsOptions));
app.use('/api/authenticate/', Authenticate);
app.use('/api/', ProfileInfo);

//Define env var for PORT or run default on 3000.
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(` Listening on port ${port} `);
});

module.exports = app;
