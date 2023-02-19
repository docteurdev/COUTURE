const { Sequelize, DataTypes } = require("sequelize");

const modelCilent = require('../models/Client');
const modelDressMaker = require('../models/DressMaker');
const modelDress = require('../models/Dress');
const modelCatalogue= require('../models/Cataogue')
//  database connexion
const sequelize = new Sequelize('couture', 'root','root', {
   host: 'localhost',
   port: 3306,
   dialect: 'mysql',
   logging: false 
})

// object of Modeles
const MdressMaker = modelDressMaker(sequelize, DataTypes);
const Mclient = modelCilent(sequelize, DataTypes);
const Mdress = modelDress(sequelize, DataTypes);
const MCatalogue= modelCatalogue(sequelize, DataTypes)

// assossiation;
MdressMaker.hasMany(MCatalogue);
MCatalogue.belongsTo(MdressMaker)


MdressMaker.hasMany(Mclient);
Mclient.belongsTo(MdressMaker)

MdressMaker.hasMany(Mdress);
Mdress.belongsTo(MdressMaker);

Mclient.hasMany(Mdress);
Mdress.belongsTo(Mclient);

const connexioDatabse= () =>{
    return sequelize.sync({}).then(_ =>{

    }).then(data =>{})
}

sequelize.authenticate()
.then(_ => console.log("sequelize is connected to couture database") )
.catch( error => console.log(error));

module.exports={connexioDatabse, Mclient, MdressMaker, Mdress, MCatalogue}