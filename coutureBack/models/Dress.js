module.exports=(sequelize, DataTypes) =>{
    return sequelize.define('Commande', {
        cmd_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantite:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tissus:{
            type: DataTypes.STRING,
            allowNull: true
        },
        status:{
            type: DataTypes.STRING,
            allowNull: true
        },
        measure:{
            type: DataTypes.STRING(1234),
            allowNull: true
        },
        date_depote:{
            type: DataTypes.STRING,
            allowNull: true
        },
        date_remise:{
            type: DataTypes.STRING,
            allowNull: false
        },
        amount:{
            type: DataTypes.STRING,
            allowNull: true
        },
        paiement:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        photos:{
            type: DataTypes.STRING,
            allowNull: true
        },
        solde_cal:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}