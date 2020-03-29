

let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let apiRoutes = require("./api-routes"); 
let cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: true
 }));

 const whitelist = ['http://localhost:3000']
 const corsOptions = {
   origin: function (origin, callback) {
     if (whitelist.indexOf(origin) !== -1 || !origin) {
       callback(null, true)
     } else {
       callback(new Error('Not allowed by CORS'))
     }
   }
 }

app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost/mernusers', { useNewUrlParser: true});
var databaseConn = mongoose.connection;


if(!databaseConn)
    console.log("Error in connecting db...");
else
    console.log("Database connected successfully..."); 


var port = process.env.PORT || 3001;
app.get('/', (req, res) => res.send('Test Express'));
app.use('/api', apiRoutes); 

app.listen(port, function () {
    console.log(`Listen API at ${port}`);
});

