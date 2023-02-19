const { MCatalogue } = require("../../bd/sequelize")

module.exports=(app) =>{
    app.get('/api/coutre/get-catalogue/:dremakerId', (req, res) =>{
        MCatalogue.findAll({where:{DressmakerId: req.params.dremakerId}}).then((catalogue) => {
            let message ='catalogue récupéré';
            return res.json({message, data: catalogue})
        }).catch((err) => {
            res.json({message: err.message, data: err})
        });
    })
}