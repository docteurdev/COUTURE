const express = require('express');
const { connexioDatabse } = require('./bd/sequelize');
const cors = require('cors');
const { Port } = require('./common/common');
const app = express()
const port = 3005;

app.use(express.static('./public'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

// connexion to database;
connexioDatabse()
app.get('/', (req, res) =>{
    res.json("Couture app is running perfectly")
})
app.listen(Port, () => console.log("Couture app is running perfectly"));

require('./routes/dressMaker/create')(app)

// clients routes
require('./routes/client/create')(app)
require('./routes/client/getAll')(app)
require('./routes/client/getOne')(app)
require('./routes/client/delete')(app)

// commande routes

require('./routes/dress/create')(app);
require('./routes/dress/update')(app);
require('./routes/dress/getAll')(app);
require('./routes/dress/getOne')(app);

// login 
require('./routes/login/authification')(app);

// catalogue
require('./routes/catalogue/create')(app);
require('./routes/catalogue/getAll')(app);

