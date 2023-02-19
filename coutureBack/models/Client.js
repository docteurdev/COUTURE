module.exports=(sequelize, DataTypes) =>{

    return sequelize.define('Client', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone:{
            type: DataTypes.STRING,
            allowNull: false
        },
        adresse:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}