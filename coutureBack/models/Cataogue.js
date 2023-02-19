module.exports=(sequelize, DataTypes) =>{
    return sequelize.define('Catalogue',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true

        }
    })
}