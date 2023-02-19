module.exports=(sequelize, DataTypes) =>{
    return sequelize.define('DressMaker',{
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
        phone:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        photo:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}